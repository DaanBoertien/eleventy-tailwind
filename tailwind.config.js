const defaultTheme = require('tailwindcss/defaultTheme');
const yaml = require('js-yaml');
const fs = require('fs');

const settingsYaml = fs.readFileSync('./_data/settings.yml', 'utf8');
const settings = yaml.load(settingsYaml);

module.exports = {
  content: ['./_site/**/*.{html,njk}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        ...defaultTheme.screens,
      },
      colors: {
        primary: settings.colorPrimary,
        secondary: settings.colorSecondary,
        background: settings.colorBackground,
      },
      fontFamily: {
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
        'average': ['Average', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
