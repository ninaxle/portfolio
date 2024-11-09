/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/navbar.html",
    "./src/footer.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        blob: '#0E66FE',
        green: "#2EBF16",
        beige: '#F8F6F6',
      }
    },
  },
  plugins: [],
}

