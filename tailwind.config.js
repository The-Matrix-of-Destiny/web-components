const { heroui } = require("@heroui/theme");
const typography = require("@tailwindcss/typography");
const scrollbar = require("tailwind-scrollbar");
const cssnano = require("cssnano");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../web-components/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@thematrixofdestiny/web-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    debugScreens: {
      position: ["top", "right"],
    },
    extend: {
      fontFamily: {
        hatton: ["var(--font-hatton)"],
        sans: ["var(--font-sans)"],
      },
      backgroundImage: (theme) => ({
        "mx-blue-gradient-a": `linear-gradient(to right, ${theme("colors.lt.purple")}, ${theme("colors.lt.purple")})`,
        "mx-gray-gradient": `linear-gradient(to right, ${theme("colors.gray.200")}, ${theme("colors.gray.50")})`,
      }),
      colors: {
        lt: {
          purple: "#523274",
          pink: "#e9c0e9",
          red: "#780016",
          "dark-red": "#52130C",
          teal: "#35ADC4",
          "dark-blue": "#061592",
        },
        renee: {
          accent: "#f0684c",
          "accent-comp": "#fff",
          primary: "#140f14",
          bg: "#FFFDF9",
          "bg-alt": "#F3EDE6",
          "accent-alt": "#3a4b5f",
          "hover-bg": "#d19b98",
          buttons: {
            primary: {
              bg: "#0160FE",
              text: "#FFFDF9",
              hover: "#013B98",
              "text-hover": "#fff",
            },
            sec: "#f0684c text-renee-primary",
          },
        },
        background: "#FFFDFA",
        mx: {
          "strom-hue": {
            50: "#f6f7f9",
            100: "#eceff2",
            200: "#d4dbe3",
            300: "#aebdcb",
            400: "#8298ae",
            500: "#637c94",
            600: "#4e647b",
            700: "#405164",
            800: "#384554",
            900: "#323c48",
            950: "#212730",
          },
          "blue-hue": {
            50: "#edf8ff",
            100: "#d6efff",
            200: "#b6e4ff",
            300: "#83d5ff",
            400: "#49bcff",
            500: "#1f9aff",
            600: "#077aff",
            700: "#0162f4",
            800: "#084ec5",
            900: "#0e459a",
            950: "#0e2b5d",
          },
          blue: "#523274",
          storm: "#323C48",
          "sand-a": "#FFFDFA",
          "sand-b": "#F4EEE7",
          "sand-c": "#E8DFD4",
        },
        chakras: {
          root: "#f87171",
          sacral: "#fb8a3c",
          "solar-plexus": "#FEF08A",
          heart: "#10B981",
          throat: "#7DD3FC",
          "third-eye": "#3B82F6",
          crown: "#C084FC",
          dark: "#374151",
        },
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
        shuffle: {
          "0%, 100%": {
            transform: "perspective(2000px) rotateY(45deg) rotateZ(-2deg) translateX(0px)",
          },
          "25%": {
            transform: "perspective(2000px) rotateY(55deg) rotateZ(-4deg) translateX(20px)",
          },
          "75%": {
            transform: "perspective(2000px) rotateY(35deg) rotateZ(0deg) translateX(-20px)",
          },
        },
        "riffle-shuffle": {
          "0%, 100%": {
            transform: "perspective(2000px) rotateX(30deg) translateX(0) translateY(0)",
          },
          "25%": {
            transform: "perspective(2000px) rotateX(45deg) translateX(-100px) translateY(-20px) rotateZ(-5deg)",
          },
          "75%": {
            transform: "perspective(2000px) rotateX(45deg) translateX(100px) translateY(-20px) rotateZ(5deg)",
          },
        },
        "bridge-shuffle": {
          "0%, 100%": {
            transform: "perspective(2000px) rotateX(0deg) translateY(0) scale(1)",
          },
          "50%": {
            transform: "perspective(2000px) rotateX(-45deg) translateY(-50px) scale(0.95)",
          },
        },
        "cascade-shuffle": {
          "0%": {
            transform: "perspective(2000px) rotateX(30deg) translateY(0) translateZ(0)",
            opacity: "1",
          },
          "50%": {
            transform: "perspective(2000px) rotateX(45deg) translateY(-100px) translateZ(50px)",
            opacity: "0.7",
          },
          "100%": {
            transform: "perspective(2000px) rotateX(30deg) translateY(0) translateZ(0)",
            opacity: "1",
          },
        },
        "spin-shuffle": {
          "0%": {
            transform: "perspective(2000px) rotateY(0deg) translateZ(0)",
          },
          "50%": {
            transform: "perspective(2000px) rotateY(180deg) translateZ(50px)",
          },
          "100%": {
            transform: "perspective(2000px) rotateY(360deg) translateZ(0)",
          },
        },
        "spring-shuffle": {
          "0%, 100%": {
            transform: "perspective(2000px) translateY(0) scale(1) rotateX(0deg)",
          },
          "50%": {
            transform: "perspective(2000px) translateY(-30px) scale(0.95) rotateX(10deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shuffle: "shuffle 2s ease-in-out infinite",
        "riffle-shuffle": "riffle-shuffle 2s ease-in-out infinite",
        "bridge-shuffle": "bridge-shuffle 2s ease-in-out infinite",
        "cascade-shuffle": "cascade-shuffle 3s ease-in-out infinite",
        "spin-shuffle": "spin-shuffle 3s linear infinite",
        "spring-shuffle": "spring-shuffle 1s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    typography,
    scrollbar,
    heroui({
      themes: {
        light: { colors: { primary: "#523274" } },
        dark: { colors: { primary: "#523274" } },
      },
    }),
    cssnano({ preset: "default" }),
  ],
  // This ensures that the styles are properly scoped to your components
  corePlugins: {
    preflight: false,
  },
} 