# Accountabili-Buddies — Product Context

> Your friends are watching. The mascot is judging. The AI is roasting you.
> Check in or get wrecked.

## What this is

A social accountability PWA for one small friend group (~5–10 people). One
admin creates challenges ("missions"), friends join with an invite code and a
personal goal, and everyone holds each other accountable through daily
check-ins, a live leaderboard, and AI-generated roasts.

## The character

The mascot is the soul of the app: a hand-drawn angel-devil hybrid — round
body, small horns, feathered wings, perpetually unimpressed. It narrates
everything: it greets you at login, sits beside the check-in button, IS the
loading indicator, and signs the weekly Roast of the Week column.

- Assets: `public/mascot/idle-{a,b,c}.webp` — looping animated WebP with
  transparent backgrounds, rendered exclusively via `<img>` (never `<video>`;
  iOS Safari). Current files are generated placeholders
  (`scripts/generate-mascot.mjs`); drop in the real hand-drawn loops with the
  same filenames to replace them.

## Visual identity

Modern, clean, polished UI; the sketchy character art supplies all the
imperfection. Color blocking with the strict 5-color palette:

| Token    | Hex       | Role                                            |
| -------- | --------- | ----------------------------------------------- |
| `lava`   | `#780000` | Deep accent — headers, intense moments          |
| `brick`  | `#C1121F` | Shame, warnings, roast highlights, missed days  |
| `space`  | `#003049` | Primary dark — text, nav, structure, cards      |
| `papaya` | `#FDF0D5` | Warm paper base                                 |
| `steel`  | `#669BBC` | Interactive, links, success, check-in confirmed |

Typography: **Anton** (display — condensed, loud, all-caps) +
**Atkinson Hyperlegible** (body — warm, exceptionally readable at small
sizes). Both self-hosted via Fontsource.

## Motion language

anime.js v4 for everything. Ease-out entrances, staggered cascades
(`[data-animate]` + `pageEnter()`), small distances. Signature moments:

1. **Check-in stamp** — press → slam → ring shockwave → palette particle
   burst → button transforms to "Checked in".
2. **Leaderboard reshuffles** — FLIP row slides on rank change.
3. **Roast reveals** — cards hinge-flip open one by one after the
   "Compiling today's intelligence…" verdict wait.
4. **Login orchestration** — mascot drops in → wordmark → form → CTA settles.

`prefers-reduced-motion` is respected globally (CSS kill-switch + JS guards).

## Tone of voice

Deadpan, passive-aggressive, affectionate. The app cares about you but will
absolutely tell the group chat you skipped leg day. Roasts are funny, never
cruel.
