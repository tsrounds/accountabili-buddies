import type Anthropic from '@anthropic-ai/sdk'
import type { RoastEntry } from './types'

// Everything in here is deliberately free of Firebase imports so it can run
// server-side (scripts/preview-roasts.ts) as well as in the browser.

export const ROAST_MODEL = 'claude-sonnet-4-6'

export const ROAST_SYSTEM = `You are the roast writer for Accountabili-Buddies, a social accountability app. Your tone is a deadpan, passive-aggressive friend who cares but expresses it exclusively through sarcasm. Think of a bored angel-devil hybrid reading a performance report.

Rules:
- One roast per person, 1-2 sentences max
- Roast formula: Status Call-Out + Social Comparison + Personal Goal Sting
- Never actually cruel — funny and motivating, the kind of thing you'd laugh at in a group chat
- Reference their specific goal when possible
- If they checked in: backhanded compliment
- If they didn't: theatrical disappointment
- If they're leading: imply obsession or overcompensation
- If they're last: weaponize the gap between them and everyone else
- If a "gossip" array is present, weave ONE line from it into the roast — paraphrase it as an insider aside, don't quote it verbatim, keep the same never-cruel tone. If no gossip is provided, ignore this rule.

Respond ONLY with a JSON array, no markdown, no preamble.`

export interface RoastMemberInput {
  uid: string
  firstName: string
  avatarSeed: string
  personalGoal: string
  checkedInToday: boolean
  rank: number
  completionPct: number
  streak: number
  /** Raw gossip lines from the ammo step. LLM-only — never referenced in fallbacks. */
  gossip?: string[]
}

export function extractJson(text: string): string {
  // Tolerate accidental fences or preamble — grab the outermost array.
  const start = text.indexOf('[')
  const end = text.lastIndexOf(']')
  if (start === -1 || end === -1) throw new Error('no JSON array in response')
  return text.slice(start, end + 1)
}

/** Canned deadpan lines so the app degrades gracefully with no API key. */
export function fallbackLine(m: RoastMemberInput): string {
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

export function fallbackRoasts(members: RoastMemberInput[]): RoastEntry[] {
  // Deliberately does NOT reference m.gossip — unmoderated user input only
  // reaches output through the LLM's tone-controlled generation.
  return members.map((m) => ({
    uid: m.uid,
    firstName: m.firstName,
    avatarSeed: m.avatarSeed,
    checkedIn: m.checkedInToday,
    roast: fallbackLine(m),
  }))
}

/**
 * Generates one roast per member. The Anthropic client is injected so the
 * browser can pass a `dangerouslyAllowBrowser` client and Node can pass a
 * plain one.
 */
export async function callDailyRoastApi(
  client: Anthropic,
  challengeName: string,
  members: RoastMemberInput[],
): Promise<RoastEntry[]> {
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
      avatarSeed: m.avatarSeed,
      checkedIn: m.checkedInToday,
      roast: match?.roast ?? fallbackLine(m),
    }
  })
}
