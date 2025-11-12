<template>
  <div 
    ref="skillBarRef"
    class="skill-bar"
    v-micro-interaction="'hover-lift'"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <div class="skill-bar__header">
      <div class="skill-bar__info">
        <h4 class="skill-bar__name">{{ skill.name }}</h4>
        <span class="skill-bar__years">{{ skill.years }} {{ skill.years === 1 ? 'year' : 'years' }}</span>
      </div>
      <div class="skill-bar__level">
        <span class="skill-bar__percentage">{{ animatedLevel }}%</span>
      </div>
    </div>
    
    <div class="skill-bar__track">
      <div 
        class="skill-bar__progress"
        :style="{ 
          width: `${animatedLevel}%`,
          transform: `scaleX(${isVisible ? 1 : 0})`
        }"
      >
        <!-- Skill level indicators -->
        <div class="skill-level-indicators">
          <span 
            v-for="(level, index) in levelThresholds" 
            :key="index"
            class="level-indicator" 
            :class="{ 'active': animatedLevel >= level.threshold }" 
            :style="{ left: level.position + '%' }"
            :title="getLevelName(level.threshold)"
          >
            <component :is="level.icon" :size="12" />
          </span>
        </div>
        <div class="skill-bar__glow"></div>
        <!-- XP points display -->
        <div class="skill-xp" v-if="animatedLevel > 0">
          {{ Math.floor(animatedLevel * 10) }} XP
        </div>
      </div>
    </div>
    
    <!-- Additional skill indicators below the progress bar -->
    <div class="skill-indicators">
      <div class="level-icons">
        <span 
          v-for="(level, index) in levelThresholds" 
          :key="'icon_'+index"
          class="level-icon" 
          :class="{ 'active': animatedLevel >= level.threshold }" 
        >
          <component :is="level.icon" :size="10" />
        </span>
      </div>
      <span class="icon-xp">{{ Math.floor(animatedLevel * 10) }} XP</span>
    </div>
    
    <!-- Hover tooltip with additional details -->
    <Transition name="tooltip">
      <div v-if="isHovered" class="skill-bar__tooltip">
        <div class="skill-bar__tooltip-content">
          <p class="skill-bar__tooltip-title">{{ skill.name }}</p>
          <p class="skill-bar__tooltip-experience">
            {{ skill.years }} {{ skill.years === 1 ? 'year' : 'years' }} of experience
          </p>
          <div class="skill-bar__tooltip-level">
            <span class="skill-bar__tooltip-label">Proficiency:</span>
            <span class="skill-bar__tooltip-value">{{ getLevelDescription(skill.level) }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useGamification } from '@/composables/useGamification'

const props = defineProps({
  skill: {
    type: Object,
    required: true,
    validator: (skill) => {
      return skill && 
             typeof skill.name === 'string' && 
             typeof skill.years === 'number' && 
             typeof skill.level === 'number'
    }
  },
  animationDelay: {
    type: Number,
    default: 0
  }
})

const { trackInteraction, trackSkillAchievement } = useGamification()

// Refs
const skillBarRef = ref(null)
const isHovered = ref(false)
const animatedLevel = ref(0)

// Intersection observer for scroll-triggered animation
const { isVisible } = useIntersectionObserver({
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
})

// Animation logic
const startAnimation = () => {
  if (animatedLevel.value > 0) return // Already animated
  
  setTimeout(() => {
    const duration = 2000 // 2 seconds for smoother animation
    const startTime = Date.now()
    const targetLevel = props.skill.level
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Enhanced easing function with bounce effect
      const easeOutBounce = (t) => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
        }
      }
      
      // Use cubic easing for smoother feel, bounce for final effect
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const easedProgress = progress < 0.8 ? easeOutCubic : easeOutBounce(progress)
      
      animatedLevel.value = Math.round(targetLevel * easedProgress)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Add a subtle pulse effect when animation completes
        const skillBarElement = skillBarRef.value
        if (skillBarElement) {
          skillBarElement.style.animation = 'pulse 0.5s ease-out'
          setTimeout(() => {
            skillBarElement.style.animation = ''
          }, 500)
        }
        
        // Track skill achievement when animation completes
        trackSkillAchievement(props.skill.name, props.skill.level)
      }
    }
    
    requestAnimationFrame(animate)
  }, props.animationDelay)
}

