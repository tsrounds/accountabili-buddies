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
      },
    },
  },
  plugins: [],
}

export default config
