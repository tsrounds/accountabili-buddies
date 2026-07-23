import type Anthropic from '@anthropic-ai/sdk'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { todayKey } from './dates'
import type { Challenge, MemberStanding, RoastDoc, RoastEntry } from './types'

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

const ROAST_MODEL = 'claude-sonnet-4-6'

const ROAST_SYSTEM = `You are the roast writer for Accountabili-Buddies, a social accountability app. Your tone is a deadpan, passive-aggressive friend who cares but expresses it exclusively through sarcasm. Think of a bored angel-devil hybrid reading a performance report.

Rules:
- One roast per person, 1-2 sentences max
- Roast formula: Status Call-Out + Social Comparison + Personal Goal Sting
- Never actually cruel — funny and motivating, the kind of thing you'd laugh at in a group chat
- Reference their specific goal when possible
- If they checked in: backhanded compliment
- If they didn't: theatrical disappointment
- If they're leading: imply obsession or overcompensation
- If they're last: weaponize the gap between them and everyone else

Respond ONLY with a JSON array, no markdown, no preamble.`

interface RoastMemberInput {
  uid: string
  firstName: string
  personalGoal: string
  checkedInToday: boolean
  rank: number
  completionPct: number
  streak: number
}

function toRoastInput(s: MemberStanding): RoastMemberInput {
  return {
    uid: s.uid,
    firstName: s.firstName,
    personalGoal: s.personalGoal,
    checkedInToday: s.checkedInToday,
    rank: s.rank,
    completionPct: s.completionPct,
    streak: s.streak,
  }
}

function extractJson(text: string): string {
  // Tolerate accidental fences or preamble — grab the outermost array.
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start === -1 || end === -1) throw new Error('no JSON array in response')
  return text.slice(start, end + 1)
}

async function callDailyRoastApi(
  challengeName: string,
  members: RoastMemberInput[],
): Promise<RoastEntry[]> {
  const client = await getClient()
  if (!client) throw new Error('AI disabled')
  const response = await client.messages.create({
    model: ROAST_MODEL,
    max_tokens: 1000,
    system: ROAST_SYSTEM,
    messages: [
      {
        role: 'user',
        content: `Generate today's roasts.

Challenge: "${challengeName}"

Members:
${JSON.stringify(members, null, 2)}

Return: [{ "uid": "...", "firstName": "...", "roast": "..." }]`,
      },
    ],
  })
  if (response.stop_reason === 'refusal') throw new Error('model refused')
  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
  const parsed = JSON.parse(extractJson(text)) as {
    uid: string
    firstName: string
    roast: string
  }[]

  return members.map((m) => {
    const match = parsed.find((p) => p.uid === m.uid || p.firstName === m.firstName)
    return {
      uid: m.uid,
      firstName: m.firstName,
      checkedIn: m.checkedInToday,
      roast: match?.roast ?? fallbackLine(m),
    }
  })
}

/** Canned deadpan lines so the app degrades gracefully with no API key. */
function fallbackLine(m: RoastMemberInput): string {
  if (m.checkedInToday && m.rank === 1) {
    return `${m.firstName} checked in again and is somehow #1. We get it. You have a calendar.`
  }
  if (m.checkedInToday) {
    return `${m.firstName} actually did “${m.personalGoal}” today. A single tear rolls down the mascot's cheek.`
  }
  if (m.completionPct === 0) {
    return `${m.firstName} has yet to discover the check-in button. It's the big red one, ${m.firstName}.`
  }
  return `No check-in from ${m.firstName} today. “${m.personalGoal}” remains, as ever, aspirational.`
}

function fallbackRoasts(members: RoastMemberInput[]): RoastEntry[] {
  return members.map((m) => ({
    uid: m.uid,
    firstName: m.firstName,
    checkedIn: m.checkedInToday,
    roast: fallbackLine(m),
  }))
}

/**
 * Lazy, write-once daily roasts: first viewer generates and writes,
 * everyone else reads the cached doc.
 */
export async function getOrGenerateDailyRoasts(
  challenge: Challenge,
  standings: MemberStanding[],
): Promise<RoastDoc | null> {
  const date = todayKey()
  const ref = doc(db, 'ab_challenges', challenge.id, 'roasts', date)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data() as RoastDoc
  if (standings.length === 0) return null

  const inputs = standings.map(toRoastInput)
  let entries: RoastEntry[]
  try {
    entries = aiEnabled
      ? await callDailyRoastApi(challenge.name, inputs)
      : fallbackRoasts(inputs)
  } catch (err) {
    console.error('roast generation failed, using fallback', err)
    entries = fallbackRoasts(inputs)
  }

  await setDoc(ref, { date, generatedAt: serverTimestamp(), entries })
  return (await getDoc(ref)).data() as RoastDoc
}

/** Paragraph-length dramatic recap for the weekly dispatch. */
export async function generateWeeklyRoast(input: {
  challengeName: string
  weekStart: string
  weekEnd: string
  rows: { firstName: string; weekCheckins: number; totalCheckins: number }[]
  hero: string
  slacker: string
  recentRoasts: string[]
}): Promise<string> {
  const fallback = `Another week in "${input.challengeName}" is in the books. ${input.hero} carried the team with a suspicious amount of enthusiasm, while ${input.slacker} treated the check-in button like it owed them money. Everyone else hovered comfortably in the mediocre middle, which the mascot notes is exactly where mediocre people hover.`

  const client = await getClient()
  if (!client) return fallback
  try {
    const response = await client.messages.create({
      model: ROAST_MODEL,
      max_tokens: 600,
      system: `You write the "Roast of the Week" column for Accountabili-Buddies, a friend-group accountability app. Voice: deadpan, passive-aggressive sports-desk correspondent filing a report nobody asked for. One single paragraph, 3-5 sentences, no headings, no lists, no markdown. Dramatize the week's highlights and lowlights. Funny, never cruel.`,
      messages: [
        {
          role: 'user',
          content: `Write this week's roast recap.

Challenge: "${input.challengeName}" (week ${input.weekStart} → ${input.weekEnd})
Hero of the week: ${input.hero}
Slacker of the week: ${input.slacker}

Weekly numbers:
${JSON.stringify(input.rows, null, 2)}

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
