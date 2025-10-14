import { ref, readonly, watch, onMounted } from 'vue'

const THEME_KEY = 'portfolio-theme'
const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

// Global reactive theme state
const currentTheme = ref(DARK_THEME) // Default to dark theme as per requirements

export function useTheme() {
  // Initialize theme from localStorage or default to dark
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    const preferredTheme = savedTheme || DARK_THEME
    
    currentTheme.value = preferredTheme
    applyTheme(preferredTheme)
  }

  // Apply theme to document
  const applyTheme = (theme) => {
    const root = document.documentElement
    
    if (theme === LIGHT_THEME) {
      root.setAttribute('data-theme', 'light')
    } else {
      root.removeAttribute('data-theme') // Dark is default in CSS
    }
  }

  // Toggle between themes
  const toggleTheme = () => {
    const newTheme = currentTheme.value === DARK_THEME ? LIGHT_THEME : DARK_THEME
    currentTheme.value = newTheme
    applyTheme(newTheme)
    localStorage.setItem(THEME_KEY, newTheme)
  }

  // Set specific theme
  const setTheme = (theme) => {
    if (theme !== DARK_THEME && theme !== LIGHT_THEME) {
      console.warn(`Invalid theme: ${theme}. Using dark theme as fallback.`)
      theme = DARK_THEME
    }
    
    currentTheme.value = theme
    applyTheme(theme)
    localStorage.setItem(THEME_KEY, theme)
  }

  // Get current theme
  const getTheme = () => currentTheme.value

  // Check if current theme is dark
  const isDark = () => currentTheme.value === DARK_THEME

  // Check if current theme is light
  const isLight = () => currentTheme.value === LIGHT_THEME

  // Watch for theme changes and persist to localStorage
  watch(currentTheme, (newTheme) => {
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
  })

  // Initialize theme on mount
  onMounted(() => {
    initializeTheme()
  })

  return {
    currentTheme: readonly(currentTheme),
    toggleTheme,
    setTheme,
    getTheme,
    isDark,
    isLight,
    DARK_THEME,
    LIGHT_THEME
  }
}

// Export theme constants for use in components
export { DARK_THEME, LIGHT_THEME }