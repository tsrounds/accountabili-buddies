import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Avatar from 'boring-avatars'

/** Used when a legacy doc predates avatars, or profile is otherwise unset. */
export const FALLBACK_AVATAR_SEED = 'buddy'

const COLORS = ['#780000', '#C1121F', '#003049', '#FDF0D5', '#669BBC']
const VARIANT = 'beam' as const
const SIZE = 80

export function randomAvatarSeed(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 16)
}

// Leaderboard/RoastsSection re-render often; don't regenerate the same
// seed's SVG on every render.
const cache = new Map<string, string>()

export function renderAvatarDataUri(seed: string): string {
  const cached = cache.get(seed)
  if (cached) return cached
  const svg = renderToStaticMarkup(
    createElement(Avatar, {
      size: SIZE,
      name: seed,
      variant: VARIANT,
      colors: COLORS,
    }),
  )
  const uri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  cache.set(seed, uri)
  return uri
}
