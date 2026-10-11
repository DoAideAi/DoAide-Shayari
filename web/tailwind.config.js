/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FDFA', 100: '#CCFBF1', 200: '#99F6E4', 300: '#5EEAD4',
          400: '#2DD4BF', 500: '#0D9488', 600: '#0F766E', 700: '#115E59',
          800: '#134E4A', 900: '#042F2E',
        },
        da: {
          primary: '#0D9488',
          'primary-hover': '#0F766E',
          bg: '#FFFFFF',
          surface: '#F8FFFE',
          text: '#1E293B',
        },
      },
      fontFamily: {
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
