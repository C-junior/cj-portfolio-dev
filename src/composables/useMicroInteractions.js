import { ref, nextTick } from 'vue'

/**
 * Composable for micro-interactions and button effects
 */
export function useMicroInteractions() {
  const isAnimating = ref(false)

  /**
   * Creates a ripple effect on button click
   */
  const createRipple = (event, element) => {
    if (!element) return

    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `

    element.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  /**
   * Adds button press animation
   */
  const addButtonPress = (element) => {
    if (!element || isAnimating.value) return

    isAnimating.value = true
    element.classList.add('btn-press')

    setTimeout(() => {
      element.classList.remove('btn-press')
      isAnimating.value = false
    }, 150)
  }

  /**
   * Adds hover glow effect to cards
   */
  const addCardGlow = (element) => {
    if (!element) return

    element.classList.add('card-glow')
  }

  /**
   * Removes hover glow effect from cards
   */
  const removeCardGlow = (element) => {
    if (!element) return

    element.classList.remove('card-glow')
  }

  /**
   * Creates a smooth focus ring animation
   */
  const addFocusRing = (element) => {
    if (!element) return

    element.style.transition = 'box-shadow 0.2s ease-out'
    element.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)'
  }

  /**
   * Removes focus ring animation
   */
  const removeFocusRing = (element) => {
    if (!element) return

    element.style.boxShadow = ''
  }

  /**
   * Adds interactive pulse animation
   */
  const addInteractivePulse = (element) => {
    if (!element) return

    element.classList.add('interactive-pulse')
  }

  /**
   * Removes interactive pulse animation
   */
  const removeInteractivePulse = (element) => {
    if (!element) return

    element.classList.remove('interactive-pulse')
  }

  /**
   * Creates a smooth scale animation on hover
   */
  const addHoverScale = (element, scale = 1.05) => {
    if (!element) return

    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    element.style.transform = `scale(${scale})`
  }

  /**
   * Removes hover scale animation
   */
  const removeHoverScale = (element) => {
    if (!element) return

    element.style.transform = 'scale(1)'
  }

  return {
    isAnimating,
    createRipple,
    addButtonPress,
    addCardGlow,
    removeCardGlow,
    addFocusRing,
    removeFocusRing,
    addInteractivePulse,
    removeInteractivePulse,
    addHoverScale,
    removeHoverScale
  }
}

/**
 * Composable for smooth section transitions
 */
export function useSectionTransitions() {
  const currentSection = ref('')
  const isTransitioning = ref(false)

  /**
   * Smoothly transitions between sections
   */
  const transitionToSection = async (sectionId) => {
    if (isTransitioning.value) return

    isTransitioning.value = true
    currentSection.value = sectionId

    // Add transition class to body for smooth scrolling
    document.body.classList.add('section-transitioning')

    // Scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    // Wait for scroll to complete
    await new Promise(resolve => setTimeout(resolve, 800))

    // Remove transition class
    document.body.classList.remove('section-transitioning')
    isTransitioning.value = false
  }

  /**
   * Adds section reveal animation
   */
  const revealSection = (element, animationType = 'up') => {
    if (!element) return

    element.classList.add('scroll-hidden')
    
    nextTick(() => {
      element.classList.remove('scroll-hidden')
      element.classList.add(`animate-reveal-${animationType}`)
    })
  }

  /**
   * Adds staggered animation to child elements
   */
  const staggerChildren = (parentElement, delay = 100) => {
    if (!parentElement) return

    const children = parentElement.children
    Array.from(children).forEach((child, index) => {
      child.classList.add('scroll-hidden')
      
      setTimeout(() => {
        child.classList.remove('scroll-hidden')
        child.classList.add('animate-stagger')
      }, index * delay)
    })
  }

  return {
    currentSection,
    isTransitioning,
    transitionToSection,
    revealSection,
    staggerChildren
  }
}