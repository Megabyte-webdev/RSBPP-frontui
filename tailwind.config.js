/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "Ripple-Bold":['Ripple-Bold'],
      "Ripple-BoldItalic":['Ripple-BoldItalic'] ,
      "Ripple-Regular":['Ripple-Regular'],
      gridTemplateColumns:{
        'auto': "repeat(auto-fill, minmax(250px, 1fr))",
        'responsive': "repeat(auto-fill, minmax(200px, 1fr))",
        'responsive3': "repeat(auto-fill, minmax(300px, 1fr))"
      }
      
    },
  },
  plugins: [],
}

