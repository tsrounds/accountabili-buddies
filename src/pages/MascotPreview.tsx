import { useState } from 'react'
import Mascot, { type MascotMood } from '@/components/Mascot'

const MOODS: { id: MascotMood; label: string }[] = [
  { id: 'idle',     label: 'Idle' },
  { id: 'happy',    label: 'Happy' },
  { id: 'smirk',    label: 'Smirk' },
  { id: 'annoyed',  label: 'Annoyed' },
  { id: 'thinking', label: 'Thinking' },
]

export default function MascotPreview() {
  const [mood, setMood] = useState<MascotMood>('idle')

  return (
    <div className="min-h-screen bg-dust flex flex-col items-center justify-center p-8 gap-8">
      <h1 className="font-display text-ink text-4xl uppercase tracking-wide">Mascot Preview</h1>

      <div className="bg-ivory rounded-4xl shadow-card p-6">
        <Mascot mood={mood} size={360} />
      </div>

      <p className="font-display text-ink text-2xl uppercase tracking-wide">
        {mood}
      </p>

      <div className="flex flex-wrap gap-3 justify-center max-w-md">
        {MOODS.map(m => (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={`px-5 py-3 rounded-full font-display uppercase tracking-wide text-lg shadow-clay-sm transition-transform active:scale-95 ${
              mood === m.id
                ? 'bg-navy text-ivory'
                : 'bg-ivory text-ink hover:bg-ivory/80'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="text-muted text-sm max-w-md text-center">
        Continuous: vertical float, wing sway, body squash/stretch, randomized blink (8% double-blink).
        Click a mood to swap the pose layer — ambient layer keeps running underneath.
      </p>
    </div>
  )
}
