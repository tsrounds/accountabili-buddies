import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Latin subsets only. The bare '@fontsource/x' entry points pull every subset
// the package ships (latin-ext, vietnamese) plus legacy .woff duplicates —
// ~93 KB of files an English-only app never serves.
import '@fontsource/anton/latin-400.css'
import '@fontsource/atkinson-hyperlegible/latin-400.css'
import '@fontsource/atkinson-hyperlegible/latin-700.css'
import './index.css'
import App from './App'

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
