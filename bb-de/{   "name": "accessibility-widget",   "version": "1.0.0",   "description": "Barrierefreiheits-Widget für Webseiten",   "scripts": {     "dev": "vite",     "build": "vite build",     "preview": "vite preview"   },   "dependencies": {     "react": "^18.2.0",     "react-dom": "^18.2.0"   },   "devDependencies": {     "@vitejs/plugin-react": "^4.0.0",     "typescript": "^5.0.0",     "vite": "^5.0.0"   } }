import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.tsx'),
      output: {
        entryFileNames: 'widget-main.js',
        assetFileNames: 'widget-styles.css',
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
