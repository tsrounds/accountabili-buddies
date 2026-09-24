import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  getDocsFromCache,
  increment,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import { todayKey } from './dates'
import { FALLBACK_AVATAR_SEED } from './avatar'
import type {
  AmmoEntry,
  Challenge,
  Checkin,
  DurationType,
  FrequencyPeriod,
  Invite,
  Member,
} from './types'

// No 0/O/1/I — these get read out loud in group chats.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomCode(): string {
  return Array.from(
    crypto.getRandomValues(new Uint8Array(6)),
    (b) => CODE_ALPHABET[b % CODE_ALPHABET.length],
  ).join('')
}

export async function createChallenge(input: {
  name: string
  description: string
  creatorUid: string
  duration: number | null
  durationType: DurationType
}): Promise<{ challengeId: string; code: string }> {
  const ref = await addDoc(collection(db, 'ab_challenges'), {
    ...input,
    status: 'active',
    createdAt: serverTimestamp(),
    startDate: serverTimestamp(),
  })

  // Mint an invite code, retrying the (astronomically unlikely) collision.
  let code = randomCode()
  for (let i = 0; i < 5; i++) {
    const existing = await getDoc(doc(db, 'ab_invites', code))
    if (!existing.exists()) break
    code = randomCode()
  }
  await setDoc(doc(db, 'ab_invites', code), {
    challengeId: ref.id,
    createdAt: serverTimestamp(),
  })
  return { challengeId: ref.id, code }
}

export async function getInvite(code: string): Promise<Invite | null> {
  const snap = await getDoc(doc(db, 'ab_invites', code.toUpperCase()))
  return snap.exists() ? (snap.data() as Invite) : null
}

export async function getInviteCode(challengeId: string): Promise<string | null> {
  const snap = await getDocs(
    query(
      collection(db, 'ab_invites'),
      where('challengeId', '==', challengeId),
      limit(1),
    ),
  )
  return snap.empty ? null : snap.docs[0].id
}

/**
 * Where a read is allowed to come from. 'cache' hits the on-disk Firestore
 * cache only and never touches the network — it resolves in a millisecond or
 * throws if nothing is cached, which is what lets the UI paint before the
 * server answers. 'server' is the normal read.
 */
export type Source = 'server' | 'cache'

export async function getChallenge(
  id: string,
  source: Source = 'server',
): Promise<Challenge | null> {
  const ref = doc(db, 'ab_challenges', id)
  const snap = source === 'cache' ? await getDocFromCache(ref) : await getDoc(ref)
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Challenge) : null
}

function hydrateMember(data: Record<string, unknown>): Member {
  return { avatarSeed: FALLBACK_AVATAR_SEED, ...data } as Member
}

export async function getMember(
  challengeId: string,
  uid: string,
  source: Source = 'server',
): Promise<Member | null> {
  const ref = doc(db, 'ab_challenges', challengeId, 'members', uid)
  const snap = source === 'cache' ? await getDocFromCache(ref) : await getDoc(ref)
  return snap.exists() ? hydrateMember(snap.data()) : null
}

export async function listMembers(
  challengeId: string,
  source: Source = 'server',
): Promise<Member[]> {
  const ref = collection(db, 'ab_challenges', challengeId, 'members')
  const snap = source === 'cache' ? await getDocsFromCache(ref) : await getDocs(ref)
  return snap.docs.map((d) => hydrateMember(d.data()))
}

export async function listCheckins(
  challengeId: string,
  source: Source = 'server',
): Promise<Checkin[]> {
  const ref = collection(db, 'ab_challenges', challengeId, 'checkins')
  const snap = source === 'cache' ? await getDocsFromCache(ref) : await getDocs(ref)
  return snap.docs.map((d) => d.data() as Checkin)
}

export async function joinChallenge(
  challengeId: string,
  input: {
    uid: string
    firstName: string
    avatarSeed: string
    personalGoal: string
    targetFrequency: number
    frequencyPeriod: FrequencyPeriod
  },
): Promise<void> {
  await setDoc(doc(db, 'ab_challenges', challengeId, 'members', input.uid), {
    ...input,
    joinedAt: serverTimestamp(),
  })
  await setDoc(
    doc(db, 'ab_challenges', challengeId, 'leaderboard', input.uid),
    {
      uid: input.uid,
      firstName: input.firstName,
      avatarSeed: input.avatarSeed,
      totalCheckins: 0,
      lastCheckinDate: '',
    },
    { merge: true },
  )
}

