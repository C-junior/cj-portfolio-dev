/**
 * Performance testing utilities
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.observers = []
    this.startTime = performance.now()
  }

  // Measure Core Web Vitals
  measureCoreWebVitals() {
    return new Promise((resolve) => {
      const metrics = {}

      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          metrics.lcp = Math.round(lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            metrics.fid = Math.round(entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          metrics.cls = Math.round(clsValue * 1000) / 1000
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      }

      // Wait for page load to complete
      if (document.readyState === 'complete') {
        this.getNavigationMetrics(metrics)
        resolve(metrics)
      } else {
        window.addEventListener('load', () => {
          this.getNavigationMetrics(metrics)
          resolve(metrics)
        })
      }
    })
  }

  getNavigationMetrics(metrics = {}) {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0]
      if (navigation) {
        metrics.ttfb = Math.round(navigation.responseStart - navigation.fetchStart)
        metrics.domContentLoaded = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
        metrics.loadComplete = Math.round(navigation.loadEventEnd - navigation.fetchStart)
      }

      // Paint metrics
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach(entry => {
        if (entry.name === 'first-paint') {
          metrics.fp = Math.round(entry.startTime)
        } else if (entry.name === 'first-contentful-paint') {
          metrics.fcp = Math.round(entry.startTime)
        }
      })
    }

    return metrics
  }

  // Check if load time meets performance budget
  checkPerformanceBudget(metrics, budget = {}) {
    const defaultBudget = {
      loadComplete: 3000, // 3 seconds
      fcp: 1800, // 1.8 seconds
      lcp: 2500, // 2.5 seconds
      fid: 100, // 100ms
      cls: 0.1 // 0.1
    }

    const finalBudget = { ...defaultBudget, ...budget }
    const results = {}

    Object.keys(finalBudget).forEach(key => {
      if (metrics[key] !== undefined) {
        results[key] = {
          value: metrics[key],
          budget: finalBudget[key],
          passed: metrics[key] <= finalBudget[key]
        }
      }
    })

    return results
  }

  // Generate performance report
  generateReport(metrics, budgetResults) {
    const report = {
      timestamp: new Date().toISOString(),
      metrics,
      budgetResults,
      recommendations: this.getRecommendations(metrics, budgetResults)
    }

    return report
  }

  getRecommendations(metrics, budgetResults) {
    const recommendations = []

    if (budgetResults.loadComplete && !budgetResults.loadComplete.passed) {
      recommendations.push({
        type: 'critical',
        message: `Load time (${metrics.loadComplete}ms) exceeds 3-second budget`,
        suggestions: [
          'Enable code splitting for non-critical components',
          'Implement lazy loading for images and components',
          'Optimize bundle size by removing unused dependencies',
          'Use a CDN for static assets'
        ]
      })
    }

    if (budgetResults.fcp && !budgetResults.fcp.passed) {
      recommendations.push({
        type: 'warning',
        message: `First Contentful Paint (${metrics.fcp}ms) is slow`,
        suggestions: [
          'Inline critical CSS',
          'Preload important resources',
          'Optimize web fonts loading',
          'Reduce server response time'
        ]
      })
    }

    if (budgetResults.lcp && !budgetResults.lcp.passed) {
      recommendations.push({
        type: 'warning',
        message: `Largest Contentful Paint (${metrics.lcp}ms) needs improvement`,
        suggestions: [
          'Optimize images (use WebP format, proper sizing)',
          'Preload LCP element',
          'Remove render-blocking resources',
          'Use efficient image formats'
        ]
      })
    }

    if (budgetResults.cls && !budgetResults.cls.passed) {
      recommendations.push({
        type: 'warning',
        message: `Cumulative Layout Shift (${metrics.cls}) causes visual instability`,
        suggestions: [
          'Set explicit dimensions for images and videos',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content',
          'Use CSS aspect-ratio for responsive images'
        ]
      })
    }

    return recommendations
  }

  // Clean up observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Utility function to run performance test
export async function runPerformanceTest(budget = {}) {
  const monitor = new PerformanceMonitor()
  
  try {
    const metrics = await monitor.measureCoreWebVitals()
    const budgetResults = monitor.checkPerformanceBudget(metrics, budget)
    const report = monitor.generateReport(metrics, budgetResults)
    
    // Log results to console in development
    if (import.meta.env.DEV) {
      console.group('🚀 Performance Report')
      console.table(metrics)
      console.table(budgetResults)
      
      if (report.recommendations.length > 0) {
        console.group('💡 Recommendations')
        report.recommendations.forEach(rec => {
          console.warn(`${rec.type.toUpperCase()}: ${rec.message}`)
          rec.suggestions.forEach(suggestion => console.log(`  • ${suggestion}`))
        })
        console.groupEnd()
      }
      
      console.groupEnd()
    }
    
    return report
  } finally {
    monitor.disconnect()
  }
}

// Check if performance budget is met
export function checkPerformanceBudget(loadTime) {
  const BUDGET_MS = 3000 // 3 seconds
  const passed = loadTime <= BUDGET_MS
  
  if (import.meta.env.DEV) {
    const status = passed ? '✅' : '❌'
    console.log(`${status} Load time: ${loadTime}ms (Budget: ${BUDGET_MS}ms)`)
  }
  
  return {
    passed,
    loadTime,
    budget: BUDGET_MS,
    difference: loadTime - BUDGET_MS
  }
}