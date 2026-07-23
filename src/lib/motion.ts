import { animate, stagger, utils } from 'animejs'

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Standard page entrance: every [data-animate] child cascades in.
 * Elements start hidden via CSS (html.js [data-animate] { opacity: 0 }).
 */
export function pageEnter(root: HTMLElement | null): void {
  if (!root) return
  const targets = root.querySelectorAll<HTMLElement>('[data-animate]')
  if (targets.length === 0) return
  if (prefersReducedMotion()) {
    utils.set(targets, { opacity: 1 })
    return
  }
  animate(targets, {
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 400,
    delay: stagger(70),
    ease: 'outCubic',
  })
}

/** Reveal a single late-arriving element (e.g. content that finished loading). */
export function reveal(el: HTMLElement | null, distance = 16): void {
  if (!el) return
  if (prefersReducedMotion()) {
    utils.set(el, { opacity: 1 })
    return
  }
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
