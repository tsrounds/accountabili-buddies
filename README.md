# Accountabili-Buddies

Social accountability app for a small friend group. Daily check-ins, a live
leaderboard, and AI-generated roasts — narrated by a perpetually unimpressed
angel-devil mascot. See [PRODUCT.md](./PRODUCT.md) for the design language.

## Stack

Vite + React + TypeScript · Tailwind CSS v4 (CSS-first tokens) · anime.js v4
· Firebase Auth (email magic link) + Cloud Firestore · Anthropic API
(`claude-sonnet-4-6`) · Firebase Hosting (iOS-first PWA). No Cloud
Functions, no SMS — everything runs client-side against Firestore.

## Setup

```bash
npm install
cp .env.example .env.local   # add VITE_ANTHROPIC_API_KEY (optional but fun)
npm run dev
```

Without an Anthropic key the app still works — roasts fall back to canned
deadpan templates.

### Firebase console checklist (one-time)

1. **Auth → Sign-in method**: enable *Email link (passwordless sign-in)*.
2. **Auth → Settings → Authorized domains**: add the hosting domain(s).
3. Firestore rules: allow authenticated reads/writes on `ab_*` collections.

The Firebase web config is hardcoded in `src/lib/firebase.ts`
(`accountabili-buddies` project; all collections use the `ab_` prefix). The
single admin is hardcoded by email in `src/lib/constants.ts`.

## Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Structure

```
src/
  lib/        firebase, types, dates, stats, challenges (Firestore ops),
              roasts (Anthropic), dispatch (weekly doc), motion helpers
  contexts/   AuthContext (magic-link flow, ab_users bootstrap)
  hooks/      useChallengeData (active challenge + derived standings)
  components/ Mascot, CheckInButton (stamp animation), Leaderboard (FLIP),
              RoastsSection, AppNav, TopBar, guards, LoadingScreen
  pages/      Login, Dashboard, ChallengeDetail, Dispatch, CreateMission, Join
scripts/      generate-mascot.mjs — placeholder mascot webp + PWA icons
public/
  mascot/     idle-a/b/c.webp (animated, transparent) + still.svg fallback
```

## Mascot assets

`public/mascot/idle-{a,b,c}.webp` are **generated placeholders** (run
`node scripts/generate-mascot.mjs` to regenerate). Replace them with the real
hand-drawn animation loops using the same filenames — nothing else changes.
Rendering rule: `<img>` only, never `<video>` (iOS Safari).

## Design tooling

The build prompt calls for the **Impeccable** Claude Code plugin
(`/plugin marketplace add pbakaus/impeccable`, then `/impeccable init` /
`audit` / `animate` / `polish` / `critique`). Plugin installation is
interactive — run those commands from a local Claude Code session when
iterating on the UI. `PRODUCT.md` is already in place for it.
