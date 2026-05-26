import Foundation
import FirebaseAuth
import FirebaseFirestore

/// All Auth + Firestore access. Schema mirrors the web app (ab_ collections).
enum FirebaseService {
    static var db: Firestore { Firestore.firestore() }

    // MARK: - Auth

    static func sendVerificationCode(phone: String) async throws -> String {
        try await withCheckedThrowingContinuation { cont in
            PhoneAuthProvider.provider().verifyPhoneNumber(phone, uiDelegate: nil) { id, err in
                if let err { cont.resume(throwing: err) }
                else { cont.resume(returning: id ?? "") }
            }
        }
    }

    /// Confirms the SMS code. Returns the signed-in uid.
    static func confirmCode(verificationID: String, code: String) async throws -> String {
        let credential = PhoneAuthProvider.provider().credential(
            withVerificationID: verificationID, verificationCode: code
        )
        let result = try await Auth.auth().signIn(with: credential)
        return result.user.uid
    }

    static func fetchUser(uid: String) async throws -> AbUser? {
        let snap = try await db.collection("ab_users").document(uid).getDocument()
        guard let d = snap.data() else { return nil }
        return AbUser(
            uid: uid,
            firstName: d["firstName"] as? String ?? "",
            phone: d["phone"] as? String ?? ""
        )
    }

    static func createUser(uid: String, firstName: String, phone: String) async throws -> AbUser {
        try await db.collection("ab_users").document(uid).setData([
            "uid": uid,
            "firstName": firstName,
            "phone": phone,
            "createdAt": FieldValue.serverTimestamp(),
            "avatarUrl": NSNull(),
        ])
        return AbUser(uid: uid, firstName: firstName, phone: phone)
    }

    static func signOut() throws { try Auth.auth().signOut() }

    // MARK: - Challenges

    /// A row on the Home screen: a challenge + my membership/leaderboard summary.
    struct HomeRow: Identifiable {
        let id: String
        var name: String
        var status: ChallengeStatus
        var personalGoal: String
        var durationLabel: String
        var checkedInToday: Bool
    }

    static func fetchMyChallenges(uid: String) async throws -> [HomeRow] {
        let today = DayKey.today()
        let members = try await db.collectionGroup("members")
            .whereField("uid", isEqualTo: uid)
            .getDocuments()

        var rows: [HomeRow] = []
        for memberDoc in members.documents {
            guard let challengeRef = memberDoc.reference.parent.parent else { continue }
            async let challengeSnap = challengeRef.getDocument()
            async let lbSnap = challengeRef.collection("leaderboard").document(uid).getDocument()
            let (cSnap, lSnap) = try await (challengeSnap, lbSnap)
            guard let c = cSnap.data() else { continue }
            let durationType = DurationType(rawValue: c["durationType"] as? String ?? "fixed") ?? .fixed
            let duration = c["duration"] as? Int
            rows.append(HomeRow(
                id: challengeRef.documentID,
                name: c["name"] as? String ?? "Untitled",
                status: ChallengeStatus(rawValue: c["status"] as? String ?? "lobby") ?? .lobby,
                personalGoal: memberDoc.data()["personalGoal"] as? String ?? "",
                durationLabel: durationType == .ongoing ? "Ongoing" : "\(duration ?? 0)d",
                checkedInToday: (lSnap.data()?["lastCheckinDate"] as? String) == today
            ))
        }
        return rows
    }

