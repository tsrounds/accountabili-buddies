import { useCallback, useState } from 'react'
import {
  fillTemplate,
  pickRandom,
  reminderTemplates,
  checkInBlastTemplates,
  milestoneTemplates,
} from '@/templates/roastTemplates'

export type RoastTrigger =
  | 'missed_checkin'
  | 'streak_milestone'
  | 'friend_comparison'
  | 'completion'

export interface RoastParams {
  userName: string
  roastFuel: string[]
  goalDescription: string
  currentStreak: number
  missedDays: number
  friendsProgress: { name: string; progress: number }[]
  trigger: RoastTrigger
}

// Offline fallback when /api/roast is unavailable (no key, or not on Vercel).
function templateFallback(p: RoastParams): string {
  const vars = {
    recipientName: p.userName,
    checkinName: p.friendsProgress[0]?.name ?? 'Someone',
    checkinGoal: 'their goal',
    goToExcuse: p.roastFuel[0] ?? 'I was too busy',
    biggestWeakness: p.roastFuel[1] ?? 'procrastination',
  }
  switch (p.trigger) {
    case 'friend_comparison':
      return fillTemplate(pickRandom(checkInBlastTemplates), vars)
    case 'streak_milestone':
    case 'completion':
      return fillTemplate(pickRandom(milestoneTemplates), vars)
    case 'missed_checkin':
    default:
      return fillTemplate(pickRandom(reminderTemplates), vars)
  }
}

export function useABRoast() {
  const [loading, setLoading] = useState(false)

  const generate = useCallback(async (params: RoastParams): Promise<string> => {
    setLoading(true)
    try {
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      if (!res.ok) throw new Error('roast endpoint unavailable')
      const data = (await res.json()) as { roast?: string }
      const roast = data.roast?.trim()
      if (!roast) throw new Error('empty roast')
      return roast
    } catch {
      return templateFallback(params)
    } finally {
      setLoading(false)
    }
  }, [])

  return { generate, loading }
}
