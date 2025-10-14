<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="handleOverlayClick" v-show="isVisible">
      <div class="modal-container" @click.stop>
        <!-- Modal Header -->
        <div class="modal-header">
          <h2 class="modal-title">{{ project.title }}</h2>
          <button class="close-btn" @click="handleCloseClick" aria-label="Close modal">
            <XIcon :size="24" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="modal-content">
          <!-- Project Image -->
          <div class="project-image-container">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="project-meta-overlay">
              <span class="project-status" :class="statusClass">
                {{ project.status }}
              </span>
              <span class="project-year">{{ project.year }}</span>
            </div>
          </div>

          <!-- Project Details -->
          <div class="project-details">
            <!-- Description -->
            <div class="detail-section">
              <h3>About This Project</h3>
              <p class="project-description">{{ project.description }}</p>
            </div>

            <!-- Technologies -->
            <div class="detail-section">
              <h3>Technologies Used</h3>
              <div class="technologies-list">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-badge"
                  :style="{ '--tech-color': getTechColor(tech) }"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Features -->
            <div class="detail-section">
              <h3>Key Features</h3>
              <ul class="features-list">
                <li v-for="feature in project.features" :key="feature">
                  <CheckIcon :size="16" />
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Project Links -->
            <div class="detail-section">
              <h3>Project Links</h3>
              <div class="project-links">
                <a 
                  v-if="project.links.demo && project.links.demo !== '#'" 
                  :href="project.links.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link demo-link"
                >
                  <ExternalLinkIcon :size="20" />
                  View Live Demo
                </a>
                <a 
                  v-if="project.links.github && project.links.github !== '#'" 
                  :href="project.links.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-link github-link"
                >
                  <GithubIcon :size="20" />
                  View Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { XIcon, ExternalLinkIcon, GithubIcon, CheckIcon } from 'lucide-vue-next'
import { TECHNOLOGY_CATEGORIES } from '@/utils/constants'
import { useMobile } from '@/composables/useMobile'

export default {
  name: 'ProjectModal',
  components: {
    XIcon,
    ExternalLinkIcon,
    GithubIcon,
    CheckIcon
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isVisible = ref(false)
    const { isMobile, preventBodyScroll, restoreBodyScroll, triggerHapticFeedback } = useMobile()

    const statusClass = computed(() => {
      return {
        'status-completed': props.project.status === 'Completed',
        'status-progress': props.project.status === 'In Progress',
        'status-planned': props.project.status === 'Planned'
      }
    })

    const getTechColor = (tech) => {
      const category = TECHNOLOGY_CATEGORIES.find(cat => cat.value === tech)
      return category ? category.color : 'var(--color-accent)'
    }

    const handleOverlayClick = () => {
      triggerHapticFeedback('light')
      emit('close')
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        triggerHapticFeedback('light')
        emit('close')
      }
    }

    const handleCloseClick = () => {
      triggerHapticFeedback('light')
      emit('close')
    }

    onMounted(() => {
      // Add entrance animation delay
      setTimeout(() => {
        isVisible.value = true
      }, 10)
      
      // Add escape key listener
      document.addEventListener('keydown', handleEscapeKey)
      
      // Prevent body scroll using mobile composable
      preventBodyScroll()
      
      // Trigger haptic feedback on mobile
      if (isMobile.value) {
        triggerHapticFeedback('light')
      }
    })

    onUnmounted(() => {
      // Remove escape key listener
      document.removeEventListener('keydown', handleEscapeKey)
      
      // Restore body scroll using mobile composable
      restoreBodyScroll()
    })

    return {
      isVisible,
      statusClass,
      getTechColor,
      handleOverlayClick,
      handleCloseClick,
      isMobile
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-4);
  animation: fadeIn 0.3s ease-out;
}

.modal-container {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  animation: slideInUp 0.4s ease-out;
  border: 1px solid var(--color-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background);
}

.modal-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
}

.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-all);
  border: 1px solid var(--color-border);
}

.close-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.modal-content {
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

.project-image-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-meta-overlay {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  display: flex;
  gap: var(--spacing-2);
}

.project-status {
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  backdrop-filter: blur(8px);
}

.status-completed {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.status-progress {
  background: rgba(251, 191, 36, 0.9);
  color: white;
}

.status-planned {
  background: rgba(156, 163, 175, 0.9);
  color: white;
}

.project-year {
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  backdrop-filter: blur(8px);
}

.project-details {
  padding: var(--spacing-6);
}

.detail-section {
  margin-bottom: var(--spacing-8);
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-4);
  position: relative;
  padding-left: var(--spacing-4);
}

.detail-section h3::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--color-accent);
  border-radius: var(--radius-full);
}

.project-description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
}

.technologies-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.tech-badge {
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.1);
  color: var(--tech-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border: 1px solid rgba(var(--tech-color-rgb, 59, 130, 246), 0.3);
  transition: var(--transition-all);
}

