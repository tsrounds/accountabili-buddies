import { randomInt } from 'node:crypto'
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { getMessaging, type MulticastMessage } from 'firebase-admin/messaging'
import { logger } from 'firebase-functions/v2'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { HttpsError, onCall } from 'firebase-functions/v2/https'

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

// ─────────────────── device-pairing handoff ───────────────────
//
// Lets an already-signed-in tab hand its session to a freshly-installed
// home-screen icon (iOS partitions that icon's storage away from Safari, so
// it never sees the tab's session) without repeating email verification.

// Excludes 0/O/1/I/L — easy to misread when copying a code off one phone
// screen onto another.
const PAIRING_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const PAIRING_CODE_LENGTH = 8
const PAIRING_CODE_TTL_MS = 10 * 60 * 1000

function generatePairingCode(): string {
  let code = ''
  for (let i = 0; i < PAIRING_CODE_LENGTH; i++) {
    code += PAIRING_CODE_ALPHABET[randomInt(PAIRING_CODE_ALPHABET.length)]
  }
  return code
}

// Deliberately NOT prefixed "ab_" — the deployed Firestore rules grant any
// signed-in user (anonymous auth included) read/write on every `ab_*`
// collection. A code doc carries a plaintext uid, so a client that could
// write one directly would let anyone mint their own "pairing" to someone
// else's account, bypassing this function entirely. Staying outside that
// prefix keeps it covered by Firestore's default-deny instead.
const PAIRING_CODES_COLLECTION = 'pairing_codes'

/** Mint a single-use pairing code for the caller's own account. */
export const createPairingCode = onCall(async (request) => {
  const uid = request.auth?.uid
  if (!uid) throw new HttpsError('unauthenticated', 'Sign in first.')

  const code = generatePairingCode()
  const expiresAt = Date.now() + PAIRING_CODE_TTL_MS
  await db.doc(`${PAIRING_CODES_COLLECTION}/${code}`).set({
    uid,
    createdAt: FieldValue.serverTimestamp(),
    expiresAt,
    used: false,
  })
  return { code, expiresAt }
})

/**
 * Redeem a pairing code for a custom auth token. No caller auth required —
 * this IS the sign-in step. Single-use and 10-minute-lived, so the 8-char
 * code space (~1.1e12 combinations) can't be brute-forced in the window.
 */
export const redeemPairingCode = onCall(async (request) => {
  const raw = (request.data as { code?: string } | undefined)?.code
  const code = raw?.trim().toUpperCase()
  if (!code) throw new HttpsError('invalid-argument', 'Missing code.')

  const ref = db.doc(`${PAIRING_CODES_COLLECTION}/${code}`)
  const uid = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    if (!snap.exists) {
      throw new HttpsError('not-found', 'That code is wrong or expired.')
    }
    const data = snap.data() as { uid: string; used: boolean; expiresAt: number }
    if (data.used) {
      throw new HttpsError('failed-precondition', 'That code was already used.')
    }
    if (data.expiresAt < Date.now()) {
      throw new HttpsError('deadline-exceeded', 'That code expired.')
    }
    tx.update(ref, { used: true })
    return data.uid
  })

  const token = await getAuth().createCustomToken(uid)
  return { token }
})
