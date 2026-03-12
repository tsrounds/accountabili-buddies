import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Users, FileText, ArrowRight, AlertCircle } from 'lucide-react'
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

interface ChallengeData {
  challengeId: string
  name: string
  creatorFirstName: string
  duration: number | null
  durationType: 'fixed' | 'ongoing'
  proofType: 'honor' | 'photo'
  description: string
  memberCount: number
}

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'found'; challenge: ChallengeData }
  | { status: 'not_found' }
  | { status: 'error'; message: string }
  | { status: 'already_member'; challengeId: string }

export default function JoinChallenge() {
  const { code: codeParam } = useParams<{ code?: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const [codeInput, setCodeInput] = useState(codeParam?.toUpperCase() ?? '')
  const [lookup, setLookup] = useState<LookupState>({ status: 'idle' })
  const [personalGoal, setPersonalGoal] = useState('')
  const [targetFrequency, setTargetFrequency] = useState('1')
  const [frequencyPeriod, setFrequencyPeriod] = useState<'per_day' | 'per_week' | 'per_month'>('per_week')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function lookupCode(code: string) {
    setLookup({ status: 'loading' })
    try {
      const inviteSnap = await getDoc(doc(db, 'ab_invites', code.toUpperCase()))
      if (!inviteSnap.exists()) {
        setLookup({ status: 'not_found' })
        return
      }
      const { challengeId } = inviteSnap.data() as { challengeId: string }

      // Check if already a member
      if (currentUser) {
        const memberSnap = await getDoc(
          doc(db, 'ab_challenges', challengeId, 'members', currentUser.uid)
        )
        if (memberSnap.exists()) {
          setLookup({ status: 'already_member', challengeId })
          return
        }
      }

      const [challengeSnap, membersSnap] = await Promise.all([
        getDoc(doc(db, 'ab_challenges', challengeId)),
        getDocs(collection(db, 'ab_challenges', challengeId, 'members')),
      ])
      if (!challengeSnap.exists()) {
        setLookup({ status: 'not_found' })
        return
      }
      const data = challengeSnap.data()
      setLookup({
        status: 'found',
        challenge: {
          challengeId,
          name: data.name as string,
          creatorFirstName: data.creatorFirstName as string,
          duration: data.duration as number | null,
          durationType: data.durationType as 'fixed' | 'ongoing',
          proofType: data.proofType as 'honor' | 'photo',
          description: data.description as string,
          memberCount: membersSnap.size,
        },
      })
    } catch {
      setLookup({ status: 'error', message: 'Failed to look up invite code. Try again.' })
    }
  }

  useEffect(() => {
    if (codeParam) void lookupCode(codeParam)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeParam])

  function handleCodeSubmit(e: FormEvent) {
    e.preventDefault()
    if (codeInput.length === 6) void lookupCode(codeInput)
  }

  async function handleJoinSubmit(e: FormEvent) {
    e.preventDefault()
    if (lookup.status !== 'found' || !currentUser) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      await setDoc(
        doc(db, 'ab_challenges', lookup.challenge.challengeId, 'members', currentUser.uid),
        {
          uid: currentUser.uid,
          firstName: currentUser.firstName,
          personalGoal: personalGoal.trim(),
          targetFrequency: parseInt(targetFrequency, 10),
          frequencyPeriod,
          joinedAt: serverTimestamp(),
          dossierComplete: false,
          friendIntelComplete: false,
        }
      )
      navigate(`/challenge/${lookup.challenge.challengeId}`, { replace: true })
    } catch {
      setSubmitError('Failed to join mission. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Already a member ─────────────────────────────────────────────────────
  if (lookup.status === 'already_member') {
    return (
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Users size={22} className="text-mustard" strokeWidth={1.5} />
          <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
            Join a Mission
          </h2>
        </div>
        <div className="card-retro text-center space-y-4 py-8">
          <p className="font-body text-slate/70 text-sm">
            You're already enlisted in this mission.
          </p>
          <button
            className="btn-retro gap-2"
            onClick={() => navigate(`/challenge/${lookup.challengeId}`)}
          >
            <ArrowRight size={16} strokeWidth={1.8} />
            View Mission
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <Users size={22} className="text-mustard" strokeWidth={1.5} />
        <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
          Join a Mission
        </h2>
      </div>

      {/* Code input — shown until a valid code is found */}
      {lookup.status !== 'found' && (
        <div className="card-retro space-y-4">
          <p className="font-body text-slate/60 text-sm leading-relaxed">
            Got an invite code from a buddy? Enter it below to view the challenge briefing.
          </p>
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="inviteCode" className="label-retro">Invite Code</label>
              <input
                id="inviteCode"
                type="text"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase())}
                placeholder="e.g. AB1X4Z"
                required
                maxLength={6}
                className="input-retro uppercase tracking-[0.3em] text-center text-lg"
              />
            </div>

            {lookup.status === 'not_found' && (
              <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 flex items-center gap-2">
                <AlertCircle size={14} strokeWidth={2} />
                Invite code not found. Check the code and try again.
              </p>
            )}
            {lookup.status === 'error' && (
              <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 flex items-center gap-2">
                <AlertCircle size={14} strokeWidth={2} />
                {lookup.message}
              </p>
            )}

            <button
              type="submit"
              disabled={codeInput.length !== 6 || lookup.status === 'loading'}
              className="btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {lookup.status === 'loading' ? 'Looking up...' : 'Look Up Challenge'}
            </button>
          </form>
        </div>
      )}

      {/* Challenge briefing + goal form */}
      {lookup.status === 'found' && (
        <>
          {/* Briefing card */}
          <div className="card-retro space-y-3">
            <div className="flex items-center gap-2 border-b border-slate/20 pb-3">
              <FileText size={16} className="text-mustard" strokeWidth={1.8} />
              <span className="font-display text-xs text-slate uppercase tracking-wider">
                Mission Briefing
              </span>
            </div>
            <h3 className="font-display text-xl text-slate uppercase leading-tight">
              {lookup.challenge.name}
            </h3>
            {lookup.challenge.description && (
              <p className="font-body text-slate/60 text-sm leading-relaxed">
                {lookup.challenge.description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1">
              <div>
                <p className="label-retro">Commander</p>
                <p className="font-body text-slate text-sm">{lookup.challenge.creatorFirstName}</p>
              </div>
              <div>
                <p className="label-retro">Duration</p>
                <p className="font-body text-slate text-sm">
                  {lookup.challenge.durationType === 'ongoing'
                    ? 'Ongoing'
                    : `${lookup.challenge.duration} days`}
                </p>
              </div>
              <div>
                <p className="label-retro">Proof</p>
                <p className="font-body text-slate text-sm">
                  {lookup.challenge.proofType === 'honor' ? 'Honor System' : 'Photo Required'}
                </p>
              </div>
              <div>
                <p className="label-retro">Recruits</p>
                <p className="font-body text-slate text-sm">{lookup.challenge.memberCount}</p>
              </div>
            </div>
          </div>

          {/* Goal-setting form */}
          <form onSubmit={e => void handleJoinSubmit(e)} className="card-retro space-y-4">
            <div className="flex items-center gap-2 border-b border-slate/20 pb-3">
              <ArrowRight size={16} className="text-mustard" strokeWidth={1.8} />
              <span className="font-display text-xs text-slate uppercase tracking-wider">
                Set Your Mission
              </span>
            </div>

            {submitError && (
              <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2">
                {submitError}
              </p>
            )}

            <div>
              <label htmlFor="personalGoal" className="label-retro">Your Goal</label>
              <input
                id="personalGoal"
                type="text"
                value={personalGoal}
                onChange={e => setPersonalGoal(e.target.value)}
                placeholder="e.g. Run 3 times per week"
                required
                autoFocus
                className="input-retro"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="targetFrequency" className="label-retro">Target</label>
                <input
                  id="targetFrequency"
                  type="number"
                  min="1"
                  max="99"
                  value={targetFrequency}
                  onChange={e => setTargetFrequency(e.target.value)}
                  required
                  className="input-retro"
                />
              </div>
              <div>
                <label htmlFor="frequencyPeriod" className="label-retro">Period</label>
                <select
                  id="frequencyPeriod"
                  value={frequencyPeriod}
                  onChange={e => setFrequencyPeriod(e.target.value as typeof frequencyPeriod)}
                  className="input-retro"
                >
                  <option value="per_day">Per Day</option>
                  <option value="per_week">Per Week</option>
                  <option value="per_month">Per Month</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !personalGoal.trim()}
              className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Enlisting...' : (
                <>Enlist in Mission <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        </>
      )}
    </section>
  )
}
