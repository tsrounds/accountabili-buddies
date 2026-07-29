#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import os from 'os'
import https from 'https'

const PROJECT_ID = 'accountabili-buddies'
const INVITE_CODE = 'NAM4JU'

// ── Get access token from Firebase CLI's stored refresh token ──
const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const refreshToken = config.tokens?.refresh_token
if (!refreshToken) throw new Error('No Firebase refresh token found — run `firebase login` first')

// Firebase CLI uses its own OAuth client ID
const CLIENT_ID = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com'
const CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi'

async function getAccessToken() {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }).toString()

  return new Promise((resolve, reject) => {
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        const json = JSON.parse(data)
        if (json.access_token) resolve(json.access_token)
        else reject(new Error('Token exchange failed: ' + data))
      })
    })
    req.on('error', reject)
    req.end(body)
  })
}

// ── Firestore REST helpers ──
let accessToken

function firestoreUrl(docPath) {
  return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${docPath}`
}

async function firestoreGet(docPath) {
  return new Promise((resolve, reject) => {
    const req = https.request(firestoreUrl(docPath), {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 400) reject(new Error(`GET ${docPath}: ${res.statusCode} ${data}`))
        else resolve(JSON.parse(data))
      })
    })
    req.on('error', reject)
    req.end()
  })
}

async function firestoreSet(docPath, fields) {
  const body = JSON.stringify({ fields: toFirestoreFields(fields) })
  return new Promise((resolve, reject) => {
    const url = new URL(firestoreUrl(docPath))
    const req = https.request(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 400) reject(new Error(`SET ${docPath}: ${res.statusCode} ${data}`))
        else resolve(JSON.parse(data))
      })
    })
    req.on('error', reject)
    req.end(body)
  })
}

function toFirestoreFields(obj) {
  const fields = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') fields[key] = { stringValue: value }
    else if (typeof value === 'number' && Number.isInteger(value)) fields[key] = { integerValue: String(value) }
    else if (typeof value === 'number') fields[key] = { doubleValue: value }
    else if (typeof value === 'boolean') fields[key] = { booleanValue: value }
    else if (value instanceof Date) fields[key] = { timestampValue: value.toISOString() }
    else if (value === null) fields[key] = { nullValue: null }
  }
  return fields
}

// ── Fake members ──
const now = new Date()
const today = now.toISOString().slice(0, 10) // 2026-07-27
const yesterday = new Date(now - 86400000).toISOString().slice(0, 10)

const FAKE_MEMBERS = [
  {
    uid: 'fake-marcus-01',
    firstName: 'Marcus',
    personalGoal: 'Run 3 miles every morning',
    targetFrequency: 1,
    frequencyPeriod: 'per_day',
    totalCheckins: 18,
    lastCheckinDate: today, // checked in today — should get backhanded compliment
    streak: 5,
  },
  {
    uid: 'fake-diana-02',
    firstName: 'Diana',
    personalGoal: 'Read 30 pages before bed',
    targetFrequency: 5,
    frequencyPeriod: 'per_week',
    totalCheckins: 22,
    lastCheckinDate: today, // leading the pack — should get "we get it" roast
    streak: 12,
  },
  {
    uid: 'fake-jorge-03',
    firstName: 'Jorge',
    personalGoal: 'No fast food for a month',
    targetFrequency: 1,
    frequencyPeriod: 'per_day',
    totalCheckins: 7,
    lastCheckinDate: yesterday, // didn't check in today — MIA roast
    streak: 0,
  },
  {
    uid: 'fake-priya-04',
    firstName: 'Priya',
    personalGoal: 'Meditate 15 minutes daily',
    targetFrequency: 1,
    frequencyPeriod: 'per_day',
    totalCheckins: 3,
    lastCheckinDate: '2026-07-20', // ghosting hard — maximum roast
    streak: 0,
  },
  {
    uid: 'fake-sam-05',
    firstName: 'Sam',
    personalGoal: 'Write 500 words of novel every day',
    targetFrequency: 1,
    frequencyPeriod: 'per_day',
    totalCheckins: 14,
    lastCheckinDate: today, // checked in, mid-pack
    streak: 3,
  },
]

// ── Main ──
async function main() {
  console.log('Getting access token...')
  accessToken = await getAccessToken()
  console.log('Authenticated.')

  // 1. Look up invite to get challenge ID
  console.log(`\nLooking up invite code: ${INVITE_CODE}...`)
  const inviteDoc = await firestoreGet(`ab_invites/${INVITE_CODE}`)
  const challengeId = inviteDoc.fields?.challengeId?.stringValue
  if (!challengeId) {
    console.error('Invite doc:', JSON.stringify(inviteDoc, null, 2))
    throw new Error(`No challengeId found for invite ${INVITE_CODE}`)
  }
  console.log(`Found challenge: ${challengeId}`)

  // 2. Read the challenge doc for context
  const challengeDoc = await firestoreGet(`ab_challenges/${challengeId}`)
  const challengeName = challengeDoc.fields?.name?.stringValue
  console.log(`Challenge name: "${challengeName}"`)

  // 3. Seed members + leaderboard
  console.log('\nSeeding fake members...')
  for (const m of FAKE_MEMBERS) {
    const memberPath = `ab_challenges/${challengeId}/members/${m.uid}`
    await firestoreSet(memberPath, {
      uid: m.uid,
      firstName: m.firstName,
      personalGoal: m.personalGoal,
      targetFrequency: m.targetFrequency,
      frequencyPeriod: m.frequencyPeriod,
      joinedAt: new Date('2026-07-01T00:00:00Z'),
    })
    console.log(`  ✓ Member: ${m.firstName} (${m.uid})`)

    const leaderboardPath = `ab_challenges/${challengeId}/leaderboard/${m.uid}`
    await firestoreSet(leaderboardPath, {
      uid: m.uid,
      firstName: m.firstName,
      totalCheckins: m.totalCheckins,
      lastCheckinDate: m.lastCheckinDate,
    })
    console.log(`  ✓ Leaderboard: ${m.firstName}`)
  }

  // 4. Add some check-ins for today (for members who "checked in")
  console.log('\nSeeding today\'s check-ins...')
  const checkedInMembers = FAKE_MEMBERS.filter((m) => m.lastCheckinDate === today)
  for (const m of checkedInMembers) {
    const checkinId = `${m.uid}_${today}`
    const checkinPath = `ab_challenges/${challengeId}/checkins/${checkinId}`
    await firestoreSet(checkinPath, {
      uid: m.uid,
      firstName: m.firstName,
      date: today,
      note: getCheckinNote(m.firstName),
      createdAt: now,
    })
    console.log(`  ✓ Check-in: ${m.firstName}`)
  }

  // 5. Delete any cached roast for today so fresh ones generate
  console.log('\nClearing cached roast for today...')
  try {
    await firestoreGet(`ab_challenges/${challengeId}/roasts/${today}`)
    // If it exists, delete it via the REST API
    await new Promise((resolve, reject) => {
      const url = firestoreUrl(`ab_challenges/${challengeId}/roasts/${today}`)
      const req = https.request(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      }, (res) => {
        let data = ''
        res.on('data', (chunk) => data += chunk)
        res.on('end', () => {
          if (res.statusCode >= 400 && res.statusCode !== 404) reject(new Error(`DELETE: ${res.statusCode} ${data}`))
          else resolve()
        })
      })
      req.on('error', reject)
      req.end()
    })
    console.log('  ✓ Deleted cached roast')
  } catch {
    console.log('  (no cached roast to delete)')
  }

  console.log('\n✅ Done! Open the challenge dashboard to see roasts for all 5 members.')
  console.log(`   Members seeded: ${FAKE_MEMBERS.map(m => m.firstName).join(', ')}`)
  console.log(`   Checked in today: ${checkedInMembers.map(m => m.firstName).join(', ')}`)
  console.log(`   MIA today: ${FAKE_MEMBERS.filter(m => m.lastCheckinDate !== today).map(m => m.firstName).join(', ')}`)
}

function getCheckinNote(name) {
  const notes = {
    Marcus: 'Ran 3.2 miles, beat yesterday\'s time!',
    Diana: 'Finished chapter 12 of Dune. Getting good.',
    Sam: 'Wrote 650 words today. The villain is taking shape.',
  }
  return notes[name] || 'Done!'
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
