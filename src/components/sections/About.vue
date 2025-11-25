<template>
  <section 
    id="about" 
    ref="sectionRef"
    class="about-section section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="container">
      <div class="about-content">
        <div 
          class="about-header"
          v-scroll-reveal="{ animation: 'up', delay: 0 }"
        >
          <h2 class="section-title">About Me</h2>
          <div class="title-underline"></div>
        </div>

        <div class="about-grid">
          <!-- Profile Photo and Introduction -->
          <div 
            class="about-intro"
            v-scroll-reveal="{ animation: 'left', delay: 200 }"
          >
            <!-- Profile Photo -->
            <div class="profile-photo-container">
              <div class="profile-photo">
                <img 
                  v-if="!profileImageError"
                  :src="userProfile.photo" 
                  :alt="`${userProfile.name.display} - Profile Photo`"
                  class="profile-image"
                  loading="lazy"
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
                <!-- Profile Photo Placeholder -->

              </div>
            </div>

            <div class="intro-text">
              <p class="intro-paragraph">
                Hello! I'm <strong>{{ userProfile.name.display }}</strong>, a passionate 
                {{ userProfile.role.toLowerCase() }} with {{ userProfile.experience.total }} years 
                of experience creating engaging and user-friendly web experiences.
              </p>
              <p class="intro-paragraph">
                I specialize in modern frontend technologies and have a strong background in 
                web design and UI/UX. Currently, I'm working at 
                <strong>{{ userProfile.experience.current.company }}</strong>, where I've been 
                contributing to innovative projects for the past {{ userProfile.experience.current.duration }} years.
              </p>
              <p class="intro-paragraph">
                I'm also pursuing a degree in <strong>{{ userProfile.education.current.degree }}</strong> 
                ({{ userProfile.education.current.degreePortuguese }}), expanding my knowledge in 
                systems analysis and development to become a more well-rounded developer.
              </p>
            </div>
          </div>

          <!-- Stats and Info -->
          <div 
            class="about-stats"
            v-scroll-reveal="{ animation: 'right', delay: 400 }"
          >
            <div 
              class="stats-grid"
              v-stagger-children="{ delay: 150, animation: 'scale' }"
            >
              <!-- Experience Counter -->
              <div class="stat-item">
                <div class="stat-number">
                  <span class="counter">{{ experienceCounter }}</span>
                  <span class="stat-suffix">+</span>
                </div>
                <div class="stat-label">Years Experience</div>
              </div>

              <!-- Current Role -->
              <div class="stat-item">
                <div class="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <div class="stat-title">{{ userProfile.role }}</div>
                  <div class="stat-subtitle">Frontend Development</div>
                </div>
              </div>

              <!-- Education -->
              <div class="education-section">
                <h3 class="subsection-title">Education</h3>
                <div class="education-item">
                  <div class="education-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                  </div>
                  <div class="education-content">
                    <div class="education-degree">{{ userProfile.education.current.degree }}</div>
                    <div class="education-degree-pt">{{ userProfile.education.current.degreePortuguese }}</div>
                    <div class="education-status">{{ userProfile.education.current.status }} • {{ userProfile.education.current.startYear }} - {{ userProfile.education.current.expectedGraduation }}</div>
                  </div>
                </div>
              </div>

              <!-- Languages -->
              <div class="languages-section">
                <h3 class="subsection-title">Languages</h3>
                <div class="languages-list">
                  <div 
                    v-for="(language, index) in userProfile.languages" 
                    :key="language.name"
                    class="language-item"
                    :style="{ animationDelay: `${index * 100}ms` }"
                  >
                    <div class="language-info">
                      <span class="language-name">{{ language.name }}</span>
                      <span class="language-level" :class="`level-${language.level.toLowerCase()}`">
                        {{ language.level }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Awards & Recognition -->
        <div class="awards-section">
          <h3 class="awards-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Awards & Recognition
          </h3>
          <div class="awards-grid">
            <div class="award-item">
              <div class="award-medal">
                <MedalIcon :size="48" class="gold-medal" />
              </div>
              <div class="award-content">
                <h4 class="award-title">1st Place - Desafio Industrial da Fieto</h4>
                <p class="award-year">2025</p>
                <p class="award-description">Champion of the innovation marathon focused on circular economy in civil construction with the "Sobra na Obra" project.</p>
              </div>
            </div>

            <div class="award-item">
              <div class="award-medal">
                <MedalIcon :size="48" class="bronze-medal" />
              </div>
              <div class="award-content">
                <h4 class="award-title">3rd Place - InovaUni Hackathon</h4>
                <p class="award-year">2025</p>
                <p class="award-description">Recognized for innovative solutions and technical excellence in university innovation competition.</p>
              </div>
            </div>

            <div class="award-item">
              <div class="award-medal">
                <MedalIcon :size="48" class="gold-medal" />
              </div>
              <div class="award-content">
                <h4 class="award-title">1st Place - Startup Weekend Sebrae</h4>
                <p class="award-year">2018</p>
                <p class="award-description">Won first place in entrepreneurship competition, demonstrating business acumen and innovation.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="about-highlights">
          <div class="highlight-item">
            <div class="highlight-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
                <path d="M9 11V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
              </svg>
            </div>
            <div class="highlight-content">
              <h4>Professional Focus</h4>
              <p>Specialized in Vue.js, React, and modern CSS frameworks with a focus on performance and user experience.</p>
            </div>
          </div>

          <div class="highlight-item">
            <div class="highlight-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div class="highlight-content">
              <h4>Design Background</h4>
              <p>Strong foundation in UI/UX design with {{ userProfile.skills.design.find(s => s.name === 'UI Design')?.years }} years of experience creating intuitive interfaces.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useIntersectionObserver, useAnimatedCounter } from '@/composables/useIntersectionObserver'
