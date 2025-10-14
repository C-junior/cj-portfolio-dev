<template>
  <div ref="componentRef" class="lazy-component">
    <component 
      v-if="component" 
      :is="component" 
      v-bind="$attrs"
      class="fade-in"
    />
    <div v-else-if="isVisible" class="loading-component">
      <div class="loading-spinner"></div>
      <span>Loading...</span>
    </div>
    <div v-else class="placeholder-component">
      <!-- Invisible placeholder to maintain layout -->
    </div>
  </div>
</template>

<script setup>
import { useLazyComponent } from '@/composables/useLazyLoading'

const props = defineProps({
  importFn: {
    type: Function,
    required: true
  },
  rootMargin: {
    type: String,
    default: '100px'
  },
  threshold: {
    type: Number,
    default: 0.1
  }
})

const { componentRef, isVisible, component } = useLazyComponent(props.importFn, {
  rootMargin: props.rootMargin,
  threshold: props.threshold
})
</script>

<style scoped>
.lazy-component {
  min-height: 50px; /* Prevent layout shift */
}

.loading-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--color-text-secondary);
  gap: 1rem;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-surface);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.placeholder-component {
  height: 1px; /* Minimal placeholder */
}
</style>