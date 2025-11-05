<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container">
      <!-- Logo/Brand -->
      <div class="header__brand">
        <a href="#hero" class="header__logo" @click="scrollToSection('hero', $event)">
          <span class="header__logo-text">{{ userProfile.name.display }}</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="header__nav header__nav--desktop" aria-label="Main navigation">
        <ul class="header__nav-list">
          <li 
            v-for="section in navigationSections" 
            :key="section.id"
            class="header__nav-item"
          >
            <a 
              :href="section.hash"
              class="header__nav-link"
              :class="{ 'header__nav-link--active': activeSection === section.id }"
              @click="scrollToSection(section.id, $event)"
            >
              {{ section.label }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Theme Toggle -->
      <div class="header__actions">
        <ThemeToggle />
        
        <!-- Mobile Menu Button -->
        <button
          class="header__menu-toggle"
          :class="{ 'header__menu-toggle--active': isMobileMenuOpen }"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span class="header__menu-icon">
            <span class="header__menu-line"></span>
            <span class="header__menu-line"></span>
            <span class="header__menu-line"></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav 
      class="header__nav header__nav--mobile"
      :class="{ 'header__nav--mobile-open': isMobileMenuOpen }"
      aria-label="Mobile navigation"
    >
      <ul class="header__nav-list header__nav-list--mobile">
        <li 
          v-for="section in navigationSections" 
          :key="`mobile-${section.id}`"
          class="header__nav-item"
        >
          <a 
            :href="section.hash"
            class="header__nav-link"
            :class="{ 'header__nav-link--active': activeSection === section.id }"
            @click="scrollToSection(section.id, $event)"
          >
            {{ section.label }}
          </a>
        </li>
      </ul>
    </nav>
    
    <!-- Mobile Menu Backdrop -->
    <div 
      v-if="isMobileMenuOpen"
      class="header__mobile-backdrop"
      @click="isMobileMenuOpen = false"
    ></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { USER_PROFILE, NAVIGATION_SECTIONS } from '@/utils/constants'

// Reactive state
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

// Data
const userProfile = USER_PROFILE
const navigationSections = NAVIGATION_SECTIONS

// Smooth scroll to section
const scrollToSection = (sectionId, event) => {
  event.preventDefault()
  
  // Close mobile menu first, then scroll after a brief delay
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
    
    // Wait for the menu to close before scrolling
    setTimeout(() => {
      scrollToElement(sectionId)
    }, 300)
  } else {
    scrollToElement(sectionId)
  }
}

// Helper function to scroll to element
const scrollToElement = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Get the actual header height dynamically
    const header = document.querySelector('.header')
    const headerHeight = header ? header.offsetHeight : 80 // fallback to 80 if header not found
    const elementPosition = element.offsetTop - headerHeight
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Handle scroll events
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  
  // Update active section based on scroll position
  const sections = navigationSections.map(section => ({
    id: section.id,
    element: document.getElementById(section.id)
  })).filter(section => section.element)
  
  // Get header height dynamically
  const header = document.querySelector('.header')
  const headerHeight = header ? header.offsetHeight : 80 // fallback to 80 if header not found
  
  const scrollPosition = window.scrollY + headerHeight + 20 // Offset for header and small buffer
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.element.offsetTop <= scrollPosition) {
      activeSection.value = section.id
      break
    }
  }
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest('.header')) {
    isMobileMenuOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(var(--color-background-rgb), 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: var(--transition-all);
}

.header--scrolled {
  background: rgba(var(--color-background-rgb), 0.95);
  box-shadow: var(--shadow-md);
}

.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand/Logo */
.header__brand {
  flex-shrink: 0;
}

.header__logo {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  font-size: 1.25rem;
  transition: var(--transition-fast);
}

.header__logo:hover {
  color: var(--color-accent);
}

.header__logo-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Desktop Navigation */
.header__nav--desktop {
  display: none;
}

.header__nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.header__nav-item {
  position: relative;
}

.header__nav-link {
  text-decoration: none;
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  transition: var(--transition-fast);
  position: relative;
}

.header__nav-link:hover {
  color: var(--color-text);
}

.header__nav-link--active {
  color: var(--color-accent);
}

.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-accent);
  transition: var(--transition-fast);
}

