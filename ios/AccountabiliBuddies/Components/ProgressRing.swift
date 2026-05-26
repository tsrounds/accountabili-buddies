import SwiftUI

/// Circular progress indicator with a centered label.
struct ProgressRing: View {
    var percent: Int           // 0–100
    var size: CGFloat = 104
    var stroke: CGFloat = 11
    var label: String
    var sublabel: String?

    @State private var animated: CGFloat = 0

    var body: some View {
        ZStack {
            Circle()
                .stroke(Theme.ink.opacity(0.10), lineWidth: stroke)
            Circle()
                .trim(from: 0, to: animated)
                .stroke(Theme.frost, style: .init(lineWidth: stroke, lineCap: .round))
                .rotationEffect(.degrees(-90))
            VStack(spacing: 0) {
                Text(label).font(.display(size * 0.26)).foregroundStyle(Theme.ink)
                if let sublabel {
                    Text(sublabel)
                        .font(.system(size: size * 0.11, weight: .medium))
                        .foregroundStyle(Theme.ink.opacity(0.45))
                }
            }
        }
        .frame(width: size, height: size)
        .onAppear { animate() }
        .onChange(of: percent) { _ in animate() }
    }

    private func animate() {
        withAnimation(.spring(response: 0.7, dampingFraction: 0.85)) {
            animated = CGFloat(percent) / 100
        }
    }
}
