/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "fundo": 'url("./src/assets/livro.jpg")'
      }
    },
  },
  plugins: [],
}
