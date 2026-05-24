// AB — the Accountability Buddy. A grumpy round creature with small curved
// horns, tiny drooping wings, heavy-lidded eyes and a flat mouth.
//
// Expressions follow the design doc (neutral / roasting / celebrating /
// disappointed / angry). The original mood names (idle / proud / lagging /
// celebrate) are kept as aliases so existing callers keep working.

export type Expression =
  | 'neutral'
  | 'roasting'
  | 'celebrating'
  | 'disappointed'
  | 'angry'

export type Mood = 'idle' | 'proud' | 'lagging' | 'celebrate' | Expression

const MOOD_TO_EXPRESSION: Record<string, Expression> = {
  idle: 'neutral',
  proud: 'celebrating',
  lagging: 'disappointed',
  celebrate: 'celebrating',
  neutral: 'neutral',
  roasting: 'roasting',
  celebrating: 'celebrating',
  disappointed: 'disappointed',
  angry: 'angry',
}

interface MascotZoneProps {
  mood?: Mood
  size?: 'sm' | 'md'
  headline?: string
  className?: string
}

const IVORY = '#F9FAF0'
const INK = '#1A1A1A'
const SHADOW = 'rgba(0,0,0,0.22)'

interface Face {
  leftBrow: string
  rightBrow: string
  mouth: string
  eyesClosed?: boolean
  wingsUp?: boolean
}

const FACES: Record<Expression, Face> = {
  neutral: {
    leftBrow:  'M 100,80 L 124,82',
    rightBrow: 'M 136,82 L 160,80',
    mouth:     'M 117,110 L 143,110',
  },
  roasting: {
    // one brow raised, the other low — a knowing smirk
    leftBrow:  'M 100,84 L 124,82',
    rightBrow: 'M 136,74 Q 148,70 160,73',
    mouth:     'M 116,110 Q 128,114 138,108',
  },
  celebrating: {
    leftBrow:  'M 100,76 Q 112,70 124,74',
    rightBrow: 'M 136,74 Q 148,70 160,76',
    mouth:     'M 112,107 Q 130,123 148,107',
    wingsUp: true,
  },
  disappointed: {
    leftBrow:  'M 100,82 Q 112,86 124,82',
    rightBrow: 'M 136,82 Q 148,86 160,82',
    mouth:     'M 115,113 Q 130,106 145,113',
    eyesClosed: true,
  },
  angry: {
    leftBrow:  'M 100,76 L 124,84',
    rightBrow: 'M 136,84 L 160,76',
    mouth:     'M 116,108 Q 130,108 144,108 Q 130,120 116,108 Z',
  },
}

function MascotSVG({ expression }: { expression: Expression }) {
  const { leftBrow, rightBrow, mouth, eyesClosed, wingsUp } = FACES[expression]
  const wingY = wingsUp ? -10 : 0

  return (
    <svg
      viewBox="0 0 260 262"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      <g transform={`translate(0 ${wingY})`}>
        {/* ── Left Wing ── */}
        <path
          d="M 76,114 C 54,98 28,90 20,100 C 14,112 20,126 32,130 C 48,136 66,134 76,132 Z"
          fill={IVORY} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
        />
        <path d="M 75,116 C 52,102 30,94 22,102" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M 75,123 C 50,113 26,110 18,116" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M 75,130 C 52,124 30,124 22,120" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>

        {/* ── Right Wing ── */}
        <path
          d="M 184,114 C 206,98 232,90 240,100 C 246,112 240,126 228,130 C 212,136 194,134 184,132 Z"
          fill={IVORY} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
        />
        <path d="M 185,116 C 208,102 230,94 238,102" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M 185,123 C 210,113 234,110 242,116" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M 185,130 C 208,124 230,124 238,120" stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </g>

      {/* ── Main Body ── */}
      <ellipse cx="130" cy="152" rx="54" ry="88" fill={IVORY} stroke={INK} strokeWidth="3"/>

      <path d="M 78,116 Q 130,127 182,116" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M 78,180 Q 130,191 182,180" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* ── Horns ── */}
      <path
        d="M 110,70 C 107,59 97,53 100,46 C 107,55 116,65 113,70 Z"
        fill={IVORY} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
      />
      <path
        d="M 150,70 C 153,59 163,53 160,46 C 153,55 144,65 147,70 Z"
        fill={IVORY} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
      />

      {eyesClosed ? (
        <>
          {/* Closed eyes — gentle downward arcs */}
          <path d="M 102,92 Q 113,98 124,92" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M 136,92 Q 147,98 158,92" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          {/* ── Left Eye ── */}
          <ellipse cx="113" cy="90" rx="13" ry="13" fill="white" stroke={INK} strokeWidth="2"/>
          <ellipse cx="113" cy="94" rx="10" ry="10" fill={INK}/>
          <path d="M 100,90 Q 113,83 126,90 L 126,77 Q 113,75 100,77 Z" fill={IVORY}/>
          <path d="M 100,90 Q 113,83 126,90" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="119" cy="94" r="2.5" fill="white"/>

          {/* ── Right Eye ── */}
          <ellipse cx="147" cy="90" rx="13" ry="13" fill="white" stroke={INK} strokeWidth="2"/>
          <ellipse cx="147" cy="94" rx="10" ry="10" fill={INK}/>
          <path d="M 134,90 Q 147,83 160,90 L 160,77 Q 147,75 134,77 Z" fill={IVORY}/>
          <path d="M 134,90 Q 147,83 160,90" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="153" cy="94" r="2.5" fill="white"/>
        </>
      )}

      {/* ── Eyebrows ── */}
      <path d={leftBrow}  stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d={rightBrow} stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none"/>

      {/* ── Mouth ── */}
      <path d={mouth} stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill={expression === 'angry' ? INK : 'none'}/>

      {/* ── Legs ── */}
      <rect x="107" y="234" width="20" height="16" rx="9" fill={INK}/>
      <rect x="133" y="234" width="20" height="16" rx="9" fill={INK}/>

      {/* ── Ground shadow ── */}
      <ellipse cx="130" cy="247" rx="66" ry="9" fill={SHADOW}/>
    </svg>
  )
}

const moodLabels: Record<string, string> = {
  idle:      "YOU'RE JUST STANDING THERE",
  neutral:   "YOU'RE JUST STANDING THERE",
  proud:     "YOU'RE CRUSHING IT",
  celebrating: "MISSION COMPLETE!",
  celebrate: "MISSION COMPLETE!",
  lagging:   "OOPS, YOU'RE BEHIND",
  disappointed: "OOPS, YOU'RE BEHIND",
  roasting:  "OH, THIS SHOULD BE GOOD",
  angry:     "DON'T TEST ME",
}

export default function MascotZone({ mood = 'idle', size = 'md', headline, className = '' }: MascotZoneProps) {
  const expression = MOOD_TO_EXPRESSION[mood] ?? 'neutral'
  const sizeClasses = size === 'sm' ? 'w-24 h-24' : 'w-44 h-44'
  const textClasses = size === 'sm'
    ? 'font-display text-ivory text-xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up'
    : 'font-display text-ivory text-3xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses} animate-fade-in`}>
        <MascotSVG expression={expression} />
      </div>
      <p className={textClasses}>
        {headline ?? moodLabels[mood] ?? moodLabels.neutral}
      </p>
    </div>
  )
}
