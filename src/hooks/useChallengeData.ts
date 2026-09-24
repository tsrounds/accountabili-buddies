import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  getChallenge,
  getMember,
  listCheckins,
  listMembers,
  type Source,
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

interface Loaded {
  challenge: Challenge
  member: Member
  members: Member[]
  checkins: Checkin[]
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

  // Pure: fetches, never touches state. Two round-trip levels — the second
  // pair needs the first to have confirmed membership.
  const read = useCallback(
    async (source: Source): Promise<Loaded | null> => {
      if (!user || !challengeId) return null
      const [c, mem] = await Promise.all([
        getChallenge(challengeId, source),
        getMember(challengeId, user.uid, source),
      ])
      if (!c || !mem) return null
      const [m, ch] = await Promise.all([
        listMembers(challengeId, source),
        listCheckins(challengeId, source),
      ])
      return { challenge: c, member: mem, members: m, checkins: ch }
    },
    [user, challengeId],
  )

  const apply = useCallback((d: Loaded | null) => {
    setChallenge(d?.challenge ?? null)
    setMember(d?.member ?? null)
    setMembers(d?.members ?? [])
    setCheckins(d?.checkins ?? [])
  }, [])

  useEffect(() => {
    let cancelled = false

    void (async () => {
      if (!user || !challengeId) {
        apply(null)
        setLoading(false)
        return
      }
      setLoading(true)

      // Paint from the on-disk cache first when there is one — a returning
      // user gets their dashboard immediately instead of staring at a loading
      // screen for two serial round trips. Throws on a cold cache, which just
      // means we fall through to the network like before.
      try {
        const cached = await read('cache')
        if (!cancelled && cached) {
          apply(cached)
          setLoading(false)
        }
      } catch {
        /* nothing cached yet */
      }

      try {
        const fresh = await read('server')
        if (!cancelled) apply(fresh)
      } catch (err) {
        console.error('challenge load failed', err)
      }
      if (!cancelled) setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [read, apply, user, challengeId])

  const refresh = useCallback(async () => {
    apply(await read('server'))
  }, [read, apply])

  const standings = useMemo(
    () => (challenge ? computeStandings(challenge, members, checkins) : []),
    [challenge, members, checkins],
  )

  return { loading, challenge, member, members, checkins, standings, refresh }
}
