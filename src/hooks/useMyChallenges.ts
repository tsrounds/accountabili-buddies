import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { listMyChallenges, setChallengeArchived } from '../lib/challenges'
import type { Challenge, Member } from '../lib/types'

export interface MyChallengeEntry {
  challenge: Challenge
  member: Member
}

/** Every challenge (active or complete) the current user belongs to. */
export function useMyChallenges() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [entries, setEntries] = useState<MyChallengeEntry[]>([])

  const load = useCallback(async () => {
    if (!user) {
      setEntries([])
      return
    }
    setEntries(await listMyChallenges(user.uid))
  }, [user])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    load()
      .catch((err) => console.error('challenge list load failed', err))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load])

  const active = entries.filter((e) => e.challenge.status === 'active')
  const completed = entries.filter(
    (e) => e.challenge.status === 'complete' && !e.member.archived,
  )

  async function archive(challengeId: string) {
    if (!user) return
    await setChallengeArchived(challengeId, user.uid, true)
    await load()
  }

  return { loading, entries, active, completed, archive, refresh: load }
}
