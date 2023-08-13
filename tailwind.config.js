/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ['Atkinson Hyperlegible', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
