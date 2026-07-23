// ─────────────────────────────────────────────────────────────────
// Firebase — shared `bracket-anything` project.
//
// Firestore namespace (ab_ prefix on every collection):
//   ab_users                                  — user profiles
//   ab_challenges/{id}                        — challenges
//   ab_challenges/{id}/members/{uid}          — per-member goal + frequency
//   ab_challenges/{id}/checkins/{uid}_{date}  — daily check-ins
//   ab_challenges/{id}/leaderboard/{uid}      — running totals
//   ab_challenges/{id}/roasts/{date}          — cached daily AI roasts
//   ab_dispatches/{challengeId}_{weekId}      — weekly dispatch docs
//   ab_invites/{code}                         — 6-char invite codes
// ─────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyChMQGS-CLl9vp-SysXFFbXIdWlgK_kCqU',
  authDomain: 'bracket-anything.firebaseapp.com',
  projectId: 'bracket-anything',
  storageBucket: 'bracket-anything.firebasestorage.app',
  messagingSenderId: '2568511991',
  appId: '1:2568511991:web:7d07a72a2d634df2e1cef2',
  measurementId: 'G-ZMKQCSK02D',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
