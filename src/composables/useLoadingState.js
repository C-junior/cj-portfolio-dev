import { ref, computed } from 'vue'

// Global loading state
const globalLoadingStates = ref(new Map())
const globalErrors = ref(new Map())

/**
 * Composable for managing loading states and errors
 */
export function useLoadingState(key = 'default') {
  const isLoading = computed({
    get: () => globalLoadingStates.value.get(key) || false,
    set: (value) => {
      if (value) {
        globalLoadingStates.value.set(key, true)
      } else {
        globalLoadingStates.value.delete(key)
      }
    }
  })

  const error = computed({
    get: () => globalErrors.value.get(key) || null,
    set: (value) => {
      if (value) {
        globalErrors.value.set(key, value)
      } else {
        globalErrors.value.delete(key)
      }
    }
  })

  const hasAnyLoading = computed(() => globalLoadingStates.value.size > 0)
  const hasAnyErrors = computed(() => globalErrors.value.size > 0)

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
    isLoading.value = false
  }

  const clearError = () => {
    error.value = null
  }

  const clearAll = () => {
    isLoading.value = false
    error.value = null
  }

  // Async wrapper that handles loading and error states
  const withLoadingState = async (asyncFn) => {
    try {
      setLoading(true)
      clearError()
      const result = await asyncFn()
      return result
    } catch (err) {
      setError(err.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    isLoading,
    error,
    hasAnyLoading,
    hasAnyErrors,
    setLoading,
    setError,
    clearError,
    clearAll,
    withLoadingState
  }
}

/**
 * Composable for retry logic
 */
export function useRetry(maxRetries = 3, delay = 1000) {
  const retryCount = ref(0)
  const isRetrying = ref(false)

  const retry = async (asyncFn) => {
    let lastError

    for (let i = 0; i <= maxRetries; i++) {
      try {
        retryCount.value = i
        if (i > 0) {
          isRetrying.value = true
          await new Promise(resolve => setTimeout(resolve, delay * i))
        }
        
        const result = await asyncFn()
        isRetrying.value = false
        retryCount.value = 0
        return result
      } catch (error) {
        lastError = error
        if (i === maxRetries) {
          isRetrying.value = false
          throw error
        }
      }
    }
  }

  return {
    retryCount,
    isRetrying,
    retry
  }
}