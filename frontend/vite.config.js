import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    host: '0.0.0.0', // para acesso via Docker
    port: 5173,
  },
  build: {
    rollupOptions: {
      // Normalmente não é necessário externalizar 'recharts',
      // mas se quiser testar, descomente a linha abaixo:
      // external: ['recharts'],
    },
  },
})
