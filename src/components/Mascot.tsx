import { useCallback, useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import {
  MASCOT_BOOT_VARIANT,
  MASCOT_FALLBACK,
  MASCOT_IDLES,
  MASCOT_POSTERS,
} from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion'

interface MascotProps {
  /** Which idle to use. Defaults to the one the boot path already fetched. */
  variant?: 0 | 1 | 2
  size?: number
  className?: string
  /** Adds a slow hover-float on top of the baked-in idle animation. */
  float?: boolean
  /**
   * Never load the animated loop — just the ~9 KB poster. For the small,
   * decorative mascots that aren't worth 1.9 MB.
   */
  still?: boolean
  alt?: string
}

/**
 * The mascot. Always an <img> — iOS Safari chokes on alpha video, and the
 * animated .webp files loop natively.
 *
 * The loops are ~1.9 MB each (hand-drawn boil: every line is redrawn on all
 * 238 frames, so they don't compress and can't be shortened without a visible
 * pop at the wrap). Waiting on one left an empty box on every loading screen.
 *
 * So the poster — frame 0, ~9 KB — is painted immediately and the loop is
 * cross-faded in underneath it once decoded. The two are stacked rather than
 * swapped on one element so each asset is requested exactly once, and the
 * poster is faded out rather than left behind the loop, which would otherwise
 * ghost through the animation's transparent areas.
 */
export default function Mascot({
  variant = MASCOT_BOOT_VARIANT,
  size = 160,
  className = '',
  float = false,
  still = false,
  alt = 'The mascot, watching. Unimpressed.',
}: MascotProps) {
  const animated = !still && !prefersReducedMotion()
  // Which variant's loop has finished decoding — not a bare boolean, so that
  // switching variant implicitly un-readies without an effect that could race
  // the image's own load event.
  const [readyVariant, setReadyVariant] = useState<number | null>(null)
  const [posterFailed, setPosterFailed] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)
  const loopReady = readyVariant === variant

  // A loop served from cache can finish loading before React attaches onLoad,
  // in which case that event never fires — so check on mount too.
  const loopRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) {
      setReadyVariant(Number(el.dataset.variant))
    }
  }, [])

  // The loop doesn't even start downloading until the browser is idle. It's
  // ~1.9 MB of decoration; letting it race the fonts, the route chunk and
  // Firestore's first handshake just makes the screen people are waiting on
  // arrive later.
  const [loopWanted, setLoopWanted] = useState(false)
  useEffect(() => {
    if (!animated) return
    const schedule =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const id = schedule(() => setLoopWanted(true))
    return () => cancel(id as number)
  }, [animated])

  useEffect(() => {
    if (!float || prefersReducedMotion() || !wrapRef.current) return
    const anim = animate(wrapRef.current, {
      translateY: [-4, 4],
      duration: 2400,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
    })
    return () => {
      anim.cancel()
    }
  }, [float])

  const box = { position: 'absolute', inset: 0, width: '100%', height: '100%' } as const

  return (
    <span
      ref={wrapRef}
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={posterFailed ? MASCOT_FALLBACK : MASCOT_POSTERS[variant]}
        onError={() => setPosterFailed(true)}
        width={size}
        height={size}
        alt={alt}
        draggable={false}
        style={{ ...box, opacity: loopReady ? 0 : 1 }}
      />
      {animated && loopWanted && (
        <img
          ref={loopRef}
          key={variant}
          data-variant={variant}
          src={MASCOT_IDLES[variant]}
          onLoad={() => setReadyVariant(variant)}
          width={size}
          height={size}
          alt=""
          aria-hidden
          draggable={false}
          style={{ ...box, opacity: loopReady ? 1 : 0 }}
        />
      )}
    </span>
  )
}
