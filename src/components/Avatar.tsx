interface AvatarProps {
  /** Deterministic seed. Use the user's avatarSeed when available; falls
   *  back to uid so existing/legacy users still get a stable face. */
  seed: string
  size?: number
  className?: string
  alt?: string
  /** Full uncropped SVG (used for the big profile preview). */
  bare?: boolean
}

/**
 * Per-user avatar. DiceBear croodles-neutral (transparent background).
 * Circular crop by default; `bare` shows the whole illustration.
 */
export default function Avatar({
  seed,
  size = 40,
  className = '',
  alt = '',
  bare = false,
}: AvatarProps) {
  const url = `https://api.dicebear.com/10.x/croodles-neutral/svg?seed=${encodeURIComponent(seed)}`
  const shape = bare ? '' : 'rounded-full'
  return (
    <img
      src={url}
      width={size}
      height={size}
      alt={alt}
      draggable={false}
      loading="lazy"
      style={{ width: size, height: size }}
      className={`shrink-0 select-none bg-transparent ${shape} ${className}`}
    />
  )
}
