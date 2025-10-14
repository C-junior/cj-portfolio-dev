import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for intersection observer functionality
 * Used for scroll-triggered animations and visibility detection
 */
export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false)
  const hasBeenVisible = ref(false)
  const target = ref(null)
  let observer = null

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  const startObserving = () => {
    if (!target.value || observer) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting
        if (entry.isIntersecting && !hasBeenVisible.value) {
          hasBeenVisible.value = true
        }
      })
    }, defaultOptions)

    observer.observe(target.value)
  }

  const stopObserving = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    startObserving()
  })

  onUnmounted(() => {
    stopObserving()
  })

  return {
    target,
    isVisible,
    hasBeenVisible,
    startObserving,
    stopObserving
  }
}

/**
 * Composable for scroll-based reveal animations
 * Provides staggered animation support for multiple elements
 */
export function useScrollReveal(options = {}) {
  const elements = ref([])
  const visibleElements = ref(new Set())
  let observer = null

  const defaultOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
    ...options
  }

  const addElement = (element, animationClass = 'animate-reveal-up', delay = 0) => {
    if (!element) return

    const elementData = {
      element,
      animationClass,
      delay,
      id: Math.random().toString(36).substr(2, 9)
    }

    elements.value.push(elementData)
    
    if (observer) {
      observer.observe(element)
    }

    return elementData.id
  }

  const removeElement = (elementId) => {
    const index = elements.value.findIndex(el => el.id === elementId)
    if (index > -1) {
      const elementData = elements.value[index]
      if (observer && elementData.element) {
        observer.unobserve(elementData.element)
      }
      elements.value.splice(index, 1)
      visibleElements.value.delete(elementId)
    }
  }

  const startObserving = () => {
    if (observer) return

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const elementData = elements.value.find(el => el.element === entry.target)
        if (!elementData) return

        if (entry.isIntersecting && !visibleElements.value.has(elementData.id)) {
          visibleElements.value.add(elementData.id)
          
          // Apply animation with delay
          setTimeout(() => {
            if (entry.target && !entry.target.classList.contains(elementData.animationClass)) {
              entry.target.classList.add(elementData.animationClass)
            }
          }, elementData.delay)
        }
      })
    }, defaultOptions)

    // Observe existing elements
    elements.value.forEach(elementData => {
      if (elementData.element) {
        observer.observe(elementData.element)
      }
    })
  }

  const stopObserving = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    visibleElements.value.clear()
  }

  onMounted(() => {
    startObserving()
  })

  onUnmounted(() => {
    stopObserving()
  })

  return {
    addElement,
    removeElement,
    visibleElements,
    startObserving,
    stopObserving
  }
}

/**
 * Composable for animated counters
 * Animates numbers from 0 to target value when element becomes visible
 */
export function useAnimatedCounter(targetValue, duration = 2000) {
  const currentValue = ref(0)
  const isAnimating = ref(false)

  const startAnimation = () => {
    if (isAnimating.value) return

    isAnimating.value = true
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      currentValue.value = Math.round(startValue + (targetValue - startValue) * easeOutQuart)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        isAnimating.value = false
      }
    }

    requestAnimationFrame(animate)
  }

  return {
    currentValue,
    isAnimating,
    startAnimation
  }
}