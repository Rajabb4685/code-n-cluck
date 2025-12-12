import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),
    react()],
    base: '/code-n-cluck/',
})






// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     // Crucial: Scan all React components in src/ for Tailwind classes
//     "./src/**/*.{js,ts,jsx,tsx}", 
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }