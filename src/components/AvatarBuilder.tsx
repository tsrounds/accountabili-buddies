import { useEffect, useRef, useState } from 'react'
import { createTimeline } from 'animejs'
import { Dices } from 'lucide-react'
import { randomAvatarSeed, renderAvatarDataUri } from '../lib/avatar'
import { prefersReducedMotion } from '../lib/motion'

interface AvatarBuilderProps {
  seed: string
  onChange: (seed: string) => void
  size?: number
}

const DEFAULT_SIZE = 132

const POOL_SIZE = 18
const SPIN_DURATION = 900

// Decelerating ease (matches the outExpo feel used elsewhere): fast start,
// slow settle. animejs v4 won't tween a plain JS object, so the reel runs on
// a hand-rolled rAF loop and animejs only handles the final DOM bounce.
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * Slot-machine avatar picker. Tapping the die pre-generates a pool of seeds,
 * rapidly cycles the preview through them (decelerating), and bounce-settles
 * on the final one (outBack). Reduced-motion snaps instantly.
 */
export default function AvatarBuilder({ seed, onChange, size = DEFAULT_SIZE }: AvatarBuilderProps) {
  const [displaySeed, setDisplaySeed] = useState(seed)
  const [spinning, setSpinning] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  // Keep the visible avatar in sync when the parent replaces the seed
  // externally (e.g. wizard resets).
  useEffect(() => {
    setDisplaySeed(seed)
  }, [seed])

  // Cancel any in-flight reel on unmount.
  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  function settleBounce() {
    if (prefersReducedMotion() || !wrapRef.current) return
    const tl = createTimeline()
    tl.add(wrapRef.current, {
      scale: [1, 0.9],
      duration: 90,
      ease: 'outQuad',
    }).add(wrapRef.current, {
      scale: [0.9, 1.08, 1],
      duration: 320,
      ease: 'outBack',
    })
  }

  function spin() {
    if (spinning) return
    // Pre-generate the whole pool + prime the render cache synchronously.
    // Cheap for open-peeps, and keeps the animation frame loop pure indexing.
    const pool = Array.from({ length: POOL_SIZE }, () => randomAvatarSeed())
    pool.forEach((s) => renderAvatarDataUri(s))
    const final = pool[pool.length - 1]

    if (prefersReducedMotion()) {
      setDisplaySeed(final)
      onChange(final)
      return
    }

    setSpinning(true)
    const start = performance.now()
    const lastIdx = pool.length - 1

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / SPIN_DURATION)
      const idx = Math.min(lastIdx, Math.floor(easeOutExpo(t) * lastIdx))
      setDisplaySeed(pool[idx])
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      rafRef.current = null
      setDisplaySeed(final)
      onChange(final)
      settleBounce()
      setSpinning(false)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <div className="flex items-center gap-5">
      {/* Transparent portrait — no frame, just the head. */}
      <div ref={wrapRef} className="shrink-0">
        <img
          src={renderAvatarDataUri(displaySeed)}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          alt="Your avatar"
          draggable={false}
          className="block select-none drop-shadow-sm"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2">
        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          aria-label="Roll a new avatar"
          className="font-display flex items-center gap-2 rounded-xl bg-space px-5 py-3 tracking-wide uppercase text-papaya shadow-lifted transition-colors active:bg-lava disabled:opacity-60"
        >
          <Dices className="h-5 w-5" aria-hidden />
          {spinning ? 'Rolling…' : 'Roll again'}
        </button>
        <p className="text-xs leading-snug text-space/50">
          Keep rolling until they look like your kind of trouble.
        </p>
      </div>
    </div>
  )
}
