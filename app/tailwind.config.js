/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
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
};
