import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Award, Check, ChevronRight, Copy, LogOut, Share2, Target, TrendingDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useChallengeData } from '../hooks/useChallengeData'
import { checkInToday, getInviteCode } from '../lib/challenges'
import { getOrGenerateDispatch } from '../lib/dispatch'
import { frequencyLabel } from '../lib/stats'
import { pageEnter, useHoverLift } from '../lib/motion'
import type { DispatchDoc } from '../lib/types'
import AppNav from '../components/AppNav'
import Avatar from '../components/Avatar'
import CheckInButton from '../components/CheckInButton'
import Leaderboard from '../components/Leaderboard'
import LoadingScreen from '../components/LoadingScreen'
import Mascot from '../components/Mascot'
import RoastsSection from '../components/RoastsSection'

function greeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening'
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
          No active challenge
        </h2>
        <p data-animate className="mt-2 text-sm text-space/70">
          {isAdmin
            ? 'The mascot has nothing to judge. Fix that.'
            : 'Get an invite code from your group and jump in.'}
        </p>
        {isAdmin ? (
          <Link
            data-animate
            to="/create"
            className="font-display mt-6 block rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
          >
            Create a challenge
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

function ShareModal({
  inviteCode,
  onClose,
}: {
  inviteCode: string
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const inviteUrl = `${window.location.origin}/join/${inviteCode}`

  async function copyLink() {
    await navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function shareLink() {
    if (navigator.share) {
      await navigator
        .share({
          title: 'Accountabili-Buddies',
          text: `Join with code ${inviteCode}`,
          url: inviteUrl,
        })
        .catch(() => {})
    } else {
      await copyLink()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-space/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm animate-[slideUp_200ms_ease-out] rounded-t-2xl bg-papaya p-6 shadow-lifted sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl tracking-wide uppercase text-space">
          Invite buddies
        </h3>
        <div className="mt-4 rounded-2xl bg-space py-5 text-center text-papaya">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-steel">
            Invite code
          </p>
          <p className="font-display mt-1 text-4xl tracking-[0.2em]">{inviteCode}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={copyLink}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-space/15 bg-white py-3.5 font-bold text-space active:bg-space/5"
          >
            {copied ? (
              <Check className="h-5 w-5 text-steel" aria-hidden />
            ) : (
              <Copy className="h-5 w-5" aria-hidden />
            )}
            {copied ? 'Copied' : 'Copy link'}
          </button>
          <button
            onClick={shareLink}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-steel py-3.5 font-bold text-space active:bg-steel/80"
          >
            <Share2 className="h-5 w-5" aria-hidden />
            Share
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-3 w-full py-2 text-center text-sm font-bold text-space/50"
        >
          Done
        </button>
      </div>
    </div>
  )
}

function WeeklyDispatch({
  challenge,
  members,
  checkins,
  standings,
}: {
  challenge: Parameters<typeof getOrGenerateDispatch>[0]
  members: Parameters<typeof getOrGenerateDispatch>[1]
  checkins: Parameters<typeof getOrGenerateDispatch>[2]
  standings: { completionPct: number }[]
}) {
  const [dispatch, setDispatch] = useState<DispatchDoc | null>(null)
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const heroRef = useHoverLift({ scale: 1.04, y: -2 })
  const slackerRef = useHoverLift({ scale: 1.04, y: -2 })

  useEffect(() => {
    if (state !== 'idle') return
    let cancelled = false
    setState('working')
    getOrGenerateDispatch(challenge, members, checkins)
      .then((doc) => {
        if (cancelled) return
        setDispatch(doc)
        setState('done')
      })
      .catch((err) => {
        console.error('dispatch failed', err)
        if (!cancelled) setState('error')
      })
    return () => {
      cancelled = true
    }
  }, [challenge, members, checkins, state])

  if (state === 'working' || state === 'idle') {
    return (
      <section className="mt-8">
        <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
          This week
        </h3>
        <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-space/10 bg-white px-6 py-6 shadow-card">
          <p className="text-sm font-bold text-space/50">Loading this week's recap...</p>
        </div>
      </section>
    )
  }

  if (state === 'error' || !dispatch) return null

  const totalWeek = dispatch.leaderboard.reduce((sum, r) => sum + r.weekCheckins, 0)
  const avgCompletion =
    standings.length > 0
      ? Math.round(standings.reduce((sum, s) => sum + s.completionPct, 0) / standings.length)
      : 0

  return (
    <section className="mt-8">
      <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
        This week
      </h3>

      {/* Hero / Slacker */}
      <div className="grid grid-cols-2 gap-3">
        <div ref={heroRef} className="rounded-2xl bg-steel p-4 text-space shadow-lifted">
          <Award className="h-5 w-5" aria-hidden />
          <p className="mt-2 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-space/70">
            MVP
          </p>
          <p className="font-display mt-0.5 truncate text-2xl uppercase">
            {dispatch.heroOfTheWeek.firstName}
          </p>
          <p className="mt-1 text-xs font-bold text-space/70">
            {dispatch.heroOfTheWeek.weekCheckins} check-in
            {dispatch.heroOfTheWeek.weekCheckins === 1 ? '' : 's'} this week
          </p>
        </div>
        <div ref={slackerRef} className="rounded-2xl bg-brick p-4 text-papaya shadow-lifted">
          <TrendingDown className="h-5 w-5" aria-hidden />
          <p className="mt-2 text-[0.7rem] font-bold tracking-[0.25em] uppercase text-papaya/70">
            Slacker
          </p>
          <p className="font-display mt-0.5 truncate text-2xl uppercase">
            {dispatch.slackerOfTheWeek.firstName}
          </p>
          <p className="mt-1 text-xs font-bold text-papaya/70">
            {dispatch.slackerOfTheWeek.weekCheckins} check-in
            {dispatch.slackerOfTheWeek.weekCheckins === 1 ? '' : 's'}. Yikes.
          </p>
        </div>
      </div>

      {/* Roast of the week */}
      {dispatch.roastOfTheWeek && (
        <blockquote className="mt-4 border-l-4 border-lava bg-white p-4 pr-5 shadow-card">
          <p className="text-base leading-relaxed text-space first-letter:font-display first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-lava">
            {dispatch.roastOfTheWeek}
          </p>
          <footer className="mt-3 text-xs font-bold tracking-wide uppercase text-space/50">
            — The Mascot, unimpressed as ever
          </footer>
        </blockquote>
      )}

      {/* Quick stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { value: totalWeek, label: 'Week check-ins' },
          { value: `${avgCompletion}%`, label: 'Avg completion' },
          { value: dispatch.totalMembers, label: 'Buddies' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border-2 border-space/10 bg-white p-3 text-center shadow-card"
          >
            <p className="font-display text-2xl text-space">{stat.value}</p>
            <p className="mt-1 text-[0.7rem] font-bold tracking-wider uppercase text-space/50">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Dashboard() {
  const { user, profile, signOutUser } = useAuth()
  const data = useChallengeData()
  const rootRef = useRef<HTMLElement>(null)
  const [showShare, setShowShare] = useState(false)
  const [inviteCode, setInviteCode] = useState<string | null>(null)

  const { loading, challenge, member, members, checkins, standings, refresh } = data
  const me = standings.find((s) => s.uid === user?.uid)
  const challengeCardRef = useHoverLift({ scale: 1.02, y: -3 })

  useEffect(() => {
    if (!loading && challenge) pageEnter(rootRef.current)
  }, [loading, challenge])

  useEffect(() => {
    if (challenge) getInviteCode(challenge.id).then(setInviteCode)
  }, [challenge])

  if (loading) return <LoadingScreen />

  return (
    <main ref={rootRef} className="min-h-dvh pb-32">
      <header className="pt-safe">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-5 pt-4">
          <div className="flex min-w-0 items-center gap-3">
            {user && <Avatar seed={user.uid} size={44} alt="" />}
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
                {greeting()},
              </p>
              <h1 className="font-display truncate text-2xl leading-none uppercase text-space">
                {profile?.firstName ?? 'Buddy'}
              </h1>
            </div>
          </div>
          <button
            onClick={() => void signOutUser()}
            aria-label="Sign out"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-space/50 active:bg-space/10"
          >
            <LogOut className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </header>

      {!challenge || !member ? (
        <EmptyState isAdmin={Boolean(profile?.isAdmin)} />
      ) : (
        <div className="mx-auto max-w-lg px-5">
          {/* ── Your status ─────────────────────────────── */}
          <div data-animate className="relative mt-5">
            <Link
              ref={challengeCardRef}
              to={`/challenge/${challenge.id}`}
              className="block rounded-2xl bg-space p-5 text-papaya shadow-lifted"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-steel">
                  Active challenge
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
                    <p className="mt-1 text-[0.7rem] font-bold tracking-wider uppercase text-papaya/50">
                      Completion
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl leading-none text-papaya">
                      {me.streak}
                    </p>
                    <p className="mt-1 text-[0.7rem] font-bold tracking-wider uppercase text-papaya/50">
                      Day streak
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-4xl leading-none text-papaya">
                      #{me.rank}
                    </p>
                    <p className="mt-1 text-[0.7rem] font-bold tracking-wider uppercase text-papaya/50">
                      Standing
                    </p>
                  </div>
                </div>
              )}
            </Link>
            {inviteCode && (
              <button
                onClick={() => setShowShare(true)}
                aria-label="Share invite"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-papaya/15 text-papaya active:bg-papaya/25"
              >
                <Share2 className="h-4 w-4" aria-hidden />
              </button>
            )}
          </div>

          {showShare && inviteCode && (
            <ShareModal inviteCode={inviteCode} onClose={() => setShowShare(false)} />
          )}

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

          {/* ── Weekly recap (formerly Dispatch page) ──── */}
          <div data-animate>
            <WeeklyDispatch
              challenge={challenge}
              members={members}
              checkins={checkins}
              standings={standings}
            />
          </div>
        </div>
      )}

      <AppNav />
    </main>
  )
}
