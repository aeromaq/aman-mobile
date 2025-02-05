/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        wix: ['wix-regular'],
        'wix-medium': ['wix-medium'],
        'wix-semibold': ['wix-semibold'],
        'wix-bold': ['wix-bold'],
        'wix-extrabold': ['wix-extrabold'],
      }
    },
  },
  plugins: [],
}