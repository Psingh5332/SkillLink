import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
})

// Parvinder Singh updated vite.config.js (Simulated Commit 4)
// Jigisha Prajapati updated vite.config.js (Simulated Commit 4)
// Raghav Mahendru updated vite.config.js (Simulated Commit 4)
