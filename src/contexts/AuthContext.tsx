import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, getDoc, type Timestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { saveLocalProfile, loadLocalProfile, clearLocalProfile } from '@/lib/localCache'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AbUser {
  uid: string
  firstName: string
  phone: string
  createdAt?: Timestamp
  avatarUrl: string | null
  deviceIds?: string[]
}

interface AuthContextValue {
  currentUser: AbUser | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider')
  return ctx
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const cached = loadLocalProfile()
  const [currentUser, setCurrentUser] = useState<AbUser | null>(
    cached ? { ...cached, avatarUrl: null } : null
  )
  // skip spinner if we have a cached profile — Firebase will verify silently
  const [loading, setLoading] = useState(!cached)

  const refreshUser = useCallback(async () => {
    const firebaseUser = auth.currentUser
    if (!firebaseUser) return
    const snap = await getDoc(doc(db, 'ab_users', firebaseUser.uid))
    if (snap.exists()) {
      setCurrentUser(snap.data() as AbUser)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        clearLocalProfile()
        setCurrentUser(null)
        setLoading(false)
        return
      }
      // Firebase user exists — fetch the Firestore profile doc
      try {
        const snap = await getDoc(doc(db, 'ab_users', firebaseUser.uid))
        if (snap.exists()) {
          const profile = snap.data() as AbUser
          setCurrentUser(profile)
          saveLocalProfile(profile)
        } else {
          // New user — profile not yet created (LoginPage will handle name entry)
          setCurrentUser(null)
        }
      } catch (err) {
        console.error('[AuthContext] Firestore fetch error:', err)
        // Keep warm-start value so app stays usable during transient network errors
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  async function signOut() {
    clearLocalProfile()
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
