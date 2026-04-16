/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        gmmx: {
          bg: "#FFF8FA",
          card: "#FFFFFF",
          primary: "#FF5C73",
          secondary: "#FF8FA3",
          text: "#111827",
          muted: "#6B7280",
          darkBg: "#0F172A",
          darkSurface: "#1E293B",
          darkCard: "#111827",
          darkText: "#F8FAFC"
        }
      },
      animation: {
        "fade-up": "fadeUp 700ms ease both",
        "fade-in": "fadeIn 600ms ease both"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

