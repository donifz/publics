/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./src/Layout/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./src/Layout/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,ts,jsx,tsx}",
	],
  theme: {
    extend: {
      colors:{
        background:"#151316",
        purple:"#2E222F",
        stroke:"rgba(255, 255, 255, 0.5)"

      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
 
  plugins: [],
}
