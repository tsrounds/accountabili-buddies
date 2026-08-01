import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { ADMIN_EMAIL } from '../lib/constants'
import { syncMemberProfile } from '../lib/challenges'
import type { UserProfile } from '../lib/types'

const PENDING_EMAIL_KEY = 'ab_pendingEmail'
const PENDING_NAME_KEY = 'ab_pendingFirstName'

interface AuthContextValue {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  /** True while a magic link in the URL is being exchanged for a session. */
  completingSignIn: boolean
  /** Set when the link was opened on a device without the stored email. */
  needsEmailConfirm: boolean
  sendLink: (email: string, firstName: string) => Promise<void>
  confirmEmailAndSignIn: (email: string) => Promise<void>
  signOutUser: () => Promise<void>
  /** Patch the caller's profile doc + mirror name/avatar into member docs. */
  updateProfile: (patch: { firstName?: string; avatarSeed?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function ensureUserDoc(user: User): Promise<UserProfile> {
  const ref = doc(db, 'ab_users', user.uid)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    const data = snap.data() as UserProfile
    // Backfill avatarSeed for accounts predating the profile-editor feature.
    if (!data.avatarSeed) {
      await updateDoc(ref, { avatarSeed: user.uid })
      data.avatarSeed = user.uid
    }
    return data
  }

  const email = user.email ?? ''
  const firstName =
    localStorage.getItem(PENDING_NAME_KEY) || email.split('@')[0] || 'Buddy'
  const data = {
    uid: user.uid,
    email,
    firstName,
    avatarSeed: user.uid,
    isAdmin: email.toLowerCase() === ADMIN_EMAIL,
    createdAt: serverTimestamp(),
  }
  await setDoc(ref, data)
  localStorage.removeItem(PENDING_NAME_KEY)
  return (await getDoc(ref)).data() as UserProfile
}

// Module-level so React 18 StrictMode's double-mounted effect can't consume
// the one-time-use sign-in link twice.
let linkExchangeStarted = false

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [completingSignIn, setCompletingSignIn] = useState(() =>
    isSignInWithEmailLink(auth, window.location.href),
  )
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false)

  const finishLink = useCallback(async (email: string) => {
    try {
      await signInWithEmailLink(auth, email, window.location.href)
      localStorage.removeItem(PENDING_EMAIL_KEY)
      setNeedsEmailConfirm(false)
      // Strip the oobCode etc. from the URL.
      window.history.replaceState(null, '', window.location.pathname)
    } finally {
      setCompletingSignIn(false)
    }
  }, [])

  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) return
    if (linkExchangeStarted) return
    linkExchangeStarted = true
    const stored = localStorage.getItem(PENDING_EMAIL_KEY)
    if (stored) {
      void finishLink(stored).catch(() => setCompletingSignIn(false))
    } else {
      // Link opened on a different device — ask for the email once.
      setNeedsEmailConfirm(true)
      setCompletingSignIn(false)
    }
  }, [finishLink])

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        try {
          setProfile(await ensureUserDoc(u))
        } catch (err) {
          console.error('Failed to load profile', err)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
  }, [])

  const sendLink = useCallback(async (email: string, firstName: string) => {
    localStorage.setItem(PENDING_EMAIL_KEY, email)
    localStorage.setItem(PENDING_NAME_KEY, firstName)
    await sendSignInLinkToEmail(auth, email, {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    })
  }, [])

  const confirmEmailAndSignIn = useCallback(
    async (email: string) => {
      setCompletingSignIn(true)
      await finishLink(email)
    },
    [finishLink],
  )

  const signOutUser = useCallback(() => signOut(auth), [])

  const updateProfile = useCallback(
    async (patch: { firstName?: string; avatarSeed?: string }) => {
      if (!user) return
      await updateDoc(doc(db, 'ab_users', user.uid), patch)
      setProfile((prev) => (prev ? { ...prev, ...patch } : prev))
      // Best-effort: mirror name/avatar into any active challenge memberships.
      void syncMemberProfile(user.uid, patch).catch((err) =>
        console.error('Failed to sync member profile', err),
      )
    },
    [user],
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        completingSignIn,
        needsEmailConfirm,
        sendLink,
        confirmEmailAndSignIn,
        signOutUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
