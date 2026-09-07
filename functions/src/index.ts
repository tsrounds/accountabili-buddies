import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { getMessaging, type MulticastMessage } from 'firebase-admin/messaging'
import { logger } from 'firebase-functions/v2'
import {
  onDocumentCreated,
  onDocumentWritten,
} from 'firebase-functions/v2/firestore'
import { onSchedule } from 'firebase-functions/v2/scheduler'

initializeApp()
const db = getFirestore()

// All user-visible strings live here so voice tweaks don't hunt through logic.
const COPY = {
  roast: {
    title: "Today's roast is live",
    body: 'The mascot has words for you.',
  },
  nudge: (challengeName: string) => ({
    title: 'Check-in missing',
    body: `${challengeName} is watching. You've got a few hours.`,
  }),
  join: (newFirstName: string, challengeName: string) => ({
    title: 'New buddy joined',
    body: `${newFirstName} just joined ${challengeName}. Judgement incoming.`,
  }),
} as const

/**
 * Fan out one notification to every FCM token registered on every uid, then
 * prune the tokens FCM rejected as stale (uninstalled apps, revoked
 * permissions) so the next send doesn't keep hitting dead endpoints.
 */
async function sendToUsers(
  uids: string[],
  notification: { title: string; body: string },
  data: Record<string, string> = {},
): Promise<void> {
  if (uids.length === 0) return

  const unique = Array.from(new Set(uids))
  const userSnaps = await Promise.all(
    unique.map((uid) => db.doc(`ab_users/${uid}`).get()),
  )

  // Map every token back to its owning uid so a failure can prune the right doc.
  const tokenOwners: { uid: string; token: string }[] = []
  for (const snap of userSnaps) {
    if (!snap.exists) continue
    const tokens = (snap.data()?.fcmTokens as string[] | undefined) ?? []
    for (const token of tokens) tokenOwners.push({ uid: snap.id, token })
  }
  if (tokenOwners.length === 0) return

  const message: MulticastMessage = {
    tokens: tokenOwners.map((o) => o.token),
    notification,
    data,
    webpush: {
      fcmOptions: { link: '/' },
      notification: { icon: '/icons/icon-192.png' },
    },
  }

  const response = await getMessaging().sendEachForMulticast(message)

  const prunes = new Map<string, string[]>()
  response.responses.forEach((r, i) => {
    if (r.success) return
    const code = r.error?.code
    if (
      code === 'messaging/registration-token-not-registered' ||
      code === 'messaging/invalid-registration-token'
    ) {
      const { uid, token } = tokenOwners[i]
      const arr = prunes.get(uid) ?? []
      arr.push(token)
      prunes.set(uid, arr)
    } else if (r.error) {
      logger.warn('FCM send error', {
        uid: tokenOwners[i].uid,
        code,
        error: r.error.message,
      })
    }
  })

  await Promise.all(
    Array.from(prunes.entries()).map(([uid, bad]) =>
      db
        .doc(`ab_users/${uid}`)
        .update({ fcmTokens: FieldValue.arrayRemove(...bad) }),
    ),
  )

  logger.info('FCM multicast complete', {
    recipients: unique.length,
    tokens: tokenOwners.length,
    sent: response.successCount,
    failed: response.failureCount,
    pruned: Array.from(prunes.values()).reduce((n, a) => n + a.length, 0),
  })
}

/**
 * Trigger 1 — a new daily roast lands. Fires only on first create so a manual
 * regeneration (force=true in getOrGenerateDailyRoasts) doesn't re-notify.
 */
export const onRoastPublished = onDocumentWritten(
  'ab_challenges/{challengeId}/roasts/{date}',
  async (event) => {
    if (!event.data?.after.exists) return
    if (event.data.before?.exists) return

    const doc = event.data.after.data() as {
      date: string
      entries: { uid: string }[]
    }
    const uids = (doc.entries ?? []).map((e) => e.uid).filter(Boolean)
    if (uids.length === 0) return

    await sendToUsers(uids, COPY.roast, {
      challengeId: event.params.challengeId,
      date: doc.date,
      kind: 'roast',
    })
  },
)

/**
 * Trigger 2 — nightly nudge. NOTE: `todayKey()` in the client is device-local,
 * not LA-locked. We compute today in America/Los_Angeles server-side, which
 * matches an LA user's browser but drifts for members in other timezones.
 * Acceptable for a small friend group.
 */
export const onDailyMissedCheckins = onSchedule(
  { schedule: '0 18 * * *', timeZone: 'America/Los_Angeles' },
  async () => {
    // en-CA emits ISO YYYY-MM-DD natively, so no reshaping needed.
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
    }).format(new Date())

    const challenges = await db
      .collection('ab_challenges')
      .where('status', '==', 'active')
      .get()

    for (const challengeDoc of challenges.docs) {
      const challengeName =
        (challengeDoc.data().name as string) ?? 'your challenge'
      const members = await challengeDoc.ref.collection('members').get()

      const missing: string[] = []
      await Promise.all(
        members.docs.map(async (m) => {
          const snap = await challengeDoc.ref
            .collection('checkins')
            .doc(`${m.id}_${today}`)
            .get()
          if (!snap.exists) missing.push(m.id)
        }),
      )
      if (missing.length === 0) continue

      await sendToUsers(missing, COPY.nudge(challengeName), {
        challengeId: challengeDoc.id,
        date: today,
        kind: 'nudge',
      })
    }
  },
)

/**
 * Trigger 3 — a new member joins a challenge. Notify every existing member
 * except the joiner themselves.
 */
export const onMemberJoined = onDocumentCreated(
  'ab_challenges/{challengeId}/members/{uid}',
  async (event) => {
    const { challengeId, uid: newUid } = event.params as {
      challengeId: string
      uid: string
    }
    const newMember = event.data?.data() as { firstName?: string } | undefined
    if (!newMember) return

    const [challengeSnap, membersSnap] = await Promise.all([
      db.doc(`ab_challenges/${challengeId}`).get(),
      db.collection(`ab_challenges/${challengeId}/members`).get(),
    ])
    if (!challengeSnap.exists) return
    const challengeName =
      (challengeSnap.data()?.name as string) ?? 'a challenge'

    const otherUids = membersSnap.docs
      .map((d) => d.id)
      .filter((id) => id !== newUid)
    if (otherUids.length === 0) return

    await sendToUsers(
      otherUids,
      COPY.join(newMember.firstName ?? 'Someone', challengeName),
      { challengeId, kind: 'join' },
    )
  },
)
