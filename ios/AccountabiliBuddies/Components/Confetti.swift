import SwiftUI

/// A lightweight one-shot confetti burst. Drop into a ZStack and toggle `fire`.
struct ConfettiView: View {
    var fire: Bool
    private let pieces = 36
    private let colors: [Color] = [Theme.frost, Theme.indigo, Theme.navy, Theme.red, Theme.ivory]

    var body: some View {
        GeometryReader { geo in
            ZStack {
                ForEach(0..<pieces, id: \.self) { i in
                    ConfettiPiece(
                        color: colors[i % colors.count],
                        startX: CGFloat.random(in: 0...geo.size.width),
                        endY: geo.size.height + 40,
                        fire: fire,
                        delay: Double(i) * 0.012
                    )
                }
            }
        }
        .allowsHitTesting(false)
        .ignoresSafeArea()
    }
}

private struct ConfettiPiece: View {
    var color: Color
    var startX: CGFloat
    var endY: CGFloat
    var fire: Bool
    var delay: Double

    @State private var y: CGFloat = -40
    @State private var spin = 0.0
    @State private var opacity = 0.0

    var body: some View {
        RoundedRectangle(cornerRadius: 2)
            .fill(color)
            .frame(width: 8, height: 12)
            .rotationEffect(.degrees(spin))
            .opacity(opacity)
            .position(x: startX, y: y)
            .onChange(of: fire) { go in if go { launch() } }
    }

    private func launch() {
        y = -40; spin = 0; opacity = 1
        withAnimation(.easeIn(duration: 1.8).delay(delay)) {
            y = endY
            spin = Double.random(in: 360...900)
        }
        withAnimation(.easeOut(duration: 0.4).delay(delay + 1.4)) { opacity = 0 }
    }
}
