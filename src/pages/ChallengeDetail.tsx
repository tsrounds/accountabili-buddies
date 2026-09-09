import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CalendarDays, Flag, Target, X, AlertTriangle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
  checkInForDate,
  endChallenge,
  getChallenge,
  listCheckins,
  listMembers,
} from '../lib/challenges'
import { computeStandings, frequencyLabel } from '../lib/stats'
import { addDays, dateKey, daysElapsedSince, todayKey } from '../lib/dates'
import { attachListHoverLift, pageEnter } from '../lib/motion'
import type { Challenge, Checkin, Member } from '../lib/types'
import TopBar from '../components/TopBar'
import LoadingScreen from '../components/LoadingScreen'
import Mascot from '../components/Mascot'
import RecordBadge from '../components/RecordBadge'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

interface CalendarDay {
  key: string
  day: number
  month: number
  has: boolean
  isToday: boolean
  note: string
}

const BACKDATE_QUIPS = [
  "Oh, so you 'definitely' did it that day? Sure, Jan.",
  "Adding it late? The mascot is watching. And judging.",
  "Retroactive accountability — how very convenient of you.",
  "We're choosing to believe you. Reluctantly.",
  "Filing this under 'trust but verify.' Heavy on the verify.",
  "The mascot would like it noted that this is suspicious.",
  "Backfilling, huh? Bold move for someone with 'integrity.'",
  "Fine. But if you're lying, the mascot will know.",
]

