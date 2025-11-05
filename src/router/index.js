import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // Add a small delay to ensure DOM is updated before scrolling
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            // Account for fixed header height
            behavior: 'smooth',
            // Using offset to account for fixed header (though this option might not be supported in all browsers)
          })
        }, 100) // Small delay to ensure DOM is ready
      })
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
