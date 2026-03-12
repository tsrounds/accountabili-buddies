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

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AbUser {
  uid: string
  firstName: string
  phone: string
  createdAt: Timestamp
  avatarUrl: string | null
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
  const [currentUser, setCurrentUser] = useState<AbUser | null>(null)
  // loading starts true so auth state resolves before any route guard runs
  const [loading, setLoading] = useState(true)

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
        setCurrentUser(null)
        setLoading(false)
        return
      }
      // Firebase user exists — fetch the Firestore profile doc
      const snap = await getDoc(doc(db, 'ab_users', firebaseUser.uid))
      if (snap.exists()) {
        setCurrentUser(snap.data() as AbUser)
      } else {
        // New user — profile not yet created (LoginPage will handle name entry)
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  async function signOut() {
    await firebaseSignOut(auth)
    // onAuthStateChanged will fire and clear currentUser automatically
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
