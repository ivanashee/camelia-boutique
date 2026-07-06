import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#F0C4CB",
        rose: "#C87D87",
        champagne: "#FBEAD6",
        thyme: "#6B7556",
        bisque: "#E5BCA9",
        ink: "#3a2f2a",
        muted: "#5b4a41",
        cream: "#FFFDFA",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
