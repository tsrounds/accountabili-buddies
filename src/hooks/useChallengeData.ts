import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  findActiveChallengeFor,
  listCheckins,
  listMembers,
} from '../lib/challenges'
import { computeStandings } from '../lib/stats'
import type { Challenge, Checkin, Member } from '../lib/types'

interface ChallengeData {
  loading: boolean
  challenge: Challenge | null
  member: Member | null
  members: Member[]
  checkins: Checkin[]
  refresh: () => Promise<void>
}

/** Loads the user's active challenge plus everything derived from it. */
export function useChallengeData(): ChallengeData & {
  standings: ReturnType<typeof computeStandings>
} {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [member, setMember] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [checkins, setCheckins] = useState<Checkin[]>([])

  const load = useCallback(async () => {
    if (!user) return
    const found = await findActiveChallengeFor(user.uid)
    if (!found) {
      setChallenge(null)
      setMember(null)
      setMembers([])
      setCheckins([])
      return
    }
    setChallenge(found.challenge)
    setMember(found.member)
    const [m, c] = await Promise.all([
      listMembers(found.challenge.id),
      listCheckins(found.challenge.id),
    ])
    setMembers(m)
    setCheckins(c)
  }, [user])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    load()
      .catch((err) => console.error('challenge load failed', err))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load])

  const standings = useMemo(
    () => (challenge ? computeStandings(challenge, members, checkins) : []),
    [challenge, members, checkins],
  )

  return { loading, challenge, member, members, checkins, standings, refresh: load }
}
