import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Doc design system (semantic names) ──
        dust: '#DCD5D3',     // app background / default surface
        navy: '#010097',     // primary buttons, active states, key CTAs
        ivory: '#F9FAF0',    // cards, inputs, elevated surfaces
        frost: '#8AE0FC',    // progress bars, highlights, success states
        emerald: '#146445',  // secondary actions, badges, positive feedback
        flame: '#F2994A',    // streak flame accent (kept warm on purpose)
        ink: '#1A1A1A',      // primary text on light surfaces
        muted: '#6B6B6B',    // secondary / muted labels

        // ── Legacy aliases — remapped to the new palette by role so the
        //    existing pages adopt the light theme automatically. ──
        dark: '#1A1A1A',         // was near-black surface → now primary text
        'dark-teal': '#010097',  // dark card / floating nav surface → navy
        cream: '#F9FAF0',        // light text on dark + elevated surface → ivory
        neon: '#146445',         // pop accent → emerald (reads on light + navy)
        teal: '#146445',         // small icon accent → emerald
        'light-purple': '#DCD5D3', // light content zone → dust grey
        purple: '#010097',
        slate: '#F9FAF0',
        mustard: '#146445',
        olive: '#146445',
        'retro-red': '#D7263D',  // errors / danger (readable on light)
      },
      fontFamily: {
        // Sauce Tomato (doc display face) is not bundled in this repo; Tholoes is
        // kept as the characterful display font. Body is DM Sans per the doc.
        display: ['Tholoes', 'Impact', '"Arial Black"', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Soft, warm-toned shadows (no pure black) per the doc.
        retro: '0 2px 16px rgba(26,26,26,0.10)',
        'retro-sm': '0 1px 8px rgba(26,26,26,0.08)',
        card: '0 4px 20px rgba(26,26,26,0.08)',
        glow: '0 0 24px rgba(138,224,252,0.45)',
        clay: 'inset 0 -3px 0 rgba(0,0,0,0.18), 0 2px 12px rgba(26,26,26,0.12)',
        'clay-sm': 'inset 0 -2px 0 rgba(0,0,0,0.15), 0 1px 8px rgba(26,26,26,0.10)',
        float: '0 8px 32px rgba(1,0,151,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spring-pop': {
          '0%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(0.94)' },
          '65%': { transform: 'scale(1.05)' },
          '85%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        'check-pop': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(0.92)' },
          '60%': { transform: 'scale(1.12)' },
          '80%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.2s ease-out forwards',
        'slide-up-1': 'slide-up 0.2s ease-out 40ms forwards',
        'slide-up-2': 'slide-up 0.2s ease-out 80ms forwards',
        'slide-up-3': 'slide-up 0.2s ease-out 120ms forwards',
        'slide-up-4': 'slide-up 0.2s ease-out 160ms forwards',
        'spring-pop': 'spring-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'check-pop': 'check-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        wiggle: 'wiggle 0.4s ease-in-out forwards',
        'fade-in': 'fade-in 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
