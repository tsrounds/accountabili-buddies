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
- UNIQUENESS: Every roast in the batch must be structurally distinct. Even when multiple people share the same status (e.g., three people at 0% with no check-ins), no two roasts may share their opening beat, main verb, metaphor, or punchline shape. Vary sentence structure, imagery, and the angle of the sting. Repetition is the one thing the mascot won't forgive.

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

// Pools of deadpan lines used when the LLM is unavailable OR when we need a
// deterministic per-user line (e.g., the post-check-in celebration). Every
// entry supports {name} and {goal} tokens. Uniqueness across the batch comes
// from picking a distinct slot per member — see fallbackRoasts below.

const POOL_ZERO_NO_CHECKIN = [
  `{name} has yet to discover the check-in button. It's the big red one, {name}.`,
  `Zero check-ins from {name}. A truly Zen commitment to doing absolutely nothing.`,
  `{name} continues to circle "{goal}" like a shark that lost interest in blood.`,
  `The check-in button and {name} remain strangers. A meet-cute for the ages.`,
  `{name}'s participation graph is a flat line. Medically concerning, honestly.`,
  `{name} treats "{goal}" the way most people treat their New Year's resolutions in March.`,
  `{name} is playing the long game, where "the long game" means never starting.`,
  `Statistically, {name} might be a myth. No check-in has ever confirmed otherwise.`,
  `Somewhere out there, {name} is thinking about "{goal}." Somewhere else, the button waits.`,
  `{name}'s streak of not checking in is, admittedly, impressive in its consistency.`,
  `The mascot filed a missing persons report on {name}. It was denied for lack of evidence they ever existed here.`,
  `{name}, quietly redefining "{goal}" as a suggestion rather than an activity.`,
]

const POOL_PARTIAL_NO_CHECKIN = [
  `No check-in from {name} today. "{goal}" remains, as ever, aspirational.`,
  `{name} took a rest day. From a challenge. Bold.`,
  `{name} skipped today. "{goal}" waves politely as it drifts further out to sea.`,
  `{name}'s check-in is currently pending, in the way a package from 2019 is pending.`,
  `{name} sat this one out. The mascot noted it in a small, sad notebook.`,
  `{name}'s momentum on "{goal}" is now officially a Newton's Cradle of one ball.`,
  `Today, {name} chose vibes over verification. Unfortunately the app tracks the latter.`,
  `{name}'s previous check-ins are looking at today's absence like it's a stranger at family dinner.`,
  `The chart shows {name} hit pause. On what, no one is sure.`,
  `{name} let today go. "{goal}" is being very mature about it.`,
  `A gap appears in {name}'s record today, tastefully arranged.`,
  `{name}'s check-in for today is currently in the shape of not existing.`,
]

const POOL_CHECKED_IN_LEADER = [
  `{name} checked in again and is somehow #1. We get it. You have a calendar.`,
  `{name} at #1, powered by a suspicious enthusiasm for "{goal}" and possibly nothing else.`,
  `#1 is {name}, who has clearly decided personality is optional if the streak is long enough.`,
  `{name} continues to run away with the leaderboard like it owes them money.`,
  `The mascot would like to remind {name} that being #1 in an accountability app is not a personality.`,
  `{name} extends the lead. "{goal}" nervously texted the other goals about it.`,
  `{name} at #1 again. The consistency is starting to feel like a threat.`,
  `The rest of the group is nine train stops behind {name}, who is already home doing "{goal}" a second time.`,
]

const POOL_CHECKED_IN_GENERIC = [
  `{name} actually did "{goal}" today. A single tear rolls down the mascot's cheek.`,
  `{name} showed up. Somewhere, a habit tracker plays a tiny violin in celebration.`,
  `Check-in received from {name}. The mascot is trying not to look impressed.`,
  `{name} did the thing. The mascot has been informed and is processing the emotions.`,
  `{name} checked in and did "{goal}" like it wasn't even a big deal. It was, {name}. It was.`,
  `{name} logged today's effort. The leaderboard nods approvingly, if reluctantly.`,
  `Today, {name} did "{goal}" and told us about it. Both are noted.`,
  `{name}'s check-in is in. The mascot has updated its permanent record, grudgingly.`,
  `{name} showed up for "{goal}" today. It was almost embarrassing how much the mascot liked it.`,
  `A check-in from {name}. Weather advisory: mild pride, chance of "keep it up."`,
  `{name} did it. Not making a big thing of it. But definitely making a thing of it.`,
  `{name} clocked in. "{goal}" clocked in. Everyone clocked in. Beautiful.`,
]

