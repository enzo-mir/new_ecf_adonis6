import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/js/app.tsx'],
      reload: ['resources/views/*.edge'],
    }),
    splitVendorChunkPlugin(),
    react(),
  ],
})
