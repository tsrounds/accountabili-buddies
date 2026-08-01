interface AvatarProps {
  /** Deterministic seed — usually the user's uid, so the avatar is stable per user. */
  seed: string
  size?: number
  className?: string
  alt?: string
}

/**
 * Per-user avatar. DiceBear croodles-neutral (transparent background),
 * cropped to a circle. Rolls off the seed, so two users never collide
 * and the same user always gets the same face.
 */
export default function Avatar({
  seed,
  size = 40,
  className = '',
  alt = '',
}: AvatarProps) {
  const url = `https://api.dicebear.com/10.x/croodles-neutral/svg?seed=${encodeURIComponent(seed)}`
  return (
    <img
      src={url}
      width={size}
      height={size}
      alt={alt}
      draggable={false}
      loading="lazy"
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full bg-transparent select-none ${className}`}
    />
  )
}
