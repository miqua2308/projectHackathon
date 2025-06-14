/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-500": "#22c55e",
        "green-600": "#16a34a",
      },
    },
  },
  plugins: [],
};
