import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, Zap, AlertCircle, ArrowLeft } from 'lucide-react'
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
      <div className="flex items-center justify-center py-20">
        <p className="font-display text-slate/50 uppercase tracking-widest text-sm animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  // ── Already checked in ────────────────────────────────────────────────────

  if (alreadyDone) {
    return (
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Zap size={22} className="text-mustard" strokeWidth={1.5} fill="#D4A017" />
          <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
            Check-In
          </h2>
        </div>
        <div className="card-retro text-center py-10 space-y-3">
          <CheckCircle size={36} className="mx-auto text-olive" strokeWidth={1.5} />
          <p className="font-display text-slate uppercase tracking-wider text-sm">
            Already Logged Today
          </p>
          <p className="font-body text-slate/50 text-xs">
            Come back tomorrow, soldier.
          </p>
          <button
            className="btn-outline gap-2 mt-2"
            onClick={() => navigate(`/challenge/${id}`)}
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back to Mission
          </button>
        </div>
      </section>
    )
  }

  // ── Check-in form ─────────────────────────────────────────────────────────

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <Zap size={22} className="text-mustard" strokeWidth={1.5} />
        <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
          Check-In
        </h2>
      </div>

      <div className="card-retro py-3">
        <p className="font-display text-xs text-slate/40 uppercase tracking-wider">
          {challengeName}
        </p>
        {personalGoal && (
          <p className="font-body text-slate text-sm mt-1">{personalGoal}</p>
        )}
        <p className="font-body text-slate/40 text-xs mt-1">{today}</p>
      </div>

      {error && (
        <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 flex items-center gap-2">
          <AlertCircle size={14} strokeWidth={2} />
          {error}
        </p>
      )}

      <form onSubmit={e => void handleSubmit(e)} className="card-retro space-y-4">
        <div>
          <label htmlFor="note" className="label-retro">
            Note (optional)
          </label>
          <textarea
            id="note"
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="What did you do? Any victories or struggles to report..."
            className="input-retro resize-none"
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
          className="btn-outline w-full gap-2"
          onClick={() => navigate(`/challenge/${id}`)}
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          Cancel
        </button>
      </form>
    </section>
  )
}
