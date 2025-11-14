<template>
  <div class="home">
    <!-- Hero Section -->
    <Hero />
    
    <div class="content-sections">
      <!-- About Section -->
      <About />

      <!-- Skills Section -->
      <Skills />

      <!-- Experience Section -->
      <Experience />

      <!-- Projects Section -->
      <Projects />

      <!-- Contact Section -->
      <Contact />
    </div>
  </div>
</template>

<script setup>
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Skills from '@/components/sections/Skills.vue'
import Experience from '@/components/sections/Experience.vue'
import Projects from '@/components/sections/Projects.vue'
import Contact from '@/components/sections/Contact.vue'
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