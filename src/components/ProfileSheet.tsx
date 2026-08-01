import { useEffect, useState } from 'react'
import { Dice5, LogOut, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Avatar from './Avatar'

interface ProfileSheetProps {
  onClose: () => void
}

function randomSeed(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

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

  useEffect(() => {
    setName(initialName)
    setSeed(initialSeed)
  }, [initialName, initialSeed])

  const dirty = name.trim() !== initialName || seed !== initialSeed
  const trimmed = name.trim()
  const canSave = dirty && trimmed.length > 0 && !busy
  const showSaved = !dirty && savedAt > 0 && Date.now() - savedAt < 2500

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
          <Avatar seed={seed} size={128} bare alt="" />
          <div className="min-w-0 flex-1">
            <button
              onClick={() => setSeed(randomSeed())}
              className="font-display flex w-full items-center justify-center gap-2 rounded-xl bg-space px-4 py-3 tracking-wide uppercase text-papaya active:bg-space/85"
            >
              <Dice5 className="h-5 w-5" aria-hidden />
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
