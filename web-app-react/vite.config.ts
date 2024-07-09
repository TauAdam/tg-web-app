import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 443,
    host: '0.0.0.0',
    hmr: {
      host: 'tg-mini-app.local',
      port: 443,
    },
    https: {
      key: fs.readFileSync('./.cert/tg-mini-app.local+3-key.pem'),
      cert: fs.readFileSync('./.cert/tg-mini-app.local+3.pem'),
    },
  },
})
