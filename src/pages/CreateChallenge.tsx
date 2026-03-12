import { useState } from 'react'
import type { FormEvent } from 'react'
import { PlusCircle, Share2, Copy, Check, ArrowRight, Dumbbell, DollarSign, Heart, BookOpen, Leaf, Utensils, Moon, Target } from 'lucide-react'
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
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

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

  // ── Share screen ─────────────────────────────────────────────────────────
  if (share) {
    return (
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Share2 size={22} className="text-mustard" strokeWidth={1.5} />
          <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
            Mission Created
          </h2>
        </div>

        <div className="card-retro space-y-4 text-center">
          <p className="font-body text-slate/70 text-sm leading-relaxed">
            Your mission is ready. Enlist your buddies with this invite code.
          </p>

          <div className="border-2 border-mustard/40 bg-mustard/5 py-5">
            <p className="font-display text-3xl text-mustard tracking-[0.4em] uppercase">
              {share.code}
            </p>
            <p className="font-body text-slate/40 text-xs mt-2 break-all px-4">
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
              className="btn-outline w-full gap-2"
              onClick={() => void handleCopy()}
            >
              {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.8} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        <button
          className="btn-outline w-full gap-2"
          onClick={() => navigate(`/challenge/${share.challengeId}`)}
        >
          <ArrowRight size={16} strokeWidth={1.8} />
          View Mission Briefing
        </button>
      </section>
    )
  }

  // ── Create form ──────────────────────────────────────────────────────────
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <PlusCircle size={22} className="text-mustard" strokeWidth={1.5} />
        <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
          New Mission
        </h2>
      </div>

      {error && (
        <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2">
          {error}
        </p>
      )}

      <form onSubmit={e => void handleSubmit(e)} className="card-retro space-y-4">
        {/* Challenge name */}
        <div>
          <label htmlFor="name" className="label-retro">Mission Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. 30-Day Push-Up Challenge"
            required
            className="input-retro"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="label-retro">Description (optional)</label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the rules and goal..."
            className="input-retro resize-none"
          />
        </div>

        {/* Challenge type */}
        <div>
          <p className="label-retro">Challenge Type</p>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {CHALLENGE_TYPES.map(({ key, label, Icon }) => {
              const selected = category === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(selected ? '' : key)}
                  className={[
                    'flex flex-col items-center gap-1.5 py-3 border-2 transition-colors duration-100',
                    selected
                      ? 'border-mustard bg-mustard/10 text-slate'
                      : 'border-slate/20 bg-cream/60 text-slate/50 hover:border-slate/40',
                  ].join(' ')}
                >
                  <Icon size={20} strokeWidth={1.5} className={selected ? 'text-mustard' : undefined} />
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
          <label htmlFor="duration" className="label-retro">Duration</label>
          <select
            id="duration"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            required
            className="input-retro"
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
          <p className="label-retro">Proof Required</p>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="proofType"
                value="honor"
                checked={proofType === 'honor'}
                onChange={() => setProofType('honor')}
                className="accent-mustard"
              />
              <span className="font-body text-sm text-slate">Honor System</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="proofType"
                value="photo"
                checked={proofType === 'photo'}
                onChange={() => setProofType('photo')}
                className="accent-mustard"
              />
              <span className="font-body text-sm text-slate">Photo Required</span>
            </label>
          </div>
        </div>

        {/* Visibility */}
        <div>
          <p className="label-retro">Visibility</p>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={visibility === 'private'}
                onChange={() => setVisibility('private')}
                className="accent-mustard"
              />
              <span className="font-body text-sm text-slate">Private</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={visibility === 'public'}
                onChange={() => setVisibility('public')}
                className="accent-mustard"
              />
              <span className="font-body text-sm text-slate">Public</span>
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
    </section>
  )
}
