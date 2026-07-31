/**
 * Preview daily roasts for a group, without a browser, Vite, Firestore or auth.
 *
 *   npm run roasts                  # 5 members, live API
 *   npm run roasts -- --members=8   # bigger room
 *   npm run roasts -- --fallback    # canned lines, no API call
 *
 * Reads VITE_ANTHROPIC_API_KEY from .env.local.
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import Anthropic from '@anthropic-ai/sdk'
import {
  callDailyRoastApi,
  fallbackRoasts,
  type RoastMemberInput,
} from '../src/lib/roastPrompt'

const CHALLENGE_NAME = 'Testing'

// A pool deliberately covering every branch of the prompt: leader, mid-pack,
// zero-progress, long streak, and total ghost.
const POOL: Omit<RoastMemberInput, 'rank'>[] = [
  { uid: 'u1', firstName: 'Diana', avatarSeed: 'seed-diana', personalGoal: 'Read 30 pages before bed', checkedInToday: true, completionPct: 92, streak: 12 },
  { uid: 'u2', firstName: 'Marcus', avatarSeed: 'seed-marcus', personalGoal: 'Run 3 miles every morning', checkedInToday: true, completionPct: 71, streak: 5 },
  { uid: 'u3', firstName: 'Sam', avatarSeed: 'seed-sam', personalGoal: 'Write 500 words of my novel', checkedInToday: true, completionPct: 58, streak: 3 },
  { uid: 'u4', firstName: 'Teddy', avatarSeed: 'seed-teddy', personalGoal: 'Stretch for 10 minutes', checkedInToday: false, completionPct: 44, streak: 0 },
  { uid: 'u5', firstName: 'Jorge', avatarSeed: 'seed-jorge', personalGoal: 'No fast food for a month', checkedInToday: false, completionPct: 21, streak: 0 },
  { uid: 'u6', firstName: 'Priya', avatarSeed: 'seed-priya', personalGoal: 'Meditate 15 minutes daily', checkedInToday: false, completionPct: 0, streak: 0 },
  { uid: 'u7', firstName: 'Nina', avatarSeed: 'seed-nina', personalGoal: 'Practice guitar every evening', checkedInToday: true, completionPct: 66, streak: 7 },
  { uid: 'u8', firstName: 'Omar', avatarSeed: 'seed-omar', personalGoal: 'Swim twice a week', checkedInToday: false, completionPct: 33, streak: 0 },
]

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`))
  return hit?.split('=')[1]
}

function loadApiKey(): string | undefined {
  try {
    const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
    for (const line of env.split('\n')) {
      const [k, ...rest] = line.split('=')
      if (k?.trim() === 'VITE_ANTHROPIC_API_KEY') return rest.join('=').trim()
    }
  } catch {
    /* no .env.local — fall through */
  }
  return process.env.VITE_ANTHROPIC_API_KEY
}

function buildMembers(count: number): RoastMemberInput[] {
  return POOL.slice(0, Math.min(count, POOL.length))
    .sort((a, b) => b.completionPct - a.completionPct)
    .map((m, i) => ({ ...m, rank: i + 1 }))
}

async function main() {
  const count = Number(arg('members') ?? 5)
  const useFallback = process.argv.includes('--fallback')
  const members = buildMembers(count)

  console.log(`\nChallenge: "${CHALLENGE_NAME}"  ·  ${members.length} members`)
  console.log(useFallback ? 'Mode: canned fallback lines\n' : 'Mode: live Anthropic API\n')

  let entries
  if (useFallback) {
    entries = fallbackRoasts(members)
  } else {
    const apiKey = loadApiKey()
    if (!apiKey) {
      console.error('No VITE_ANTHROPIC_API_KEY in .env.local. Use --fallback to preview canned lines.')
      process.exit(1)
    }
    const started = Date.now()
    entries = await callDailyRoastApi(new Anthropic({ apiKey }), CHALLENGE_NAME, members)
    console.log(`(generated in ${((Date.now() - started) / 1000).toFixed(1)}s)\n`)
  }

  for (const e of entries) {
    const m = members.find((x) => x.uid === e.uid)!
    const status = e.checkedIn ? 'SHOWED UP' : 'M.I.A.   '
    console.log(`#${m.rank}  ${status}  ${e.firstName}  (${m.completionPct}%, streak ${m.streak})`)
    console.log(`         goal: ${m.personalGoal}`)
    console.log(`         ${e.roast}\n`)
  }
}

main().catch((err) => {
  console.error('\nFailed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
