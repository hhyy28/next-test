/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  
    './components/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',  
        darkBackground: '#000000',  
        darkForeground: '#ffffff',  
      },
    },
  },
  plugins: [],
}