    static func createChallenge(
        name: String, category: String, duration: Int?, durationType: DurationType,
        proofType: ProofType, visibility: ChallengeVisibility, description: String,
        creator: AbUser
    ) async throws -> (challengeId: String, code: String) {
        let ref = db.collection("ab_challenges").document()
        try await ref.setData([
            "name": name,
            "creatorUid": creator.uid,
            "creatorFirstName": creator.firstName,
            "duration": duration.map { NSNumber(value: $0) } ?? NSNull(),
            "durationType": durationType.rawValue,
            "visibility": visibility.rawValue,
            "proofType": proofType.rawValue,
            "category": category,
            "description": description,
            "status": ChallengeStatus.lobby.rawValue,
            "createdAt": FieldValue.serverTimestamp(),
            "startDate": NSNull(),
        ])

        let code = Self.generateCode()
        try await db.collection("ab_invites").document(code).setData([
            "challengeId": ref.documentID,
            "createdAt": FieldValue.serverTimestamp(),
        ])

        try await ref.collection("members").document(creator.uid).setData([
            "uid": creator.uid,
            "firstName": creator.firstName,
            "personalGoal": "",
            "targetFrequency": 1,
            "frequencyPeriod": FrequencyPeriod.per_week.rawValue,
            "joinedAt": FieldValue.serverTimestamp(),
        ])

        return (ref.documentID, code)
    }

    static func setGoal(
        challengeId: String, uid: String,
        goal: String, frequency: Int, period: FrequencyPeriod
    ) async throws {
        try await db.collection("ab_challenges").document(challengeId)
            .collection("members").document(uid)
            .updateData([
                "personalGoal": goal,
                "targetFrequency": frequency,
                "frequencyPeriod": period.rawValue,
            ])
    }

    static func lookupInvite(code: String) async throws -> String? {
        let snap = try await db.collection("ab_invites")
            .document(code.uppercased()).getDocument()
        return snap.data()?["challengeId"] as? String
    }

    static func joinChallenge(
        challengeId: String, user: AbUser,
        goal: String, frequency: Int, period: FrequencyPeriod
    ) async throws {
        try await db.collection("ab_challenges").document(challengeId)
            .collection("members").document(user.uid)
            .setData([
                "uid": user.uid,
                "firstName": user.firstName,
                "personalGoal": goal,
                "targetFrequency": frequency,
                "frequencyPeriod": period.rawValue,
                "joinedAt": FieldValue.serverTimestamp(),
            ])
    }

    static func startChallenge(challengeId: String) async throws {
        try await db.collection("ab_challenges").document(challengeId).updateData([
            "status": ChallengeStatus.active.rawValue,
            "startDate": FieldValue.serverTimestamp(),
        ])
    }

    struct Detail {
        var challenge: Challenge
        var members: [Member]
        var leaderboard: [LeaderboardEntry]
        var inviteCode: String?
    }

    static func fetchDetail(challengeId: String) async throws -> Detail {
        let cRef = db.collection("ab_challenges").document(challengeId)
        async let cSnap = cRef.getDocument()
        async let mSnap = cRef.collection("members").getDocuments()
        async let lSnap = cRef.collection("leaderboard").getDocuments()
        let (challengeSnap, membersSnap, lbSnap) = try await (cSnap, mSnap, lSnap)

        guard let c = challengeSnap.data() else {
            throw NSError(domain: "AB", code: 404,
                          userInfo: [NSLocalizedDescriptionKey: "Challenge not found."])
        }

        let challenge = Challenge(
            id: challengeId,
            name: c["name"] as? String ?? "",
            creatorUid: c["creatorUid"] as? String ?? "",
            creatorFirstName: c["creatorFirstName"] as? String ?? "",
            duration: c["duration"] as? Int,
            durationType: DurationType(rawValue: c["durationType"] as? String ?? "fixed") ?? .fixed,
            proofType: ProofType(rawValue: c["proofType"] as? String ?? "honor") ?? .honor,
            visibility: ChallengeVisibility(rawValue: c["visibility"] as? String ?? "private") ?? .private,
            category: c["category"] as? String ?? "",
            description: c["description"] as? String ?? "",
            status: ChallengeStatus(rawValue: c["status"] as? String ?? "lobby") ?? .lobby,
            startDate: (c["startDate"] as? Timestamp)?.dateValue()
        )

        let members: [Member] = membersSnap.documents.map { doc in
            let d = doc.data()
            return Member(
                uid: doc.documentID,
                firstName: d["firstName"] as? String ?? "",
                personalGoal: d["personalGoal"] as? String ?? "",
                targetFrequency: d["targetFrequency"] as? Int ?? 1,
                frequencyPeriod: FrequencyPeriod(rawValue: d["frequencyPeriod"] as? String ?? "per_week") ?? .per_week
            )
        }

        let leaderboard: [LeaderboardEntry] = lbSnap.documents.map { doc in
            let d = doc.data()
            return LeaderboardEntry(
                uid: doc.documentID,
                firstName: d["firstName"] as? String ?? "",
                totalCheckins: d["totalCheckins"] as? Int ?? 0,
                currentStreak: d["currentStreak"] as? Int ?? 0,
                bestStreak: d["bestStreak"] as? Int ?? 0,
                lastCheckinDate: d["lastCheckinDate"] as? String
            )
        }.sorted { $0.totalCheckins > $1.totalCheckins }

        var code: String?
        if challenge.status == .lobby {
            let inv = try? await db.collection("ab_invites")
                .whereField("challengeId", isEqualTo: challengeId)
                .limit(to: 1).getDocuments()
            code = inv?.documents.first?.documentID
        }

        return Detail(challenge: challenge, members: members,
                      leaderboard: leaderboard, inviteCode: code)
    }

