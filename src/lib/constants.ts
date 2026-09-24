/** The one and only admin. Hardcoded by design — no admin panel. */
export const ADMIN_EMAIL = 'teddyrounds@gmail.com'

/**
 * Bump together with VERSION in scripts/optimize-mascot.mjs whenever the
 * artwork changes — /mascot/** is served immutable, so the filename is the
 * only cache key.
 */
const V = 'v1'

/**
 * The animated idle loops (~1.9 MB each — hand-drawn boil, incompressible).
 * Never the first thing painted: Mascot draws the matching poster first and
 * swaps to these once they've decoded.
 */
export const MASCOT_IDLES = [
  `/mascot/idle-a.${V}.webp`,
  `/mascot/idle-b.${V}.webp`,
  `/mascot/idle-c.${V}.webp`,
] as const

/** Frame 0 of each loop, ~9 KB. What actually lands on screen first. */
export const MASCOT_POSTERS = [
  `/mascot/idle-a.${V}.poster.webp`,
  `/mascot/idle-b.${V}.poster.webp`,
  `/mascot/idle-c.${V}.poster.webp`,
] as const

/** Shown if a mascot asset fails to load outright. */
export const MASCOT_FALLBACK = '/mascot/teststill.svg'

/**
 * The idle the boot path uses — LoadingScreen, and the hero on Login and
 * Dashboard. Pinning it to one variant means a cold start fetches one loop,
 * not a random one per mount.
 */
export const MASCOT_BOOT_VARIANT = 0
