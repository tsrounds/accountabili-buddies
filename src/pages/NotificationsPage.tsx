import { useEffect, useState } from 'react'
import { Bell, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  writeBatch,
  doc,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'

interface Notif {
  id: string
  message: string
  challengeId: string
  challengeName: string
  read: boolean
  createdAt: Timestamp | null
}

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
  const diffDays = Math.floor(diffHrs / 24)
  return diffDays === 1 ? 'yesterday' : `${diffDays}d ago`
}

export default function NotificationsPage() {
  const { currentUser } = useAuth()
  const [notifs, setNotifs] = useState<Notif[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) return
    async function load() {
      try {
        const snap = await getDocs(
          query(
            collection(db, 'ab_notifications'),
            where('recipientUid', '==', currentUser!.uid),
            orderBy('createdAt', 'desc'),
          )
        )
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Notif))
        setNotifs(items)

        // Mark all unread as read
        const unread = items.filter(n => !n.read)
        if (unread.length > 0) {
          const batch = writeBatch(db)
          unread.forEach(n => batch.update(doc(db, 'ab_notifications', n.id), { read: true }))
          void batch.commit()
        }
      } catch (err) {
        console.error('Failed to load notifications', err)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [currentUser])

  return (
    <div className="flex flex-col">
      <div className="zone-hero-compact pb-4 flex flex-col items-center">
        <MascotZone mood="idle" size="sm" headline="YOUR DISPATCHES" />
      </div>
      <ZoneDivider />
      <div className="zone-content">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <p className="font-display text-dark/50 uppercase tracking-widest text-sm animate-pulse">
              Loading...
            </p>
          </div>
        ) : notifs.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12 space-y-2">
            <Bell size={28} className="text-dark/20" strokeWidth={1.5} />
            <p className="font-display text-dark/40 uppercase tracking-wider text-sm">
              No dispatches yet.
            </p>
            <p className="font-body text-dark/30 text-xs">
              Check in to a mission and your buddies will hear about it.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {notifs.map(n => (
              <li key={n.id}>
                <Link
                  to={`/challenge/${n.challengeId}`}
                  className={[
                    'block card-light hover:bg-white/50 transition-colors duration-150',
                    !n.read ? 'border-l-4 border-l-neon' : '',
                  ].join(' ')}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[10px] text-dark/40 uppercase tracking-wider mb-1">
                        {n.challengeName} · {formatTime(n.createdAt)}
                      </p>
                      <p className="font-body text-dark text-sm leading-relaxed">{n.message}</p>
                    </div>
                    <ArrowRight size={14} className="flex-shrink-0 text-dark/20 mt-1" strokeWidth={1.5} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
