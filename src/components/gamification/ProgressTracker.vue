<template>
  <div class="progress-tracker" :class="{ 'expanded': showDetails }">
    <!-- Main Progress Circle -->
    <div class="progress-circle" @click="toggleDetails">
      <svg class="progress-svg" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          cx="50"
          cy="50"
          r="45"
          class="progress-bg"
        />
        <!-- Progress circle -->
        <circle
          cx="50"
          cy="50"
          r="45"
          class="progress-fill"
          :style="{ strokeDashoffset: progressOffset }"
          @animationend="onProgressAnimationEnd"
        />
      </svg>
      
      <!-- Progress text -->
      <div class="progress-text">
        <span class="progress-percentage">{{ completionPercentage }}%</span>
        <span class="progress-label">Complete</span>
      </div>
      
      <!-- Expand indicator -->
      <div class="expand-indicator" :class="{ 'rotated': showDetails }">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Detailed Progress -->
    <Transition name="details">
      <div v-if="showDetails" class="progress-details">
        <div class="section-progress">
          <h4 class="details-title">Section Progress</h4>
          <div class="section-list">
            <div
              v-for="section in sections"
              :key="section.id"
              class="section-item"
              :class="{ 'visited': isSectionVisited(section.id) }"
            >
              <div class="section-indicator">
                <svg v-if="isSectionVisited(section.id)" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <div v-else class="section-dot"></div>
              </div>
              <span class="section-name">{{ section.label }}</span>
            </div>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ interactionCount }}</div>
            <div class="stat-label">Interactions</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ formatTime(timeSpent) }}</div>
            <div class="stat-label">Time Spent</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ unlockedAchievements.length }}</div>
            <div class="stat-label">Achievements</div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGamification } from '@/composables/useGamification'
import { NAVIGATION_SECTIONS } from '@/utils/constants'

// Composables
const {
  completionPercentage,
  visitedSections,
  interactionCount,
  timeSpent,
  unlockedAchievements,
  trackInteraction
} = useGamification()

// Local state
const showDetails = ref(false)
const sections = NAVIGATION_SECTIONS

// Computed
const progressOffset = computed(() => {
  const circumference = 2 * Math.PI * 45 // radius = 45
  const progress = completionPercentage.value / 100
  return circumference - (progress * circumference)
})

// Methods
const toggleDetails = () => {
  showDetails.value = !showDetails.value
  trackInteraction('progress-tracker-toggle')
}

const isSectionVisited = (sectionId) => {
  return visitedSections.value.includes(sectionId)
}

const formatTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

const onProgressAnimationEnd = () => {
  // Add a subtle pulse effect when progress updates
  if (completionPercentage.value === 100) {
    trackInteraction('progress-completed')
  }
}

// Lifecycle
onMounted(() => {
  trackInteraction('progress-tracker-viewed')
})
</script>

<style scoped>
.progress-tracker {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 100;
  background: var(--color-surface);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s var(--ease);
  max-width: 280px;
}

.progress-tracker.expanded {
  transform: translateY(-50%) scale(1.02);
}

.progress-circle {
  position: relative;
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: transform 0.2s var(--ease);
}

.progress-circle:hover {
  transform: scale(1.05);
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: var(--color-surface);
  stroke-width: 8;
  opacity: 0.3;
}

.progress-fill {
  fill: none;
  stroke: var(--color-accent);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 283; /* 2 * π * 45 */
  transition: stroke-dashoffset 0.6s var(--ease);
  filter: drop-shadow(0 0 8px var(--color-accent));
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.progress-percentage {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

.progress-label {
  display: block;
  font-size: 10px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.expand-indicator {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-text-secondary);
  transition: transform 0.3s var(--ease);
}

.expand-indicator.rotated {
  transform: translateX(-50%) rotate(180deg);
}

.progress-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.details-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 12px 0;
}

.section-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  transition: all 0.2s var(--ease);
}

.section-item.visited {
  color: var(--color-accent);
}

.section-indicator {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-secondary);
  opacity: 0.5;
}

.section-name {
  font-size: 12px;
  color: inherit;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 8px 4px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.stat-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

.stat-label {
  font-size: 10px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

/* Transitions */
.details-enter-active,
.details-leave-active {
  transition: all 0.3s var(--ease);
  overflow: hidden;
}

.details-enter-from,
.details-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.details-enter-to,
.details-leave-from {
  opacity: 1;
  max-height: 300px;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .progress-tracker {
    right: 16px;
    padding: 12px;
    max-width: 240px;
  }
  
  .progress-circle {
    width: 60px;
    height: 60px;
  }
  
  .progress-percentage {
    font-size: 14px;
  }
  
  .progress-label {
    font-size: 8px;
  }
}

/* Hide on very small screens */
@media (max-width: 480px) {
  .progress-tracker {
    display: none;
  }
}
</style>