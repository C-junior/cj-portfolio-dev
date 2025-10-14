<template>
  <section id="skills" class="skills-section" ref="skillsSectionRef">
    <div class="container">
      <!-- Section Header -->
      <div 
        class="section-header"
        v-scroll-reveal="{ animation: 'up', delay: 0 }"
      >
        <h2 class="section-title">Skills & Expertise</h2>
        <p class="section-subtitle">
          Technologies and tools I've mastered over {{ totalYearsExperience }} years of development
        </p>
      </div>

      <!-- Skills Categories -->
      <div 
        class="skills-grid"
        v-stagger-children="{ delay: 200, animation: 'up' }"
      >
        <!-- Frontend Skills -->
        <div class="skill-category">
          <div class="category-header">
            <h3 class="category-title">
              <span class="category-icon">💻</span>
              Frontend Development
            </h3>
            <AchievementBadge 
              v-if="frontendAchievement"
              :achievement="frontendAchievement"
              :show-progress="false"
              class="category-badge"
            />
          </div>
          <div class="skills-list">
            <SkillBar
              v-for="(skill, index) in frontendSkills"
              :key="skill.name"
              :skill="skill"
              :animation-delay="index * 100"
            />
          </div>
        </div>

        <!-- Design Skills -->
        <div class="skill-category">
          <div class="category-header">
            <h3 class="category-title">
              <span class="category-icon">🎨</span>
              Design & UI/UX
            </h3>
            <AchievementBadge 
              v-if="designAchievement"
              :achievement="designAchievement"
              :show-progress="false"
              class="category-badge"
            />
          </div>
          <div class="skills-list">
            <SkillBar
              v-for="(skill, index) in designSkills"
              :key="skill.name"
              :skill="skill"
              :animation-delay="(frontendSkills.length + index) * 100"
            />
          </div>
        </div>

        <!-- Tools & Technologies -->
        <div class="skill-category">
          <div class="category-header">
            <h3 class="category-title">
              <span class="category-icon">🛠️</span>
              Tools & Technologies
            </h3>
            <AchievementBadge 
              v-if="toolsAchievement"
              :achievement="toolsAchievement"
              :show-progress="false"
              class="category-badge"
            />
          </div>
          <div class="skills-list">
            <SkillBar
              v-for="(skill, index) in toolsSkills"
              :key="skill.name"
              :skill="skill"
              :animation-delay="(frontendSkills.length + designSkills.length + index) * 100"
            />
          </div>
        </div>
      </div>

      <!-- Skills Summary -->
      <div class="skills-summary">
        <div class="summary-stats">
          <div class="stat-item">
            <div class="stat-number">{{ totalSkills }}</div>
            <div class="stat-label">Technologies</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ averageLevel }}%</div>
            <div class="stat-label">Avg. Proficiency</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ expertSkills }}</div>
            <div class="stat-label">Expert Level</div>
          </div>
        </div>

        <!-- Overall Progress -->
        <div class="overall-progress">
          <h4 class="progress-title">Overall Skill Development</h4>
          <div class="progress-bar-container">
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${overallProgress}%` }"
              ></div>
            </div>
            <span class="progress-percentage">{{ overallProgress }}%</span>
          </div>
        </div>
      </div>

      <!-- Achievement Showcase -->
      <div v-if="skillAchievements.length > 0" class="achievements-showcase">
        <h4 class="achievements-title">Skill Achievements</h4>
        <div class="achievements-grid">
          <AchievementBadge
            v-for="achievement in skillAchievements"
            :key="achievement.id"
            :achievement="achievement"
            :show-progress="true"
            @click="handleAchievementClick"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useGamification } from '@/composables/useGamification'
import { USER_PROFILE } from '@/utils/constants'
import SkillBar from '@/components/ui/SkillBar.vue'
import AchievementBadge from '@/components/gamification/AchievementBadge.vue'

// Composables
const { visitSection, trackInteraction, ACHIEVEMENTS } = useGamification()

// Refs
const skillsSectionRef = ref(null)

// Intersection observer for section tracking
const { isVisible } = useIntersectionObserver({
  threshold: 0.3
})

// Skills data from constants
const frontendSkills = computed(() => USER_PROFILE.skills.frontend)
const designSkills = computed(() => USER_PROFILE.skills.design)

// Additional tools skills (extending the data model)
const toolsSkills = computed(() => [
  { name: 'Git & GitHub', years: 5, level: 90 },
  { name: 'VS Code', years: 4, level: 95 },
  { name: 'Chrome DevTools', years: 5, level: 88 },
  { name: 'Webpack/Vite', years: 2, level: 75 },
  { name: 'NPM/Yarn', years: 4, level: 85 }
])

// Computed statistics
const totalSkills = computed(() => {
  return frontendSkills.value.length + designSkills.value.length + toolsSkills.value.length
})

const totalYearsExperience = computed(() => USER_PROFILE.experience.total)

const averageLevel = computed(() => {
  const allSkills = [...frontendSkills.value, ...designSkills.value, ...toolsSkills.value]
  const totalLevel = allSkills.reduce((sum, skill) => sum + skill.level, 0)
  return Math.round(totalLevel / allSkills.length)
})

const expertSkills = computed(() => {
  const allSkills = [...frontendSkills.value, ...designSkills.value, ...toolsSkills.value]
  return allSkills.filter(skill => skill.level >= 90).length
})

const overallProgress = computed(() => {
  return Math.min(averageLevel.value, 100)
})

// Achievement definitions for skills
const skillAchievements = computed(() => {
  return [
    {
      id: 'frontend-master',
      title: 'Frontend Master',
      description: 'Achieved expert level in frontend technologies',
      icon: '🚀',
      threshold: 90,
      type: 'skill-level',
      category: 'frontend'
    },
    {
      id: 'design-guru',
      title: 'Design Guru',
      description: 'Mastered design and UI/UX principles',
      icon: '🎯',
      threshold: 85,
      type: 'skill-level',
      category: 'design'
    },
    {
      id: 'tool-expert',
      title: 'Tool Expert',
      description: 'Proficient with development tools',
      icon: '⚡',
      threshold: 80,
      type: 'skill-level',
      category: 'tools'
    }
  ]
})

// Category achievements
const frontendAchievement = computed(() => {
  const avgLevel = frontendSkills.value.reduce((sum, skill) => sum + skill.level, 0) / frontendSkills.value.length
  return avgLevel >= 85 ? skillAchievements.value.find(a => a.id === 'frontend-master') : null
})

const designAchievement = computed(() => {
  const avgLevel = designSkills.value.reduce((sum, skill) => sum + skill.level, 0) / designSkills.value.length
  return avgLevel >= 85 ? skillAchievements.value.find(a => a.id === 'design-guru') : null
})

const toolsAchievement = computed(() => {
  const avgLevel = toolsSkills.value.reduce((sum, skill) => sum + skill.level, 0) / toolsSkills.value.length
  return avgLevel >= 80 ? skillAchievements.value.find(a => a.id === 'tool-expert') : null
})

// Methods
const handleAchievementClick = (achievement) => {
  trackInteraction('skill-achievement-click')
  // Could emit event or show modal with achievement details
}

// Watch for section visibility
const { target: intersectionTarget, isVisible: sectionVisible } = useIntersectionObserver({
  threshold: 0.2
})

// Lifecycle
onMounted(() => {
  intersectionTarget.value = skillsSectionRef.value
  
  // Track section visit when visible
  if (sectionVisible.value) {
    visitSection('skills')
  }
})

// Watch for visibility changes
import { watch } from 'vue'
watch(sectionVisible, (visible) => {
  if (visible) {
    visitSection('skills')
    trackInteraction('skills-section-viewed')
  }
})
</script>

<style scoped>
.skills-section {
  padding: 6rem 0;
  background: var(--color-background);
  position: relative;
  overflow: hidden;
}

.skills-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(var(--color-primary-rgb), 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(var(--color-accent-rgb), 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-secondary));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 2px;
  animation: progressFill 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
  transform-origin: left;
  transform: translateX(-50%) scaleX(0);
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;
}

.skill-category {
  background: rgba(var(--color-surface-rgb), 0.5);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(var(--color-accent-rgb), 0.1);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
}

.skill-category:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(var(--color-primary-rgb), 0.15);
  border-color: rgba(var(--color-accent-rgb), 0.3);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.1);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.category-icon {
  font-size: 1.75rem;
}

.category-badge {
  transform: scale(0.8);
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skills-summary {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(var(--color-accent-rgb), 0.1);
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(var(--color-accent-rgb), 0.3);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.overall-progress {
  text-align: center;
}

.progress-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 1rem 0;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.progress-bar {
  flex: 1;
  height: 12px;
  background: rgba(var(--color-text-rgb), 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 6px;
  transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  transform-origin: left;
}

.progress-fill::before {
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
  animation: shimmer 2s infinite;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
  animation: shimmer 2.5s infinite reverse;
}

.progress-percentage {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-accent);
  min-width: 50px;
}

.achievements-showcase {
  text-align: center;
}

.achievements-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 2rem 0;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .skill-category:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 4rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skill-category {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  .skill-category:hover {
    transform: none;
    box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.1);
  }
  
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
  
  .category-title {
    font-size: 1.25rem;
  }
  
  .category-icon {
    font-size: 1.5rem;
  }
  
  .summary-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
  
  .achievements-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .skills-summary {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .skills-section {
    padding: 3rem 0;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .skill-category {
    padding: 1.25rem;
  }
  
  .category-title {
    font-size: 1.125rem;
  }
  
  .summary-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
  
  .progress-bar-container {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  
  .progress-bar {
    width: 100%;
    max-width: 300px;
  }
  
  .progress-percentage {
    font-size: 1rem;
  }
  
  .skills-summary {
    padding: 1.25rem;
  }
  
  .summary-stats {
    margin-bottom: 1.5rem;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .skill-category:hover {
    transform: none;
    box-shadow: none;
    border-color: rgba(var(--color-accent-rgb), 0.1);
  }
  
  .skill-category:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}
</style>