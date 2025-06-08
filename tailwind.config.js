/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../web-components/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@thematrixofdestiny/web-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lt: {
          purple: "#523274",
          pink: "#e9c0e9",
          red: "#780016",
          "dark-red": "#52130C",
          teal: "#35ADC4",
          "dark-blue": "#061592",
        },
      },
    },
  },
  plugins: [],
  // This ensures that the styles are properly scoped to your components
  corePlugins: {
    preflight: false,
  },
} 