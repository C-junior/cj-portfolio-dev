import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import global styles
import './assets/styles/main.css'

// Import custom directives
import { scrollReveal, staggerChildren, microInteraction } from './directives/scrollReveal.js'

// Import performance monitoring
import { runPerformanceTest } from './utils/performanceTest.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register custom directives
app.directive('scroll-reveal', scrollReveal)
app.directive('stagger-children', staggerChildren)
app.directive('micro-interaction', microInteraction)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
  
  // In production, you might want to send this to an error tracking service
  if (import.meta.env.PROD) {
    // Example: sendToErrorTracking(err, instance, info)
  }
}

app.mount('#app')

// Run performance test after app is mounted
if (import.meta.env.DEV) {
  // Wait for initial render to complete
  setTimeout(() => {
    runPerformanceTest({
      loadComplete: 3000, // 3 second budget
      fcp: 1800,
      lcp: 2500
    })
  }, 100)
}
