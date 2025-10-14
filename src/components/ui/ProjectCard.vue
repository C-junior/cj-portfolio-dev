<template>
  <article 
    class="project-card card-interactive"
    v-scroll-reveal="{ animation: 'scale', delay: index * 100 }"
    v-micro-interaction="'hover-lift'"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <!-- Project Image -->
    <div class="project-image">
      <img 
        :src="project.image" 
        :alt="project.title"
        loading="lazy"
        @error="handleImageError"
        @load="handleImageLoad"
      />
      <div class="image-placeholder" v-if="imageError">
        <div class="placeholder-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <p>{{ project.title }}</p>
        </div>
      </div>
      <div class="project-overlay">
        <div class="project-actions">
          <button 
            v-if="project.links.demo" 
            class="action-btn demo-btn btn-interactive"
            @click.stop="handleButtonClick($event, project.links.demo)"
            aria-label="View demo"
          >
            <ExternalLinkIcon :size="20" />
          </button>
          <button 
            v-if="project.links.github" 
            class="action-btn github-btn btn-interactive"
            @click.stop="handleButtonClick($event, project.links.github)"
            aria-label="View source code"
          >
            <GithubIcon :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Project Content -->
    <div class="project-content">
      <!-- Status and Year -->
      <div class="project-meta">
        <span class="project-status" :class="statusClass">
          {{ project.status }}
        </span>
        <span class="project-year">{{ project.year }}</span>
      </div>

      <!-- Title and Description -->
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>

      <!-- Technology Tags -->
      <div class="project-technologies">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="tech-tag"
          :style="{ '--tech-color': getTechColor(tech) }"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Features (shown on hover) -->
      <div class="project-features" v-show="isHovered">
        <h4>Key Features:</h4>
        <ul>
          <li v-for="feature in project.features" :key="feature">
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
import { ref, computed } from 'vue'
import { ExternalLinkIcon, GithubIcon } from 'lucide-vue-next'
import { TECHNOLOGY_CATEGORIES } from '@/utils/constants'
import { useMicroInteractions } from '@/composables/useMicroInteractions'

export default {
  name: 'ProjectCard',
  components: {
    ExternalLinkIcon,
    GithubIcon
  },
  props: {
    project: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const isHovered = ref(false)
    const imageError = ref(false)
    const imageLoaded = ref(false)
    const { createRipple, addButtonPress } = useMicroInteractions()

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

    const handleMouseEnter = () => {
      isHovered.value = true
    }

    const handleMouseLeave = () => {
      isHovered.value = false
    }

    const openLink = (url) => {
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    }

    const handleCardClick = (event) => {
      emit('click', props.project)
    }

    const handleButtonClick = (event, url) => {
      // Add button press animation
      addButtonPress(event.target)
      
      // Create ripple effect
      createRipple(event, event.target)
      
      // Open link after short delay for animation
      setTimeout(() => {
        openLink(url)
      }, 150)
    }

    const handleImageError = (event) => {
      console.log('Image failed to load:', props.project.image)
      imageError.value = true
      imageLoaded.value = false
    }

    const handleImageLoad = (event) => {
      console.log('Image loaded successfully:', props.project.image)
      imageError.value = false
      imageLoaded.value = true
    }

    return {
      isHovered,
      imageError,
      imageLoaded,
      statusClass,
      getTechColor,
      handleMouseEnter,
      handleMouseLeave,
      handleCardClick,
      handleButtonClick,
      handleImageError,
      handleImageLoad,
      openLink
    }
  }
}
</script>

<style scoped>
.project-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition-all);
  border: 1px solid transparent;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent);
}

.project-card:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-accent);
}

/* Project Image */
.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-all);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--color-border);
}

.placeholder-content {
  text-align: center;
  color: var(--color-text-secondary);
  padding: 1rem;
}

.placeholder-content svg {
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.placeholder-content p {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-all);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: var(--spacing-3);
}

.action-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-all);
  transform: translateY(20px);
}

.project-card:hover .action-btn {
  transform: translateY(0);
}

.action-btn:hover {
  background: var(--color-accent);
  transform: scale(1.1);
}

.demo-btn {
  transition-delay: 0.1s;
}

.github-btn {
  transition-delay: 0.2s;
}

/* Project Content */
.project-content {
  padding: var(--spacing-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
}

.project-status {
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.status-completed {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-progress {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.status-planned {
  background: rgba(156, 163, 175, 0.1);
  color: #9ca3af;
}

.project-year {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.project-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
  color: var(--color-text);
  line-height: var(--line-height-tight);
}

.project-description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
  flex: 1;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.tech-tag {
  padding: var(--spacing-1) var(--spacing-3);
  background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.1);
  color: var(--tech-color);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid rgba(var(--tech-color-rgb, 59, 130, 246), 0.2);
  transition: var(--transition-all);
}

.tech-tag:hover {
  background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.2);
  transform: translateY(-1px);
}

.project-features {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-border);
  animation: fadeInUp 0.3s ease-out;
}

.project-features h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-2);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.project-features ul {
  list-style: none;
}

.project-features li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-1);
  position: relative;
  padding-left: var(--spacing-4);
}

.project-features li::before {
  content: '•';
  color: var(--color-accent);
  position: absolute;
  left: 0;
  font-weight: bold;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .project-card:hover {
    transform: translateY(-4px);
  }
}

@media (max-width: 768px) {
  .project-image {
    height: 180px;
  }
  
  .project-content {
    padding: var(--spacing-4);
  }
  
  .project-title {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-snug);
  }
  
  .project-description {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
  }
  
  .project-actions {
    gap: var(--spacing-2);
  }
  
  .action-btn {
    width: 44px;
    height: 44px;
    /* Touch-friendly size */
  }
  
  .project-card:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 480px) {
  .project-image {
    height: 160px;
  }
  
  .project-content {
    padding: var(--spacing-3);
  }
  
  .project-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-1);
    margin-bottom: var(--spacing-2);
  }
  
  .project-status {
    font-size: var(--font-size-xs);
    padding: 2px var(--spacing-2);
  }
  
  .project-year {
    font-size: var(--font-size-xs);
  }
  
  .project-title {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-1);
  }
  
  .project-description {
    font-size: var(--font-size-xs);
    margin-bottom: var(--spacing-3);
  }
  
  .project-technologies {
    gap: var(--spacing-1);
    margin-bottom: var(--spacing-3);
  }
  
  .tech-tag {
    font-size: var(--font-size-xs);
    padding: 2px var(--spacing-2);
  }
  
  .action-btn {
    width: 40px;
    height: 40px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .project-card:hover {
    transform: none;
    box-shadow: none;
    border-color: transparent;
  }
  
  .project-card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
  
  .project-overlay {
    /* Always show overlay on touch devices */
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .action-btn {
    transform: translateY(0);
    transition-delay: 0s;
  }
  
  .action-btn:hover {
    background: var(--color-primary);
    transform: none;
  }
  
  .action-btn:active {
    transform: scale(0.9);
    background: var(--color-accent);
  }
  
  .tech-tag:hover {
    background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.1);
    transform: none;
  }
  
  .tech-tag:active {
    background: rgba(var(--tech-color-rgb, 59, 130, 246), 0.2);
    transform: scale(0.95);
  }
}
</style>