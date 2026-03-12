import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDF5E6',
        mustard: '#D4A017',
        'retro-red': '#C0392B',
        slate: '#2C3E50',
        olive: '#6B7A2E',
      },
      fontFamily: {
        display: ['Rye', 'serif'],
        body: ['"Special Elite"', 'serif'],
      },
      boxShadow: {
        retro: '4px 4px 0px #2C3E50',
        'retro-sm': '2px 2px 0px #2C3E50',
      },
    },
  },
  plugins: [],
}

export default config
