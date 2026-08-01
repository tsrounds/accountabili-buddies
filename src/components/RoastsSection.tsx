import { useEffect, useRef, useState } from 'react'
import { animate, stagger, utils } from 'animejs'
import { Quote } from 'lucide-react'
import { getOrGenerateDailyRoasts } from '../lib/roasts'
import { attachListHoverLift, prefersReducedMotion } from '../lib/motion'
import type { Challenge, MemberStanding, RoastDoc } from '../lib/types'
import Mascot from './Mascot'
import Avatar from './Avatar'

interface RoastsSectionProps {
  challenge: Challenge
  standings: MemberStanding[]
}

/** Daily AI roasts. First viewer generates; everyone reads the same doc. */
export default function RoastsSection({ challenge, standings }: RoastsSectionProps) {
  const [roasts, setRoasts] = useState<RoastDoc | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const listRef = useRef<HTMLUListElement>(null)
  const pulseRef = useRef<HTMLParagraphElement>(null)
  const hoverCleanups = useRef(new Map<string, () => void>())

  useEffect(() => {
    if (standings.length === 0 || state !== 'idle') return
    let cancelled = false
    setState('loading')
    getOrGenerateDailyRoasts(challenge, standings)
      .then((doc) => {
        if (cancelled) return
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
  }, [challenge, standings, state])

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

  // Theatrical reveal: cards flip down off a hinge, one by one
  useEffect(() => {
    if (state !== 'done' || !listRef.current) return
    const cards = listRef.current.querySelectorAll<HTMLElement>('[data-roast-card]')
    if (prefersReducedMotion()) {
      utils.set(cards, { opacity: 1 })
      return
    }
    animate(cards, {
      opacity: [0, 1],
      rotateX: ['-88deg', '4deg', '0deg'],
      translateY: [-8, 0],
      duration: 560,
      delay: stagger(140, { start: 120 }),
      ease: 'outCubic',
    })
  }, [state])

  if (standings.length === 0) return null

  return (
    <section className="mt-8">
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

      {state === 'done' && roasts && (
        <ul
          ref={listRef}
          className="flex flex-col gap-3"
          style={{ perspective: '900px' }}
        >
          {roasts.entries.map((entry) => (
            <li
              key={entry.uid}
              data-roast-card
              ref={(el) => attachListHoverLift(el, entry.uid, hoverCleanups.current, { scale: 1.02, y: -2 })}
              style={{ transformOrigin: 'top center', opacity: 0 }}
              className={`relative overflow-hidden rounded-2xl p-4 pl-5 shadow-lifted ${
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
                  <Avatar
                    seed={standings.find((s) => s.uid === entry.uid)?.avatarSeed ?? entry.uid}
                    size={28}
                    alt={entry.firstName}
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
              <div className="mt-2 flex gap-2.5">
                <Quote
                  className="mt-0.5 h-4 w-4 shrink-0 rotate-180 text-papaya/40"
                  aria-hidden
                />
                <p className="text-base leading-snug">{entry.roast}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
