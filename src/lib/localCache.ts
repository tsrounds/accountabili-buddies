import type { AbUser } from '@/contexts/AuthContext'

const PROFILE_KEY = 'ab_local_profile'

interface CachedProfile {
  uid: string
  firstName: string
  phone: string
}

export function saveLocalProfile(user: AbUser): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify({
    uid: user.uid,
    firstName: user.firstName,
    phone: user.phone,
  }))
}

export function loadLocalProfile(): CachedProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as CachedProfile
    if (
      p &&
      typeof p.uid === 'string' &&
      typeof p.firstName === 'string' &&
      typeof p.phone === 'string'
    ) return p
    return null
  } catch {
    return null
  }
}

export function clearLocalProfile(): void {
  localStorage.removeItem(PROFILE_KEY)
}
