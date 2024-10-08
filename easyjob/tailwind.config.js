/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar: "#2B7A78",
        alert: "#FCE7F3",
        alert_border: "#f87171",
        alert_text: "#b91c1c",
        white: "#ffffff",
        gray700: "#374151",
        blue500: "#3b82f6",
        blue700: "#1d4ed8",
        bgmain: "#def2f1",
        darkgray: "#17252A",
        greenboton: "#8FCB9B",
      },
    },
  },
  plugins: [],
};
