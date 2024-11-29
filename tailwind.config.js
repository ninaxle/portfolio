/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",          // Targets all HTML files inside the src folder and its subdirectories
    "./*.{js,ts,jsx,tsx}" // Targets all JS, TS, JSX, and TSX files for Tailwind class usage
  ],

  
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Syne', 'sans-serif'],
      },
      fontSize: {
        'custom-3xl': '1.75rem', // Define a custom font size of 3rem
        'custom-4xl': '2rem', // Define a custom font size of 3rem
      },
      colors: {
        white: '#FCFBFC', // Replace this with your desired color code
        grey: '#282544',
        black: '#020D03',
        egg: '#E7E0E6',
        blob: '#0B83FE',
        gree: "#3AAD3C",
        beige: '#F8F6F6',
        grey2: '#6B6B6B',
      }
    },
  },
  plugins: [],
}

