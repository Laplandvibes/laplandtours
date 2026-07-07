import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

import compression from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [react(), tailwindcss(), compression({ algorithms: ['brotliCompress'], threshold: 1024 })],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react-vendor'
            if (/[\\/]node_modules[\\/]lucide-react/.test(id)) return 'ui-vendor'
          }
          return undefined
        },
      },
    },
  },
})
