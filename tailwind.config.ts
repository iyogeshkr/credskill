import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d8fe",
          300: "#a4bcfc",
          400: "#7b96f8",
          500: "#5b6ef2",
          600: "#4650e6",
          700: "#3a3fcb",
          800: "#3135a4",
          900: "#2d3382",
          950: "#1c1f51",
        },
        surface: {
          0:   "#ffffff",
          50:  "#f8f9fc",
          100: "#f0f2f8",
          200: "#e2e6f0",
          800: "#1a1d2e",
          900: "#0f1120",
          950: "#080a14",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-brand": `
          radial-gradient(at 20% 20%, rgba(91,110,242,0.15) 0px, transparent 50%),
          radial-gradient(at 80% 80%, rgba(91,110,242,0.10) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(123,150,248,0.05) 0px, transparent 70%)
        `,
      },
      animation: {
        "fade-up":      "fadeUp 0.6s ease forwards",
        "fade-in":      "fadeIn 0.4s ease forwards",
        "score-reveal": "scoreReveal 1s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "pulse-slow":   "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        scoreReveal: {
          from: { opacity: "0", transform: "scale(0.7)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
