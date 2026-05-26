import SwiftUI

enum MascotMood {
    case idle, proud, lagging, celebrate

    var headline: String {
        switch self {
        case .idle:      return "Oh, you showed up."
        case .proud:     return "Fine. You're doing great."
        case .lagging:   return "Behind already?"
        case .celebrate: return "Okay. You did it."
        }
    }

    var face: String {
        switch self {
        case .idle:      return "•  ‿  •"
        case .proud:     return "^  ‿  ^"
        case .lagging:   return "•  .  •"
        case .celebrate: return "★  ‿  ★"
        }
    }
}

/// AB the mascot — a soft circular avatar + a headline. Placeholder face stands
/// in for the real art; swap the inner content when the asset lands.
struct MascotView: View {
    var mood: MascotMood = .idle
    var size: CGFloat = 132
    var headline: String? = nil

    @State private var appeared = false

    var body: some View {
        VStack(spacing: 10) {
            Circle()
                .fill(Theme.ivory.opacity(0.12))
                .overlay(Circle().strokeBorder(Theme.ivory.opacity(0.22), lineWidth: 2))
                .overlay(
                    Text(mood.face)
                        .font(.display(size * 0.16))
                        .foregroundStyle(Theme.ivory.opacity(0.85))
                        .tracking(2)
                )
                .frame(width: size, height: size)
                .scaleEffect(appeared ? 1 : 0.9)
                .opacity(appeared ? 1 : 0)

            Text(headline ?? mood.headline)
                .displayStyle(size > 110 ? 30 : 22)
                .foregroundStyle(Theme.ivory)
                .multilineTextAlignment(.center)
                .opacity(appeared ? 1 : 0)
                .offset(y: appeared ? 0 : 8)
        }
        .onAppear {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) { appeared = true }
        }
        .animation(.spring(response: 0.4, dampingFraction: 0.7), value: mood)
    }
}
