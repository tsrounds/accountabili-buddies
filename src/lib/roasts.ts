import type Anthropic from '@anthropic-ai/sdk'
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { todayKey } from './dates'
import { listAmmoForMember } from './challenges'
import {
  ROAST_MODEL,
  callDailyRoastApi,
  fallbackRoasts,
  positiveLine,
  type RoastMemberInput,
} from './roastPrompt'
import type {
  Challenge,
  MemberStanding,
  RankChange,
  RoastDoc,
  RoastEntry,
} from './types'

const GOSSIP_SAMPLE_SIZE = 3

// Bumped whenever generation logic changes materially — the enlarged
// fallback pools, the batch-uniqueness rule in the LLM prompt, or a
// post-processing pass. A read that finds an older version regenerates.
const ROAST_SCHEMA_VERSION = 2

// Client-side by design: tiny private friend group, no Cloud Functions.
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined
export const aiEnabled = Boolean(apiKey)

// SDK loads lazily so it stays out of the main bundle — it's only needed
// by whoever generates today's roasts first.
let clientPromise: Promise<Anthropic> | null = null
function getClient(): Promise<Anthropic> | null {
  if (!apiKey) return null
  clientPromise ??= import('@anthropic-ai/sdk').then(
    (m) => new m.default({ apiKey, dangerouslyAllowBrowser: true }),
  )
  return clientPromise
}

async function toRoastInput(
  s: MemberStanding,
  challengeId: string,
): Promise<RoastMemberInput> {
  const ammo = await listAmmoForMember(challengeId, s.uid)
  return {
    uid: s.uid,
    firstName: s.firstName,
    avatarSeed: s.avatarSeed,
    personalGoal: s.personalGoal,
    checkedInToday: s.checkedInToday,
    rank: s.rank,
    completionPct: s.completionPct,
    streak: s.streak,
    gossip:
      ammo.length > 0
        ? ammo.slice(0, GOSSIP_SAMPLE_SIZE).map((a) => a.answer)
        : undefined,
  }
}

/**
 * Lazy, write-once daily roasts: first viewer generates and writes,
 * everyone else reads the cached doc. Pass `force` to regenerate — the cache is
 * per-day, so a partial run would otherwise be served for the rest of the day.
 */
export async function getOrGenerateDailyRoasts(
  challenge: Challenge,
  standings: MemberStanding[],
  options: { force?: boolean } = {},
): Promise<RoastDoc | null> {
  const date = todayKey()
  const ref = doc(db, 'ab_challenges', challenge.id, 'roasts', date)
  if (options.force) {
    await deleteDoc(ref).catch(() => {})
  } else {
    const snap = await getDoc(ref)
    if (snap.exists()) {
      const cached = snap.data() as RoastDoc
      // Ignore caches from before the current generation logic — they'd
      // otherwise pin the group to the old pools / pre-uniqueness prompt
      // for the rest of the day.
      if ((cached.schemaVersion ?? 1) >= ROAST_SCHEMA_VERSION) return cached
    }
  }
  if (standings.length === 0) return null

  // Fetch gossip only AFTER the cache-hit early return above, so the
  // common case (everyone reads the same cached doc) doesn't hit the
  // ammo subcollection.
  const inputs = await Promise.all(
    standings.map((s) => toRoastInput(s, challenge.id)),
  )
  let entries: RoastEntry[]
  try {
    const client = aiEnabled ? await getClient() : null
    entries = client
      ? await callDailyRoastApi(client, challenge.name, inputs)
      : fallbackRoasts(inputs, date)
  } catch (err) {
    console.error('roast generation failed, using fallback', err)
    entries = fallbackRoasts(inputs, date)
  }

  await setDoc(ref, {
    date,
    generatedAt: serverTimestamp(),
    entries,
    schemaVersion: ROAST_SCHEMA_VERSION,
  })
  return (await getDoc(ref)).data() as RoastDoc
}

/**
 * After a user checks in, flip their entry in today's cached roast doc to a
 * positive tone so "Today's roasts" reflects reality on the next read. No-op
 * if today's doc hasn't been generated yet — the first viewer will pick up
 * the fresh checkedInToday state naturally.
 */
export async function patchEntryAfterCheckin(
  challenge: Challenge,
  uid: string,
  firstName: string,
  personalGoal: string,
): Promise<void> {
  const date = todayKey()
  const ref = doc(db, 'ab_challenges', challenge.id, 'roasts', date)
  const snap = await getDoc(ref)
  if (!snap.exists()) return

  const existing = snap.data() as RoastDoc
  const line = positiveLine({ uid, firstName, personalGoal }, date)
  const entries = existing.entries.map((e) =>
    e.uid === uid ? { ...e, checkedIn: true, roast: line } : e,
  )
  await setDoc(ref, { ...existing, entries, schemaVersion: ROAST_SCHEMA_VERSION })
}

/** Paragraph-length dramatic recap for the weekly dispatch. */
export async function generateWeeklyRoast(input: {
  challengeName: string
  weekNumber: number
  weekStart: string
  weekEnd: string
  rows: { firstName: string; weekCheckins: number; totalCheckins: number }[]
  hero: string
  slacker: string
  rankChanges: RankChange[]
  recentRoasts: string[]
}): Promise<string> {
  const climber = input.rankChanges.find((c) => c.delta < 0)
  const faller = input.rankChanges.find((c) => c.delta > 0)
  const moverLine =
    climber || faller
      ? ` ${climber ? `${climber.firstName} climbed from #${climber.from} to #${climber.to}. ` : ''}${
          faller ? `${faller.firstName} slid from #${faller.from} to #${faller.to}.` : ''
        }`.trim()
      : ''
  const fallback = `Week ${input.weekNumber} of "${input.challengeName}" is in the books. ${input.hero} carried the team with a suspicious amount of enthusiasm, while ${input.slacker} treated the check-in button like it owed them money.${moverLine ? ' ' + moverLine : ''} Everyone else hovered comfortably in the mediocre middle, which the mascot notes is exactly where mediocre people hover.`

  const client = await getClient()
  if (!client) return fallback
  try {
    const response = await client.messages.create({
      model: ROAST_MODEL,
      max_tokens: 600,
      system: `You write the "Roast of the Week" column for Accountabili-Buddies, a friend-group accountability app. Voice: deadpan, passive-aggressive sports-desk correspondent filing a report nobody asked for. One single paragraph, 3-5 sentences, no headings, no lists, no markdown. Dramatize the week's highlights and lowlights. Funny, never cruel. If rank movement is provided, name the biggest climber and biggest faller by first name — this is the whole point of a weekly recap.`,
      messages: [
        {
          role: 'user',
          content: `Write the Week ${input.weekNumber} roast recap.

Challenge: "${input.challengeName}"
Week window: ${input.weekStart} → ${input.weekEnd}
Hero of the week: ${input.hero}
Slacker of the week: ${input.slacker}

Weekly numbers:
${JSON.stringify(input.rows, null, 2)}

Rank movement vs previous week (empty = first recap, skip movement talk):
${JSON.stringify(input.rankChanges, null, 2)}

A sample of this week's daily roasts, for continuity of grudges:
${input.recentRoasts.slice(0, 12).join('\n')}

Return only the paragraph.`,
        },
      ],
    })
    if (response.stop_reason === 'refusal') return fallback
    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()
    return text || fallback
  } catch (err) {
    console.error('weekly roast failed, using fallback', err)
    return fallback
  }
}
