<script setup>
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useLoadingState } from '@/composables/useLoadingState'
import { usePerformance, useResourceHints } from '@/composables/usePerformance'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import LoadingIndicator from '@/components/ui/LoadingIndicator.vue'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'

// Initialize theme system
useTheme()

// Initialize loading state
const { hasAnyLoading } = useLoadingState()

// Initialize performance monitoring
usePerformance()

// Initialize resource hints
const { preloadCriticalCSS } = useResourceHints()

// Preload critical resources
preloadCriticalCSS()
</script>

<template>
  <div id="app">
    <!-- Global loading indicator -->
    <LoadingIndicator 
      :show="hasAnyLoading" 
      message="Loading..."
      variant="overlay"
    />
    
    <!-- Theme toggle for testing - will be moved to header later -->
    <div class="theme-toggle-container">
      <ThemeToggle />
    </div>
    
    <!-- Error boundary wrapper -->
    <ErrorBoundary>
      <RouterView />
    </ErrorBoundary>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: var(--transition-colors);
}

.theme-toggle-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: var(--z-fixed);
}
</style>
