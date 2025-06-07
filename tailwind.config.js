/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#FF5C02",
        "light-orange": "#FF9256",
      },
    },
  },
  plugins: [],
};
