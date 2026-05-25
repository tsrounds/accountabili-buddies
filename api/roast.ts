import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

// POST /api/roast — generates AB's personalized commentary via Claude.
// Contract (from the design doc):
//   { userName, roastFuel: string[], goalDescription, currentStreak,
//     missedDays, friendsProgress: {name, progress}[], trigger }
// Returns: { roast: string }
//
// The model is the doc's "Claude Sonnet". Override with ANTHROPIC_MODEL.

type Trigger = 'missed_checkin' | 'streak_milestone' | 'friend_comparison' | 'completion'

interface RoastRequest {
  userName?: string
  roastFuel?: string[]
  goalDescription?: string
  currentStreak?: number
  missedDays?: number
  friendsProgress?: { name: string; progress: number }[]
  trigger?: Trigger
}

const SYSTEM_PROMPT =
  "You are AB, a sassy accountability mascot. You're round, grumpy, and " +
  'brutally honest. You have tiny wings that can\'t possibly support your body, ' +
  "and you're aware of this. You roast people who slack off using their own " +
  'personal details against them. Keep it under 2 sentences. Be funny, never ' +
  'mean-spirited. You secretly care.'

function buildPrompt(body: RoastRequest): string {
  const {
    userName = 'this person',
    roastFuel = [],
    goalDescription = 'their goal',
    currentStreak = 0,
    missedDays = 0,
    friendsProgress = [],
    trigger = 'missed_checkin',
  } = body

  const lines: string[] = []
  lines.push(`Target: ${userName}`)
  lines.push(`Their goal: ${goalDescription}`)
  if (roastFuel.length) {
    lines.push(`Personal details they gave you to use against them:`)
    roastFuel.forEach((f) => lines.push(`- ${f}`))
  }
  lines.push(`Current streak: ${currentStreak} day(s)`)
  lines.push(`Days missed recently: ${missedDays}`)
  if (friendsProgress.length) {
    lines.push(
      `Friends' progress: ${friendsProgress
        .map((f) => `${f.name} at ${f.progress}%`)
        .join(', ')}`,
    )
  }

  const ask: Record<Trigger, string> = {
    missed_checkin: `They just missed a check-in. Roast them using their personal details.`,
    streak_milestone: `They hit a ${currentStreak}-day streak. Grudgingly congratulate them.`,
    friend_comparison: `Compare them unfavorably to their friends' progress above.`,
    completion: `The challenge is over. Deliver your final verdict on them.`,
  }
  lines.push('')
  lines.push(ask[trigger] ?? ask.missed_checkin)
  return lines.join('\n')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Signal the client to fall back to local templates.
    res.status(503).json({ error: 'roast_unavailable' })
    return
  }

  try {
    const client = new Anthropic({ apiKey })
    const body = (req.body ?? {}) as RoastRequest

    const message = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6',
      max_tokens: 200,
      thinking: { type: 'disabled' },
      output_config: { effort: 'low' },
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: buildPrompt(body) }],
    })

    const roast = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()

    res.status(200).json({ roast })
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status ?? 500 : 500
    res.status(status).json({ error: 'roast_failed' })
  }
}
