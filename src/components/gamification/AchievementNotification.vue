<template>
  <Teleport to="body">
    <Transition name="notification" appear>
      <div v-if="visible" class="achievement-notification" @click="dismiss">
        <div class="notification-content">
          <div class="notification-icon">
            <span class="achievement-emoji">{{ achievement.icon }}</span>
            <div class="sparkle-effect">
              <div class="sparkle" v-for="i in 6" :key="i" :style="getSparkleStyle(i)"></div>
            </div>
          </div>
          
          <div class="notification-text">
            <div class="notification-title">Achievement Unlocked!</div>
            <div class="notification-subtitle">{{ achievement.title }}</div>
            <div class="notification-description">{{ achievement.description }}</div>
          </div>
          
          <button class="dismiss-button" @click="dismiss" aria-label="Dismiss notification">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  achievement: {
    type: Object,
    required: true
  },
  duration: {
    type: Number,
    default: 5000 // 5 seconds
  }
})

// Emits
const emit = defineEmits(['dismiss'])

// Local state
const visible = ref(true)
const progress = ref(100)

// Auto-dismiss timer
let dismissTimer = null
let progressTimer = null

// Methods
const dismiss = () => {
  visible.value = false
  clearTimers()
  setTimeout(() => {
    emit('dismiss')
  }, 300) // Wait for transition to complete
}

const clearTimers = () => {
  if (dismissTimer) {
    clearTimeout(dismissTimer)
    dismissTimer = null
  }
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

const startProgressBar = () => {
  const interval = 50 // Update every 50ms
  const decrement = (100 / props.duration) * interval
  
  progressTimer = setInterval(() => {
    progress.value -= decrement
    if (progress.value <= 0) {
      progress.value = 0
      dismiss()
    }
  }, interval)
}

const getSparkleStyle = (index) => {
  const angle = (index * 60) - 30 // Distribute sparkles around the icon
  const distance = 30 + (index % 2) * 10 // Vary distance
  const x = Math.cos(angle * Math.PI / 180) * distance
  const y = Math.sin(angle * Math.PI / 180) * distance
  
  return {
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--delay': `${index * 0.1}s`,
    '--duration': `${0.8 + (index % 3) * 0.2}s`
  }
}

// Lifecycle
onMounted(() => {
  // Auto-dismiss after duration
  dismissTimer = setTimeout(dismiss, props.duration)
  
  // Start progress bar animation
  startProgressBar()
  
  // Play achievement sound (if available)
  try {
    const audio = new Audio('/achievement-sound.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {
      // Ignore audio play errors (user interaction required)
    })
  } catch (error) {
    // Audio not available, continue silently
  }
})

onUnmounted(() => {
  clearTimers()
})
</script>

<style scoped>
.achievement-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  cursor: pointer;
  color: white;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  position: relative;
}

.notification-icon {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
}

.achievement-emoji {
  font-size: 32px;
  line-height: 1;
  z-index: 2;
  position: relative;
}

.sparkle-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  transform: translate(var(--x), var(--y));
  animation: sparkle var(--duration) ease-out var(--delay) infinite;
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  color: white;
}

.notification-subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
  color: white;
}

.notification-description {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
  color: white;
}

.dismiss-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s var(--ease);
  flex-shrink: 0;
}

.dismiss-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
}

.progress-fill {
  height: 100%;
  background: white;
  transition: width 0.05s linear;
}

/* Animations */
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: translate(var(--x), var(--y)) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(var(--x), var(--y)) scale(1);
  }
}

/* Transitions */
.notification-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-leave-active {
  transition: all 0.3s var(--ease);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .achievement-notification {
    top: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
  
  .notification-content {
    padding: 16px;
    gap: 12px;
  }
  
  .notification-icon {
    width: 50px;
    height: 50px;
  }
  
  .achievement-emoji {
    font-size: 28px;
  }
  
  .notification-title {
    font-size: 14px;
  }
  
  .notification-subtitle {
    font-size: 16px;
  }
  
  .notification-description {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .achievement-notification {
    top: 12px;
    right: 12px;
    left: 12px;
  }
}
</style>