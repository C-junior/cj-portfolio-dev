import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sections = [], options = {}) {
  const {
    offset = 100,
    threshold = 0.3,
    rootMargin = '0px'
  } = options

  // Reactive state
  const activeSection = ref('')
  const visitedSections = ref([])
  const scrollProgress = ref(0)

  // Internal state
  let observer = null
  let isScrolling = false

  // Update scroll progress
  const updateScrollProgress = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY
    
    scrollProgress.value = Math.min(
      (scrollTop / (documentHeight - windowHeight)) * 100,
      100
    )
  }

  // Update active section based on scroll position
  const updateActiveSection = () => {
    if (isScrolling) return

    const sectionElements = sections.map(section => ({
      id: section.id || section,
      element: document.getElementById(section.id || section)
    })).filter(section => section.element)

    if (sectionElements.length === 0) return

    const scrollPosition = window.scrollY + offset
    let newActiveSection = sectionElements[0].id

    // Find the section that's currently in view
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const section = sectionElements[i]
      if (section.element.offsetTop <= scrollPosition) {
        newActiveSection = section.id
        break
      }
    }

    if (activeSection.value !== newActiveSection) {
      activeSection.value = newActiveSection
      
      // Mark as visited if not already
      if (!visitedSections.value.includes(newActiveSection)) {
        visitedSections.value.push(newActiveSection)
      }
    }
  }

  // Handle scroll events
  const handleScroll = () => {
    requestAnimationFrame(() => {
      updateScrollProgress()
      updateActiveSection()
    })
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId, behavior = 'smooth') => {
    const element = document.getElementById(sectionId)
    if (!element) return

    isScrolling = true
    
    const headerHeight = 80 // Account for fixed header
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior
    })

    // Reset scrolling flag after animation
    setTimeout(() => {
      isScrolling = false
    }, 1000)
  }

  // Initialize intersection observer for better performance
  const initIntersectionObserver = () => {
    if (!window.IntersectionObserver) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionId = entry.target.id
          
          if (entry.isIntersecting) {
            // Mark section as visited
            if (!visitedSections.value.includes(sectionId)) {
              visitedSections.value.push(sectionId)
            }
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id || section)
      if (element) {
        observer.observe(element)
      }
    })
  }

  // Get completion percentage
  const getCompletionPercentage = () => {
    if (sections.length === 0) return 0
    return Math.round((visitedSections.value.length / sections.length) * 100)
  }

  // Check if all sections are visited
  const isComplete = () => {
    return visitedSections.value.length === sections.length
  }

  // Reset visited sections
  const resetVisited = () => {
    visitedSections.value = []
  }

  // Mark section as visited manually
  const markAsVisited = (sectionId) => {
    if (!visitedSections.value.includes(sectionId)) {
      visitedSections.value.push(sectionId)
    }
  }

  // Initialize
  onMounted(() => {
    // Initial setup
    updateScrollProgress()
    updateActiveSection()
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initialize intersection observer
    initIntersectionObserver()
    
    // Mark first section as visited initially
    if (sections.length > 0) {
      const firstSection = sections[0].id || sections[0]
      markAsVisited(firstSection)
      activeSection.value = firstSection
    }
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    // State
    activeSection,
    visitedSections,
    scrollProgress,
    
    // Methods
    scrollToSection,
    getCompletionPercentage,
    isComplete,
    resetVisited,
    markAsVisited,
    
    // Computed-like functions
    completionPercentage: getCompletionPercentage
  }
}