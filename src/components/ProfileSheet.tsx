import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { Dice5, LogOut, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { prefersReducedMotion } from '../lib/motion'
import Avatar from './Avatar'

interface ProfileSheetProps {
  onClose: () => void
}

function randomSeed(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

// Ease-out roll cadence: fast at first, then decelerating. Total ~1s.
const ROLL_DELAYS = [45, 55, 70, 90, 115, 145, 180, 220, 265]

/**
 * Bottom sheet: edit first name and roll the avatar until it looks right.
 * Save is only enabled while there's a pending change; flips to "Saved"
 * for a beat after a successful write.
 */
export default function ProfileSheet({ onClose }: ProfileSheetProps) {
  const { user, profile, updateProfile, signOutUser } = useAuth()
  const initialName = profile?.firstName ?? ''
  const initialSeed = profile?.avatarSeed ?? user?.uid ?? ''

  const [name, setName] = useState(initialName)
  const [seed, setSeed] = useState(initialSeed)
  const [busy, setBusy] = useState(false)
  const [savedAt, setSavedAt] = useState(0)
  const [rolling, setRolling] = useState(false)

  const avatarRef = useRef<HTMLDivElement>(null)
  const rollTimersRef = useRef<number[]>([])

  useEffect(() => {
    setName(initialName)
    setSeed(initialSeed)
  }, [initialName, initialSeed])

  // Clear any pending roll timers on unmount so we don't setState after teardown.
  useEffect(() => {
    return () => {
      rollTimersRef.current.forEach(clearTimeout)
      rollTimersRef.current = []
    }
  }, [])

  const dirty = name.trim() !== initialName || seed !== initialSeed
  const trimmed = name.trim()
  const canSave = dirty && trimmed.length > 0 && !busy && !rolling
  const showSaved = !dirty && savedAt > 0 && Date.now() - savedAt < 2500

  function handleRoll() {
    if (rolling) return
    const finalSeed = randomSeed()

    // Reduced-motion: skip the tumble, just land on the new face.
    if (prefersReducedMotion()) {
      setSeed(finalSeed)
      return
    }

    setRolling(true)
    if (avatarRef.current) {
      animate(avatarRef.current, {
        rotate: [
          { to: -8, duration: 90, ease: 'inOutSine' },
          { to: 6, duration: 110, ease: 'inOutSine' },
          { to: -4, duration: 140, ease: 'inOutSine' },
          { to: 2, duration: 180, ease: 'inOutSine' },
          { to: 0, duration: 260, ease: 'outCubic' },
        ],
        scale: [
          { to: 1.06, duration: 200, ease: 'outQuad' },
          { to: 1, duration: 580, ease: 'outCubic' },
        ],
      })
    }

    let elapsed = 0
    ROLL_DELAYS.forEach((delay, i) => {
      elapsed += delay
      const isLast = i === ROLL_DELAYS.length - 1
      const t = window.setTimeout(() => {
        setSeed(isLast ? finalSeed : randomSeed())
        if (isLast) setRolling(false)
      }, elapsed)
      rollTimersRef.current.push(t)
    })
  }

  async function handleSave() {
    if (!canSave) return
    setBusy(true)
    try {
      await updateProfile({ firstName: trimmed, avatarSeed: seed })
      setSavedAt(Date.now())
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-space/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm animate-[slideUp_200ms_ease-out] rounded-t-2xl bg-papaya p-6 pb-safe shadow-lifted sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl tracking-wide uppercase text-space">
            Your profile
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-2 grid h-9 w-9 place-items-center rounded-full text-space/50 active:bg-space/10"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div ref={avatarRef} className="shrink-0" style={{ willChange: 'transform' }}>
            <Avatar seed={seed} size={128} bare alt="" />
          </div>
          <div className="min-w-0 flex-1">
            <button
              onClick={handleRoll}
              disabled={rolling}
              className="font-display flex w-full items-center justify-center gap-2 rounded-xl bg-space px-4 py-3 tracking-wide uppercase text-papaya active:bg-space/85 disabled:opacity-70"
            >
              <Dice5
                className={`h-5 w-5 ${rolling ? 'animate-spin' : ''}`}
                aria-hidden
              />
              Roll again
            </button>
            <p className="mt-2 text-sm text-space/60">
              Keep rolling until they look like your kind of trouble.
            </p>
          </div>
        </div>

        <label className="mt-6 flex flex-col gap-1">
          <span className="text-xs font-bold tracking-wide uppercase text-space/60">
            First name
          </span>
          <input
            type="text"
            required
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
          />
        </label>

        <button
          onClick={handleSave}
          disabled={!canSave && !showSaved}
          className={`font-display mt-6 w-full rounded-xl py-4 text-lg tracking-wide uppercase shadow-lifted transition-colors ${
            showSaved
              ? 'bg-brick/70 text-papaya'
              : 'bg-brick text-papaya active:bg-lava disabled:bg-brick/50'
          }`}
        >
          {busy ? 'Saving…' : showSaved ? 'Saved' : 'Save'}
        </button>

        <button
          onClick={() => void signOutUser()}
          className="mt-4 flex w-full items-center justify-center gap-2 py-2 text-sm font-bold text-space/60 active:text-space"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>
    </div>
  )
}
