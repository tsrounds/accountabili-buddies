export type Expression =
  | 'neutral'
  | 'roasting'
  | 'celebrating'
  | 'disappointed'
  | 'angry'

export type Mood = 'idle' | 'proud' | 'lagging' | 'celebrate' | Expression

interface MascotZoneProps {
  mood?: Mood
  size?: 'sm' | 'md'
  headline?: string
  className?: string
}

const moodLabels: Record<string, string> = {
  idle:         "OH, YOU SHOWED UP.",
  neutral:      "OH, YOU SHOWED UP.",
  proud:        "FINE. YOU'RE DOING GREAT.",
  celebrating:  "OKAY. YOU DID IT.",
  celebrate:    "OKAY. YOU DID IT.",
  lagging:      "BEHIND ALREADY?",
  disappointed: "BEHIND ALREADY?",
  roasting:     "LET'S HEAR IT.",
  angry:        "SERIOUSLY?",
}

export default function MascotZone({ mood = 'idle', size = 'md', headline, className = '' }: MascotZoneProps) {
  const sizeClasses = size === 'sm' ? 'w-24 h-24' : 'w-44 h-44'
  const textClasses = size === 'sm'
    ? 'font-display text-ivory text-xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up'
    : 'font-display text-ivory text-3xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Mascot image placeholder — swap in real asset here */}
      <div className={`${sizeClasses} animate-fade-in rounded-full bg-ivory/10 border-2 border-ivory/20`} />
      <p className={textClasses}>
        {headline ?? moodLabels[mood] ?? moodLabels.neutral}
      </p>
    </div>
  )
}
