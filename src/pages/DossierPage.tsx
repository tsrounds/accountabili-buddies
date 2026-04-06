import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
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
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'

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
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center gap-3">
          <div className="skeleton w-24 h-24 rounded-full" />
          <div className="skeleton w-48 h-6 rounded-xl" />
        </div>
        <ZoneDivider />
        <div className="zone-content space-y-3">
          <div className="skeleton h-20 rounded-2xl" />
          <div className="skeleton h-20 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center">
          <MascotZone mood="idle" size="sm" headline="SPILL THE BEANS" />
        </div>
        <ZoneDivider />
        <div className="zone-content">
          <div className="card-light text-center py-8">
            <p className="font-body text-retro-red text-sm">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (alreadyDone) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center">
          <MascotZone mood="proud" size="sm" headline="DOSSIER ON FILE" />
        </div>
        <ZoneDivider />
        <div className="zone-content flex flex-col items-center text-center space-y-4 py-4">
          <CheckCircle size={32} className="text-teal" strokeWidth={1.5} />
          <p className="font-body text-dark/50 text-sm">
            Your intel has been recorded.
          </p>
          <button
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80"
            onClick={() => navigate(`/challenge/${id}`)}
          >
            <ChevronRight size={15} strokeWidth={1.8} />
            Back to Mission
          </button>
        </div>
      </div>
    )
  }

  const hasBuddies = buddies.length > 0

  return (
    <div className="flex flex-col">
      <div className="zone-hero-compact pb-4 flex flex-col items-center">
        <MascotZone mood="idle" size="sm" headline="SPILL THE BEANS" />
        <p className="font-body text-cream/40 text-xs uppercase tracking-wider mt-1">
          Mission: {challengeName}
        </p>
      </div>
      <ZoneDivider />
      <div className="zone-content space-y-4">
        <p className="font-body text-dark/60 text-sm leading-relaxed">
          This intel will be used to keep your squad honest.{' '}
          <span className="font-semibold text-dark">Your buddies will see it.</span>
        </p>

        {submitError && (
          <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl flex items-center gap-2">
            <AlertCircle size={14} strokeWidth={2} />
            {submitError}
          </p>
        )}

        <form onSubmit={e => void handleSubmit(e)} className="space-y-4">

          {/* ── Section 1: Self-Intel ── */}
          <div className="space-y-3">
            <div>
              <p className="label-light">Your Self-Dossier</p>
              <p className="font-body text-dark/40 text-xs">
                Dirt on yourself — your buddies will use this.
              </p>
            </div>

            <div>
              <label htmlFor="goToExcuse" className="label-light">
                Your Go-To Excuse
              </label>
              <input
                id="goToExcuse"
                type="text"
                value={goToExcuse}
                onChange={e => setGoToExcuse(e.target.value)}
                placeholder='e.g. "I was too tired from work"'
                required
                className="input-light"
              />
            </div>

            <div>
              <label htmlFor="biggestWeakness" className="label-light">
                Biggest Weakness / Distraction
              </label>
              <input
                id="biggestWeakness"
                type="text"
                value={biggestWeakness}
                onChange={e => setBiggestWeakness(e.target.value)}
                placeholder='e.g. "Late-night Netflix binges"'
                required
                className="input-light"
              />
            </div>
          </div>

          {/* ── Section 2: Friend Intel ── */}
          {hasBuddies && (
            <div className="space-y-3 border-t border-dark/10 pt-4">
              <div>
                <p className="label-light">Intel on Your Buddies</p>
                <p className="font-body text-dark/40 text-xs">
                  One juicy fact per person — the more specific, the better.
                </p>
              </div>

              {buddies.map(buddy => (
                <div key={buddy.uid}>
                  <label htmlFor={`intel-${buddy.uid}`} className="label-light">
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
                    className="input-light"
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
      </div>
    </div>
  )
}
