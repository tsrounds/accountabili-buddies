import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, utils } from 'animejs'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getOrGenerateDailyRoasts } from '../lib/roasts'
import { prefersReducedMotion } from '../lib/motion'
import { renderAvatarDataUri } from '../lib/avatar'
import type { Challenge, MemberStanding, RoastDoc, RoastEntry } from '../lib/types'
import Mascot from './Mascot'

interface RoastsSectionProps {
  challenge: Challenge
  standings: MemberStanding[]
}

/** Daily AI roasts. First viewer generates; everyone reads the same doc. */
export default function RoastsSection({ challenge, standings }: RoastsSectionProps) {
  const { user } = useAuth()
  const [roasts, setRoasts] = useState<RoastDoc | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLParagraphElement>(null)
  const hasScrolledToStart = useRef(false)

  useEffect(() => {
    if (standings.length === 0) return
    let cancelled = false
    setState('loading')
    getOrGenerateDailyRoasts(challenge, standings)
      .then((doc) => {
        if (cancelled) return
        if (!doc) {
          setState('error')
          return
        }
        setRoasts(doc)
        setState('done')
      })
      .catch((err) => {
        console.error('roasts failed', err)
        if (!cancelled) setState('error')
      })
    return () => {
      cancelled = true
    }
    // Deliberately excludes `state` so `setState('loading')` above doesn't
    // re-run this effect and cancel its own in-flight promise.
  }, [challenge, standings])

  // Pulsing verdict-pending text while generating
  useEffect(() => {
    if (state !== 'loading' || prefersReducedMotion() || !pulseRef.current) return
    const anim = animate(pulseRef.current, {
      opacity: [0.35, 1],
      duration: 850,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
    })
    return () => {
      anim.cancel()
    }
  }, [state])

  // Reorder so the current user's own roast leads.
  const orderedEntries = useMemo<RoastEntry[]>(() => {
    if (!roasts?.entries) return []
    if (!user?.uid) return roasts.entries
    const me = roasts.entries.find((e) => e.uid === user.uid)
    if (!me) return roasts.entries
    return [me, ...roasts.entries.filter((e) => e.uid !== user.uid)]
  }, [roasts, user?.uid])

  // Reset visible index when the deck itself changes (new day, new members).
  useEffect(() => {
    setIndex(0)
    hasScrolledToStart.current = false
  }, [orderedEntries])

  // Snap track back to the first card when a fresh deck arrives.
  useEffect(() => {
    if (state !== 'done' || !trackRef.current || hasScrolledToStart.current) return
    trackRef.current.scrollTo({ left: 0, behavior: 'auto' })
    hasScrolledToStart.current = true
  }, [state, orderedEntries])

  // Reveal-in animation for the first card only — subsequent cards ride the scroll.
  useEffect(() => {
    if (state !== 'done' || !trackRef.current) return
    const first = trackRef.current.querySelector<HTMLElement>('[data-roast-card]')
    if (!first) return
    if (prefersReducedMotion()) {
      utils.set(first, { rotateX: '0deg', translateY: 0 })
      return
    }
    animate(first, {
      rotateX: ['-88deg', '4deg', '0deg'],
      translateY: [-8, 0],
      duration: 560,
      ease: 'outCubic',
    })
  }, [state])

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    const next = Math.round(el.scrollLeft / el.clientWidth)
    if (next !== index) setIndex(next)
  }

  function step(delta: number) {
    const el = trackRef.current
    if (!el) return
    const nextIdx = Math.max(0, Math.min(orderedEntries.length - 1, index + delta))
    el.scrollTo({ left: nextIdx * el.clientWidth, behavior: 'smooth' })
  }

  if (standings.length === 0) return null

  const current = orderedEntries[index]
  const isMe = current && user?.uid === current.uid

  return (
    <section className="mt-8" aria-label="Today's roasts">
      <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
        Today’s roasts
      </h3>

      {state === 'loading' && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-space/10 bg-white px-6 py-8 shadow-card">
          <Mascot variant={2} size={110} />
          <p ref={pulseRef} className="text-sm font-bold tracking-wide text-space/70">
            Cooking up today’s roasts…
          </p>
        </div>
      )}

      {state === 'error' && (
        <div className="rounded-2xl border-2 border-space/10 bg-white px-6 py-6 text-center shadow-card">
          <p className="text-sm font-bold text-space/60">
            The roast machine jammed. It’ll hold the grudge until tomorrow.
          </p>
        </div>
      )}

      {state === 'done' && current && (
        <>
          <p
            aria-live="polite"
            className="mb-2 flex items-center justify-between text-[0.7rem] font-bold tracking-[0.2em] uppercase text-space/60"
          >
            <span className="truncate">
              {isMe ? 'You' : current.firstName}
              <span className="text-space/40">
                {' '}
                · {index + 1} of {orderedEntries.length}
              </span>
            </span>
            <span className="text-space/40">Swipe →</span>
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label="Previous roast"
              className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-space/85 text-papaya shadow-lifted active:bg-space disabled:opacity-30 sm:grid"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={index >= orderedEntries.length - 1}
              aria-label="Next roast"
              className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-space/85 text-papaya shadow-lifted active:bg-space disabled:opacity-30 sm:grid"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ perspective: '900px' }}
            >
              {orderedEntries.map((entry) => (
                <div
                  key={entry.uid}
                  data-roast-card
                  style={{ transformOrigin: 'top center' }}
                  className={`relative min-w-full snap-center overflow-hidden rounded-2xl p-4 pl-5 shadow-lifted ${
                    entry.checkedIn ? 'bg-space text-papaya' : 'bg-lava text-papaya'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1.5 ${
                      entry.checkedIn ? 'bg-steel' : 'bg-brick'
                    }`}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={renderAvatarDataUri(entry.avatarSeed)}
                        width={28}
                        height={28}
                        alt=""
                        className="h-7 w-7 rounded-full bg-papaya"
                        draggable={false}
                      />
                      <p
                        className={`text-xs font-bold tracking-[0.2em] uppercase ${
                          entry.checkedIn ? 'text-steel' : 'text-papaya/70'
                        }`}
                      >
                        {entry.firstName}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wider uppercase ${
                        entry.checkedIn
                          ? 'bg-steel/20 text-steel'
                          : 'bg-brick text-papaya'
                      }`}
                    >
                      {entry.checkedIn ? 'Showed up' : 'M.I.A.'}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2.5">
                    <Quote
                      className="mt-1 h-5 w-5 shrink-0 rotate-180 text-papaya/40"
                      aria-hidden
                    />
                    <p className="text-lg leading-snug">{entry.roast}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicator */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {orderedEntries.map((entry, i) => (
              <button
                key={entry.uid}
                type="button"
                onClick={() => {
                  const el = trackRef.current
                  if (!el) return
                  el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
                }}
                aria-label={`Jump to roast for ${entry.firstName}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-lava' : 'w-1.5 bg-space/25'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
