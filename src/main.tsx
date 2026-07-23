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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
