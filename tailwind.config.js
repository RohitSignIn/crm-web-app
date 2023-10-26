/** @type {import('tailwindcss').Config} */

// Theme Default
// primary secondary accent info success warning error
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      light: "#fff",
      dark: "#393646",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=corporate]"],
        },

        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dracula]"],
        },
      },
    ],
  },
};
