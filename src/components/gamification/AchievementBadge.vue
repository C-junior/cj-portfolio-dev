<template>
  <div 
    class="achievement-badge"
    :class="{ 
      'unlocked': isUnlocked,
      'locked': !isUnlocked,
      'pulse': shouldPulse
    }"
    @click="handleClick"
  >
    <!-- Badge Icon -->
    <div class="badge-icon">
      <span class="icon-emoji">{{ achievement.icon }}</span>
      <div v-if="!isUnlocked" class="lock-overlay">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
    </div>

    <!-- Badge Content -->
    <div class="badge-content">
      <h4 class="badge-title">{{ achievement.title }}</h4>
      <p class="badge-description">{{ achievement.description }}</p>
      
      <!-- Progress Bar for locked achievements -->
      <div v-if="!isUnlocked && showProgress" class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
        <span class="progress-text">{{ progressText }}</span>
      </div>
      
      <!-- Unlock timestamp for unlocked achievements -->
      <div v-if="isUnlocked && achievement.unlockedAt" class="unlock-time">
        Unlocked {{ formatUnlockTime(achievement.unlockedAt) }}
      </div>
    </div>

    <!-- Shine effect for newly unlocked -->
    <div v-if="isUnlocked && shouldPulse" class="shine-effect"></div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useGamification } from '@/composables/useGamification'

// Props
const props = defineProps({
  achievement: {
    type: Object,
    required: true
  },
  showProgress: {
    type: Boolean,
    default: true
  },
  clickable: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['click', 'unlock'])

// Composables
const { 
  isAchievementUnlocked, 
  getProgressForAchievement,
  getSkillAchievementProgress,
  trackInteraction,
  visitedSections,
  interactionCount,
  timeSpent
} = useGamification()

// Local state
const shouldPulse = ref(false)

// Computed
const isUnlocked = computed(() => {
  return isAchievementUnlocked.value(props.achievement.id)
})

const progressPercentage = computed(() => {
  if (isUnlocked.value) return 100
  
  // Check if it's a skill achievement type and use the appropriate function
  const skillAchievementTypes = ['skill-expert', 'skill-advanced', 'skill-proficient', 
                                 'skill-expert-count', 'skill-advanced-count', 'skill-proficient-count']
  
  if (skillAchievementTypes.includes(props.achievement.type)) {
    return Math.round(getSkillAchievementProgress(props.achievement.id) * 100)
  }
  
  return Math.round(getProgressForAchievement(props.achievement.id) * 100)
})

const progressText = computed(() => {
  if (isUnlocked.value) return 'Complete!'
  
  const { achievement } = props
  let current = 0
  let total = achievement.threshold
  
  switch (achievement.type) {
    case 'sections':
      current = visitedSections.value.length
      return `${current}/${total} sections`
    case 'interactions':
      current = interactionCount.value
      return `${current}/${total} interactions`
    case 'time':
      current = timeSpent.value
      const currentMinutes = Math.floor(current / 60)
      const totalMinutes = Math.floor(total / 60)
      return `${currentMinutes}/${totalMinutes} minutes`
    case 'skill-expert':
    case 'skill-advanced':
    case 'skill-proficient':
      // For skill achievements, we'll use the generic percentage
      return `${Math.round(progressPercentage.value)}%`
    case 'skill-expert-count':
    case 'skill-advanced-count':
    case 'skill-proficient-count':
      current = Math.floor(getProgressForAchievement(props.achievement.id) * total)
      return `${current}/${total} skills`
    default:
      return `${Math.round(progressPercentage.value)}%`
  }
})

// Methods
const handleClick = () => {
  if (!props.clickable) return
  
  trackInteraction('achievement-badge-click')
  emit('click', props.achievement)
}

const formatUnlockTime = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

const triggerPulseEffect = () => {
  shouldPulse.value = true
  setTimeout(() => {
    shouldPulse.value = false
  }, 2000)
}

// Watch for achievement unlock
watch(isUnlocked, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    triggerPulseEffect()
    emit('unlock', props.achievement)
  }
})

// Lifecycle
onMounted(() => {
  trackInteraction('achievement-badge-viewed')
})
</script>

<style scoped>
.achievement-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s var(--ease);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.achievement-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.achievement-badge.unlocked {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%);
  border-color: var(--color-accent);
  color: white;
}

.achievement-badge.locked {
  opacity: 0.7;
}

.achievement-badge.pulse {
  animation: achievement-pulse 2s ease-in-out;
}

.badge-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.unlocked .badge-icon {
  background: rgba(255, 255, 255, 0.2);
}

.icon-emoji {
  font-size: 24px;
  line-height: 1;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  color: var(--color-text-secondary);
}

.badge-content {
  flex: 1;
  min-width: 0;
}

.badge-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: inherit;
}

.badge-description {
  font-size: 14px;
  color: inherit;
  opacity: 0.8;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.progress-container {
  margin-top: 8px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
  transition: width 0.6s var(--ease);
}

.locked .progress-fill {
  background: var(--color-text-secondary);
}

.progress-text {
  font-size: 12px;
  color: inherit;
  opacity: 0.7;
}

.unlock-time {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 4px;
  color: inherit;
}

.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shine 1.5s ease-in-out;
}

/* Animations */
@keyframes achievement-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .achievement-badge {
    padding: 12px;
    gap: 10px;
  }
  
  .badge-icon {
    width: 40px;
    height: 40px;
  }
  
  .icon-emoji {
    font-size: 20px;
  }
  
  .badge-title {
    font-size: 14px;
  }
  
  .badge-description {
    font-size: 12px;
  }
}
</style>