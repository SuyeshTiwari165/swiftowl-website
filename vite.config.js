import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    // Vite dev doesn't run /api/*.js as serverless functions the way Vercel
    // does. In local dev, proxy to a small Node shim that hosts the same
    // handler so form submissions can be tested end to end without the
    // Vercel CLI.
    proxy: { '/api': 'http://localhost:8788' },
  },
})
