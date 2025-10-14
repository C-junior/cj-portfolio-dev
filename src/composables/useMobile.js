import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for mobile device detection and responsive utilities
 */
export function useMobile() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  const isTouchDevice = ref(false)
  const screenWidth = ref(0)
  const screenHeight = ref(0)
  const orientation = ref('portrait')

  // Breakpoints
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  }

  const updateDeviceInfo = () => {
    if (typeof window === 'undefined') return

    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight
    
    // Device type detection
    isMobile.value = screenWidth.value < breakpoints.mobile
    isTablet.value = screenWidth.value >= breakpoints.mobile && screenWidth.value < breakpoints.tablet
    isDesktop.value = screenWidth.value >= breakpoints.tablet
    
    // Touch device detection
    isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Orientation detection
    orientation.value = screenWidth.value > screenHeight.value ? 'landscape' : 'portrait'
  }

  const handleResize = () => {
    updateDeviceInfo()
  }

  const handleOrientationChange = () => {
    // Small delay to ensure dimensions are updated
    setTimeout(updateDeviceInfo, 100)
  }

  // Utility functions
  const isMobileDevice = () => isMobile.value
  const isTabletDevice = () => isTablet.value
  const isDesktopDevice = () => isDesktop.value
  const isTouchEnabled = () => isTouchDevice.value
  const isLandscape = () => orientation.value === 'landscape'
  const isPortrait = () => orientation.value === 'portrait'

  // Get responsive value based on screen size
  const getResponsiveValue = (values) => {
    if (isMobile.value && values.mobile !== undefined) {
      return values.mobile
    }
    if (isTablet.value && values.tablet !== undefined) {
      return values.tablet
    }
    if (isDesktop.value && values.desktop !== undefined) {
      return values.desktop
    }
    return values.default || values.desktop || values.tablet || values.mobile
  }

  // Check if screen matches media query
  const matchesMediaQuery = (query) => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  // Prevent body scroll (useful for modals on mobile)
  const preventBodyScroll = () => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
  }

  const restoreBodyScroll = () => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
  }

  // Safe area insets for notched devices
  const getSafeAreaInsets = () => {
    if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 }
    
    const computedStyle = getComputedStyle(document.documentElement)
    return {
      top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)')) || 0,
      right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)')) || 0,
      bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)')) || 0,
      left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)')) || 0
    }
  }

  // Haptic feedback for touch devices
  const triggerHapticFeedback = (type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate && isTouchDevice.value) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [50, 100, 50]
      }
      navigator.vibrate(patterns[type] || patterns.light)
    }
  }

  // Lifecycle
  onMounted(() => {
    updateDeviceInfo()
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true })
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  })

  return {
    // Reactive state
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    screenWidth,
    screenHeight,
    orientation,
    
    // Utility functions
    isMobileDevice,
    isTabletDevice,
    isDesktopDevice,
    isTouchEnabled,
    isLandscape,
    isPortrait,
    getResponsiveValue,
    matchesMediaQuery,
    preventBodyScroll,
    restoreBodyScroll,
    getSafeAreaInsets,
    triggerHapticFeedback,
    
    // Constants
    breakpoints
  }
}