.tech-badge:hover {
  background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.2);
  transform: translateY(-1px);
}

.features-list {
  list-style: none;
  display: grid;
  gap: var(--spacing-3);
}

.features-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
}

.features-list li svg {
  color: var(--color-accent);
  flex-shrink: 0;
}

.project-links {
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: var(--transition-all);
  border: 2px solid transparent;
}

.demo-link {
  background: var(--color-primary);
  color: white;
}

.demo-link:hover {
  background: var(--color-accent);
  transform: translateY(-2px);
}

.github-link {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.github-link:hover {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
  transform: translateY(-2px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .modal-overlay {
    padding: var(--spacing-3);
  }
  
  .modal-container {
    max-height: 92vh;
  }
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-2);
    align-items: flex-start;
    padding-top: var(--spacing-4);
  }
  
  .modal-container {
    max-height: 95vh;
    border-radius: var(--radius-lg);
    animation: slideInDown 0.4s ease-out;
  }
  
  .modal-header {
    padding: var(--spacing-4);
    position: sticky;
    top: 0;
    background: var(--color-background);
    z-index: 10;
  }
  
  .modal-title {
    font-size: var(--font-size-xl);
    line-height: var(--line-height-tight);
  }
  
  .close-btn {
    width: 44px;
    height: 44px;
    /* Touch-friendly size */
  }
  
  .project-image-container {
    height: 220px;
  }
  
  .project-meta-overlay {
    top: var(--spacing-3);
    right: var(--spacing-3);
    flex-direction: column;
    align-items: flex-end;
  }
  
  .project-details {
    padding: var(--spacing-4);
  }
  
  .detail-section {
    margin-bottom: var(--spacing-6);
  }
  
  .detail-section h3 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-3);
  }
  
  .technologies-list {
    gap: var(--spacing-2);
  }
  
  .tech-badge {
    font-size: var(--font-size-xs);
    padding: var(--spacing-1) var(--spacing-3);
  }
  
  .features-list {
    gap: var(--spacing-2);
  }
  
  .features-list li {
    font-size: var(--font-size-sm);
  }
  
  .project-links {
    flex-direction: column;
    gap: var(--spacing-3);
  }
  
  .project-link {
    justify-content: center;
    padding: var(--spacing-3) var(--spacing-4);
    /* Touch-friendly size */
    min-height: 48px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: var(--spacing-1);
    padding-top: var(--spacing-2);
  }
  
  .modal-container {
    max-height: 98vh;
    border-radius: var(--radius-md);
  }
  
  .modal-header {
    padding: var(--spacing-3);
  }
  
  .modal-title {
    font-size: var(--font-size-lg);
  }
  
  .close-btn {
    width: 40px;
    height: 40px;
  }
  
  .project-image-container {
    height: 180px;
  }
  
  .project-meta-overlay {
    top: var(--spacing-2);
    right: var(--spacing-2);
  }
  
  .project-status,
  .project-year {
    font-size: var(--font-size-xs);
    padding: var(--spacing-1) var(--spacing-2);
  }
  
  .project-details {
    padding: var(--spacing-3);
  }
  
  .detail-section {
    margin-bottom: var(--spacing-4);
  }
  
  .detail-section h3 {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-2);
    padding-left: var(--spacing-3);
  }
  
  .detail-section h3::before {
    width: 2px;
    height: 16px;
  }
  
  .project-description {
    font-size: var(--font-size-sm);
  }
  
  .tech-badge {
    font-size: 0.625rem;
    padding: 2px var(--spacing-2);
  }
  
  .features-list li {
    font-size: var(--font-size-xs);
    gap: var(--spacing-2);
  }
  
  .project-link {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
    min-height: 44px;
  }
}

/* Landscape mobile optimization */
@media (max-width: 768px) and (orientation: landscape) {
  .modal-overlay {
    padding: var(--spacing-1);
  }
  
  .modal-container {
    max-height: 98vh;
  }
  
  .project-image-container {
    height: 160px;
  }
  
  .project-details {
    padding: var(--spacing-3);
  }
  
  .detail-section {
    margin-bottom: var(--spacing-3);
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .close-btn:hover {
    background: var(--color-surface);
    color: var(--color-text-secondary);
    border-color: var(--color-border);
  }
  
  .close-btn:active {
    background: var(--color-primary);
    color: white;
    transform: scale(0.95);
  }
  
  .tech-badge:hover {
    background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.1);
    transform: none;
  }
  
  .tech-badge:active {
    background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.2);
    transform: scale(0.95);
  }
  
  .project-link:hover {
    transform: none;
  }
  
  .project-link:active {
    transform: scale(0.98);
  }
  
  .demo-link:hover {
    background: var(--color-primary);
  }
  
  .github-link:hover {
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }
}

/* Additional mobile animation */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>