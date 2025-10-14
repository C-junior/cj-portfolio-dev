/**
 * Vue directive for scroll-based reveal animations
 * Usage: v-scroll-reveal="{ animation: 'up', delay: 200 }"
 */

let observer = null
const animatedElements = new WeakSet()

const createObserver = () => {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedElements.has(entry.target)) {
          const element = entry.target
          const config = element._scrollRevealConfig || {}
          
          // Add the element to animated set to prevent re-animation
          animatedElements.add(element)
          
          // Apply animation with delay
          setTimeout(() => {
            element.classList.remove('scroll-hidden')
            element.classList.add(`animate-reveal-${config.animation || 'up'}`)
            
            // Trigger custom event for additional effects
            element.dispatchEvent(new CustomEvent('scroll-reveal', {
              detail: { config }
            }))
          }, config.delay || 0)
          
          // Stop observing this element
          observer.unobserve(element)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  return observer
}

export const scrollReveal = {
  mounted(el, binding) {
    // Store configuration on element
    el._scrollRevealConfig = {
      animation: 'up',
      delay: 0,
      ...binding.value
    }
    
    // Add initial hidden state
    el.classList.add('scroll-hidden')
    
    // Create and start observing
    const obs = createObserver()
    obs.observe(el)
  },
  
  unmounted(el) {
    if (observer) {
      observer.unobserve(el)
    }
    animatedElements.delete(el)
    delete el._scrollRevealConfig
  }
}

/**
 * Directive for staggered animations on child elements
 * Usage: v-stagger-children="{ delay: 100, animation: 'up' }"
 */
export const staggerChildren = {
  mounted(el, binding) {
    const config = {
      delay: 100,
      animation: 'up',
      ...binding.value
    }
    
    const children = Array.from(el.children)
    children.forEach((child, index) => {
      child.classList.add('scroll-hidden')
      child._scrollRevealConfig = {
        animation: config.animation,
        delay: index * config.delay
      }
    })
    
    // Observe parent element
    const obs = createObserver()
    obs.observe(el)
    
    // When parent becomes visible, animate children
    el.addEventListener('scroll-reveal', () => {
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.remove('scroll-hidden')
          child.classList.add(`animate-reveal-${config.animation}`)
        }, index * config.delay)
      })
    })
  },
  
  unmounted(el) {
    if (observer) {
      observer.unobserve(el)
    }
    const children = Array.from(el.children)
    children.forEach(child => {
      animatedElements.delete(child)
      delete child._scrollRevealConfig
    })
  }
}

/**
 * Directive for micro-interactions on hover/focus
 * Usage: v-micro-interaction="'hover-scale'"
 */
export const microInteraction = {
  mounted(el, binding) {
    const interactionType = binding.value || 'hover-scale'
    
    const addInteraction = () => {
      switch (interactionType) {
        case 'hover-scale':
          el.style.transform = 'scale(1.05)'
          break
        case 'hover-lift':
          el.style.transform = 'translateY(-4px)'
          break
        case 'hover-glow':
          el.classList.add('card-glow')
          break
        case 'pulse':
          el.classList.add('interactive-pulse')
          break
      }
    }
    
    const removeInteraction = () => {
      switch (interactionType) {
        case 'hover-scale':
        case 'hover-lift':
          el.style.transform = ''
          break
        case 'hover-glow':
          el.classList.remove('card-glow')
          break
        case 'pulse':
          el.classList.remove('interactive-pulse')
          break
      }
    }
    
    // Add transition
    el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    
    // Add event listeners
    el.addEventListener('mouseenter', addInteraction)
    el.addEventListener('mouseleave', removeInteraction)
    el.addEventListener('focus', addInteraction)
    el.addEventListener('blur', removeInteraction)
    
    // Store cleanup function
    el._microInteractionCleanup = () => {
      el.removeEventListener('mouseenter', addInteraction)
      el.removeEventListener('mouseleave', removeInteraction)
      el.removeEventListener('focus', addInteraction)
      el.removeEventListener('blur', removeInteraction)
    }
  },
  
  unmounted(el) {
    if (el._microInteractionCleanup) {
      el._microInteractionCleanup()
      delete el._microInteractionCleanup
    }
  }
}