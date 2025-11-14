<template>
  <section 
    id="contact" 
    ref="sectionRef"
    class="contact-section section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="container">
      <div class="contact-content">
        <div class="contact-header">
          <h2 class="section-title">Get In Touch</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">
            Let's discuss your next project or potential collaboration opportunities.
            I'm always excited to work on innovative and challenging projects.
          </p>
        </div>

        <div class="contact-grid">
          <!-- Contact Information -->
          <div class="contact-info">
            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3>Location</h3>
              </div>
              <p>Tocantins, Brazil</p>
            </div>

            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h3>Email</h3>
              </div>
              <a href="mailto:ti.juniorc@gmail.com" class="contact-link">
                ti.juniorc@gmail.com
              </a>
            </div>

            <div class="info-card">
              <div class="info-header">
                <div class="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h3>Phone</h3>
              </div>
              <a href="tel:+55981089718" class="contact-link">
                +55 (63) 98108-9718
              </a>
            </div>

            <!-- Social Media Links -->
            <div class="social-section">
              <h3 class="social-title">Connect With Me</h3>
              <div class="social-links">
                <a
                  href="https://www.linkedin.com/in/juniorcristovao"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link linkedin"
                  aria-label="LinkedIn Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                <a
                  href="https://github.com/C-junior"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-link github"
                  aria-label="GitHub Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                <a 
                  href="https://twitter.com/cristovao_junior" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-link twitter"
                  aria-label="Twitter Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>

                <a 
                  href="https://behance.net/cristovao-junior" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="social-link behance"
                  aria-label="Behance Profile"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 7.5v9c0 .825.675 1.5 1.5 1.5h21c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5h-21c-.825 0-1.5.675-1.5 1.5zm22.5 0v9h-21v-9h21zm-20.25 1.5v6h3.75c1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25h-1.5v-1.5h-2.25zm2.25 3h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm6.75-3v6h3.75c1.24 0 2.25-1.01 2.25-2.25 0-.621-.252-1.183-.659-1.591.407-.408.659-.97.659-1.591 0-1.24-1.01-2.25-2.25-2.25h-3.75zm2.25 1.5h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm0 3h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm6-4.5h3v1.5h-3v-1.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-container">
            <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
              <div class="form-group">
                <label for="name" class="form-label">Full Name *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.name, 'success': !errors.name && form.name }"
                  placeholder="Your full name"
                  @blur="validateField('name')"
                  @input="clearFieldError('name')"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email Address *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.email, 'success': !errors.email && form.email }"
                  placeholder="your.email@example.com"
                  @blur="validateField('email')"
                  @input="clearFieldError('email')"
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="subject" class="form-label">Subject *</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.subject, 'success': !errors.subject && form.subject }"
                  placeholder="Project inquiry, collaboration, etc."
                  @blur="validateField('subject')"
                  @input="clearFieldError('subject')"
                />
                <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-textarea"
                  :class="{ 'error': errors.message, 'success': !errors.message && form.message }"
                  placeholder="Tell me about your project or how we can work together..."
                  rows="5"
                  @blur="validateField('message')"
                  @input="clearFieldError('message')"
                ></textarea>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>

              <button 
                type="submit" 
                class="submit-button"
                :class="{ 'loading': isSubmitting }"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting" class="button-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                  </svg>
                  Send Message
                </span>
                <span v-else class="button-content">
                  <div class="loading-spinner"></div>
                  Sending...
                </span>
              </button>
            </form>

            <!-- Success/Error Feedback -->
            <transition name="feedback">
              <div v-if="feedback.show" class="feedback-message" :class="feedback.type">
                <div class="feedback-icon">
                  <svg v-if="feedback.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <div class="feedback-content">
                  <h4>{{ feedback.title }}</h4>
                  <p>{{ feedback.message }}</p>
                </div>
                <button @click="closeFeedback" class="feedback-close">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

// Intersection observer for scroll animations
const { target: sectionRef, isVisible } = useIntersectionObserver({
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
})

// Form state
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form validation errors
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form submission state
const isSubmitting = ref(false)

// Feedback state
const feedback = reactive({
  show: false,
  type: 'success', // 'success' or 'error'
  title: '',
  message: ''
})

// Validation rules
const validateField = (field) => {
  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Name is required'
      } else if (form.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters'
      } else {
        errors.name = ''
      }
      break
    
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.email.trim()) {
        errors.email = 'Email is required'
      } else if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address'
      } else {
        errors.email = ''
      }
      break
    
    case 'subject':
      if (!form.subject.trim()) {
        errors.subject = 'Subject is required'
      } else if (form.subject.trim().length < 3) {
        errors.subject = 'Subject must be at least 3 characters'
      } else {
        errors.subject = ''
      }
      break
    
    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required'
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters'
      } else {
        errors.message = ''
      }
      break
  }
}

// Clear field error when user starts typing
const clearFieldError = (field) => {
  if (errors[field]) {
    errors[field] = ''
  }
}

// Validate all fields
const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('subject')
  validateField('message')
  
  return !Object.values(errors).some(error => error !== '')
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate random success/failure for demo
    const isSuccess = Math.random() > 0.3

    if (isSuccess) {
      showFeedback('success', 'Message Sent!', 'Thank you for reaching out! I\'ll get back to you within 24 hours.')
      resetForm()
    } else {
      showFeedback('error', 'Failed to Send', 'There was an error sending your message. Please try again or contact me directly via email.')
    }
  } catch (error) {
    showFeedback('error', 'Network Error', 'Please check your connection and try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Show feedback message
const showFeedback = (type, title, message) => {
  feedback.show = true
  feedback.type = type
  feedback.title = title
  feedback.message = message

  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      feedback.show = false
    }, 5000)
  }
}

// Close feedback message
const closeFeedback = () => {
  feedback.show = false
}

// Reset form
const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}
</script>

<style scoped>
.contact-section {
  padding: 6rem 0;
  background: var(--color-background);
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: 1rem;
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  margin: 0 auto 2rem;
  border-radius: 2px;
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.info-card {
  padding: 2rem;
  background: var(--color-surface);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
  transition: var(--transition-base);
}

.info-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-icon {
  color: var(--color-accent);
}

.info-header h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin: 0;
}

.info-card p {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 1rem;
}

.contact-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Social Media Section */
.social-section {
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.social-title {
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: var(--transition-base);
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.contact-form {
  background: var(--color-surface);
  padding: 2.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 0.5rem;
  font-size: var(--font-size-sm);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-base);
  transition: var(--transition-base);
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  display: block;
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: 0.5rem;
  font-weight: var(--font-weight-medium);
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.feedback-message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  margin-top: 1.5rem;
  border: 1px solid;
}

.feedback-message.success {
  background: rgba(16, 185, 129, 0.1);
  border-color: var(--color-success);
  color: var(--color-success);
}

.feedback-message.error {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--color-error);
  color: var(--color-error);
}

@media (max-width: 768px) {
  .contact-section { padding: 4rem 0; }
  .section-title { font-size: var(--font-size-3xl); }
  .contact-grid { 
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>