    /// Records a check-in and updates the leaderboard (ported from checkin.ts).
    static func submitCheckin(
        challengeId: String, uid: String, firstName: String,
        completed: Bool, value: Int?, note: String
    ) async throws {
        let today = DayKey.today()
        let cRef = db.collection("ab_challenges").document(challengeId)
        let checkinRef = cRef.collection("checkins").document("\(uid)_\(today)")
        let lbRef = cRef.collection("leaderboard").document(uid)

        try await checkinRef.setData([
            "uid": uid,
            "firstName": firstName,
            "date": today,
            "completed": completed,
            "value": value.map { NSNumber(value: $0) } ?? NSNull(),
            "note": note.trimmingCharacters(in: .whitespacesAndNewlines),
            "createdAt": FieldValue.serverTimestamp(),
        ])

        let lbSnap = try await lbRef.getDocument()
        let prev = lbSnap.data()
        let prevStreak = prev?["currentStreak"] as? Int ?? 0
        let prevBest = prev?["bestStreak"] as? Int ?? 0
        let prevLast = prev?["lastCheckinDate"] as? String

        let newStreak = completed ? Streaks.next(prevStreak: prevStreak, lastCheckinDate: prevLast, today: today) : 0
        let newBest = max(prevBest, newStreak)

        if lbSnap.exists {
            var update: [String: Any] = [
                "currentStreak": newStreak,
                "bestStreak": newBest,
                "lastCheckinDate": today,
            ]
            if completed { update["totalCheckins"] = FieldValue.increment(Int64(1)) }
            try await lbRef.updateData(update)
        } else {
            try await lbRef.setData([
                "uid": uid,
                "firstName": firstName,
                "totalCheckins": completed ? 1 : 0,
                "currentStreak": newStreak,
                "bestStreak": newBest,
                "lastCheckinDate": today,
            ])
        }
    }

    static func hasCheckedInToday(challengeId: String, uid: String) async -> Bool {
        let today = DayKey.today()
        let snap = try? await db.collection("ab_challenges").document(challengeId)
            .collection("checkins").document("\(uid)_\(today)").getDocument()
        return snap?.exists ?? false
    }

    // MARK: - Helpers

    /// 6-char invite code, ambiguous characters removed (no O/0/1/I).
    private static func generateCode() -> String {
        let chars = Array("ABCDEFGHJKLMNPQRSTUVWXYZ23456789")
        return String((0..<6).map { _ in chars.randomElement()! })
    }
}
