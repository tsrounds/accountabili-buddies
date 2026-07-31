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
  signInAnonymously,
  signInWithEmailLink,
  signOut,
  type User,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { ADMIN_EMAIL } from '../lib/constants'
import { FALLBACK_AVATAR_SEED, randomAvatarSeed } from '../lib/avatar'
import type { UserProfile } from '../lib/types'

const PENDING_EMAIL_KEY = 'ab_pendingEmail'
const PENDING_NAME_KEY = 'ab_pendingFirstName'
const PENDING_AVATAR_KEY = 'ab_pendingAvatarSeed'

interface AuthContextValue {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  /** True while a magic link in the URL is being exchanged for a session. */
  completingSignIn: boolean
  /** Set when the link was opened on a device without the stored email. */
  needsEmailConfirm: boolean
  sendLink: (email: string, firstName: string, avatarSeed: string) => Promise<void>
  confirmEmailAndSignIn: (email: string) => Promise<void>
  /** Sign the visitor in anonymously if they aren't already signed in. */
  signInAnon: () => Promise<void>
  /** Fill in name/avatar on the current profile (Firestore + local state). */
  completeProfile: (patch: { firstName: string; avatarSeed: string }) => Promise<void>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function ensureUserDoc(user: User): Promise<UserProfile> {
  const ref = doc(db, 'ab_users', user.uid)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    // Legacy docs may predate avatarSeed — coalesce so consumers never see undefined.
    const data = snap.data() as Partial<UserProfile>
    return { avatarSeed: FALLBACK_AVATAR_SEED, ...data } as UserProfile
  }

  const email = user.email ?? ''
  const firstName =
    localStorage.getItem(PENDING_NAME_KEY) || email.split('@')[0] || 'Buddy'
  const avatarSeed =
    localStorage.getItem(PENDING_AVATAR_KEY) || randomAvatarSeed()
  const data = {
    uid: user.uid,
    email,
    firstName,
    avatarSeed,
    isAdmin: email.toLowerCase() === ADMIN_EMAIL,
    createdAt: serverTimestamp(),
  }
  await setDoc(ref, data)
  localStorage.removeItem(PENDING_NAME_KEY)
  localStorage.removeItem(PENDING_AVATAR_KEY)
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

  const sendLink = useCallback(
    async (email: string, firstName: string, avatarSeed: string) => {
      localStorage.setItem(PENDING_EMAIL_KEY, email)
      localStorage.setItem(PENDING_NAME_KEY, firstName)
      localStorage.setItem(PENDING_AVATAR_KEY, avatarSeed)
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      })
    },
    [],
  )

  const signInAnon = useCallback(async () => {
    // Idempotent — no-op if already signed in (real or anonymous).
    if (auth.currentUser) return
    await signInAnonymously(auth)
    // onAuthStateChanged fires from here and runs ensureUserDoc as normal.
  }, [])

  const completeProfile = useCallback(
    async (patch: { firstName: string; avatarSeed: string }) => {
      const current = auth.currentUser
      if (!current) throw new Error('completeProfile called with no signed-in user')
      await setDoc(doc(db, 'ab_users', current.uid), patch, { merge: true })
      // profile only refreshes inside onAuthStateChanged, so mirror the patch
      // locally too — otherwise anything reading profile.firstName after this
      // (Dashboard greeting, check-in writes) sees the pre-completion stub.
      setProfile((prev) => (prev ? { ...prev, ...patch } : prev))
    },
    [],
  )

  const confirmEmailAndSignIn = useCallback(
    async (email: string) => {
      setCompletingSignIn(true)
      await finishLink(email)
    },
    [finishLink],
  )

  const signOutUser = useCallback(() => signOut(auth), [])

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
        signInAnon,
        completeProfile,
        signOutUser,
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
