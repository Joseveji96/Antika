/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        rubik: ['Rubik-Regular', 'sans-serif'],
        "rubik-bold": ["Rubik-Bold", 'sans-serif'],
        "rubik-extrabold": ["Rubik-Extrabold", 'sans-serif'],
        "rubik-medium": ["Rubik-Medium", 'sans-serif'],
        "rubik-semi-bold": ["Rubik-SemiBold", 'sans-serif'],
        "rubik-light": ["Rubik-Light", 'sans-serif'],
      },
      colors:{ 
        "primary": {
          100: "#4A4CD60A",
          200: "#4A4CD61A",
          300: "#4A4CD6",
        },
        acent: {
          100: "#FBFBFD",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",

        },
        danger: "#F75555"
      }
    },
  },
  plugins: [],
}