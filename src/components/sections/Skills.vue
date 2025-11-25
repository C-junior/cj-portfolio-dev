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
              <span class="category-icon">
                <CodeIcon :size="24" />
              </span>
              Frontend Development
            </h3>
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
              <span class="category-icon">
                <PaletteIcon :size="24" />
              </span>
              Design & UI/UX
            </h3>
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
              <span class="category-icon">
                <HammerIcon :size="24" />
              </span>
              Tools & Technologies
            </h3>
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
              >
                <!-- Level markers -->
                <div class="level-markers">
                  <span class="level-marker" style="left: 25%;">Novice</span>
                  <span class="level-marker" style="left: 50%;">Intermediate</span>
                  <span class="level-marker" style="left: 75%;">Advanced</span>
                  <span class="level-marker" style="left: 90%;">Expert</span>
                </div>
              </div>
            </div>
            <span class="progress-percentage">{{ overallProgress }}%</span>
          </div>
          
          <!-- Skill level progress -->
          <div class="skill-level-info">
            <div class="level-badge" :class="{ 'active': overallProgress >= 25 }">
              <span class="level-emoji">
                <SproutIcon :size="16" />
              </span> Novice
            </div>
            <div class="level-badge" :class="{ 'active': overallProgress >= 50 }">
              <span class="level-emoji">
                <ZapIcon :size="16" />
              </span> Intermediate
            </div>
            <div class="level-badge" :class="{ 'active': overallProgress >= 75 }">
              <span class="level-emoji">
                <RocketIcon :size="16" />
              </span> Advanced
            </div>
            <div class="level-badge" :class="{ 'active': overallProgress >= 90 }">
              <span class="level-emoji">
                <TrophyIcon :size="16" />
              </span> Expert
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useGamification } from '@/composables/useGamification'
import { USER_PROFILE } from '@/utils/constants'
import SkillBar from '@/components/ui/SkillBar.vue'
import { 
  CodeIcon, 
  PaletteIcon, 
  HammerIcon, 
  SproutIcon, 
  ZapIcon, 
  RocketIcon, 
  TrophyIcon 
} from 'lucide-vue-next'

// Composables
const { visitSection, trackInteraction, trackSkillAchievement, ACHIEVEMENTS } = useGamification()

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
watch(sectionVisible, (visible) => {
  if (visible) {
    visitSection('skills')
    trackInteraction('skills-section-viewed')
  }
})

// Track skill achievements when component mounts
onMounted(() => {
  // Track all skills when the component loads
  const allSkills = [...frontendSkills.value, ...designSkills.value, ...toolsSkills.value]
  allSkills.forEach(skill => {
    trackSkillAchievement(skill.name, skill.level)
  })
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
  
/* Skill level progress indicators */
.level-markers {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.level-marker {
  position: absolute;
  top: -20px;
  transform: translateX(-50%);
  font-size: 0.6rem;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.skill-level-info {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
}

.level-badge {
  flex: 1;
  padding: 0.5rem;
  text-align: center;
  border-radius: 8px;
  background: rgba(var(--color-surface-rgb), 0.3);
  border: 1px solid rgba(var(--color-accent-rgb), 0.1);
  font-size: 0.75rem;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.level-badge.active {
  opacity: 1;
  background: rgba(var(--color-accent-rgb), 0.1);
  border-color: rgba(var(--color-accent-rgb), 0.3);
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.2);
}

.level-emoji {
  display: block;
  font-size: 1rem;
  margin-bottom: 0.25rem;
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