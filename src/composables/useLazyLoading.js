import { ref, onMounted, onUnmounted, markRaw, shallowRef } from 'vue'

/**
 * Composable for lazy loading images with intersection observer
 */
export function useLazyImage(src, options = {}) {
  const imageRef = ref(null)
  const isLoaded = ref(false)
  const isError = ref(false)
  const actualSrc = ref('')

  const {
    rootMargin = '50px',
    threshold = 0.1,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4='
  } = options

  let observer = null

  const loadImage = () => {
    const img = new Image()
    
    img.onload = () => {
      actualSrc.value = src
      isLoaded.value = true
      if (observer && imageRef.value) {
        observer.unobserve(imageRef.value)
      }
    }
    
    img.onerror = () => {
      isError.value = true
      if (observer && imageRef.value) {
        observer.unobserve(imageRef.value)
      }
    }
    
    img.src = src
  }

  onMounted(() => {
    if (!imageRef.value) return

    // Set placeholder initially
    actualSrc.value = placeholder

    // Check if intersection observer is supported
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage()
            }
          })
        },
        {
          rootMargin,
          threshold
        }
      )

      observer.observe(imageRef.value)
    } else {
      // Fallback for browsers without intersection observer
      loadImage()
    }
  })

  onUnmounted(() => {
    if (observer && imageRef.value) {
      observer.unobserve(imageRef.value)
    }
  })

  return {
    imageRef,
    actualSrc,
    isLoaded,
    isError
  }
}

/**
 * Composable for lazy loading components
 */
export function useLazyComponent(importFn, options = {}) {
  const componentRef = ref(null)
  const isVisible = ref(false)
  const component = shallowRef(null)

  const {
    rootMargin = '100px',
    threshold = 0.1
  } = options

  let observer = null

  onMounted(() => {
    if (!componentRef.value) return

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !component.value) {
              isVisible.value = true
              importFn().then((module) => {
                component.value = markRaw(module.default || module)
              })
              if (observer && componentRef.value) {
                observer.unobserve(componentRef.value)
              }
            }
          })
        },
        {
          rootMargin,
          threshold
        }
      )

      observer.observe(componentRef.value)
    } else {
      // Fallback - load immediately
      isVisible.value = true
      importFn().then((module) => {
        component.value = markRaw(module.default || module)
      })
    }
  })

  onUnmounted(() => {
    if (observer && componentRef.value) {
      observer.unobserve(componentRef.value)
    }
  })

  return {
    componentRef,
    isVisible,
    component
  }
}