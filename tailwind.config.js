/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        joy: "#FFD200",
        energy: "#DB0E0E",
        whizzo: "#004DAA",
        cool: "#373D42",
        secondary: {
          orange: "#EF3E23",
          coral: "#F2692D",
          cream: "#FFE3B6",
          teal: "#088C9E",
          mint: "#7FC2B4",
          deep: "#017399",
        },
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
