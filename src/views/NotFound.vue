<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <router-link to="/" class="home-link">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Adjusted to account for header/footer if present, or just viewport */
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 1rem;
  line-height: 1;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

p {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.home-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
</style>
