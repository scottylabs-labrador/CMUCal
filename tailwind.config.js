/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'tan': '#bcb49e',
        'beige': '#e4dac4',
        'teal': '#1f4c4c',
        'green': '#719f94',
        'blue': '#182c4b',
        'red': '#C41230',
        'grey': '#757575',
        'lightgrey':'#F5F5F5',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
      },
    },
  },
  plugins: [],
};
