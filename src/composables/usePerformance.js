import { ref, onMounted } from 'vue'

/**
 * Composable for monitoring performance metrics
 */
export function usePerformance() {
  const loadTime = ref(0)
  const isLoading = ref(true)
  const performanceMetrics = ref({})

  const measureLoadTime = () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0]
      if (navigation) {
        loadTime.value = Math.round(navigation.loadEventEnd - navigation.fetchStart)
        performanceMetrics.value = {
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          loadComplete: loadTime.value,
          firstPaint: 0,
          firstContentfulPaint: 0
        }

        // Get paint metrics if available
        const paintEntries = performance.getEntriesByType('paint')
        paintEntries.forEach(entry => {
          if (entry.name === 'first-paint') {
            performanceMetrics.value.firstPaint = Math.round(entry.startTime)
          } else if (entry.name === 'first-contentful-paint') {
            performanceMetrics.value.firstContentfulPaint = Math.round(entry.startTime)
          }
        })
      }
    }
    isLoading.value = false
  }

  const preloadResource = (href, as = 'script', crossorigin = null) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (crossorigin) link.crossOrigin = crossorigin
    document.head.appendChild(link)
  }

  const prefetchResource = (href) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }

  onMounted(() => {
    // Measure load time after everything is loaded
    if (document.readyState === 'complete') {
      measureLoadTime()
    } else {
      window.addEventListener('load', measureLoadTime)
    }
  })

  return {
    loadTime,
    isLoading,
    performanceMetrics,
    preloadResource,
    prefetchResource
  }
}

/**
 * Composable for image optimization
 */
export function useImageOptimization() {
  const createOptimizedImageUrl = (src, width, quality = 80) => {
    // In a real app, this would integrate with an image CDN
    // For now, we'll just return the original src
    return src
  }

  const getImageDimensions = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        })
      }
      img.onerror = reject
      img.src = src
    })
  }

  return {
    createOptimizedImageUrl,
    getImageDimensions
  }
}

/**
 * Composable for resource hints and preloading
 */
export function useResourceHints() {
  const addDNSPrefetch = (domain) => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
  }

  const addPreconnect = (domain, crossorigin = false) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    if (crossorigin) link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }

  const preloadCriticalCSS = () => {
    // Preload critical CSS files
    const criticalStyles = [
      '/src/assets/styles/main.css',
      '/src/assets/styles/themes.css'
    ]

    criticalStyles.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = 'style'
      link.onload = function() {
        this.onload = null
        this.rel = 'stylesheet'
      }
      document.head.appendChild(link)
    })
  }

  return {
    addDNSPrefetch,
    addPreconnect,
    preloadCriticalCSS
  }
}