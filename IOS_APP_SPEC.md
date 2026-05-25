# Accountabili-Buddies — iOS App Spec

## Overview

Build a React Native (Expo) iOS app that replaces the existing React web app at `tsrounds/accountabili-buddies`. The Firebase backend (Firestore, Auth, Cloud Functions) is **fully built and stays unchanged**. This is a frontend-only project.

The app lets users create and join accountability challenges with friends, log daily check-ins, track streaks, and get AI-generated roast commentary from a mascot character.

---

## Guiding Principles

- **Simple and minimal.** Don't add screens, abstractions, or features not listed here.
- **No backend changes.** The Firestore schema, Cloud Functions, and API routes are frozen.
- **Reuse existing business logic.** The streak and progress calculation files copy over verbatim.
- **Ship MVP first.** The dossier, AI mascot, dispatch view, and push notifications are explicitly deferred.

---

## Tech Stack

| Layer | Package | Notes |
|---|---|---|
| Framework | `expo` (SDK 52, managed workflow) | `npx create-expo-app` |
| Language | TypeScript | strict mode |
| Navigation | `@react-navigation/native` + `@react-navigation/bottom-tabs` + `@react-navigation/native-stack` | |
| Firebase Auth | `@react-native-firebase/auth` | |
| Firestore | `@react-native-firebase/firestore` | |
| Styling | `nativewind` v4 + `tailwindcss` | Tailwind class names in RN |
| Icons | `lucide-react-native` | Same icon set as web |
| Storage | `@react-native-async-storage/async-storage` | Replaces localStorage |
| Sharing | `expo-sharing` + `expo-clipboard` | Replaces navigator.share() |
| Animations | `react-native-reanimated` | Replaces framer-motion |

**Do not install:** framer-motion, react-router-dom, vite, any web-only package.

---

## Repository

**GitHub:** `tsrounds/accountabili-buddies`  
**New app lives in:** `/app/` subdirectory of the existing monorepo (sibling to the web `/src/`)  
**Dev branch:** work on `claude/ios-app-refactor-proposal-67ZFI`

Alternatively, create a new standalone repo `tsrounds/accountabili-buddies-app` — whichever is cleaner. Ask the user before creating a new repo.

---

## Firebase Project

**Project ID:** `bracket-anything`  
**Auth domain:** `bracket-anything.firebaseapp.com`  
**Storage bucket:** `bracket-anything.firebasestorage.app`  
**Messaging sender ID:** `2568511991`  
**Web app ID:** `1:2568511991:web:7d07a72a2d634df2e1cef2`  

For the iOS app, a **new iOS app** must be registered in Firebase Console to get a `GoogleService-Info.plist`. Steps:
1. Firebase Console → Project Settings → Add app → iOS
2. Bundle ID: `com.tsrounds.accountabilibuddies` (confirm with user)
3. Download `GoogleService-Info.plist` and place at project root
4. `@react-native-firebase` reads this automatically after `expo prebuild`

**Note:** The existing web `apiKey` / `appId` in the web source are web-client credentials. The iOS app gets its own credentials via `GoogleService-Info.plist`. Do not copy the web credentials into the RN app.

---

## Environment Variables

| Variable | Where set | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | Vercel (existing) / Firebase Functions env | Already set — roast API is a serverless function, not called client-side |
| `EXPO_PUBLIC_API_URL` | `.env` | Base URL for the `/api/roast` endpoint |

The roast endpoint is `https://<vercel-deployment>/api/roast` (POST). The mobile app calls it via `fetch`. The user must provide the deployed Vercel URL.

---

## Firestore Schema (Read-Only Reference)

Collections use `ab_` prefix. **Do not change this schema.**

