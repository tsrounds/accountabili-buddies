import { useEffect, useState } from 'react'

interface ProgressRingProps {
  /** 0–100 */
  percent: number
  size?: number
  stroke?: number
  /** Label rendered in the middle. Defaults to "{percent}%". */
  label?: string
  sublabel?: string
  className?: string
}

// Animated progress ring — frosted-blue stroke filling on an ivory track.
export default function ProgressRing({
  percent,
  size = 132,
  stroke = 12,
  label,
  sublabel,
  className = '',
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, percent))
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(clamped))
    return () => cancelAnimationFrame(id)
  }, [clamped])

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (shown / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(17,24,68,0.10)" strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#7288AE" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.34, 1.2, 0.64, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-ink text-2xl leading-none">
          {label ?? `${Math.round(shown)}%`}
        </span>
        {sublabel && (
          <span className="font-body text-ink/50 text-[10px] uppercase tracking-wider mt-1">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
