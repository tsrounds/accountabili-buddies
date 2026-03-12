// ─────────────────────────────────────────────────────────────────────────────
// Accountabili-Buddies — Cloud Functions
//
// weeklyDispatch  — Sunday 20:00 UTC: generate weekly stats + write ab_dispatches
// mondayNudge     — Monday 08:00 UTC: write "new dispatch ready" notification to each member
// ─────────────────────────────────────────────────────────────────────────────

import { onSchedule } from 'firebase-functions/v2/scheduler'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'

initializeApp()

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns ISO week identifier string, e.g. "2026-W10" */
function getWeekId(d: Date): string {
  const date = new Date(d)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCDate(date.getUTCDate() + 3 - ((date.getUTCDay() + 6) % 7))
  const week1 = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const weekNum =
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getUTCDay() + 6) % 7)) /
        7
    )
  return `${date.getUTCFullYear()}-W${String(weekNum).padStart(2, '0')}`
}

/** Returns the Monday of the ISO week containing d, as YYYY-MM-DD */
function weekStartDate(d: Date): string {
  const date = new Date(d)
  const day = date.getUTCDay() // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day
  date.setUTCDate(date.getUTCDate() + diff)
  return date.toISOString().slice(0, 10)
}

/** Returns the Sunday of the ISO week containing d, as YYYY-MM-DD */
function weekEndDate(d: Date): string {
  const start = new Date(weekStartDate(d))
  start.setUTCDate(start.getUTCDate() + 6)
  return start.toISOString().slice(0, 10)
}

interface LeaderboardEntry {
  uid: string
  firstName: string
  totalCheckins: number
  lastCheckinDate: string
}

// ── Sunday 20:00 UTC — Generate weekly dispatch ───────────────────────────────

export const weeklyDispatch = onSchedule(
  { schedule: '0 20 * * 0', timeZone: 'UTC', region: 'us-central1' },
  async () => {
    const db = getFirestore()
    const now = new Date()
    const weekId = getWeekId(now)
    const weekStart = weekStartDate(now)
    const weekEnd = weekEndDate(now)

    // All active challenges
    const challengesSnap = await db
      .collection('ab_challenges')
      .where('status', '==', 'active')
      .get()

    console.log(`weeklyDispatch: processing ${challengesSnap.size} active challenges — ${weekId}`)

    for (const challengeDoc of challengesSnap.docs) {
      const challenge = challengeDoc.data()
      const challengeId = challengeDoc.id
      const challengeName = (challenge.name as string) ?? 'Unknown Mission'

      // Leaderboard
      const lbSnap = await db
        .collection(`ab_challenges/${challengeId}/leaderboard`)
        .get()

      const entries: LeaderboardEntry[] = lbSnap.docs
        .map((d) => ({
          uid: d.id,
          firstName: (d.data().firstName as string) ?? 'Recruit',
          totalCheckins: (d.data().totalCheckins as number) ?? 0,
          lastCheckinDate: (d.data().lastCheckinDate as string) ?? '',
        }))
        .sort((a, b) => b.totalCheckins - a.totalCheckins)

      // Count checkins this week for each member
      const checkinCountByUid: Record<string, number> = {}
      const checkinDaysByUid: Record<string, string[]> = {}

      const checkinsSnap = await db
        .collection(`ab_challenges/${challengeId}/checkins`)
        .where('date', '>=', weekStart)
        .where('date', '<=', weekEnd)
        .get()

      for (const c of checkinsSnap.docs) {
        const uid = (c.data().uid as string) ?? ''
        const date = (c.data().date as string) ?? ''
        if (!uid) continue
        checkinCountByUid[uid] = (checkinCountByUid[uid] ?? 0) + 1
        if (!checkinDaysByUid[uid]) checkinDaysByUid[uid] = []
        checkinDaysByUid[uid].push(date)
      }

      // Member uid list
      const membersSnap = await db
        .collection(`ab_challenges/${challengeId}/members`)
        .get()
      const memberUids = membersSnap.docs.map((d) => (d.data().uid as string) ?? d.id)

      // Enrich leaderboard with this-week counts
      const enrichedEntries = entries.map((e) => ({
        ...e,
        weekCheckins: checkinCountByUid[e.uid] ?? 0,
        weekDays: checkinDaysByUid[e.uid] ?? [],
      }))

      const dispatchId = `${weekId}_${challengeId}`

      await db.doc(`ab_dispatches/${dispatchId}`).set({
        dispatchId,
        weekId,
        weekStart,
        weekEnd,
        challengeId,
        challengeName,
        generatedAt: Timestamp.now(),
        leaderboard: enrichedEntries,
        totalMembers: memberUids.length,
        memberUids, // enables array-contains queries on the client
      })

      console.log(`  Wrote ab_dispatches/${dispatchId}`)
    }
  }
)

// ── Monday 08:00 UTC — Nudge: "Your weekly dispatch is ready" ────────────────

export const mondayNudge = onSchedule(
  { schedule: '0 8 * * 1', timeZone: 'UTC', region: 'us-central1' },
  async () => {
    const db = getFirestore()
    const now = new Date()
    const weekId = getWeekId(now)

    // Find all dispatches for this week
    const dispatchesSnap = await db
      .collection('ab_dispatches')
      .where('weekId', '==', weekId)
      .get()

    console.log(`mondayNudge: ${dispatchesSnap.size} dispatches for ${weekId}`)

    const batch = db.batch()
    let notifCount = 0

    for (const dispatchDoc of dispatchesSnap.docs) {
      const dispatch = dispatchDoc.data()
      const challengeId = dispatch.challengeId as string
      const challengeName = dispatch.challengeName as string
      const memberUids = (dispatch.memberUids as string[]) ?? []
      const leaderboard = (dispatch.leaderboard as LeaderboardEntry[]) ?? []

      const leader = leaderboard[0]

      for (const uid of memberUids) {
        const rank = leaderboard.findIndex((e) => e.uid === uid) + 1
        const entry = leaderboard.find((e) => e.uid === uid)

        let message = `Weekly Dispatch is ready for ${challengeName}. `
        if (leader && entry) {
          if (rank === 1) {
            message += `You're leading with ${entry.totalCheckins} total check-ins. Your buddies are gunning for you.`
          } else {
            message += `You're #${rank} with ${entry.totalCheckins} check-ins. ${leader.firstName} leads with ${leader.totalCheckins}. Close the gap.`
          }
        } else {
          message += `See how your squad stacked up this week.`
        }

        const notifRef = db.collection('ab_notifications').doc()
        batch.set(notifRef, {
          recipientUid: uid,
          type: 'weekly_dispatch',
          message,
          challengeId,
          challengeName,
          weekId,
          dispatchId: dispatchDoc.id,
          read: false,
          createdAt: FieldValue.serverTimestamp(),
        })
        notifCount++
      }
    }

    await batch.commit()
    console.log(`mondayNudge: wrote ${notifCount} notifications`)
  }
)
