import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import Mascot from './Mascot'
import { prefersReducedMotion } from '../lib/motion'

/** The mascot IS the loading indicator. No spinners in this house. */
export default function LoadingScreen({ message = 'Judging silently…' }: { message?: string }) {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !textRef.current) return
    const anim = animate(textRef.current, {
      opacity: [0.35, 1],
      duration: 900,
      ease: 'inOutSine',
      alternate: true,
      loop: true,
    })
    return () => {
      anim.cancel()
    }
  }, [])

  return (
    <main className="grid min-h-dvh place-items-center bg-papaya">
      <div className="flex flex-col items-center gap-4">
        <Mascot float size={150} />
        <p ref={textRef} className="text-sm font-bold tracking-wide text-space/70">
          {message}
        </p>
      </div>
    </main>
  )
}
