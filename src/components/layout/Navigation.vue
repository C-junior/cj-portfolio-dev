<template>
  <nav class="navigation" :class="{ 'navigation--compact': isCompact }">
    <!-- Progress Indicator -->
    <div class="navigation__progress">
      <div 
        class="navigation__progress-bar"
        :style="{ width: `${completionPercentage}%` }"
      ></div>
    </div>

    <!-- Navigation Items -->
    <ul class="navigation__list">
      <li 
        v-for="(section, index) in navigationSections" 
        :key="section.id"
        class="navigation__item"
      >
        <a 
          :href="section.hash"
          class="navigation__link"
          :class="{ 
            'navigation__link--active': activeSection === section.id,
            'navigation__link--visited': visitedSections.includes(section.id)
          }"
          @click="scrollToSection(section.id, $event)"
          :title="section.label"
        >
          <!-- Progress Dot -->
          <span class="navigation__dot">
            <span class="navigation__dot-inner"></span>
          </span>
          
          <!-- Label (hidden in compact mode) -->
          <span class="navigation__label">{{ section.label }}</span>
          
          <!-- Section Number -->
          <span class="navigation__number">{{ index + 1 }}</span>
        </a>
      </li>
    </ul>

    <!-- Completion Badge -->
    <div 
      v-if="completionPercentage === 100"
      class="navigation__completion-badge"
    >
      <svg 
        class="navigation__completion-icon"
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <path d="M9 12l2 2 4-4"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
      <span class="navigation__completion-text">Complete!</span>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NAVIGATION_SECTIONS } from '@/utils/constants'

// Props
const props = defineProps({
  isCompact: {
    type: Boolean,
    default: false
  }
})

// Reactive state
const activeSection = ref('hero')
const visitedSections = ref(['hero']) // Start with hero as visited
const scrollProgress = ref(0)

// Data
const navigationSections = NAVIGATION_SECTIONS

// Computed
const completionPercentage = computed(() => {
  return Math.round((visitedSections.value.length / navigationSections.length) * 100)
})

// Methods
const scrollToSection = (sectionId, event) => {
  event.preventDefault()
  
  const element = document.getElementById(sectionId)
  if (element) {
    // Get the actual header height dynamically
    const header = document.querySelector('.header')
    const headerHeight = header ? header.offsetHeight : 80 // fallback to 80 if header not found
    
    // Use getBoundingClientRect for accurate positioning
    const yOffset = -headerHeight
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    
    // Scroll to the calculated position
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    })
  } else {
    // If element not found, try again after a short delay (for lazy-loaded sections)
    setTimeout(() => {
      const retryElement = document.getElementById(sectionId)
      if (retryElement) {
        const header = document.querySelector('.header')
        const headerHeight = header ? header.offsetHeight : 80
        const yOffset = -headerHeight
        const y = retryElement.getBoundingClientRect().top + window.pageYOffset + yOffset
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
      }
    }, 100)
  }
}

const updateScrollSpy = () => {
  const sections = navigationSections.map(section => ({
    id: section.id,
    element: document.getElementById(section.id)
  })).filter(section => section.element)
  
  if (sections.length === 0) return
  
  // Get header height dynamically
  const header = document.querySelector('.header')
  const headerHeight = header ? header.offsetHeight : 80
  
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  // Update scroll progress
  scrollProgress.value = Math.min(
    (window.scrollY / (documentHeight - windowHeight)) * 100,
    100
  )
  
  // Find the current active section based on which section is most visible in viewport
  let newActiveSection = 'hero' // Default to hero section
  let maxVisibleArea = 0
  
  sections.forEach(section => {
    if (section.element) {
      const rect = section.element.getBoundingClientRect()
      
      // Calculate how much of the section is visible in the viewport
      const visibleTop = Math.max(rect.top, headerHeight)
      const visibleBottom = Math.min(rect.bottom, windowHeight)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      
      // If this section has more visible area than previous ones, it's the active one
      if (visibleHeight > maxVisibleArea) {
        maxVisibleArea = visibleHeight
        newActiveSection = section.id
      }
      
      // Mark section as visited if it's in viewport
      const isVisible = rect.top <= (windowHeight * 0.75) && rect.bottom >= (windowHeight * 0.25)
      if (isVisible && !visitedSections.value.includes(section.id)) {
        visitedSections.value.push(section.id)
      }
    }
  })
  
  // Update active section
  if (activeSection.value !== newActiveSection) {
    activeSection.value = newActiveSection
    
    // Mark section as visited if not already
    if (!visitedSections.value.includes(newActiveSection)) {
      visitedSections.value.push(newActiveSection)
    }
  }
}

