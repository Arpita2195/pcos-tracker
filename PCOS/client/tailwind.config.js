/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#FADADD',
        cream: '#F5F5DC',
        warmBrown: '#8B5A2B',
        darkBrown: '#4A3018',
        cardLight: 'rgba(255, 255, 255, 0.6)'
      }
    },
  },
  plugins: [],
}
