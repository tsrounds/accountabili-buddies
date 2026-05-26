import Foundation

/// AB's voice. Dry, deadpan, keeping receipts — never cruel, just "noting it."
/// Ported from the web `roastTemplates.ts`.
enum Roasts {
    /// Shown when you open a challenge you haven't checked into today.
    static let reminders: [String] = [
        "Hey {name}. Just checking in. You haven't. Yet.",
        "Today is still happening, {name}. Just putting that out there.",
        "You're not behind yet. You could be though. Maybe check in.",
        "We're not keeping score. (We are.)",
        "Your buddies are watching the board. Your spot is very... available.",
        "One check-in. That's all. You've done harder things. Probably.",
        "Still time today, {name}. Not a lot of time. But some.",
        "We believe in you, {name}. We also have the data.",
    ]

    /// Shown after you check in / when you're keeping pace.
    static let proud: [String] = [
        "Fine. You did the thing. Noted.",
        "Look at you. Showing up. Weird, but I'll allow it.",
        "Logged. The streak lives another day, {name}.",
        "Okay, that was actually good. Don't let it go to your head.",
    ]

    /// Shown when a challenge is complete.
    static let complete: [String] = [
        "You finished. I genuinely didn't think you would.",
        "Done. That's the whole thing. You did the whole thing.",
        "Challenge complete. I'll pretend I never doubted you.",
    ]

    static func reminder(name: String) -> String { fill(reminders.randomElement()!, name: name) }
    static func proudLine(name: String) -> String { fill(proud.randomElement()!, name: name) }
    static func completeLine(name: String) -> String { fill(complete.randomElement()!, name: name) }

    private static func fill(_ template: String, name: String) -> String {
        template.replacingOccurrences(of: "{name}", with: name)
    }
}
