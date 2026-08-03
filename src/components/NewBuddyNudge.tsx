import { useCallback, useEffect, useMemo, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { listAmmoByAuthor } from '../lib/challenges'
import { renderAvatarDataUri } from '../lib/avatar'
import type { Member } from '../lib/types'
import AmmoAboutSheet from './AmmoAboutSheet'

interface NewBuddyNudgeProps {
  challengeId: string
  meUid: string
  meFirstName: string
  meJoinedAtMs: number
  members: Member[]
  /** Called after each ammo submit so the parent can refresh downstream data. */
  onAmmoAdded?: () => void
}

const DISMISS_STORAGE_KEY = (challengeId: string, meUid: string) =>
  `ab_nudge_dismissed:${challengeId}:${meUid}`

function readDismissed(challengeId: string, meUid: string): Set<string> {
  try {
    const raw = sessionStorage.getItem(DISMISS_STORAGE_KEY(challengeId, meUid))
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function writeDismissed(challengeId: string, meUid: string, set: Set<string>) {
  try {
    sessionStorage.setItem(
      DISMISS_STORAGE_KEY(challengeId, meUid),
      JSON.stringify([...set]),
    )
  } catch {
    /* storage disabled — silently accept */
  }
}

/**
 * Prompts existing members to add ammo about newcomers who joined after them.
 * Renders nothing when there are no outstanding newcomers.
 */
export default function NewBuddyNudge({
  challengeId,
  meUid,
  meFirstName,
  meJoinedAtMs,
  members,
  onAmmoAdded,
}: NewBuddyNudgeProps) {
  const [ammoedUids, setAmmoedUids] = useState<Set<string> | null>(null)
  const [dismissed, setDismissed] = useState<Set<string>>(() =>
    readDismissed(challengeId, meUid),
  )
  const [openTargetUid, setOpenTargetUid] = useState<string | null>(null)

  const refreshMyAmmo = useCallback(async () => {
    const rows = await listAmmoByAuthor(challengeId, meUid)
    setAmmoedUids(new Set(rows.map((r) => r.aboutUid)))
  }, [challengeId, meUid])

  useEffect(() => {
    let cancelled = false
    refreshMyAmmo().catch((err) => {
      if (cancelled) return
      console.error('nudge ammo lookup failed', err)
      setAmmoedUids(new Set()) // fail open — show nudges rather than hide silently
    })
    return () => {
      cancelled = true
    }
  }, [refreshMyAmmo])

  const newcomers = useMemo(() => {
    if (ammoedUids === null) return []
    return members.filter((m) => {
      if (m.uid === meUid) return false
      const joinedAtMs = m.joinedAt?.toMillis?.() ?? 0
      if (joinedAtMs <= meJoinedAtMs) return false
      if (ammoedUids.has(m.uid)) return false
      if (dismissed.has(m.uid)) return false
      return true
    })
  }, [members, meUid, meJoinedAtMs, ammoedUids, dismissed])

  if (ammoedUids === null || newcomers.length === 0) return null

  const openTarget = openTargetUid
    ? newcomers.find((n) => n.uid === openTargetUid) ?? null
    : null

  function dismiss(uid: string) {
    setDismissed((prev) => {
      const next = new Set(prev)
      next.add(uid)
      writeDismissed(challengeId, meUid, next)
      return next
    })
  }

  return (
    <section className="mt-8">
      <h3 className="font-display mb-3 text-xl tracking-wide uppercase text-lava">
        Fresh meat
      </h3>
      <ul className="flex flex-col gap-2">
        {newcomers.map((n) => (
          <li
            key={n.uid}
            className="flex items-center gap-3 rounded-2xl border-2 border-space/10 bg-white p-3 pl-3.5 shadow-card"
          >
            <img
              src={renderAvatarDataUri(n.avatarSeed)}
              width={44}
              height={44}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full bg-papaya"
              draggable={false}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-space">{n.firstName} joined</p>
              <p className="text-xs text-space/50">Got dirt? The roasts need ammo.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpenTargetUid(n.uid)}
              className="font-display flex shrink-0 items-center gap-1.5 rounded-xl bg-brick px-3.5 py-2.5 text-xs tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Spill
            </button>
            <button
              type="button"
              onClick={() => dismiss(n.uid)}
              aria-label={`Dismiss ${n.firstName} nudge`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-space/40 active:bg-space/10 active:text-space"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      {openTarget && (
        <AmmoAboutSheet
          challengeId={challengeId}
          target={{
            uid: openTarget.uid,
            firstName: openTarget.firstName,
            avatarSeed: openTarget.avatarSeed,
          }}
          byUid={meUid}
          byFirstName={meFirstName}
          onClose={() => {
            setOpenTargetUid(null)
            void refreshMyAmmo()
          }}
          onAnswered={() => {
            onAmmoAdded?.()
          }}
        />
      )}
    </section>
  )
}
