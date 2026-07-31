import { Style, Avatar } from '@dicebear/core'
import definition from '@dicebear/styles/open-peeps.json' with { type: 'json' }

// Built once — Style's constructor deep-clones + JSON-schema-validates the
// definition, so do that exactly once and reuse the instance for every avatar.
const style = new Style(definition)

/** Used when a legacy doc predates avatars, or profile is otherwise unset. */
export const FALLBACK_AVATAR_SEED = 'buddy'

export function randomAvatarSeed(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 16)
}

// Leaderboard/RoastsSection re-render often; don't regenerate the same
// seed's SVG on every render.
const cache = new Map<string, string>()

export function renderAvatarDataUri(seed: string): string {
  const cached = cache.get(seed)
  if (cached) return cached
  const uri = new Avatar(style, { seed }).toDataUri()
  cache.set(seed, uri)
  return uri
}
