/** @type {import('tailwindcss').Config} */
import WithMT from "@material-tailwind/react/utils/withMT";
export default WithMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-icon": "#F0BB62",
        "green-icon": "#48BB78",
        "orange-icon": "#ED8936",
      },
      backgroundImage: {
        "login-side": "url('/src/assets/soft-bg.jpg')",
      },
    },
  },
  plugins: [],
});
