import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { sendCheckinBlast } from '@/lib/notifications'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

interface OtherMember {
  uid: string
  firstName: string
  personalGoal: string
  goToExcuse?: string
  biggestWeakness?: string
}

export default function CheckInPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [alreadyDone, setAlreadyDone] = useState(false)
  const [challengeName, setChallengeName] = useState('')
  const [personalGoal, setPersonalGoal] = useState('')
  const [otherMembers, setOtherMembers] = useState<OtherMember[]>([])
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const today = todayStr()

  useEffect(() => {
    if (!id || !currentUser) return
    async function load() {
      try {
        const [challengeSnap, checkinSnap, memberSnap, membersSnap] = await Promise.all([
          getDoc(doc(db, 'ab_challenges', id!)),
          getDoc(doc(db, 'ab_challenges', id!, 'checkins', `${currentUser!.uid}_${today}`)),
          getDoc(doc(db, 'ab_challenges', id!, 'members', currentUser!.uid)),
          getDocs(collection(db, 'ab_challenges', id!, 'members')),
        ])

        if (challengeSnap.exists()) {
          setChallengeName(challengeSnap.data().name as string)
        }
        if (memberSnap.exists()) {
          setPersonalGoal((memberSnap.data().personalGoal as string) ?? '')
        }
        if (checkinSnap.exists()) {
          setAlreadyDone(true)
          return
        }

        // Load other members + their dossier data for roast templates
        const others = membersSnap.docs.filter(d => d.id !== currentUser!.uid)
        const otherData = await Promise.all(
          others.map(async d => {
            const dossierSnap = await getDoc(
              doc(db, 'ab_challenges', id!, 'dossiers', d.id)
            )
            const dossier = dossierSnap.exists() ? dossierSnap.data() : null
            return {
              uid: d.id,
              firstName: d.data().firstName as string,
              personalGoal: d.data().personalGoal as string,
              goToExcuse: dossier?.goToExcuse as string | undefined,
              biggestWeakness: dossier?.biggestWeakness as string | undefined,
            }
          })
        )
        setOtherMembers(otherData)
      } catch {
        setError('Failed to load check-in data.')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [id, currentUser, today])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!id || !currentUser) return
    setError(null)
    setSubmitting(true)
    try {
      const checkinRef = doc(db, 'ab_challenges', id, 'checkins', `${currentUser.uid}_${today}`)
      const leaderboardRef = doc(db, 'ab_challenges', id, 'leaderboard', currentUser.uid)

      await setDoc(checkinRef, {
        uid: currentUser.uid,
        firstName: currentUser.firstName,
        date: today,
        note: note.trim(),
        createdAt: serverTimestamp(),
      })

      const lbSnap = await getDoc(leaderboardRef)
      if (lbSnap.exists()) {
        await updateDoc(leaderboardRef, {
          totalCheckins: increment(1),
          lastCheckinDate: today,
        })
      } else {
        await setDoc(leaderboardRef, {
          uid: currentUser.uid,
          firstName: currentUser.firstName,
          totalCheckins: 1,
          lastCheckinDate: today,
        })
      }

      // Fire check-in blast notifications to other members (non-blocking)
      if (otherMembers.length > 0) {
        void sendCheckinBlast({
          checkinUid: currentUser.uid,
          checkinName: currentUser.firstName,
          checkinGoal: personalGoal || 'their mission goal',
          challengeId: id,
          challengeName,
          otherMembers,
        })
      }

      navigate(`/challenge/${id}`, { replace: true })
    } catch {
      setError('Failed to log check-in. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center gap-3">
          <div className="skeleton w-24 h-24 rounded-full" />
          <div className="skeleton w-48 h-6 rounded-xl" />
        </div>
        <ZoneDivider />
        <div className="zone-content space-y-3">
          <div className="skeleton h-20 rounded-2xl" />
          <div className="skeleton h-12 rounded-full" />
        </div>
      </div>
    )
  }

  // ── Already checked in ────────────────────────────────────────────────────

  if (alreadyDone) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center">
          <MascotZone mood="proud" size="sm" headline="MISSION LOGGED" />
        </div>
        <ZoneDivider />
        <div className="zone-content flex flex-col items-center text-center space-y-4 py-4">
          <CheckCircle size={36} className="text-teal" strokeWidth={1.5} />
          <p className="font-body text-dark/50 text-sm">
            Come back tomorrow, soldier.
          </p>
          <button
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80"
            onClick={() => navigate(`/challenge/${id}`)}
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back to Mission
          </button>
        </div>
      </div>
    )
  }

  // ── Check-in form ─────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col">
      <div className="zone-hero-compact pb-4 flex flex-col items-center">
        <MascotZone mood="lagging" size="sm" headline="TIME TO SHOW UP" />
        {challengeName && (
          <p className="font-body text-cream/50 text-sm mt-1">{challengeName}</p>
        )}
        {personalGoal && (
          <p className="font-body text-cream/30 text-xs mt-0.5">{personalGoal}</p>
        )}
      </div>
      <ZoneDivider />
      <div className="zone-content space-y-4">
        {error && (
          <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl flex items-center gap-2">
            <AlertCircle size={14} strokeWidth={2} />
            {error}
          </p>
        )}

        <form onSubmit={e => void handleSubmit(e)} className="space-y-4">
          <div>
            <label htmlFor="note" className="label-light">
              Note (optional)
            </label>
            <textarea
              id="note"
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="What did you do? Any victories or struggles to report..."
              className="input-light resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle size={15} strokeWidth={2} />
            {submitting ? 'Logging...' : 'Log Check-In'}
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80"
            onClick={() => navigate(`/challenge/${id}`)}
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
