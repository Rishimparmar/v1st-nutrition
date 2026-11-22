/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#09090B',
          900: '#121215',
          850: '#15151A',
          800: '#1A1A1F',
          700: '#26262E',
        },
        volt: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.35)',
        },
        amberGold: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
      },
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'volt-glow': '0 0 30px -5px rgba(16, 185, 129, 0.45)',
        'amber-glow': '0 0 30px -5px rgba(245, 158, 11, 0.45)',
        'glass-card': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        'elevated-glow': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(16, 185, 129, 0.25)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
