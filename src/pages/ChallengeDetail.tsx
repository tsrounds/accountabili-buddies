import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Flag, Users, Calendar, CheckCircle, Clock, FileText, Rocket,
  Share2, Copy, Check, Zap, Trophy,
} from 'lucide-react'
import {
  doc, getDoc, getDocs, collection, updateDoc, serverTimestamp, query, where,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

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
      if (!challengeSnap.exists()) {
        setError('Mission not found.')
        return
      }
      setChallenge(challengeSnap.data() as Challenge)
      setMembers(membersSnap.docs.map(d => d.data() as Member))
      const lb = lbSnap.docs
        .map(d => d.data() as LeaderboardEntry)
        .sort((a, b) => b.totalCheckins - a.totalCheckins)
      setLeaderboard(lb)
    } catch {
      setError('Failed to load mission.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
      await updateDoc(doc(db, 'ab_challenges', id), {
        status: 'active',
        startDate: serverTimestamp(),
      })
      setChallenge(prev => prev ? { ...prev, status: 'active' } : prev)
    } catch { /* silent */ } finally {
      setStarting(false)
    }
  }

  // ── Loading / Error ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="font-display text-slate/50 uppercase tracking-widest text-sm animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  if (error || !challenge) {
    return (
      <div className="card-retro text-center py-8">
        <p className="font-body text-retro-red text-sm">{error ?? 'Mission not found.'}</p>
      </div>
    )
  }

  const myMember = members.find(m => m.uid === currentUser?.uid)
  const isCreator = challenge.creatorUid === currentUser?.uid
  const durationLabel = challenge.durationType === 'ongoing' ? 'Ongoing' : `${challenge.duration} days`
  const periodLabel = (p: string) => p.replace('per_', 'per ')
  const allDossiersComplete = members.length > 0 && members.every(m => m.dossierComplete)
  const goalsSetCount = members.filter(m => m.personalGoal && m.personalGoal.trim() !== '').length
  const allGoalsSet = members.length > 0 && goalsSetCount === members.length
  const myLbEntry = leaderboard.find(e => e.uid === currentUser?.uid)
  const checkedInToday = myLbEntry?.lastCheckinDate === today

  return (
    <section className="space-y-5">

      {/* ── Header ── */}
      <div className="card-retro">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-retro-red" strokeWidth={1.5} />
            <span className="font-display text-[10px] text-slate/40 uppercase tracking-widest">
              Mission Brief
            </span>
          </div>
          <span className="badge-retro text-slate/60 uppercase">{challenge.status}</span>
        </div>
        <h2 className="font-display text-2xl text-slate leading-tight uppercase">
          {challenge.name}
        </h2>
        {challenge.description && (
          <p className="font-body text-slate/60 mt-2 text-sm leading-relaxed">
            {challenge.description}
          </p>
        )}
        {challenge.category && (
          <span className="inline-block mt-2 badge-retro text-slate/50">
            {challenge.category}
          </span>
        )}
      </div>

      {/* ── Meta row ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-retro flex items-center gap-3">
          <Users size={18} className="text-olive flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="label-retro">Buddies</p>
            <p className="font-body font-bold text-slate">{members.length}</p>
          </div>
        </div>
        <div className="card-retro flex items-center gap-3">
          <Calendar size={18} className="text-olive flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="label-retro">Duration</p>
            <p className="font-body font-bold text-slate">{durationLabel}</p>
          </div>
        </div>
      </div>

      {/* ── Your mission ── */}
      {myMember && (
        <div className="card-retro space-y-1">
          <p className="label-retro">Your Mission</p>
          <p className="font-body text-slate text-sm">{myMember.personalGoal || '—'}</p>
          {myMember.personalGoal && (
            <p className="font-body text-slate/40 text-xs">
              {myMember.targetFrequency}× {periodLabel(myMember.frequencyPeriod)}
            </p>
          )}
        </div>
      )}

      {/* ── Lobby state ── */}
      {challenge.status === 'lobby' && (
        <div className="card-retro space-y-4">
          <div className="text-center py-2 space-y-1">
            <Clock size={24} className="mx-auto text-mustard" strokeWidth={1.5} />
            <p className="font-display text-slate uppercase tracking-wider text-sm">
              Awaiting Deployment
            </p>
            <p className="font-body text-slate/50 text-xs">
              {members.length} recruit{members.length !== 1 ? 's' : ''} enlisted
            </p>
          </div>

          {myMember && !myMember.dossierComplete && (
            <Link
              to={`/challenge/${id}/dossier`}
              className="btn-retro w-full gap-2 justify-center"
            >
              <FileText size={15} strokeWidth={1.8} />
              File Your Roast Dossier
            </Link>
          )}

          {myMember?.dossierComplete && (
            <div className="flex items-center justify-center gap-2 py-1">
              <CheckCircle size={15} className="text-olive" strokeWidth={2} />
              <span className="font-display text-xs text-olive uppercase tracking-wider">
                Dossier Filed
              </span>
            </div>
          )}

          {inviteCode && (
            <div className="border border-slate/20 bg-cream/60 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] text-slate/40 uppercase tracking-wider">
                  Invite Code
                </span>
                <span className="font-display text-mustard tracking-[0.3em] text-sm">
                  {inviteCode}
                </span>
              </div>
              <button
                className="btn-outline w-full gap-2 py-2 text-xs"
                onClick={() => void handleCopyInvite()}
              >
                {copied ? <Check size={13} strokeWidth={2} /> : <Copy size={13} strokeWidth={1.8} />}
                {copied ? 'Copied!' : 'Copy Invite Link'}
              </button>
              <button
                className="btn-outline w-full gap-2 py-2 text-xs"
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
                <Share2 size={13} strokeWidth={1.8} />
                Share Invite
              </button>
            </div>
          )}

          {isCreator && (
            <div className="border-t border-slate/20 pt-4 space-y-2">
              {!allGoalsSet && (
                <p className="font-body text-slate/40 text-xs text-center">
                  {goalsSetCount}/{members.length} goals set
                </p>
              )}
              {!allDossiersComplete && (
                <p className="font-body text-slate/40 text-xs text-center">
                  {members.filter(m => m.dossierComplete).length}/{members.length} dossiers filed
                </p>
              )}
              <button
                className="btn-retro w-full gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => void handleStartMission()}
                disabled={starting || !allGoalsSet}
              >
                <Rocket size={15} strokeWidth={1.8} />
                {starting ? 'Deploying...' : 'Deploy Mission'}
              </button>
              {!allGoalsSet ? (
                <p className="font-body text-slate/30 text-[10px] text-center">
                  All members must set a goal before deploying.
                </p>
              ) : !allDossiersComplete && (
                <p className="font-body text-slate/30 text-[10px] text-center">
                  You can deploy before all dossiers are filed.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Active: check-in CTA ── */}
      {challenge.status === 'active' && (
        <button
          className={[
            'w-full gap-2',
            checkedInToday ? 'btn-outline' : 'btn-retro',
          ].join(' ')}
          onClick={() => navigate(`/challenge/${id}/checkin`)}
        >
          {checkedInToday
            ? <><CheckCircle size={16} strokeWidth={2} /> Checked In Today</>
            : <><Zap size={16} strokeWidth={2} /> Log Today's Check-In</>
          }
        </button>
      )}

      {/* ── Leaderboard / Progress dashboard ── */}
      {(challenge.status === 'active' || challenge.status === 'complete') && (
        <div className="card-retro space-y-3">
          <div className="flex items-center gap-2 border-b border-slate/20 pb-2">
            <Trophy size={14} className="text-mustard" strokeWidth={1.8} />
            <p className="label-retro mb-0">Leaderboard</p>
          </div>

          {leaderboard.length === 0 ? (
            <p className="font-body text-slate/40 text-xs">
              No check-ins yet. Be the first.
            </p>
          ) : (
            <ol className="space-y-2">
              {leaderboard.map((entry, i) => {
                const isMe = entry.uid === currentUser?.uid
                const checkedToday = entry.lastCheckinDate === today
                return (
                  <li
                    key={entry.uid}
                    className={[
                      'flex items-center gap-3 py-1',
                      isMe ? 'opacity-100' : 'opacity-80',
                    ].join(' ')}
                  >
                    {/* Rank */}
                    <span className={[
                      'font-display text-xs w-5 text-center flex-shrink-0',
                      i === 0 ? 'text-mustard' : 'text-slate/40',
                    ].join(' ')}>
                      {i + 1}
                    </span>

                    {/* Avatar */}
                    <div className={[
                      'w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0',
                      isMe ? 'bg-mustard/30 border-mustard/40' : 'bg-slate/10 border-slate/20',
                    ].join(' ')}>
                      <span className="font-display text-[10px] text-slate">
                        {entry.firstName[0]}
                      </span>
                    </div>

                    {/* Name + goal */}
                    <div className="min-w-0 flex-1">
                      <p className="font-body text-slate text-xs font-semibold">
                        {entry.firstName}
                        {isMe && <span className="ml-1 text-mustard">(you)</span>}
                      </p>
                    </div>

                    {/* Check-in count + today status */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Zap
                        size={13}
                        strokeWidth={1.5}
                        className={checkedToday ? 'text-mustard' : 'text-slate/20'}
                        fill={checkedToday ? '#E7F53C' : 'none'}
                      />
                      <span className="font-display text-xs text-slate/60">
                        {entry.totalCheckins}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}

          {/* Members with no check-ins yet */}
          {members
            .filter(m => !leaderboard.find(e => e.uid === m.uid))
            .map(m => (
              <div key={m.uid} className="flex items-center gap-3 py-1 opacity-40">
                <span className="font-display text-xs w-5 text-center flex-shrink-0 text-slate/30">
                  —
                </span>
                <div className="w-7 h-7 rounded-full bg-slate/10 border border-slate/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-[10px] text-slate">{m.firstName[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-slate text-xs">
                    {m.firstName}
                    {m.uid === currentUser?.uid && <span className="ml-1 text-mustard">(you)</span>}
                  </p>
                </div>
                <span className="font-display text-xs text-slate/30">0</span>
              </div>
            ))
          }
        </div>
      )}

      {/* ── Enlisted members (lobby only) ── */}
      {challenge.status === 'lobby' && (
        <div className="card-retro space-y-3">
          <p className="label-retro">Enlisted Recruits</p>
          {members.length === 0 ? (
            <p className="font-body text-slate/40 text-xs">No recruits yet.</p>
          ) : (
            <ul className="space-y-2">
              {members.map(m => (
                <li key={m.uid} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-mustard/20 border border-slate/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-[10px] text-slate">{m.firstName[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-slate text-xs font-semibold">
                      {m.firstName}
                      {m.uid === currentUser?.uid && (
                        <span className="ml-1 text-mustard">(you)</span>
                      )}
                    </p>
                    {m.personalGoal && (
                      <p className="font-body text-slate/40 text-[10px] truncate">{m.personalGoal}</p>
                    )}
                  </div>
                  {m.dossierComplete && (
                    <FileText size={13} className="flex-shrink-0 text-olive" strokeWidth={1.8} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

    </section>
  )
}
