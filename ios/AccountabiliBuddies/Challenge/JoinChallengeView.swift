import SwiftUI

struct JoinChallengeView: View {
    @EnvironmentObject private var auth: AuthViewModel
    @Binding var path: NavigationPath

    @State private var code = ""
    @State private var challengeId: String?
    @State private var briefing: FirebaseService.Detail?

    @State private var goal = ""
    @State private var frequency = 1
    @State private var period: FrequencyPeriod = .per_week

    @State private var busy = false
    @State private var error: String?

    private var found: Bool { briefing != nil }

    var body: some View {
        ZoneScaffold(compact: true) {
            MascotView(mood: found ? .proud : .idle, size: 96,
                       headline: found ? "Found It." : "Join Up.")
        } content: {
            if let error { ErrorBanner(message: error) }
            if let briefing { briefingStage(briefing.challenge, members: briefing.members.count) }
            else { codeStage }
        }
        .navigationTitle("Join")
        .navigationBarTitleDisplayMode(.inline)
        .toolbarBackground(Theme.navy, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
    }

    private var codeStage: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Got an invite code from a buddy? Enter it to view the briefing.")
                .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.6))
            FieldLabel(text: "Invite Code")
            TextField("AB1X4Z", text: $code)
                .textInputAutocapitalization(.characters)
                .autocorrectionDisabled()
                .multilineTextAlignment(.center)
                .font(.display(28)).tracking(8).foregroundStyle(Theme.ink)
                .padding(.vertical, 14)
                .background(Color.white.opacity(0.6))
                .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .strokeBorder(Theme.ink.opacity(0.12), lineWidth: 1))
                .onChange(of: code) { newValue in
                    code = String(newValue.uppercased().filter { $0.isLetter || $0.isNumber }.prefix(6))
                }
            Button(action: lookup) { Text(busy ? "Looking up…" : "Look Up Challenge") }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(busy || code.count != 6)
        }
    }

    private func briefingStage(_ c: Challenge, members: Int) -> some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(alignment: .leading, spacing: 8) {
                Text(c.name).font(.display(24)).foregroundStyle(Theme.ink)
                if !c.description.isEmpty {
                    Text(c.description).font(.subheadline).foregroundStyle(Theme.ink.opacity(0.6))
                }
                HStack(spacing: 24) {
                    brief("Started by", c.creatorFirstName)
                    brief("Members", "\(members)")
                }
                HStack(spacing: 24) {
                    brief("Duration", c.durationType == .ongoing ? "Ongoing" : "\(c.duration ?? 0) days")
                    brief("Proof", c.proofType == .honor ? "Honor" : "Photo")
                }
            }
            Divider().overlay(Theme.ink.opacity(0.1))
            GoalFields(goal: $goal, frequency: $frequency, period: $period)
            Button(action: join) { Text(busy ? "Joining…" : "Join Challenge") }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(busy || goal.trimmingCharacters(in: .whitespaces).isEmpty)
        }
    }

    private func brief(_ label: String, _ value: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            FieldLabel(text: label)
            Text(value).font(.subheadline).foregroundStyle(Theme.ink)
        }
    }

    private func lookup() {
        error = nil; busy = true
        Task {
            do {
                guard let id = try await FirebaseService.lookupInvite(code: code) else {
                    error = "Invite code not found. Check it and try again."; busy = false; return
                }
                challengeId = id
                let detail = try await FirebaseService.fetchDetail(challengeId: id)
                withAnimation { briefing = detail }
            } catch { self.error = error.localizedDescription }
            busy = false
        }
    }

    private func join() {
        guard let user = auth.currentUser, let id = challengeId else { return }
        error = nil; busy = true
        Task {
            do {
                try await FirebaseService.joinChallenge(
                    challengeId: id, user: user,
                    goal: goal.trimmingCharacters(in: .whitespaces),
                    frequency: frequency, period: period
                )
                path.append(Route.detail(id))
            } catch { self.error = error.localizedDescription }
            busy = false
        }
    }
}
