<template>
  <component
    :is="tag"
    class="interactive-element"
    :class="[
      `feedback-${feedbackType}`,
      { 
        'has-ripple': enableRipple,
        'is-active': isActive,
        'is-disabled': disabled
      }
    ]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <!-- Ripple effect -->
    <div v-if="enableRipple" class="ripple-container" ref="rippleContainer">
      <div
        v-for="ripple in ripples"
        :key="ripple.id"
        class="ripple"
        :style="ripple.style"
        @animationend="removeRipple(ripple.id)"
      ></div>
    </div>
    
    <!-- Hover glow effect -->
    <div v-if="enableGlow" class="glow-effect"></div>
    
    <!-- Content slot -->
    <slot></slot>
    
    <!-- Interaction indicator -->
    <div v-if="showIndicator && hasInteracted" class="interaction-indicator">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
    </div>
  </component>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useGamification } from '@/composables/useGamification'

// Props
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  feedbackType: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'accent', 'success', 'warning'].includes(value)
  },
  enableRipple: {
    type: Boolean,
    default: true
  },
  enableGlow: {
    type: Boolean,
    default: true
  },
  showIndicator: {
    type: Boolean,
    default: false
  },
  trackInteraction: {
    type: Boolean,
    default: true
  },
  interactionType: {
    type: String,
    default: 'element-interaction'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hapticFeedback: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['click', 'interact', 'hover', 'focus'])

// Composables
const { trackInteraction: trackGamificationInteraction } = useGamification()

// Local state
const ripples = ref([])
const rippleContainer = ref(null)
const isActive = ref(false)
const hasInteracted = ref(false)
let rippleId = 0

// Computed
const canInteract = computed(() => !props.disabled)

// Methods
const handleClick = (event) => {
  if (!canInteract.value) return
  
  // Track interaction for gamification
  if (props.trackInteraction) {
    trackGamificationInteraction(props.interactionType)
  }
  
  // Create ripple effect
  if (props.enableRipple) {
    createRipple(event)
  }
  
  // Haptic feedback (if supported)
  if (props.hapticFeedback && 'vibrate' in navigator) {
    navigator.vibrate(50)
  }
  
  // Mark as interacted
  hasInteracted.value = true
  
  // Emit events
  emit('click', event)
  emit('interact', { type: 'click', event })
}

const handleMouseEnter = (event) => {
  if (!canInteract.value) return
  
  isActive.value = true
  emit('hover', { type: 'enter', event })
}

const handleMouseLeave = (event) => {
  if (!canInteract.value) return
  
  isActive.value = false
  emit('hover', { type: 'leave', event })
}

const handleFocus = (event) => {
  if (!canInteract.value) return
  
  isActive.value = true
  emit('focus', { type: 'focus', event })
}

const handleBlur = (event) => {
  if (!canInteract.value) return
  
  isActive.value = false
  emit('focus', { type: 'blur', event })
}

const createRipple = (event) => {
  if (!rippleContainer.value) return
  
  const rect = rippleContainer.value.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const ripple = {
    id: ++rippleId,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`
    }
  }
  
  ripples.value.push(ripple)
  
  // Auto-remove ripple after animation
  setTimeout(() => {
    removeRipple(ripple.id)
  }, 600)
}

const removeRipple = (id) => {
  const index = ripples.value.findIndex(ripple => ripple.id === id)
  if (index > -1) {
    ripples.value.splice(index, 1)
  }
}

// Public methods for external control
const triggerInteraction = (type = 'programmatic') => {
  if (props.trackInteraction) {
    trackGamificationInteraction(`${props.interactionType}-${type}`)
  }
  hasInteracted.value = true
  emit('interact', { type, programmatic: true })
}

const resetInteraction = () => {
  hasInteracted.value = false
  ripples.value = []
}

// Expose methods
defineExpose({
  triggerInteraction,
  resetInteraction
})
</script>

<style scoped>
.interactive-element {
  position: relative;
  cursor: pointer;
  transition: all 0.2s var(--ease);
  overflow: hidden;
  user-select: none;
  outline: none;
}

.interactive-element:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.interactive-element.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}

/* Feedback types */
.feedback-default:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feedback-primary:hover:not(.is-disabled) {
  background-color: var(--color-primary);
  transform: scale(1.02);
}

.feedback-accent:hover:not(.is-disabled) {
  background-color: var(--color-accent);
  transform: scale(1.02);
}

.feedback-success:hover:not(.is-disabled) {
  background-color: #10b981;
  transform: scale(1.02);
}

.feedback-warning:hover:not(.is-disabled) {
  background-color: #f59e0b;
  transform: scale(1.02);
}

/* Ripple effect */
.ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: inherit;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-animation 0.6s ease-out;
  pointer-events: none;
}

/* Glow effect */
.glow-effect {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--color-accent), var(--color-secondary));
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s var(--ease);
  pointer-events: none;
  z-index: -1;
  filter: blur(4px);
}

.interactive-element:hover .glow-effect:not(.is-disabled) {
  opacity: 0.3;
}

.interactive-element.is-active .glow-effect {
  opacity: 0.5;
}

/* Interaction indicator */
.interaction-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: var(--color-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  opacity: 0;
  transform: scale(0);
  animation: indicator-appear 0.3s ease-out 0.1s forwards;
}

/* Animations */
@keyframes ripple-animation {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes indicator-appear {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Active state */
.interactive-element.is-active {
  transform: scale(0.98);
}

/* Button-specific styles */
.interactive-element[role="button"],
.interactive-element button {
  border: none;
  background: none;
  font: inherit;
  color: inherit;
}

/* Link-specific styles */
.interactive-element a {
  text-decoration: none;
  color: inherit;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .interactive-element,
  .ripple,
  .glow-effect,
  .interaction-indicator {
    animation: none !important;
    transition: none !important;
  }
  
  .interactive-element:hover:not(.is-disabled) {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .interactive-element:focus-visible {
    outline: 3px solid currentColor;
  }
  
  .glow-effect {
    display: none;
  }
}
</style>