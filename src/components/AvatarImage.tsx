import Avatar from 'boring-avatars'
import { AVATAR_COLORS, AVATAR_VARIANT } from '../lib/avatar'

interface AvatarImageProps {
  seed: string
  size: number
  /** Applied to the wrapper, which is the same box the <img> used to be. */
  className?: string
  alt?: string
}

/**
 * A buddy's avatar, rendered as inline SVG.
 *
 * This used to be an <img> fed by renderToStaticMarkup(), which dragged
 * react-dom/server — 60 KB gzipped, ~17% of the entry chunk — into the boot
 * bundle purely to turn a React component into a string. Avatar is already a
 * React component, so it can just render.
 *
 * The wrapper keeps the old call sites' sizing/rounding classes working, and
 * clips the SVG so `rounded-full` still does what it did.
 */
export default function AvatarImage({
  seed,
  size,
  className = '',
  alt = '',
}: AvatarImageProps) {
  return (
    <span
      className={`inline-block overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Avatar size={size} name={seed} variant={AVATAR_VARIANT} colors={AVATAR_COLORS} />
    </span>
  )
}
