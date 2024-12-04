/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode:'class',

  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"], // Correct way to define font family
      },

      colors: {
        "dark": '#232A30',
        "medium": '#293245',
        background: "hsl(var(--background))", // Define HSL-based custom colors
        foreground: "hsl(var(--foreground))",
        
        primary: {
         DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [],
};
