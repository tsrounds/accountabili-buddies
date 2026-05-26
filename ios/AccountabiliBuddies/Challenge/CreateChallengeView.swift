import SwiftUI

struct CreateChallengeView: View {
    @EnvironmentObject private var auth: AuthViewModel
    @Binding var path: NavigationPath

    private enum Stage { case form, goal, share }
    @State private var stage: Stage = .form

    // Form
    @State private var name = ""
    @State private var description = ""
    @State private var category = ""
    @State private var durationChoice = ""           // "7","14",… or "ongoing"
    @State private var proof: ProofType = .honor
    @State private var visibility: ChallengeVisibility = .private

    // Goal
    @State private var goal = ""
    @State private var frequency = 1
    @State private var period: FrequencyPeriod = .per_week

    // Result
    @State private var challengeId = ""
    @State private var code = ""

    @State private var busy = false
    @State private var error: String?

    private let types: [(String, String)] = [
        ("Fitness", "figure.run"), ("Finance", "dollarsign"), ("Health", "heart"),
        ("Reading", "book"), ("Mindfulness", "leaf"), ("Nutrition", "fork.knife"),
        ("Sleep", "moon"), ("Habit", "target"),
    ]
    private let durations: [(String, String)] = [
        ("7", "7 days"), ("14", "14 days"), ("30", "30 days"),
        ("60", "60 days"), ("90", "90 days"), ("ongoing", "Ongoing"),
    ]

    var body: some View {
        ZoneScaffold(compact: true) {
            MascotView(mood: stage == .share ? .celebrate : .idle, size: 96,
                       headline: heroHeadline)
        } content: {
            if let error { ErrorBanner(message: error) }
            switch stage {
            case .form:  formStage
            case .goal:  goalStage
            case .share: shareStage
            }
        }
        .navigationTitle("Create")
        .navigationBarTitleDisplayMode(.inline)
        .toolbarBackground(Theme.navy, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
    }

    private var heroHeadline: String {
        switch stage {
        case .form:  return "Set It Up."
        case .goal:  return "Set Your Goal"
        case .share: return "There It Is."
        }
    }

    // MARK: Form

    private var formStage: some View {
        VStack(alignment: .leading, spacing: 16) {
            field("Challenge Name") {
                ABTextField(placeholder: "e.g. 30-Day Push-Up Challenge", text: $name)
            }
            field("Description (optional)") {
                ABTextEditor(placeholder: "Describe the rules and goal…", text: $description)
            }
            field("Challenge Type") {
                LazyVGrid(columns: Array(repeating: .init(.flexible(), spacing: 8), count: 4), spacing: 8) {
                    ForEach(types, id: \.0) { t in
                        TypeChip(label: t.0, icon: t.1, selected: category == t.0) {
                            category = (category == t.0) ? "" : t.0
                        }
                    }
                }
            }
            field("Duration") {
                Menu {
                    ForEach(durations, id: \.0) { d in
                        Button(d.1) { durationChoice = d.0 }
                    }
                } label: {
                    pickerLabel(durations.first { $0.0 == durationChoice }?.1 ?? "Select duration…")
                }
            }
            field("Proof Required") {
                SegmentedPair(left: "Honor System", right: "Photo",
                              isLeft: Binding(get: { proof == .honor },
                                              set: { proof = $0 ? .honor : .photo }))
            }
            field("Visibility") {
                SegmentedPair(left: "Private", right: "Public",
                              isLeft: Binding(get: { visibility == .private },
                                              set: { visibility = $0 ? .private : .public }))
            }
            Button(action: create) { Text(busy ? "Creating…" : "Create Challenge") }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(busy || name.trimmingCharacters(in: .whitespaces).isEmpty || durationChoice.isEmpty)
                .padding(.top, 4)
        }
    }

    // MARK: Goal

    private var goalStage: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Before sharing the invite, set your own goal for \(name).")
                .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.6))
            GoalFields(goal: $goal, frequency: $frequency, period: $period)
            Button(action: saveGoal) { Text(busy ? "Saving…" : "Save Goal & Get Code") }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(busy || goal.trimmingCharacters(in: .whitespaces).isEmpty)
        }
    }

    // MARK: Share

    private var shareStage: some View {
        VStack(spacing: 16) {
            Text("It's set up. Share this with your people.")
                .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.6))
                .multilineTextAlignment(.center)
            VStack(spacing: 6) {
                Text(code).font(.display(40)).tracking(8).foregroundStyle(Theme.ink)
            }
            .frame(maxWidth: .infinity).padding(.vertical, 22).card()

            ShareLink(item: "Join my challenge on Accountabili-Buddies. Invite code: \(code)") {
                Text("Share Invite")
            }
            .buttonStyle(PrimaryButtonStyle())

            Button("Open It") {
                path.append(Route.detail(challengeId))
            }
            .buttonStyle(PrimaryButtonStyle.secondary)
        }
    }

    // MARK: Actions

    private func create() {
        guard let user = auth.currentUser else { return }
        error = nil; busy = true
        Task {
            do {
                let isOngoing = durationChoice == "ongoing"
                let result = try await FirebaseService.createChallenge(
                    name: name.trimmingCharacters(in: .whitespaces),
                    category: category,
                    duration: isOngoing ? nil : Int(durationChoice),
                    durationType: isOngoing ? .ongoing : .fixed,
                    proofType: proof, visibility: visibility,
                    description: description.trimmingCharacters(in: .whitespaces),
                    creator: user
                )
                challengeId = result.challengeId
                code = result.code
                withAnimation { stage = .goal }
            } catch { self.error = error.localizedDescription }
            busy = false
        }
    }

    private func saveGoal() {
        guard let user = auth.currentUser else { return }
        error = nil; busy = true
        Task {
            do {
                try await FirebaseService.setGoal(
                    challengeId: challengeId, uid: user.uid,
                    goal: goal.trimmingCharacters(in: .whitespaces),
                    frequency: frequency, period: period
                )
                withAnimation { stage = .share }
            } catch { self.error = error.localizedDescription }
            busy = false
        }
    }

    // MARK: Bits

    @ViewBuilder
    private func field<C: View>(_ label: String, @ViewBuilder _ control: () -> C) -> some View {
        VStack(alignment: .leading, spacing: 8) { FieldLabel(text: label); control() }
    }

    private func pickerLabel(_ text: String) -> some View {
        HStack {
            Text(text).foregroundStyle(Theme.ink)
            Spacer()
            Image(systemName: "chevron.down").font(.caption).foregroundStyle(Theme.ink.opacity(0.4))
        }
        .padding(.horizontal, 16).padding(.vertical, 14)
        .background(Color.white.opacity(0.6))
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous)
            .strokeBorder(Theme.ink.opacity(0.12), lineWidth: 1))
    }
}

