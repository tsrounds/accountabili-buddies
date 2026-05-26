import SwiftUI

enum Route: Hashable {
    case detail(String)
    case create
    case join
}

struct HomeView: View {
    @EnvironmentObject private var auth: AuthViewModel
    @State private var path = NavigationPath()

    @State private var rows: [FirebaseService.HomeRow] = []
    @State private var loading = true

    var body: some View {
        NavigationStack(path: $path) {
            ZoneScaffold {
                MascotView(mood: mood)
                if let reminder {
                    Text(reminder)
                        .font(.subheadline)
                        .foregroundStyle(Theme.ivory.opacity(0.85))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 18).padding(.vertical, 12)
                        .background(Theme.red.opacity(0.18))
                        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                        .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous)
                            .strokeBorder(Theme.red.opacity(0.3), lineWidth: 1))
                        .padding(.top, 12)
                        .transition(.opacity)
                }
            } content: {
                if loading {
                    ForEach(0..<3, id: \.self) { _ in SkeletonCard() }
                } else if rows.isEmpty {
                    emptyState
                } else {
                    ForEach(rows) { row in
                        Button { path.append(Route.detail(row.id)) } label: {
                            ChallengeRowCard(row: row)
                        }
                        .buttonStyle(.plain)
                    }
                    actionButtons
                }
            }
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .detail(let id): ChallengeDetailView(challengeId: id, path: $path)
                case .create:         CreateChallengeView(path: $path)
                case .join:           JoinChallengeView(path: $path)
                }
            }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Button("Sign Out", role: .destructive) { auth.signOut() }
                    } label: {
                        Image(systemName: "person.circle").foregroundStyle(Theme.ivory)
                    }
                }
            }
            .toolbarBackground(Theme.navy, for: .navigationBar)
            .toolbarBackground(.visible, for: .navigationBar)
        }
        .task { await load() }
        .refreshable { await load() }
        .onChange(of: path) { _ in Task { await load() } }
    }

    private var mood: MascotMood {
        if loading { return .idle }
        let active = rows.filter { $0.status == .active }
        if !rows.isEmpty, rows.allSatisfy({ $0.status == .complete }) { return .celebrate }
        if !active.isEmpty, active.allSatisfy(\.checkedInToday) { return .proud }
        if active.contains(where: { !$0.checkedInToday }) { return .lagging }
        return .idle
    }

    private var reminder: String? {
        guard let user = auth.currentUser,
              rows.contains(where: { $0.status == .active && !$0.checkedInToday })
        else { return nil }
        return Roasts.reminder(name: user.firstName)
    }

    private var actionButtons: some View {
        HStack(spacing: 12) {
            Button { path.append(Route.create) } label: { Label("New", systemImage: "plus") }
                .buttonStyle(PrimaryButtonStyle())
            Button { path.append(Route.join) } label: { Label("Join", systemImage: "person.2") }
                .buttonStyle(PrimaryButtonStyle.secondary)
        }
        .padding(.top, 4)
    }

    private var emptyState: some View {
        VStack(spacing: 18) {
            Text("Nothing here.\nBold strategy.")
                .displayStyle(30)
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.center)
            Text("Create a challenge or join your crew — accountability starts here.")
                .font(.body).foregroundStyle(Theme.ink.opacity(0.6))
                .multilineTextAlignment(.center)
            actionButtons
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 24)
    }

    private func load() async {
        guard let uid = auth.currentUser?.uid else { return }
        if rows.isEmpty { loading = true }
        let fetched = (try? await FirebaseService.fetchMyChallenges(uid: uid)) ?? []
        withAnimation { rows = fetched; loading = false }
    }
}

// MARK: - Row card

private struct ChallengeRowCard: View {
    let row: FirebaseService.HomeRow

    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 4) {
                Text(row.name).font(.display(20)).foregroundStyle(Theme.ink)
                if !row.personalGoal.isEmpty {
                    Text(row.personalGoal).font(.subheadline)
                        .foregroundStyle(Theme.ink.opacity(0.6)).lineLimit(1)
                }
                Text("\(row.durationLabel) · \(row.status.rawValue)".uppercased())
                    .font(.system(size: 11, weight: .semibold)).tracking(1)
                    .foregroundStyle(Theme.ink.opacity(0.4))
            }
            Spacer(minLength: 8)
            VStack(spacing: 3) {
                Image(systemName: "bolt.fill")
                    .font(.system(size: 22))
                    .foregroundStyle(statusColor)
                Text(statusLabel)
                    .font(.system(size: 10, weight: .semibold)).tracking(0.5)
                    .foregroundStyle(Theme.ink.opacity(0.4))
            }
        }
        .card()
    }

    private var statusColor: Color {
        if row.status == .active && row.checkedInToday { return Theme.indigo }
        if row.status == .active { return Theme.ink.opacity(0.25) }
        return Theme.ink.opacity(0.15)
    }
    private var statusLabel: String {
        if row.status == .active { return row.checkedInToday ? "DONE" : "TO-DO" }
        return row.status.rawValue.uppercased()
    }
}

private struct SkeletonCard: View {
    @State private var shimmer = false
    var body: some View {
        RoundedRectangle(cornerRadius: 22, style: .continuous)
            .fill(Theme.ivory)
            .frame(height: 78)
            .opacity(shimmer ? 0.5 : 0.9)
            .onAppear {
                withAnimation(.easeInOut(duration: 0.9).repeatForever(autoreverses: true)) {
                    shimmer = true
                }
            }
    }
}
