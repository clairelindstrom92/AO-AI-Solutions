/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ao-deep':    '#060A12',
        'ao-surface': '#0C1220',
        'ao-elevated':'#111827',
        'ao-accent':  '#00C8F0',
        'ao-primary': '#F0F4FF',
        'ao-muted':   '#8896A8',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm:   ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        tight2: '-0.03em',
        tight3: '-0.04em',
        tight4: '-0.05em',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        messageIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typingDot: {
          '0%, 60%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '30%':           { opacity: '1',   transform: 'scale(1)' },
        },
        cellPulse: {
          '0%, 100%': { opacity: '0.04', backgroundColor: 'transparent' },
          '50%':      { opacity: '1',    backgroundColor: 'rgba(0,200,240,0.06)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.65s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'message-in': 'messageIn 0.35s ease forwards',
        'typing-dot': 'typingDot 1.2s ease infinite',
        'cell-pulse': 'cellPulse 3s ease infinite',
        'drift':      'drift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
