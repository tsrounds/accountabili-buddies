import Foundation

// MARK: - Domain models

struct AbUser: Identifiable, Equatable {
    let uid: String
    var firstName: String
    var phone: String
    var id: String { uid }
}

enum ChallengeStatus: String { case lobby, active, complete }
enum DurationType: String { case fixed, ongoing }
enum ProofType: String { case honor, photo }
enum ChallengeVisibility: String { case `private`, `public` }

enum FrequencyPeriod: String, CaseIterable, Identifiable {
    case per_day, per_week, per_month
    var id: String { rawValue }
    var label: String {
        switch self {
        case .per_day:   return "Per Day"
        case .per_week:  return "Per Week"
        case .per_month: return "Per Month"
        }
    }
    var short: String { rawValue.replacingOccurrences(of: "per_", with: "per ") }
}

struct Challenge: Identifiable {
    let id: String
    var name: String
    var creatorUid: String
    var creatorFirstName: String
    var duration: Int?
    var durationType: DurationType
    var proofType: ProofType
    var visibility: ChallengeVisibility
    var category: String
    var description: String
    var status: ChallengeStatus
    var startDate: Date?
}

struct Member: Identifiable {
    let uid: String
    var firstName: String
    var personalGoal: String
    var targetFrequency: Int
    var frequencyPeriod: FrequencyPeriod
    var id: String { uid }
}

struct LeaderboardEntry: Identifiable {
    let uid: String
    var firstName: String
    var totalCheckins: Int
    var currentStreak: Int
    var bestStreak: Int
    var lastCheckinDate: String?
    var id: String { uid }
}

// MARK: - Date helpers

enum DayKey {
    /// Local calendar day as "YYYY-MM-DD".
    static func today() -> String { string(from: Date()) }

    static func string(from date: Date) -> String {
        let c = Calendar.current.dateComponents([.year, .month, .day], from: date)
        return String(format: "%04d-%02d-%02d", c.year ?? 0, c.month ?? 0, c.day ?? 0)
    }

    private static func utc(_ s: String) -> Int? {
        let parts = s.split(separator: "-").compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        var c = DateComponents()
        c.year = parts[0]; c.month = parts[1]; c.day = parts[2]
        var cal = Calendar(identifier: .gregorian)
        cal.timeZone = TimeZone(identifier: "UTC")!
        guard let d = cal.date(from: c) else { return nil }
        return Int(d.timeIntervalSince1970)
    }

    static func isNextDay(_ a: String, _ b: String) -> Bool {
        guard let ua = utc(a), let ub = utc(b) else { return false }
        return ub - ua == 86_400
    }
}

// MARK: - Streak logic (ported from streaks.ts)

enum Streaks {
    /// Streak value after completing `today`, given the previously stored streak.
    static func next(prevStreak: Int, lastCheckinDate: String?, today: String) -> Int {
        guard let last = lastCheckinDate else { return 1 }
        if last == today { return max(prevStreak, 1) }
        if DayKey.isNextDay(last, today) { return prevStreak + 1 }
        return 1
    }
}

// MARK: - Progress logic (ported from progress.ts)

enum Metrics {
    /// Expected total check-ins across the whole challenge, or nil if ongoing.
    static func targetTotal(frequency: Int, period: FrequencyPeriod, durationDays: Int?) -> Int? {
        guard let days = durationDays, days > 0 else { return nil }
        let perDay: Double
        switch period {
        case .per_day:   perDay = Double(frequency)
        case .per_week:  perDay = Double(frequency) / 7
        case .per_month: perDay = Double(frequency) / 30
        }
        return max(1, Int((perDay * Double(days)).rounded()))
    }

    /// 0–100 progress toward the target; 0 when there's no fixed target.
    static func pct(totalCheckins: Int, target: Int?) -> Int {
        guard let target, target > 0 else { return 0 }
        return min(100, Int((Double(totalCheckins) / Double(target) * 100).rounded()))
    }

    static func daysRemaining(startDate: Date?, durationDays: Int?) -> Int? {
        guard let startDate, let durationDays else { return nil }
        let end = Calendar.current.date(byAdding: .day, value: durationDays, to: startDate)!
        let ms = end.timeIntervalSinceNow
        return max(0, Int(ceil(ms / 86_400)))
    }

    enum Health { case onTrack, behind, mia }

    static func memberHealth(
        lastCheckinDate: String?, totalCheckins: Int, target: Int?,
        daysElapsed: Int, durationDays: Int?, today: String
    ) -> Health {
        let gap: Int = {
            guard let last = lastCheckinDate,
                  let utcLast = dayMs(last), let utcToday = dayMs(today) else { return .max }
            return (utcToday - utcLast) / 86_400
        }()
        if gap >= 3 { return .mia }
        if let target, let durationDays, durationDays > 0 {
            let expected = min(1, Double(daysElapsed) / Double(durationDays))
            let actual = Double(totalCheckins) / Double(target)
            if actual < expected - 0.15 { return .behind }
        }
        return .onTrack
    }

    private static func dayMs(_ s: String) -> Int? {
        let parts = s.split(separator: "-").compactMap { Int($0) }
        guard parts.count == 3 else { return nil }
        var c = DateComponents(); c.year = parts[0]; c.month = parts[1]; c.day = parts[2]
        var cal = Calendar(identifier: .gregorian); cal.timeZone = TimeZone(identifier: "UTC")!
        return cal.date(from: c).map { Int($0.timeIntervalSince1970) }
    }
}
