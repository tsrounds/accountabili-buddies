import { useRef, useState } from 'react'
import { animate, createTimeline, utils } from 'animejs'
import { Check, Stamp } from 'lucide-react'
import { prefersReducedMotion } from '../lib/motion'

const BURST_COLORS = ['#C1121F', '#669BBC', '#003049', '#780000']

/** Radial particle burst around the button — cheap, throwaway DOM. */
function burst(container: HTMLElement) {
  const rect = container.getBoundingClientRect()
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span')
    const size = 6 + Math.random() * 6
    p.style.cssText = `position:absolute;left:${rect.width / 2}px;top:${rect.height / 2}px;width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};background:${BURST_COLORS[i % BURST_COLORS.length]};pointer-events:none;z-index:5;`
    container.appendChild(p)
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5
    const dist = 60 + Math.random() * 50
    animate(p, {
      translateX: Math.cos(angle) * dist,
      translateY: Math.sin(angle) * dist,
      scale: [1, 0],
      opacity: [1, 0.6],
      duration: 520 + Math.random() * 180,
      ease: 'outExpo',
      onComplete: () => p.remove(),
    })
  }
}

interface CheckInButtonProps {
  checkedIn: boolean
  onCheckIn: (note: string) => Promise<void>
}

/**
 * The main CTA of the entire app. Tapping it should feel like stamping a
 * seal: press → slam → ring shockwave → particle burst → settled ✓ state.
 */
export default function CheckInButton({ checkedIn, onCheckIn }: CheckInButtonProps) {
  const [busy, setBusy] = useState(false)
  const [justStamped, setJustStamped] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const checkRef = useRef<HTMLSpanElement>(null)

  const done = checkedIn || justStamped

  async function handleTap() {
    if (busy || done || !btnRef.current) return
    setBusy(true)
    try {
      await onCheckIn(note.trim())
    } catch (err) {
      console.error('check-in failed', err)
      setBusy(false)
      return
    }
    setJustStamped(true)
    setShowNote(false)
    setBusy(false)

    if (prefersReducedMotion() || !wrapRef.current) return
    const tl = createTimeline()
    tl.add(btnRef.current, {
      scale: [1, 0.93],
      duration: 90,
      ease: 'outQuad',
    })
      .add(btnRef.current, {
        scale: [0.93, 1.05, 1],
        duration: 320,
        ease: 'outBack',
        onBegin: () => burst(wrapRef.current!),
      })
    if (ringRef.current) {
      utils.set(ringRef.current, { opacity: 0.9, scale: 0.7 })
      animate(ringRef.current, {
        scale: [0.7, 1.55],
        opacity: [0.9, 0],
        duration: 550,
        ease: 'outExpo',
      })
    }
    if (checkRef.current) {
      animate(checkRef.current, {
        scale: [2.6, 1],
        rotate: ['-18deg', '-3deg'],
        opacity: [0, 1],
        duration: 360,
        ease: 'outBack',
      })
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <span
        ref={ringRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border-4 border-steel opacity-0"
      />
      <button
        ref={btnRef}
        onClick={handleTap}
        disabled={busy || done}
        aria-live="polite"
        className={`font-display relative flex w-full items-center justify-center gap-3 rounded-2xl py-6 text-2xl tracking-wider uppercase shadow-lifted transition-colors duration-300 ${
          done ? 'bg-steel text-space' : 'bg-brick text-papaya active:bg-lava'
        }`}
      >
        {done ? (
          <>
            <span ref={checkRef} className="inline-flex">
              <Check className="h-8 w-8" strokeWidth={3.5} aria-hidden />
            </span>
            Checked in
          </>
        ) : (
          <>
            <Stamp className="h-7 w-7" aria-hidden />
            {busy ? 'Stamping…' : 'Check in'}
          </>
        )}
      </button>

      {!done && (
        <div className="mt-2 text-center">
          {showNote ? (
            <input
              autoFocus
              type="text"
              maxLength={140}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional receipts — what did you do?"
              className="w-full rounded-xl border-2 border-space/15 bg-white px-4 py-3 text-sm text-space placeholder:text-space/30 focus:border-steel"
            />
          ) : (
            <button
              onClick={() => setShowNote(true)}
              className="text-xs font-bold text-space/50 underline underline-offset-4"
            >
              + add a note
            </button>
          )}
        </div>
      )}
    </div>
  )
}
