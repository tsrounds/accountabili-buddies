import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Plus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import {
  getChallenge,
  getInvite,
  getMember,
  joinChallenge,
  listMembers,
  submitAmmoAnswer,
} from '../lib/challenges'
import { nextAmmoPrompt, type AmmoPrompt } from '../lib/ammoQuestions'
import { pageEnter, reveal } from '../lib/motion'
import { randomAvatarSeed, renderAvatarDataUri } from '../lib/avatar'
import type { Challenge, FrequencyPeriod, Member } from '../lib/types'
import TopBar from '../components/TopBar'
import Mascot from '../components/Mascot'
import LoadingScreen from '../components/LoadingScreen'
import AvatarBuilder from '../components/AvatarBuilder'
import AmmoQuestionRunner from '../components/AmmoQuestionRunner'

type Phase =
  | { phase: 'loading' }
  | { phase: 'invalid' }
  | { phase: 'preview'; challenge: Challenge; members: Member[] }
  | { phase: 'identity'; challenge: Challenge; members: Member[] }
  | { phase: 'goal'; challenge: Challenge; members: Member[] }
  | { phase: 'ammo'; challenge: Challenge; members: Member[] }

const MIN_AMMO_ANSWERS = 3

export default function Join() {
  const { code = '' } = useParams()
  const { user, loading, signInAnon, completeProfile } = useAuth()
  const navigate = useNavigate()
  const [state, setState] = useState<Phase>({ phase: 'loading' })
  const rootRef = useRef<HTMLDivElement>(null)

  // Wizard state carried across phases — not written to Firestore until each
  // phase's own commit point.
  const [firstName, setFirstName] = useState('')
  const [avatarSeed, setAvatarSeed] = useState(() => randomAvatarSeed())
  const [goal, setGoal] = useState('')
  const [frequency, setFrequency] = useState(3)
  const [period, setPeriod] = useState<FrequencyPeriod>('per_week')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [authFailed, setAuthFailed] = useState(false)

  // Anonymous auth bootstrap — invitees never see a login screen.
  useEffect(() => {
    if (loading || user) return
    void signInAnon().catch((err) => {
      console.error('anonymous sign-in failed', err)
      setAuthFailed(true)
    })
  }, [loading, user, signInAnon])

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
      const members = await listMembers(challenge.id)
      if (!cancelled) setState({ phase: 'preview', challenge, members })
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [code, user, navigate])

  // Standard entrance animation whenever we swap into a new content phase.
  useEffect(() => {
    if (state.phase === 'loading' || state.phase === 'invalid') return
    pageEnter(rootRef.current)
  }, [state.phase])

  // Anonymous sign-in failed (e.g. provider disabled, or offline) — don't
  // leave the invitee stuck on an endless spinner.
  if (!user && authFailed) {
    return (
      <main className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <Mascot variant={2} size={150} className="mx-auto" />
          <h1 className="font-display mt-4 text-3xl uppercase text-space">
            Couldn’t get you in
          </h1>
          <p className="mt-2 text-sm text-space/70">
            Something choked while signing you in. Refresh and try again — the
            mascot insists it wasn’t their fault.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="font-display mt-6 inline-block rounded-xl bg-space px-8 py-3.5 tracking-wide uppercase text-papaya"
          >
            Try again
          </button>
        </div>
      </main>
    )
  }

  if (state.phase === 'loading' || !user) {
    return <LoadingScreen message="Checking your invite…" />
  }

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

  const { challenge, members } = state

  async function handleIdentityNext(e: FormEvent) {
    e.preventDefault()
    if (!firstName.trim() || busy) return
    setBusy(true)
    setError('')
    try {
      await completeProfile({ firstName: firstName.trim(), avatarSeed })
      setState({ phase: 'goal', challenge, members })
    } catch (err) {
      console.error(err)
      setError('Couldn’t save that. Try again.')
    } finally {
      setBusy(false)
    }
  }

  function handleGoalNext(e: FormEvent) {
    e.preventDefault()
    if (!goal.trim()) return
    setState(
      members.length > 0
        ? { phase: 'ammo', challenge, members }
        : { phase: 'ammo', challenge, members: [] },
    )
  }

  async function finalSubmit() {
    if (!user || busy) return
    setBusy(true)
    setError('')
    try {
      await joinChallenge(challenge.id, {
        uid: user.uid,
        firstName: firstName.trim(),
        avatarSeed,
        personalGoal: goal.trim(),
        targetFrequency: frequency,
        frequencyPeriod: period,
      })
      navigate('/', { replace: true })
    } catch (err) {
      console.error(err)
      setError('Couldn’t sign you up. Try again.')
      setBusy(false)
    }
  }

  return (
    <main className="min-h-dvh">
      <TopBar title="Join challenge" />
      <div ref={rootRef} className="mx-auto max-w-lg px-5 pb-16">
        {state.phase === 'preview' && (
          <PreviewPhase
            challenge={challenge}
            members={members}
            onContinue={() => setState({ phase: 'identity', challenge, members })}
          />
        )}

        {state.phase === 'identity' && (
          <IdentityPhase
            firstName={firstName}
            setFirstName={setFirstName}
            avatarSeed={avatarSeed}
            setAvatarSeed={setAvatarSeed}
            busy={busy}
            error={error}
            onSubmit={handleIdentityNext}
          />
        )}

        {state.phase === 'goal' && (
          <GoalPhase
            goal={goal}
            setGoal={setGoal}
            frequency={frequency}
            setFrequency={setFrequency}
            period={period}
            setPeriod={setPeriod}
            onSubmit={handleGoalNext}
          />
        )}

        {state.phase === 'ammo' && (
          <AmmoPhase
            challengeId={challenge.id}
            members={members}
            byUid={user.uid}
            byFirstName={firstName.trim() || 'Buddy'}
            busy={busy}
            error={error}
            onFinish={finalSubmit}
          />
        )}
      </div>
    </main>
  )
}

