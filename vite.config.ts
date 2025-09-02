import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Tarayıcıda ihtiyaç duyulan Node modülleri
      include: ['buffer', 'process'],
      // window.Buffer ve window.process global’lerini sağla
      globals: { Buffer: true, process: true },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  define: {
    // Bazı paketler process.env bekliyor olabilir
    'process.env': {},
  },
})
