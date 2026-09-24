import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDVAbxj3ZXfp5feOMvxgIKOnEmEI783lMg',
  authDomain: 'accountabili-buddies.firebaseapp.com',
  projectId: 'accountabili-buddies',
  storageBucket: 'accountabili-buddies.firebasestorage.app',
  messagingSenderId: '198599137573',
  appId: '1:198599137573:web:afbc787d5f72b971b9e2cc',
  measurementId: 'G-LM0NPZJGK4',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

/**
 * Callable Functions are only reached from the device-pairing flow, so the
 * SDK is fetched on demand rather than shipped in the entry chunk.
 */
export async function getFunctionsLazy() {
  const { getFunctions } = await import('firebase/functions')
  return getFunctions(app)
}
// Auto-detect long-polling — WebChannel streaming stalls for 20-30s on many
// mobile carriers and iOS Safari before falling back on its own. This makes
// Firestore skip the broken handshake when the environment can't stream.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  // On-disk cache so a returning user's challenge renders from local data
  // instead of a cold network round trip. Note that getDoc/getDocs still go
  // to the server by default — reads that want the instant path have to ask
  // for it explicitly (see the `source` argument in lib/challenges.ts).
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
})

// Messaging is not available in every browser (Firefox private mode, older
// Safari, SSR) so we probe before constructing. Callers should treat `null`
// as "push not available on this device" rather than an error.
// Imported dynamically: nothing touches this until the user taps "enable
// notifications", so it has no business in the boot bundle.
export async function getMessagingIfSupported() {
  try {
    const { getMessaging, isSupported } = await import('firebase/messaging')
    return (await isSupported()) ? getMessaging(app) : null
  } catch {
    return null
  }
}

export default app
