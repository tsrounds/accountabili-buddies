import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'
import { getMessaging, isSupported, type Messaging } from 'firebase/messaging'

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
// Auto-detect long-polling — WebChannel streaming stalls for 20-30s on many
// mobile carriers and iOS Safari before falling back on its own. This makes
// Firestore skip the broken handshake when the environment can't stream.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
})

// Messaging is not available in every browser (Firefox private mode, older
// Safari, SSR) so we probe before constructing. Callers should treat `null`
// as "push not available on this device" rather than an error.
export async function getMessagingIfSupported(): Promise<Messaging | null> {
  try {
    return (await isSupported()) ? getMessaging(app) : null
  } catch {
    return null
  }
}

export default app
