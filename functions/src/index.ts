import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { getMessaging, type MulticastMessage } from 'firebase-admin/messaging'
import { logger } from 'firebase-functions/v2'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'

initializeApp()
const db = getFirestore()

// All user-visible strings live here so voice tweaks don't hunt through logic.
const COPY = {
  checkin: (checkerFirstName: string, challengeName: string) => ({
    title: `${checkerFirstName} just checked in`,
    body: `${challengeName} moved without you. Fix that.`,
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
 * Trigger 1 — someone checked in. Notify every other member of the same
 * challenge so peer pressure compounds in real time.
 *
 * Guards:
 *  - Backdated check-ins (a `date` field earlier than today in LA) don't
 *    fanout — a friend filling in yesterday's log at midnight shouldn't wake
 *    everyone up. Today is computed in America/Los_Angeles because that's
 *    the group's home timezone.
 *  - `onDocumentCreated` already prevents re-notifying if the same doc is
 *    ever rewritten.
 */
export const onCheckinCreated = onDocumentCreated(
  'ab_challenges/{challengeId}/checkins/{checkinId}',
  async (event) => {
    const checkin = event.data?.data() as
      | { uid?: string; firstName?: string; date?: string }
      | undefined
    if (!checkin?.uid) return

    const todayLA = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
    }).format(new Date())
    if (checkin.date && checkin.date !== todayLA) return

    const { challengeId } = event.params as { challengeId: string }
    const [challengeSnap, membersSnap] = await Promise.all([
      db.doc(`ab_challenges/${challengeId}`).get(),
      db.collection(`ab_challenges/${challengeId}/members`).get(),
    ])
    if (!challengeSnap.exists) return
    const challengeName =
      (challengeSnap.data()?.name as string) ?? 'your challenge'

    const otherUids = membersSnap.docs
      .map((d) => d.id)
      .filter((id) => id !== checkin.uid)
    if (otherUids.length === 0) return

    await sendToUsers(
      otherUids,
      COPY.checkin(checkin.firstName ?? 'Someone', challengeName),
      { challengeId, date: checkin.date ?? todayLA, kind: 'checkin' },
    )
  },
)

/**
 * Trigger 2 — a new member joins a challenge. Notify every existing member
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
