/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {minWidth: {
      '85/100': '85%',
      '3/10': '30%',
    },minHeight: {
      '95/100': '95%',
      '1/10': '10%',
    },height: {
      '1/8': '12.5%',
    },inset: {
      '3/100': '3%',
      '1/10': '9%',
    },
  },
    
  },
  plugins: [],
}