const POOL_POSITIVE_CELEBRATION = [
  `Look at {name}, doing "{goal}" like a professional. The mascot is furious with pride.`,
  `{name} stamped it. The mascot pretends not to care, then goes and cries in the wings closet.`,
  `Check-in confirmed. {name}, you're making everyone else look bad. Please continue.`,
  `{name} showed up and did the thing. The universe adjusts one very small dial in your favor.`,
  `Today's version of {name} did "{goal}." The rest of you owe today's {name} a thank-you card.`,
  `{name} came, {name} saw, {name} tapped the button. Textbook.`,
  `The mascot smiled. It was small. But it happened. Because {name} checked in.`,
  `{name} did it. That thing you keep saying you'll do? Yeah. That. Well done.`,
  `Filed under W's: {name} showed up for "{goal}" today. Frame it.`,
  `{name} chose to be the kind of person who checks in. The mascot approves, sarcastically.`,
  `{name} deposited one (1) check-in in the accountability bank. Compound interest is real.`,
  `That's a check-in from {name}. Quietly excellent. Loudly overdue for a compliment.`,
]

function fill(template: string, m: Pick<RoastMemberInput, 'firstName' | 'personalGoal'>): string {
  return template.replaceAll('{name}', m.firstName).replaceAll('{goal}', m.personalGoal)
}

/** Small deterministic hash — same seed always yields the same index. */
function hashIndex(seed: string, mod: number): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h % mod
}

function pickPool(m: RoastMemberInput): string[] {
  if (m.checkedInToday && m.rank === 1) return POOL_CHECKED_IN_LEADER
  if (m.checkedInToday) return POOL_CHECKED_IN_GENERIC
  if (m.completionPct === 0) return POOL_ZERO_NO_CHECKIN
  return POOL_PARTIAL_NO_CHECKIN
}

/** Deterministic per-member line — stable across renders, unique per person. */
export function fallbackLine(m: RoastMemberInput, seedSuffix = ''): string {
  const pool = pickPool(m)
  return fill(pool[hashIndex(m.uid + seedSuffix, pool.length)], m)
}

/** A positive line for the post-check-in celebration. Same picker, different pool. */
export function positiveLine(
  m: Pick<RoastMemberInput, 'uid' | 'firstName' | 'personalGoal'>,
  seedSuffix = '',
): string {
  const pool = POOL_POSITIVE_CELEBRATION
  return fill(pool[hashIndex(m.uid + seedSuffix, pool.length)], m)
}

/**
 * Batch fallback: pick each member's line from their own pool while
 * guaranteeing no two members within the same pool land on the same index.
 * A day-scoped seed rotates the picks day-to-day.
 */
export function fallbackRoasts(members: RoastMemberInput[], daySeed = ''): RoastEntry[] {
  // Deliberately does NOT reference m.gossip — unmoderated user input only
  // reaches output through the LLM's tone-controlled generation.
  const usedByPool = new Map<string[], Set<number>>()

  function pickUnique(m: RoastMemberInput): string {
    const pool = pickPool(m)
    let used = usedByPool.get(pool)
    if (!used) {
      used = new Set()
      usedByPool.set(pool, used)
    }
    let idx = hashIndex(m.uid + daySeed, pool.length)
    // Linear-probe past any collision — pools are 8-12 lines, groups are ≤10.
    for (let step = 0; used.has(idx) && step < pool.length; step++) {
      idx = (idx + 1) % pool.length
    }
    used.add(idx)
    return fill(pool[idx], m)
  }

  return members.map((m) => ({
    uid: m.uid,
    firstName: m.firstName,
    avatarSeed: m.avatarSeed,
    checkedIn: m.checkedInToday,
    roast: pickUnique(m),
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
