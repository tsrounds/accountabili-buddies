# Accountabili-Buddies — iOS App Spec

A native SwiftUI port of the Accountabili-Buddies habit-accountability app.
Group challenges, daily check-ins, streaks, a leaderboard, and **AB** — a
passive-aggressive mascot who keeps score whether you like it or not.

This spec describes the iOS app that lives in `/ios`. It is intentionally
minimal: the core accountability loop, nothing more.

---

## 1. Goal

Let a small group of friends keep each other honest about a habit:

1. Someone **creates a challenge** and shares a 6-char invite code.
2. Friends **join** with the code and set a personal goal + frequency.
3. The creator **starts** it.
4. Everyone **checks in daily** ("Did it" / "Didn't").
5. A **leaderboard + streaks** track who's actually showing up, and **AB**
   provides commentary.

## 2. Platform

- **SwiftUI**, iOS 16+, portrait only.
- **Firebase** (Auth + Cloud Firestore) via Swift Package Manager.
- Firebase project: **`accountabili-buddies`** (from `GoogleService-Info.plist`).
- No third-party UI libraries. Animations use native SwiftUI springs.

## 3. Backend / Data model (Firestore)

Schema matches the web app so both clients could share a backend. All
collections are `ab_`-prefixed.

| Path | Fields |
|------|--------|
| `ab_users/{uid}` | `uid, firstName, phone, createdAt, avatarUrl` |
| `ab_challenges/{id}` | `name, creatorUid, creatorFirstName, duration, durationType, visibility, proofType, category, description, status, createdAt, startDate` |
| `ab_challenges/{id}/members/{uid}` | `uid, firstName, personalGoal, targetFrequency, frequencyPeriod, joinedAt` |
| `ab_challenges/{id}/leaderboard/{uid}` | `uid, firstName, totalCheckins, currentStreak, bestStreak, lastCheckinDate` |
| `ab_challenges/{id}/checkins/{uid}_{date}` | `uid, firstName, date, completed, value, note, createdAt` |
| `ab_invites/{CODE}` | `challengeId, createdAt` |

- `status`: `lobby → active → complete`.
- `durationType`: `fixed` (with `duration` days) or `ongoing`.
- `frequencyPeriod`: `per_day | per_week | per_month`.
- Check-in doc id `{uid}_{YYYY-MM-DD}` makes "one check-in per day" idempotent.

### Streak rule
A "Did it" extends the streak if the last check-in was today (no change) or
yesterday (+1); otherwise it resets to 1. A "Didn't" resets the streak to 0 and
does not increment `totalCheckins`.

## 4. Screens

1. **Login** — phone number → 6-digit SMS code → first name. Phone auth via
   Firebase. New users get an `ab_users` doc.
2. **Home** — AB mascot (mood reflects your day) + a list of your challenges.
   Entry points to Create / Join.
3. **Create Challenge** — name, type, duration, proof, visibility → creates the
   challenge + invite code → set your own goal → share screen.
4. **Join Challenge** — enter invite code → see briefing → set goal → join.
5. **Challenge Detail**
   - *Lobby*: members list, invite code, creator can **Start**.
   - *Active/Complete*: your goal + progress ring + streak, **Log Update**
     button, squad health, leaderboard.
6. **Check-In** — optional amount + note, then **Did it** / **Didn't**.

## 5. AB (the mascot)

A circular mascot with a mood and a headline. Moods: `idle, proud, lagging,
celebrate`. AB also delivers passive-aggressive one-liners (reminders when you
haven't checked in, roasts/encouragement elsewhere). Lines live in
`Roasts.swift`, ported from the web `roastTemplates.ts`. Tone: dry, deadpan,
keeping receipts. Never mean, always "just noting it."

## 6. Design system

Ported from the web Tailwind theme (blue + cream).

| Token | Hex | Use |
|-------|-----|-----|
| navy / ink | `#111844` | hero, primary buttons, text on light |
| dust | `#EAE0CF` | app background (cream) |
| ivory | `#FAF6EA` | cards, text on navy |
| frost / flame | `#7288AE` | streaks, progress, accents (slate) |
| indigo (emerald) | `#4B5694` | secondary actions, positive |
| red | `#D7263D` | danger / "Didn't" |

- **Display font:** Bebas Neue (bundled). Uppercase, wide tracking, for
  headlines, buttons, mascot lines, numbers.
- **Body font:** system (SF Pro).
- **Layout motif:** a dark navy "hero zone" up top (mascot lives here) flowing
  into a cream "content zone" with rounded cards. Soft shadows, big radii
  (20–28pt), pill buttons.
- **Motion:** spring pop on tap, slide-up + fade on appear, confetti on
  milestones. Keep it smooth and subtle (21st.dev sensibility — minimal,
  tactile, no clutter).

## 7. Out of scope (v1)

SMS check-in blasts, weekly dispatch/recap, roast dossiers, photo proof upload,
push notifications, public-challenge discovery, profile editing. The schema
leaves room for these; the iOS v1 focuses on the daily loop.

## 8. Project layout

```
ios/
  AccountabiliBuddies.xcodeproj/
  AccountabiliBuddies/
    AccountabiliBuddiesApp.swift     app entry + Firebase init
    GoogleService-Info.plist         Firebase config (accountabili-buddies)
    Info.plist                       fonts + phone-auth URL scheme
    Theme.swift                      colors, fonts, reusable styles
    Models.swift                     Codable models + streak/progress logic
    FirebaseService.swift            Auth + Firestore data layer
    Roasts.swift                     AB personality / templates
    Components/                      Mascot, buttons, zones, progress ring…
    Auth/                            AuthViewModel + LoginView
    Home/                            HomeView
    Challenge/                       Detail / Create / Join / CheckIn
    Resources/Fonts/                 BebasNeue-Regular.ttf
```

See `ios/README.md` for build & run instructions.
