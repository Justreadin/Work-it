/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark_gray: "#222222",
        logo: "#D9D9D9",
        dark_purple: "#300BB0",
        white_gray: "#F9F9F9",
        customPurple: "#6337FA"
      }
    },
  },
  plugins: [],
}


