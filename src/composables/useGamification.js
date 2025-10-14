import { ref, reactive, computed, readonly, watch, onMounted } from 'vue'
import { NAVIGATION_SECTIONS } from '@/utils/constants'

const GAMIFICATION_KEY = 'portfolio-gamification'

// Achievement types
export const ACHIEVEMENT_TYPES = {
  EXPLORER: 'explorer',
  COMPLETIONIST: 'completionist',
  CURIOUS: 'curious',
  ENGAGED: 'engaged'
}

// Achievement definitions
export const ACHIEVEMENTS = {
  [ACHIEVEMENT_TYPES.EXPLORER]: {
    id: ACHIEVEMENT_TYPES.EXPLORER,
    title: 'Explorer',
    description: 'Visited your first section',
    icon: '🗺️',
    threshold: 1,
    type: 'sections'
  },
  [ACHIEVEMENT_TYPES.COMPLETIONIST]: {
    id: ACHIEVEMENT_TYPES.COMPLETIONIST,
    title: 'Completionist',
    description: 'Explored all sections',
    icon: '🏆',
    threshold: NAVIGATION_SECTIONS.length,
    type: 'sections'
  },
  [ACHIEVEMENT_TYPES.CURIOUS]: {
    id: ACHIEVEMENT_TYPES.CURIOUS,
    title: 'Curious Mind',
    description: 'Made 10 interactions',
    icon: '🔍',
    threshold: 10,
    type: 'interactions'
  },
  [ACHIEVEMENT_TYPES.ENGAGED]: {
    id: ACHIEVEMENT_TYPES.ENGAGED,
    title: 'Engaged Visitor',
    description: 'Spent 2 minutes exploring',
    icon: '⏰',
    threshold: 120, // 2 minutes in seconds
    type: 'time'
  }
}

// Global reactive gamification state
const gamificationState = reactive({
  visitedSections: [],
  achievements: [],
  interactionCount: 0,
  timeSpent: 0,
  sessionStartTime: null,
  isInitialized: false
})