import { USER_PROFILE } from '@/utils/constants'
import { MedalIcon } from 'lucide-vue-next'

const userProfile = USER_PROFILE

// Intersection observer for scroll animations
const { target: sectionRef, isVisible } = useIntersectionObserver({
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
})

// Animated counter for years of experience
const { currentValue: experienceCounter, startAnimation } = useAnimatedCounter(
  userProfile.experience.total,
  2000
)

// Profile image state
const profileImageError = ref(false)
const profileImageLoaded = ref(false)

// Start counter animation when section becomes visible
watch(isVisible, (visible) => {
  if (visible) {
    startAnimation()
  }
})

// Handle profile image error
const handleImageError = (event) => {
  console.log('Profile image failed to load:', event.target.src)
  profileImageError.value = true
  profileImageLoaded.value = false
}

// Handle profile image load success
const handleImageLoad = (event) => {
  console.log('Profile image loaded successfully:', event.target.src)
  profileImageError.value = false
  profileImageLoaded.value = true
}
</script>

<style scoped>
.about-section {
  padding: 6rem 0;
  background: var(--color-background);
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  opacity: 0.3;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1rem;
  position: relative;
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  margin: 0 auto;
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.about-intro {
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

/* Profile Photo Styles */
.profile-photo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.profile-photo {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
}

.profile-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  pointer-events: none;
}

.photo-border {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--color-primary), var(--color-accent), var(--color-secondary));
  z-index: -1;
  animation: rotateBorder 3s linear infinite;
}

@keyframes rotateBorder {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Profile Photo Placeholder */
.profile-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px dashed var(--color-border);
  color: var(--color-text-secondary);
  text-align: center;
  padding: 1rem;
}

.placeholder-avatar {
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.placeholder-text {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.2;
}

.placeholder-debug {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin: 0.5rem 0 0 0;
  opacity: 0.7;
  word-break: break-all;
}

.intro-paragraph {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.intro-paragraph strong {
  color: var(--color-text);
  font-weight: 600;
}

.about-stats {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.stat-number {
  display: flex;
  align-items: baseline;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.counter {
  font-family: 'Inter', monospace;
}

.stat-suffix {
  font-size: 1.5rem;
  margin-left: 0.2rem;
  color: var(--color-accent);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.stat-subtitle {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.education-section {
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  margin-bottom: 1rem;
}

.education-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.education-icon {
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.education-content {
  flex: 1;
}

.education-degree {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.education-degree-pt {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-style: italic;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.education-status {
  font-size: 0.85rem;
  color: var(--color-accent);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.languages-section {
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.subsection-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.languages-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.language-item {
  opacity: 0;
  transform: translateY(10px);
  animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.language-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.language-name {
  font-weight: 500;
  color: var(--color-text);
}

.language-level {
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.level-native {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.level-intermediate {
  background: rgba(59, 130, 246, 0.2);
  color: var(--color-accent);
}

.awards-section {
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
}

.awards-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.awards-title svg {
  color: var(--color-accent);
}

.awards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.award-item {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.award-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--color-accent), var(--color-primary));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.award-item:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.2);
}

.award-item:hover::before {
  opacity: 1;
}

.award-medal {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.bronze-medal {
  color: #CD7F32; /* Bronze color */
}

.gold-medal {
  color: #FFD700; /* Gold color */
}

.award-content {
  flex: 1;
}

.award-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.award-year {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.award-description {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.about-highlights {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s;
}

.highlight-item {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

.highlight-icon {
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.highlight-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.highlight-content p {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Visibility animations */
.about-section.is-visible .about-header {
  opacity: 1;
  transform: translateY(0);
}

.about-section.is-visible .title-underline {
  transform: scaleX(1);
}

.about-section.is-visible .about-intro {
  opacity: 1;
  transform: translateX(0);
}

.about-section.is-visible .about-stats {
  opacity: 1;
  transform: translateX(0);
}

.about-section.is-visible .awards-section {
  opacity: 1;
  transform: translateY(0);
}

.about-section.is-visible .about-highlights {
  opacity: 1;
  transform: translateY(0);
}

.about-section.is-visible .language-item {
  animation-play-state: running;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .profile-photo {
    width: 150px;
    height: 150px;
  }

  .about-intro,
  .about-stats {
    transform: none;
  }

  .about-section.is-visible .about-intro,
  .about-section.is-visible .about-stats {
    transform: none;
  }

  .awards-section {
    margin-bottom: 2rem;
  }

  .awards-title {
    font-size: 1.5rem;
  }

  .awards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .award-item {
    padding: 1.5rem;
  }

  .award-medal {
    font-size: 2.5rem;
  }

  .about-highlights {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .highlight-item {
    padding: 1.5rem;
  }

  .stat-item {
    padding: 1.25rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .profile-photo {
    width: 120px;
    height: 120px;
  }

  .intro-paragraph {
    font-size: 1rem;
  }

  .stat-item {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .awards-title {
    font-size: 1.25rem;
  }

  .award-item {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }

  .award-medal {
    font-size: 2rem;
  }

  .award-title {
    font-size: 1rem;
  }

  .highlight-item {
    flex-direction: column;
    text-align: center;
  }

  .highlight-icon {
    margin: 0;
  }

  .education-item {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .education-icon {
    margin: 0;
  }
}
</style>