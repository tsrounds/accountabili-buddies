// src/assets/mascotIdle.ts
//
// Central manifest of all idle animations. Adding a new idle is one line.
//
// File naming convention: public/mascot/idle-<key>.webp (and .webm, .png)
// Source originals live wherever you keep them; rebuild with
// `scripts/process-mascot-idle.sh ./raw ./public/mascot`.
//
// Vite serves /public verbatim, so /mascot/idle-a.webp is the live URL.

export type IdleKey = 'a' | 'b' | 'c'

export interface IdleAnimation {
  /** Stable key used in URLs and prop values. */
  key: IdleKey
  /** Human label — handy for debugging, dropdowns, alt text. */
  label: string
  /** Path to the animated WebP (primary, universal). */
  webp: string
  /** Path to WebM/VP9+alpha (optional, smaller for Chromium-based browsers). */
  webm: string
  /** Path to the static PNG poster / reduced-motion fallback. */
  poster: string
}

export const IDLE_ANIMATIONS: readonly IdleAnimation[] = [
  {
    key: 'a',
    label: 'Watchful',
    webp: '/mascot/idle-a.webp',
    webm: '/mascot/idle-a.webm',
    poster: '/mascot/idle-a.png',
  },
  {
    key: 'b',
    label: 'Restless',
    webp: '/mascot/idle-b.webp',
    webm: '/mascot/idle-b.webm',
    poster: '/mascot/idle-b.png',
  },
  {
    key: 'c',
    label: 'Stern',
    webp: '/mascot/idle-c.webp',
    webm: '/mascot/idle-c.webm',
    poster: '/mascot/idle-c.png',
  },
] as const

/** Pick a random idle. Useful for "fresh personality on every render". */
export function randomIdle(): IdleAnimation {
  return IDLE_ANIMATIONS[Math.floor(Math.random() * IDLE_ANIMATIONS.length)]
}

/** Look up by key. Returns the first idle if the key is unknown. */
export function idleByKey(key: IdleKey | string): IdleAnimation {
  return IDLE_ANIMATIONS.find(i => i.key === key) ?? IDLE_ANIMATIONS[0]
}
