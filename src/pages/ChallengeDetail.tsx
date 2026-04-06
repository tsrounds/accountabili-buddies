import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Users, Calendar, CheckCircle, FileText, Rocket,
  Share2, Copy, Check, Zap, Trophy, Link2,
} from 'lucide-react'
import {
  doc, getDoc, getDocs, collection, updateDoc, serverTimestamp, query, where,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'
import type { ComponentProps } from 'react'

type MascotMood = ComponentProps<typeof MascotZone>['mood']

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

interface Challenge {
  name: string
  creatorUid: string
  creatorFirstName: string
  duration: number | null
  durationType: 'fixed' | 'ongoing'
  visibility: 'private' | 'public'
  proofType: 'honor' | 'photo'
  category: string
  description: string
  status: 'lobby' | 'active' | 'complete'
  createdAt: Timestamp
  startDate: Timestamp | null
}

interface Member {
  uid: string
  firstName: string
  personalGoal: string
  targetFrequency: number
  frequencyPeriod: 'per_day' | 'per_week' | 'per_month'
  dossierComplete: boolean
}

interface LeaderboardEntry {
  uid: string
  firstName: string
  totalCheckins: number
  lastCheckinDate: string
}

const STAGGER = ['animate-slide-up', 'animate-slide-up-1', 'animate-slide-up-2', 'animate-slide-up-3', 'animate-slide-up-4']

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [inviteCode, setInviteCode] = useState<string | null>(null)

  const today = todayStr()

  async function loadData() {
    if (!id) return
    try {
      const [challengeSnap, membersSnap, lbSnap] = await Promise.all([
        getDoc(doc(db, 'ab_challenges', id)),
        getDocs(collection(db, 'ab_challenges', id, 'members')),
        getDocs(collection(db, 'ab_challenges', id, 'leaderboard')),
      ])
      if (!challengeSnap.exists()) { setError('Mission not found.'); return }
      setChallenge(challengeSnap.data() as Challenge)
      setMembers(membersSnap.docs.map(d => d.data() as Member))
      const lb = lbSnap.docs
        .map(d => d.data() as LeaderboardEntry)
        .sort((a, b) => b.totalCheckins - a.totalCheckins)
      setLeaderboard(lb)
    } catch { setError('Failed to load mission.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void loadData() }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!id || !challenge || challenge.status !== 'lobby') return
    getDocs(query(collection(db, 'ab_invites'), where('challengeId', '==', id)))
      .then(snap => { if (!snap.empty) setInviteCode(snap.docs[0].id) })
      .catch(() => {/* non-critical */})
  }, [id, challenge])

  async function handleCopyInvite() {
    if (!inviteCode) return
    await navigator.clipboard.writeText(`${window.location.origin}/join/${inviteCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleStartMission() {
    if (!id) return
    setStarting(true)
    try {
      await updateDoc(doc(db, 'ab_challenges', id), { status: 'active', startDate: serverTimestamp() })
      setChallenge(prev => prev ? { ...prev, status: 'active' } : prev)
    } catch { /* silent */ } finally { setStarting(false) }
  }

  // ── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="zone-hero pb-8 flex flex-col items-center gap-3">
          <div className="skeleton w-44 h-44 rounded-full" />
          <div className="skeleton w-64 h-10 rounded-xl" />
          <div className="skeleton w-24 h-5 rounded-full" />
        </div>
        <ZoneDivider />
        <div className="zone-content space-y-3">
          <div className="skeleton h-14 rounded-full" />
          <div className="skeleton h-28 rounded-2xl" />
          <div className="skeleton h-20 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="font-body text-retro-red text-base">{error ?? 'Mission not found.'}</p>
      </div>
    )
  }

  const myMember       = members.find(m => m.uid === currentUser?.uid)
  const isCreator      = challenge.creatorUid === currentUser?.uid
  const durationLabel  = challenge.durationType === 'ongoing' ? 'Ongoing' : `${challenge.duration} days`
  const periodLabel    = (p: string) => p.replace('per_', 'per ')
  const allDossiersComplete = members.length > 0 && members.every(m => m.dossierComplete)
  const goalsSetCount  = members.filter(m => m.personalGoal && m.personalGoal.trim() !== '').length
  const allGoalsSet    = members.length > 0 && goalsSetCount === members.length
  const myLbEntry      = leaderboard.find(e => e.uid === currentUser?.uid)
  const checkedInToday = myLbEntry?.lastCheckinDate === today
  const myRank         = leaderboard.findIndex(e => e.uid === currentUser?.uid) + 1

  const mascotMood: MascotMood =
    challenge.status === 'complete' ? 'celebrate' :
    challenge.status === 'lobby'    ? 'idle' :
    checkedInToday                  ? 'proud' :
                                      'lagging'

  const heroTagline =
    challenge.status === 'complete' ? 'MISSION COMPLETE' :
    challenge.status === 'lobby'    ? 'AWAITING DEPLOYMENT' :
    checkedInToday                  ? `RANK #${myRank > 0 ? myRank : '?'} — CRUSHED IT` :
                                      `RANK #${myRank > 0 ? myRank : '?'} — GET MOVING`

  return (
    <div className="flex flex-col">

      {/* ── DARK HERO ZONE ── */}
      <div className="zone-hero pb-8 flex flex-col items-center">
        <MascotZone mood={mascotMood} />

        {/* Status pill */}
        <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-cream/10 border border-cream/15 animate-slide-up-1">
          <span className="font-display text-xs uppercase tracking-widest text-cream/70">
            {heroTagline}
          </span>
        </span>

        {/* Challenge name */}
        <h2 className="mt-2 font-display text-4xl text-cream uppercase text-center leading-tight px-4 tracking-wide animate-slide-up-2">
          {challenge.name}
        </h2>

        {/* Meta chips */}
        <div className="flex items-center gap-3 mt-3 animate-slide-up-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-cream/10 rounded-full">
            <Users size={13} className="text-teal" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-body text-xs text-cream/70">{members.length} buddies</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-cream/10 rounded-full">
            <Calendar size={13} className="text-teal" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-body text-xs text-cream/70">{durationLabel}</span>
          </span>
          {challenge.category && (
            <span className="px-3 py-1.5 bg-cream/10 rounded-full font-body text-xs text-cream/70 uppercase">
              {challenge.category}
            </span>
          )}
        </div>
      </div>

      {/* ── BLOB DIVIDER ── */}
      <svg viewBox="0 0 375 40" className="zone-divider" fill="#B7C8E9" aria-hidden="true">
        <path d="M0,22 Q93,2 187,22 Q281,42 375,22 L375,40 L0,40 Z" />
      </svg>

      {/* ── LIGHT CONTENT ZONE ── */}
      <div className="zone-content space-y-4">

        {/* ── Active: ONE big primary CTA ── */}
        {challenge.status === 'active' && (
          <button
            className={[
              'w-full gap-3 font-display text-xl tracking-widest min-h-[56px] animate-slide-up',
              checkedInToday
                ? 'inline-flex items-center justify-center px-7 py-5 bg-dark text-cream uppercase rounded-full border-2 border-dark/20 cursor-pointer transition-all duration-150 hover:bg-dark/90'
                : 'btn-retro-xl',
            ].join(' ')}
            onClick={() => navigate(`/challenge/${id}/checkin`)}
          >
            {checkedInToday
              ? <><CheckCircle size={20} strokeWidth={2} aria-hidden="true" /> Checked In</>
              : <><Zap size={20} strokeWidth={2} aria-hidden="true" /> Log Check-In</>
            }
          </button>
        )}

        {/* ── Leaderboard (active / complete) ── */}
        {(challenge.status === 'active' || challenge.status === 'complete') && (
          <div className="card-light space-y-3 animate-slide-up-1">
            <div className="flex items-center gap-2 border-b border-dark/10 pb-2">
              <Trophy size={14} className="text-neon" strokeWidth={1.8} aria-hidden="true" />
              <p className="font-display text-xs text-dark/50 uppercase tracking-wider">Leaderboard</p>
            </div>

            {leaderboard.length === 0 ? (
              <p className="font-body text-dark/40 text-sm leading-relaxed">
                No check-ins yet. Be the first.
              </p>
            ) : (
              <ol className="space-y-2">
                {leaderboard.map((entry, i) => {
                  const isMe        = entry.uid === currentUser?.uid
                  const checkedToday = entry.lastCheckinDate === today
                  return (
                    <li
                      key={entry.uid}
                      className={[
                        'flex items-center gap-3 py-1.5',
                        STAGGER[Math.min(i, STAGGER.length - 1)],
                        isMe ? 'opacity-100' : 'opacity-75',
                      ].join(' ')}
                    >
                      <span className={['font-display text-sm w-5 text-center flex-shrink-0', i === 0 ? 'text-neon' : 'text-dark/40'].join(' ')}>
                        {i + 1}
                      </span>
                      <div className={['w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0', isMe ? 'bg-neon/20 border-neon/40' : 'bg-dark/10 border-dark/15'].join(' ')}>
                        <span className="font-display text-xs text-dark">{entry.firstName[0]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-body text-dark text-sm leading-none">
                          {entry.firstName}
                          {isMe && <span className="ml-1.5 text-neon text-xs">(you)</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Zap
                          size={13}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className={checkedToday ? 'text-neon' : 'text-dark/20'}
                          fill={checkedToday ? '#E7F53C' : 'none'}
                        />
                        <span className="font-display text-sm text-dark/70">{entry.totalCheckins}</span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}

            {/* Zero check-in members */}
            {members
              .filter(m => !leaderboard.find(e => e.uid === m.uid))
              .map(m => (
                <div key={m.uid} className="flex items-center gap-3 py-1 opacity-40">
                  <span className="font-display text-sm w-5 text-center flex-shrink-0 text-dark/30">—</span>
                  <div className="w-8 h-8 rounded-full bg-dark/10 border border-dark/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xs text-dark">{m.firstName[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-dark text-sm">
                      {m.firstName}
                      {m.uid === currentUser?.uid && <span className="ml-1.5 text-neon text-xs">(you)</span>}
                    </p>
                  </div>
                  <span className="font-display text-sm text-dark/30">0</span>
                </div>
              ))
            }
          </div>
        )}

        {/* ── Your mission + brief (flat, no card wrapper) ── */}
        {(myMember || challenge.description) && (
          <div className="space-y-3 animate-slide-up-2 px-1">
            {myMember && (
              <div>
                <p className="label-light">Your Mission</p>
                <p className="font-body text-dark text-base leading-relaxed">
                  {myMember.personalGoal || '—'}
                </p>
                {myMember.personalGoal && (
                  <p className="font-body text-dark/40 text-sm mt-0.5">
                    {myMember.targetFrequency}× {periodLabel(myMember.frequencyPeriod)}
                  </p>
                )}
              </div>
            )}
            {challenge.description && (
              <div className={myMember ? 'border-t border-dark/10 pt-3' : ''}>
                <p className="label-light">Mission Brief</p>
                <p className="font-body text-dark/70 text-sm leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Lobby controls ── */}
        {challenge.status === 'lobby' && (
          <div className="space-y-3 animate-slide-up-1">

            {/* Dossier CTA */}
            {myMember && !myMember.dossierComplete && (
              <button
                className="btn-retro-xl w-full gap-2"
                onClick={() => navigate(`/challenge/${id}/dossier`)}
              >
                <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
                File Your Roast Dossier
              </button>
            )}
            {myMember?.dossierComplete && (
              <div className="flex items-center justify-center gap-2 py-2">
                <CheckCircle size={15} className="text-teal" strokeWidth={2} aria-hidden="true" />
                <span className="font-display text-sm text-teal uppercase tracking-wider">Dossier Filed</span>
              </div>
            )}

            {/* Invite code */}
            {inviteCode && (
              <div className="card-light space-y-3">
                <div className="flex items-center justify-between">
                  <p className="label-light">Invite Code</p>
                  <span className="font-display text-dark tracking-[0.3em] text-lg">{inviteCode}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center justify-center gap-2 flex-1 px-4 py-3
                               bg-dark text-cream font-body text-sm uppercase tracking-wider
                               rounded-full min-h-[44px] cursor-pointer
                               border-2 border-dark/20 transition-all duration-150 hover:bg-dark/80"
                    onClick={() => void handleCopyInvite()}
                  >
                    {copied ? <Check size={14} strokeWidth={2} aria-hidden="true" /> : <Copy size={14} strokeWidth={1.8} aria-hidden="true" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 flex-1 px-4 py-3
                               bg-dark text-cream font-body text-sm uppercase tracking-wider
                               rounded-full min-h-[44px] cursor-pointer
                               border-2 border-dark/20 transition-all duration-150 hover:bg-dark/80"
                    onClick={async () => {
                      try {
                        await navigator.share({
                          title: `Join my mission: ${challenge.name}`,
                          text: "I'm starting a challenge on Accountabili-Buddies. Join me!",
                          url: `${window.location.origin}/join/${inviteCode}`,
                        })
                      } catch { void handleCopyInvite() }
                    }}
                  >
                    <Share2 size={14} strokeWidth={1.8} aria-hidden="true" />
                    Share
                  </button>
                </div>
              </div>
            )}

            {/* Enlisted recruits — flat list */}
            <div className="px-1 space-y-2">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-teal" strokeWidth={1.5} aria-hidden="true" />
                <p className="label-light mb-0">
                  Enlisted Recruits — {members.length}
                </p>
              </div>
              {members.length === 0 ? (
                <p className="font-body text-dark/40 text-sm">No recruits yet.</p>
              ) : (
                <ul className="divide-y divide-dark/8">
                  {members.map(m => (
                    <li key={m.uid} className="flex items-center gap-3 py-2.5">
                      <div className="w-8 h-8 rounded-full bg-dark/10 border border-dark/15 flex items-center justify-center flex-shrink-0">
                        <span className="font-display text-xs text-dark">{m.firstName[0]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-body text-dark text-sm">
                          {m.firstName}
                          {m.uid === currentUser?.uid && <span className="ml-1.5 text-neon text-xs">(you)</span>}
                        </p>
                        {m.personalGoal && (
                          <p className="font-body text-dark/40 text-xs truncate leading-relaxed">{m.personalGoal}</p>
                        )}
                      </div>
                      {m.dossierComplete && (
                        <Link2 size={13} className="flex-shrink-0 text-teal" strokeWidth={1.8} aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Deploy — creator only */}
            {isCreator && (
              <div className="space-y-2">
                {!allGoalsSet && (
                  <p className="font-body text-dark/50 text-sm text-center leading-relaxed">
                    {goalsSetCount}/{members.length} goals set before deploying
                  </p>
                )}
                {!allDossiersComplete && allGoalsSet && (
                  <p className="font-body text-dark/40 text-xs text-center">
                    You can deploy before all dossiers are filed.
                  </p>
                )}
                <button
                  className="btn-retro-xl w-full gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => void handleStartMission()}
                  disabled={starting || !allGoalsSet}
                >
                  <Rocket size={18} strokeWidth={1.8} aria-hidden="true" />
                  {starting ? 'Deploying…' : 'Deploy Mission'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
