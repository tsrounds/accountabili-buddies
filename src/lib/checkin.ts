import {
  doc, getDoc, setDoc, updateDoc, increment, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sendCheckinBlast } from '@/lib/notifications'
import { nextStreak } from '@/lib/streaks'

export interface OtherMember {
  uid: string
  firstName: string
  personalGoal: string
  goToExcuse?: string
  biggestWeakness?: string
}

export interface SubmitCheckinParams {
  challengeId: string
  uid: string
  firstName: string
  today: string
  completed: boolean
  value: number | null
  note: string
  personalGoal: string
  challengeName: string
  otherMembers: OtherMember[]
}

/**
 * Records a check-in and updates the leaderboard. A "did it" (`completed`)
 * increments the total and extends the streak; a "didn't do it" logs honestly
 * but resets the streak and doesn't count toward the total.
 */
export async function submitCheckin(p: SubmitCheckinParams): Promise<void> {
  const checkinRef = doc(db, 'ab_challenges', p.challengeId, 'checkins', `${p.uid}_${p.today}`)
  const leaderboardRef = doc(db, 'ab_challenges', p.challengeId, 'leaderboard', p.uid)

  await setDoc(checkinRef, {
    uid: p.uid,
    firstName: p.firstName,
    date: p.today,
    completed: p.completed,
    value: p.value,
    note: p.note.trim(),
    createdAt: serverTimestamp(),
  })

  const lbSnap = await getDoc(leaderboardRef)
  const prev = lbSnap.exists() ? lbSnap.data() : null
  const prevStreak = (prev?.currentStreak as number | undefined) ?? 0
  const prevBest = (prev?.bestStreak as number | undefined) ?? 0
  const prevLast = prev?.lastCheckinDate as string | undefined

  const newStreak = p.completed ? nextStreak(prevStreak, prevLast, p.today) : 0
  const newBest = Math.max(prevBest, newStreak)

  if (lbSnap.exists()) {
    await updateDoc(leaderboardRef, {
      ...(p.completed ? { totalCheckins: increment(1) } : {}),
      currentStreak: newStreak,
      bestStreak: newBest,
      lastCheckinDate: p.today,
    })
  } else {
    await setDoc(leaderboardRef, {
      uid: p.uid,
      firstName: p.firstName,
      totalCheckins: p.completed ? 1 : 0,
      currentStreak: newStreak,
      bestStreak: newBest,
      lastCheckinDate: p.today,
    })
  }

  if (p.completed && p.otherMembers.length > 0) {
    void sendCheckinBlast({
      checkinUid: p.uid,
      checkinName: p.firstName,
      checkinGoal: p.personalGoal || 'their mission goal',
      challengeId: p.challengeId,
      challengeName: p.challengeName,
      otherMembers: p.otherMembers,
    })
  }
}
