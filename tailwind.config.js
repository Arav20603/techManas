/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0F4C81',
          teal: '#0D7A6B',
          lavender: '#6B5FBF',
          coral: '#E36F5B',
          slate: '#1E293B',
          mist: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(15, 76, 129, 0.25)',
      },
    },
  },
  plugins: [],
}

