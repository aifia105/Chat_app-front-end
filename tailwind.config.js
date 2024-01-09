/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";
module.exports = withMT( {
  content: ["./src/**/*.{html,ts}",
  "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
    },
  },
  container:{
    center:true,
    padding: '1rem'

  },
  plugins: [
    require('flowbite/plugin')
  ],
});

