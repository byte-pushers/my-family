// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}', // Modify the paths according to your project structure
  ],
  theme: {
    extend: {},
    listStyleType: {
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }
  },
  plugins: [
    require('@tailwindcss/forms'), // Adding the forms plugin
  ],
}
