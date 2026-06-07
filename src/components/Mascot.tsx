// src/components/Mascot.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  IDLE_ANIMATIONS,
  type IdleAnimation,
  type IdleKey,
  idleByKey,
  randomIdle,
} from '@/assets/mascotIdle'

interface MascotProps {
  /**
   * Which idle to show.
   *   - omit / undefined  -> random per mount
   *   - 'a' | 'b' | 'c'   -> specific
   *   - 'rotate'          -> cycle through all idles every `rotateMs` ms
   */
  idle?: IdleKey | 'rotate'
  /** Cycle interval when idle="rotate". Default 12s (one full loop). */
  rotateMs?: number
  /** Pixel width/height (square). Default 160. */
  size?: number
  /** Extra Tailwind classes for the wrapping span. */
  className?: string
  /** Alt text for accessibility. */
  alt?: string
}

/**
 * Renders the Accountabili-Buddies mascot.
 *
 * Format choice rationale:
 *   We render the animated WebP through a plain <img> tag. WebP with full
 *   alpha is supported on every modern browser including iOS Safari 14+, and
 *   <img> sidesteps every iOS quirk that <video> has (muted+playsInline
 *   requirements, autoplay restrictions in low-power mode, the multi-WebM
 *   Safari tab crash, etc.). The WebM files in /public/mascot are kept around
 *   so a future component can opt into the smaller VP9 path on Chromium if
 *   needed, but they are NOT used here by default.
 *
 * Reduced-motion:
 *   When the user has `prefers-reduced-motion: reduce` set we render the static
 *   first-frame PNG instead. Same dimensions, same alpha, no animation.
 */
export default function Mascot({
  idle,
  rotateMs = 12_000,
  size = 160,
  className = '',
  alt = 'Accountabili-Buddies mascot',
}: MascotProps) {
  const reducedMotion = usePrefersReducedMotion()

  // Stable per-mount random pick when no idle is specified (avoids re-rolling
  // every re-render).
  const initialRandom = useMemo<IdleAnimation>(() => randomIdle(), [])

  // Rotation state (only used when idle === 'rotate')
  const [rotateIdx, setRotateIdx] = useState(0)
  useEffect(() => {
    if (idle !== 'rotate') return
    const id = window.setInterval(
      () => setRotateIdx(i => (i + 1) % IDLE_ANIMATIONS.length),
      rotateMs,
    )
    return () => window.clearInterval(id)
  }, [idle, rotateMs])

  const current: IdleAnimation =
    idle === 'rotate'
      ? IDLE_ANIMATIONS[rotateIdx]
      : idle
      ? idleByKey(idle)
      : initialRandom

  // Force <img> to re-fetch the WebP when we change idles, so the new
  // animation starts from frame 0 rather than continuing wherever a cached
  // decoder left off.
  const imgKey = `${current.key}-${rotateIdx}`

  // Use the static poster for reduced-motion users.
  const src = reducedMotion ? current.poster : current.webp

  return (
    <span
      className={['inline-block leading-none select-none', className].join(' ')}
      style={{ width: size, height: size }}
    >
      <img
        key={imgKey}
        src={src}
        alt={alt}
        width={size}
        height={size}
        draggable={false}
        // Decode async + eager load: the mascot is usually visible immediately,
        // and we want the image ready before paint. If you start using the
        // mascot far below the fold, switch to loading="lazy".
        loading="eager"
        decoding="async"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          // imageRendering: 'auto' keeps the soft hand-drawn lines smooth;
          // switch to 'pixelated' only for pixel-art assets.
          imageRendering: 'auto',
          // Subtle drop shadow that matches the retro paper aesthetic — comment
          // out if you'd rather the mascot read flat against backgrounds.
          filter: 'drop-shadow(0 2px 0 rgba(44, 62, 80, 0.18))',
        }}
      />
    </span>
  )
}

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  const mqRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mqRef.current = mq
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