// MARK: - Reusable form bits

struct GoalFields: View {
    @Binding var goal: String
    @Binding var frequency: Int
    @Binding var period: FrequencyPeriod

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(alignment: .leading, spacing: 8) {
                FieldLabel(text: "Your Goal")
                ABTextField(placeholder: "e.g. Run 3 times per week", text: $goal)
            }
            HStack(spacing: 12) {
                VStack(alignment: .leading, spacing: 8) {
                    FieldLabel(text: "Target")
                    Stepper(value: $frequency, in: 1...99) {
                        Text("\(frequency)×").font(.display(22)).foregroundStyle(Theme.ink)
                    }
                    .padding(.horizontal, 12).padding(.vertical, 8)
                    .background(Color.white.opacity(0.6))
                    .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                }
                VStack(alignment: .leading, spacing: 8) {
                    FieldLabel(text: "Period")
                    Menu {
                        ForEach(FrequencyPeriod.allCases) { p in
                            Button(p.label) { period = p }
                        }
                    } label: {
                        HStack {
                            Text(period.label).foregroundStyle(Theme.ink)
                            Spacer()
                            Image(systemName: "chevron.down").font(.caption)
                                .foregroundStyle(Theme.ink.opacity(0.4))
                        }
                        .padding(.horizontal, 16).padding(.vertical, 14)
                        .background(Color.white.opacity(0.6))
                        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .strokeBorder(Theme.ink.opacity(0.12), lineWidth: 1))
                    }
                }
            }
        }
    }
}

private struct TypeChip: View {
    let label: String, icon: String, selected: Bool
    let action: () -> Void
    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                Image(systemName: icon).font(.system(size: 18))
                Text(label).font(.system(size: 9, weight: .semibold)).tracking(0.3)
            }
            .frame(maxWidth: .infinity).padding(.vertical, 12)
            .foregroundStyle(selected ? Theme.indigo : Theme.ink.opacity(0.5))
            .background(selected ? Theme.indigo.opacity(0.15) : Color.white.opacity(0.5))
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(RoundedRectangle(cornerRadius: 16, style: .continuous)
                .strokeBorder(selected ? Theme.indigo : Theme.ink.opacity(0.12), lineWidth: 1.5))
        }
        .buttonStyle(.plain)
    }
}

private struct SegmentedPair: View {
    let left: String, right: String
    @Binding var isLeft: Bool
    var body: some View {
        HStack(spacing: 8) {
            seg(left, active: isLeft) { isLeft = true }
            seg(right, active: !isLeft) { isLeft = false }
        }
    }
    private func seg(_ title: String, active: Bool, _ tap: @escaping () -> Void) -> some View {
        Button(action: tap) {
            Text(title).font(.subheadline.weight(.medium))
                .frame(maxWidth: .infinity).padding(.vertical, 12)
                .foregroundStyle(active ? Theme.ivory : Theme.ink.opacity(0.6))
                .background(active ? Theme.navy : Color.white.opacity(0.5))
                .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
        }
        .buttonStyle(.plain)
    }
}
