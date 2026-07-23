import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, TrendingDown } from 'lucide-react'
import { useChallengeData } from '../hooks/useChallengeData'
import { getOrGenerateDispatch } from '../lib/dispatch'
import { formatDay } from '../lib/dates'
import { pageEnter } from '../lib/motion'
import type { DispatchDoc } from '../lib/types'
import AppNav from '../components/AppNav'
import LoadingScreen from '../components/LoadingScreen'
import Mascot from '../components/Mascot'

export default function Dispatch() {
  const { loading, challenge, members, checkins, standings } = useChallengeData()
  const [dispatch, setDispatch] = useState<DispatchDoc | null>(null)
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading || !challenge || state !== 'idle') return
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
  }, [loading, challenge, members, checkins, state])

  useEffect(() => {
    if (state === 'done') pageEnter(rootRef.current)
  }, [state])

  if (loading || state === 'working' || state === 'idle') {
    return <LoadingScreen message="Typesetting this week’s dispatch…" />
  }

  if (!challenge || !dispatch) {
    return (
      <main className="min-h-dvh pb-32">
        <div className="grid min-h-[80dvh] place-items-center px-6 text-center">
          <div>
            <Mascot variant={2} size={150} className="mx-auto" />
            <h1 className="font-display mt-4 text-3xl uppercase text-space">
              Nothing to report
            </h1>
            <p className="mt-2 text-sm text-space/70">
              {state === 'error'
                ? 'The printing press jammed. Try again in a minute.'
                : 'No active mission, no news. The mascot is on break.'}
            </p>
            <Link
              to="/"
              className="font-display mt-6 inline-block rounded-xl bg-space px-8 py-3.5 tracking-wide uppercase text-papaya"
            >
              Back to base
            </Link>
          </div>
        </div>
        <AppNav />
      </main>
    )
  }

  const totalWeek = dispatch.leaderboard.reduce((sum, r) => sum + r.weekCheckins, 0)
  const avgCompletion =
    standings.length > 0
      ? Math.round(
          standings.reduce((sum, s) => sum + s.completionPct, 0) / standings.length,
        )
      : 0
  const weekNumber = dispatch.weekId.split('-W')[1]

  return (
    <main className="min-h-dvh pb-32">
      <div ref={rootRef} className="mx-auto max-w-lg px-5 pt-safe">
        {/* ── Masthead ────────────────────────────────── */}
        <header data-animate className="border-b-4 border-space pt-6 pb-4 text-center">
          <p className="text-[0.65rem] font-bold tracking-[0.35em] uppercase text-space/50">
            {dispatch.challengeName} · Issue W{weekNumber}
          </p>
          <h1 className="font-display mt-1 text-[2.75rem] leading-none uppercase text-space">
            The Weekly
            <br />
            <span className="text-lava">Dispatch</span>
          </h1>
          <p className="mt-2 text-xs font-bold tracking-wide uppercase text-space/60">
            {formatDay(dispatch.weekStart)} — {formatDay(dispatch.weekEnd)}
          </p>
        </header>

        {/* ── Hero / Slacker ──────────────────────────── */}
        <section data-animate className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-steel p-4 text-space shadow-lifted">
            <Award className="h-5 w-5" aria-hidden />
            <p className="mt-2 text-[0.6rem] font-bold tracking-[0.25em] uppercase text-space/70">
              Hero of the week
            </p>
            <p className="font-display mt-0.5 truncate text-2xl uppercase">
              {dispatch.heroOfTheWeek.firstName}
            </p>
            <p className="mt-1 text-xs font-bold text-space/70">
              {dispatch.heroOfTheWeek.weekCheckins} check-in
              {dispatch.heroOfTheWeek.weekCheckins === 1 ? '' : 's'} this week
            </p>
          </div>
          <div className="rounded-2xl bg-brick p-4 text-papaya shadow-lifted">
            <TrendingDown className="h-5 w-5" aria-hidden />
            <p className="mt-2 text-[0.6rem] font-bold tracking-[0.25em] uppercase text-papaya/70">
              Slacker of the week
            </p>
            <p className="font-display mt-0.5 truncate text-2xl uppercase">
              {dispatch.slackerOfTheWeek.firstName}
            </p>
            <p className="mt-1 text-xs font-bold text-papaya/70">
              {dispatch.slackerOfTheWeek.weekCheckins} check-in
              {dispatch.slackerOfTheWeek.weekCheckins === 1 ? '' : 's'}. Yikes.
            </p>
          </div>
        </section>

        {/* ── Roast of the week ───────────────────────── */}
        <section data-animate className="mt-6">
          <h2 className="font-display text-xl tracking-wide uppercase text-lava">
            Roast of the week
          </h2>
          <blockquote className="mt-2 border-l-4 border-lava bg-white p-4 pr-5 shadow-card">
            <p className="text-[1.05rem] leading-relaxed text-space first-letter:font-display first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-lava">
              {dispatch.roastOfTheWeek}
            </p>
            <footer className="mt-3 text-xs font-bold tracking-wide uppercase text-space/50">
              — The Mascot, unimpressed as ever
            </footer>
          </blockquote>
        </section>

        {/* ── Weekly leaderboard ──────────────────────── */}
        <section data-animate className="mt-7">
          <h2 className="font-display text-xl tracking-wide uppercase text-lava">
            The week in numbers
          </h2>
          <div className="mt-2 overflow-hidden rounded-2xl border-2 border-space/10 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-space text-papaya">
                  <th className="px-4 py-2.5 font-bold">#</th>
                  <th className="py-2.5 font-bold">Name</th>
                  <th className="py-2.5 text-right font-bold">Week</th>
                  <th className="px-4 py-2.5 text-right font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {dispatch.leaderboard.map((row, i) => (
                  <tr key={row.uid} className="border-t border-space/8">
                    <td className="font-display px-4 py-2.5 text-space/60">{i + 1}</td>
                    <td className="py-2.5 font-bold text-space">{row.firstName}</td>
                    <td className="py-2.5 text-right font-bold text-steel">
                      {row.weekCheckins}
                    </td>
                    <td className="px-4 py-2.5 text-right text-space/70">
                      {row.totalCheckins}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Group stats ─────────────────────────────── */}
        <section data-animate className="mt-6 grid grid-cols-3 gap-3">
          {[
            { value: totalWeek, label: 'Check-ins this week' },
            { value: `${avgCompletion}%`, label: 'Avg completion' },
            { value: dispatch.totalMembers, label: 'Buddies enrolled' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border-2 border-space/10 bg-white p-3 text-center shadow-card"
            >
              <p className="font-display text-2xl text-space">{stat.value}</p>
              <p className="mt-1 text-[0.6rem] font-bold tracking-wider uppercase text-space/50">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <div data-animate className="mt-8 flex justify-center opacity-70">
          <Mascot variant={1} size={90} />
        </div>
      </div>
      <AppNav />
    </main>
  )
}
