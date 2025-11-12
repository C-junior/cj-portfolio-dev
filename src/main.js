import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { 
  Sprout,
  Star,
  Zap,
  Flame,
  Target,
  Map,
  Search,
  Clock,
  Trophy,
  Award,
  Monitor,
  Palette,
  Wrench,
  GraduationCap,
  Languages,
  Sparkles,
  PartyPopper,
  Medal,
  Code,
  Hammer,
  Rocket
} from 'lucide-vue-next'

import App from './App.vue'
import router from './router'

// Import global styles
import './assets/styles/main.css'

// Import custom directives
import { scrollReveal, staggerChildren, microInteraction } from './directives/scrollReveal.js'

// Import performance monitoring
import { runPerformanceTest } from './utils/performanceTest.js'

// Import asset preloading
import { initializeAssetPreloading } from './utils/preloadAssets.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register Lucide icons globally
app.component('SproutIcon', Sprout)
app.component('StarIcon', Star)
app.component('ZapIcon', Zap)
app.component('FlameIcon', Flame)
app.component('TargetIcon', Target)
app.component('MapIcon', Map)
app.component('SearchIcon', Search)
app.component('ClockIcon', Clock)
app.component('TrophyIcon', Trophy)
app.component('AwardIcon', Award)
app.component('MonitorIcon', Monitor)
app.component('PaletteIcon', Palette)
app.component('WrenchIcon', Wrench)
app.component('GraduationCapIcon', GraduationCap)
app.component('LanguagesIcon', Languages)
app.component('SparklesIcon', Sparkles)
app.component('PartyPopperIcon', PartyPopper)
app.component('MedalIcon', Medal)
app.component('CodeIcon', Code)
app.component('HammerIcon', Hammer)
app.component('RocketIcon', Rocket)

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

// Initialize asset preloading for better performance
initializeAssetPreloading()

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