function HistoryCalendar({
  checkins,
  name,
  isOwnHistory,
  challengeId,
  uid,
  firstName,
  avatarSeed,
  onCheckinAdded,
}: {
  checkins: Checkin[]
  name: string
  isOwnHistory: boolean
  challengeId: string
  uid: string
  firstName: string
  avatarSeed: string
  onCheckinAdded: () => void
}) {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null)
  const [backdateDay, setBackdateDay] = useState<CalendarDay | null>(null)
  const [backdateNote, setBackdateNote] = useState('')
  const [backdateBusy, setBackdateBusy] = useState(false)
  const [quip] = useState(() => BACKDATE_QUIPS[Math.floor(Math.random() * BACKDATE_QUIPS.length)])

  const notesByDate = useMemo(() => {
    const map = new Map<string, string>()
    for (const c of checkins) {
      if (c.note) map.set(c.date, c.note)
    }
    return map
  }, [checkins])

  const dateSet = useMemo(
    () => new Set(checkins.map((c) => c.date)),
    [checkins],
  )

  const { leadBlanks, cells } = useMemo(() => {
    const today = todayKey()
    const startDate = addDays(new Date(), -27)
    const startDow = startDate.getDay()

    const days: CalendarDay[] = []
    for (let i = 0; i < 28; i++) {
      const d = addDays(new Date(), -27 + i)
      const key = dateKey(d)
      days.push({
        key,
        day: d.getDate(),
        month: d.getMonth(),
        has: dateSet.has(key),
        isToday: key === today,
        note: notesByDate.get(key) ?? '',
      })
    }
    return { leadBlanks: startDow, cells: days }
  }, [dateSet, notesByDate])

  const checkinCount = dateSet.size

  function handleDayClick(d: CalendarDay) {
    if (d.has) {
      setSelectedDay(d)
      return
    }
    if (isOwnHistory && !d.isToday) {
      setBackdateDay(d)
      setBackdateNote('')
    }
  }

  async function submitBackdate() {
    if (!backdateDay || backdateBusy) return
    setBackdateBusy(true)
    try {
      await checkInForDate(challengeId, uid, firstName, avatarSeed, backdateDay.key, backdateNote.trim())
      setBackdateDay(null)
      onCheckinAdded()
    } catch (err) {
      console.error('backdate check-in failed', err)
    } finally {
      setBackdateBusy(false)
    }
  }

  return (
    <div className="relative">
      {/* Weekday header */}
      <div className="mb-1 grid grid-cols-7 gap-px">
        {WEEKDAYS.map((wd) => (
          <span
            key={wd}
            className="py-1 text-center text-[10px] font-bold uppercase tracking-widest text-space/40"
          >
            {wd}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px">
        {Array.from({ length: leadBlanks }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {cells.map((d) => {
          const isNewMonth = d.day === 1
          const canBackdate = isOwnHistory && !d.has && !d.isToday
          return (
            <button
              key={d.key}
              type="button"
              disabled={!d.has && !canBackdate}
              onClick={() => handleDayClick(d)}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border transition-colors ${
                d.has
                  ? 'bg-steel text-papaya border-steel hover:bg-steel/90 active:bg-steel/80 cursor-pointer shadow-card'
                  : canBackdate
                    ? 'bg-space/[0.06] text-space/60 border-space/15 hover:bg-brick/10 hover:text-brick hover:border-brick/40 cursor-pointer border-dashed'
                    : 'bg-space/[0.06] text-space/50 border-space/15'
              } ${d.isToday ? 'ring-2 ring-brick ring-offset-1 ring-offset-white' : ''}`}
            >
              {isNewMonth && (
                <span
                  className={`absolute -top-0.5 text-[8px] font-bold uppercase leading-none ${
                    d.has ? 'text-papaya/80' : 'text-space/50'
                  }`}
                >
                  {new Date(2000, d.month).toLocaleString(undefined, {
                    month: 'short',
                  })}
                </span>
              )}
              <span
                className={`text-sm leading-none ${d.has ? 'font-bold' : ''}`}
              >
                {d.day}
              </span>
              {d.has && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-papaya" />
              )}
            </button>
          )
        })}
      </div>

      {/* Summary */}
      <p className="mt-3 text-xs text-space/50">
        {name}: {checkinCount} check-in
        {checkinCount === 1 ? '' : 's'} on record. The mascot counts everything.
      </p>
      {isOwnHistory && (
        <p className="mt-1 text-xs text-brick/60 italic">
          Tap an empty day to add a missed check-in. We'll allow it. Barely.
        </p>
      )}

      {/* Note popup (existing check-in) */}
      {selectedDay && (
        <div className="absolute inset-x-0 bottom-0 z-10 animate-[slideUp_150ms_ease-out]">
          <div className="mx-auto max-w-sm rounded-xl border-2 border-space/10 bg-white p-4 shadow-lifted">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-space/40">
                  {new Date(selectedDay.key + 'T12:00:00').toLocaleDateString(
                    undefined,
                    {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    },
                  )}
                </p>
                <p className="mt-2 text-sm text-space">
                  {selectedDay.note || 'Checked in — no note added.'}
                </p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="shrink-0 rounded-full p-1 text-space/40 hover:bg-space/8 hover:text-space"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdate modal */}
      {backdateDay && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-space/40 backdrop-blur-sm sm:items-center"
          onClick={() => !backdateBusy && setBackdateDay(null)}
        >
          <div
            className="w-full max-w-sm animate-[slideUp_200ms_ease-out] rounded-t-2xl bg-papaya p-6 shadow-lifted sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brick" aria-hidden />
              <div>
                <h3 className="font-display text-lg tracking-wide uppercase text-space">
                  Backdating, huh?
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-space/40">
                  {new Date(backdateDay.key + 'T12:00:00').toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border-2 border-brick/20 bg-brick/5 p-3">
              <p className="text-sm italic text-lava leading-relaxed">
                "{quip}"
              </p>
              <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-brick/50">
                — The Mascot's official position
              </p>
            </div>

            <input
              autoFocus
              type="text"
              maxLength={140}
              value={backdateNote}
              onChange={(e) => setBackdateNote(e.target.value)}
              placeholder="Prove it — what did you actually do?"
              className="mt-4 w-full rounded-xl border-2 border-space/15 bg-white px-4 py-3 text-sm text-space placeholder:text-space/30 focus:border-steel"
            />

            <button
              onClick={submitBackdate}
              disabled={backdateBusy}
              className="font-display mt-4 w-full rounded-xl bg-brick py-3.5 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
            >
              {backdateBusy ? 'Logging it...' : "I swear I did it"}
            </button>

            <button
              onClick={() => setBackdateDay(null)}
              disabled={backdateBusy}
              className="mt-2 w-full py-2 text-center text-sm font-bold text-space/50"
            >
              Never mind
            </button>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

export default function ChallengeDetail() {
  const { id = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const memberParam = searchParams.get('member')
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUid, setSelectedUid] = useState<string | null>(null)
  const [confirmEnd, setConfirmEnd] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<HTMLElement>(null)
  const memberHoverCleanups = useRef(new Map<string, () => void>())

  function viewMemberCalendar(uid: string) {
    setSelectedUid(uid)
    requestAnimationFrame(() => {
      historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const [refreshKey, setRefreshKey] = useState(0)

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
  }, [id, navigate, refreshKey])

  useEffect(() => {
    if (!loading) pageEnter(rootRef.current)
  }, [loading])

  useEffect(() => {
    if (loading || !memberParam) return
    setSelectedUid(memberParam)
    requestAnimationFrame(() => {
      historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    const next = new URLSearchParams(searchParams)
    next.delete('member')
    setSearchParams(next, { replace: true })
  }, [loading, memberParam, searchParams, setSearchParams])

  const standings = useMemo(
    () => (challenge ? computeStandings(challenge, members, checkins) : []),
    [challenge, members, checkins],
  )

  if (loading || !challenge) return <LoadingScreen />

  const historyUid = selectedUid ?? user?.uid ?? standings[0]?.uid
  const historyCheckins = checkins.filter((c) => c.uid === historyUid)
  const historyName =
    standings.find((s) => s.uid === historyUid)?.firstName ?? 'Someone'

  const dayNumber = daysElapsedSince(challenge.startDate.toDate())
  const progressLabel =
    challenge.durationType === 'fixed' && challenge.duration
      ? `Day ${Math.min(dayNumber, challenge.duration)} of ${challenge.duration}`
      : `Day ${dayNumber} — ongoing`

  return (
    <main className="min-h-dvh pb-16">
      <TopBar title="Challenge" />
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
            The crew
          </h3>
          <ul className="flex flex-col gap-2">
            {standings.map((s) => (
              <li
                key={s.uid}
                ref={(el) => attachListHoverLift(el, s.uid, memberHoverCleanups.current, { scale: 1.02, y: -1 })}
              >
                <button
                  type="button"
                  onClick={() => viewMemberCalendar(s.uid)}
                  aria-label={`View ${s.firstName}'s calendar`}
                  className="w-full rounded-xl border-2 border-space/10 bg-white px-4 py-3 text-left shadow-card hover:border-steel/50 hover:bg-steel/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-space">
                      {s.firstName}
                      {s.uid === user?.uid && (
                        <span className="text-space/40"> (you)</span>
                      )}
                    </p>
                    <div className="flex items-center gap-2">
                      {s.weeklyRecord && <RecordBadge record={s.weeklyRecord} />}
                      <span className="font-display text-lg text-space">
                        {s.completionPct}
                        <span className="text-xs text-space/50">%</span>
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-space/70">
                    <Target className="h-3.5 w-3.5 shrink-0 text-steel" aria-hidden />
                    {s.personalGoal} ·{' '}
                    {frequencyLabel(s.targetFrequency, s.frequencyPeriod)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ── History ─────────────────────────────────── */}
        <section ref={historyRef} data-animate className="mt-7 scroll-mt-4">
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
                    : 'bg-space/8 text-space/60 hover:bg-space/12 hover:text-space/80'
                }`}
              >
                {s.firstName}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-2 border-space/10 bg-white p-4 shadow-card">
            <HistoryCalendar
              checkins={historyCheckins}
              name={historyName}
              isOwnHistory={historyUid === user?.uid}
              challengeId={challenge.id}
              uid={historyUid}
              firstName={profile?.firstName ?? ''}
              avatarSeed={profile?.avatarSeed ?? ''}
              onCheckinAdded={() => setRefreshKey((k) => k + 1)}
            />
          </div>
        </section>

        {/* ── Admin: end challenge ─────────────────────── */}
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
                className="inline-flex items-center gap-2 text-sm font-bold text-brick underline underline-offset-4 hover:text-lava"
              >
                <Flag className="h-4 w-4" aria-hidden />
                End this challenge
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