export function useGamification() {
  // Initialize gamification data from localStorage
  const initializeGamification = () => {
    try {
      const savedData = localStorage.getItem(GAMIFICATION_KEY)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        gamificationState.visitedSections = parsed.visitedSections || []
        gamificationState.achievements = parsed.achievements || []
        gamificationState.interactionCount = parsed.interactionCount || 0
        gamificationState.timeSpent = parsed.timeSpent || 0
      }
    } catch (error) {
      console.warn('Failed to load gamification data:', error)
    }
    
    gamificationState.sessionStartTime = Date.now()
    gamificationState.isInitialized = true
    
    // Start time tracking
    startTimeTracking()
  }

  // Save gamification data to localStorage
  const saveGamificationData = () => {
    try {
      const dataToSave = {
        visitedSections: gamificationState.visitedSections,
        achievements: gamificationState.achievements,
        interactionCount: gamificationState.interactionCount,
        timeSpent: gamificationState.timeSpent
      }
      localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.warn('Failed to save gamification data:', error)
    }
  }

  // Track section visit
  const visitSection = (sectionId) => {
    if (!gamificationState.visitedSections.includes(sectionId)) {
      gamificationState.visitedSections.push(sectionId)
      checkAchievements()
      saveGamificationData()
    }
  }

  // Track user interaction
  const trackInteraction = (interactionType = 'general') => {
    gamificationState.interactionCount++
    checkAchievements()
    saveGamificationData()
  }

  // Start time tracking
  const startTimeTracking = () => {
    // Update time spent every 5 seconds
    setInterval(() => {
      if (gamificationState.sessionStartTime && document.visibilityState === 'visible') {
        const currentTime = Date.now()
        const sessionTime = Math.floor((currentTime - gamificationState.sessionStartTime) / 1000)
        gamificationState.timeSpent += 5 // Add 5 seconds
        checkAchievements()
        saveGamificationData()
      }
    }, 5000)

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        gamificationState.sessionStartTime = Date.now()
      }
    })
  }

  // Check and unlock achievements
  const checkAchievements = () => {
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      // Skip if already unlocked
      if (gamificationState.achievements.some(a => a.id === achievement.id)) {
        return
      }

      let shouldUnlock = false

      switch (achievement.type) {
        case 'sections':
          shouldUnlock = gamificationState.visitedSections.length >= achievement.threshold
          break
        case 'interactions':
          shouldUnlock = gamificationState.interactionCount >= achievement.threshold
          break
        case 'time':
          shouldUnlock = gamificationState.timeSpent >= achievement.threshold
          break
      }

      if (shouldUnlock) {
        unlockAchievement(achievement)
      }
    })
  }

  // Unlock achievement
  const unlockAchievement = (achievement) => {
    const unlockedAchievement = {
      ...achievement,
      unlockedAt: Date.now()
    }
    
    gamificationState.achievements.push(unlockedAchievement)
    
    // Emit achievement unlocked event for UI feedback
    window.dispatchEvent(new CustomEvent('achievement-unlocked', {
      detail: unlockedAchievement
    }))
  }

  // Trigger achievement manually (for testing)
  const triggerAchievement = (achievementId, title = 'Test Achievement', description = 'This is a test achievement') => {
    const testAchievement = {
      id: achievementId,
      title,
      description,
      icon: '🎉',
      unlockedAt: Date.now()
    }
    
    // Emit achievement unlocked event for UI feedback
    window.dispatchEvent(new CustomEvent('achievement-unlocked', {
      detail: testAchievement
    }))
  }

  // Computed properties
  const completionPercentage = computed(() => {
    const totalSections = NAVIGATION_SECTIONS.length
    const visitedCount = gamificationState.visitedSections.length
    return Math.round((visitedCount / totalSections) * 100)
  })

  const isAchievementUnlocked = computed(() => (achievementId) => {
    return gamificationState.achievements.some(a => a.id === achievementId)
  })

  const unlockedAchievements = computed(() => {
    return gamificationState.achievements
  })

  const nextAchievement = computed(() => {
    const locked = Object.values(ACHIEVEMENTS).filter(achievement => 
      !gamificationState.achievements.some(a => a.id === achievement.id)
    )
    
    if (locked.length === 0) return null
    
    // Find the closest achievement to unlock
    return locked.reduce((closest, current) => {
      let currentProgress = 0
      let closestProgress = 0
      
      switch (current.type) {
        case 'sections':
          currentProgress = gamificationState.visitedSections.length / current.threshold
          break
        case 'interactions':
          currentProgress = gamificationState.interactionCount / current.threshold
          break
        case 'time':
          currentProgress = gamificationState.timeSpent / current.threshold
          break
      }
      
      switch (closest.type) {
        case 'sections':
          closestProgress = gamificationState.visitedSections.length / closest.threshold
          break
        case 'interactions':
          closestProgress = gamificationState.interactionCount / closest.threshold
          break
        case 'time':
          closestProgress = gamificationState.timeSpent / closest.threshold
          break
      }
      
      return currentProgress > closestProgress ? current : closest
    })
  })

  const getProgressForAchievement = (achievementId) => {
    const achievement = ACHIEVEMENTS[achievementId]
    if (!achievement) return 0
    
    let current = 0
    switch (achievement.type) {
      case 'sections':
        current = gamificationState.visitedSections.length
        break
      case 'interactions':
        current = gamificationState.interactionCount
        break
      case 'time':
        current = gamificationState.timeSpent
        break
    }
    
    return Math.min(current / achievement.threshold, 1)
  }

  // Reset gamification data (for testing/development)
  const resetGamification = () => {
    gamificationState.visitedSections = []
    gamificationState.achievements = []
    gamificationState.interactionCount = 0
    gamificationState.timeSpent = 0
    gamificationState.sessionStartTime = Date.now()
    localStorage.removeItem(GAMIFICATION_KEY)
  }

  // Initialize on mount
  onMounted(() => {
    if (!gamificationState.isInitialized) {
      initializeGamification()
    }
  })

  // Watch for changes and save to localStorage
  watch(
    () => [
      gamificationState.visitedSections.length,
      gamificationState.achievements.length,
      gamificationState.interactionCount
    ],
    () => {
      if (gamificationState.isInitialized) {
        saveGamificationData()
      }
    },
    { deep: true }
  )

  return {
    // State (readonly)
    visitedSections: readonly(ref(gamificationState.visitedSections)),
    achievements: readonly(ref(gamificationState.achievements)),
    interactionCount: readonly(ref(gamificationState.interactionCount)),
    timeSpent: readonly(ref(gamificationState.timeSpent)),
    
    // Computed
    completionPercentage,
    isAchievementUnlocked,
    unlockedAchievements,
    nextAchievement,
    
    // Methods
    initializeGamification,
    visitSection,
    trackInteraction,
    getProgressForAchievement,
    resetGamification,
    triggerAchievement,
    
    // Constants
    ACHIEVEMENTS,
    ACHIEVEMENT_TYPES
  }
}