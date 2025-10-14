import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Remove comments in production
          comments: false
        }
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for large dependencies
          vendor: ['vue', 'vue-router'],
          // UI components chunk
          ui: [
            './src/components/ui/ThemeToggle.vue',
            './src/components/ui/LazyImage.vue',
            './src/components/ui/LazyComponent.vue'
          ],
          // Gamification chunk
          gamification: [
            './src/components/gamification/ProgressTracker.vue',
            './src/components/gamification/AchievementBadge.vue',
            './src/components/gamification/AchievementNotification.vue'
          ]
        }
      }
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'lucide-vue-next']
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false
  }
})
