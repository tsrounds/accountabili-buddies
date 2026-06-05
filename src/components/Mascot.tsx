import { useEffect } from 'react'
import { motion, useAnimationControls, type Transition } from 'framer-motion'

export type MascotMood = 'idle' | 'happy' | 'smirk' | 'annoyed' | 'thinking'

interface MascotProps {
  mood?: MascotMood
  size?: number
  className?: string
}

const smoothInOut: Transition['ease'] = [0.45, 0, 0.55, 1]

// ── Mood pose targets (additive on top of the ambient float layer) ──────────
// Drives: head tilt, brow rotation/y, eye squint (scaleY when open),
// mouth morph index 0=neutral 1=smile 2=smirk 3=frown 4=o, brow furrow,
// wing sway amplitude/speed scalars, float amplitude scalar.
const moodPose = {
  idle:     { headRot: 0,   browLY: 0, browRY: 0, browLRot: 0, browRRot: 0, eyeScaleY: 1.00, mouth: 'neutral', wingAmp: 1.0, wingSpeed: 1.0, floatAmp: 1.0 },
  happy:    { headRot: 0,   browLY: -2, browRY: -2, browLRot: 0, browRRot: 0, eyeScaleY: 0.85, mouth: 'smile',  wingAmp: 1.4, wingSpeed: 1.0, floatAmp: 1.25 },
  smirk:    { headRot: 1.5, browLY: 0, browRY: -2, browLRot: -2, browRRot: 6, eyeScaleY: 0.95, mouth: 'smirk',  wingAmp: 0.7, wingSpeed: 0.9, floatAmp: 0.7 },
  annoyed:  { headRot: 0,   browLY: 3,  browRY: 3,  browLRot: 8,  browRRot: -8, eyeScaleY: 0.75, mouth: 'frown', wingAmp: 0.5, wingSpeed: 1.3, floatAmp: 1.0 },
  thinking: { headRot: 0,   browLY: 2,  browRY: -3, browLRot: 0,  browRRot: 0, eyeScaleY: 0.95, mouth: 'o',     wingAmp: 1.0, wingSpeed: 1.0, floatAmp: 1.0 },
} as const

const mouthPaths: Record<string, string> = {
  // small slit (reference image)
  neutral: 'M 470 660 Q 512 666 554 660 Q 554 678 512 678 Q 470 678 470 660 Z',
  // gentle smile
  smile:   'M 462 656 Q 512 698 562 656 Q 540 686 512 690 Q 484 686 462 656 Z',
  // asymmetric smirk (right corner up)
  smirk:   'M 462 668 Q 500 666 562 642 Q 552 678 512 680 Q 482 680 462 668 Z',
  // small frown
  frown:   'M 462 678 Q 512 644 562 678 Q 540 666 512 664 Q 484 666 462 678 Z',
  // pensive "o"
  o:       'M 492 660 Q 512 644 532 660 Q 532 684 512 684 Q 492 684 492 660 Z',
}

