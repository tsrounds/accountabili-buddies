// Progress helpers for goal tracking.

export type FrequencyPeriod = 'per_day' | 'per_week' | 'per_month'

/** Expected number of check-ins over the whole challenge, or null if ongoing. */
export function targetTotal(
  frequency: number,
  period: FrequencyPeriod,
  durationDays: number | null,
): number | null {
  if (!durationDays || durationDays <= 0) return null
  const perDay =
    period === 'per_day' ? frequency
    : period === 'per_week' ? frequency / 7
    : frequency / 30
  return Math.max(1, Math.round(perDay * durationDays))
}

/** 0–100 progress toward the target. Returns 0 when there's no fixed target. */
export function progressPct(totalCheckins: number, target: number | null): number {
  if (!target) return 0
  return Math.min(100, Math.round((totalCheckins / target) * 100))
}

/** Whole days remaining until the challenge ends, or null if ongoing/unstarted. */
export function daysRemaining(
  startDate: Date | null,
  durationDays: number | null,
): number | null {
  if (!startDate || !durationDays) return null
  const end = new Date(startDate)
  end.setDate(end.getDate() + durationDays)
  const ms = end.getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

export type MemberHealth = 'on_track' | 'behind' | 'mia'

/**
 * Classify a participant's standing.
 * - mia: no check-in in 3+ days (gone dark)
 * - behind: completion rate trails the share of time elapsed
 * - on_track: keeping pace
 */
export function memberHealth(args: {
  lastCheckinDate: string | undefined
  totalCheckins: number
  target: number | null
  daysElapsed: number
  durationDays: number | null
  today: string
}): MemberHealth {
  const { lastCheckinDate, totalCheckins, target, daysElapsed, durationDays, today } = args

  const gapDays = lastCheckinDate
    ? Math.floor((dateMs(today) - dateMs(lastCheckinDate)) / 86_400_000)
    : Infinity
  if (gapDays >= 3) return 'mia'

  if (target && durationDays) {
    const expectedFraction = Math.min(1, daysElapsed / durationDays)
    const actualFraction = totalCheckins / target
    if (actualFraction < expectedFraction - 0.15) return 'behind'
  }
  return 'on_track'
}

function dateMs(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}
