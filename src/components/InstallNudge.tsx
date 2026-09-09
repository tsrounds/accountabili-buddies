import { useEffect, useState } from 'react'
import { Bell, Share, X } from 'lucide-react'
import { requestNotificationPermission, type PermissionResult } from '../lib/notifications'
import { useAuth } from '../contexts/AuthContext'

const DISMISS_KEY = 'ab_install_nudge_dismissed_until'
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

// iOS-only nudge: friends here are iPhones. Include iPadOS 13+, which reports
// itself as Mac but has touch — that's the giveaway.
function isIOS(): boolean {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua)) return true
  return ua.includes('Mac') && navigator.maxTouchPoints > 1
}

function readSnoozedUntil(): number {
  try {
    const raw = localStorage.getItem(DISMISS_KEY)
    return raw ? Number(raw) || 0 : 0
  } catch {
    return 0
  }
}

function writeSnooze(): void {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + SNOOZE_MS))
  } catch {
    /* storage disabled — accept nag */
  }
}

/**
 * Two-mode banner shown on the Dashboard.
 *   1. Not installed (iOS Safari, tab context) → "Add to Home Screen" walkthrough.
 *   2. Installed but notifications untouched → one-tap "Turn on notifications".
 * Dismiss snoozes for 7 days via localStorage.
 */
export default function InstallNudge() {
  const { user } = useAuth()
  const [mode, setMode] = useState<'hidden' | 'install' | 'enable'>('hidden')
  const [expanded, setExpanded] = useState(false)
  const [enabling, setEnabling] = useState(false)
  const [result, setResult] = useState<PermissionResult | null>(null)

  useEffect(() => {
    // SSR/hydration safety — window access lives inside effect.
    if (readSnoozedUntil() > Date.now()) return

    const standalone = isStandalone()

    if (!standalone) {
      // Only pester iPhones — desktop/Android users don't need home-screen advice.
      if (isIOS()) setMode('install')
      return
    }

    // Installed. Nudge for permission only if the browser hasn't answered yet.
    if (typeof Notification === 'undefined') return
    if (Notification.permission === 'default') setMode('enable')
  }, [])

  function dismiss() {
    writeSnooze()
    setMode('hidden')
  }

  async function handleEnable() {
    if (!user) return
    setEnabling(true)
    try {
      const r = await requestNotificationPermission(user.uid)
      setResult(r)
      if (r === 'granted') {
        // Auto-hide on success — don't nag someone who just said yes.
        setTimeout(() => setMode('hidden'), 1200)
      }
    } finally {
      setEnabling(false)
    }
  }

  if (mode === 'hidden') return null

  if (mode === 'enable') {
    return (
      <div className="mt-4 rounded-2xl border-2 border-space/10 bg-white p-4 shadow-card">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-steel/20 text-space">
            <Bell className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-space">Turn on notifications</p>
            <p className="mt-0.5 text-sm text-space/60">
              {result === 'granted'
                ? 'Nice. The mascot has your number.'
                : "Roast drops, missed check-ins, new buddies. iOS only asks once."}
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-space/40 active:bg-space/10 active:text-space"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {result !== 'granted' && (
          <button
            type="button"
            onClick={handleEnable}
            disabled={enabling}
            className="font-display mt-3 w-full rounded-xl bg-space py-3 text-sm tracking-wide uppercase text-papaya shadow-lifted active:bg-space/80 disabled:opacity-50"
          >
            {enabling ? 'Asking…' : 'Enable notifications'}
          </button>
        )}
        {result === 'denied' && (
          <p className="mt-2 text-xs text-brick">
            Blocked. Re-enable in iOS Settings → Notifications → Buddies.
          </p>
        )}
      </div>
    )
  }

  // mode === 'install'
  return (
    <div
      className="mt-4 rounded-2xl border-2 border-brick/30 bg-white p-4 shadow-card"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brick/15 text-brick">
          <Share className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-space">Add Buddies to your home screen</p>
          <p className="mt-0.5 text-sm text-space/60">
            iOS only delivers pushes to installed apps. Takes ten seconds.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss for a week"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-space/40 active:bg-space/10 active:text-space"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="font-display mt-3 w-full rounded-xl border-2 border-space/15 bg-papaya py-2.5 text-sm tracking-wide uppercase text-space active:bg-space/5"
      >
        {expanded ? 'Hide steps' : 'Show me how'}
      </button>
      {expanded && (
        <ol className="mt-3 space-y-2 rounded-xl bg-papaya/60 p-3 text-sm text-space/80">
          <li>
            <span className="font-bold text-space">1.</span> Tap the{' '}
            <Share className="inline h-4 w-4 -translate-y-0.5 text-steel" aria-hidden />{' '}
            Share button at the bottom of Safari.
          </li>
          <li>
            <span className="font-bold text-space">2.</span> Scroll and choose{' '}
            <span className="font-bold text-space">Add to Home Screen</span>.
          </li>
          <li>
            <span className="font-bold text-space">3.</span> Open Buddies from your
            home screen, then flip on notifications from your profile.
          </li>
        </ol>
      )}
    </div>
  )
}
