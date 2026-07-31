import type {
  Challenge,
  Checkin,
  FrequencyPeriod,
  Member,
  MemberStanding,
  WeekOutcome,
  WeeklyRecord,
} from './types'
import { addDays, dateKey, daysElapsedSince, isoWeekId, todayKey, weekRange } from './dates'
import { FALLBACK_AVATAR_SEED } from './avatar'

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

/** Weekly target derived from a member's cadence. `per_month` is not scored. */
export function getWeeklyTarget(
  targetFrequency: number,
  frequencyPeriod: FrequencyPeriod,
): number | null {
  if (frequencyPeriod === 'per_month') return null
  if (frequencyPeriod === 'per_day') return Math.max(1, targetFrequency * 7)
  return Math.max(1, targetFrequency)
}

/**
 * Walks every completed ISO week between (start of eligibility) and (current
 * week, exclusive), returning a W/L record. Eligibility starts on the Monday
 * of the week AFTER the member joined (or the challenge started) unless they
 * joined on a Monday, in which case that same week counts. Returns null for
 * `per_month` members — they're not scored under W/L.
 */
export function computeWeeklyRecord(
  member: Member,
  memberCheckins: Checkin[],
  challenge: Challenge,
  now: Date = new Date(),
): WeeklyRecord | null {
  const weeklyTarget = getWeeklyTarget(member.targetFrequency, member.frequencyPeriod)
  if (weeklyTarget === null) return null

  const datesByWeek = new Map<string, Set<string>>()
  for (const c of memberCheckins) {
    const [y, m, d] = c.date.split('-').map(Number)
    if (!y || !m || !d) continue
    const dt = new Date(y, m - 1, d)
    const wid = isoWeekId(dt)
    let bucket = datesByWeek.get(wid)
    if (!bucket) {
      bucket = new Set<string>()
      datesByWeek.set(wid, bucket)
    }
    bucket.add(c.date)
  }

  const challengeStart = challenge.startDate?.toDate?.() ?? new Date()
  const joined = member.joinedAt?.toDate?.() ?? challengeStart
  let eligible = joined.getTime() > challengeStart.getTime() ? joined : challengeStart
  // If not a Monday, skip to the following Monday (mid-week joiners lose that week).
  if (eligible.getDay() !== 1) {
    eligible = addDays(weekRange(eligible).end, 1)
  }

  const currentWeekStart = weekRange(now).start
  const weeks: WeekOutcome[] = []
  let cursor = weekRange(eligible).start

  while (cursor.getTime() < currentWeekStart.getTime()) {
    const wid = isoWeekId(cursor)
    const count = datesByWeek.get(wid)?.size ?? 0
    const pct = Math.round((count / weeklyTarget) * 100)
    weeks.push({ weekId: wid, pct, hit: count >= weeklyTarget })
    cursor = addDays(cursor, 7)
  }

  const wins = weeks.reduce((n, w) => (w.hit ? n + 1 : n), 0)
  return { weeklyTarget, wins, losses: weeks.length - wins, weeks }
}

/**
 * Fold members + all their check-ins into ranked standings.
 * Rank is by completion %, ties broken by weekly wins then total check-ins.
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
      avatarSeed: m.avatarSeed ?? FALLBACK_AVATAR_SEED,
      personalGoal: m.personalGoal,
      targetFrequency: m.targetFrequency,
      frequencyPeriod: m.frequencyPeriod,
      totalCheckins: total,
      completionPct: pct,
      streak: computeStreak(dates),
      checkedInToday: dates.has(today),
      rank: 0,
      weeklyRecord: computeWeeklyRecord(m, mine, challenge),
    }
  })

  standings.sort((a, b) => {
    if (b.completionPct !== a.completionPct) return b.completionPct - a.completionPct
    const aWins = a.weeklyRecord?.wins ?? 0
    const bWins = b.weeklyRecord?.wins ?? 0
    if (bWins !== aWins) return bWins - aWins
    return b.totalCheckins - a.totalCheckins
  })
  standings.forEach((s, i) => (s.rank = i + 1))
  return standings
}

export function frequencyLabel(freq: number, period: string): string {
  const unit = period === 'per_day' ? 'day' : period === 'per_week' ? 'week' : 'month'
  return `${freq}× per ${unit}`
}
