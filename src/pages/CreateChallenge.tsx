import { useState } from 'react'
import type { FormEvent } from 'react'
import { Share2, Copy, Check, ArrowRight, Dumbbell, DollarSign, Heart, BookOpen, Leaf, Utensils, Moon, Target } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ChallengeType {
  key: string
  label: string
  Icon: LucideIcon
}

const CHALLENGE_TYPES: ChallengeType[] = [
  { key: 'Fitness',      label: 'Fitness',     Icon: Dumbbell    },
  { key: 'Finance',      label: 'Finance',     Icon: DollarSign  },
  { key: 'Health',       label: 'Health',      Icon: Heart       },
  { key: 'Reading',      label: 'Reading',     Icon: BookOpen    },
  { key: 'Mindfulness',  label: 'Mindfulness', Icon: Leaf        },
  { key: 'Nutrition',    label: 'Nutrition',   Icon: Utensils    },
  { key: 'Sleep',        label: 'Sleep',       Icon: Moon        },
  { key: 'Habit',        label: 'Habit',       Icon: Target      },
]
import { collection, addDoc, setDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

interface ShareState {
  challengeId: string
  code: string
  inviteUrl: string
  challengeName: string
}

export default function CreateChallenge() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [proofType, setProofType] = useState<'honor' | 'photo'>('honor')
  const [visibility, setVisibility] = useState<'private' | 'public'>('private')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [share, setShare] = useState<ShareState | null>(null)
  const [copied, setCopied] = useState(false)

  // Goal-setting step (shown after challenge is created, before invite code)
  const [goalStep, setGoalStep] = useState(true)
  const [personalGoal, setPersonalGoal] = useState('')
  const [targetFrequency, setTargetFrequency] = useState('1')
  const [frequencyPeriod, setFrequencyPeriod] = useState<'per_day' | 'per_week' | 'per_month'>('per_week')
  const [goalSubmitting, setGoalSubmitting] = useState(false)
  const [goalError, setGoalError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!currentUser) return
    setError(null)
    setSubmitting(true)
    try {
      const isOngoing = duration === 'ongoing'
      const durationNum = isOngoing ? null : parseInt(duration, 10)

      // 1. Create challenge doc
      const challengeRef = await addDoc(collection(db, 'ab_challenges'), {
        name: name.trim(),
        creatorUid: currentUser.uid,
        creatorFirstName: currentUser.firstName,
        duration: durationNum,
        durationType: isOngoing ? 'ongoing' : 'fixed',
        visibility,
        proofType,
        category: category.trim(),
        description: description.trim(),
        status: 'lobby',
        createdAt: serverTimestamp(),
        startDate: null,
      })

      // 2. Generate invite code
      const code = generateCode()
      await setDoc(doc(db, 'ab_invites', code), {
        challengeId: challengeRef.id,
        createdAt: serverTimestamp(),
      })

      // 3. Add creator to members subcollection
      await setDoc(doc(db, 'ab_challenges', challengeRef.id, 'members', currentUser.uid), {
        uid: currentUser.uid,
        firstName: currentUser.firstName,
        personalGoal: '',
        targetFrequency: 1,
        frequencyPeriod: 'per_week',
        joinedAt: serverTimestamp(),
        dossierComplete: false,
        friendIntelComplete: false,
      })

      setShare({
        challengeId: challengeRef.id,
        code,
        inviteUrl: `${window.location.origin}/join/${code}`,
        challengeName: name.trim(),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mission. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoalSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!share || !currentUser) return
    setGoalError(null)
    setGoalSubmitting(true)
    try {
      await updateDoc(
        doc(db, 'ab_challenges', share.challengeId, 'members', currentUser.uid),
        {
          personalGoal: personalGoal.trim(),
          targetFrequency: parseInt(targetFrequency, 10),
          frequencyPeriod,
        }
      )
      setGoalStep(false)
    } catch (err) {
      setGoalError(err instanceof Error ? err.message : 'Failed to save goal. Try again.')
    } finally {
      setGoalSubmitting(false)
    }
  }

  async function handleShare() {
    if (!share) return
    try {
      await navigator.share({
        title: `Join my mission: ${share.challengeName}`,
        text: "I'm starting a challenge on Accountabili-Buddies. Join me!",
        url: share.inviteUrl,
      })
    } catch {
      // User cancelled or share not available — fallback to copy
      await handleCopy()
    }
  }

  async function handleCopy() {
    if (!share) return
    await navigator.clipboard.writeText(share.inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Goal-setting step (after challenge created, before invite) ───────────
  if (share && goalStep) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center">
          <MascotZone mood="idle" size="sm" headline="SET YOUR GOAL" />
        </div>
        <ZoneDivider />
        <div className="zone-content space-y-4">
          <p className="font-body text-dark/60 text-sm leading-relaxed">
            Before sharing the invite, set your own goal for{' '}
            <span className="font-semibold text-dark">{share.challengeName}</span>.
          </p>

          {goalError && (
            <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl">
              {goalError}
            </p>
          )}

          <form onSubmit={e => void handleGoalSubmit(e)} className="space-y-4">
            <div>
              <label htmlFor="personalGoal" className="label-light">Your Goal</label>
              <input
                id="personalGoal"
                type="text"
                value={personalGoal}
                onChange={e => setPersonalGoal(e.target.value)}
                placeholder="e.g. Run 3 times per week"
                required
                autoFocus
                className="input-light"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="targetFrequency" className="label-light">Target</label>
                <input
                  id="targetFrequency"
                  type="number"
                  min="1"
                  max="99"
                  value={targetFrequency}
                  onChange={e => setTargetFrequency(e.target.value)}
                  required
                  className="input-light"
                />
              </div>
              <div>
                <label htmlFor="frequencyPeriod" className="label-light">Period</label>
                <select
                  id="frequencyPeriod"
                  value={frequencyPeriod}
                  onChange={e => setFrequencyPeriod(e.target.value as typeof frequencyPeriod)}
                  className="input-light"
                >
                  <option value="per_day">Per Day</option>
                  <option value="per_week">Per Week</option>
                  <option value="per_month">Per Month</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={goalSubmitting || !personalGoal.trim()}
              className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {goalSubmitting ? 'Saving...' : (
                <>Save Goal &amp; Get Invite Code <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Share screen ─────────────────────────────────────────────────────────
  if (share) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero-compact pb-4 flex flex-col items-center">
          <MascotZone mood="celebrate" size="sm" headline="MISSION CREATED" />
        </div>
        <ZoneDivider />
        <div className="zone-content space-y-4">
          <p className="font-body text-dark/60 text-sm leading-relaxed text-center">
            Your mission is ready. Enlist your buddies with this invite code.
          </p>

          <div className="card-light text-center py-5 space-y-2">
            <p className="font-display text-3xl text-dark tracking-[0.4em] uppercase">
              {share.code}
            </p>
            <p className="font-body text-dark/40 text-xs break-all px-4">
              {share.inviteUrl}
            </p>
          </div>

          <div className="space-y-3">
            <button
              className="btn-retro w-full gap-2"
              onClick={() => void handleShare()}
            >
              <Share2 size={16} strokeWidth={1.8} />
              Share Invite Link
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5
                         bg-dark text-cream font-body text-base uppercase tracking-wider
                         rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                         transition-all duration-150 hover:bg-dark/80"
              onClick={() => void handleCopy()}
            >
              {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.8} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80"
            onClick={() => navigate(`/challenge/${share.challengeId}`)}
          >
            <ArrowRight size={16} strokeWidth={1.8} />
            View Mission Briefing
          </button>
        </div>
      </div>
    )
  }

  // ── Create form ──────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col">
      <div className="zone-hero-compact pb-4 flex flex-col items-center">
        <MascotZone mood="idle" size="sm" headline="BUILD YOUR MISSION" />
      </div>
      <ZoneDivider />
      <div className="zone-content">
        {error && (
          <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl mb-4">
            {error}
          </p>
        )}

        <form onSubmit={e => void handleSubmit(e)} className="space-y-4">
          {/* Challenge name */}
          <div>
            <label htmlFor="name" className="label-light">Mission Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. 30-Day Push-Up Challenge"
              required
              className="input-light"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label-light">Description (optional)</label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the rules and goal..."
              className="input-light resize-none"
            />
          </div>

          {/* Challenge type */}
          <div>
            <p className="label-light">Challenge Type</p>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {CHALLENGE_TYPES.map(({ key, label, Icon }) => {
                const selected = category === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(selected ? '' : key)}
                    className={[
                      'flex flex-col items-center gap-1.5 py-3 border-2 rounded-2xl transition-colors duration-100',
                      selected
                        ? 'border-neon bg-neon/15 text-dark'
                        : 'border-dark/12 bg-white/50 text-dark/50 hover:border-dark/25',
                    ].join(' ')}
                  >
                    <Icon size={20} strokeWidth={1.5} className={selected ? 'text-neon' : undefined} />
                    <span className="font-display text-[9px] uppercase tracking-wide leading-none">
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="label-light">Duration</label>
            <select
              id="duration"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              required
              className="input-light"
            >
              <option value="">Select duration...</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          {/* Proof type */}
          <div>
            <p className="label-light">Proof Required</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="proofType"
                  value="honor"
                  checked={proofType === 'honor'}
                  onChange={() => setProofType('honor')}
                  className="accent-neon"
                />
                <span className="font-body text-sm text-dark">Honor System</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="proofType"
                  value="photo"
                  checked={proofType === 'photo'}
                  onChange={() => setProofType('photo')}
                  className="accent-neon"
                />
                <span className="font-body text-sm text-dark">Photo Required</span>
              </label>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <p className="label-light">Visibility</p>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={() => setVisibility('private')}
                  className="accent-neon"
                />
                <span className="font-body text-sm text-dark">Private</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={() => setVisibility('public')}
                  className="accent-neon"
                />
                <span className="font-body text-sm text-dark">Public</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating Mission...' : 'Create Mission'}
          </button>
        </form>
      </div>
    </div>
  )
}
