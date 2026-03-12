import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FileText, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

interface Buddy {
  uid: string
  firstName: string
}

export default function DossierPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [challengeName, setChallengeName] = useState('')
  const [buddies, setBuddies] = useState<Buddy[]>([])
  const [alreadyDone, setAlreadyDone] = useState(false)

  // Self-dossier fields
  const [goToExcuse, setGoToExcuse] = useState('')
  const [biggestWeakness, setBiggestWeakness] = useState('')

  // Friend intel: keyed by uid
  const [friendIntel, setFriendIntel] = useState<Record<string, string>>({})

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (!id || !currentUser) return
    async function load() {
      try {
        const [challengeSnap, membersSnap] = await Promise.all([
          getDoc(doc(db, 'ab_challenges', id!)),
          getDocs(collection(db, 'ab_challenges', id!, 'members')),
        ])
        if (!challengeSnap.exists()) {
          setError('Mission not found.')
          return
        }
        setChallengeName(challengeSnap.data().name as string)

        const myMember = membersSnap.docs.find(d => d.id === currentUser!.uid)
        if (myMember?.data().dossierComplete) {
          setAlreadyDone(true)
          return
        }

        const otherMembers = membersSnap.docs
          .filter(d => d.id !== currentUser!.uid)
          .map(d => ({ uid: d.id, firstName: d.data().firstName as string }))
        setBuddies(otherMembers)
        const intelInit: Record<string, string> = {}
        otherMembers.forEach(b => { intelInit[b.uid] = '' })
        setFriendIntel(intelInit)
      } catch {
        setError('Failed to load mission data.')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [id, currentUser])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!id || !currentUser) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      // Write dossier doc
      await setDoc(doc(db, 'ab_challenges', id, 'dossiers', currentUser.uid), {
        uid: currentUser.uid,
        firstName: currentUser.firstName,
        goToExcuse: goToExcuse.trim(),
        biggestWeakness: biggestWeakness.trim(),
        friendIntel: Object.fromEntries(
          Object.entries(friendIntel).map(([uid, val]) => [uid, val.trim()])
        ),
        completedAt: serverTimestamp(),
      })

      // Mark member flags
      await updateDoc(
        doc(db, 'ab_challenges', id, 'members', currentUser.uid),
        { dossierComplete: true, friendIntelComplete: true }
      )

      navigate(`/challenge/${id}`, { replace: true })
    } catch {
      setSubmitError('Failed to save dossier. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── States ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-display text-slate/50 uppercase tracking-widest text-sm animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-retro text-center py-8">
        <p className="font-body text-retro-red text-sm">{error}</p>
      </div>
    )
  }

  if (alreadyDone) {
    return (
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-mustard" strokeWidth={1.5} />
          <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
            Roast Dossier
          </h2>
        </div>
        <div className="card-retro text-center py-10 space-y-3">
          <CheckCircle size={32} className="mx-auto text-olive" strokeWidth={1.5} />
          <p className="font-display text-slate uppercase tracking-wider text-sm">
            Dossier Filed
          </p>
          <p className="font-body text-slate/50 text-xs">
            Your intel has been recorded.
          </p>
          <button
            className="btn-outline gap-2 mt-2"
            onClick={() => navigate(`/challenge/${id}`)}
          >
            <ChevronRight size={15} strokeWidth={1.8} />
            Back to Mission
          </button>
        </div>
      </section>
    )
  }

  const hasBuddies = buddies.length > 0

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <FileText size={22} className="text-mustard" strokeWidth={1.5} />
        <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
          Roast Dossier
        </h2>
      </div>

      <div className="card-retro py-3">
        <p className="font-body text-slate/60 text-sm leading-relaxed">
          This intel will be used to keep your squad honest.{' '}
          <span className="font-semibold text-slate">Your buddies will see it.</span>
        </p>
        <p className="font-display text-xs text-slate/40 uppercase tracking-wider mt-1">
          Mission: {challengeName}
        </p>
      </div>

      {submitError && (
        <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 flex items-center gap-2">
          <AlertCircle size={14} strokeWidth={2} />
          {submitError}
        </p>
      )}

      <form onSubmit={e => void handleSubmit(e)} className="space-y-5">

        {/* ── Section 1: Self-Intel ── */}
        <div className="card-retro space-y-4">
          <div className="border-b border-slate/20 pb-2">
            <p className="font-display text-xs text-slate uppercase tracking-wider">
              Your Self-Dossier
            </p>
            <p className="font-body text-slate/40 text-xs mt-0.5">
              Dirt on yourself — your buddies will use this.
            </p>
          </div>

          <div>
            <label htmlFor="goToExcuse" className="label-retro">
              Your Go-To Excuse
            </label>
            <input
              id="goToExcuse"
              type="text"
              value={goToExcuse}
              onChange={e => setGoToExcuse(e.target.value)}
              placeholder='e.g. "I was too tired from work"'
              required
              className="input-retro"
            />
          </div>

          <div>
            <label htmlFor="biggestWeakness" className="label-retro">
              Biggest Weakness / Distraction
            </label>
            <input
              id="biggestWeakness"
              type="text"
              value={biggestWeakness}
              onChange={e => setBiggestWeakness(e.target.value)}
              placeholder='e.g. "Late-night Netflix binges"'
              required
              className="input-retro"
            />
          </div>
        </div>

        {/* ── Section 2: Friend Intel ── */}
        {hasBuddies && (
          <div className="card-retro space-y-4">
            <div className="border-b border-slate/20 pb-2">
              <p className="font-display text-xs text-slate uppercase tracking-wider">
                Intel on Your Buddies
              </p>
              <p className="font-body text-slate/40 text-xs mt-0.5">
                One juicy fact per person — the more specific, the better.
              </p>
            </div>

            {buddies.map(buddy => (
              <div key={buddy.uid}>
                <label htmlFor={`intel-${buddy.uid}`} className="label-retro">
                  {buddy.firstName}
                </label>
                <input
                  id={`intel-${buddy.uid}`}
                  type="text"
                  value={friendIntel[buddy.uid] ?? ''}
                  onChange={e =>
                    setFriendIntel(prev => ({ ...prev, [buddy.uid]: e.target.value }))
                  }
                  placeholder={`Something embarrassing about ${buddy.firstName}...`}
                  required
                  className="input-retro"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Filing Dossier...' : (
            <>File Dossier <ChevronRight size={15} strokeWidth={2} /></>
          )}
        </button>
      </form>
    </section>
  )
}
