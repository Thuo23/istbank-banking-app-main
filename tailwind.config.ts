import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        brand: {
          blue:   "#377DFF",
          green:  "#71D163",
          yellow: "#FFCC00",
          orange: "#ED8835",
        },
        neutral: {
          900: "#323B4B",
          700: "#8A94A6",
          500: "#B0B7C3",
          100: "#F2F3F5",
        },
        ist: {
          bg:      "var(--ist-bg)",
          surface: "var(--ist-surface)",
          border:  "var(--ist-border)",
          text:    "var(--ist-text)",
          subtext: "var(--ist-subtext)",
          muted:   "var(--ist-muted)",
          card:    "var(--ist-card)",
        },
        fill:        { 1: "rgba(255,255,255,0.10)" },
        bankGradient:"#377DFF",
        indigo:      { 500: "#6172F3", 700: "#3538CD" },
        success:     { 25:"#F6FEF9", 50:"#ECFDF3", 100:"#D1FADF", 600:"#039855", 700:"#027A48", 900:"#054F31" },
        pink:        { 25:"#FEF6FB", 100:"#FCE7F6", 500:"#EE46BC", 600:"#DD2590", 700:"#C11574", 900:"#851651" },
        blue:        { 25:"#EFF6FF", 100:"#DBEAFE", 500:"#377DFF", 600:"#2563EB", 700:"#1D4ED8", 900:"#1E3A8A" },
        green:       { 1:"#71D163" },
        black:       { 1:"#323B4B", 2:"#4B5563" },
        gray:        { 25:"#F9FAFB", 200:"#E5E7EB", 300:"#D1D5DB", 500:"#6B7280", 600:"#4B5563", 700:"#374151", 900:"#111827" },
      },
      fontFamily: {
        inter:           ["var(--font-inter)", "Inter", "sans-serif"],
        "ibm-plex-serif":["IBM Plex Serif", "serif"],
        "clash-display": ["'Clash Display'", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "bank-gradient":       "linear-gradient(135deg, #377DFF 0%, #2058D4 100%)",
        "card-gradient-dark":  "linear-gradient(135deg, #2A2D3A 0%, #1C1E26 100%)",
        "gradient-mesh":       "url('/icons/gradient-mesh.svg')",
        "bank-green-gradient": "linear-gradient(90deg, #71D163 0%, #4CAF50 100%)",
      },
      boxShadow: {
        form:       "0px 1px 2px 0px rgba(0,0,0,0.06)",
        chart:      "0px 1px 3px 0px rgba(0,0,0,0.08)",
        profile:    "0px 8px 16px -4px rgba(0,0,0,0.10)",
        creditCard: "0px 8px 24px 0px rgba(55,125,255,0.20)",
        blue:       "0px 4px 16px 0px rgba(55,125,255,0.25)",
        green:      "0px 4px 16px 0px rgba(113,209,99,0.25)",
      },
      fontSize: {
        "28": ["28px", "34px"],
        "22": ["22px", "28px"],
      },
      keyframes: {
        "accordion-down": { from:{height:"0"}, to:{height:"var(--radix-accordion-content-height)"} },
        "accordion-up":   { from:{height:"var(--radix-accordion-content-height)"}, to:{height:"0"} },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
