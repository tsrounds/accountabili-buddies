import type { Timestamp } from 'firebase/firestore'

export interface UserProfile {
  uid: string
  email: string
  firstName: string
  avatarSeed: string
  isAdmin: boolean
  createdAt: Timestamp
}

export type DurationType = 'fixed' | 'ongoing'
export type ChallengeStatus = 'active' | 'complete'
export type FrequencyPeriod = 'per_day' | 'per_week' | 'per_month'

export interface Challenge {
  id: string
  name: string
  description: string
  creatorUid: string
  duration: number | null
  durationType: DurationType
  status: ChallengeStatus
  createdAt: Timestamp
  startDate: Timestamp
}

export interface Member {
  uid: string
  firstName: string
  avatarSeed?: string
  personalGoal: string
  targetFrequency: number
  frequencyPeriod: FrequencyPeriod
  joinedAt: Timestamp
}

export interface Checkin {
  uid: string
  firstName: string
  date: string // YYYY-MM-DD
  note: string
  createdAt: Timestamp
}

export interface LeaderboardDoc {
  uid: string
  firstName: string
  totalCheckins: number
  lastCheckinDate: string
}

export interface RoastEntry {
  uid: string
  firstName: string
  checkedIn: boolean
  roast: string
}

export interface RoastDoc {
  date: string
  generatedAt: Timestamp
  entries: RoastEntry[]
}

export interface DispatchLeaderboardRow {
  uid: string
  firstName: string
  totalCheckins: number
  weekCheckins: number
}

export interface DispatchDoc {
  challengeId: string
  challengeName: string
  weekId: string // YYYY-Www
  weekStart: string // YYYY-MM-DD (Monday)
  weekEnd: string // YYYY-MM-DD (Sunday)
  generatedAt: Timestamp
  leaderboard: DispatchLeaderboardRow[]
  roastOfTheWeek: string
  heroOfTheWeek: { uid: string; firstName: string; weekCheckins: number }
  slackerOfTheWeek: { uid: string; firstName: string; weekCheckins: number }
  totalMembers: number
}

export interface Invite {
  challengeId: string
  createdAt: Timestamp
}

/** Everything the dashboard needs about one member, derived client-side. */
export interface MemberStanding {
  uid: string
  firstName: string
  avatarSeed?: string
  personalGoal: string
  targetFrequency: number
  frequencyPeriod: FrequencyPeriod
  totalCheckins: number
  completionPct: number
  streak: number
  checkedInToday: boolean
  rank: number
}
