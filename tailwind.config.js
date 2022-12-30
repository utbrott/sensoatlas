/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// Pallete extension
const grayColor = {
  50: '#F7FAFC',
  100: '#EDF2F7',
  200: '#E2E8F0',
  300: '#CBD5E0',
  400: '#A0AEC0',
  500: '#718096',
  600: '#4A5568',
  700: '#2D3748',
  800: '#1A202C',
  900: '#171923'
}

const deepGreenColor = {
  50: '#DFFAEA',
  100: '#B1F4D1',
  200: '#5ED9A2',
  300: '#43C78F',
  400: '#2BB47D',
  500: '#12A26C',
  600: '#008F5D',
  700: '#007D4E',
  800: '#006C43',
  900: '#005C38'
}

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        gray: grayColor,
        deepgreen: deepGreenColor
      },
      ringColor: {
        DEFAULT: colors.blue['500']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@headlessui/tailwindcss')
  ]
}