```
ab_users/{uid}
  uid, firstName, phone, createdAt, avatarUrl, deviceIds[]

ab_challenges/{challengeId}
  name, creatorUid, creatorFirstName, duration, durationType,
  visibility, proofType, category, description,
  status ("lobby"|"active"|"complete"), createdAt, startDate

  /members/{uid}
    uid, firstName, personalGoal, targetFrequency, frequencyPeriod,
    isReady, joinedAt, dossierComplete, friendIntelComplete

  /checkins/{uid_YYYY-MM-DD}
    uid, firstName, date, completed (bool), value (optional), note, createdAt

  /leaderboard/{uid}
    uid, firstName, totalCheckins, lastCheckinDate, currentStreak, bestStreak

  /dossiers/{uid}
    uid, firstName, goToExcuse, biggestWeakness,
    friendIntel{[buddyUid]: string}, completedAt

ab_invites/{6-char-code}
  challengeId, createdAt

ab_dispatches/{dispatchId}
  dispatchId, weekId, weekStart, weekEnd, challengeId, challengeName,
  generatedAt, leaderboard[], totalMembers, memberUids[]

ab_notifications/{notificationId}
  recipientUid, type, message, challengeId, challengeName, read, createdAt
```

---

## Business Logic to Copy Verbatim

These files from `src/lib/` in the web repo contain pure TypeScript with no browser dependencies. Copy them unchanged into `lib/` in the RN app.

- `lib/streaks.ts` — streak calculation (currentStreak, bestStreak)
- `lib/progress.ts` — progress %, target total, member health ("MIA" | "Behind" | "On track")

**Week ID format:** ISO 8601 — `"YYYY-Www"` (e.g. `"2025-W21"`). Same logic as web.

---

## Project Structure

```
accountabili-buddies-app/
├── app.json                    # Expo config (bundle ID, splash, icons)
├── GoogleService-Info.plist    # iOS Firebase credentials (not committed)
├── tailwind.config.js
├── babel.config.js
├── tsconfig.json
├── .env                        # EXPO_PUBLIC_API_URL
│
├── lib/
│   ├── firebase.ts             # react-native-firebase init
│   ├── streaks.ts              # copied verbatim from web
│   └── progress.ts             # copied verbatim from web
│
├── types/
│   └── index.ts                # Challenge, Member, Checkin, etc. — copy from web
│
├── components/
│   ├── Card.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   └── LoadingSpinner.tsx
│
└── screens/
    ├── LoginScreen.tsx
    ├── HomeScreen.tsx
    ├── ChallengeDetailScreen.tsx
    ├── CheckInScreen.tsx
    ├── CreateChallengeScreen.tsx
    ├── JoinChallengeScreen.tsx
    └── ProfileScreen.tsx
```

---

## Navigation Structure

```
Root Stack
├── LoginScreen          (unauthenticated users)
└── MainTabs             (authenticated users)
    ├── Tab: Home
    │   └── Stack
    │       ├── HomeScreen
    │       └── ChallengeDetailScreen
    │           └── CheckInScreen (pushed, not tab)
    ├── Tab: Create
    │   └── CreateChallengeScreen
    ├── Tab: Join
    │   └── JoinChallengeScreen
    └── Tab: Profile
        └── ProfileScreen
```

The root navigator switches between `LoginScreen` and `MainTabs` based on Firebase auth state. No dedicated splash — show a full-screen loading indicator while auth resolves.

---

## Screen Specs

### LoginScreen

**Purpose:** Phone OTP authentication.

**Flow:**
1. User enters phone number (with country code selector, default +1)
2. Tap "Send Code" → call `firebase.auth().signInWithPhoneNumber(phone)`
3. Screen transitions to 6-digit OTP input
4. Tap "Verify" → call `confirmation.confirm(code)`
5. On success: check `ab_users/{uid}` exists
   - If yes → navigate to MainTabs
   - If no → show firstName input → write `ab_users/{uid}` → navigate to MainTabs

**State:** phone, otp, step ("phone" | "otp" | "name"), loading, error

**Notes:**
- Firebase phone auth requires a real device or Firebase test numbers on simulator
- Show a "Resend code" option after 30s
- No social login, no email — phone only

---

### HomeScreen

**Purpose:** Dashboard showing all challenges the user is a member of.

**Data:**
- Query `collectionGroup("members").where("uid", "==", currentUser.uid)` to get challenge IDs
- For each challenge ID, fetch `ab_challenges/{id}`
- For each challenge, fetch today's check-in `ab_challenges/{id}/checkins/{uid_today}`

