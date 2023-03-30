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

      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
 
  plugins: [],
}
