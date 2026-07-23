import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { addDays, dateKey, isoWeekId, weekRange } from './dates'
import { generateWeeklyRoast } from './roasts'
import type {
  Challenge,
  Checkin,
  DispatchDoc,
  DispatchLeaderboardRow,
  Member,
  RoastDoc,
} from './types'

/** Pull the last 7 daily roast docs for grudge continuity. */
async function recentRoastLines(challengeId: string): Promise<string[]> {
  const lines: string[] = []
  for (let i = 0; i < 7; i++) {
    const key = dateKey(addDays(new Date(), -i))
    const snap = await getDoc(doc(db, 'ab_challenges', challengeId, 'roasts', key))
    if (snap.exists()) {
      const data = snap.data() as RoastDoc
      for (const e of data.entries) lines.push(`${e.firstName}: ${e.roast}`)
    }
  }
  return lines
}

/**
 * Lazy weekly dispatch: if this ISO week's doc doesn't exist, the first
 * viewer computes stats, asks the AI for a recap, and writes it.
 */
export async function getOrGenerateDispatch(
  challenge: Challenge,
  members: Member[],
  checkins: Checkin[],
): Promise<DispatchDoc | null> {
  const weekId = isoWeekId()
  const ref = doc(db, 'ab_dispatches', `${challenge.id}_${weekId}`)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data() as DispatchDoc
  if (members.length === 0) return null

  const { start, end } = weekRange()
  const startKey = dateKey(start)
  const endKey = dateKey(end)

  const rows: DispatchLeaderboardRow[] = members
    .map((m) => {
      const mine = checkins.filter((c) => c.uid === m.uid)
      return {
        uid: m.uid,
        firstName: m.firstName,
        totalCheckins: new Set(mine.map((c) => c.date)).size,
        weekCheckins: new Set(
          mine.filter((c) => c.date >= startKey && c.date <= endKey).map((c) => c.date),
        ).size,
      }
    })
    .sort((a, b) => b.weekCheckins - a.weekCheckins || b.totalCheckins - a.totalCheckins)

  const hero = rows[0]
  const slacker = rows[rows.length - 1]

  const roastOfTheWeek = await generateWeeklyRoast({
    challengeName: challenge.name,
    weekStart: startKey,
    weekEnd: endKey,
    rows,
    hero: hero.firstName,
    slacker: slacker.firstName,
    recentRoasts: await recentRoastLines(challenge.id),
  })

  const dispatch = {
    challengeId: challenge.id,
    challengeName: challenge.name,
    weekId,
    weekStart: startKey,
    weekEnd: endKey,
    generatedAt: serverTimestamp(),
    leaderboard: rows,
    roastOfTheWeek,
    heroOfTheWeek: { uid: hero.uid, firstName: hero.firstName, weekCheckins: hero.weekCheckins },
    slackerOfTheWeek: {
      uid: slacker.uid,
      firstName: slacker.firstName,
      weekCheckins: slacker.weekCheckins,
    },
    totalMembers: members.length,
  }
  await setDoc(ref, dispatch)
  return (await getDoc(ref)).data() as DispatchDoc
}
