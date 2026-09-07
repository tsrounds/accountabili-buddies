import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { getToken, onMessage } from 'firebase/messaging'
import { db, getMessagingIfSupported } from './firebase'

export type PermissionResult = 'granted' | 'denied' | 'unsupported'

const VAPID_KEY = import.meta.env.VITE_FCM_VAPID_KEY

let foregroundHandlerAttached = false

/**
 * Ask the browser for notification permission and register an FCM token for
 * this device. Must be called from a user gesture — iOS Safari drops the
 * request otherwise and gives no second chance.
 */
export async function requestNotificationPermission(
  uid: string,
): Promise<PermissionResult> {
  if (!VAPID_KEY) {
    console.warn('VITE_FCM_VAPID_KEY missing — push disabled')
    return 'unsupported'
  }

  const messaging = await getMessagingIfSupported()
  if (!messaging) return 'unsupported'

  const perm = await Notification.requestPermission()
  if (perm !== 'granted') return perm === 'denied' ? 'denied' : 'unsupported'

  // main.tsx registers the SW at boot; wait for it here so getToken can
  // hand it to FCM rather than registering a second, unrelated one.
  const serviceWorkerRegistration = await navigator.serviceWorker.ready

  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration,
  })
  if (!token) return 'unsupported'

  await saveFcmToken(uid, token)
  attachForegroundHandler()
  return 'granted'
}

async function saveFcmToken(uid: string, token: string): Promise<void> {
  await setDoc(
    doc(db, 'ab_users', uid),
    { fcmTokens: arrayUnion(token) },
    { merge: true },
  )
}

/**
 * Foreground pushes don't auto-display, so we show one ourselves. Guarded so
 * StrictMode's double-mount and repeat sign-ins don't stack handlers.
 */
function attachForegroundHandler(): void {
  if (foregroundHandlerAttached) return
  foregroundHandlerAttached = true
  void (async () => {
    const messaging = await getMessagingIfSupported()
    if (!messaging) return
    onMessage(messaging, (payload) => {
      if (Notification.permission !== 'granted') return
      const title = payload.notification?.title ?? 'Buddies'
      new Notification(title, {
        body: payload.notification?.body ?? '',
        icon: '/icons/icon-192.png',
      })
    })
  })()
}
