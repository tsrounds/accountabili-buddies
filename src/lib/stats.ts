import type { Challenge, Checkin, Member, MemberStanding } from './types'
import { daysElapsedSince, todayKey, dateKey, addDays } from './dates'

/** Expected check-ins for a member given how long the challenge has run. */
export function expectedCheckins(member: Member, challenge: Challenge): number {
  const start = challenge.startDate?.toDate?.() ?? new Date()
  const days = daysElapsedSince(start)
  switch (member.frequencyPeriod) {
    case 'per_day':
      return member.targetFrequency * days
    case 'per_week':
      return (member.targetFrequency * days) / 7
    case 'per_month':
      return (member.targetFrequency * days) / 30.437
  }
}

export function completionPct(total: number, expected: number): number {
  if (expected <= 0) return 0
  return Math.min(100, Math.round((total / expected) * 100))
}

/** Consecutive calendar days with a check-in, ending today or yesterday. */
export function computeStreak(dates: Set<string>): number {
  let cursor = new Date()
  if (!dates.has(dateKey(cursor))) cursor = addDays(cursor, -1)
  let streak = 0
  while (dates.has(dateKey(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

/**
 * Fold members + all their check-ins into ranked standings.
 * Rank is by completion %, ties broken by total check-ins.
 */
export function computeStandings(
  challenge: Challenge,
  members: Member[],
  checkins: Checkin[],
): MemberStanding[] {
  const today = todayKey()
  const byUid = new Map<string, Checkin[]>()
  for (const c of checkins) {
    const list = byUid.get(c.uid) ?? []
    list.push(c)
    byUid.set(c.uid, list)
  }

  const standings = members.map((m) => {
    const mine = byUid.get(m.uid) ?? []
    const dates = new Set(mine.map((c) => c.date))
    const total = dates.size
    const pct = completionPct(total, expectedCheckins(m, challenge))
    return {
      uid: m.uid,
      firstName: m.firstName,
      avatarSeed: m.avatarSeed,
      personalGoal: m.personalGoal,
      targetFrequency: m.targetFrequency,
      frequencyPeriod: m.frequencyPeriod,
      totalCheckins: total,
      completionPct: pct,
      streak: computeStreak(dates),
      checkedInToday: dates.has(today),
      rank: 0,
    }
  })

  standings.sort(
    (a, b) => b.completionPct - a.completionPct || b.totalCheckins - a.totalCheckins,
  )
  standings.forEach((s, i) => (s.rank = i + 1))
  return standings
}

export function frequencyLabel(freq: number, period: string): string {
  const unit = period === 'per_day' ? 'day' : period === 'per_week' ? 'week' : 'month'
  return `${freq}× per ${unit}`
}
