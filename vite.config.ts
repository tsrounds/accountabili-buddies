import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Pre-bundle everything at startup. @anthropic-ai/sdk in particular is only
  // reached through a lazy dynamic import in src/lib/roasts.ts, so without this
  // Vite discovers it mid-session, re-optimizes, and forces a full page reload —
  // which remounts RoastsSection and restarts generation in a loop.
  // Dev-only: the production build still code-splits the SDK out of the entry.
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'animejs',
      'lucide-react',
      '@anthropic-ai/sdk',
      '@dicebear/core',
    ],
  },
})
