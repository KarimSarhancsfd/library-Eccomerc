module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Specify the paths to all template files
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ["Mona Sans", ...defaultTheme.fontFamily.sans], // Add custom fonts
      },
      colors: {
        mauve: "#3f4159",
        heather: "#725767",
        blush: "#cd908b",
        grey: "#343434",
        github: "#4183c4",
        twitter: "#2daae1",
        linkedin: "#069",
        facebook: "#3b5997",
      },
    },
  },
  plugins: [],
};
