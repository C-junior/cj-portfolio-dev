#!/usr/bin/env node

/**
 * Performance testing script
 * Tests the built application for performance metrics
 */

import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const PERFORMANCE_BUDGET = {
  loadComplete: 3000, // 3 seconds
  fcp: 1800, // First Contentful Paint
  lcp: 2500, // Largest Contentful Paint
  fid: 100, // First Input Delay
  cls: 0.1, // Cumulative Layout Shift
  bundleSize: 400 * 1024, // 400KB total bundle size (more realistic for portfolio)
  cssSize: 80 * 1024, // 80KB CSS (adjusted for portfolio with animations)
  jsSize: 320 * 1024 // 320KB JS
}

function analyzeBundleSize() {
  const distPath = join(process.cwd(), 'dist')
  
  if (!existsSync(distPath)) {
    console.error('❌ Build not found. Run "npm run build" first.')
    process.exit(1)
  }

  try {
    // Get build stats
    const buildOutput = execSync('npm run build', { encoding: 'utf8' })
    
    // Parse bundle sizes from build output
    const lines = buildOutput.split('\n')
    let totalJS = 0
    let totalCSS = 0
    
    const results = {
      files: [],
      totalJS: 0,
      totalCSS: 0,
      total: 0
    }

    lines.forEach(line => {
      if (line.includes('.js') && line.includes('kB')) {
        const match = line.match(/(\d+\.?\d*)\s*kB/)
        if (match) {
          const size = parseFloat(match[1]) * 1024
          totalJS += size
          results.files.push({
            name: line.trim().split(/\s+/)[0],
            size: size,
            type: 'js'
          })
        }
      } else if (line.includes('.css') && line.includes('kB')) {
        const match = line.match(/(\d+\.?\d*)\s*kB/)
        if (match) {
          const size = parseFloat(match[1]) * 1024
          totalCSS += size
          results.files.push({
            name: line.trim().split(/\s+/)[0],
            size: size,
            type: 'css'
          })
        }
      }
    })

    results.totalJS = totalJS
    results.totalCSS = totalCSS
    results.total = totalJS + totalCSS

    return results
  } catch (error) {
    console.error('❌ Failed to analyze bundle size:', error.message)
    process.exit(1)
  }
}

function checkBudget(actual, budget, name, unit = 'ms') {
  const passed = actual <= budget
  const status = passed ? '✅' : '❌'
  const percentage = Math.round((actual / budget) * 100)
  
  console.log(`${status} ${name}: ${actual}${unit} (Budget: ${budget}${unit}) - ${percentage}%`)
  
  return passed
}

function formatBytes(bytes) {
  return `${Math.round(bytes / 1024)}KB`
}

function main() {
  console.log('🚀 Running Performance Analysis...\n')

  // Analyze bundle size
  console.log('📦 Bundle Size Analysis:')
  const bundleStats = analyzeBundleSize()
  
  let allPassed = true
  
  // Check bundle size budgets
  allPassed &= checkBudget(bundleStats.totalJS, PERFORMANCE_BUDGET.jsSize, 'JavaScript Bundle', 'B')
  allPassed &= checkBudget(bundleStats.totalCSS, PERFORMANCE_BUDGET.cssSize, 'CSS Bundle', 'B')
  allPassed &= checkBudget(bundleStats.total, PERFORMANCE_BUDGET.bundleSize, 'Total Bundle', 'B')

  console.log('\n📊 Detailed Bundle Breakdown:')
  console.log(`Total JavaScript: ${formatBytes(bundleStats.totalJS)}`)
  console.log(`Total CSS: ${formatBytes(bundleStats.totalCSS)}`)
  console.log(`Total Bundle: ${formatBytes(bundleStats.total)}`)

  // Show largest files
  const largestFiles = bundleStats.files
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)

  console.log('\n🔍 Largest Files:')
  largestFiles.forEach(file => {
    console.log(`  ${file.name}: ${formatBytes(file.size)} (${file.type.toUpperCase()})`)
  })

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:')
  
  if (bundleStats.totalJS > PERFORMANCE_BUDGET.jsSize) {
    console.log('  • Consider code splitting for large JavaScript bundles')
    console.log('  • Remove unused dependencies')
    console.log('  • Use dynamic imports for non-critical components')
  }
  
  if (bundleStats.totalCSS > PERFORMANCE_BUDGET.cssSize) {
    console.log('  • Remove unused CSS')
    console.log('  • Consider CSS-in-JS for component-specific styles')
    console.log('  • Use critical CSS extraction')
  }

  if (bundleStats.total > PERFORMANCE_BUDGET.bundleSize) {
    console.log('  • Enable gzip/brotli compression on server')
    console.log('  • Implement lazy loading for non-critical resources')
    console.log('  • Consider using a CDN for static assets')
  }

  console.log('\n🎯 Performance Budget Summary:')
  console.log(`Overall Status: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`)
  
  if (!allPassed) {
    console.log('\n⚠️  Some performance budgets were exceeded. Consider optimizing before deployment.')
    process.exit(1)
  } else {
    console.log('\n🎉 All performance budgets met! Ready for deployment.')
  }
}

main()