const handleScroll = () => {
  requestAnimationFrame(updateScrollSpy)
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateScrollSpy() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Expose methods for parent components
defineExpose({
  activeSection,
  visitedSections,
  completionPercentage,
  scrollToSection
})
</script>

<style scoped>
.navigation {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background: rgba(var(--color-surface-rgb, 30, 41, 59), 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 80vh;
  overflow-y: auto;
}

.navigation--compact {
  padding: 0.75rem;
  right: 1rem;
}

/* Progress Indicator */
.navigation__progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-surface);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
}

.navigation__progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  transition: width var(--transition-slow);
  border-radius: inherit;
}

/* Navigation List */
.navigation__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.navigation__item {
  position: relative;
}

.navigation__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
  position: relative;
  min-height: 2.5rem;
}

.navigation__link:hover {
  color: var(--color-text);
  background: var(--color-surface-elevated);
  transform: translateX(2px);
}

.navigation__link--active {
  color: var(--color-accent);
  background: rgba(var(--color-accent-rgb, 96, 165, 250), 0.1);
}

.navigation__link--visited .navigation__dot {
  background: var(--color-success);
  border-color: var(--color-success);
}

/* Navigation Dot */
.navigation__dot {
  position: relative;
  width: 0.75rem;
  height: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.navigation__dot-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.25rem;
  height: 0.25rem;
  background: var(--color-accent);
  border-radius: var(--radius-full);
  opacity: 0;
  transition: var(--transition-fast);
}

.navigation__link--active .navigation__dot {
  border-color: var(--color-accent);
  background: var(--color-accent);
  box-shadow: 0 0 0 4px rgba(var(--color-accent-rgb, 96, 165, 250), 0.2);
}

.navigation__link--active .navigation__dot-inner {
  opacity: 1;
  background: white;
}

/* Navigation Label */
.navigation__label {
  font-weight: 500;
  white-space: nowrap;
  transition: var(--transition-fast);
}

.navigation--compact .navigation__label {
  display: none;
}

/* Section Number */
.navigation__number {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background: var(--gradient-primary);
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: var(--transition-fast);
}

.navigation__link--active .navigation__number,
.navigation__link:hover .navigation__number {
  opacity: 1;
  transform: scale(1);
}

/* Completion Badge */
.navigation__completion-badge {
  margin-top: 1rem;
  padding: 0.5rem;
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  animation: completionPulse 2s ease-in-out infinite;
}

.navigation__completion-icon {
  flex-shrink: 0;
}

.navigation__completion-text {
  white-space: nowrap;
}

.navigation--compact .navigation__completion-text {
  display: none;
}

/* Animations */
@keyframes completionPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--color-accent-rgb, 96, 165, 250), 0.4);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 8px rgba(var(--color-accent-rgb, 96, 165, 250), 0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navigation {
    right: 1rem;
    padding: 0.75rem;
    transform: translateY(-50%) scale(0.9);
  }
  
  .navigation__label {
    display: none;
  }
  
  .navigation__completion-text {
    display: none;
  }
  
  .navigation__link {
    min-height: 2rem;
    padding: 0.375rem;
  }
  
  .navigation__dot {
    width: 0.625rem;
    height: 0.625rem;
  }
}

@media (max-width: 768px) {
  .navigation {
    display: none; /* Hide on mobile, navigation is in header */
  }
}

/* Show navigation on larger mobile devices in landscape */
@media (min-width: 568px) and (max-width: 768px) and (orientation: landscape) {
  .navigation {
    display: block;
    right: 0.5rem;
    padding: 0.5rem;
    transform: translateY(-50%) scale(0.8);
    max-height: 70vh;
  }
  
  .navigation__list {
    gap: 0.5rem;
  }
  
  .navigation__link {
    min-height: 1.75rem;
    padding: 0.25rem;
  }
  
  .navigation__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-width: 1px;
  }
}

/* Accessibility */
.navigation__link:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .navigation,
  .navigation__progress-bar,
  .navigation__link,
  .navigation__dot,
  .navigation__dot-inner,
  .navigation__number {
    transition: none;
  }
  
  .navigation__completion-badge {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .navigation {
    border-width: 2px;
  }
  
  .navigation__dot {
    border-width: 3px;
  }
}

/* Custom scrollbar for navigation */
.navigation::-webkit-scrollbar {
  width: 4px;
}

.navigation::-webkit-scrollbar-track {
  background: var(--color-surface);
  border-radius: var(--radius-sm);
}

.navigation::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--radius-sm);
}

.navigation::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-light);
}
</style>