import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "13px",
      },
      boxShadow: {
        soft: "0 4px 10px 0 rgba(0,0,0,0.1)", 
      },
    },
  },
  plugins: [],
} satisfies Config;

