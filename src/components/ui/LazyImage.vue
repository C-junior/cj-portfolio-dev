<template>
  <div class="lazy-image-container" :class="{ 'loaded': isLoaded, 'error': isError }">
    <img
      ref="imageRef"
      :src="actualSrc"
      :alt="alt"
      :class="imageClass"
      @load="onLoad"
      @error="onError"
    />
    <div v-if="!isLoaded && !isError" class="loading-placeholder">
      <div class="loading-spinner"></div>
    </div>
    <div v-if="isError" class="error-placeholder">
      <span>Failed to load image</span>
    </div>
  </div>
</template>

<script setup>
import { useLazyImage } from '@/composables/useLazyLoading'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: ''
  },
  rootMargin: {
    type: String,
    default: '50px'
  },
  threshold: {
    type: Number,
    default: 0.1
  }
})

const { imageRef, actualSrc, isLoaded, isError } = useLazyImage(props.src, {
  rootMargin: props.rootMargin,
  threshold: props.threshold
})

const onLoad = () => {
  // Additional load handling if needed
}

const onError = () => {
  // Additional error handling if needed
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
}

.lazy-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity var(--transition-base);
  opacity: 0;
}

.lazy-image-container.loaded img {
  opacity: 1;
}

.loading-placeholder,
.error-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-surface);
  border-top: 2px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-placeholder {
  font-size: 0.875rem;
  text-align: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>