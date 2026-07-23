// Generates placeholder mascot assets: three looping animated .webp idles
// (public/mascot/) and the PWA icons (public/icons/). Hand-drawn-style SVG
// frames rasterized with sharp. Replace the .webp files with the real
// hand-drawn loops whenever they're ready — same filenames, no code changes.
import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'

const SIZE = 480
const INK = '#161616'

/**
 * One frame of the mascot.
 * breath: 0..1 vertical squash cycle, wing: degrees of flap,
 * lid: 0 (deadpan) .. 1 (closed), pupil: -1..1 horizontal glance.
 */
function mascotSvg({ breath = 0, wing = 0, lid = 0, pupil = 0 } = {}) {
  const squash = 1 - 0.018 * breath
  const eye = (cx, isLeft) => {
    const cy = 152
    const rx = 36
    const ry = 23
    if (lid >= 0.95) {
      return `<path d="M${cx - rx},${cy + 2} Q${cx},${cy + 12} ${cx + rx},${cy + 2}" fill="none"/>`
    }
    const chord = cy - ry + (0.42 + lid * 0.4) * (2 * ry)
    const px = cx + pupil * 12 + (isLeft ? 2 : -2)
    const half = Math.sqrt(Math.max(0, 1 - ((chord - cy) / ry) ** 2)) * rx
    return `
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff"/>
      <path d="M${cx - rx},${cy} A${rx},${ry} 0 0 1 ${cx + rx},${cy} L${cx + half},${chord} L${cx - half},${chord} Z"
            fill="#fff" stroke="none"/>
      <line x1="${cx - half}" y1="${chord}" x2="${cx + half}" y2="${chord}"/>
      <circle cx="${px}" cy="${chord + 8}" r="6.5" fill="${INK}" stroke="none"/>
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none"/>`
  }

  const leftWing = `
    <g transform="rotate(${-wing} 104 232)">
      <path d="M102,214 C74,176 44,158 26,166 C30,184 46,200 64,212
               C44,210 26,214 20,228 C32,240 52,246 68,250
               C52,254 38,264 36,276 C54,284 80,276 98,260
               C106,248 108,232 102,214 Z" fill="#fff"/>
      <path d="M64,212 C58,224 56,236 60,248" fill="none"/>
      <path d="M68,250 C66,258 66,266 70,272" fill="none"/>
    </g>`
  const rightWing = `
    <g transform="rotate(${wing} 376 232)">
      <path d="M378,214 C406,176 436,158 454,166 C450,184 434,200 416,212
               C436,210 454,214 460,228 C448,240 428,246 412,250
               C428,254 442,264 444,276 C426,284 400,276 382,260
               C374,248 372,232 378,214 Z" fill="#fff"/>
      <path d="M416,212 C422,224 424,236 420,248" fill="none"/>
      <path d="M412,250 C414,258 414,266 410,272" fill="none"/>
    </g>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 480 480">
  <g stroke="${INK}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
    ${leftWing}
    ${rightWing}
    <g transform="translate(240 438) scale(1 ${squash}) translate(-240 -438)">
      <!-- body with stubby legs -->
      <path d="M240,70 C166,72 106,152 99,252 C95,312 108,372 138,402
               L138,426 Q139,436 150,436 L194,436 Q205,436 205,425 L205,412
               Q240,403 275,412 L275,425 Q275,436 286,436 L330,436
               Q341,436 342,426 L342,402 C372,372 385,312 381,252
               C374,152 314,72 240,70 Z" fill="#fff"/>
      <!-- horns -->
      <path d="M187,88 C178,66 162,50 152,56 C147,63 158,86 174,99" fill="#fff"/>
      <path d="M293,88 C302,66 318,50 328,56 C333,63 322,86 306,99" fill="#fff"/>
      <!-- section bands -->
      <path d="M104,240 Q240,224 376,240"/>
      <path d="M113,332 Q240,318 367,332"/>
      <!-- face -->
      ${eye(204, true)}
      ${eye(276, false)}
      <path d="M226,212 L254,212"/>
    </g>
  </g>
</svg>`
}

async function renderFrame(params) {
  return sharp(Buffer.from(mascotSvg(params))).png().toBuffer()
}

async function animatedWebp(frames, outPath, delayMs) {
  const pngs = await Promise.all(frames.map(renderFrame))
  await sharp(pngs, { join: { animated: true } })
    .webp({ quality: 90, effort: 4, loop: 0, delay: pngs.map(() => delayMs) })
    .toFile(outPath)
  console.log('wrote', outPath)
}

const sine = (i, n) => Math.sin((i / n) * Math.PI * 2) * 0.5 + 0.5

async function main() {
  await mkdir('public/mascot', { recursive: true })
  await mkdir('public/icons', { recursive: true })

  const N = 12

  // idle-a: slow breathing, one blink
  await animatedWebp(
    Array.from({ length: N }, (_, i) => ({
      breath: sine(i, N),
      lid: i === 8 ? 1 : i === 9 ? 0.5 : 0,
    })),
    'public/mascot/idle-a.webp',
    110,
  )

  // idle-b: wing flutter
  await animatedWebp(
    Array.from({ length: N }, (_, i) => ({
      breath: sine(i, N) * 0.5,
      wing: Math.sin((i / N) * Math.PI * 2) * 10,
    })),
    'public/mascot/idle-b.webp',
    90,
  )

  // idle-c: slow sideways glance, unimpressed
  await animatedWebp(
    Array.from({ length: N }, (_, i) => ({
      breath: sine(i, N) * 0.6,
      pupil: i < 4 ? -1 : i < 6 ? 0 : i < 10 ? 1 : 0,
      lid: i === 11 ? 1 : 0,
    })),
    'public/mascot/idle-c.webp',
    160,
  )

  // Static fallback + favicon/PWA icons
  const still = Buffer.from(mascotSvg({}))
  await writeFile('public/mascot/still.svg', still)

  const icon = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
    <rect width="512" height="512" rx="112" fill="#FDF0D5"/>
    <image href="data:image/svg+xml;base64,${still.toString('base64')}"
           x="${pad}" y="${pad}" width="${512 - pad * 2}" height="${512 - pad * 2}"/>
  </svg>`
  for (const [file, px, pad] of [
    ['public/icons/icon-512.png', 512, 56],
    ['public/icons/icon-192.png', 192, 56],
    ['public/icons/apple-touch-icon.png', 180, 64],
  ]) {
    await sharp(Buffer.from(icon(pad))).resize(px, px).png().toFile(file)
    console.log('wrote', file)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
