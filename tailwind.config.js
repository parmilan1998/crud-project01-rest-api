/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        popins: "'Poppins', sans-serif",
        roboto: "'Roboto', sans-serif",
        inter: "'Inter', sans-serif",
      },
      colors: {
        body: '#FE5056',
        primary: '#1f3e72',
        secondary: 'rgba(255, 255, 255, 0.78)',
        'blue-gradient':
          'linear-gradient(97.05deg, #4066ff 3.76%, #2949c6 100%)',
        'range-gradient':
          'linear-gradient(270deg, #ffb978 3.76%, #ff922d 100%)',
      },
    },
  },
  plugins: [],
}
