// Plain JS, served from /firebase-messaging-sw.js. This is the ONLY service
// worker registered by the app — we deliberately do not use vite-plugin-pwa.
// The importScripts URLs are pinned to the same Firebase version as
// package.json (12.16.0). Bump both together.
importScripts('https://www.gstatic.com/firebasejs/12.16.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/12.16.0/firebase-messaging-compat.js')

// A compat SW can't read import.meta.env, so these values are duplicated from
// src/lib/firebase.ts. Update both when the client config changes.
firebase.initializeApp({
  apiKey: 'AIzaSyDVAbxj3ZXfp5feOMvxgIKOnEmEI783lMg',
  authDomain: 'accountabili-buddies.firebaseapp.com',
  projectId: 'accountabili-buddies',
  storageBucket: 'accountabili-buddies.firebasestorage.app',
  messagingSenderId: '198599137573',
  appId: '1:198599137573:web:afbc787d5f72b971b9e2cc',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Buddies'
  self.registration.showNotification(title, {
    body: payload.notification?.body || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: payload.data || {},
  })
})

// Focus the app (or open it) when a notification is tapped.
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    (async () => {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      for (const client of clients) {
        if ('focus' in client) return client.focus()
      }
      if (self.clients.openWindow) return self.clients.openWindow('/')
    })(),
  )
})
