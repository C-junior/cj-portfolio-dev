<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :class="{ 'theme-toggle--light': isLight() }"
    :aria-label="isLight() ? 'Switch to dark mode' : 'Switch to light mode'"
    :title="isLight() ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <div class="theme-toggle__track">
      <div class="theme-toggle__thumb">
        <div class="theme-toggle__icon">
          <!-- Sun icon for light mode -->
          <svg
            v-if="isLight()"
            class="theme-toggle__sun"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          
          <!-- Moon icon for dark mode -->
          <svg
            v-else
            class="theme-toggle__moon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { toggleTheme, isLight } = useTheme()
</script>

<style scoped>
.theme-toggle {
  position: relative;
  width: 3.5rem;
  height: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-all);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-light);
  transform: scale(1.02);
}

.theme-toggle:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-accent);
}

.theme-toggle:active {
  transform: scale(0.98);
}

.theme-toggle__track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.theme-toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  transition: var(--transition-all);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.theme-toggle--light .theme-toggle__thumb {
  transform: translateX(1.5rem);
  background: var(--gradient-accent);
}

.theme-toggle__icon {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.theme-toggle__sun,
.theme-toggle__moon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Animation for icon transitions */
.theme-toggle__icon svg {
  transition: var(--transition-fast);
  opacity: 1;
}

/* Hover effects */
.theme-toggle:hover .theme-toggle__thumb {
  box-shadow: var(--shadow-md);
}

.theme-toggle:hover .theme-toggle__icon {
  transform: scale(1.1);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-toggle__thumb,
  .theme-toggle__icon,
  .theme-toggle__icon svg {
    transition: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .theme-toggle {
    border-width: 2px;
  }
}

/* Focus visible for keyboard navigation */
.theme-toggle:focus-visible {
  box-shadow: 0 0 0 2px var(--color-accent), 0 0 0 4px rgba(59, 130, 246, 0.1);
}
</style>