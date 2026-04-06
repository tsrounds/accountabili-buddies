import { useEffect, useState } from 'react'
import { Zap, PlusCircle, Users, Bell, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import { collectionGroup, query, where, getDocs, getDoc, doc, collection } from 'firebase/firestore'
import type { DocumentReference } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { fillTemplate, pickRandom, reminderTemplates } from '@/templates/roastTemplates'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'
import type { ComponentProps } from 'react'

type MascotMood = ComponentProps<typeof MascotZone>['mood']

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

// Delay classes for stagger animation
const STAGGER = ['animate-slide-up', 'animate-slide-up-1', 'animate-slide-up-2', 'animate-slide-up-3', 'animate-slide-up-4']

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

  const unCheckedActive = challenges.find(c => c.status === 'active' && !c.checkedInToday)
  const reminderMessage = unCheckedActive && currentUser
    ? fillTemplate(pickRandom(reminderTemplates), {
        recipientName: currentUser.firstName,
        goToExcuse: unCheckedActive.goToExcuse ?? 'I was too busy',
        biggestWeakness: 'procrastination',
      })
    : null

  const activeChallenges = challenges.filter(c => c.status === 'active')
  const allCheckedIn = activeChallenges.length > 0 && activeChallenges.every(c => c.checkedInToday)
  const allComplete  = challenges.length > 0 && challenges.every(c => c.status === 'complete')

  const mascotMood: MascotMood = loading
    ? 'idle'
    : allComplete
      ? 'celebrate'
      : allCheckedIn
        ? 'proud'
        : unCheckedActive
          ? 'lagging'
          : 'idle'

  // ── Loading skeletons ──
  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero pb-6 flex flex-col items-center gap-4">
          <div className="skeleton w-44 h-44 rounded-full" />
          <div className="skeleton w-56 h-8 rounded-xl" />
        </div>
        <ZoneDivider />
        <div className="zone-content space-y-3">
          <div className="skeleton h-20 rounded-2xl" />
          <div className="skeleton h-20 rounded-2xl" />
          <div className="skeleton h-20 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">

      {/* ── DARK HERO ZONE ── */}
      <div className="zone-hero pb-8 flex flex-col items-center gap-2">
        <MascotZone mood={mascotMood} />

        {/* Reminder nudge — inline in hero, not a separate banner */}
        {reminderMessage && !reminderDismissed && (
          <div className="mt-3 w-full max-w-xs bg-retro-red/15 border border-retro-red/30 rounded-2xl px-4 py-3 flex items-start gap-2 animate-slide-up">
            <Bell size={14} className="text-retro-red flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="font-body text-cream text-sm leading-relaxed">{reminderMessage}</p>
              <Link
                to={`/challenge/${unCheckedActive!.id}`}
                className="inline-block mt-1.5 font-display text-xs uppercase tracking-wider text-retro-red"
              >
                Log Check-In →
              </Link>
            </div>
            <button
              onClick={() => setReminderDismissed(true)}
              className="text-cream/30 hover:text-cream/60 text-sm flex-shrink-0 cursor-pointer"
              aria-label="Dismiss reminder"
            >
              ✕
            </button>
          </div>
        )}

        {/* Weekly Dispatch teaser */}
        {hasDispatch && (
          <Link
            to="/dispatch"
            className="mt-2 flex items-center gap-2 px-4 py-2.5 bg-cream/10 rounded-full border border-cream/15 animate-slide-up-1 cursor-pointer"
          >
            <Newspaper size={14} className="text-neon flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-display text-xs uppercase tracking-wider text-cream">
              Weekly Dispatch — Read Now →
            </span>
          </Link>
        )}
      </div>

      {/* ── BLOB DIVIDER ── */}
      <ZoneDivider />

      {/* ── LIGHT CONTENT ZONE ── */}
      <div className="zone-content">
        {challenges.length > 0 ? (
          <>
            <ul className="space-y-3">
              {challenges.map((c, i) => (
                <li key={c.id} className={STAGGER[Math.min(i, STAGGER.length - 1)]}>
                  <Link
                    to={`/challenge/${c.id}`}
                    className="block card-light cursor-pointer hover:bg-white/50 transition-colors duration-150"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-dark text-lg leading-snug">{c.name}</h3>
                        {c.personalGoal && (
                          <p className="font-body text-dark/60 text-sm mt-1 truncate leading-relaxed">
                            {c.personalGoal}
                          </p>
                        )}
                        <p className="font-body text-dark/40 text-xs mt-1 uppercase tracking-wider">
                          {durationLabel(c)} · {c.status}
                        </p>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-center gap-1 min-w-[40px]">
                        <Zap
                          size={24}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className={
                            c.status === 'active' && c.checkedInToday
                              ? 'text-neon'
                              : c.status === 'active'
                                ? 'text-dark/30'
                                : 'text-dark/15'
                          }
                          fill={c.status === 'active' && c.checkedInToday ? '#E7F53C' : 'none'}
                        />
                        <span className="font-display text-[10px] uppercase tracking-wide text-dark/40">
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

            <div className="flex gap-3 mt-5 animate-slide-up-4">
              <Link to="/create" className="btn-retro gap-2 flex-1 justify-center min-h-[44px]">
                <PlusCircle size={15} strokeWidth={1.8} aria-hidden="true" />
                New Mission
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3
                           bg-dark text-cream font-body text-base uppercase tracking-wider
                           rounded-full min-h-[44px] cursor-pointer
                           border-2 border-dark/20 transition-all duration-150 hover:bg-dark/80"
              >
                <Users size={15} strokeWidth={1.8} aria-hidden="true" />
                Join One
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-8 gap-5 animate-fade-in">
            <p className="font-display text-dark text-3xl uppercase leading-tight tracking-wide">
              No missions.<br />Bold choice.
            </p>
            <p className="font-body text-dark/60 text-base leading-relaxed max-w-xs">
              Create a challenge or join your crew — accountability starts here.
            </p>
            <div className="flex gap-3">
              <Link to="/create" className="btn-retro gap-2 min-h-[44px]">
                <PlusCircle size={15} strokeWidth={1.8} aria-hidden="true" />
                Create One
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-6 py-3
                           bg-dark text-cream font-body text-base uppercase tracking-wider
                           rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                           transition-all duration-150 hover:bg-dark/80"
              >
                <Users size={15} strokeWidth={1.8} aria-hidden="true" />
                Join One
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
