import SwiftUI

struct CheckInView: View {
    let challengeId: String
    /// Called on dismiss; `true` if the user logged a completed check-in.
    var onDone: (Bool) -> Void

    @EnvironmentObject private var auth: AuthViewModel
    @Environment(\.dismiss) private var dismiss

    @State private var amount = ""
    @State private var note = ""
    @State private var busy = false
    @State private var error: String?

    var body: some View {
        ZStack {
            Theme.dust.ignoresSafeArea()
            VStack(spacing: 0) {
                VStack(spacing: 4) {
                    MascotView(mood: .lagging, size: 84, headline: "Okay. Let's Go.")
                }
                .frame(maxWidth: .infinity)
                .padding(.top, 28).padding(.bottom, 24)
                .background(Theme.navy)

                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        if let error { ErrorBanner(message: error) }

                        VStack(alignment: .leading, spacing: 8) {
                            FieldLabel(text: "Amount (optional)")
                            ABTextField(placeholder: "e.g. 3", text: $amount, keyboard: .numberPad)
                        }
                        VStack(alignment: .leading, spacing: 8) {
                            FieldLabel(text: "Note (optional)")
                            ABTextEditor(placeholder: "Any victories or struggles to report…", text: $note)
                        }

                        HStack(spacing: 12) {
                            Button { submit(completed: false) } label: { Label("Didn't", systemImage: "xmark.circle") }
                                .buttonStyle(PrimaryButtonStyle.danger)
                            Button { submit(completed: true) } label: {
                                Label(busy ? "Logging…" : "Did it", systemImage: "checkmark.circle")
                            }
                            .buttonStyle(PrimaryButtonStyle())
                        }
                        .disabled(busy)
                        .padding(.top, 4)

                        Button("Cancel") { dismiss() }
                            .buttonStyle(OutlineButtonStyle())
                    }
                    .padding(20)
                }
            }
        }
    }

    private func submit(completed: Bool) {
        guard let user = auth.currentUser else { return }
        error = nil; busy = true
        Task {
            do {
                try await FirebaseService.submitCheckin(
                    challengeId: challengeId, uid: user.uid, firstName: user.firstName,
                    completed: completed,
                    value: Int(amount.trimmingCharacters(in: .whitespaces)),
                    note: note
                )
                onDone(completed)
            } catch {
                self.error = "Failed to log check-in. Try again."
                busy = false
            }
        }
    }
}
