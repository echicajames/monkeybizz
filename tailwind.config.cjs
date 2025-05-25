/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#f4f5f7',
          100: '#e5e7eb',
          200: '#cbd2d9',
          300: '#9aa5b1',
          400: '#718096',
          500: '#4a5568',
          600: '#2d3748',
          700: '#1a202c',
          800: '#121827',
          900: '#0a0c14',
        },
      },
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', '.light &')
      addVariant('dark', '.dark &')
      addVariant('midnight', '.midnight &')
    }
  ],
} 