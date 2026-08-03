import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getChallenge, getMember, listCheckins, listMembers } from '../lib/challenges'
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

/** Loads one challenge (by id) plus everything derived from it. */
export function useChallengeData(
  challengeId: string | null,
): ChallengeData & { standings: ReturnType<typeof computeStandings> } {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [member, setMember] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [checkins, setCheckins] = useState<Checkin[]>([])

  const load = useCallback(async () => {
    if (!user || !challengeId) {
      setChallenge(null)
      setMember(null)
      setMembers([])
      setCheckins([])
      return
    }
    const [c, mem] = await Promise.all([
      getChallenge(challengeId),
      getMember(challengeId, user.uid),
    ])
    if (!c || !mem) {
      setChallenge(null)
      setMember(null)
      setMembers([])
      setCheckins([])
      return
    }
    setChallenge(c)
    setMember(mem)
    const [m, c2] = await Promise.all([listMembers(challengeId), listCheckins(challengeId)])
    setMembers(m)
    setCheckins(c2)
  }, [user, challengeId])

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
