<template>
  <div class="error-boundary">
    <div v-if="hasError" class="error-content">
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3 class="error-title">{{ errorTitle }}</h3>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-actions">
        <button @click="retry" class="retry-button">
          Try Again
        </button>
        <button v-if="showDetails" @click="toggleDetails" class="details-button">
          {{ showErrorDetails ? 'Hide Details' : 'Show Details' }}
        </button>
      </div>
      <div v-if="showErrorDetails && errorDetails" class="error-details">
        <pre>{{ errorDetails }}</pre>
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const props = defineProps({
  errorTitle: {
    type: String,
    default: 'Something went wrong'
  },
  errorMessage: {
    type: String,
    default: 'An unexpected error occurred. Please try again.'
  },
  showDetails: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['error', 'retry'])

const hasError = ref(false)
const errorDetails = ref('')
const showErrorDetails = ref(false)

const retry = () => {
  hasError.value = false
  errorDetails.value = ''
  showErrorDetails.value = false
  emit('retry')
}

const toggleDetails = () => {
  showErrorDetails.value = !showErrorDetails.value
}

onErrorCaptured((error, instance, info) => {
  hasError.value = true
  errorDetails.value = `${error.message}\n\nComponent: ${info}\n\nStack: ${error.stack}`
  
  emit('error', { error, instance, info })
  
  // Prevent the error from propagating further
  return false
})
</script>

<style scoped>
.error-boundary {
  width: 100%;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-error, #ef4444);
}

.error-icon {
  color: var(--color-error, #ef4444);
  margin-bottom: 1rem;
}

.error-title {
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.error-message {
  color: var(--color-text-secondary);
  margin: 0 0 2rem 0;
  max-width: 400px;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.retry-button,
.details-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-colors);
}

.retry-button {
  background-color: var(--color-primary);
  color: white;
}

.retry-button:hover {
  background-color: var(--color-primary-dark, var(--color-primary));
  transform: translateY(-1px);
}

.details-button {
  background-color: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border, var(--color-surface));
}

.details-button:hover {
  background-color: var(--color-surface);
  color: var(--color-text);
}

.error-details {
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--color-background);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border, var(--color-surface));
  max-width: 100%;
  overflow-x: auto;
}

.error-details pre {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 768px) {
  .error-content {
    padding: 2rem 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .retry-button,
  .details-button {
    width: 100%;
  }
}
</style>