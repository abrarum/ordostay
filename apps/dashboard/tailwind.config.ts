import type { Config } from 'tailwindcss';
import path from 'path';

const root = path.resolve(__dirname);

export default {
  content: [
    path.join(root, 'index.html'),
    path.join(root, 'src/**/*.{ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        telivity: {
          teal: '#2E8B78',
          'dark-teal': '#236C5F',
          'light-teal': '#54B49E',
          orange: '#C88652',
          'orange-lt': '#D9A071',
          yellow: '#eec517',
          'deep-blue': '#245B6B',
          purple: '#5838c0',
          navy: '#172B2F',
          slate: '#40575B',
          'light-grey': '#F3F6F4',
          'mid-grey': '#bbbbc4',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-skeleton': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.2s ease-out',
        'skeleton': 'pulse-skeleton 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
