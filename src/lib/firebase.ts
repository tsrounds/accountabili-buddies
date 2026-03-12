// ─────────────────────────────────────────────────────────────────────────────
// Firebase — bracket-anything project
//
// Firestore collection naming convention (ab_ prefix for all collections):
//   ab_users        — user profiles: { uid, firstName, phone, createdAt, avatarUrl }
//   ab_challenges   — challenges + subcollections: members, checkins, leaderboard, dossiers
//   ab_invites      — 6-char alphanumeric invite codes → { challengeId }
//   ab_dispatches   — weekly dispatch data: { challengeId, weekNum, data }
//   ab_notifications — sent SMS log (for rate-limiting and debugging)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

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
export const storage = getStorage(app)
export const analytics = getAnalytics(app)
export default app
