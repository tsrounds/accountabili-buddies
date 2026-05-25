import { useEffect, useRef, useState } from 'react'
import { useABRoast, type RoastParams } from '@/hooks/useABRoast'

// Speech bubble that asks AB for a line on mount. Falls back to templates
// automatically when the API is unavailable (handled inside useABRoast).
export default function ABRoastBubble({ params }: { params: RoastParams }) {
  const { generate } = useABRoast()
  const [text, setText] = useState<string | null>(null)
  const requested = useRef(false)

  // Re-request when the trigger or target changes (not on every render).
  const key = `${params.trigger}:${params.userName}:${params.currentStreak}`
  useEffect(() => {
    requested.current = false
  }, [key])

  useEffect(() => {
    if (requested.current) return
    requested.current = true
    let active = true
    void generate(params).then((r) => { if (active) setText(r) })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return (
    <div className="w-full max-w-xs mx-auto mt-3 animate-slide-up">
      <div className="relative bg-ivory text-ink rounded-2xl px-4 py-3 shadow-card">
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-ivory rotate-45"
          aria-hidden="true"
        />
        {text ? (
          <p className="font-body text-sm leading-relaxed text-center">{text}</p>
        ) : (
          <div className="space-y-1.5 py-0.5">
            <div className="skeleton h-3 w-full rounded-md" />
            <div className="skeleton h-3 w-2/3 mx-auto rounded-md" />
          </div>
        )}
      </div>
    </div>
  )
}
