import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { MASCOT_IDLES } from '../lib/constants'
import { prefersReducedMotion } from '../lib/motion'

interface MascotProps {
  /** Which idle loop to play. Defaults to a stable pseudo-random pick. */
  variant?: 0 | 1 | 2
  size?: number
  className?: string
  /** Adds a slow hover-float on top of the baked-in idle animation. */
  float?: boolean
  alt?: string
}

/**
 * The mascot. Always an <img> — iOS Safari chokes on alpha video, and the
 * animated .webp files loop natively. Falls back to the static SVG if a
 * loop fails to load.
 */
export default function Mascot({
  variant,
  size = 160,
  className = '',
  float = false,
  alt = 'The mascot, watching. Unimpressed.',
}: MascotProps) {
  const [src, setSrc] = useState<string>(
    () => MASCOT_IDLES[variant ?? Math.floor(Math.random() * MASCOT_IDLES.length)],
  )
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!float || prefersReducedMotion() || !ref.current) return
    const anim = animate(ref.current, {
      translateY: [-4, 4],
      duration: 2400,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
    })
    return () => {
      anim.cancel()
    }
  }, [float])

  return (
    <img
      ref={ref}
      src={src}
      onError={() => setSrc('/mascot/still.svg')}
      width={size}
      height={size}
      alt={alt}
      draggable={false}
      className={`select-none ${className}`}
    />
  )
}
