import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { animate, createTimeline, utils } from 'animejs'
import { Check, Stamp, X } from 'lucide-react'
import { prefersReducedMotion, useHoverLift } from '../lib/motion'

const BURST_COLORS = ['var(--color-brick)', 'var(--color-steel)', 'var(--color-space)', 'var(--color-lava)']

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
 * Two-step CTA: tap opens the details sheet; the sheet's Submit or Skip
 * both commit the check-in, then the button plays its stamp animation.
 */
export default function CheckInButton({ checkedIn, onCheckIn }: CheckInButtonProps) {
  const [busy, setBusy] = useState(false)
  const [justStamped, setJustStamped] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [note, setNote] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const checkRef = useRef<HTMLSpanElement>(null)
  const hoverRef = useHoverLift({ scale: 1.03, y: -2 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const done = checkedIn || justStamped

  useEffect(() => {
    if (showDetails) requestAnimationFrame(() => textareaRef.current?.focus())
  }, [showDetails])

  useEffect(() => {
    if (!showDetails) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !busy) setShowDetails(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showDetails, busy])

  function openDetails() {
    if (busy || done) return
    setNote('')
    setShowDetails(true)
  }

  async function commit(withNote: string) {
    if (busy || done) return
    setBusy(true)
    try {
      await onCheckIn(withNote.trim())
    } catch (err) {
      console.error('check-in failed', err)
      setBusy(false)
      return
    }
    setJustStamped(true)
    setShowDetails(false)
    setBusy(false)
    playStamp()
  }

  function playStamp() {
    if (prefersReducedMotion() || !wrapRef.current || !btnRef.current) return
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
        ref={(el) => {
          (btnRef as React.MutableRefObject<HTMLButtonElement | null>).current = el
          hoverRef(done ? null : el)
        }}
        onClick={openDetails}
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
            Check in
          </>
        )}
      </button>

      {showDetails && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-space/40 backdrop-blur-sm sm:items-center"
          onClick={() => !busy && setShowDetails(false)}
        >
          <div
            className="w-full max-w-sm animate-[slideUp_200ms_ease-out] rounded-t-2xl bg-papaya p-6 shadow-lifted sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brick">
                  Today's check-in
                </p>
                <h3 className="font-display mt-1 text-2xl leading-tight tracking-wide uppercase text-space">
                  What'd you do?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => !busy && setShowDetails(false)}
                disabled={busy}
                aria-label="Close"
                className="shrink-0 rounded-full p-1 text-space/40 hover:bg-space/8 hover:text-space"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-1 text-xs text-space/60">
              Optional — but the receipts make the roasts better.
            </p>

            <textarea
              ref={textareaRef}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={280}
              rows={3}
              placeholder="e.g. 30 min lift, legs. Felt like a betrayal."
              className="mt-4 w-full resize-none rounded-xl border-2 border-space/15 bg-white px-4 py-3 text-sm text-space placeholder:text-space/30 focus:border-steel focus:outline-none"
            />
            <p className="mt-1 text-right text-[0.65rem] font-bold uppercase tracking-wider text-space/40">
              {note.length}/280
            </p>

            <button
              type="button"
              onClick={() => commit(note)}
              disabled={busy}
              className="font-display mt-3 w-full rounded-xl bg-brick py-3.5 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
            >
              {busy ? 'Stamping…' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => commit('')}
              disabled={busy}
              className="mt-2 w-full py-2 text-center text-sm font-bold text-space/60 underline underline-offset-4 disabled:opacity-40"
            >
              Skip — just check in
            </button>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
