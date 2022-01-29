import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  plugins: [
    react(),
    replace({
      delimiters: ['', ''],
      preventAssignment: false,
      '"/service_backend"':
        "import.meta.env.MODE === 'dev' || import.meta.env.MODE === 'production' ? import.meta.env.VITE_BACKEND_BASE_URL : '/service_backend'",
    }),
  ],
  build: {
    minify: 'esbuild',
  },
  server: {
    open: true,
    proxy: {
      '/service_backend': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service_backend/, ''),
      },
    },
  },
})
