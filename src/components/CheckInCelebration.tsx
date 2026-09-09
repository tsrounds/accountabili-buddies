import { useEffect, useRef } from 'react'
import { animate, createTimeline, utils } from 'animejs'
import { Sparkles } from 'lucide-react'
import { prefersReducedMotion } from '../lib/motion'
import Mascot from './Mascot'

const CONFETTI_COLORS = [
  'var(--color-brick)',
  'var(--color-steel)',
  'var(--color-lava)',
  'var(--color-papaya)',
  '#f5c518',
]

/** Fire a burst of confetti from top-center of `container`. */
function confetti(container: HTMLElement) {
  const rect = container.getBoundingClientRect()
  const originX = rect.width / 2
  const originY = rect.height * 0.28
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span')
    const size = 6 + Math.random() * 8
    const isRound = Math.random() > 0.6
    p.style.cssText = `position:absolute;left:${originX}px;top:${originY}px;width:${size}px;height:${size * (isRound ? 1 : 0.55)}px;border-radius:${isRound ? '50%' : '2px'};background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};pointer-events:none;z-index:5;`
    container.appendChild(p)
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * Math.PI * 0.9
    const dist = 140 + Math.random() * 180
    animate(p, {
      translateX: Math.cos(angle) * dist,
      translateY: [0, Math.sin(angle) * dist, Math.sin(angle) * dist + 220],
      rotate: (Math.random() - 0.5) * 900,
      scale: [1, 1, 0.7],
      opacity: [1, 1, 0],
      duration: 1400 + Math.random() * 500,
      ease: 'outQuad',
      onComplete: () => p.remove(),
    })
  }
}

interface Props {
  firstName: string
  line: string
  onDismiss: () => void
}

/**
 * The Duolingo moment: full-screen celebration after a successful check-in.
 * Auto-dismisses on backdrop click / Escape / the primary button.
 */
export default function CheckInCelebration({ firstName, line, onDismiss }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const roastRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onDismiss()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDismiss])

  useEffect(() => {
    if (prefersReducedMotion() || !cardRef.current) return
    const card = cardRef.current
    const headline = headlineRef.current
    const roast = roastRef.current
    const badge = badgeRef.current

    utils.set(card, { scale: 0.85, opacity: 0 })
    if (headline) utils.set(headline, { opacity: 0, translateY: 12 })
    if (roast) utils.set(roast, { opacity: 0, translateY: 10 })
    if (badge) utils.set(badge, { scale: 0, rotate: '-40deg' })

    const tl = createTimeline()
    tl.add(card, {
      scale: [0.85, 1.04, 1],
      opacity: [0, 1],
      duration: 520,
      ease: 'outBack',
      onBegin: () => {
        if (wrapRef.current) confetti(wrapRef.current)
      },
    })
    if (badge) {
      tl.add(
        badge,
        {
          scale: [0, 1.2, 1],
          rotate: ['-40deg', '8deg', '0deg'],
          duration: 480,
          ease: 'outBack',
        },
        220,
      )
    }
    if (headline) {
      tl.add(
        headline,
        {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 380,
          ease: 'outCubic',
        },
        300,
      )
    }
    if (roast) {
      tl.add(
        roast,
        {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 420,
          ease: 'outCubic',
        },
        420,
      )
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Check-in confirmed"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-space/70 backdrop-blur-sm px-6"
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl bg-papaya p-7 text-center shadow-lifted"
      >
        <div
          ref={badgeRef}
          className="mx-auto -mt-16 mb-2 grid h-24 w-24 place-items-center rounded-full bg-steel text-space shadow-lifted"
        >
          <Sparkles className="h-10 w-10" strokeWidth={2.5} aria-hidden />
        </div>

        <div className="flex justify-center">
          <Mascot variant={0} size={110} float />
        </div>

        <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brick">
          Check-in stamped
        </p>
        <h2
          ref={headlineRef}
          className="font-display mt-1 text-4xl leading-none uppercase text-space"
        >
          Nice work, {firstName}
        </h2>

        <p
          ref={roastRef}
          className="mt-4 text-base leading-snug text-space/85"
        >
          {line}
        </p>

        <button
          type="button"
          onClick={onDismiss}
          autoFocus
          className="font-display mt-6 w-full rounded-2xl bg-brick py-3.5 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
        >
          Let's go
        </button>
        <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-widest text-space/40">
          — The mascot, secretly proud
        </p>
      </div>
    </div>
  )
}
