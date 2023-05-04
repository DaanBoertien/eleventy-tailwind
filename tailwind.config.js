const defaultTheme = require('tailwindcss/defaultTheme');
const yaml = require('js-yaml');
const fs = require('fs');

const colorsYaml = fs.readFileSync('./_data/colors.yml', 'utf8');
const colors = yaml.load(colorsYaml);

module.exports = {
  content: ['./_site/**/*.{html,njk}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        ...defaultTheme.screens,
      },
      colors: {
        primary: colors.primary,
      },
      fontFamily: {
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
        'average': ['Average', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
