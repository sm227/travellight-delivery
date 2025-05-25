/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'force-light-bg': '#ffffff',
        'force-light-text': '#171717',
        'force-dark-bg': '#0a0a0a',
        'force-dark-text': '#ededed',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
} 