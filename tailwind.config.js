/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
        gridTemplateRows : {
            '8': 'repeat(8, minmax(0, 1fr))',
            '9': 'repeat(9, minmax(0, 1fr))',
            '10': 'repeat(10, minmax(0, 1fr))',
            '11': 'repeat(11, minmax(0, 1fr))',
            '12': 'repeat(12, minmax(0, 1fr))',
        },
        gridRow: {
            'span-11': 'span 11 / span 11',
        }
    },
  },
  plugins: [],
}

