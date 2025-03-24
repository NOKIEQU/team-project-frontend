/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },

      animation: {
        'slideDown': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },

      colors: {
        "dark": '#232A30',
        "medium": '#293245',
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Custom Colors
        "button-bg": "#F0ECEC",
        "background": "#1A1A22",
      },
    },
  },

  plugins: [],
};