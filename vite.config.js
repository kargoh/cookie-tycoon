import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false, // Allows <img src=""> to work
        },
      },
    })
  ],
  base: './',
    build: {
      emptyOutDir: true
    }
  }
)
