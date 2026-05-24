// Streak helpers. Dates are "YYYY-MM-DD" strings (local calendar days).

function toUTC(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

const DAY_MS = 86_400_000

/** Whether `b` is the calendar day immediately after `a`. */
function isNextDay(a: string, b: string): boolean {
  return toUTC(b) - toUTC(a) === DAY_MS
}

/** Current + best streak from a list of completed-day strings (any order). */
export function computeStreaks(dates: string[]): { current: number; best: number } {
  const days = Array.from(new Set(dates)).sort()
  if (days.length === 0) return { current: 0, best: 0 }

  let best = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    if (isNextDay(days[i - 1], days[i])) {
      run++
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }

  // Current streak only counts if the most recent day is today or yesterday.
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const last = days[days.length - 1]
  const gap = (toUTC(todayStr) - toUTC(last)) / DAY_MS
  if (gap > 1) return { current: 0, best }

  let current = 1
  for (let i = days.length - 1; i > 0; i--) {
    if (isNextDay(days[i - 1], days[i])) current++
    else break
  }
  return { current, best }
}

/**
 * Streak value after completing today, given the previously stored streak and
 * the last completed date. Used to update the leaderboard on check-in.
 */
export function nextStreak(
  prevStreak: number,
  lastCheckinDate: string | undefined,
  today: string,
): number {
  if (!lastCheckinDate) return 1
  if (lastCheckinDate === today) return Math.max(prevStreak, 1)
  if (isNextDay(lastCheckinDate, today)) return prevStreak + 1
  return 1
}
