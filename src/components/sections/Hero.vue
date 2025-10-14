<template>
  <section id="hero" class="hero-section">
    <!-- Floating particles background -->
    <div class="particles-container">
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="particle"
        :style="particle.style"
      ></div>
    </div>

    <!-- Geometric shapes background -->
    <div class="geometric-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="hero-content">
      <div class="hero-text">
        <!-- Animated greeting -->
        <div class="greeting animate-fade-in-up">
          <span class="greeting-text">Hello, I'm</span>
        </div>

        <!-- Typewriter name effect -->
        <h1 class="hero-name">
          <span 
            ref="typewriterText" 
            class="typewriter-text"
            :class="{ 'typing': isTyping }"
          >
            {{ displayedName }}
          </span>
          <span class="cursor" :class="{ 'blink': !isTyping }">|</span>
        </h1>

        <!-- Role and experience -->
        <div class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.5s">
          <p class="role">{{ userProfile.role }}</p>
          <p class="experience">{{ userProfile.experience.total }} years of experience</p>
        </div>

        <!-- Call-to-action buttons -->
        <div class="hero-actions animate-fade-in-up" style="animation-delay: 0.8s">
          <button 
            class="cta-button primary btn-interactive"
            v-micro-interaction="'hover-scale'"
            @click="handleButtonClick($event, 'projects')"
          >
            <span>View My Work</span>
            <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
          
          <button 
            class="cta-button secondary btn-interactive"
            v-micro-interaction="'hover-scale'"
            @click="handleButtonClick($event, 'contact')"
          >
            <span>Get In Touch</span>
            <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div 
        class="scroll-indicator animate-bounce" 
        style="animation-delay: 1.2s"
        @click="handleScrollClick"
      >
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 13l3 3 7-7M7 6l3 3 7-7"/>
          </svg>
        </div>
        <span class="scroll-text">Scroll to explore</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { USER_PROFILE } from '@/utils/constants'
import { useGamification } from '@/composables/useGamification'
import { useMicroInteractions } from '@/composables/useMicroInteractions'

const userProfile = USER_PROFILE
const { visitSection, trackInteraction } = useGamification()
const { createRipple, addButtonPress } = useMicroInteractions()

// Typewriter effect
const typewriterText = ref(null)
const displayedName = ref('')
const isTyping = ref(true)
const fullName = userProfile.name.display

// Particles
const particles = ref([])

// Typewriter animation
const startTypewriter = () => {
  let i = 0
  const typingSpeed = 100
  const pauseAfterComplete = 1000

  const typeChar = () => {
    if (i < fullName.length) {
      displayedName.value += fullName.charAt(i)
      i++
      setTimeout(typeChar, typingSpeed)
    } else {
      setTimeout(() => {
        isTyping.value = false
        // Track interaction when typewriter completes
        trackInteraction('typewriter-complete')
      }, pauseAfterComplete)
    }
  }

  // Start typing after a brief delay
  setTimeout(typeChar, 800)
}

// Generate floating particles
const generateParticles = () => {
  const particleCount = 20
  particles.value = []

  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }
    })
  }
}

// Smooth scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    // Track interaction when button is clicked
    trackInteraction(`cta-${sectionId}`)
  }
}

// Handle button click with micro-interactions
const handleButtonClick = (event, sectionId) => {
  // Add button press animation
  addButtonPress(event.target)
  
  // Create ripple effect
  createRipple(event, event.target)
  
  // Scroll to section after short delay for animation
  setTimeout(() => {
    scrollToSection(sectionId)
  }, 150)
}

// Handle scroll indicator click
const handleScrollClick = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    trackInteraction('scroll-indicator-click')
  }
}

onMounted(() => {
  // Visit hero section for gamification
  visitSection('hero')
  startTypewriter()
  generateParticles()
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 100%);
}

/* Particles */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--color-accent);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 20s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Geometric shapes */
.geometric-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  border: 2px solid var(--color-primary);
  opacity: 0.1;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  border-radius: 50%;
  animation: rotate 20s infinite linear;
}

