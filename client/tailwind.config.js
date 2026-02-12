/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       colors: {
        primary: "#006491",     // Domino's Blue
        secondary: "#E31837",   // Domino's Red
        dark: "#1C1C1C",
        light: "#FFFFFF",
        background: "#F4F6F8",
      },
    },
  },
  plugins: [],
};
