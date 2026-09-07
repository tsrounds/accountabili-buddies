import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/anton'
import '@fontsource/atkinson-hyperlegible'
import '@fontsource/atkinson-hyperlegible/700.css'
import './index.css'
import App from './App'

// Lets CSS know JS is live so entrance animations can hide-then-reveal safely.
document.documentElement.classList.add('js')

// Register the FCM service worker after load so it doesn't compete with the
// initial render. notifications.ts later awaits navigator.serviceWorker.ready
// to hand this registration to getToken().
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .catch((err) => console.warn('SW registration failed', err))
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