.header__nav-link:hover::after,
.header__nav-link--active::after {
  width: 100%;
}

/* Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Mobile Menu Toggle */
.header__menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-fast);
  border-radius: var(--radius-md);
  /* Touch-friendly size */
  min-width: 44px;
  min-height: 44px;
}

.header__menu-toggle:hover {
  background: var(--color-surface);
}

.header__menu-toggle:active {
  background: var(--color-surface-elevated);
  transform: scale(0.95);
}

.header__menu-icon {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 1.25rem;
}

.header__menu-line {
  width: 100%;
  height: 2px;
  background: var(--color-text);
  transition: var(--transition-fast);
  transform-origin: center;
}

.header__menu-toggle--active .header__menu-line:nth-child(1) {
  transform: rotate(45deg) translate(0.375rem, 0.375rem);
}

.header__menu-toggle--active .header__menu-line:nth-child(2) {
  opacity: 0;
}

.header__menu-toggle--active .header__menu-line:nth-child(3) {
  transform: rotate(-45deg) translate(0.375rem, -0.375rem);
}

/* Mobile Navigation */
.header__nav--mobile {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 280px;
  height: 100vh;
  background: var(--color-background);
  border-left: 1px solid var(--color-border);
  transition: var(--transition-all);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(12px);
  z-index: 1001;
  overflow-y: auto;
}

.header__nav--mobile-open {
  right: 0;
}

.header__nav-list--mobile {
  flex-direction: column;
  gap: 0;
  padding: 5rem 1.5rem 1.5rem;
  height: 100%;
}

.header__nav-list--mobile .header__nav-link {
  display: block;
  padding: 1rem 0;
  font-size: 1.125rem;
  border-bottom: 1px solid var(--color-border);
  /* Touch-friendly target size */
  min-height: 44px;
  display: flex;
  align-items: center;
  transition: var(--transition-fast);
  color: var(--color-text);
}

.header__nav-list--mobile .header__nav-link:hover {
  color: var(--color-accent);
}

.header__nav-list--mobile .header__nav-link:active {
  background: var(--color-surface);
  margin: 0 -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: var(--radius-md);
}

.header__nav-list--mobile .header__nav-item:last-child .header__nav-link {
  border-bottom: none;
}

/* Responsive Design */
@media (min-width: 768px) {
  .header__nav--desktop {
    display: block;
  }
  
  .header__menu-toggle {
    display: none;
  }
  
  .header__nav--mobile {
    display: none;
  }
}

@media (max-width: 767px) {
  .header__container {
    padding: 0 1rem;
  }
  
  .header__logo-text {
    font-size: 1.125rem;
  }
  
  /* Disable scrolling on body when mobile menu is open */
  .header__nav--mobile-open ~ * {
    overflow: hidden;
  }
}

@media (max-width: 767px) {
  .header__container {
    padding: 0 1rem;
  }
  
  .header__logo-text {
    font-size: 1.125rem;
  }
  
  /* Ensure mobile menu doesn't interfere with content */
  .header__nav--mobile-open ~ * {
    pointer-events: none;
  }
}

@media (max-width: 480px) {
  .header__container {
    padding: 0 0.75rem;
    height: 4.5rem;
  }
  
  .header__logo-text {
    font-size: 1rem;
  }
  
  .header__nav-list--mobile {
    padding: 1rem;
  }
  
  .header__nav-list--mobile .header__nav-link {
    font-size: 1rem;
    padding: 0.875rem 0;
  }
}

/* Mobile Menu Backdrop */
.header__mobile-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-fast);
  backdrop-filter: blur(2px);
}

.header__nav--mobile-open ~ .header__mobile-backdrop {
  opacity: 1;
  visibility: visible;
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .header__nav-link:hover {
    color: var(--color-text-secondary);
  }
  
  .header__nav-link:hover::after {
    width: 0;
  }
  
  .header__menu-toggle:hover {
    background: none;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .header,
  .header__nav-link,
  .header__nav-link::after,
  .header__menu-toggle,
  .header__menu-line,
  .header__nav--mobile {
    transition: none;
  }
}

/* Focus styles */
.header__logo:focus,
.header__nav-link:focus,
.header__menu-toggle:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
</style>