<template>
  <div class="home">
    <!-- Hero Section - Load immediately as it's above the fold -->
    <Hero />
    
    <div class="content-sections">
      <!-- About Section - Lazy load -->
      <LazyComponent 
        :import-fn="() => import('@/components/sections/About.vue')"
        :root-margin="'200px'"
      />

      <!-- Skills Section - Lazy load -->
      <LazyComponent 
        :import-fn="() => import('@/components/sections/Skills.vue')"
        :root-margin="'200px'"
      />

      <!-- Experience Section - Lazy load -->
      <LazyComponent 
        :import-fn="() => import('@/components/sections/Experience.vue')"
        :root-margin="'200px'"
      />

      <!-- Projects Section - Lazy load -->
      <LazyComponent 
        :import-fn="() => import('@/components/sections/Projects.vue')"
        :root-margin="'200px'"
      />

      <!-- Contact Section - Lazy load -->
      <LazyComponent 
        :import-fn="() => import('@/components/sections/Contact.vue')"
        :root-margin="'200px'"
      />
    </div>
  </div>
</template>

<script setup>
import Hero from '@/components/sections/Hero.vue'
import LazyComponent from '@/components/ui/LazyComponent.vue'
</script>

<style scoped>
.home {
  width: 100%;
}

.content-sections section {
  border-bottom: 1px solid var(--color-surface);
}

.content-sections section:last-child {
  border-bottom: none;
}

h2 {
  color: var(--color-primary);
  margin-bottom: 2rem;
}
</style>