// Watch for visibility changes and start animation when visible
watch(isVisible, (visible) => {
  if (visible && animatedLevel.value === 0) {
    startAnimation()
  }
})

// Initialize animation if already visible
onMounted(() => {
  if (isVisible.value) {
    startAnimation()
  }
})

// Watch for visibility changes to trigger animation
watch(isVisible, (visible) => {
  if (visible) {
    startAnimation()
  }
})

// Hover handling
const handleHover = (hovered) => {
  isHovered.value = hovered
  if (hovered) {
    trackInteraction('skill-hover')
  }
}

// Get level description based on percentage
const getLevelDescription = (level) => {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  if (level >= 60) return 'Intermediate'
  if (level >= 40) return 'Beginner'
  return 'Learning'
}

// Define skill level thresholds for gamification
const levelThresholds = computed(() => [
  { threshold: 20, position: 20, icon: 'SproutIcon', name: 'Beginner' }, // Beginner
  { threshold: 40, position: 40, icon: 'StarIcon', name: 'Novice' }, // Novice
  { threshold: 60, position: 60, icon: 'ZapIcon', name: 'Intermediate' }, // Intermediate
  { threshold: 80, position: 80, icon: 'FlameIcon', name: 'Advanced' }, // Advanced
  { threshold: 90, position: 90, icon: 'TargetIcon', name: 'Expert' }  // Expert
])

// Get level name for title attribute
const getLevelName = (threshold) => {
  const level = levelThresholds.value.find(l => l.threshold === threshold)
  return level ? level.name : ''
}

// Initialize to the actual skill level if animation doesn't start
onMounted(() => {
  // Set the level immediately to prevent 0% display
  animatedLevel.value = props.skill.level
  
  // Start animation if element is visible
  if (isVisible.value) {
    animatedLevel.value = 0 // Reset to 0 to start animation
    startAnimation()
  }
})

// Watch for when the skill prop is updated and ensure the level is tracked
watch(() => props.skill.level, (newLevel) => {
  if (newLevel && animatedLevel.value < newLevel) {
    // If the skill level is updated and our animated level is lower, update it
    animatedLevel.value = newLevel
  }
  // Track the updated skill achievement
  if (props.skill.name) {
    trackSkillAchievement(props.skill.name, newLevel)
  }
})

// Watch for visibility changes and start animation when visible
watch(isVisible, (visible) => {
  if (visible && animatedLevel.value === 0) {
    startAnimation()
  } else if (visible && animatedLevel.value === props.skill.level) {
    // If animation already completed, ensure correct level is shown
    animatedLevel.value = props.skill.level
  }
})
</script>

<style scoped>
.skill-bar {
  position: relative;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(var(--color-accent-rgb), 0.1);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.skill-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.15);
  border-color: rgba(var(--color-accent-rgb), 0.3);
}

.skill-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.skill-bar__info {
  flex: 1;
}

.skill-bar__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
  line-height: 1.2;
}

.skill-bar__years {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.skill-bar__level {
  text-align: right;
}

.skill-bar__percentage {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-accent);
  text-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.skill-bar__percentage::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(var(--color-accent-rgb), 0.2), transparent);
  opacity: 0;
  animation: numberGlow 0.5s ease-out;
  pointer-events: none;
}

@keyframes numberGlow {
  0% { opacity: 0; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(1); }
}

.skill-bar__track {
  position: relative;
  height: 8px;
  background: rgba(var(--color-text-rgb), 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar__progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 4px;
  transform-origin: left;
  transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.3);
}

.skill-bar__progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0.1) 100%);
  animation: progressShimmer 2s infinite;
}