export default function Mascot({ mood = 'idle', size = 360, className = '' }: MascotProps) {
  const pose = moodPose[mood]

  // ── Blink driver (Blink layer in the spec) ────────────────────────────────
  const eyelidControls = useAnimationControls()

  useEffect(() => {
    let cancelled = false
    let timeoutId: number | undefined

    const blink = async () => {
      // 180ms one-shot: closed 70ms in, hold 40ms, open at 180ms total
      await eyelidControls.start({
        scaleY: [1, 0.02, 0.02, 1],
        transition: { duration: 0.18, times: [0, 0.39, 0.61, 1], ease: 'easeInOut' },
      })
      // 8% double-blink for personality
      if (!cancelled && Math.random() < 0.08) {
        await new Promise(r => { timeoutId = window.setTimeout(r, 220) })
        if (cancelled) return
        await eyelidControls.start({
          scaleY: [1, 0.02, 0.02, 1],
          transition: { duration: 0.18, times: [0, 0.39, 0.61, 1], ease: 'easeInOut' },
        })
      }
    }

    const schedule = () => {
      const delay = 2200 + Math.random() * 3200
      timeoutId = window.setTimeout(async () => {
        if (cancelled) return
        await blink()
        if (!cancelled) schedule()
      }, delay)
    }

    // Thinking owns its own scheduled blink at ~1.8s of its 3.6s pose loop
    if (mood === 'thinking') {
      const thinkBlink = () => {
        timeoutId = window.setTimeout(async () => {
          if (cancelled) return
          await blink()
          if (!cancelled) thinkBlink()
        }, 1800)
      }
      thinkBlink()
    } else {
      schedule()
    }

    return () => {
      cancelled = true
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [mood, eyelidControls])

  // Float amplitude is scaled per-mood. We re-key the animation by mood
  // so the float layer adapts (Smirk holds stiller, Happy bobs more).
  const floatAmp = pose.floatAmp
  const floatDur = 3.2

  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg viewBox="0 0 1024 1024" width={size} height={size} aria-hidden>
        {/* root: vertical float + breathing squash (Ambient layer) */}
        <motion.g
          key={`float-${mood}`}
          animate={{
            y: [0, -6 * floatAmp, -8 * floatAmp, -2 * floatAmp, 0],
            scaleY: [1, 1.012, 1, 0.988, 1],
            scaleX: [1, 0.992, 1, 1.008, 1],
          }}
          transition={{ duration: floatDur, ease: smoothInOut, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] }}
          style={{ originX: '512px', originY: '720px' }}
        >
          {/* ── Wings (additive sway, behind body) ───────────────────────── */}
          <Wing side="L" amp={pose.wingAmp} speed={pose.wingSpeed} />
          <Wing side="R" amp={pose.wingAmp} speed={pose.wingSpeed} />

          {/* ── Body (egg) + legs ────────────────────────────────────────── */}
          <g fill="none" stroke="#111844" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
            {/* Legs */}
            <path d="M 460 850 Q 446 920 462 950 Q 488 962 502 940 L 502 860" />
            <path d="M 562 860 L 562 940 Q 576 962 602 950 Q 618 920 604 850" />
            {/* Body (egg) */}
            <path d="M 320 600 Q 320 410 512 410 Q 704 410 704 600 Q 704 880 512 880 Q 320 880 320 600 Z" fill="#FAF6EA" />
            {/* Shirt yoke (V) */}
            <path d="M 380 540 L 512 640 L 644 540" />
          </g>

          {/* ── Head group (counter-rotation lag 120ms per spec) ─────────── */}
          <motion.g
            animate={{
              rotate: [0, 0.4, 0, -0.3, 0],
            }}
            transition={{ duration: floatDur, ease: smoothInOut, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1], delay: 0.12 }}
            style={{ originX: '512px', originY: '520px' }}
          >
            {/* Mood head tilt held on top */}
            <motion.g
              animate={{ rotate: pose.headRot }}
              transition={{ duration: 0.4, ease: smoothInOut }}
              style={{ originX: '512px', originY: '520px' }}
            >
              <g fill="none" stroke="#111844" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
                {/* Horns */}
                <path d="M 426 296 Q 414 250 444 250 Q 470 254 458 296 Z" fill="#FAF6EA" />
                <path d="M 598 296 Q 586 250 612 250 Q 642 254 624 296 Z" fill="#FAF6EA" />
                {/* Head (dome) */}
                <path d="M 332 520 Q 332 296 512 296 Q 692 296 692 520 Z" fill="#FAF6EA" />
                {/* Sleepy hooded eyelid (upper hood) */}
                <path d="M 396 470 Q 444 442 488 472" />
                <path d="M 536 472 Q 580 442 628 470" />
              </g>

              {/* Eyes — almond whites + pupils, scaled by mood squint, eyelids drop on blink */}
              <Eye cx={442} cy={500} squintY={pose.eyeScaleY} eyelidControls={eyelidControls} lidDelay={0} />
              <Eye cx={582} cy={500} squintY={pose.eyeScaleY} eyelidControls={eyelidControls} lidDelay={0.012} />

              {/* Brows */}
              <Brow side="L" cx={418} cy={460} rotate={pose.browLRot} dy={pose.browLY} />
              <Brow side="R" cx={606} cy={460} rotate={pose.browRRot} dy={pose.browRY} />

              {/* Mouth (morph) */}
              <motion.path
                animate={{ d: mouthPaths[pose.mouth] }}
                transition={{ duration: 0.32, ease: smoothInOut }}
                fill="#111844"
                stroke="#111844"
                strokeWidth={3}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </motion.g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  )
}

