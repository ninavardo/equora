export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      paper: '#E9E1CE',
      sumi: '#16130F',
      ash: '#8A8272',
      seal: '#C2321F',
      room: { bg: 'var(--room-bg)', ink: 'var(--room-ink)', accent: 'var(--room-accent)' },
    },
    fontFamily: {
      brush: ['"Yuji Boku"', '"Yuji Syuku"', '"Ma Shan Zheng"', 'serif'],
      display: ['"Zen Antique"', '"Yuji Boku"', 'serif'],
      label: ['"Xanh Mono"', 'ui-monospace', 'monospace'],
      kanji: ['"Ma Shan Zheng"', '"Yuji Boku"', 'serif'],
      speed: ['"Liu Jian Mao Cao"', '"Ma Shan Zheng"', 'serif'],
      longing: ['"Klee One"', '"Yuji Boku"', 'serif'],
      sacred: ['"Kaisei Tokumin"', '"Yuji Boku"', 'serif'],
    },
    extend: {
      transitionTimingFunction: { ink: 'cubic-bezier(.16,.84,.24,1)', breath: 'cubic-bezier(.45,0,.2,1)' },
      keyframes: {
        rise: { from: { opacity: 0, filter: 'blur(6px)' }, to: { opacity: 1, filter: 'blur(0)' } },
        breathe: { '0%,100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.012, 1.02)' } },
        grain: {
          '0%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-3%,2%)' },
          '40%': { transform: 'translate(2%,-3%)' },
          '60%': { transform: 'translate(-2%,-1%)' },
          '80%': { transform: 'translate(3%,3%)' },
          '100%': { transform: 'translate(0,0)' },
        },
      },
      animation: {
        rise: 'rise 2.4s cubic-bezier(.45,0,.2,1) forwards',
        breathe: 'breathe 5s ease-in-out infinite',
        grain: 'grain 1.2s steps(6) infinite',
      },
    },
  },
}
