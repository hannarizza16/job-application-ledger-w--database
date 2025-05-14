/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html", // if you're using an HTML file
      "./src/**/*.{js,jsx,ts,tsx}", // for React/JS files
      "./node_modules/flowbite/**/*.js" // include Flowbite components

    ],
    theme: {
      extend: {
        colors: {
          offwhite: "#f4f2ee", // Custom color name
        },
        
      },
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
  