.shape-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 15%;
  transform: rotate(45deg);
  animation: rotate 15s infinite linear reverse;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 20%;
  border-radius: 20px;
  animation: float-shape 10s infinite ease-in-out;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float-shape {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 2rem;
}

.greeting {
  margin-bottom: 1rem;
}

.greeting-text {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

/* Typewriter name */
.hero-name {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  margin: 1rem 0 2rem 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-secondary), var(--color-primary));
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 6s ease-in-out infinite;
  line-height: 1.2;
  position: relative;
}

.hero-name::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 2px;
  animation: progressFill 1.5s cubic-bezier(0.4, 0, 0.2, 1) 2s forwards;
  transform-origin: center;
}

.typewriter-text {
  display: inline-block;
}

.cursor {
  display: inline-block;
  color: var(--color-accent);
  font-weight: 400;
  animation: none;
}

.cursor.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Hero subtitle */
.hero-subtitle {
  margin-bottom: 3rem;
}

.role {
  font-size: 1.5rem;
  color: var(--color-text);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.experience {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  font-weight: 400;
}

/* Call-to-action buttons */
.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button.primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
}

.cta-button.secondary {
  background: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-primary);
}

.cta-button.secondary:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
}

.button-icon {
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(2px);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  animation: float 3s ease-in-out infinite;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  color: var(--color-accent);
  transform: translateX(-50%) translateY(-5px);
}

.scroll-arrow {
  opacity: 0.7;
  animation: bounce 2s infinite;
}

.scroll-text {
  font-weight: 400;
  opacity: 0.8;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .hero-content {
    padding: 1.5rem;
  }
  
  .hero-name {
    font-size: clamp(2rem, 6vw, 3.5rem);
  }
  
  .shape-1 {
    width: 150px;
    height: 150px;
  }
  
  .shape-2 {
    width: 120px;
    height: 120px;
  }
  
  .shape-3 {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 1rem;
    text-align: center;
  }
  
  .hero-name {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
    margin: 0.75rem 0 1.5rem 0;
  }
  
  .hero-subtitle {
    margin-bottom: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .cta-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    /* Touch-friendly size */
    min-height: 48px;
    padding: 1rem 2rem;
  }
  
  .shape-1,
  .shape-2,
  .shape-3 {
    display: none;
  }
  
  .particles-container {
    opacity: 0.3;
  }
  
  .scroll-indicator {
    bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 0.75rem;
  }
  
  .greeting-text {
    font-size: 1rem;
  }
  
  .hero-name {
    font-size: clamp(1.5rem, 10vw, 2rem);
    margin: 0.5rem 0 1rem 0;
  }
  
  .role {
    font-size: 1.125rem;
  }
  
  .experience {
    font-size: 0.9rem;
  }
  
  .hero-actions {
    margin-bottom: 2rem;
  }
  
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
    max-width: 260px;
  }
  
  .scroll-indicator {
    font-size: 0.75rem;
  }
  
  .scroll-text {
    display: none;
  }
}

/* Landscape mobile optimization */
@media (max-width: 768px) and (orientation: landscape) {
  .hero-section {
    min-height: 100vh;
    padding: 1rem 0;
  }
  
  .hero-content {
    padding: 0.5rem;
  }
  
  .hero-name {
    margin: 0.5rem 0 1rem 0;
  }
  
  .hero-subtitle {
    margin-bottom: 1.5rem;
  }
  
  .hero-actions {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .cta-button {
    width: auto;
    max-width: none;
    padding: 0.75rem 1.5rem;
  }
  
  .scroll-indicator {
    display: none;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .cta-button:hover {
    transform: none;
    box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  }
  
  .cta-button.secondary:hover {
    background: transparent;
    color: var(--color-text);
    transform: none;
    box-shadow: none;
  }
  
  .cta-button:active {
    transform: scale(0.98);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .particle,
  .shape,
  .scroll-indicator {
    animation: none;
  }
  
  .cursor.blink {
    animation: none;
    opacity: 1;
  }
}
</style>