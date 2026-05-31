# Accountability App — Full Rebuild Prompt

> **How to use this prompt:** Paste this entire document into Claude Code at the root of a fresh Next.js project (`npx create-next-app@latest`). For the best UI component generation, set up the 21st.dev Magic MCP first — instructions at the bottom.

---

## Project Overview

Build a **social goal accountability app** where friends keep each other honest. The product's central insight:

> **Logging is sharing.** When you check in on your goal, your friends see it automatically. There is no separate "share" step. The home screen is your accountability group's feed.

A sassy AI mascot named **AB** (Accountability Buddy) provides personality — celebrating wins, roasting slackers, and generating shareable content the friend group actually wants to send to their existing group chats.

**Tech stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, Firebase/Firestore + Firebase Auth, `@vercel/og` for image generation, Anthropic API (Claude Sonnet) for AB's voice, Firebase Cloud Messaging for push.

**Deploy target:** Vercel.

**Form factor:** Mobile-first PWA. Cross-platform from day one (iOS + Android via the browser). Sharing happens through the native Web Share API into existing group chats (iMessage, WhatsApp, SMS, Signal, etc.). The app produces shareable content; the group chat is where the social glue already lives.

---

## The Core Loop

This is the central design principle. Every feature must serve this loop:

1. **Trigger** — push notification from AB ("It's 9pm. Where you at?"), or a friend's update appears in your feed
1. **Action** — one tap on your pinned card at top of feed: ✅ did it / ❌ didn't
1. **Immediate reward** — AB reaction animation + roast or celebration. Your update appears in friends' feeds within seconds.
1. **Social ripple** — friends react with emoji, or share AB's roast of you to the group chat. The roast becomes a meme that lives in the group's text history forever.

### What we are NOT building

These patterns are explicitly off-limits — re-read before adding any feature:

- Streak insurance, streak freeze tokens, or any monetization of loss aversion
- Public leaderboards or leagues across friend groups
- Escalating guilt notifications when users skip
- Variable-ratio reward schedules designed to create compulsion
- Hearts, gems, lives, energy, or any artificial scarcity
- More than 2 push notifications per user per day
- Anything that makes the user feel worse for skipping than they would feel without the app

The dopamine source is real social warmth + genuine comedy. That's the sustainable loop.

---

## Design System

### Color Palette

| Token              | Hex       | Role                                                            |
|--------------------|-----------|-----------------------------------------------------------------|
| `--bg-primary`     | `#DCD5D3` | **Dust Grey** — app background, default surface                 |
| `--accent-navy`    | `#010097` | **Navy Electric** — primary buttons, active states, key CTAs    |
| `--accent-ivory`   | `#F9FAF0` | **Ivory** — cards, input fields, elevated surfaces              |
| `--accent-frost`   | `#8AE0FC` | **Frosted Blue** — progress bars, highlights, success states    |
| `--accent-emerald` | `#146445` | **Dark Emerald** — secondary actions, badges, positive feedback |
| `--text-primary`   | `#1A1A1A` | Dark text on light surfaces                                     |
| `--text-secondary` | `#6B6B6B` | Muted labels                                                    |
| `--text-on-dark`   | `#F9FAF0` | Text on Navy/Emerald backgrounds                                |

### Typography

- **Headers/Display:** `Sauce Tomato` — bold, characterful. Load as a custom font file (`@font-face` in `globals.css`); drop the `.woff2`/`.ttf` in `public/fonts/`.
- **Body/Subtext:** `DM Sans` via `next/font/google`.
- Do not use Inter, Roboto, Arial, or any system defaults.

### Animation Principles

- **Page transitions:** smooth crossfade with staggered element reveals (150ms stagger)
- **Logging:** swipe gestures with spring physics, AB reacts immediately
- **Progress:** animated number counters, rings fill with spring easing
- **Feed:** new items slide in from top with subtle bounce; reactions pop on tap
- **AB:** idle bounce, expressive transitions between states (eye squint when roasting, wing flap on celebration)
- **Micro:** button press scales (0.95), card hover lifts with shadow
- **Loading:** skeleton shimmer, never spinners

Framer Motion throughout. Use `layout` animations for list reordering in the feed.

### Mascot: AB

Round chubby creature with small horns, tiny wings, stubby legs, perpetually unimpressed expression. A sarcastic cherub who's seen it all. Reference the attached `Final_AB.PNG`.

**Build AB as an SVG React component** with swappable expressions via prop:

