/** Local-time date key, e.g. "2026-07-23". All check-ins key off this. */
export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayKey(): string {
  return dateKey()
}

export function addDays(d: Date, n: number): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + n)
  return copy
}

/** Whole days elapsed since `start`, counting the start day itself (min 1). */
export function daysElapsedSince(start: Date, now: Date = new Date()): number {
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = Math.round((nowMidnight.getTime() - startMidnight.getTime()) / 86_400_000)
  return Math.max(1, diff + 1)
}

/** ISO-8601 week id, e.g. "2026-W30". */
export function isoWeekId(d: Date = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

/** Monday→Sunday range (local time) for the week containing `d`. */
export function weekRange(d: Date = new Date()): { start: Date; end: Date } {
  const day = d.getDay() || 7 // Mon=1 … Sun=7
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - (day - 1))
  const sunday = addDays(monday, 6)
  return { start: monday, end: sunday }
}

export function formatDay(key: string): string {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
