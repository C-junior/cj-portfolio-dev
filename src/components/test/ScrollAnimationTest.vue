<template>
  <div class="test-container">
    <h2>Scroll Animation Test</h2>
    
    <!-- Test basic scroll reveal -->
    <div 
      class="test-item"
      v-scroll-reveal="{ animation: 'up', delay: 0 }"
    >
      <h3>Reveal Up Animation</h3>
      <p>This should animate from bottom to top when scrolled into view.</p>
    </div>
    
    <!-- Test different animations -->
    <div 
      class="test-item"
      v-scroll-reveal="{ animation: 'left', delay: 200 }"
    >
      <h3>Reveal Left Animation</h3>
      <p>This should animate from left to right when scrolled into view.</p>
    </div>
    
    <div 
      class="test-item"
      v-scroll-reveal="{ animation: 'scale', delay: 400 }"
    >
      <h3>Reveal Scale Animation</h3>
      <p>This should scale up when scrolled into view.</p>
    </div>
    
    <!-- Test staggered children -->
    <div 
      class="test-stagger"
      v-stagger-children="{ delay: 100, animation: 'up' }"
    >
      <h3>Staggered Children Animation</h3>
      <div class="stagger-item">Item 1</div>
      <div class="stagger-item">Item 2</div>
      <div class="stagger-item">Item 3</div>
      <div class="stagger-item">Item 4</div>
    </div>
    
    <!-- Test micro-interactions -->
    <div class="test-interactions">
      <h3>Micro-Interactions Test</h3>
      <button 
        class="test-button"
        v-micro-interaction="'hover-scale'"
        @click="handleTestClick"
      >
        Hover Scale Button
      </button>
      
      <div 
        class="test-card"
        v-micro-interaction="'hover-lift'"
      >
        <h4>Hover Lift Card</h4>
        <p>This card should lift up on hover.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMicroInteractions } from '@/composables/useMicroInteractions'

const { createRipple, addButtonPress } = useMicroInteractions()

const handleTestClick = (event) => {
  addButtonPress(event.target)
  createRipple(event, event.target)
  console.log('Test button clicked with animations!')
}
</script>

<style scoped>
.test-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.test-item {
  margin: 3rem 0;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.test-stagger {
  margin: 3rem 0;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.stagger-item {
  padding: 1rem;
  margin: 0.5rem 0;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-md);
  text-align: center;
}

.test-interactions {
  margin: 3rem 0;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.test-button {
  padding: 1rem 2rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  margin: 1rem;
  position: relative;
  overflow: hidden;
}

.test-card {
  padding: 1.5rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin: 1rem 0;
  cursor: pointer;
}

.test-card h4 {
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
}

.test-card p {
  margin: 0;
  color: var(--color-text-secondary);
}
</style>