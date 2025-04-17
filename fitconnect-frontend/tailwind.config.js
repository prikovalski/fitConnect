/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#00B894',
        background: '#F0F9F7',
        highlight: '#FFA500',
        danger: '#FF6B6B',
      },
    },
  },
  plugins: [],
}
