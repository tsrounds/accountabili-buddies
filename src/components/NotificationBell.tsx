import { useEffect, useRef, useState } from 'react'
import { Bell, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
  doc,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

interface Notif {
  id: string
  message: string
  challengeId: string
  challengeName: string
  read: boolean
  createdAt: Timestamp | null
}

export default function NotificationBell() {
  const { currentUser } = useAuth()
  const [notifs, setNotifs] = useState<Notif[]>([])
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Real-time listener on latest 20 notifications for this user
  useEffect(() => {
    if (!currentUser) return
    const q = query(
      collection(db, 'ab_notifications'),
      where('recipientUid', '==', currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(20)
    )
    const unsub = onSnapshot(q, snap => {
      setNotifs(snap.docs.map(d => ({ id: d.id, ...d.data() } as Notif)))
    })
    return unsub
  }, [currentUser])

  // Mark all unread as read when panel opens
  useEffect(() => {
    if (!open || !currentUser) return
    const unread = notifs.filter(n => !n.read)
    if (unread.length === 0) return
    const batch = writeBatch(db)
    unread.forEach(n => batch.update(doc(db, 'ab_notifications', n.id), { read: true }))
    void batch.commit()
  }, [open, currentUser, notifs])

  // Close panel on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const unreadCount = notifs.filter(n => !n.read).length

  function formatTime(ts: Timestamp | null): string {
    if (!ts) return ''
    const d = ts.toDate()
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHrs = Math.floor(diffMins / 60)
    if (diffHrs < 24) return `${diffHrs}h ago`
    return `${Math.floor(diffHrs / 24)}d ago`
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative p-1 text-slate hover:text-mustard transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-retro-red border border-cream rounded-full flex items-center justify-center">
            <span className="font-display text-[9px] text-cream leading-none">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Drop-down panel */}
      {open && (
        <div className="absolute right-0 top-8 w-80 max-h-96 overflow-y-auto bg-cream border-2 border-slate shadow-retro z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate/20 sticky top-0 bg-cream">
            <span className="font-display text-xs text-slate uppercase tracking-wider">
              Dispatches
            </span>
            <button onClick={() => setOpen(false)} className="text-slate/40 hover:text-slate">
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          {notifs.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="font-body text-slate/40 text-xs">
                No dispatches yet. Stay active.
              </p>
            </div>
          ) : (
            <ul>
              {notifs.map(n => (
                <li
                  key={n.id}
                  className={[
                    'px-3 py-3 border-b border-slate/10 last:border-0',
                    !n.read ? 'bg-mustard/5' : '',
                  ].join(' ')}
                >
                  <Link
                    to={`/challenge/${n.challengeId}`}
                    onClick={() => setOpen(false)}
                    className="block"
                  >
                    <p className="font-display text-[10px] text-slate/40 uppercase tracking-wider mb-1">
                      {n.challengeName} · {formatTime(n.createdAt)}
                      {!n.read && (
                        <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-retro-red align-middle" />
                      )}
                    </p>
                    <p className="font-body text-slate text-xs leading-relaxed">{n.message}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="px-3 py-2 border-t border-slate/20 sticky bottom-0 bg-cream">
            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="font-display text-[10px] uppercase tracking-wider text-slate/50 hover:text-slate"
            >
              View all →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
