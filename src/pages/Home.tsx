import { useEffect, useState } from 'react'
import { Trophy, Zap, PlusCircle, Users, Bell, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import { collectionGroup, query, where, getDocs, getDoc, doc, collection } from 'firebase/firestore'
import type { DocumentReference } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { fillTemplate, pickRandom, reminderTemplates } from '@/templates/roastTemplates'

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

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

interface ChallengeRow {
  id: string
  name: string
  status: 'lobby' | 'active' | 'complete'
  durationType: 'fixed' | 'ongoing'
  duration: number | null
  personalGoal: string
  checkedInToday: boolean
  goToExcuse?: string
}

export default function Home() {
  const { currentUser } = useAuth()
  const [challenges, setChallenges] = useState<ChallengeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [reminderDismissed, setReminderDismissed] = useState(false)
  const [hasDispatch, setHasDispatch] = useState(false)

  const today = todayStr()

  useEffect(() => {
    if (!currentUser) return
    async function load() {
      try {
        const membershipsSnap = await getDocs(
          query(collectionGroup(db, 'members'), where('uid', '==', currentUser!.uid))
        )
        const challengeIds = membershipsSnap.docs.map((memberDoc) => {
          const ref = memberDoc.ref.parent.parent as DocumentReference
          return ref.id
        })
        const rows = await Promise.all(
          membershipsSnap.docs.map(async (memberDoc) => {
            const challengeRef = memberDoc.ref.parent.parent as DocumentReference
            const [challengeSnap, lbSnap, dossierSnap] = await Promise.all([
              getDoc(challengeRef),
              getDoc(doc(db, challengeRef.path, 'leaderboard', currentUser!.uid)),
              getDoc(doc(db, challengeRef.path, 'dossiers', currentUser!.uid)),
            ])
            if (!challengeSnap.exists()) return null
            const d = challengeSnap.data()
            const lbEntry = lbSnap.exists() ? lbSnap.data() : null
            const dossier = dossierSnap.exists() ? dossierSnap.data() : null
            return {
              id: challengeSnap.id,
              name: d.name as string,
              status: d.status as ChallengeRow['status'],
              durationType: d.durationType as ChallengeRow['durationType'],
              duration: d.duration as number | null,
              personalGoal: (memberDoc.data().personalGoal as string) ?? '',
              checkedInToday: lbEntry?.lastCheckinDate === today,
              goToExcuse: (dossier?.goToExcuse as string | undefined),
            } as ChallengeRow
          })
        )
        setChallenges(rows.filter((r): r is NonNullable<typeof rows[number]> => r !== null))

        // Check if a weekly dispatch exists for this week
        if (challengeIds.length > 0) {
          const weekId = getWeekId(new Date())
          const dispSnap = await getDocs(
            query(
              collection(db, 'ab_dispatches'),
              where('weekId', '==', weekId),
              where('challengeId', 'in', challengeIds.slice(0, 30))
            )
          )
          setHasDispatch(!dispSnap.empty)
        }
      } catch (err) {
        console.error('Failed to load missions', err)
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [currentUser, today])

  const durationLabel = (c: ChallengeRow) =>
    c.durationType === 'ongoing' ? 'Ongoing' : `${c.duration}d`

  // Find first active challenge not yet checked in — for reminder banner
  const unCheckedActive = challenges.find(c => c.status === 'active' && !c.checkedInToday)
  const reminderMessage = unCheckedActive && currentUser
    ? fillTemplate(pickRandom(reminderTemplates), {
        recipientName: currentUser.firstName,
        goToExcuse: unCheckedActive.goToExcuse ?? 'I was too busy',
        biggestWeakness: 'procrastination',
      })
    : null

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="card-retro text-center py-6">
          <Trophy size={40} className="mx-auto text-mustard mb-2" strokeWidth={1.5} />
          <h2 className="font-display text-2xl text-slate uppercase tracking-wide">Your Missions</h2>
          <p className="font-body text-slate/40 mt-2 text-xs animate-pulse uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-6">

      {/* ── Reminder banner ── */}
      {reminderMessage && !reminderDismissed && (
        <div className="border-2 border-retro-red bg-retro-red/5 p-3 flex items-start gap-3">
          <Bell size={16} className="text-retro-red flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="font-body text-slate text-xs leading-relaxed">{reminderMessage}</p>
            <Link
              to={`/challenge/${unCheckedActive!.id}/checkin`}
              className="inline-block mt-2 font-display text-[10px] uppercase tracking-wider text-retro-red underline"
            >
              Log Check-In →
            </Link>
          </div>
          <button
            onClick={() => setReminderDismissed(true)}
            className="font-display text-slate/30 text-xs hover:text-slate/60 flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Hero ── */}
      <div className="card-retro text-center py-6">
        <Trophy size={40} className="mx-auto text-mustard mb-2" strokeWidth={1.5} />
        <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
          Your Missions
        </h2>
        <p className="font-body text-slate/60 mt-1 text-sm">
          Stay the course — your buddies are watching.
        </p>
      </div>

      {/* ── Weekly Dispatch teaser ── */}
      {hasDispatch && (
        <Link
          to="/dispatch"
          className="block card-retro hover:border-mustard transition-colors duration-150"
        >
          <div className="flex items-center gap-3">
            <Newspaper size={20} className="text-mustard flex-shrink-0" strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <p className="font-display text-[9px] text-slate/40 uppercase tracking-widest">
                New This Week
              </p>
              <p className="font-display text-slate text-sm leading-snug">Weekly Dispatch</p>
              <p className="font-body text-slate/40 text-xs mt-0.5">
                Field reports, rankings, and intel from the front.
              </p>
            </div>
            <span className="font-display text-[10px] uppercase tracking-wider text-mustard flex-shrink-0">
              Read →
            </span>
          </div>
        </Link>
      )}

      {/* ── Challenge cards ── */}
      {challenges.length > 0 ? (
        <>
          <ul className="space-y-3">
            {challenges.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/challenge/${c.id}`}
                  className="block card-retro hover:border-mustard transition-colors duration-150"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-slate text-base leading-snug">{c.name}</h3>
                      {c.personalGoal && (
                        <p className="font-body text-slate/50 text-xs mt-1 truncate">{c.personalGoal}</p>
                      )}
                      <p className="font-body text-slate/40 text-xs mt-0.5">
                        {durationLabel(c)} · {c.status}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                      <Zap
                        size={22}
                        strokeWidth={1.5}
                        className={
                          c.status === 'active' && c.checkedInToday
                            ? 'text-mustard'
                            : c.status === 'active'
                              ? 'text-slate/30'
                              : 'text-slate/15'
                        }
                        fill={c.status === 'active' && c.checkedInToday ? '#E7F53C' : 'none'}
                      />
                      <span className="font-display text-[9px] uppercase tracking-wide text-slate/40">
                        {c.status === 'active'
                          ? c.checkedInToday ? 'Done' : 'To-do'
                          : c.status}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Link to="/create" className="btn-retro gap-2 flex-1 justify-center">
              <PlusCircle size={15} strokeWidth={1.8} />
              New Mission
            </Link>
            <Link to="/join" className="btn-outline gap-2 flex-1 justify-center">
              <Users size={15} strokeWidth={1.8} />
              Join One
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12 space-y-4">
          <p className="font-display text-slate/40 uppercase tracking-wider text-sm">
            No missions yet, recruit.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/create" className="btn-retro gap-2">
              <PlusCircle size={15} strokeWidth={1.8} />
              Create One
            </Link>
            <Link to="/join" className="btn-outline gap-2">
              <Users size={15} strokeWidth={1.8} />
              Join One
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
