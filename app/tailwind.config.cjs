/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
        colors: {
          soundifyGreen: "#42AB47",
        },
        filter: {
          "gray": "grayscale(1)"
        },
        height: {
          "fill": "calc(100vh - 5rem)"
        }
      },
    },
  plugins: [],
}