/** One check-in per person per day, keyed {uid}_{YYYY-MM-DD}. */
export async function checkInToday(
  challengeId: string,
  uid: string,
  firstName: string,
  avatarSeed: string,
  note: string,
): Promise<void> {
  const date = todayKey()
  await setDoc(doc(db, 'ab_challenges', challengeId, 'checkins', `${uid}_${date}`), {
    uid,
    firstName,
    date,
    note,
    createdAt: serverTimestamp(),
  })
  await setDoc(
    doc(db, 'ab_challenges', challengeId, 'leaderboard', uid),
    {
      uid,
      firstName,
      avatarSeed,
      totalCheckins: increment(1),
      lastCheckinDate: date,
    },
    { merge: true },
  )
}

/** Backdate a check-in to a specific past date. Same dedup key as today's. */
export async function checkInForDate(
  challengeId: string,
  uid: string,
  firstName: string,
  avatarSeed: string,
  date: string,
  note: string,
): Promise<void> {
  await setDoc(doc(db, 'ab_challenges', challengeId, 'checkins', `${uid}_${date}`), {
    uid,
    firstName,
    date,
    note,
    createdAt: serverTimestamp(),
  })
  await setDoc(
    doc(db, 'ab_challenges', challengeId, 'leaderboard', uid),
    {
      uid,
      firstName,
      avatarSeed,
      totalCheckins: increment(1),
      lastCheckinDate: date,
    },
    { merge: true },
  )
}

/**
 * Push an edited name/avatar onto a member's denormalized copies (member +
 * leaderboard docs) so the leaderboard reflects a profile change without a
 * fresh check-in. The canonical value still lives on ab_users/{uid}.
 */
export async function updateMemberProfile(
  challengeId: string,
  uid: string,
  patch: { firstName: string; avatarSeed: string },
): Promise<void> {
  await Promise.all([
    setDoc(doc(db, 'ab_challenges', challengeId, 'members', uid), patch, {
      merge: true,
    }),
    setDoc(doc(db, 'ab_challenges', challengeId, 'leaderboard', uid), patch, {
      merge: true,
    }),
  ])
}

export async function submitAmmoAnswer(
  challengeId: string,
  input: {
    aboutUid: string
    aboutFirstName: string
    byUid: string
    byFirstName: string
    questionId: string
    question: string
    answer: string
  },
): Promise<void> {
  await addDoc(collection(db, 'ab_challenges', challengeId, 'ammo'), {
    ...input,
    createdAt: serverTimestamp(),
  })
}

export async function listAmmoForMember(
  challengeId: string,
  aboutUid: string,
): Promise<AmmoEntry[]> {
  const snap = await getDocs(
    query(
      collection(db, 'ab_challenges', challengeId, 'ammo'),
      where('aboutUid', '==', aboutUid),
    ),
  )
  return snap.docs
    .map((d) => d.data() as AmmoEntry)
    .sort(
      (a, b) =>
        (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0),
    )
}

/** Ammo entries authored by `byUid`. Powers the new-buddy nudge. */
export async function listAmmoByAuthor(
  challengeId: string,
  byUid: string,
): Promise<AmmoEntry[]> {
  const snap = await getDocs(
    query(
      collection(db, 'ab_challenges', challengeId, 'ammo'),
      where('byUid', '==', byUid),
    ),
  )
  return snap.docs.map((d) => d.data() as AmmoEntry)
}

export async function endChallenge(challengeId: string): Promise<void> {
  await updateDoc(doc(db, 'ab_challenges', challengeId), { status: 'complete' })
}

/** Hide (or restore) a completed challenge from this member's own Home. */
export async function setChallengeArchived(
  challengeId: string,
  uid: string,
  archived: boolean,
): Promise<void> {
  await setDoc(
    doc(db, 'ab_challenges', challengeId, 'members', uid),
    { archived },
    { merge: true },
  )
}

/**
 * Every challenge (active or complete) this user belongs to, newest first
 * (small group: few docs, so an N+1 membership check per challenge is fine).
 */
export async function listMyChallenges(
  uid: string,
): Promise<{ challenge: Challenge; member: Member }[]> {
  const snap = await getDocs(collection(db, 'ab_challenges'))
  const docs = snap.docs.sort((a, b) => {
    const aTime = a.data().createdAt?.toMillis?.() ?? 0
    const bTime = b.data().createdAt?.toMillis?.() ?? 0
    return bTime - aTime
  })
  const members = await Promise.all(docs.map((d) => getMember(d.id, uid)))
  return docs.flatMap((d, i) => {
    const member = members[i]
    return member ? [{ challenge: { id: d.id, ...d.data() } as Challenge, member }] : []
  })
}
