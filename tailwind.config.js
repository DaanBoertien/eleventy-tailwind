/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./_site/**/*.{html,njk}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        ...defaultTheme.screens,
    },
      colors: {
        'primary':'#AF9A59'
      },
    },
  },
  plugins: [],
}
