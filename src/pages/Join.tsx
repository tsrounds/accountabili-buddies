import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getChallenge, getInvite, getMember, joinChallenge } from '../lib/challenges'
import { pageEnter } from '../lib/motion'
import type { Challenge, FrequencyPeriod } from '../lib/types'
import TopBar from '../components/TopBar'
import Mascot from '../components/Mascot'
import LoadingScreen from '../components/LoadingScreen'

type State =
  | { phase: 'loading' }
  | { phase: 'invalid' }
  | { phase: 'form'; challenge: Challenge }

export default function Join() {
  const { code = '' } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [state, setState] = useState<State>({ phase: 'loading' })
  const [goal, setGoal] = useState('')
  const [frequency, setFrequency] = useState(3)
  const [period, setPeriod] = useState<FrequencyPeriod>('per_week')
  const [busy, setBusy] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user) return
      const invite = await getInvite(code)
      if (!invite) {
        if (!cancelled) setState({ phase: 'invalid' })
        return
      }
      const challenge = await getChallenge(invite.challengeId)
      if (!challenge || challenge.status !== 'active') {
        if (!cancelled) setState({ phase: 'invalid' })
        return
      }
      // Already in? Straight to the dashboard.
      const existing = await getMember(challenge.id, user.uid)
      if (existing) {
        navigate('/', { replace: true })
        return
      }
      if (!cancelled) setState({ phase: 'form', challenge })
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [code, user, navigate])

  useEffect(() => {
    if (state.phase === 'form') pageEnter(rootRef.current)
  }, [state.phase])

  if (state.phase === 'loading') return <LoadingScreen message="Checking your invite…" />

  if (state.phase === 'invalid') {
    return (
      <main className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <Mascot variant={2} size={150} className="mx-auto" />
          <h1 className="font-display mt-4 text-3xl uppercase text-space">
            That code’s a dud
          </h1>
          <p className="mt-2 text-sm text-space/70">
            Either the invite expired or someone fat-fingered it. The mascot suspects
            the latter.
          </p>
          <Link
            to="/"
            className="font-display mt-6 inline-block rounded-xl bg-space px-8 py-3.5 tracking-wide uppercase text-papaya"
          >
            Back home
          </Link>
        </div>
      </main>
    )
  }

  const { challenge } = state

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user || !profile || busy) return
    setBusy(true)
    try {
      await joinChallenge(challenge.id, {
        uid: user.uid,
        firstName: profile.firstName,
        avatarSeed: profile.avatarSeed ?? user.uid,
        personalGoal: goal.trim(),
        targetFrequency: frequency,
        frequencyPeriod: period,
      })
      navigate('/', { replace: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-dvh">
      <TopBar title="Join challenge" />
      <div ref={rootRef} className="mx-auto max-w-lg px-5 pb-16">
        <section
          data-animate
          className="rounded-2xl bg-space px-5 py-6 text-papaya shadow-lifted"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-steel">
            You’re invited
          </p>
          <h2 className="font-display mt-1 text-3xl uppercase">{challenge.name}</h2>
          {challenge.description && (
            <p className="mt-2 text-sm text-papaya/80">{challenge.description}</p>
          )}
          <p className="mt-3 text-xs text-papaya/60">
            {challenge.durationType === 'ongoing'
              ? 'Ongoing — no finish line, no mercy.'
              : `${challenge.duration} days. That’s the deal.`}
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
          <label data-animate className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              Your personal goal
            </span>
            <input
              type="text"
              required
              maxLength={100}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Run 5k, write 500 words, touch grass…"
              className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>

          <div data-animate className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              How often?
            </span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={31}
                required
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-20 rounded-xl border-2 border-space/15 bg-white px-3 py-3 text-center text-base font-bold text-space focus:border-steel"
              />
              <span className="text-sm font-bold text-space/60">×</span>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as FrequencyPeriod)}
                className="flex-1 rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base font-bold text-space focus:border-steel"
              >
                <option value="per_day">per day</option>
                <option value="per_week">per week</option>
                <option value="per_month">per month</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-space/50">
              Your completion % is measured against this. Choose honestly — the roasts
              write themselves either way.
            </p>
          </div>

          <button
            data-animate
            type="submit"
            disabled={busy || !goal.trim()}
            className="font-display mt-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
          >
            {busy ? 'Signing you up…' : 'I’m in'}
          </button>
        </form>
      </div>
    </main>
  )
}
