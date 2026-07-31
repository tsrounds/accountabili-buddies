import type { WeeklyRecord } from '../lib/types'

/** Small "3W-1L" tag, muted when the sample is too small or empty. */
export default function RecordBadge({ record }: { record: WeeklyRecord }) {
  const total = record.wins + record.losses
  if (total === 0) {
    return (
      <span className="rounded-md bg-space/8 px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase text-space/50">
        New
      </span>
    )
  }
  const muted = total < 2
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase ${
        muted ? 'bg-space/8 text-space/50' : 'bg-steel/25 text-space'
      }`}
      aria-label={`${record.wins} wins, ${record.losses} losses`}
    >
      {record.wins}W-{record.losses}L
    </span>
  )
}
