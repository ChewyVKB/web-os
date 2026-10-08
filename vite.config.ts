import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Served from https://chewyvkb.github.io/web-os/
  base: '/web-os/',
  plugins: [react()],
})