// ─────────────────────── phase components ───────────────────────

function PreviewPhase({
  challenge,
  members,
  onContinue,
}: {
  challenge: Challenge
  members: Member[]
  onContinue: () => void
}) {
  return (
    <>
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

      {members.length > 0 && (
        <section data-animate className="mt-5">
          <p className="text-xs font-bold tracking-wide uppercase text-space/50">
            Who’s in
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {members.map((m) => (
              <li
                key={m.uid}
                className="flex items-center gap-2 rounded-full border-2 border-space/10 bg-white py-1 pr-3 pl-1"
              >
                <img
                  src={renderAvatarDataUri(m.avatarSeed)}
                  width={28}
                  height={28}
                  alt=""
                  className="h-7 w-7 rounded-full bg-papaya"
                  draggable={false}
                />
                <span className="text-sm font-bold text-space">{m.firstName}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button
        data-animate
        onClick={onContinue}
        className="font-display mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
      >
        I’m in
        <ArrowRight className="h-5 w-5" aria-hidden />
      </button>
    </>
  )
}

function IdentityPhase({
  firstName,
  setFirstName,
  avatarSeed,
  setAvatarSeed,
  busy,
  error,
  onSubmit,
}: {
  firstName: string
  setFirstName: (v: string) => void
  avatarSeed: string
  setAvatarSeed: (v: string) => void
  busy: boolean
  error: string
  onSubmit: (e: FormEvent) => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div data-animate className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
          Step 1 of 3
        </p>
        <h2 className="font-display mt-1 text-3xl uppercase text-space">
          Pick your face
        </h2>
        <p className="mt-1 text-sm text-space/60">
          Roll until one feels like you. Or close enough.
        </p>
      </div>

      <div data-animate>
        <AvatarBuilder seed={avatarSeed} onChange={setAvatarSeed} />
      </div>

      <label data-animate className="flex flex-col gap-1">
        <span className="text-xs font-bold tracking-wide uppercase text-space/60">
          Your first name
        </span>
        <input
          type="text"
          required
          maxLength={30}
          autoComplete="given-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Keith"
          className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
        />
      </label>

      {error && (
        <p data-animate className="text-sm font-bold text-brick">
          {error}
        </p>
      )}

      <button
        data-animate
        type="submit"
        disabled={busy || !firstName.trim()}
        className="font-display flex items-center justify-center gap-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
      >
        {busy ? 'Saving…' : 'Next'}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </button>
    </form>
  )
}

function GoalPhase({
  goal,
  setGoal,
  frequency,
  setFrequency,
  period,
  setPeriod,
  onSubmit,
}: {
  goal: string
  setGoal: (v: string) => void
  frequency: number
  setFrequency: (v: number) => void
  period: FrequencyPeriod
  setPeriod: (v: FrequencyPeriod) => void
  onSubmit: (e: FormEvent) => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div data-animate className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
          Step 2 of 3
        </p>
        <h2 className="font-display mt-1 text-3xl uppercase text-space">
          What are you doing?
        </h2>
      </div>

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
        disabled={!goal.trim()}
        className="font-display mt-2 flex items-center justify-center gap-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
      >
        Next
        <ArrowRight className="h-5 w-5" aria-hidden />
      </button>
    </form>
  )
}

// ─────────────────────── ammo phase ───────────────────────

function AmmoPhase({
  challengeId,
  members,
  byUid,
  byFirstName,
  busy,
  error,
  onFinish,
}: {
  challengeId: string
  members: Member[]
  byUid: string
  byFirstName: string
  busy: boolean
  error: string
  onFinish: () => void
}) {
  const participants = useMemo(
    () => members.map((m) => ({ uid: m.uid, firstName: m.firstName })),
    [members],
  )
  const avatarFor = (uid: string) =>
    renderAvatarDataUri(members.find((m) => m.uid === uid)?.avatarSeed ?? '')

  const [answered, setAnswered] = useState(0)
  const [ammoByUid, setAmmoByUid] = useState<Record<string, number>>({})
  const [usedKeys] = useState<Set<string>>(() => new Set())
  const [lastUid, setLastUid] = useState<string | undefined>(undefined)
  const [targetUid, setTargetUid] = useState<string | undefined>(undefined)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [view, setView] = useState<'prompt' | 'review'>('prompt')
  const [prompt, setPrompt] = useState<AmmoPrompt | null>(() =>
    nextAmmoPrompt(participants, new Set(), {}),
  )
  const bodyRef = useRef<HTMLDivElement>(null)

  // Re-run the entrance whenever the body swaps between prompt and review.
  // data-animate can't cover mid-phase content — it starts hidden and the
  // parent's pageEnter only fires once, on phase entry.
  useEffect(() => {
    reveal(bodyRef.current)
  }, [view])

  function markUsed(p: AmmoPrompt) {
    usedKeys.add(`${p.participant.uid}:${p.templateId}`)
    setLastUid(p.participant.uid)
  }

  function goToPrompt(nextTargetUid?: string) {
    setTargetUid(nextTargetUid)
    setAnswer('')
    setPrompt(
      nextAmmoPrompt(participants, usedKeys, { targetUid: nextTargetUid, lastUid }),
    )
    setView('prompt')
  }

  function goToReview() {
    setTargetUid(undefined)
    setAnswer('')
    setView('review')
  }

  async function handleAnswer(e: FormEvent) {
    e.preventDefault()
    if (!prompt || !answer.trim() || submitting) return
    setSubmitting(true)
    try {
      await submitAmmoAnswer(challengeId, {
        aboutUid: prompt.participant.uid,
        aboutFirstName: prompt.participant.firstName,
        byUid,
        byFirstName,
        questionId: prompt.templateId,
        question: prompt.question,
        answer: answer.trim(),
      })
      markUsed(prompt)
      const about = prompt.participant.uid
      setAmmoByUid((m) => ({ ...m, [about]: (m[about] ?? 0) + 1 }))
      const nextCount = answered + 1
      setAnswered(nextCount)
      // A targeted answer drops you back to the roster; the random stream keeps
      // going until you hit the minimum, then lands on the review screen.
      if (targetUid || nextCount >= MIN_AMMO_ANSWERS) {
        goToReview()
      } else {
        setAnswer('')
        setPrompt(nextAmmoPrompt(participants, usedKeys, { lastUid }))
      }
    } catch (err) {
      console.error('ammo submit failed', err)
    } finally {
      setSubmitting(false)
    }
  }

  function handleSkip() {
    if (!prompt) return
    markUsed(prompt)
    // Skips don't count toward the minimum, but they consume the prompt so the
    // same (person, question) doesn't reappear.
    if (targetUid) {
      goToReview()
    } else {
      setAnswer('')
      setPrompt(nextAmmoPrompt(participants, usedKeys, { lastUid }))
    }
  }

  // No one else in the challenge yet — skip straight to submit.
  if (participants.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div data-animate className="text-center">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
            Step 3 of 3
          </p>
          <h2 className="font-display mt-1 text-3xl uppercase text-space">
            You’re the first
          </h2>
          <p className="mt-2 text-sm text-space/60">
            No one to gossip about yet. The mascot files that away for later.
          </p>
        </div>
        {error && <p className="text-sm font-bold text-brick">{error}</p>}
        <button
          data-animate
          onClick={onFinish}
          disabled={busy}
          className="font-display flex items-center justify-center gap-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
        >
          {busy ? 'Starting…' : 'Start the challenge'}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    )
  }

  const streaming = view === 'prompt' && prompt

  return (
    <div className="flex flex-col gap-5">
      <div data-animate className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
          Step 3 of 3
        </p>
        <h2 className="font-display mt-1 text-3xl uppercase text-space">
          Give us ammo
        </h2>
        <p className="mt-1 text-sm text-space/60">
          The roasts get sharper when you spill. Answer at least{' '}
          {MIN_AMMO_ANSWERS}.
        </p>
      </div>

      <div
        data-animate
        className="flex items-center justify-between rounded-xl bg-space/8 px-4 py-2"
      >
        <span className="text-xs font-bold tracking-wide uppercase text-space/60">
          Answered
        </span>
        <span className="font-display text-lg text-space">
          {answered} / {MIN_AMMO_ANSWERS}
          {answered >= MIN_AMMO_ANSWERS && <span className="text-brick"> ✓</span>}
        </span>
      </div>

      <div ref={bodyRef}>
        {streaming ? (
          <AmmoQuestionRunner
            prompt={prompt}
            avatarSeed={members.find((m) => m.uid === prompt.participant.uid)?.avatarSeed ?? ''}
            answer={answer}
            onAnswerChange={setAnswer}
            onSubmit={handleAnswer}
            onSkip={handleSkip}
            submitting={submitting}
            footer={
              answered >= MIN_AMMO_ANSWERS ? (
                <button
                  type="button"
                  onClick={goToReview}
                  className="mt-2 text-xs font-bold text-space/50 underline underline-offset-4"
                >
                  Done — back to the crew
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-center text-sm text-space/60">
              The roasts get sharper when you spill. Pile more on anyone — then
              lock it in.
            </p>
            <ul className="flex flex-col gap-2">
              {participants.map((p) => {
                const count = ammoByUid[p.uid] ?? 0
                return (
                  <li key={p.uid}>
                    <button
                      type="button"
                      onClick={() => goToPrompt(p.uid)}
                      className="flex w-full items-center gap-3 rounded-2xl border-2 border-space/10 bg-white px-3.5 py-3 text-left shadow-card hover:border-steel/60 hover:bg-steel/10"
                    >
                      <img
                        src={avatarFor(p.uid)}
                        width={44}
                        height={44}
                        alt=""
                        className="h-11 w-11 shrink-0 rounded-full bg-papaya"
                        draggable={false}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-space">{p.firstName}</p>
                        <p className="text-xs text-space/50">
                          {count === 0
                            ? 'No dirt yet — got some?'
                            : `${count} secret${count > 1 ? 's' : ''} spilled`}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-xs font-bold tracking-wide uppercase text-steel">
                        <Plus className="h-4 w-4" aria-hidden /> Add
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              onClick={onFinish}
              disabled={busy}
              className="font-display flex items-center justify-center gap-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
            >
              {busy ? 'Starting…' : 'Start the challenge'}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-sm font-bold text-brick">{error}</p>}
    </div>
  )
}
