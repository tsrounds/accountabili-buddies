import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Users, Calendar, CheckCircle, FileText, Rocket,
  Share2, Copy, Check, Zap, Trophy, Link2, Flame, Lock, Clock,
} from 'lucide-react'
import {
  doc, getDoc, getDocs, collection, updateDoc, serverTimestamp, query, where,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'
import ProgressRing from '@/components/ProgressRing'
import QuickUpdate from '@/components/QuickUpdate'
import Confetti from '@/components/Confetti'
import ABRoastBubble from '@/components/ABRoastBubble'
import type { OtherMember } from '@/lib/checkin'
import { targetTotal, progressPct, daysRemaining, memberHealth } from '@/lib/progress'
import type { FrequencyPeriod, MemberHealth } from '@/lib/progress'
import type { RoastParams } from '@/hooks/useABRoast'
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
  frequencyPeriod: FrequencyPeriod
  dossierComplete: boolean
  isReady?: boolean
}

interface LeaderboardEntry {
  uid: string
  firstName: string
  totalCheckins: number
  lastCheckinDate: string
  currentStreak?: number
  bestStreak?: number
}

interface Dossier { goToExcuse?: string; biggestWeakness?: string }

const HEALTH_RING: Record<MemberHealth, string> = {
  on_track: 'ring-emerald/50',
  behind: 'ring-flame/60',
  mia: 'ring-retro-red/60',
}
const HEALTH_LABEL: Record<MemberHealth, string> = {
  on_track: 'On track', behind: 'Behind', mia: 'MIA',
}

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [dossiers, setDossiers] = useState<Record<string, Dossier>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const [lockingIn, setLockingIn] = useState(false)
  const [copied, setCopied] = useState(false)
  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [confetti, setConfetti] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)

  const today = todayStr()

  async function loadData() {
    if (!id) return
    try {
      const [challengeSnap, membersSnap, lbSnap, dossiersSnap] = await Promise.all([
        getDoc(doc(db, 'ab_challenges', id)),
        getDocs(collection(db, 'ab_challenges', id, 'members')),
        getDocs(collection(db, 'ab_challenges', id, 'leaderboard')),
        getDocs(collection(db, 'ab_challenges', id, 'dossiers')),
      ])
      if (!challengeSnap.exists()) { setError('Challenge not found.'); return }
      setChallenge(challengeSnap.data() as Challenge)
      setMembers(membersSnap.docs.map(d => d.data() as Member))
      const lb = lbSnap.docs
        .map(d => d.data() as LeaderboardEntry)
        .sort((a, b) => b.totalCheckins - a.totalCheckins)
      setLeaderboard(lb)
      const dmap: Record<string, Dossier> = {}
      dossiersSnap.docs.forEach(d => { dmap[d.id] = d.data() as Dossier })
      setDossiers(dmap)
    } catch { setError('Failed to load.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void loadData() }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!id || !challenge || challenge.status !== 'lobby') return
    getDocs(query(collection(db, 'ab_invites'), where('challengeId', '==', id)))
      .then(snap => { if (!snap.empty) setInviteCode(snap.docs[0].id) })
      .catch(() => {/* non-critical */})
  }, [id, challenge])

  // Deep link ?update=1 opens the quick-update modal directly.
  useEffect(() => {
    if (challenge?.status === 'active' && searchParams.get('update') === '1') {
      setQuickOpen(true)
      searchParams.delete('update')
      setSearchParams(searchParams, { replace: true })
    }
  }, [challenge, searchParams, setSearchParams])

  async function handleCopyInvite() {
    if (!inviteCode) return
    await navigator.clipboard.writeText(`${window.location.origin}/join/${inviteCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function startChallenge() {
    if (!id) return
    await updateDoc(doc(db, 'ab_challenges', id), { status: 'active', startDate: serverTimestamp() })
    setChallenge(prev => prev ? { ...prev, status: 'active' } : prev)
  }

  async function handleStartMission() {
    setStarting(true)
    try { await startChallenge() } catch { /* silent */ } finally { setStarting(false) }
  }

  async function handleLockIn() {
    if (!id || !currentUser) return
    setLockingIn(true)
    try {
      await updateDoc(doc(db, 'ab_challenges', id, 'members', currentUser.uid), { isReady: true })
      const updated = members.map(m => m.uid === currentUser.uid ? { ...m, isReady: true } : m)
      setMembers(updated)
      setConfetti(true)
      setTimeout(() => setConfetti(false), 2600)
      if (updated.length > 0 && updated.every(m => m.isReady)) {
        await startChallenge()
      }
    } catch { /* silent */ } finally { setLockingIn(false) }
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
        <p className="font-body text-retro-red text-base">{error ?? 'Challenge not found.'}</p>
      </div>
    )
  }

  const myMember       = members.find(m => m.uid === currentUser?.uid)
  const isCreator      = challenge.creatorUid === currentUser?.uid
  const durationLabel  = challenge.durationType === 'ongoing' ? 'Ongoing' : `${challenge.duration} days`
  const periodLabel    = (p: string) => p.replace('per_', 'per ')
  const goalsSetCount  = members.filter(m => m.personalGoal && m.personalGoal.trim() !== '').length
  const allGoalsSet    = members.length > 0 && goalsSetCount === members.length
  const readyCount     = members.filter(m => m.isReady).length
  const allReady       = members.length > 0 && readyCount === members.length
  const stragglers     = members.filter(m => !m.isReady).map(m => m.firstName)

  const myLbEntry      = leaderboard.find(e => e.uid === currentUser?.uid)
  const checkedInToday = myLbEntry?.lastCheckinDate === today
  const myRank         = leaderboard.findIndex(e => e.uid === currentUser?.uid) + 1
  const myStreak       = myLbEntry?.currentStreak ?? 0

  const startDate = challenge.startDate ? challenge.startDate.toDate() : null
  const daysLeft = daysRemaining(startDate, challenge.duration)
  const daysElapsed = (challenge.duration && daysLeft != null)
    ? Math.max(0, challenge.duration - daysLeft) : 0

  const myTarget = myMember
    ? targetTotal(myMember.targetFrequency, myMember.frequencyPeriod, challenge.duration)
    : null
  const myProgress = progressPct(myLbEntry?.totalCheckins ?? 0, myTarget)

  const otherMembers: OtherMember[] = members
    .filter(m => m.uid !== currentUser?.uid)
    .map(m => ({
      uid: m.uid,
      firstName: m.firstName,
      personalGoal: m.personalGoal,
      goToExcuse: dossiers[m.uid]?.goToExcuse,
      biggestWeakness: dossiers[m.uid]?.biggestWeakness,
    }))

  const mascotMood: MascotMood =
    challenge.status === 'complete' ? 'celebrate' :
    challenge.status === 'lobby'    ? (allReady ? 'proud' : 'idle') :
    checkedInToday                  ? 'proud' :
                                      'lagging'

  const heroTagline =
    challenge.status === 'complete' ? 'DONE. YOU DID IT.' :
    challenge.status === 'lobby'    ? 'READY UP' :
    checkedInToday                  ? `RANK #${myRank > 0 ? myRank : '?'} — CRUSHED IT` :
                                      `RANK #${myRank > 0 ? myRank : '?'} — GET MOVING`

  // AB commentary params for active/complete views.
  const myFuel = [dossiers[currentUser?.uid ?? '']?.goToExcuse, dossiers[currentUser?.uid ?? '']?.biggestWeakness]
    .filter(Boolean) as string[]
  const friendsProgress = otherMembers.map(m => {
    const lb = leaderboard.find(e => e.uid === m.uid)
    const t = members.find(x => x.uid === m.uid)
    const tgt = t ? targetTotal(t.targetFrequency, t.frequencyPeriod, challenge.duration) : null
    return { name: m.firstName, progress: progressPct(lb?.totalCheckins ?? 0, tgt) }
  })
  const milestoneHit = [3, 7, 14, 30, 60, 90].includes(myStreak)
  const roastParams: RoastParams | null = currentUser ? {
    userName: currentUser.firstName,
    roastFuel: myFuel,
    goalDescription: myMember?.personalGoal ?? 'their goal',
    currentStreak: myStreak,
    missedDays: checkedInToday ? 0 : 1,
    friendsProgress,
    trigger: challenge.status === 'complete'
      ? 'completion'
      : checkedInToday
        ? (milestoneHit ? 'streak_milestone' : 'friend_comparison')
        : 'missed_checkin',
  } : null

  return (
    <div className="flex flex-col">
      {confetti && <Confetti />}

      {/* ── HERO ZONE ── */}
      <div className="zone-hero pb-8 flex flex-col items-center">
        <MascotZone mood={mascotMood} />

        <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-ivory/10 border border-ivory/15 animate-slide-up-1">
          <span className="font-display text-xs uppercase tracking-widest text-ivory/70">
            {heroTagline}
          </span>
        </span>

        <h2 className="mt-2 font-display text-4xl text-ivory uppercase text-center leading-tight px-4 tracking-wide animate-slide-up-2">
          {challenge.name}
        </h2>

        <div className="flex items-center gap-3 mt-3 animate-slide-up-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-ivory/10 rounded-full">
            <Users size={13} className="text-frost" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-body text-xs text-ivory/70">{members.length} buddies</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-ivory/10 rounded-full">
            <Calendar size={13} className="text-frost" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-body text-xs text-ivory/70">{durationLabel}</span>
          </span>
          {challenge.status === 'active' && daysLeft != null && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-ivory/10 rounded-full">
              <Clock size={13} className="text-frost" strokeWidth={1.5} aria-hidden="true" />
              <span className="font-body text-xs text-ivory/70">{daysLeft}d left</span>
            </span>
          )}
        </div>

        {/* AB commentary (active / complete) */}
        {roastParams && challenge.status !== 'lobby' && (
          <ABRoastBubble params={roastParams} />
        )}
      </div>

      <ZoneDivider />

      {/* ── CONTENT ZONE ── */}
      <div className="zone-content space-y-4">

        {/* ── Active: hero goal card with ring + streak + Log Update ── */}
        {challenge.status === 'active' && myMember && (
          <div className="card-light animate-slide-up flex items-center gap-4">
            <ProgressRing
              percent={myProgress}
              size={104}
              stroke={11}
              label={myTarget ? `${myProgress}%` : `${myLbEntry?.totalCheckins ?? 0}`}
              sublabel={myTarget ? `${myLbEntry?.totalCheckins ?? 0}/${myTarget}` : 'logged'}
            />
            <div className="flex-1 min-w-0">
              <p className="label-light mb-0.5">Your Goal</p>
              <p className="font-body text-ink text-sm leading-snug">{myMember.personalGoal || '—'}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Flame size={16} strokeWidth={2} className={myStreak > 0 ? 'text-flame' : 'text-ink/25'}
                       fill={myStreak > 0 ? '#7288AE' : 'none'} aria-hidden="true" />
                <span className="font-display text-ink text-lg leading-none">{myStreak}</span>
                <span className="font-body text-ink/50 text-xs">day streak</span>
              </div>
            </div>
          </div>
        )}

        {challenge.status === 'active' && (
          <button
            className={[
              'w-full gap-3 font-display text-xl tracking-widest min-h-[56px] animate-slide-up-1',
              checkedInToday
                ? 'inline-flex items-center justify-center px-7 py-5 bg-emerald text-ivory uppercase rounded-full cursor-pointer transition-all duration-150 hover:brightness-110'
                : 'btn-retro-xl',
            ].join(' ')}
            onClick={() => setQuickOpen(true)}
          >
            {checkedInToday
              ? <><CheckCircle size={20} strokeWidth={2} aria-hidden="true" /> Log Again</>
              : <><Zap size={20} strokeWidth={2} aria-hidden="true" /> Log Update</>}
          </button>
        )}

        {/* ── Squad: friend health cards (active / complete) ── */}
        {(challenge.status === 'active' || challenge.status === 'complete') && otherMembers.length > 0 && (
          <div className="animate-slide-up-2">
            <p className="label-light flex items-center gap-1.5 mb-2">
              <Users size={12} strokeWidth={2} /> Your Squad
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {otherMembers.map(m => {
                const lb = leaderboard.find(e => e.uid === m.uid)
                const mem = members.find(x => x.uid === m.uid)!
                const tgt = targetTotal(mem.targetFrequency, mem.frequencyPeriod, challenge.duration)
                const pct = progressPct(lb?.totalCheckins ?? 0, tgt)
                const health = memberHealth({
                  lastCheckinDate: lb?.lastCheckinDate,
                  totalCheckins: lb?.totalCheckins ?? 0,
                  target: tgt, daysElapsed, durationDays: challenge.duration, today,
                })
                return (
                  <div key={m.uid} className="flex-shrink-0 w-32 card-light text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-navy/10 flex items-center justify-center ring-2 ${HEALTH_RING[health]}`}>
                      <span className="font-display text-navy text-lg">{m.firstName[0]}</span>
                    </div>
                    <p className="font-body text-ink text-sm mt-2 truncate">{m.firstName}</p>
                    <p className="font-body text-ink/40 text-[11px] truncate leading-tight">{m.personalGoal || '—'}</p>
                    <div className="flex items-center justify-center gap-2 mt-1.5">
                      <span className="font-display text-ink text-sm">{pct}%</span>
                      <span className="inline-flex items-center gap-0.5 text-flame">
                        <Flame size={11} strokeWidth={2} fill={(lb?.currentStreak ?? 0) > 0 ? '#7288AE' : 'none'} />
                        <span className="font-display text-ink text-xs">{lb?.currentStreak ?? 0}</span>
                      </span>
                    </div>
                    <p className="font-body text-[9px] uppercase tracking-wider mt-1 text-ink/40">{HEALTH_LABEL[health]}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Leaderboard (active / complete) ── */}
        {(challenge.status === 'active' || challenge.status === 'complete') && (
          <div className="card-light space-y-3 animate-slide-up-3">
            <div className="flex items-center gap-2 border-b border-ink/10 pb-2">
              <Trophy size={14} className="text-emerald" strokeWidth={1.8} aria-hidden="true" />
              <p className="font-display text-xs text-ink/50 uppercase tracking-wider">Leaderboard</p>
            </div>
            {leaderboard.length === 0 ? (
              <p className="font-body text-ink/40 text-sm leading-relaxed">No check-ins yet. Be the first.</p>
            ) : (
              <ol className="space-y-2">
                {leaderboard.map((entry, i) => {
                  const isMe = entry.uid === currentUser?.uid
                  return (
                    <li key={entry.uid} className={['flex items-center gap-3 py-1.5', isMe ? 'opacity-100' : 'opacity-80'].join(' ')}>
                      <span className={['font-display text-sm w-5 text-center flex-shrink-0', i === 0 ? 'text-emerald' : 'text-ink/40'].join(' ')}>{i + 1}</span>
                      <div className={['w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0', isMe ? 'bg-emerald/15 border-emerald/40' : 'bg-ink/5 border-ink/15'].join(' ')}>
                        <span className="font-display text-xs text-ink">{entry.firstName[0]}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-body text-ink text-sm leading-none">
                          {entry.firstName}{isMe && <span className="ml-1.5 text-emerald text-xs">(you)</span>}
                        </p>
                      </div>
                      {(entry.currentStreak ?? 0) > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-flame flex-shrink-0">
                          <Flame size={12} strokeWidth={2} fill="#7288AE" />
                          <span className="font-display text-ink text-xs">{entry.currentStreak}</span>
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Zap size={13} strokeWidth={1.5} aria-hidden="true"
                             className={entry.lastCheckinDate === today ? 'text-emerald' : 'text-ink/20'}
                             fill={entry.lastCheckinDate === today ? '#4B5694' : 'none'} />
                        <span className="font-display text-sm text-ink/70">{entry.totalCheckins}</span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}
          </div>
        )}

        {/* ── Your mission + brief ── */}
        {(myMember || challenge.description) && challenge.status !== 'active' && (
          <div className="space-y-3 animate-slide-up-2 px-1">
            {myMember && (
              <div>
                <p className="label-light">Your Mission</p>
                <p className="font-body text-ink text-base leading-relaxed">{myMember.personalGoal || '—'}</p>
                {myMember.personalGoal && (
                  <p className="font-body text-ink/40 text-sm mt-0.5">
                    {myMember.targetFrequency}× {periodLabel(myMember.frequencyPeriod)}
                  </p>
                )}
              </div>
            )}
            {challenge.description && (
              <div className={myMember ? 'border-t border-ink/10 pt-3' : ''}>
                <p className="label-light">About</p>
                <p className="font-body text-ink/70 text-sm leading-relaxed">{challenge.description}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Lobby: ready-up ── */}
        {challenge.status === 'lobby' && (
          <div className="space-y-4 animate-slide-up-1">

            {/* Ready-up grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="label-light flex items-center gap-1.5 mb-0"><Users size={12} strokeWidth={2} /> Ready Up</p>
                <span className="font-display text-xs text-ink/50 uppercase tracking-wider">{readyCount}/{members.length} ready</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {members.map(m => (
                  <div key={m.uid} className="card-light text-center py-3">
                    <div className={[
                      'w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all',
                      m.isReady ? 'bg-emerald/15 ring-2 ring-emerald shadow-glow' : 'bg-ink/5 ring-1 ring-ink/10',
                    ].join(' ')}>
                      <span className="font-display text-ink text-lg">{m.firstName[0]}</span>
                    </div>
                    <p className="font-body text-ink text-xs mt-1.5 truncate">
                      {m.firstName}{m.uid === currentUser?.uid && <span className="text-emerald"> (you)</span>}
                    </p>
                    <span className={[
                      'inline-block mt-1 px-2 py-0.5 rounded-full font-display text-[8px] uppercase tracking-wider',
                      m.isReady ? 'bg-emerald/15 text-emerald' : 'bg-retro-red/10 text-retro-red',
                    ].join(' ')}>
                      {m.isReady ? 'Ready' : 'Not Ready'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AB straggler line */}
            {stragglers.length > 0 && (
              <p className="font-body text-ink/50 text-sm text-center italic leading-relaxed">
                AB: “Still waiting on {stragglers.slice(0, 2).join(' and ')}
                {stragglers.length > 2 ? ` +${stragglers.length - 2} more` : ''}. Shocking.”
              </p>
            )}

            {/* Lock In */}
            {myMember && !myMember.isReady && (
              <button
                className="btn-retro-xl w-full gap-2 disabled:opacity-50"
                disabled={lockingIn || !myMember.personalGoal?.trim()}
                onClick={() => void handleLockIn()}
              >
                <Lock size={18} strokeWidth={2} aria-hidden="true" />
                {lockingIn ? 'Locking In…' : 'Lock In'}
              </button>
            )}
            {myMember?.isReady && !allReady && (
              <div className="flex items-center justify-center gap-2 py-1">
                <CheckCircle size={15} className="text-emerald" strokeWidth={2} aria-hidden="true" />
                <span className="font-display text-sm text-emerald uppercase tracking-wider">You're Locked In</span>
              </div>
            )}

            {/* Dossier CTA */}
            {myMember && !myMember.dossierComplete && (
              <button className="btn-secondary w-full gap-2" onClick={() => navigate(`/challenge/${id}/dossier`)}>
                <FileText size={16} strokeWidth={1.8} aria-hidden="true" />
                File Your Roast Dossier
              </button>
            )}

            {/* Invite code */}
            {inviteCode && (
              <div className="card-light space-y-3">
                <div className="flex items-center justify-between">
                  <p className="label-light mb-0">Invite Code</p>
                  <span className="font-display text-ink tracking-[0.3em] text-lg">{inviteCode}</span>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary flex-1 text-sm py-3" onClick={() => void handleCopyInvite()}>
                    {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.8} />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <button
                    className="btn-secondary flex-1 text-sm py-3"
                    onClick={async () => {
                      try {
                        await navigator.share({
                          title: `Join: ${challenge.name}`,
                          text: "I'm starting a challenge on Accountabili-Buddies. Join me!",
                          url: `${window.location.origin}/join/${inviteCode}`,
                        })
                      } catch { void handleCopyInvite() }
                    }}
                  >
                    <Share2 size={14} strokeWidth={1.8} aria-hidden="true" /> Share
                  </button>
                </div>
              </div>
            )}

            {/* Member goals list */}
            <ul className="divide-y divide-ink/8">
              {members.map(m => (
                <li key={m.uid} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 rounded-full bg-ink/5 border border-ink/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xs text-ink">{m.firstName[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-ink text-sm">{m.firstName}</p>
                    {m.personalGoal && <p className="font-body text-ink/40 text-xs truncate leading-relaxed">{m.personalGoal}</p>}
                  </div>
                  {m.dossierComplete && <Link2 size={13} className="flex-shrink-0 text-emerald" strokeWidth={1.8} aria-hidden="true" />}
                </li>
              ))}
            </ul>

            {/* Creator deploy (manual override; auto-starts when all ready) */}
            {isCreator && !allReady && (
              <div className="space-y-2">
                <p className="font-body text-ink/50 text-sm text-center leading-relaxed">
                  {allGoalsSet
                    ? 'Starts automatically when everyone locks in.'
                    : `${goalsSetCount}/${members.length} goals set before deploying`}
                </p>
                <button
                  className="btn-outline w-full gap-3 disabled:opacity-40"
                  onClick={() => void handleStartMission()}
                  disabled={starting || !allGoalsSet}
                >
                  <Rocket size={18} strokeWidth={1.8} aria-hidden="true" />
                  {starting ? 'Starting…' : 'Start Now (skip waiting)'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Quick-update modal ── */}
      {currentUser && myMember && (
        <QuickUpdate
          open={quickOpen}
          onClose={() => setQuickOpen(false)}
          onSubmitted={() => void loadData()}
          challengeId={id!}
          uid={currentUser.uid}
          firstName={currentUser.firstName}
          today={today}
          personalGoal={myMember.personalGoal}
          challengeName={challenge.name}
          targetUnit={null}
          otherMembers={otherMembers}
        />
      )}
    </div>
  )
}
