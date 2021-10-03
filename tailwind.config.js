const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
	colors: {
		transparent: 'transparent',
		current: 'currentColor',
		black: colors.black,
		white: colors.white,
		gray: colors.gray,
		blue: colors.blue,
		indigo: colors.indigo,
		pink: colors.pink,
		green: colors.green
	},
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
