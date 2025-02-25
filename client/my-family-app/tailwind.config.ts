// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}', // Modify the paths according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // Adding the forms plugin
  ],
}
