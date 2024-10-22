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
        'auto': "repeat(auto-fill, minmax(250px, 1fr))"
      }
      
    },
  },
  plugins: [],
}

