import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import {
  addDays,
  dateKey,
  previousIsoWeekId,
  previousWeekRange,
  weekNumberSinceStart,
} from './dates'
import { generateWeeklyRoast } from './roasts'
import type {
  Challenge,
  Checkin,
  DispatchDoc,
  DispatchLeaderboardRow,
  Member,
  RankChange,
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

/** Diff two ordered leaderboards and surface the biggest movers. */
function computeRankChanges(
  prior: DispatchLeaderboardRow[],
  current: DispatchLeaderboardRow[],
): RankChange[] {
  const priorRank = new Map<string, number>()
  prior.forEach((row, i) => priorRank.set(row.uid, i + 1))
  const changes: RankChange[] = []
  current.forEach((row, i) => {
    const to = i + 1
    const from = priorRank.get(row.uid)
    if (from === undefined || from === to) return
    changes.push({ uid: row.uid, firstName: row.firstName, from, to, delta: to - from })
  })
  changes.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
  return changes
}

/**
 * Lazy weekly dispatch of the PREVIOUS completed week. First viewer on/after
 * that week's Monday computes stats, asks the AI for a recap, and writes it.
 */
export async function getOrGenerateDispatch(
  challenge: Challenge,
  members: Member[],
  checkins: Checkin[],
): Promise<DispatchDoc | null> {
  const weekId = previousIsoWeekId()
  const ref = doc(db, 'ab_dispatches', `${challenge.id}_${weekId}`)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data() as DispatchDoc
  if (members.length === 0) return null

  const { start, end } = previousWeekRange()
  const startKey = dateKey(start)
  const endKey = dateKey(end)

  // Guard: challenge must have started before or during the week we're recapping.
  const challengeStart = challenge.startDate?.toDate?.() ?? new Date(0)
  if (challengeStart > end) return null

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

  // Pull the week-before-that's dispatch (if it exists) to compute rank movement.
  const priorWeekId = previousIsoWeekId(addDays(start, -1))
  const priorRef = doc(db, 'ab_dispatches', `${challenge.id}_${priorWeekId}`)
  const priorSnap = await getDoc(priorRef)
  const rankChanges = priorSnap.exists()
    ? computeRankChanges((priorSnap.data() as DispatchDoc).leaderboard, rows)
    : []

  const weekNumber = weekNumberSinceStart(challengeStart, end)

  const roastOfTheWeek = await generateWeeklyRoast({
    challengeName: challenge.name,
    weekNumber,
    weekStart: startKey,
    weekEnd: endKey,
    rows,
    hero: hero.firstName,
    slacker: slacker.firstName,
    rankChanges,
    recentRoasts: await recentRoastLines(challenge.id),
  })

  const dispatch: DispatchDoc = {
    challengeId: challenge.id,
    challengeName: challenge.name,
    weekId,
    weekStart: startKey,
    weekEnd: endKey,
    // serverTimestamp() returns a sentinel; Firestore fills it in on write.
    generatedAt: serverTimestamp() as unknown as DispatchDoc['generatedAt'],
    leaderboard: rows,
    roastOfTheWeek,
    heroOfTheWeek: { uid: hero.uid, firstName: hero.firstName, weekCheckins: hero.weekCheckins },
    slackerOfTheWeek: {
      uid: slacker.uid,
      firstName: slacker.firstName,
      weekCheckins: slacker.weekCheckins,
    },
    totalMembers: members.length,
    weekNumber,
    rankChanges,
  }
  await setDoc(ref, dispatch)
  return (await getDoc(ref)).data() as DispatchDoc
}
