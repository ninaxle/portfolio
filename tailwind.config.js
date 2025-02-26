/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html", // Targets all HTML files inside the src folder and its subdirectories
    "./src/**/*.{js,ts,jsx,tsx}", // Targets all JS, TS, JSX, and TSX files for Tailwind class usage
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Syne", "sans-serif"],
      },
      fontSize: {
        "custom-3xl": "1.75rem", // Define a custom font size of 3rem
        "custom-4xl": "2rem", // Define a custom font size of 3rem
      },
      colors: {
        white: "#FCFBFC", // Replace this with your desired color code
        grey: "#C5C5C5",
        black: "#020D03",
        egg: "#E7E0E6",
        blob: "#4B52A2",
        gree: "#008080",
        beige: "#F8F6F6",
        light: "#f3f3f4",
        bock: "#211722",
        pig: "rgb(233, 41, 137)",
        peach:"#F9DDDC",
        lightblue: "#E5ECF6",
      },
    },
  },
  plugins: [],
};
