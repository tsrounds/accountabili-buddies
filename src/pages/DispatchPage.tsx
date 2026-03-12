import { useEffect, useState } from 'react'
import { Newspaper, Trophy, Zap } from 'lucide-react'
import { collectionGroup, query, where, getDocs, collection, getDoc, doc } from 'firebase/firestore'
import type { DocumentReference, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

interface LeaderboardEntry {
  uid: string
  firstName: string
  totalCheckins: number
  weekCheckins: number
  weekDays: string[]
}

interface Dispatch {
  dispatchId: string
  weekId: string
  weekStart: string
  weekEnd: string
  challengeId: string
  challengeName: string
  generatedAt: Timestamp | null
  leaderboard: LeaderboardEntry[]
  totalMembers: number
}

function getWeekId(d: Date): string {
  const date = new Date(d)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCDate(date.getUTCDate() + 3 - ((date.getUTCDay() + 6) % 7))
  const week1 = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const weekNum =
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getUTCDay() + 6) % 7)) /
        7
    )
  return `${date.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`
}

function formatWeekRange(start: string, end: string): string {
  const s = new Date(start + 'T00:00:00Z')
  const e = new Date(end + 'T00:00:00Z')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[s.getUTCMonth()]} ${s.getUTCDate()} – ${months[e.getUTCMonth()]} ${e.getUTCDate()}, ${e.getUTCFullYear()}`
}

export default function DispatchPage() {
  const { currentUser } = useAuth()
  const [dispatches, setDispatches] = useState<Dispatch[]>([])
  const [loading, setLoading] = useState(true)
  const [weekId, setWeekId] = useState('')

  useEffect(() => {
    if (!currentUser) return
    const wid = getWeekId(new Date())
    setWeekId(wid)

    async function load() {
      try {
        // Get user's challenge IDs via collectionGroup
        const membershipsSnap = await getDocs(
          query(collectionGroup(db, 'members'), where('uid', '==', currentUser!.uid))
        )
        const challengeIds = membershipsSnap.docs.map((d) => {
          const ref = d.ref.parent.parent as DocumentReference
          return ref.id
        })

        if (challengeIds.length === 0) {
          setDispatches([])
          return
        }

        // Fetch dispatches for this week across all user's challenges
        // Firestore 'in' operator supports up to 30 values
        const chunks: string[][] = []
        for (let i = 0; i < challengeIds.length; i += 30) {
          chunks.push(challengeIds.slice(i, i + 30))
        }

        const allDispatches: Dispatch[] = []
        for (const chunk of chunks) {
          const snap = await getDocs(
            query(
              collection(db, 'ab_dispatches'),
              where('weekId', '==', wid),
              where('challengeId', 'in', chunk)
            )
          )
          snap.docs.forEach((d) => allDispatches.push({ dispatchId: d.id, ...d.data() } as Dispatch))
        }

        // Also check previous week if current week has no dispatches yet
        if (allDispatches.length === 0) {
          const prevWeekDate = new Date()
          prevWeekDate.setUTCDate(prevWeekDate.getUTCDate() - 7)
          const prevWeekId = getWeekId(prevWeekDate)

          for (const chunk of chunks) {
            const snap = await getDocs(
              query(
                collection(db, 'ab_dispatches'),
                where('weekId', '==', prevWeekId),
                where('challengeId', 'in', chunk)
              )
            )
            snap.docs.forEach((d) => allDispatches.push({ dispatchId: d.id, ...d.data() } as Dispatch))
          }

          if (allDispatches.length > 0) {
            setWeekId(prevWeekId)
          }
        }

        // Enrich leaderboard entries: fetch challenge details for any missing names
        for (const dispatch of allDispatches) {
          for (const entry of dispatch.leaderboard) {
            if (!entry.firstName) {
              const userSnap = await getDoc(doc(db, 'ab_users', entry.uid))
              if (userSnap.exists()) {
                entry.firstName = userSnap.data().firstName ?? 'Recruit'
              }
            }
          }
        }

        setDispatches(allDispatches)
      } catch (err) {
        console.error('Failed to load dispatches', err)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [currentUser])

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-slate pb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Newspaper size={18} className="text-mustard" strokeWidth={1.5} />
          <p className="font-display text-[10px] text-slate/40 uppercase tracking-[0.2em]">
            Official Intelligence Report
          </p>
          <Newspaper size={18} className="text-mustard" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-3xl text-slate uppercase tracking-widest leading-none">
          Weekly Dispatch
        </h2>
        {weekId && (
          <p className="font-body text-slate/40 text-xs mt-1 uppercase tracking-wider">
            {weekId}
          </p>
        )}
        <div className="mt-3 border-t border-b border-slate/20 py-1">
          <p className="font-body text-[10px] text-slate/30 uppercase tracking-widest">
            All field reports. All missions. No excuses.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <p className="font-display text-slate/50 uppercase tracking-widest text-sm animate-pulse">
            Decrypting...
          </p>
        </div>
      ) : dispatches.length === 0 ? (
        <div className="card-retro text-center py-12 space-y-3">
          <Newspaper size={32} className="mx-auto text-slate/20" strokeWidth={1.5} />
          <p className="font-display text-slate/40 uppercase tracking-wider text-sm">
            No dispatches yet.
          </p>
          <p className="font-body text-slate/30 text-xs max-w-xs mx-auto">
            Dispatches are generated Sunday evening. Check back after your first full week of missions.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {dispatches.map((dispatch) => {
            const myEntry = dispatch.leaderboard.find((e) => e.uid === currentUser?.uid)
            const myRank = dispatch.leaderboard.findIndex((e) => e.uid === currentUser?.uid) + 1
            const leader = dispatch.leaderboard[0]

            return (
              <article key={dispatch.dispatchId} className="space-y-3">
                {/* Mission header */}
                <div className="border-b-2 border-slate/30 pb-2">
                  <p className="font-display text-[9px] text-slate/30 uppercase tracking-widest">
                    Mission Report
                  </p>
                  <h3 className="font-display text-xl text-slate uppercase tracking-wide leading-tight">
                    {dispatch.challengeName}
                  </h3>
                  {dispatch.weekStart && dispatch.weekEnd && (
                    <p className="font-body text-[10px] text-slate/40 mt-0.5">
                      {formatWeekRange(dispatch.weekStart, dispatch.weekEnd)}
                    </p>
                  )}
                </div>

                {/* My standing */}
                {myEntry && (
                  <div className="bg-mustard/10 border border-mustard/30 px-3 py-2">
                    <p className="font-display text-[9px] text-slate/40 uppercase tracking-widest mb-1">
                      Your Standing
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-display text-slate text-base">
                          #{myRank} of {dispatch.totalMembers}
                        </span>
                        <span className="font-body text-slate/50 text-xs ml-2">
                          {myEntry.weekCheckins > 0
                            ? `${myEntry.weekCheckins} check-in${myEntry.weekCheckins !== 1 ? 's' : ''} this week`
                            : 'No check-ins this week'}
                        </span>
                      </div>
                      <Trophy
                        size={18}
                        strokeWidth={1.5}
                        className={myRank === 1 ? 'text-mustard' : 'text-slate/20'}
                        fill={myRank === 1 ? '#D4A017' : 'none'}
                      />
                    </div>
                    {myRank > 1 && leader && (
                      <p className="font-body text-xs text-slate/40 mt-1">
                        {leader.firstName} leads with {leader.totalCheckins} total.{' '}
                        {myEntry.totalCheckins < leader.totalCheckins
                          ? `You're ${leader.totalCheckins - myEntry.totalCheckins} behind.`
                          : ''}
                      </p>
                    )}
                  </div>
                )}

                {/* Full leaderboard */}
                <div className="card-retro p-0 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate/10 bg-slate/5">
                    <p className="font-display text-[9px] text-slate/40 uppercase tracking-widest">
                      Full Rankings
                    </p>
                  </div>
                  <ul className="divide-y divide-slate/5">
                    {dispatch.leaderboard.map((entry, idx) => (
                      <li
                        key={entry.uid}
                        className={[
                          'flex items-center gap-3 px-3 py-2.5',
                          entry.uid === currentUser?.uid ? 'bg-mustard/5' : '',
                        ].join(' ')}
                      >
                        <span className="font-display text-xs text-slate/30 w-5 text-right flex-shrink-0">
                          {idx + 1}
                        </span>
                        <Zap
                          size={14}
                          strokeWidth={1.5}
                          className={entry.weekCheckins > 0 ? 'text-mustard flex-shrink-0' : 'text-slate/20 flex-shrink-0'}
                          fill={entry.weekCheckins > 0 ? '#D4A017' : 'none'}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-display text-slate text-sm">
                            {entry.firstName}
                            {entry.uid === currentUser?.uid && (
                              <span className="ml-1 font-body text-[9px] text-mustard uppercase tracking-wider">
                                (you)
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-display text-slate text-sm">
                            {entry.totalCheckins}
                          </span>
                          <span className="font-body text-slate/30 text-[10px] ml-1">total</span>
                          {entry.weekCheckins > 0 && (
                            <span className="block font-body text-[9px] text-mustard">
                              +{entry.weekCheckins} this week
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
