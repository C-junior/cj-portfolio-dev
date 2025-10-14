<template>
  <Transition name="loading-fade">
    <div v-if="show" class="loading-indicator" :class="variant">
      <div class="loading-content">
        <div class="spinner" :class="size"></div>
        <p v-if="message" class="loading-message">{{ message }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'overlay', // 'overlay', 'inline', 'minimal'
    validator: (value) => ['overlay', 'inline', 'minimal'].includes(value)
  },
  size: {
    type: String,
    default: 'medium', // 'small', 'medium', 'large'
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})
</script>

<style scoped>
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-indicator.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
}

.loading-indicator.inline {
  padding: 2rem;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  margin: 1rem 0;
}

.loading-indicator.minimal {
  padding: 1rem;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--color-text);
}

.spinner {
  border-radius: 50%;
  border: 3px solid var(--color-surface);
  border-top: 3px solid var(--color-primary);
  animation: spin 1s linear infinite;
}

.spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner.medium {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.spinner.large {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

.loading-message {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>