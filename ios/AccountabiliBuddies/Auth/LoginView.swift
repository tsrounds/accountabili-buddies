import SwiftUI

struct LoginView: View {
    @EnvironmentObject private var auth: AuthViewModel

    private enum Step { case phone, otp, name }
    @State private var step: Step = .phone

    @State private var phone = "+1"
    @State private var code = ""
    @State private var name = ""

    @State private var verificationID = ""
    @State private var uid = ""

    @State private var busy = false
    @State private var error: String?

    var body: some View {
        ZoneScaffold {
            MascotView(mood: .idle, size: 132, headline: stepLabel)
            Text("Accountabili-\nBuddies")
                .displayStyle(38, tracking: 1)
                .foregroundStyle(Theme.ivory)
                .multilineTextAlignment(.center)
                .padding(.top, 10)
        } content: {
            if let error { ErrorBanner(message: error) }

            switch step {
            case .phone: phoneStep
            case .otp:   otpStep
            case .name:  nameStep
            }

            Text("Your data is used only for this app. No spam. Ever.")
                .font(.footnote)
                .foregroundStyle(Theme.ink.opacity(0.35))
                .frame(maxWidth: .infinity)
                .multilineTextAlignment(.center)
                .padding(.top, 4)
        }
    }

    private var stepLabel: String {
        switch step {
        case .phone: return "Sign In"
        case .otp:   return "Verification"
        case .name:  return "Quick Question"
        }
    }

    // MARK: Steps

    private var phoneStep: some View {
        VStack(alignment: .leading, spacing: 8) {
            FieldLabel(text: "Mobile Number")
            ABTextField(placeholder: "+1 555 000 0000", text: $phone, keyboard: .phonePad)
            Text("Include your country code (e.g. +1 for US/Canada)")
                .font(.footnote).foregroundStyle(Theme.ink.opacity(0.5))

            Button(action: sendCode) {
                Text(busy ? "Sending Code…" : "Send Code")
            }
            .buttonStyle(PrimaryButtonStyle())
            .disabled(busy)
            .padding(.top, 6)
        }
    }

    private var otpStep: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Code sent to \(phone)")
                .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.6))
                .frame(maxWidth: .infinity, alignment: .center)

            TextField("------", text: $code)
                .keyboardType(.numberPad)
                .textContentType(.oneTimeCode)
                .multilineTextAlignment(.center)
                .font(.display(34))
                .tracking(12)
                .foregroundStyle(Theme.ink)
                .padding(.vertical, 14)
                .background(Color.white.opacity(0.6))
                .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
                .overlay(RoundedRectangle(cornerRadius: 18, style: .continuous)
                    .strokeBorder(Theme.ink.opacity(0.12), lineWidth: 1))
                .onChange(of: code) { code = String($0.filter(\.isNumber).prefix(6)) }

            Button(action: confirmCode) {
                Text(busy ? "Verifying…" : "Confirm Code")
            }
            .buttonStyle(PrimaryButtonStyle())
            .disabled(busy || code.count != 6)

            Button("Wrong number? Start over") {
                step = .phone; code = ""; error = nil
            }
            .font(.subheadline)
            .foregroundStyle(Theme.ink.opacity(0.4))
            .frame(maxWidth: .infinity)
        }
    }

    private var nameStep: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("What should we call you?")
                .font(.subheadline).foregroundStyle(Theme.ink.opacity(0.6))
                .frame(maxWidth: .infinity, alignment: .center)
            FieldLabel(text: "First Name")
            ABTextField(placeholder: "e.g. Theodore", text: $name, autocaps: .words)
            Button(action: saveName) {
                Text(busy ? "Joining…" : "I'm In")
            }
            .buttonStyle(PrimaryButtonStyle())
            .disabled(busy || name.trimmingCharacters(in: .whitespaces).isEmpty)
            .padding(.top, 6)
        }
    }

    // MARK: Actions

    private func sendCode() {
        error = nil; busy = true
        Task {
            do {
                verificationID = try await FirebaseService.sendVerificationCode(phone: phone)
                withAnimation { step = .otp }
            } catch { self.error = friendly(error) }
            busy = false
        }
    }

    private func confirmCode() {
        error = nil; busy = true
        Task {
            do {
                let signedInUid = try await FirebaseService.confirmCode(verificationID: verificationID, code: code)
                uid = signedInUid
                if let existing = try await FirebaseService.fetchUser(uid: signedInUid) {
                    auth.setUser(existing)
                } else {
                    withAnimation { step = .name }
                }
            } catch { self.error = friendly(error) }
            busy = false
        }
    }

    private func saveName() {
        error = nil; busy = true
        Task {
            do {
                let user = try await FirebaseService.createUser(
                    uid: uid,
                    firstName: name.trimmingCharacters(in: .whitespaces),
                    phone: phone
                )
                auth.setUser(user)
            } catch { self.error = friendly(error) }
            busy = false
        }
    }

    private func friendly(_ error: Error) -> String {
        let ns = error as NSError
        switch ns.code {
        case 17010: return "Too many attempts. Please try again later."
        case 17044, 17046: return "Incorrect or expired code. Try again."
        case 17042: return "Invalid phone number. Include your country code (e.g. +1)."
        default: return ns.localizedDescription
        }
    }
}