// ── Wing: asymmetric sway, feather tips lead root by 80ms per spec ─────────
function Wing({ side, amp, speed }: { side: 'L' | 'R'; amp: number; speed: number }) {
  const sign = side === 'L' ? 1 : -1
  // Spec: L: 0, +5, 0, -3, 0 ; R: 0, -5, 0, +3, 0 over 2.4s
  const rootKeys = [0, 5 * amp * sign, 0, -3 * amp * sign, 0]
  const tipKeys  = [0, 6 * amp * sign, 0, -4 * amp * sign, 0]
  const dur = 2.4 / speed
  const originX = side === 'L' ? 320 : 704

  // Path approximating layered feather shapes (matches reference's wing fans)
  const wingPath = side === 'L'
    ? 'M 330 600 Q 220 560 180 640 Q 200 700 280 700 Q 230 740 220 800 Q 280 800 320 760 Q 350 740 360 700 Z'
    : 'M 694 600 Q 804 560 844 640 Q 824 700 744 700 Q 794 740 804 800 Q 744 800 704 760 Q 674 740 664 700 Z'

  return (
    <motion.g
      animate={{ rotate: rootKeys }}
      transition={{ duration: dur, ease: smoothInOut, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] }}
      style={{ originX: `${originX}px`, originY: '660px' }}
    >
      {/* feather tip overlay leads root by 80ms */}
      <motion.g
        animate={{ rotate: tipKeys }}
        transition={{ duration: dur, ease: smoothInOut, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1], delay: -0.08 }}
        style={{ originX: `${originX}px`, originY: '660px' }}
      >
        <path
          d={wingPath}
          fill="#FAF6EA"
          stroke="#111844"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </motion.g>
    </motion.g>
  )
}

// ── Eye: white almond + pupil. Eyelid is a black bar that scaleY's to blink. ─
function Eye({
  cx, cy, squintY, eyelidControls, lidDelay,
}: {
  cx: number; cy: number; squintY: number;
  eyelidControls: ReturnType<typeof useAnimationControls>;
  lidDelay: number;
}) {
  return (
    <g>
      <motion.g
        animate={{ scaleY: squintY }}
        transition={{ duration: 0.3, ease: smoothInOut }}
        style={{ originX: `${cx}px`, originY: `${cy}px` }}
      >
        <ellipse cx={cx} cy={cy} rx={26} ry={22} fill="#FAF6EA" stroke="#111844" strokeWidth={5} vectorEffect="non-scaling-stroke" />
        <ellipse cx={cx + 2} cy={cy + 2} rx={9} ry={11} fill="#111844" />
      </motion.g>
      {/* Eyelid — scaleY collapses from top to close eye */}
      <motion.rect
        x={cx - 30}
        y={cy - 24}
        width={60}
        height={26}
        fill="#FAF6EA"
        animate={eyelidControls}
        initial={{ scaleY: 0.02 }}
        style={{ originX: `${cx}px`, originY: `${cy - 24}px`, transform: 'translateZ(0)' }}
        transition={{ delay: lidDelay }}
      />
    </g>
  )
}

function Brow({ side, cx, cy, rotate, dy }: { side: 'L'|'R'; cx: number; cy: number; rotate: number; dy: number }) {
  const path = side === 'L'
    ? `M ${cx - 22} ${cy + 6} Q ${cx} ${cy - 4} ${cx + 22} ${cy + 2}`
    : `M ${cx - 22} ${cy + 2} Q ${cx} ${cy - 4} ${cx + 22} ${cy + 6}`
  return (
    <motion.g
      animate={{ rotate, y: dy }}
      transition={{ duration: 0.28, ease: smoothInOut }}
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
    >
      <path d={path} fill="none" stroke="#111844" strokeWidth={6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </motion.g>
  )
}
