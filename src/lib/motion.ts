import { useCallback, useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard page entrance: every [data-animate] child cascades in.
 *
 * Call from a LAYOUT effect. The hide is done here, synchronously, one line
 * before the animation that undoes it — so the elements are never left hidden
 * by anything other than the animation that is about to reveal them, and a
 * page that never calls this simply shows its content unanimated.
 */
export function pageEnter(root: HTMLElement | null): void {
  if (!root) return
  const targets = root.querySelectorAll<HTMLElement>('[data-animate]')
  if (targets.length === 0) return
  if (prefersReducedMotion()) {
    utils.set(targets, { opacity: 1 })
    return
  }
  utils.set(targets, { opacity: 0 })
  animate(targets, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 400,
    delay: stagger(70),
    ease: 'outCubic',
  })
}

/**
 * Reveal a single late-arriving element (e.g. content that finished loading).
 * Same contract as pageEnter: call from a layout effect.
 */
export function reveal(el: HTMLElement | null, distance = 16): void {
  if (!el) return
  if (prefersReducedMotion()) {
    utils.set(el, { opacity: 1 })
    return
  }
  utils.set(el, { opacity: 0 })
  animate(el, {
    opacity: [0, 1],
    translateY: [distance, 0],
    duration: 320,
    ease: 'outCubic',
  })
}

/** Small press feedback on tap targets. */
export function pressPulse(el: HTMLElement): void {
  if (prefersReducedMotion()) return
  animate(el, {
    scale: [1, 0.96, 1],
    duration: 180,
    ease: 'outQuad',
  })
}

// ── Hover lift ────────────────────────────────────────────────

interface HoverLiftOptions {
  scale?: number
  y?: number
  duration?: number
}

const LIFT_DEFAULTS: Required<HoverLiftOptions> = {
  scale: 1.025,
  y: -2,
  duration: 220,
}

/**
 * Attaches a pointer-driven lift animation to a single element.
 * Returns a cleanup function. Each pointer event cancels the
 * previous animation and starts a fresh one toward the target,
 * giving smooth interruption even if the cursor leaves mid-enter.
 */
export function attachHoverLift(
  el: HTMLElement,
  opts: HoverLiftOptions = {},
): () => void {
  if (prefersReducedMotion()) return () => {}
  const { scale, y, duration } = { ...LIFT_DEFAULTS, ...opts }
  let current: ReturnType<typeof animate> | null = null

  const enter = () => {
    current?.cancel()
    current = animate(el, {
      scale,
      translateY: y,
      duration,
      ease: 'outCubic',
    })
  }
  const leave = () => {
    current?.cancel()
    current = animate(el, {
      scale: 1,
      translateY: 0,
      duration,
      ease: 'outCubic',
    })
  }
  el.addEventListener('pointerenter', enter)
  el.addEventListener('pointerleave', leave)
  return () => {
    el.removeEventListener('pointerenter', enter)
    el.removeEventListener('pointerleave', leave)
    current?.cancel()
    utils.set(el, { scale: 1, translateY: 0 })
  }
}

/**
 * React hook — returns a callback ref you spread onto the element.
 * Animation is created once and cleaned up on unmount.
 */
export function useHoverLift(opts: HoverLiftOptions = {}) {
  const cleanupRef = useRef<(() => void) | null>(null)
  const optsRef = useRef(opts)
  optsRef.current = opts

  useEffect(() => () => cleanupRef.current?.(), [])

  return useCallback((el: HTMLElement | null) => {
    cleanupRef.current?.()
    cleanupRef.current = null
    if (el) cleanupRef.current = attachHoverLift(el, optsRef.current)
  }, [])
}

/**
 * Imperative version for lists — call inside a ref callback with per-item elements.
 * Stores cleanups in the provided Map, keyed by a stable id.
 */
export function attachListHoverLift(
  el: HTMLElement | null,
  key: string,
  cleanups: Map<string, () => void>,
  opts: HoverLiftOptions = {},
) {
  cleanups.get(key)?.()
  cleanups.delete(key)
  if (el) cleanups.set(key, attachHoverLift(el, opts))
}
