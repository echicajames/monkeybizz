/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#f4f5f7',
          100: '#e9eaee',
          200: '#c8cbd5',
          300: '#a7abbb',
          400: '#666c88',
          500: '#242d55',
          600: '#20294d',
          700: '#1b2240',
          800: '#161b33',
          900: '#12162a',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} 