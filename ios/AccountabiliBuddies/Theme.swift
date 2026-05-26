import SwiftUI

/// Design tokens ported from the web Tailwind theme (blue + cream palette).
enum Theme {
    static let navy   = Color(hex: 0x111844) // hero, primary buttons, text on light
    static let dust   = Color(hex: 0xEAE0CF) // app background (cream)
    static let ivory  = Color(hex: 0xFAF6EA) // cards, text on navy
    static let frost  = Color(hex: 0x7288AE) // streaks / progress (slate)
    static let indigo = Color(hex: 0x4B5694) // secondary / positive
    static let red    = Color(hex: 0xD7263D) // danger / "Didn't"

    static let ink    = navy
    static let muted  = Color(hex: 0x5C6488)
}

extension Color {
    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red:   Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue:  Double(hex & 0xFF) / 255,
            opacity: alpha
        )
    }
}

// MARK: - Fonts

extension Font {
    /// Bebas Neue — the characterful display face. Uppercase + wide tracking.
    static func display(_ size: CGFloat) -> Font {
        .custom("BebasNeue-Regular", size: size)
    }
}

extension View {
    /// Headline / button label styling: display font, uppercase, tracked out.
    func displayStyle(_ size: CGFloat, tracking: CGFloat = 1.5) -> some View {
        self.font(.display(size))
            .textCase(.uppercase)
            .tracking(tracking)
    }
}

// MARK: - Reusable surfaces

/// A cream card with soft shadow + big radius — the core content surface.
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(Theme.ivory)
            .clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))
            .shadow(color: Theme.navy.opacity(0.08), radius: 14, x: 0, y: 4)
    }
}

extension View {
    func card() -> some View { modifier(CardModifier()) }
}

// MARK: - Buttons

/// Primary pill button — navy fill, ivory label, springy press.
struct PrimaryButtonStyle: ButtonStyle {
    var fill: Color = Theme.navy
    var label: Color = Theme.ivory

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.display(20))
            .textCase(.uppercase)
            .tracking(2)
            .foregroundStyle(label)
            .frame(maxWidth: .infinity, minHeight: 30)
            .padding(.vertical, 14)
            .padding(.horizontal, 20)
            .background(fill)
            .clipShape(Capsule())
            .shadow(color: fill.opacity(0.35), radius: 10, x: 0, y: 4)
            .scaleEffect(configuration.isPressed ? 0.96 : 1)
            .animation(.spring(response: 0.3, dampingFraction: 0.6), value: configuration.isPressed)
    }
}

/// Secondary pill — indigo fill.
extension PrimaryButtonStyle {
    static var secondary: PrimaryButtonStyle { .init(fill: Theme.indigo, label: Theme.ivory) }
    static var danger: PrimaryButtonStyle { .init(fill: Theme.red, label: Theme.ivory) }
}

/// Outline pill — used for low-emphasis actions on cream.
struct OutlineButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.display(18))
            .textCase(.uppercase)
            .tracking(1.5)
            .foregroundStyle(Theme.ink.opacity(0.7))
            .frame(maxWidth: .infinity, minHeight: 24)
            .padding(.vertical, 12)
            .background(
                Capsule().stroke(Theme.ink.opacity(0.2), lineWidth: 1.5)
            )
            .scaleEffect(configuration.isPressed ? 0.97 : 1)
            .animation(.spring(response: 0.3, dampingFraction: 0.6), value: configuration.isPressed)
    }
}