**UI:**
- Header: app name + notification bell (navigates to NotificationsScreen — v2)
- If no challenges: empty state with "Create your first challenge" and "Join one" CTAs
- Challenge cards (see below) — scrollable list
- Bottom tab bar

**Challenge Card:**
- Challenge name + category badge
- Status chip: "Lobby" | "Active" | "Complete"
- Member count
- If active: today's check-in status (checked in / not yet)
- Tap → ChallengeDetailScreen

**Reminder Banner:** If user has ≥1 active challenge with no check-in today, show a banner at top: "You haven't checked in to [name] yet" with a "Do it now" button.

---

### ChallengeDetailScreen

**Purpose:** Full challenge view — members, leaderboard, actions.

**Params:** `{ challengeId: string }`

**Data:**
- `ab_challenges/{challengeId}` (real-time listener)
- `ab_challenges/{challengeId}/members` (all members)
- `ab_challenges/{challengeId}/leaderboard` (all entries)
- `ab_challenges/{challengeId}/checkins` filtered to today

**UI Sections (scrollable):**
1. Challenge name, category, description
2. Status + dates
3. "Check In Today" button (if active + not yet checked in)
4. Members list — each row: avatar placeholder, name, today's status (✓ or ○)
5. Leaderboard — ranked by totalCheckins, show currentStreak
6. Invite section (lobby/active): display 6-char code + "Share" button
7. If creator + status is "lobby": "Start Challenge" button
8. If creator + status is "lobby": each member's `isReady` shown

**Share invite:** fetch the code from `ab_invites` where `challengeId` matches, or generate one. Use `expo-sharing` / `expo-clipboard` to share `https://accountabili-buddies.vercel.app/join/{code}`.

---

### CheckInScreen

**Purpose:** Log daily check-in.

**Params:** `{ challengeId: string, memberGoal: string }`

**UI:**
- Goal reminder text at top
- "Did you do it today?" — two large buttons: Yes / No
- If Yes selected: optional note field, optional numeric value field
- "Submit" button

**Write on submit:**
```
ab_challenges/{challengeId}/checkins/{uid_YYYY-MM-DD}
  uid, firstName, date, completed, value?, note, createdAt

ab_challenges/{challengeId}/leaderboard/{uid}
  totalCheckins++, lastCheckinDate, currentStreak (recalculate), bestStreak
```

Recalculate streak using `lib/streaks.ts` after write.

Navigate back to ChallengeDetailScreen on success.

---

### CreateChallengeScreen

**Purpose:** Multi-step form to create a new challenge.

**Steps:**

**Step 1 — Challenge basics:**
- Name (text input)
- Category (picker: fitness / learning / health / productivity / other)
- Description (multiline text input, optional)
- Visibility (toggle: private / public)
- Duration type (toggle: fixed / ongoing)
- If fixed: duration number + unit (days / weeks / months)

**Step 2 — Your goal:**
- Personal goal (text input — "What are you committing to?")
- Target frequency (number)
- Frequency period (picker: per_day / per_week / per_month)
- Proof type (toggle: honor / photo) — photo is UI only for now, no camera in MVP

**Step 3 — Invite:**
- Show the generated 6-char invite code
- Share button
- "Done" → navigate to ChallengeDetailScreen

**Write on Step 2 complete:**
```
ab_challenges/{newId}  ← all challenge fields, status: "lobby"
ab_challenges/{newId}/members/{uid}  ← creator's member doc
ab_invites/{6-char-code}  ← { challengeId, createdAt }
```

Generate invite code: 6 random alphanumeric chars (uppercase). Check uniqueness against `ab_invites`.

---

### JoinChallengeScreen

**Purpose:** Join a challenge via invite code.

**UI:**
- 6-char code input (auto-uppercase, auto-advance)
- "Find Challenge" button
- On valid code: show challenge name + member count + "Join" button
- On join: write member doc, navigate to ChallengeDetailScreen

**Flow:**
1. Look up `ab_invites/{code}` → get `challengeId`
2. Fetch `ab_challenges/{challengeId}`
3. Show preview
4. On confirm: write `ab_challenges/{challengeId}/members/{uid}`

