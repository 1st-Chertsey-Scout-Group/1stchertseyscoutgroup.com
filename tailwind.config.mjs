/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      border: "var(--border)",
      transparent: "var(--transparent)",
      inherit: "inherit",
      white: "var(--white)",

      "gradient-start": "var(--gradient-start)",
      "gradient-end": "var(--gradient-end)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      alternative: {
        DEFAULT: "var(--alternative-background)",
        foreground: "var(--alternative-foreground)",
      },
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
      objectPosition: {
        'center-left': 'center left',
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
      screens: {
        'portrait': {
          'raw': '(orientation: portrait)'
        },
        'landscape': {
          'raw': '(orientation: landscape)'
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}