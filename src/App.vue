<script setup>
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useLoadingState } from '@/composables/useLoadingState'
import { usePerformance, useResourceHints } from '@/composables/usePerformance'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Navigation from '@/components/layout/Navigation.vue'
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
    
    <!-- Header with navigation and theme toggle -->
    <Header />
    
    <!-- Desktop scroll spy navigation -->
    <Navigation />
    
    <!-- Main content area -->
    <main class="main-content">
      <!-- Error boundary wrapper -->
      <ErrorBoundary>
        <RouterView />
      </ErrorBoundary>
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: var(--transition-colors);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 5rem; /* Account for fixed header */
  min-height: calc(100vh - 5rem);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .main-content {
    padding-top: 4.5rem; /* Smaller header on mobile */
    min-height: calc(100vh - 4.5rem);
  }
}

/* Ensure smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Accessibility: Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
