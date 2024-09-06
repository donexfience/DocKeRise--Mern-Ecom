/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    animation: {
      moveRight: "translateX 0.5s ease-out",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"),
],
};
