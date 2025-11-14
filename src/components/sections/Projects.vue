<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <!-- Section Header -->
      <div 
        class="section-header"
        v-scroll-reveal="{ animation: 'up', delay: 0 }"
      >
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-description">
          A showcase of my recent work and personal projects, demonstrating various technologies and design approaches.
        </p>
      </div>

      <!-- Filter Controls -->
      <div 
        class="filter-controls"
        v-scroll-reveal="{ animation: 'up', delay: 200 }"
      >
        <button
          v-for="category in technologyCategories"
          :key="category.value"
          class="filter-btn btn-interactive"
          :class="{ active: activeFilter === category.value }"
          @click="handleFilterClick($event, category.value)"
          v-micro-interaction="'hover-scale'"
        >
          {{ category.name }}
          <span class="filter-count" v-if="category.value !== 'all'">
            {{ getProjectCount(category.value) }}
          </span>
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid" ref="projectsGrid">
        <TransitionGroup name="project-list" tag="div" class="grid-container">
          <ProjectCard
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            :project="project"
            :index="index"
            @click="openProjectModal"
            class="project-item"
          />
        </TransitionGroup>
      </div>

      <!-- Load More Button (if needed for future expansion) -->
      <div 
        class="load-more-section" 
        v-if="hasMoreProjects"
        v-scroll-reveal="{ animation: 'up', delay: 100 }"
      >
        <button 
          class="load-more-btn btn-interactive" 
          @click="handleLoadMoreClick"
          v-micro-interaction="'hover-lift'"
        >
          Load More Projects
          <ChevronDownIcon :size="20" />
        </button>
      </div>

      <!-- Project Modal -->
      <ProjectModal
        v-if="selectedProject"
        :project="selectedProject"
        @close="closeProjectModal"
      />
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ChevronDownIcon } from 'lucide-vue-next'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import ProjectModal from '@/components/ui/ProjectModal.vue'
import { PROJECTS, TECHNOLOGY_CATEGORIES } from '@/utils/constants'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { useGamification } from '@/composables/useGamification'
import { useMicroInteractions } from '@/composables/useMicroInteractions'

export default {
  name: 'Projects',
  components: {
    ProjectCard,
    ProjectModal,
    ChevronDownIcon
  },
  setup() {
    const projectsGrid = ref(null)
    const activeFilter = ref('all')
    const selectedProject = ref(null)
    const visibleProjects = ref(6) // Start with 6 projects
    const { visitSection, trackInteraction } = useGamification()
    const { createRipple, addButtonPress } = useMicroInteractions()

    // Filter functionality
    const technologyCategories = computed(() => TECHNOLOGY_CATEGORIES)
    
    const filteredProjects = computed(() => {
      let filtered = PROJECTS
      
      if (activeFilter.value !== 'all') {
        filtered = PROJECTS.filter(project => 
          project.technologies.includes(activeFilter.value)
        )
      }
      
      return filtered.slice(0, visibleProjects.value)
    })

    const hasMoreProjects = computed(() => {
      const totalFiltered = activeFilter.value === 'all' 
        ? PROJECTS.length 
        : PROJECTS.filter(project => project.technologies.includes(activeFilter.value)).length
      
      return visibleProjects.value < totalFiltered
    })

    const getProjectCount = (technology) => {
      return PROJECTS.filter(project => 
        project.technologies.includes(technology)
      ).length
    }

    const setActiveFilter = (filter) => {
      activeFilter.value = filter
      visibleProjects.value = 6 // Reset visible projects when filter changes
      trackInteraction('project_filter', { filter })
    }

    const handleFilterClick = (event, filter) => {
      // Add button press animation
      addButtonPress(event.target)
      
      // Create ripple effect
      createRipple(event, event.target)
      
      // Set filter after short delay for animation
      setTimeout(() => {
        setActiveFilter(filter)
      }, 100)
    }

    const loadMoreProjects = () => {
      visibleProjects.value += 6
      trackInteraction('load_more_projects')
    }

    const handleLoadMoreClick = (event) => {
      // Add button press animation
      addButtonPress(event.target)
      
      // Create ripple effect
      createRipple(event, event.target)
      
      // Load more projects after short delay for animation
      setTimeout(() => {
        loadMoreProjects()
      }, 150)
    }

    // Modal functionality
    const openProjectModal = (project) => {
      selectedProject.value = project
      trackInteraction('project_view', { projectId: project.id, projectTitle: project.title })
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    const closeProjectModal = () => {
      selectedProject.value = null
      // Restore body scroll
      document.body.style.overflow = 'auto'
    }

    // Intersection observer for animations
    const { targetRef, isVisible } = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: '50px'
    })

    onMounted(() => {
      // Track section visit when component mounts and becomes visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visitSection('projects')
              observer.disconnect()
            }
          })
        },
        { threshold: 0.3 }
      )

      if (projectsGrid.value) {
        observer.observe(projectsGrid.value)
      }
    })

    return {
      projectsGrid,
      activeFilter,
      selectedProject,
      technologyCategories,
      filteredProjects,
      hasMoreProjects,
      getProjectCount,
      setActiveFilter,
      handleFilterClick,
      loadMoreProjects,
      handleLoadMoreClick,
      openProjectModal,
      closeProjectModal,
      targetRef,
      isVisible
    }
  }
}
</script>

<style scoped>
.projects-section {
  background: var(--color-background);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-secondary));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 9999px;
  animation: progressFill 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
  transform-origin: center;
}

.section-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.filter-controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.filter-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 0.5rem;
  border-radius: 9999px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  min-width: 20px;
  text-align: center;
}

.projects-grid {
  margin-bottom: 3rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.project-item {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Enhanced project list transitions */
.project-list-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.project-list-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
}

.project-list-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.load-more-section {
  text-align: center;
}

.load-more-btn {
  padding: 1rem 2rem;
  background: var(--color-surface);
  color: var(--color-text);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  font-weight: var(--font-weight-semibold);
  transition: var(--transition-base);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.load-more-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .section-title { font-size: var(--font-size-3xl); }
  .grid-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .filter-controls {
    overflow-x: auto;
    justify-content: flex-start;
    padding: 0 1rem;
  }
  .filter-btn {
    white-space: nowrap;
    flex-shrink: 0;
    min-height: 40px;
  }
}
</style>