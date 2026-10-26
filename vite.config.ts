import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // добавь импорт

export default defineConfig({
  plugins: [react(), tailwindcss()], // добавь tailwindcss() в массив
})