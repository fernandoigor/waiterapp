/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/screens/*.tsx",
    "./src/components/*.tsx",
    "./*.tsx"
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#D73035",
        "secondary":"#FFFFFF",
      }
    },
    
  },
  plugins: [],

};