**Personal goal step:** After joining, prompt the user for their `personalGoal`, `targetFrequency`, `frequencyPeriod` before writing the member doc.

---

### ProfileScreen

**Purpose:** View and edit user profile, sign out.

**Data:** `ab_users/{uid}`

**UI:**
- First name (editable)
- Phone number (read-only)
- Sign out button (calls `firebase.auth().signOut()`)

---

## Deferred (Do Not Build in MVP)

The following features exist in the web app but are explicitly out of scope for the MVP build:

| Feature | Why deferred |
|---|---|
| Push notifications (APNs) | Requires Apple Developer account + certificate setup |
| Dossier / friend intel | Complex multi-step form, not core to daily habit |
| AI mascot / roasts | Can add after core flows work |
| Weekly dispatch screen | Read-only view, not critical |
| Photo proof (camera) | `expo-image-picker` is easy to add but not MVP |
| Notification history screen | In-app notifications deferred with push |
| Public challenge discovery | Out of scope |

---

## Design System

Replicate the web app's visual identity as closely as NativeWind allows.

**Colors (tailwind.config.js custom theme):**
```js
navy: '#111844',
dust: '#EAE0CF',
neon: '#4B5694',
cream: '#F5F0E8',
flame: '#E84040',
```

**Typography:**
- Display/headers: custom font `Tholoes` — load via `expo-font`
- Body: `DM Sans` — load via `expo-font` or `@expo-google-fonts/dm-sans`

**Component standards:**
- Buttons: min height 44pt (iOS tap target standard)
- Cards: white background, subtle shadow (`shadowColor`, `elevation`)
- Inputs: consistent border, padding, font
- Bottom tab bar: 4 tabs (Home, Create, Join, Profile), navy background

**Safe area:** Wrap root in `<SafeAreaProvider>` from `react-native-safe-area-context`. Use `useSafeAreaInsets()` in bottom nav.

---

## Deployment

**Local dev:** `npx expo start` → scan QR with Expo Go (limited — react-native-firebase requires a dev build)

**Dev build (required for Firebase):**
```bash
npx expo run:ios   # requires Xcode on Mac
# or
eas build --platform ios --profile development
```

**TestFlight:**
```bash
eas build --platform ios --profile production
eas submit --platform ios
```

**EAS config (`eas.json`):**
```json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "production": { "distribution": "store" }
  }
}
```

Requires:
- Apple Developer account ($99/yr)
- Bundle ID registered: `com.tsrounds.accountabilibuddies`
- EAS account linked to Expo (`npx eas login`)

---

## Setup Checklist for New Session

Before writing any code, verify these prerequisites:

- [ ] Firebase iOS app registered → `GoogleService-Info.plist` downloaded
- [ ] Bundle ID confirmed with user
- [ ] Apple Developer account exists (needed for real device + TestFlight)
- [ ] Vercel deployment URL confirmed (for `EXPO_PUBLIC_API_URL`)
- [ ] Expo account created (`expo.dev`)
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Xcode installed on Mac (for simulator + `expo run:ios`)

---

## Implementation Order

Build in this order. Each step is independently testable.

1. **Project scaffold** — `create-expo-app`, install deps, configure NativeWind, load fonts
2. **Firebase init** — `GoogleService-Info.plist`, `lib/firebase.ts`, verify connection
3. **Auth flow** — LoginScreen, phone OTP, user profile creation, auth state listener
4. **Navigation shell** — MainTabs with placeholder screens, auth guard
5. **HomeScreen** — challenge list query, challenge cards, empty state
6. **ChallengeDetailScreen** — real-time listeners, member list, leaderboard
7. **CheckInScreen** — form, Firestore write, streak update
8. **CreateChallengeScreen** — multi-step form, challenge + invite write
9. **JoinChallengeScreen** — code lookup, member write
10. **ProfileScreen** — display, sign out
11. **Polish** — animations, error states, loading skeletons, safe areas, font loading
12. **TestFlight build** — EAS build + submit
