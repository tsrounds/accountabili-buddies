/** Used when a legacy doc predates avatars, or profile is otherwise unset. */
export const FALLBACK_AVATAR_SEED = 'buddy'

export const AVATAR_COLORS = ['#780000', '#C1121F', '#003049', '#FDF0D5', '#669BBC']
export const AVATAR_VARIANT = 'beam' as const

export function randomAvatarSeed(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 16)
}
