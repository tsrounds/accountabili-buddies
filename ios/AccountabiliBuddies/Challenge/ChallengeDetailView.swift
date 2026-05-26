import SwiftUI

struct ChallengeDetailView: View {
    let challengeId: String
    @Binding var path: NavigationPath
    @EnvironmentObject private var auth: AuthViewModel

    @State private var detail: FirebaseService.Detail?
    @State private var loading = true
    @State private var error: String?
    @State private var starting = false
    @State private var showCheckIn = false
    @State private var confetti = false

    private let today = DayKey.today()

    var body: some View {
        ZStack {
            content
            ConfettiView(fire: confetti)
        }
        .navigationBarTitleDisplayMode(.inline)
        .toolbarBackground(Theme.navy, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .task { await load() }
        .sheet(isPresented: $showCheckIn) {
            CheckInView(challengeId: challengeId) { didComplete in
                showCheckIn = false
                if didComplete { burstConfetti() }
                Task { await load() }
            }
            .presentationDetents([.medium, .large])
        }
    }

    @ViewBuilder
    private var content: some View {
        if loading {
            ZoneScaffold { MascotView(mood: .idle) } content: {
                ProgressView().tint(Theme.ink).frame(maxWidth: .infinity).padding(.top, 30)
            }
        } else if let detail {
            loaded(detail)
        } else {
            ZoneScaffold { MascotView(mood: .lagging, headline: "Hmm.") } content: {
                ErrorBanner(message: error ?? "Challenge not found.")
            }
        }
    }

    private func loaded(_ d: FirebaseService.Detail) -> some View {
        let c = d.challenge
        let me = d.leaderboard.first { $0.uid == auth.currentUser?.uid }
        let myMember = d.members.first { $0.uid == auth.currentUser?.uid }
        let checkedIn = me?.lastCheckinDate == today
        let myRank = (d.leaderboard.firstIndex { $0.uid == auth.currentUser?.uid }).map { $0 + 1 }

        return ZoneScaffold {
            MascotView(mood: heroMood(c, checkedIn: checkedIn))
            Text(c.name)
                .displayStyle(34).foregroundStyle(Theme.ivory)
                .multilineTextAlignment(.center).padding(.top, 8)
            HStack(spacing: 10) {
                pill("person.2", "\(d.members.count) buddies")
                pill("calendar", c.durationType == .ongoing ? "Ongoing" : "\(c.duration ?? 0) days")
                if c.status == .active, let left = Metrics.daysRemaining(startDate: c.startDate, durationDays: c.duration) {
                    pill("clock", "\(left)d left")
                }
            }
            .padding(.top, 10)
        } content: {
            switch c.status {
            case .lobby:
                lobby(d)
            case .active, .complete:
                active(d, me: me, myMember: myMember, checkedIn: checkedIn, rank: myRank)
            }
        }
    }

    // MARK: Lobby

    @ViewBuilder
    private func lobby(_ d: FirebaseService.Detail) -> some View {
        let isCreator = d.challenge.creatorUid == auth.currentUser?.uid

        if let code = d.inviteCode {
            VStack(spacing: 10) {
                FieldLabel(text: "Invite Code")
                Text(code).font(.display(34)).tracking(7).foregroundStyle(Theme.ink)
                ShareLink(item: "Join my challenge on Accountabili-Buddies. Invite code: \(code)") {
                    Label("Share", systemImage: "square.and.arrow.up")
                }
                .font(.subheadline.weight(.medium)).foregroundStyle(Theme.indigo)
            }
            .frame(maxWidth: .infinity).padding(.vertical, 18).card()
        }

        VStack(alignment: .leading, spacing: 0) {
            FieldLabel(text: "Buddies").padding(.bottom, 4)
            ForEach(d.members) { m in
                HStack(spacing: 12) {
                    Avatar(initial: m.firstName.first.map(String.init) ?? "?")
                    VStack(alignment: .leading, spacing: 2) {
                        Text(m.firstName + (m.uid == auth.currentUser?.uid ? " (you)" : ""))
                            .font(.body).foregroundStyle(Theme.ink)
                        if !m.personalGoal.isEmpty {
                            Text(m.personalGoal).font(.caption)
                                .foregroundStyle(Theme.ink.opacity(0.5)).lineLimit(1)
                        }
                    }
                    Spacer()
                }
                .padding(.vertical, 8)
            }
        }
        .card()

        if isCreator {
            Button(action: start) { Text(starting ? "Starting…" : "Start Challenge") }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(starting || !allGoalsSet(d))
            if !allGoalsSet(d) {
                Text("Everyone needs a goal set before you can start.")
                    .font(.footnote).foregroundStyle(Theme.ink.opacity(0.5))
                    .frame(maxWidth: .infinity).multilineTextAlignment(.center)
            }
        } else {
            Text("Waiting for the host to start the challenge.")
                .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.55))
                .frame(maxWidth: .infinity).multilineTextAlignment(.center).padding(.top, 4)
        }
    }

    // MARK: Active / Complete

    @ViewBuilder
    private func active(_ d: FirebaseService.Detail, me: LeaderboardEntry?,
                        myMember: Member?, checkedIn: Bool, rank: Int?) -> some View {
        let c = d.challenge
        let target = myMember.flatMap {
            Metrics.targetTotal(frequency: $0.targetFrequency, period: $0.frequencyPeriod, durationDays: c.duration)
        }
        let pct = Metrics.pct(totalCheckins: me?.totalCheckins ?? 0, target: target)

        if let myMember {
            HStack(spacing: 16) {
                ProgressRing(
                    percent: pct,
                    label: target != nil ? "\(pct)%" : "\(me?.totalCheckins ?? 0)",
                    sublabel: target != nil ? "\(me?.totalCheckins ?? 0)/\(target!)" : "logged"
                )
                VStack(alignment: .leading, spacing: 6) {
                    FieldLabel(text: "Your Goal")
                    Text(myMember.personalGoal.isEmpty ? "—" : myMember.personalGoal)
                        .font(.subheadline).foregroundStyle(Theme.ink)
                    HStack(spacing: 6) {
                        Image(systemName: "flame.fill")
                            .foregroundStyle((me?.currentStreak ?? 0) > 0 ? Theme.frost : Theme.ink.opacity(0.25))
                        Text("\(me?.currentStreak ?? 0)").font(.display(20)).foregroundStyle(Theme.ink)
                        Text("day streak").font(.caption).foregroundStyle(Theme.ink.opacity(0.5))
                    }
                }
                Spacer(minLength: 0)
            }
            .card()
        }

        if c.status == .active {
            Button { showCheckIn = true } label: {
                Label(checkedIn ? "Log Again" : "Log Update",
                      systemImage: checkedIn ? "checkmark.circle.fill" : "bolt.fill")
            }
            .buttonStyle(checkedIn ? PrimaryButtonStyle.secondary : PrimaryButtonStyle())
        }

        // Leaderboard
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 6) {
                Image(systemName: "trophy.fill").foregroundStyle(Theme.indigo).font(.caption)
                FieldLabel(text: "Leaderboard")
            }
            if d.leaderboard.isEmpty {
                Text("No check-ins yet. Be the first.")
                    .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.4))
            } else {
                ForEach(Array(d.leaderboard.enumerated()), id: \.element.id) { i, entry in
                    let isMe = entry.uid == auth.currentUser?.uid
                    HStack(spacing: 12) {
                        Text("\(i + 1)").font(.display(16))
                            .foregroundStyle(i == 0 ? Theme.indigo : Theme.ink.opacity(0.4))
                            .frame(width: 20)
                        Avatar(initial: entry.firstName.first.map(String.init) ?? "?", highlight: isMe)
                        Text(entry.firstName + (isMe ? " (you)" : ""))
                            .font(.subheadline).foregroundStyle(Theme.ink)
                        Spacer()
                        if entry.currentStreak > 0 {
                            HStack(spacing: 2) {
                                Image(systemName: "flame.fill").font(.caption2).foregroundStyle(Theme.frost)
                                Text("\(entry.currentStreak)").font(.display(14)).foregroundStyle(Theme.ink)
                            }
                        }
                        HStack(spacing: 4) {
                            Image(systemName: "bolt.fill").font(.caption2)
                                .foregroundStyle(entry.lastCheckinDate == today ? Theme.indigo : Theme.ink.opacity(0.2))
                            Text("\(entry.totalCheckins)").font(.display(16)).foregroundStyle(Theme.ink.opacity(0.7))
                        }
                    }
                    .padding(.vertical, 4)
                }
            }
        }
        .card()
    }

    // MARK: Bits

    private func pill(_ icon: String, _ text: String) -> some View {
        HStack(spacing: 6) {
            Image(systemName: icon).font(.caption2).foregroundStyle(Theme.frost)
            Text(text).font(.caption).foregroundStyle(Theme.ivory.opacity(0.75))
        }
        .padding(.horizontal, 12).padding(.vertical, 7)
        .background(Theme.ivory.opacity(0.1)).clipShape(Capsule())
    }

    private func heroMood(_ c: Challenge, checkedIn: Bool) -> MascotMood {
        if c.status == .complete { return .celebrate }
        if c.status == .lobby { return .idle }
        return checkedIn ? .proud : .lagging
    }

    private func allGoalsSet(_ d: FirebaseService.Detail) -> Bool {
        !d.members.isEmpty && d.members.allSatisfy { !$0.personalGoal.trimmingCharacters(in: .whitespaces).isEmpty }
    }

    // MARK: Actions

    private func load() async {
        if detail == nil { loading = true }
        do {
            let d = try await FirebaseService.fetchDetail(challengeId: challengeId)
            withAnimation { detail = d; loading = false }
        } catch {
            self.error = error.localizedDescription; loading = false
        }
    }

    private func start() {
        starting = true
        Task {
            try? await FirebaseService.startChallenge(challengeId: challengeId)
            await load()
            starting = false
        }
    }

    private func burstConfetti() {
        confetti = false
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) { confetti = true }
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.6) { confetti = false }
    }
}

// MARK: - Avatar

struct Avatar: View {
    let initial: String
    var highlight: Bool = false
    var body: some View {
        Circle()
            .fill(highlight ? Theme.indigo.opacity(0.15) : Theme.ink.opacity(0.06))
            .overlay(Circle().strokeBorder(highlight ? Theme.indigo.opacity(0.4) : Theme.ink.opacity(0.12), lineWidth: 1))
            .overlay(Text(initial).font(.display(16)).foregroundStyle(Theme.ink))
            .frame(width: 34, height: 34)
    }
}
