import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        border: "rgba(255, 255, 255, 0.12)",
        background: "#050705",
        foreground: "#f3f4f6",
        muted: {
          DEFAULT: "#121a14",
          foreground: "#9ca3af",
        },
        brand: {
          accent: "#00FC43",
          accentHover: "#19ff56",
          accentDim: "#00851e",
          mint: "#B7F7C4",
          deep: "#168A50",
          emerald: "#105B35",
          dark: "#050705",
          obsidian: "#080d09",
          card: "#0c120e",
          cardLight: "#121c15",
          surface: "#0a140b",
        },
      },
      boxShadow: {
        "neon-sm": "0 0 15px -2px rgba(0, 252, 67, 0.35)",
        "neon-md": "0 0 30px -3px rgba(0, 252, 67, 0.4)",
        "neon-lg": "0 0 50px -5px rgba(0, 252, 67, 0.45)",
        "card-glow": "0 10px 40px -10px rgba(0, 252, 67, 0.25)",
        "popular-card": "0 10px 45px -10px rgba(0, 252, 67, 0.25)",
      },
      height: {
        '92': '23rem',
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration, 40s) linear infinite",
        "float-slow": "floatSlow 7s ease-in-out infinite",
        "float-reverse": "floatSlow 9s ease-in-out infinite reverse",
        "pulse-glow": "pulseGlow 3.5s ease-in-out infinite",
        "radar-pulse": "radarPulse 2.8s cubic-bezier(0, 0, 0.2, 1) infinite",
        "glow-drift": "glowDrift 12s ease-in-out infinite alternate",
        "spin-slow": "spinSlow 45s linear infinite",
        "spin-reverse": "spinSlow 60s linear infinite reverse",
      },
      keyframes: {
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-14px) scale(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 15px rgba(0, 252, 67, 0.35))" },
          "50%": { opacity: "0.95", filter: "drop-shadow(0 0 35px rgba(0, 252, 67, 0.75))" },
        },
        radarPulse: {
          "0%": { transform: "scale(0.95)", opacity: "0.8" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        glowDrift: {
          "0%": { transform: "translate(-50%, -10%) scale(1)" },
          "50%": { transform: "translate(-48%, -6%) scale(1.08)" },
          "100%": { transform: "translate(-52%, -12%) scale(0.96)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
