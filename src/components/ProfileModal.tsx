import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Bell, BellOff, LogOut, X } from 'lucide-react'
import AvatarBuilder from './AvatarBuilder'
import type { PermissionResult } from '../lib/notifications'

interface ProfileModalProps {
  firstName: string
  avatarSeed: string
  onSave: (patch: { firstName: string; avatarSeed: string }) => Promise<void>
  onEnableNotifications: () => Promise<PermissionResult>
  onSignOut: () => void
  onClose: () => void
}

/** Bottom-sheet profile editor — change your name + avatar, or bail out. */
export default function ProfileModal({
  firstName,
  avatarSeed,
  onSave,
  onEnableNotifications,
  onSignOut,
  onClose,
}: ProfileModalProps) {
  const [name, setName] = useState(firstName)
  const [seed, setSeed] = useState(avatarSeed)
  const [saving, setSaving] = useState(false)

  const dirty = name.trim() !== firstName || seed !== avatarSeed

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || saving || !dirty) return
    setSaving(true)
    try {
      await onSave({ firstName: name.trim(), avatarSeed: seed })
      onClose()
    } catch (err) {
      console.error('profile save failed', err)
      setSaving(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-space/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm animate-[slideUp_200ms_ease-out] rounded-t-2xl bg-papaya p-6 shadow-lifted sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl tracking-wide uppercase text-space">
            Your profile
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 grid h-9 w-9 place-items-center rounded-full text-space/50 active:bg-space/10"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
          <AvatarBuilder seed={seed} onChange={setSeed} size={116} />

          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              First name
            </span>
            <input
              type="text"
              required
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>

          <button
            type="submit"
            disabled={!name.trim() || !dirty || saving}
            className="font-display rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
          >
            {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
          </button>
        </form>

        <NotificationsSection onEnable={onEnableNotifications} />

        <button
          onClick={onSignOut}
          className="mt-4 flex w-full items-center justify-center gap-2 py-2 text-sm font-bold text-space/50 active:text-space"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Sign out
        </button>
      </div>
    </div>,
    document.body,
  )
}

function NotificationsSection({
  onEnable,
}: {
  onEnable: () => Promise<PermissionResult>
}) {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(
    () =>
      typeof Notification === 'undefined' ? 'unsupported' : Notification.permission,
  )
  const [isStandalone, setIsStandalone] = useState(false)
  const [enabling, setEnabling] = useState(false)

  useEffect(() => {
    // iOS Safari 16.4+ only delivers push to the installed PWA. Both checks
    // matter — matchMedia covers Android/desktop, navigator.standalone is
    // iOS's own legacy signal.
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)
  }, [])

  async function handleClick() {
    setEnabling(true)
    try {
      const result = await onEnable()
      setPermission(result === 'unsupported' ? 'unsupported' : result)
    } finally {
      setEnabling(false)
    }
  }

  if (!isStandalone) {
    return (
      <div className="mt-6 rounded-xl border-2 border-space/10 bg-white/60 p-4">
        <div className="flex items-center gap-2 text-space">
          <Bell className="h-4 w-4" aria-hidden />
          <span className="text-sm font-bold">Push notifications</span>
        </div>
        <p className="mt-2 text-sm text-space/70">
          Install Buddies to your home screen first — iOS only delivers pushes
          to installed apps.
        </p>
        <ol className="mt-2 list-decimal pl-5 text-sm text-space/70">
          <li>Tap the Share button in Safari.</li>
          <li>Choose "Add to Home Screen".</li>
          <li>Open Buddies from your home screen.</li>
        </ol>
      </div>
    )
  }

  if (permission === 'granted') {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-xl border-2 border-space/10 bg-white/60 p-4 text-sm text-space">
        <Bell className="h-4 w-4" aria-hidden />
        <span className="font-bold">Notifications on.</span>
        <span className="text-space/60">The mascot has your number.</span>
      </div>
    )
  }

  if (permission === 'denied') {
    return (
      <div className="mt-6 rounded-xl border-2 border-space/10 bg-white/60 p-4">
        <div className="flex items-center gap-2 text-space">
          <BellOff className="h-4 w-4" aria-hidden />
          <span className="text-sm font-bold">Notifications blocked.</span>
        </div>
        <p className="mt-2 text-sm text-space/70">
          Re-enable in iOS Settings → Notifications → Buddies. iOS won't ask
          again from here.
        </p>
      </div>
    )
  }

  if (permission === 'unsupported') {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-xl border-2 border-space/10 bg-white/60 p-4 text-sm text-space/70">
        <BellOff className="h-4 w-4" aria-hidden />
        <span>Push isn't available on this browser.</span>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-xl border-2 border-space/10 bg-white/60 p-4">
      <div className="flex items-center gap-2 text-space">
        <Bell className="h-4 w-4" aria-hidden />
        <span className="text-sm font-bold">Push notifications</span>
      </div>
      <p className="mt-2 text-sm text-space/70">
        Let the mascot yell at you when you skip a check-in. iOS only asks
        once — don't fumble the tap.
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={enabling}
        className="font-display mt-3 w-full rounded-xl bg-space py-3 text-sm tracking-wide uppercase text-papaya shadow-lifted active:bg-space/80 disabled:opacity-50"
      >
        {enabling ? 'Asking…' : 'Enable notifications'}
      </button>
    </div>
  )
}
