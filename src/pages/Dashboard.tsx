import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, LogOut, Target } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useChallengeData } from '../hooks/useChallengeData'
import { checkInToday } from '../lib/challenges'
import { frequencyLabel } from '../lib/stats'
import { pageEnter } from '../lib/motion'
import AppNav from '../components/AppNav'
import CheckInButton from '../components/CheckInButton'
import Leaderboard from '../components/Leaderboard'
import LoadingScreen from '../components/LoadingScreen'
import Mascot from '../components/Mascot'
import RoastsSection from '../components/RoastsSection'

function greeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening'
}

function PendingJoinState({
  challenge,
  inviteCode,
}: {
  challenge: { id: string; name: string }
  inviteCode: string | null
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => pageEnter(rootRef.current), [])

  return (
    <div ref={rootRef} className="grid min-h-[70dvh] place-items-center px-6 text-center">
      <div className="w-full max-w-sm">
        <div data-animate>
          <Mascot variant={1} float size={180} className="mx-auto" />
        </div>
        <h2 data-animate className="font-display mt-4 text-3xl uppercase text-space">
          "{challenge.name}" is live
        </h2>
        <p data-animate className="mt-2 text-sm text-space/70">
          Your mission was created — now set your own goal so you can start checking in.
        </p>
        {inviteCode && (
          <Link
            data-animate
            to={`/join/${inviteCode}`}
            className="font-display mt-6 block rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
          >
            Set your goal →
          </Link>
        )}
      </div>
    </div>
  )
}

function EmptyState({ isAdmin }: { isAdmin: boolean }) {
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => pageEnter(rootRef.current), [])

  return (
    <div ref={rootRef} className="grid min-h-[70dvh] place-items-center px-6 text-center">
      <div className="w-full max-w-sm">
        <div data-animate>
          <Mascot variant={2} float size={180} className="mx-auto" />
        </div>
        <h2 data-animate className="font-display mt-4 text-3xl uppercase text-space">
          No active mission
        </h2>
        <p data-animate className="mt-2 text-sm text-space/70">
          {isAdmin
            ? 'The mascot has nothing to judge. Fix that.'
            : 'Get an invite code from your fearless leader and report for duty.'}
        </p>
        {isAdmin ? (
          <Link
            data-animate
            to="/create"
            className="font-display mt-6 block rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
          >
            Create a mission
          </Link>
        ) : (
          <form
            data-animate
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (code.trim()) navigate(`/join/${code.trim().toUpperCase()}`)
            }}
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="INVITE CODE"
              maxLength={6}
              className="font-display min-w-0 flex-1 rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-center text-xl tracking-[0.2em] text-space placeholder:text-space/25 focus:border-steel"
            />
            <button
              type="submit"
              disabled={code.trim().length < 6}
              className="font-display rounded-xl bg-brick px-6 text-lg uppercase text-papaya disabled:opacity-40"
            >
              Join
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, profile, signOutUser } = useAuth()
  const data = useChallengeData()
  const rootRef = useRef<HTMLElement>(null)

  const { loading, challenge, member, standings, inviteCode, refresh } = data
  const me = standings.find((s) => s.uid === user?.uid)

  useEffect(() => {
    if (!loading && challenge) pageEnter(rootRef.current)
  }, [loading, challenge])

  if (loading) return <LoadingScreen />

  return (
    <main ref={rootRef} className="min-h-dvh pb-32">
      <header className="pt-safe">
        <div className="mx-auto flex max-w-lg items-center justify-between px-5 pt-4">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
              {greeting()},
            </p>
            <h1 className="font-display text-2xl leading-none uppercase text-space">
              {profile?.firstName ?? 'Buddy'}
            </h1>
          </div>
          <button
            onClick={() => void signOutUser()}
            aria-label="Sign out"
            className="grid h-10 w-10 place-items-center rounded-full text-space/50 active:bg-space/10"
          >
            <LogOut className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </header>

      {!challenge ? (
        <EmptyState isAdmin={Boolean(profile?.isAdmin)} />
      ) : !member ? (
        <PendingJoinState challenge={challenge} inviteCode={inviteCode} />
      ) : (
        <div className="mx-auto max-w-lg px-5">
          {/* ── Your status ─────────────────────────────── */}
          <Link
            data-animate
            to={`/challenge/${challenge.id}`}
            className="mt-5 block rounded-2xl bg-space p-5 text-papaya shadow-lifted"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-steel">
                Active mission
              </p>
              <ChevronRight className="h-4 w-4 text-papaya/40" aria-hidden />
            </div>
            <h2 className="font-display mt-1 text-3xl leading-tight uppercase">
              {challenge.name}
            </h2>
            <div className="mt-3 flex items-center gap-2 text-sm text-papaya/80">
              <Target className="h-4 w-4 shrink-0 text-steel" aria-hidden />
              <span className="truncate">
                {member.personalGoal} ·{' '}
                {frequencyLabel(member.targetFrequency, member.frequencyPeriod)}
              </span>
            </div>
            {me && (
              <div className="mt-4 flex gap-6">
                <div>
                  <p className="font-display text-4xl leading-none text-steel">
                    {me.completionPct}
                    <span className="text-xl">%</span>
                  </p>
                  <p className="mt-1 text-[0.65rem] font-bold tracking-wider uppercase text-papaya/50">
                    Completion
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl leading-none text-papaya">
                    {me.streak}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-bold tracking-wider uppercase text-papaya/50">
                    Day streak
                  </p>
                </div>
                <div>
                  <p className="font-display text-4xl leading-none text-papaya">
                    #{me.rank}
                  </p>
                  <p className="mt-1 text-[0.65rem] font-bold tracking-wider uppercase text-papaya/50">
                    Rank
                  </p>
                </div>
              </div>
            )}
          </Link>

          {/* ── Check in ────────────────────────────────── */}
          <section data-animate className="mt-6">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <CheckInButton
                  checkedIn={Boolean(me?.checkedInToday)}
                  onCheckIn={async (note) => {
                    if (!user || !profile) return
                    await checkInToday(challenge.id, user.uid, profile.firstName, note)
                    await refresh()
                  }}
                />
              </div>
              <Mascot variant={0} size={92} className="mb-1 shrink-0" />
            </div>
          </section>

          {/* ── Leaderboard ─────────────────────────────── */}
          <section data-animate className="mt-8">
            <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
              Leaderboard
            </h3>
            <Leaderboard standings={standings} meUid={user?.uid} />
          </section>

          {/* ── Today's roasts ──────────────────────────── */}
          <div data-animate>
            <RoastsSection challenge={challenge} standings={standings} />
          </div>
        </div>
      )}

      <AppNav />
    </main>
  )
}
