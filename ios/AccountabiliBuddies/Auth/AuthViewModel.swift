import Foundation
import FirebaseAuth

@MainActor
final class AuthViewModel: ObservableObject {
    @Published var currentUser: AbUser?
    @Published var booting = true

    private var handle: AuthStateDidChangeListenerHandle?

    init() {
        handle = Auth.auth().addStateDidChangeListener { [weak self] _, user in
            guard let self else { return }
            Task { await self.resolve(firebaseUser: user) }
        }
    }

    private func resolve(firebaseUser: FirebaseAuth.User?) async {
        defer { booting = false }
        guard let firebaseUser else { currentUser = nil; return }
        // Profile may not exist yet for brand-new phone numbers (LoginView handles name entry).
        currentUser = try? await FirebaseService.fetchUser(uid: firebaseUser.uid)
    }

    /// Called after the name step creates the profile doc.
    func setUser(_ user: AbUser) { currentUser = user }

    func signOut() {
        try? FirebaseService.signOut()
        currentUser = nil
    }
}
