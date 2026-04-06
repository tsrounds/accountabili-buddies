type Mood = 'idle' | 'proud' | 'lagging' | 'celebrate'

interface MascotZoneProps {
  mood?: Mood
  size?: 'sm' | 'md'
  headline?: string
  className?: string
}

// Grumpy round creature — segmented oval body, small curved horns,
// drooping feathered wings, heavy-lidded eyes, flat grumpy mouth.
// Brows + mouth swap per mood; lid/eye shape stays constant.

function MascotSVG({ mood }: { mood: Mood }) {
  const expressions: Record<Mood, { leftBrow: string; rightBrow: string; mouth: string }> = {
    idle: {
      leftBrow:  'M 100,80 L 124,82',
      rightBrow: 'M 136,82 L 160,80',
      mouth:     'M 117,110 L 143,110',
    },
    proud: {
      leftBrow:  'M 100,78 Q 112,73 124,77',
      rightBrow: 'M 136,77 Q 148,73 160,78',
      mouth:     'M 114,109 Q 130,119 146,109',
    },
    lagging: {
      leftBrow:  'M 100,82 Q 112,78 124,80',
      rightBrow: 'M 136,80 Q 148,78 160,82',
      mouth:     'M 115,112 Q 130,105 145,112',
    },
    celebrate: {
      leftBrow:  'M 100,76 Q 112,70 124,74',
      rightBrow: 'M 136,74 Q 148,70 160,76',
      mouth:     'M 112,107 Q 130,123 148,107',
    },
  }

  const { leftBrow, rightBrow, mouth } = expressions[mood]

  return (
    <svg
      viewBox="0 0 260 262"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-full"
    >
      {/* ── Left Wing ── */}
      <path
        d="M 76,114 C 54,98 28,90 20,100 C 14,112 20,126 32,130 C 48,136 66,134 76,132 Z"
        fill="#FCF1E4" stroke="#1F211F" strokeWidth="2.5" strokeLinejoin="round"
      />
      <path d="M 75,116 C 52,102 30,94 22,102" stroke="#1F211F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 75,123 C 50,113 26,110 18,116" stroke="#1F211F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 75,130 C 52,124 30,124 22,120" stroke="#1F211F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* ── Right Wing ── */}
      <path
        d="M 184,114 C 206,98 232,90 240,100 C 246,112 240,126 228,130 C 212,136 194,134 184,132 Z"
        fill="#FCF1E4" stroke="#1F211F" strokeWidth="2.5" strokeLinejoin="round"
      />
      <path d="M 185,116 C 208,102 230,94 238,102" stroke="#1F211F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 185,123 C 210,113 234,110 242,116" stroke="#1F211F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 185,130 C 208,124 230,124 238,120" stroke="#1F211F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* ── Main Body (one oval) ── */}
      <ellipse cx="130" cy="152" rx="54" ry="88" fill="#FCF1E4" stroke="#1F211F" strokeWidth="3"/>

      {/* Head-torso divider */}
      <path d="M 78,116 Q 130,127 182,116" stroke="#1F211F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Torso-hips divider */}
      <path d="M 78,180 Q 130,191 182,180" stroke="#1F211F" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* ── Left Horn (small curved nub) ── */}
      <path
        d="M 110,70 C 107,59 97,53 100,46 C 107,55 116,65 113,70 Z"
        fill="#FCF1E4" stroke="#1F211F" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* ── Right Horn ── */}
      <path
        d="M 150,70 C 153,59 163,53 160,46 C 153,55 144,65 147,70 Z"
        fill="#FCF1E4" stroke="#1F211F" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* ── Left Eye (heavy-lidded) ── */}
      <ellipse cx="113" cy="90" rx="13" ry="13" fill="white" stroke="#1F211F" strokeWidth="2"/>
      <ellipse cx="113" cy="94" rx="10" ry="10" fill="#1F211F"/>
      {/* Heavy upper lid — covers top ~42% of eye */}
      <path d="M 100,90 Q 113,83 126,90 L 126,77 Q 113,75 100,77 Z" fill="#FCF1E4"/>
      <path d="M 100,90 Q 113,83 126,90" stroke="#1F211F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="119" cy="94" r="2.5" fill="white"/>

      {/* ── Right Eye (heavy-lidded) ── */}
      <ellipse cx="147" cy="90" rx="13" ry="13" fill="white" stroke="#1F211F" strokeWidth="2"/>
      <ellipse cx="147" cy="94" rx="10" ry="10" fill="#1F211F"/>
      <path d="M 134,90 Q 147,83 160,90 L 160,77 Q 147,75 134,77 Z" fill="#FCF1E4"/>
      <path d="M 134,90 Q 147,83 160,90" stroke="#1F211F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="153" cy="94" r="2.5" fill="white"/>

      {/* ── Eyebrows ── */}
      <path d={leftBrow}  stroke="#1F211F" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d={rightBrow} stroke="#1F211F" strokeWidth="3" strokeLinecap="round" fill="none"/>

      {/* ── Mouth ── */}
      <path d={mouth} stroke="#1F211F" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* ── Legs ── */}
      <rect x="107" y="234" width="20" height="16" rx="9" fill="#1F211F"/>
      <rect x="133" y="234" width="20" height="16" rx="9" fill="#1F211F"/>

      {/* ── Ground shadow ── */}
      <ellipse cx="130" cy="247" rx="66" ry="9" fill="#B7C8E9" opacity="0.45"/>
    </svg>
  )
}

const moodLabels: Record<Mood, string> = {
  idle:      "YOU'RE JUST STANDING THERE",
  proud:     "YOU'RE CRUSHING IT",
  lagging:   "OOPS, YOU'RE BEHIND",
  celebrate: "MISSION COMPLETE!",
}

export default function MascotZone({ mood = 'idle', size = 'md', headline, className = '' }: MascotZoneProps) {
  const sizeClasses = size === 'sm' ? 'w-24 h-24' : 'w-44 h-44'
  const textClasses = size === 'sm'
    ? 'font-display text-cream text-xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up'
    : 'font-display text-cream text-3xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeClasses} animate-fade-in`}>
        <MascotSVG mood={mood} />
      </div>
      <p className={textClasses}>
        {headline ?? moodLabels[mood]}
      </p>
    </div>
  )
}
