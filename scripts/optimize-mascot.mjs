// Derives the lightweight mascot assets that the app actually paints first.
//
// The idle loops are hand-drawn "boil" animations: every line is redrawn on
// every one of their 238 frames, so inter-frame prediction buys nothing and
// re-encoding them is a dead end (measured: quality 45 at 300px is *bigger*
// than what ships today, and no sub-loop wraps back to frame 0 without a
// visible pop). They are as small as they are going to get.
//
// So instead of shrinking the loop, we stop *waiting* on it: this script emits
// a single-frame poster (~9 KB) for each idle. Mascot.tsx paints the poster
// immediately and swaps in the ~1.9 MB loop once it has decoded, which turns a
// blank 1.9 MB wait into an instant draw.
//
// Filenames carry a version token because Firebase Hosting serves /mascot/**
// as immutable — bump MASCOT_VERSION here and in src/lib/constants.ts together
// whenever the artwork changes.
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'

const VERSION = 'v1'
const DIR = 'public/mascot'
const IDLES = ['idle-a', 'idle-b', 'idle-c']

async function main() {
  const present = await readdir(DIR)
  for (const name of IDLES) {
    const loop = `${name}.${VERSION}.webp`
    if (!present.includes(loop)) {
      throw new Error(`missing ${DIR}/${loop} — rename the master loop first`)
    }
    const out = `${DIR}/${name}.${VERSION}.poster.webp`
    const info = await sharp(`${DIR}/${loop}`, { page: 0 })
      .webp({ quality: 75, effort: 6 })
      .toFile(out)
    console.log(`wrote ${out} — ${(info.size / 1024).toFixed(1)} KB`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
