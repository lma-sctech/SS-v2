import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        ivory: "#F8F5EF",
        champagne: "#D6B87C",
        slate: "#475569",
        whatsapp: "#25D366",
        ink: "#182235",
        mist: "#EEF2F6",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.12)",
        glow: "0 20px 80px rgba(214, 184, 124, 0.18)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        serif: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
