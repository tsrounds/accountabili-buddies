import SwiftUI

/// The app's signature layout: a navy "hero zone" up top that curves into a
/// cream "content zone" below. Used on every screen for visual consistency.
struct ZoneScaffold<Hero: View, Content: View>: View {
    var compact: Bool = false
    @ViewBuilder var hero: () -> Hero
    @ViewBuilder var content: () -> Content

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero
                VStack(spacing: 0) { hero() }
                    .frame(maxWidth: .infinity)
                    .padding(.top, compact ? 16 : 36)
                    .padding(.bottom, compact ? 28 : 40)
                    .padding(.horizontal, 20)
                    .background(Theme.navy)

                // Curved divider
                ZoneDivider()
                    .frame(height: 28)
                    .offset(y: -1)

                // Content
                VStack(spacing: 16) { content() }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal, 20)
                    .padding(.top, 4)
                    .padding(.bottom, 40)
            }
        }
        .background(Theme.dust)
        .scrollIndicators(.hidden)
    }
}

/// A blobby curve that bridges the navy hero into the cream content.
struct ZoneDivider: View {
    var body: some View {
        GeometryReader { geo in
            let w = geo.size.width, h = geo.size.height
            Path { p in
                p.move(to: .init(x: 0, y: 0))
                p.addLine(to: .init(x: 0, y: h * 0.4))
                p.addQuadCurve(to: .init(x: w, y: h * 0.4),
                               control: .init(x: w / 2, y: h * 1.2))
                p.addLine(to: .init(x: w, y: 0))
                p.closeSubpath()
            }
            .fill(Theme.navy)
            .background(Theme.dust)
        }
    }
}
