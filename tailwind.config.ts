import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // New palette
        dark: '#1F211F',
        neon: '#E7F53C',
        cream: '#FCF1E4',
        teal: '#00CCC0',
        'dark-teal': '#1A3C3F',
        purple: '#7885FF',
        'light-purple': '#B7C8E9',
        // Legacy aliases — same names, new values so existing pages update automatically
        slate: '#FCF1E4',
        mustard: '#E7F53C',
        'retro-red': '#FF6B6B',
        olive: '#00CCC0',
      },
      fontFamily: {
        display: ['Tholoes', 'Impact', '"Arial Black"', 'sans-serif'],
        body: ['"Bebas Neue"', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        retro: '0 2px 16px rgba(0,0,0,0.4)',
        'retro-sm': '0 1px 8px rgba(0,0,0,0.3)',
        card: '0 2px 16px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(231,245,60,0.25)',
        clay: 'inset 0 -3px 0 rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.3)',
        'clay-sm': 'inset 0 -2px 0 rgba(0,0,0,0.2), 0 1px 8px rgba(0,0,0,0.25)',
        float: '0 8px 32px rgba(0,0,0,0.4)',
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