- `neutral` — default half-lidded stare
- `roasting` — one eyebrow raised, smirk
- `celebrating` — both eyes wide, wings up
- `disappointed` — eyes closed, head tilted down
- `angry` — eyebrows furrowed, mouth open
- `sleeping` — eyes shut, slight slouch (when user hasn't checked in)

AB's expression should also drive the user's avatar tile shown to friends — your friends see *your* AB's state, ambient-aware of how you're doing without needing a chart.

---

## Core Features & User Flows

### 1. Onboarding

1. Landing page: AB front and center, arms crossed. Tagline: *"Your friends said you need this."*
1. Passwordless auth (magic link via Firebase Auth) or Google/Apple sign-in.
1. **Profile setup is critical** — this is where the user enters their **roast fuel**: 3–5 personal details AB will use to personalize roasts.
   - Examples: "I said I'd stop eating pizza every night," "I've been 'starting Monday' for 6 months," "My gym membership is a charity donation at this point"
   - These are private to the user and never shown to friends literally — only AB uses them to flavor roasts that *become* shareable.
   - Frame the prompt: *"Tell AB things to use against you. Be specific. Be honest. AB will be relentless."*

### 2. Challenge Creation

Creator sets:

- **Name** + **category** (fitness, reading, savings, habit, custom)
- **Duration** (1 week, 2 weeks, 30 / 60 / 90 days, custom)
- **Check-in frequency** (daily, weekly, custom)
- **Their own personal goal** within the challenge (free text + optional measurable target, e.g., "Run 3x/week" with target = 12 runs)

Then immediately hits "Invite Friends" → native share sheet.

### 3. Invite Flow — critical for the social loop

The link preview in iMessage / WhatsApp / wherever is the magic. The creator's share sheet drops in a link like `https://app.com/invite/[code]`. That URL serves a rich Open Graph preview rendered server-side with `@vercel/og`:

- AB illustration with arms crossed
- Challenge name, duration, creator's name
- "Teddy is starting [Challenge Name]. Join him."

Friends see this preview natively inline in their existing chat. Tap the link → land at `/invite/[code]` → AB greets them → they sign up (passwordless or Google/Apple) → fill roast fuel → land in lobby.

**Target: 3 taps from creator hitting "Invite" to friend being in the lobby.**

Implementation:

- Invite landing route: `app/invite/[code]/page.tsx`
- OG image route: `app/api/og/invite/[code]/route.tsx` (edge runtime, `@vercel/og`)
- OG meta tags set on the invite landing page reference the OG image URL

### 4. Lobby ("Ready Up")

Video-game-style staging area. All participants visible in a grid, each with their AB avatar and a `NOT READY` badge.

To go ready, each friend must:

1. Write their own personal goal within the challenge
1. Optionally set a measurable target
1. Hit "Lock In"

**The challenge does not start until all participants are READY.** AB comments on stragglers in the feed: *"Still waiting on [Name]. Shocking."* When any friend hits "Lock In," push goes to the others — builds anticipation.

When everyone is ready → countdown animation → challenge begins → feed becomes active.

**Animation focus:** "Lock In" should feel satisfying — button transforms, confetti burst, the user's AB gets a glow ring, AB the mascot reacts.

### 5. Feed — the home screen

This is the heart of the product. Opening the app lands here (or a chooser if the user is in multiple active challenges).

**Layout (mobile-first):**

**Pinned top — your own quick-update card:**

- Big AB expression reflecting your current status (you = `sleeping` if you haven't checked in today, `celebrating` if you have, `disappointed` if you skipped)
- Today's question: *"Did you do it?"* with two huge buttons
- **Swipe right** = ✅ logged. **Swipe left** = ❌ skipped. **Tap** = detailed entry with note + value
- Below: streak counter (flame icon), goal text, mini progress ring

**Feed below — reverse-chronological items from the group:**

- **CheckInItem:** "[Friend] did it today" or "[Friend] skipped today" — friend's AB avatar showing their state, optional note, reaction bar
- **RoastItem:** AB roasting someone — rendered as a stylized card (Dust Grey background, AB illustration, roast text in Sauce Tomato). Tap to share or react. **These are the viral content.**
- **MilestoneItem:** streak celebrations, halfway markers, group achievements
- **PokeItem:** "[Friend] poked you" — appears in your feed when a friend pokes you
- **RecapItem:** weekly recap card (see Section 8)

**Logging is publishing.** When you tap your pinned card, the action creates a feed item visible to your whole group immediately. There is no separate share step. Friends get a non-urgent push notification.

**One-tap reactions:** every feed item has a reaction bar (🔥 💀 😂 👏). Tap = react in <1 second. Reactions update live for everyone.

### 6. AB Roast Cards — the viral content layer

Every roast AB generates is rendered as a shareable image card via `@vercel/og`. The card design:

- Dust Grey background
- AB illustration in `roasting` expression on the left
- Roast text in Sauce Tomato display font, large
- Subject's name and a small stat ("Day 4. 1 check-in.") at bottom
- Tiny app watermark, no aggressive branding

The image lives at `/api/og/roast/[roastId]/route.tsx` so it's both linkable and embeddable.

**Share UX:**

- Roast appears in feed → "Share" button on the card
- Tap → app fetches the PNG blob → calls `navigator.share({ files: [pngFile], text, url })`
- Native share sheet opens → user picks group chat → roast image drops into the chat
- Fallback for browsers without Share-API file support: download image + copy link

**Why this is the killer feature:** the roast image lives in the friend group's chat history forever. It's funny. It spreads beyond the app. It's the marketing engine.

### 7. Friend Poke

Every friend's card in the feed has a small 👀 poke button.

Tap → calls `POST /api/poke` → AB generates a personalized roast on your behalf using both your roast fuel and theirs → it appears in their notifications and as a `PokeItem` in the group feed.

Example: *"Teddy says you've been slacking. He's not wrong. Your gym membership called — it misses you."*

**Rate limit: one poke per friend per day.** This is a feature, not a constraint — it keeps pokes feeling special, not spammy.

### 8. Weekly Group Recap

Every Sunday evening (Vercel cron at `/api/recap`), a recap card generates for each active challenge:

- Consistency leaderboard (% of check-ins hit, not absolute numbers — protects people doing smaller goals)
- "Best roast of the week"
- "Biggest comeback"
- "Most ghosted" (kept gentle)
- AB's overall verdict for the group

Recap is rendered as a shareable image (`@vercel/og` at `/api/og/recap/[recapId]`), auto-posted to the feed, and the challenge creator gets a one-tap "Share to group chat" prompt.

This gives the group **fresh content to share every week** — sustaining the share loop beyond initial novelty.

### 9. End of Challenge

Final recap. Each participant gets a personalized AB verdict card — big shareable moment. Group leaderboard. Hall of fame for best roasts of the challenge. Option to start a new challenge with the same group (one-tap re-up).

---

## AB API — How AB Speaks

Roasts and commentary come from Claude via a server-side API route.

```ts
POST /api/roast
Body: {
  userName: string,
  roastFuel: string[],
  goalDescription: string,
  currentStreak: number,
  missedDays: number,
  friendsProgress?: { name: string, progress: number }[],
  trigger:
    | "missed_checkin"
    | "streak_milestone"
    | "friend_comparison"
    | "completion"
    | "poke",          // includes pokedBy + their fuel
  pokedBy?: { name: string, roastFuel: string[] }
}
```

**System prompt for Claude:**

> You are AB, a sassy accountability mascot. You're round, grumpy, and brutally honest. You have tiny wings that can't possibly support your body, and you're aware of this. You roast people who slack off using their own personal details against them. Keep it under 2 sentences. Be funny, never cruel. You secretly care. Never reference self-harm, weight in a body-shaming way, or anything that would land badly with a friend group. Punch up at laziness, not down at the person.

---

## Data Model (Firestore)

```
users/
  {userId}/
    name: string
    email: string
    avatarUrl: string
    roastFuel: string[]
    abState: {
      currentExpression: string
      lastUpdated: timestamp
    }
    fcmToken: string | null      // for push
    createdAt: timestamp

challenges/
  {challengeId}/
    name: string
    category: string
    createdBy: string
    duration: number
    checkInFrequency: string
    startDate: timestamp | null
    endDate: timestamp | null
    status: "lobby" | "active" | "completed"
    inviteCode: string

    participants/
      {userId}/
        personalGoal: string
        measurableTarget: number | null
        targetUnit: string | null
        isReady: boolean
        joinedAt: timestamp
        currentStreak: number
        totalCompleted: number

        logs/
          {logId}/
            date: timestamp
            completed: boolean
            value: number | null
            note: string | null

    feed/
      {feedItemId}/
        type: "checkin" | "roast" | "milestone" | "poke" | "recap"
        userId: string              // subject of the item
        triggeredBy: string | null  // who poked / who got reacted to
        content: string
        roastImageUrl: string | null
        reactions: { [emoji]: string[] }   // emoji -> userIds
        createdAt: timestamp

    pokes/
      {pokeId}/
        from: string
        to: string
        roastText: string
        createdAt: timestamp
```

---

## File Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (main)/
│   ├── layout.tsx
│   ├── feed/page.tsx                 // PRIMARY home — challenge feed
│   ├── challenges/
│   │   ├── page.tsx                  // chooser if user is in multiple
│   │   ├── create/page.tsx
│   │   └── [id]/
│   │       ├── lobby/page.tsx
│   │       └── recap/page.tsx
│   ├── profile/[userId]/page.tsx
│   └── settings/page.tsx
├── invite/
│   └── [code]/page.tsx               // invite landing
├── api/
│   ├── roast/route.ts                // Anthropic call
│   ├── poke/route.ts
│   ├── recap/route.ts                // cron-triggered
│   ├── og/
│   │   ├── invite/[code]/route.tsx   // @vercel/og — invite preview
│   │   ├── roast/[roastId]/route.tsx // @vercel/og — shareable roast
│   │   └── recap/[recapId]/route.tsx // @vercel/og — recap card
│   └── notifications/route.ts
├── globals.css
└── layout.tsx

components/
├── ab/
│   ├── ABMascot.tsx                  // SVG mascot, expression prop
│   ├── ABReaction.tsx                // animated reaction bubble
│   └── ABFloating.tsx                // optional persistent element
├── feed/
│   ├── Feed.tsx                      // scrollable container with layout anim
│   ├── PinnedQuickUpdate.tsx         // your own card at top
│   ├── CheckInItem.tsx
│   ├── RoastItem.tsx                 // includes share button
│   ├── MilestoneItem.tsx
│   ├── PokeItem.tsx
│   ├── RecapItem.tsx
│   ├── ReactionBar.tsx
│   └── PokeButton.tsx
├── share/
│   ├── ShareSheet.tsx                // navigator.share wrapper + fallbacks
│   └── ShareableCard.tsx             // matches @vercel/og output visually
├── challenge/
│   ├── CreateForm.tsx
│   ├── LobbyGrid.tsx
│   ├── ReadyUpButton.tsx
│   └── ProgressRing.tsx
├── invite/
│   └── InviteLanding.tsx
├── ui/                               // base components (use 21st.dev MCP)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Avatar.tsx
│   └── ProgressBar.tsx
└── layout/
    ├── Navbar.tsx
    └── MobileNav.tsx

lib/
├── firebase.ts
├── auth.ts
├── share.ts                          // Web Share API wrapper
├── hooks/
│   ├── useChallenge.ts
│   ├── useFeed.ts                    // real-time feed subscription
│   ├── useGoalLog.ts
│   ├── useABRoast.ts
│   └── usePoke.ts
└── utils/
    ├── streaks.ts
    ├── progress.ts
    └── ogImage.ts
```

---

## Web Share API — Implementation Pattern

The share-to-group-chat flow is foundational. Reference implementation:

```ts
// lib/share.ts
export async function shareRoastCard(
  roastId: string,
  roastText: string,
  appUrl: string,
) {
  const response = await fetch(`/api/og/roast/${roastId}`);
  const blob = await response.blob();
  const file = new File([blob], "ab-roast.png", { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      text: `AB has thoughts: "${roastText}"`,
      url: `${appUrl}/roasts/${roastId}`,
    });
    return { method: "native" };
  }

  // Fallback: download + copy link
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ab-roast.png";
  a.click();
  await navigator.clipboard.writeText(`${appUrl}/roasts/${roastId}`);
  return { method: "fallback" };
}
```

Web Share API with files works on iOS Safari 15+ and modern Android Chrome. Always feature-detect with `canShare`. Same pattern for invites and recap cards.

---

## Implementation Order

Re-prioritized so the share loop is built **first**, not as a polish phase:

1. **Phase 1 — Foundation:** Firebase setup (reuse `bracket-anything` env), auth, base layout, color + type system, AB mascot component with all expressions
1. **Phase 2 — Invite + Lobby:** Challenge creation, OG image generation for invite links, invite landing page, lobby with ready-up mechanic, share sheet for invites
1. **Phase 3 — Feed + Logging-as-Sharing:** Pinned quick-update card, real-time feed rendering, check-in feed items, swipe-to-log, one-tap reactions
1. **Phase 4 — AB + Roast Cards:** Anthropic API for roast generation, roast card OG image generation, share-to-group-chat via Web Share API
1. **Phase 5 — Pokes + Notifications:** Friend-poke endpoint, poke feed items, Firebase Cloud Messaging push, notification deep links
1. **Phase 6 — Recap + Polish:** Weekly recap cron, final challenge recap, page transitions, skeleton loaders, PWA manifest + install prompt

---

## Key UX Mandates

- **Mobile-first PWA.** Cross-platform from day one.
- **Logging IS sharing.** No separate share step for daily updates. Friends see check-ins the moment you tap.
- **The feed is the home.** Not a tab — the landing surface. Friends' progress is the primary content.
- **Roast cards are designed to escape the app.** They look great as screenshots in iMessage, WhatsApp, group chats. The app produces content the friend group wants to share.
- **One-tap reactions.** Tapping 🔥/💀/😂/👏 must take under 1 second.
- **AB is personality, not a gate.** AB makes things funny — but AB never blocks user actions or guilt-trips. The character is warmth, not pressure.
- **No predatory engagement patterns.** Re-read the "What we are NOT building" list before adding any feature.

---

## Environment Variables

This app shares the same Firebase project as `bracket-anything`. Copy the Firebase values from the existing `bracket-anything/.env.local`:

```env
# Firebase — same project as bracket-anything (copy from bracket-anything/.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=<from bracket-anything>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<from bracket-anything>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<from bracket-anything>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<from bracket-anything>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<from bracket-anything>
NEXT_PUBLIC_FIREBASE_APP_ID=<from bracket-anything>

# Anthropic — for AB's roast generation
ANTHROPIC_API_KEY=

# Firebase Admin (for cron-triggered recap, server-side notifications)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# App URL (for share links, OG images)
NEXT_PUBLIC_APP_URL=
```

> **Note to Claude Code:** If this project is on the same machine as `bracket-anything`, read the Firebase env vars directly from `../bracket-anything/.env.local` and copy them into this project's `.env.local`. The Firestore collections for this app (`users/`, `challenges/`) are new and won't conflict with bracket-anything's existing data.

---

## Appendix: Setting Up 21st.dev Magic MCP for UI Components

The `components/ui/` base components (Button, Card, Input, Modal, etc.) will look their best generated through the **21st.dev Magic MCP server**, which produces polished, production-grade React/TypeScript components from natural language.

### Step 1: Install in Claude Code

**Option A — CLI (recommended):**

```bash
npx @21st-dev/cli@latest install claude --api-key 398c5fe98bafce3cf6d992726372098453c81e130031e596bf31d9998520daff
```

**Option B — Manual config:**

Add to your Claude Code MCP settings (`~/.claude/settings.json` or project `.mcp.json`):

```json
{
  "mcpServers": {
    "@21st-dev/magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest", "API_KEY=\"398c5fe98bafce3cf6d992726372098453c81e130031e596bf31d9998520daff\""],
      "env": {}
    }
  }
}
```

### Step 2: Use in Claude Code

Once connected, prompt Claude Code like:

- `/ui create a rounded button component with Dust Grey background, Navy Electric hover state, spring press animation, Tailwind styling`
- `/ui build a progress ring component that animates from 0 to a given percentage with a Frosted Blue stroke on Ivory background`
- `/ui design a card component with Ivory background, subtle warm shadow, rounded-2xl corners, and a hover lift animation`

Use these for the `components/ui/` directory, then build the app-specific components on top.

### Alternative: Local Claude Code Skill

If you prefer not to use the external MCP, create a skill file at `.claude/skills/ui-components/SKILL.md` with your design system tokens. This gives Claude Code persistent context without an external dependency:

```markdown
# UI Component Skill

## Design Tokens
- Background: #DCD5D3 (Dust Grey)
- Primary: #010097 (Navy Electric)
- Surface: #F9FAF0 (Ivory)
- Highlight: #8AE0FC (Frosted Blue)
- Secondary: #146445 (Dark Emerald)

## Component Standards
- All components use Framer Motion for animations
- Tailwind CSS for styling
- Rounded corners: rounded-xl default, rounded-2xl for cards
- Shadows: subtle, warm-toned (no pure black shadows)
- Typography: Sauce Tomato (display), DM Sans (body)
- All interactive elements have press (scale 0.95) and hover states
```
