import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port : 4000
  },
  build: {
    rollupOptions: {
        output:
        {
            format: 'es',
            strict: false,
            entryFileNames: "[name].js",
            dir: 'dist/'
        }
     }
  },
})
