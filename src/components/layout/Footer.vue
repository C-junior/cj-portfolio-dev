<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Main Footer Content -->
      <div class="footer__content">
        <!-- Brand Section -->
        <div class="footer__brand">
          <h3 class="footer__brand-name">{{ userProfile.name.display }}</h3>
          <p class="footer__brand-title">{{ userProfile.role }}</p>
          <p class="footer__brand-description">
            Creating engaging digital experiences with modern web technologies.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer__section">
          <h4 class="footer__section-title">Quick Links</h4>
          <nav class="footer__nav">
            <ul class="footer__nav-list">
              <li 
                v-for="section in navigationSections" 
                :key="section.id"
                class="footer__nav-item"
              >
                <a 
                  :href="section.hash"
                  class="footer__nav-link"
                  @click="scrollToSection(section.id, $event)"
                >
                  {{ section.label }}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Contact Information -->
        <div class="footer__section">
          <h4 class="footer__section-title">Get In Touch</h4>
          <div class="footer__contact">
            <div class="footer__contact-item">
              <svg 
                class="footer__contact-icon"
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span class="footer__contact-text">Available for opportunities</span>
            </div>
            
            <div class="footer__contact-item">
              <svg 
                class="footer__contact-icon"
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span class="footer__contact-text">Tocantins, Brazil</span>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="footer__section">
          <h4 class="footer__section-title">Connect</h4>
          <div class="footer__social">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              class="footer__social-link"
              :title="`Follow on ${social.name}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="social.icon" class="footer__social-icon" />
              <span class="footer__social-label">{{ social.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer__bottom">
        <div class="footer__bottom-content">
          <p class="footer__copyright">
            © {{ currentYear }} {{ userProfile.name.display }}. All rights reserved.
          </p>
          
          <div class="footer__bottom-links">
            <span class="footer__built-with">
              Built with 
              <svg 
                class="footer__heart"
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              using Vue.js
            </span>
            
            <button 
              class="footer__scroll-top"
              @click="scrollToTop"
              title="Back to top"
            >
              <svg 
                class="footer__scroll-icon"
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <path d="M18 15l-6-6-6 6"/>
              </svg>
              <span class="footer__scroll-text">Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { USER_PROFILE, NAVIGATION_SECTIONS } from '@/utils/constants'

// Data
const userProfile = USER_PROFILE
const navigationSections = NAVIGATION_SECTIONS

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear())

// Social links (placeholder data - can be moved to constants)
const socialLinks = [
  {
    name: 'LinkedIn',
    url: '#',
    icon: 'LinkedInIcon'
  },
  {
    name: 'GitHub',
    url: '#',
    icon: 'GitHubIcon'
  },
  {
    name: 'Email',
    url: 'mailto:contact@example.com',
    icon: 'EmailIcon'
  }
]

// Methods
const scrollToSection = (sectionId, event) => {
  event.preventDefault()
  
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Main Footer Content */
.footer__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 3rem 0 2rem;
}

@media (min-width: 640px) {
  .footer__content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer__content {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
  }
}

/* Brand Section */
.footer__brand {
  max-width: 300px;
}

.footer__brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 0.5rem;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer__brand-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0 0 1rem;
}

.footer__brand-description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Footer Sections */
.footer__section {
  min-width: 0;
}

.footer__section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 1rem;
}

/* Navigation */
.footer__nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: var(--transition-fast);
  display: inline-block;
}

.footer__nav-link:hover {
  color: var(--color-accent);
  transform: translateX(2px);
}

/* Contact Information */
.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__contact-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.footer__contact-text {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Social Links */
.footer__social {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: var(--transition-fast);
  padding: 0.25rem 0;
}

.footer__social-link:hover {
  color: var(--color-accent);
  transform: translateX(2px);
}

.footer__social-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.footer__social-label {
  font-weight: 500;
}

/* Footer Bottom */
.footer__bottom {
  border-top: 1px solid var(--color-border);
  padding: 1.5rem 0;
}

.footer__bottom-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .footer__bottom-content {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer__copyright {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}

.footer__bottom-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 768px) {
  .footer__bottom-links {
    justify-content: flex-end;
  }
}

.footer__built-with {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer__heart {
  color: var(--color-error);
  animation: heartbeat 2s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.footer__scroll-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.footer__scroll-top:hover {
  background: var(--color-surface-elevated);
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-1px);
}

.footer__scroll-icon {
  flex-shrink: 0;
}

.footer__scroll-text {
  font-weight: 500;
}

/* Accessibility */
.footer__nav-link:focus,
.footer__social-link:focus,
.footer__scroll-top:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .footer__nav-link,
  .footer__social-link,
  .footer__scroll-top {
    transition: none;
    transform: none;
  }
  
  .footer__nav-link:hover,
  .footer__social-link:hover {
    transform: none;
  }
  
  .footer__heart {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .footer {
    border-top-width: 2px;
  }
  
  .footer__bottom {
    border-top-width: 2px;
  }
  
  .footer__scroll-top {
    border-width: 2px;
  }
}
</style>