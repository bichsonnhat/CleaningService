import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config = withMT({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        stale: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: " #475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "gilroy-regular": ["Gilroy-Regular"],
        "gilroy-extraBoldItalic": ["Gilroy-ExtraBoldItalic"],
        "gilroy-bold": ["Gilroy-Bold"],
        "gilroy-black": ["Gilroy-Black"],
        "gilroy-light": ["Gilroy-Light"],
        "gilroy-semibold": ["Gilroy-Semibold"],
        "gilroy-medium": ["Gilroy-Medium"],
        "gilroy-mediumItalic": ["Gilroy-MediumItalic"],
        "gilroy-blackItalic": ["Gilroy-BlackItalic"],
        "gilroy-ultraLight": ["Gilroy-UltraLight"],
        "gilroy-regularItalic": ["Gilroy-RegularItalic"],
        "gilroy-semiboldItalic": ["Gilroy-SemiboldItalic"],
        "gilroy-heavyItalic": ["Gilroy-HeavyItalic"],
        "gilroy-extraBold": ["Gilroy-Extrabold"],
        "gilroy-boldItalic": ["Gilroy-BoldItalic"],
        "gilroy-ultraLightItalic": ["Gilroy-UltraLightItalic"],
        "gilroy-lightItalic": ["Gilroy-LightItalic"],
        "gilroy-heavy": ["Gilroy-Heavy"],
        "gilroy-thin": ["Gilroy-Thin"],
        "gilroy-thinItalic": ["Gilroy-ThinItalic"],
        "Averta-Bold": ["Averta-Bold"],
        "Averta-Regular": ["Averta-Regular"],
        "Averta-Semibold": ["Averta-Semibold"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
}) satisfies Config;

export default config;
