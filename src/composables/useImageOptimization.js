import { ref, onMounted } from 'vue'
import { 
  preloadCriticalImages, 
  optimizeImageLoading, 
  getBestImageFormat,
  getOptimizedImageAttrs 
} from '@/utils/imageOptimization'

/**
 * Composable for optimized image handling
 * @param {Object} options - Configuration options
 */
export function useImageOptimization(options = {}) {
  const {
    preloadCritical = false,
    enableWebP = true,
    enableLazyLoading = true,
    enableFadeIn = true,
    enableRetry = true
  } = options

  const imageLoaded = ref(false)
  const imageError = ref(false)
  const isLoading = ref(true)

  /**
   * Handle image load success
   */
  const handleImageLoad = (event) => {
    imageLoaded.value = true
    imageError.value = false
    isLoading.value = false
    
    if (enableFadeIn) {
      event.target.style.opacity = '1'
    }
    
    console.log('Image loaded successfully:', event.target.src)
  }

  /**
   * Handle image load error
   */
  const handleImageError = (event) => {
    imageLoaded.value = false
    imageError.value = true
    isLoading.value = false
    
    console.warn('Image failed to load:', event.target.src)
  }

  /**
   * Get optimized image source
   * @param {string} src - Original image source
   * @returns {Promise<string>} Optimized image source
   */
  const getOptimizedSrc = async (src) => {
    if (enableWebP) {
      try {
        return await getBestImageFormat(src)
      } catch (error) {
        console.warn('Failed to get optimized format, using original:', error)
        return src
      }
    }
    return src
  }

  /**
   * Get optimized image attributes
   * @param {Object} attrs - Image attributes
   * @returns {Object} Optimized attributes
   */
  const getImageAttrs = (attrs) => {
    const defaultAttrs = {
      loading: enableLazyLoading ? 'lazy' : 'eager',
      decoding: 'async',
      ...attrs
    }

    return getOptimizedImageAttrs(defaultAttrs)
  }

  /**
   * Setup image optimization for an element
   * @param {HTMLImageElement} imgElement - Image element
   */
  const setupImageOptimization = (imgElement) => {
    if (!imgElement) return

    optimizeImageLoading(imgElement, {
      fadeIn: enableFadeIn,
      retryOnError: enableRetry,
      maxRetries: 3
    })

    // Add event listeners
    imgElement.addEventListener('load', handleImageLoad)
    imgElement.addEventListener('error', handleImageError)
  }

  /**
   * Preload an array of images
   * @param {string[]} imageSrcs - Array of image sources
   */
  const preloadImages = (imageSrcs) => {
    imageSrcs.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }

  // Preload critical images on mount if enabled
  onMounted(() => {
    if (preloadCritical) {
      preloadCriticalImages()
    }
  })

  return {
    // State
    imageLoaded,
    imageError,
    isLoading,
    
    // Methods
    handleImageLoad,
    handleImageError,
    getOptimizedSrc,
    getImageAttrs,
    setupImageOptimization,
    preloadImages
  }
}