.skill-bar__glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
  animation: shimmer 2s infinite;
}

.skill-bar__tooltip {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
}

.skill-bar__tooltip-content {
  background: var(--color-surface);
  border: 1px solid rgba(var(--color-accent-rgb), 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  min-width: 200px;
  text-align: center;
}

.skill-bar__tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--color-surface);
}

.skill-bar__tooltip-title {
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.skill-bar__tooltip-experience {
  color: var(--color-text-secondary);
  margin: 0 0 0.5rem 0;
  font-size: 0.75rem;
}

.skill-bar__tooltip-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.skill-bar__tooltip-label {
  color: var(--color-text-secondary);
}

.skill-bar__tooltip-value {
  color: var(--color-accent);
  font-weight: 600;
}

/* Animations */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes progressShimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.15);
  }
  50% { 
    transform: scale(1.02); 
    box-shadow: 0 12px 35px rgba(var(--color-primary-rgb), 0.25);
  }
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

.tooltip-enter-to,
.tooltip-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Skill level indicators */
.skill-level-indicators {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  transform: translateY(-50%);
}

.level-indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.3;
  transition: all 0.3s ease;
  background: var(--color-background);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.level-indicator.active {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
  color: var(--color-accent);
  filter: drop-shadow(0 0 8px rgba(var(--color-accent-rgb), 0.7));
  animation: pulse-icon 1s ease infinite alternate;
}

.skill-xp {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 0.7rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 8px;
  white-space: nowrap;
}

/* Additional skill indicators below progress bar */
.skill-indicators {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0 0.25rem;
}

.level-icons {
  display: flex;
  gap: 0.25rem;
}

.level-icon {
  width: 12px;
  height: 12px;
  opacity: 0.3;
  transition: all 0.3s ease;
  color: var(--color-text);
}

.level-icon.active {
  opacity: 1;
  transform: scale(1.2);
  color: var(--color-accent);
  filter: drop-shadow(0 0 8px rgba(var(--color-accent-rgb), 0.7));
}

.icon-xp {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-accent);
}

/* Animation for active level indicators */
@keyframes pulse-icon {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.3);
    text-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.9);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .skill-bar {
    padding: 0.875rem;
  }
  
  .skill-bar__name {
    font-size: 0.9rem;
  }
  
  .skill-bar__years {
    font-size: 0.8rem;
  }
  
  .skill-bar__percentage {
    font-size: 1.125rem;
  }
  
  .skill-bar__track {
    height: 10px;
  }
  
  .skill-bar__tooltip {
    top: -110px;
    /* Adjust for mobile viewport */
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
  
  .skill-bar__tooltip-content {
    min-width: 200px;
    padding: 0.75rem;
  }
  
  .skill-bar:hover {
    transform: translateY(-1px);
  }
}

@media (max-width: 480px) {
  .skill-bar {
    padding: 0.75rem;
  }
  
  .skill-bar__header {
    margin-bottom: 0.5rem;
  }
  
  .skill-bar__name {
    font-size: 0.875rem;
    line-height: 1.3;
  }
  
  .skill-bar__years {
    font-size: 0.75rem;
  }
  
  .skill-bar__percentage {
    font-size: 1rem;
  }
  
  .skill-bar__track {
    height: 8px;
  }
  
  .skill-bar__tooltip {
    top: -100px;
    left: 1rem;
    right: 1rem;
    transform: none;
  }
  
  .skill-bar__tooltip-content {
    min-width: auto;
    padding: 0.5rem;
  }
  
  .skill-bar__tooltip-content::after {
    left: 50%;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .skill-bar:hover {
    transform: none;
    box-shadow: none;
    border-color: rgba(var(--color-accent-rgb), 0.1);
  }
  
  .skill-bar:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
  
  /* Show tooltip on tap instead of hover */
  .skill-bar__tooltip {
    display: none;
  }
  
  .skill-bar:active .skill-bar__tooltip {
    display: block;
  }
}
</style>