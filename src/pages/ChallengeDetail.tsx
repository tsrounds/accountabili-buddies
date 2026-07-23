import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CalendarDays, Flag, Target } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
  endChallenge,
  getChallenge,
  listCheckins,
  listMembers,
} from '../lib/challenges'
import { computeStandings, frequencyLabel } from '../lib/stats'
import { addDays, dateKey, daysElapsedSince, todayKey } from '../lib/dates'
import { pageEnter } from '../lib/motion'
import type { Challenge, Checkin, Member } from '../lib/types'
import TopBar from '../components/TopBar'
import LoadingScreen from '../components/LoadingScreen'
import Mascot from '../components/Mascot'

/** Last 28 days as a dot grid, oldest first, weeks in rows. */
function HistoryGrid({ dates }: { dates: Set<string> }) {
  const days = useMemo(() => {
    const out: { key: string; has: boolean; isToday: boolean }[] = []
    const today = todayKey()
    for (let i = 27; i >= 0; i--) {
      const key = dateKey(addDays(new Date(), -i))
      out.push({ key, has: dates.has(key), isToday: key === today })
    }
    return out
  }, [dates])

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map((d) => (
        <span
          key={d.key}
          title={d.key}
          className={`aspect-square rounded-md ${
            d.has ? 'bg-steel' : 'bg-space/8'
          } ${d.isToday ? 'ring-2 ring-brick ring-offset-1 ring-offset-papaya' : ''}`}
        />
      ))}
    </div>
  )
}

export default function ChallengeDetail() {
  const { id = '' } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUid, setSelectedUid] = useState<string | null>(null)
  const [confirmEnd, setConfirmEnd] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const c = await getChallenge(id)
      if (!c) {
        navigate('/', { replace: true })
        return
      }
      const [m, ci] = await Promise.all([listMembers(id), listCheckins(id)])
      if (cancelled) return
      setChallenge(c)
      setMembers(m)
      setCheckins(ci)
      setLoading(false)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [id, navigate])

  useEffect(() => {
    if (!loading) pageEnter(rootRef.current)
  }, [loading])

  const standings = useMemo(
    () => (challenge ? computeStandings(challenge, members, checkins) : []),
    [challenge, members, checkins],
  )

  if (loading || !challenge) return <LoadingScreen />

  const historyUid = selectedUid ?? user?.uid ?? standings[0]?.uid
  const historyDates = new Set(
    checkins.filter((c) => c.uid === historyUid).map((c) => c.date),
  )
  const historyName =
    standings.find((s) => s.uid === historyUid)?.firstName ?? 'Someone'

  const dayNumber = daysElapsedSince(challenge.startDate.toDate())
  const progressLabel =
    challenge.durationType === 'fixed' && challenge.duration
      ? `Day ${Math.min(dayNumber, challenge.duration)} of ${challenge.duration}`
      : `Day ${dayNumber} — ongoing`

  return (
    <main className="min-h-dvh pb-16">
      <TopBar title="Mission" />
      <div ref={rootRef} className="mx-auto max-w-lg px-5">
        <section data-animate className="rounded-2xl bg-space p-5 text-papaya shadow-lifted">
          <h2 className="font-display text-3xl leading-tight uppercase">
            {challenge.name}
          </h2>
          {challenge.description && (
            <p className="mt-2 text-sm text-papaya/80">{challenge.description}</p>
          )}
          <p className="mt-3 flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-steel">
            <CalendarDays className="h-4 w-4" aria-hidden />
            {progressLabel}
          </p>
        </section>

        {/* ── Members ─────────────────────────────────── */}
        <section data-animate className="mt-7">
          <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
            The accused
          </h3>
          <ul className="flex flex-col gap-2">
            {standings.map((s) => (
              <li
                key={s.uid}
                className="rounded-xl border-2 border-space/10 bg-white px-4 py-3 shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-space">
                    {s.firstName}
                    {s.uid === user?.uid && (
                      <span className="text-space/40"> (you)</span>
                    )}
                  </p>
                  <span className="font-display text-lg text-space">
                    {s.completionPct}
                    <span className="text-xs text-space/50">%</span>
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-space/70">
                  <Target className="h-3.5 w-3.5 shrink-0 text-steel" aria-hidden />
                  {s.personalGoal} ·{' '}
                  {frequencyLabel(s.targetFrequency, s.frequencyPeriod)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── History ─────────────────────────────────── */}
        <section data-animate className="mt-7">
          <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
            Last 28 days
          </h3>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {standings.map((s) => (
              <button
                key={s.uid}
                onClick={() => setSelectedUid(s.uid)}
                aria-pressed={s.uid === historyUid}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold ${
                  s.uid === historyUid
                    ? 'bg-space text-papaya'
                    : 'bg-space/8 text-space/60'
                }`}
              >
                {s.firstName}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-2 border-space/10 bg-white p-4 shadow-card">
            <HistoryGrid dates={historyDates} />
            <p className="mt-3 text-xs text-space/50">
              {historyName}: {historyDates.size} check-in
              {historyDates.size === 1 ? '' : 's'} on record. The mascot counts
              everything.
            </p>
          </div>
        </section>

        {/* ── Admin: end mission ──────────────────────── */}
        {profile?.isAdmin && (
          <section data-animate className="mt-10 text-center">
            {confirmEnd ? (
              <div className="rounded-xl border-2 border-brick/30 bg-brick/10 p-4">
                <p className="text-sm font-bold text-lava">
                  End “{challenge.name}” for everyone? This is final.
                </p>
                <div className="mt-3 flex justify-center gap-3">
                  <button
                    onClick={() => setConfirmEnd(false)}
                    className="rounded-lg px-5 py-2.5 font-bold text-space/60"
                  >
                    Never mind
                  </button>
                  <button
                    onClick={async () => {
                      await endChallenge(challenge.id)
                      navigate('/', { replace: true })
                    }}
                    className="rounded-lg bg-brick px-5 py-2.5 font-bold text-papaya active:bg-lava"
                  >
                    End it
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmEnd(true)}
                className="inline-flex items-center gap-2 text-sm font-bold text-brick underline underline-offset-4"
              >
                <Flag className="h-4 w-4" aria-hidden />
                End this mission
              </button>
            )}
          </section>
        )}

        <div className="mt-10 flex justify-center opacity-70">
          <Mascot variant={1} size={80} />
        </div>
      </div>
    </main>
  )
}
