<template>
  <section 
    id="experience" 
    ref="sectionRef"
    class="experience-section section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="container">
      <div class="experience-content">
        <div class="experience-header">
          <h2 class="section-title">Experience</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">My professional journey and career highlights</p>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <!-- Current Education Timeline Item -->
          <div
            class="timeline-item education-item"
            :class="{ 'expanded': expandedItems.includes('education-current') }"
            :style="{ animationDelay: '0ms' }"
          >
            <!-- Timeline Node -->
            <div class="timeline-node education-node">
              <div class="node-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
            </div>

            <!-- Education Card -->
            <div class="experience-card education-card">
              <div class="card-header" @click="toggleExpanded('education-current')">
                <div class="position-info">
                  <h3 class="position-title">{{ userProfile.education.current.degree }}</h3>
                  <div class="company-info">
                    <span class="company-name">{{ userProfile.education.current.degreePortuguese }}</span>
                    <span class="location">{{ userProfile.education.current.institution }}</span>
                  </div>
                  <div class="period-info">
                    <span class="period">{{ userProfile.education.current.startYear }} - {{ userProfile.education.current.expectedGraduation }}</span>
                    <span class="duration">{{ userProfile.education.current.status }}</span>
                    <span class="type education-type">Education</span>
                  </div>
                </div>

                <div class="expand-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    :class="{ 'rotated': expandedItems.includes('education-current') }"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="card-content">
                <p class="position-description">
                  Currently pursuing a comprehensive degree in Systems Analysis and Development,
                  focusing on modern software development methodologies, system architecture,
                  and advanced programming concepts to enhance my technical expertise.
                </p>

                <!-- Expandable Details -->
                <div class="expandable-content">
                  <!-- Curriculum Focus -->
                  <div class="detail-section">
                    <h4 class="detail-title">Curriculum Focus</h4>
                    <ul class="responsibility-list">
                      <li class="responsibility-item" style="animation-delay: 0ms;">
                        Software Engineering and Development Methodologies
                      </li>
                      <li class="responsibility-item" style="animation-delay: 100ms;">
                        Database Design and Management Systems
                      </li>
                      <li class="responsibility-item" style="animation-delay: 200ms;">
                        System Architecture and Design Patterns
                      </li>
                      <li class="responsibility-item" style="animation-delay: 300ms;">
                        Project Management and Agile Methodologies
                      </li>
                      <li class="responsibility-item" style="animation-delay: 400ms;">
                        Quality Assurance and Testing Strategies
                      </li>
                    </ul>
                  </div>

                  <!-- Skills Being Developed -->
                  <div class="detail-section">
                    <h4 class="detail-title">Skills Being Developed</h4>
                    <div class="tech-tags">
                      <span class="tech-tag" style="animation-delay: 0ms;">System Analysis</span>
                      <span class="tech-tag" style="animation-delay: 50ms;">Software Architecture</span>
                      <span class="tech-tag" style="animation-delay: 100ms;">Database Design</span>
                      <span class="tech-tag" style="animation-delay: 150ms;">Project Management</span>
                      <span class="tech-tag" style="animation-delay: 200ms;">Quality Assurance</span>
                      <span class="tech-tag" style="animation-delay: 250ms;">Agile Methodologies</span>
                    </div>
                  </div>

                  <!-- Academic Goals -->
                  <div class="detail-section">
                    <h4 class="detail-title">Academic Goals</h4>
                    <ul class="achievement-list">
                      <li class="achievement-item" style="animation-delay: 0ms;">
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        Deepen understanding of software architecture and system design principles
                      </li>
                      <li class="achievement-item" style="animation-delay: 100ms;">
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        Enhance project management and team leadership capabilities
                      </li>
                      <li class="achievement-item" style="animation-delay: 200ms;">
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        Apply theoretical knowledge to real-world development challenges
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Past Education Timeline Items -->
          <div
            v-for="(education, index) in userProfile.education.past"
            :key="'education-' + index"
            class="timeline-item education-item"
            :class="{ 'expanded': expandedItems.includes('education-past-' + index) }"
            :style="{ animationDelay: `${(index + 1) * 100}ms` }"
          >
            <!-- Timeline Node -->
            <div class="timeline-node education-node">
              <div class="node-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
            </div>

            <!-- Education Card -->
            <div class="experience-card education-card">
              <div class="card-header" @click="toggleExpanded('education-past-' + index)">
                <div class="position-info">
                  <h3 class="position-title">{{ education.degree }}</h3>
                  <div class="company-info">
                    <span class="company-name">{{ education.degreePortuguese }}</span>
                    <span class="location">{{ education.institution }}</span>
                  </div>
                  <div class="period-info">
                    <span class="period">{{ education.startYear }} - {{ education.endYear }}</span>
                    <span class="duration">{{ education.duration }}</span>
                    <span class="type education-type">Education</span>
                  </div>
                </div>

                <div class="expand-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    :class="{ 'rotated': expandedItems.includes('education-past-' + index) }"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="card-content">
                <p class="position-description">
                  Completed a comprehensive technical course in computer science,
                  gaining foundational knowledge in programming, database management,
                  and system analysis at the federal institute.
                </p>

                <!-- Expandable Details -->
                <div class="expandable-content">
                  <!-- Curriculum Focus -->
                  <div class="detail-section">
                    <h4 class="detail-title">Curriculum Focus</h4>
                    <ul class="responsibility-list">
                      <li class="responsibility-item" style="animation-delay: 0ms;">
                        Programming fundamentals and algorithms
                      </li>
                      <li class="responsibility-item" style="animation-delay: 100ms;">
                        Database design and management
                      </li>
                      <li class="responsibility-item" style="animation-delay: 200ms;">
                        System analysis and development basics
                      </li>
                      <li class="responsibility-item" style="animation-delay: 300ms;">
                        Network and security concepts
                      </li>
                      <li class="responsibility-item" style="animation-delay: 400ms;">
                        Project development and teamwork
                      </li>
                    </ul>
                  </div>

                  <!-- Skills Acquired -->
                  <div class="detail-section">
                    <h4 class="detail-title">Skills Acquired</h4>
                    <div class="tech-tags">
                      <span class="tech-tag" style="animation-delay: 0ms;">Programming</span>
                      <span class="tech-tag" style="animation-delay: 50ms;">Database Management</span>
                      <span class="tech-tag" style="animation-delay: 100ms;">System Analysis</span>
                      <span class="tech-tag" style="animation-delay: 150ms;">Project Management</span>
                      <span class="tech-tag" style="animation-delay: 200ms;">Teamwork</span>
                      <span class="tech-tag" style="animation-delay: 250ms;">Problem Solving</span>
                    </div>
                  </div>

                  <!-- Academic Achievements -->
                  <div class="detail-section">
                    <h4 class="detail-title">Academic Achievements</h4>
                    <ul class="achievement-list">
                      <li class="achievement-item" style="animation-delay: 0ms;">
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        Built foundational knowledge in computer science principles
                      </li>
                      <li class="achievement-item" style="animation-delay: 100ms;">
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        Gained practical experience in software development
                      </li>
                      <li class="achievement-item" style="animation-delay: 200ms;">
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        Developed problem-solving and analytical skills
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            v-for="(position, index) in userProfile.experience.positions" 
            :key="position.id"
            class="timeline-item"
            :class="{ 'expanded': expandedItems.includes(position.id) }"
            :style="{ animationDelay: `${(index + 1) * 200}ms` }"
          >
            <!-- Timeline Node -->
            <div class="timeline-node">
              <div class="node-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
            </div>

            <!-- Experience Card -->
            <div class="experience-card">
              <div class="card-header" @click="toggleExpanded(position.id)">
                <div class="position-info">
                  <h3 class="position-title">{{ position.title }}</h3>
                  <div class="company-info">
                    <span class="company-name">{{ position.company }}</span>
                    <span class="location">{{ position.location }}</span>
                  </div>
                  <div class="period-info">
                    <span class="period">{{ position.period.start }} - {{ position.period.end }}</span>
                    <span class="duration">{{ position.period.duration }}</span>
                    <span class="type">{{ position.type }}</span>
                  </div>
                </div>
                
                <div class="expand-button">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2"
                    :class="{ 'rotated': expandedItems.includes(position.id) }"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              <div class="card-content">
                <p class="position-description">{{ position.description }}</p>

                <!-- Expandable Details -->
                <div class="expandable-content">
                  <!-- Responsibilities -->
                  <div class="detail-section">
                    <h4 class="detail-title">Key Responsibilities</h4>
                    <ul class="responsibility-list">
                      <li 
                        v-for="(responsibility, idx) in position.responsibilities" 
                        :key="idx"
                        class="responsibility-item"
                        :style="{ animationDelay: `${idx * 100}ms` }"
                      >
                        {{ responsibility }}
                      </li>
                    </ul>
                  </div>

                  <!-- Technologies -->
                  <div class="detail-section">
                    <h4 class="detail-title">Technologies Used</h4>
                    <div class="tech-tags">
                      <span 
                        v-for="(tech, idx) in position.technologies" 
                        :key="tech"
                        class="tech-tag"
                        :style="{ animationDelay: `${idx * 50}ms` }"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- Achievements -->
                  <div class="detail-section">
                    <h4 class="detail-title">Key Achievements</h4>
                    <ul class="achievement-list">
                      <li 
                        v-for="(achievement, idx) in position.achievements" 
                        :key="idx"
                        class="achievement-item"
                        :style="{ animationDelay: `${idx * 100}ms` }"
                      >
                        <div class="achievement-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        {{ achievement }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Summary -->
        <div class="experience-summary">
          <div class="summary-stats">
            <div class="stat-item">
              <div class="stat-number">{{ userProfile.experience.total }}</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ userProfile.experience.positions.length }}</div>
              <div class="stat-label">Positions</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Projects Delivered</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ userProfile.education.current.expectedGraduation }}</div>
              <div class="stat-label">Expected Graduation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { USER_PROFILE } from '@/utils/constants'

const userProfile = USER_PROFILE

// Intersection observer for scroll animations
const { target: sectionRef, isVisible } = useIntersectionObserver({
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
})

// Expandable items state
const expandedItems = ref([])

// Toggle expanded state for experience items
const toggleExpanded = (positionId) => {
  const index = expandedItems.value.indexOf(positionId)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(positionId)
  }
}
</script>

<style scoped>
.experience-section {
  padding: 6rem 0;
  background: var(--color-background);
  position: relative;
  overflow: hidden;
}

.experience-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  opacity: 0.3;
}

.experience-content {
  max-width: 1000px;
  margin: 0 auto;
}

.experience-header {
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
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  margin: 0 auto 1.5rem;
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.timeline-container {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 2rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--color-primary), var(--color-accent));
  opacity: 0.3;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-play-state: paused;
}

.timeline-node {
  position: absolute;
  padding: 12px;
  left: 1.25rem;
  top: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--color-surface);
  border: 3px solid var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.node-inner {
  color: var(--color-primary);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-node {
  border-color: var(--color-accent);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.timeline-item:hover .node-inner {
  color: var(--color-accent);
}

/* Education specific styles */
.education-item .timeline-node {
  border-color: var(--color-secondary);
}

.education-node .node-inner {
  color: var(--color-secondary);
}

.education-item:hover .timeline-node {
  border-color: var(--color-accent);
}

.education-card {
  border-color: rgba(59, 130, 246, 0.2);
  background: linear-gradient(135deg, var(--color-surface) 0%, rgba(59, 130, 246, 0.02) 100%);
}

.education-card:hover {
  border-color: var(--color-secondary);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
}

.education-type {
  background: rgba(59, 130, 246, 0.15);
  color: var(--color-secondary);
}

.experience-card {
  margin-left: 4rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.experience-card:hover {
  border-color: var(--color-accent);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
  transform: translateY(-2px);
}

.card-header {
  padding: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.card-header:hover {
  background: rgba(59, 130, 246, 0.05);
}

.position-info {
  flex: 1;
}

.position-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-primary);
}

.location {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.period-info {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.period {
  font-weight: 500;
  color: var(--color-text);
}

.duration {
  color: var(--color-accent);
  font-weight: 500;
}

.type {
  font-size: 0.85rem;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.2);
  color: var(--color-accent);
  border-radius: 20px;
  font-weight: 500;
}

.expand-button {
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
  margin-left: 1rem;
}

.expand-button svg {
  transition: transform 0.3s ease;
}

.expand-button svg.rotated {
  transform: rotate(180deg);
}

.card-header:hover .expand-button {
  color: var(--color-accent);
}

.card-content {
  padding: 0 2rem 2rem;
}

.position-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.expandable-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.expanded .expandable-content {
  max-height: 1000px;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-title::before {
  content: '';
  width: 3px;
  height: 1.2rem;
  background: var(--color-accent);
  border-radius: 2px;
}

.responsibility-list,
.achievement-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibility-item,
.achievement-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  color: var(--color-text-secondary);
  line-height: 1.6;
  opacity: 0;
  transform: translateY(10px);
  animation: slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-play-state: paused;
}

.timeline-item.expanded .responsibility-item,
.timeline-item.expanded .achievement-item {
  animation-play-state: running;
}

.responsibility-item:last-child,
.achievement-item:last-child {
  border-bottom: none;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.achievement-icon {
  color: var(--color-accent);
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-accent);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
  opacity: 0;
  transform: scale(0.8);
  animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-play-state: paused;
  transition: all 0.3s ease;
}

.timeline-item.expanded .tech-tag {
  animation-play-state: running;
}

.tech-tag:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
}

.experience-summary {
  margin-top: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-family: 'Inter', monospace;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Visibility animations */
.experience-section.is-visible .experience-header {
  opacity: 1;
  transform: translateY(0);
}

.experience-section.is-visible .title-underline {
  transform: scaleX(1);
}

.experience-section.is-visible .timeline-line {
  transform: scaleY(1);
}

.experience-section.is-visible .timeline-item {
  animation-play-state: running;
}

.experience-section.is-visible .experience-summary {
  opacity: 1;
  transform: translateY(0);
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .timeline-line {
    left: 1rem;
  }

  .timeline-node {
    left: 0.25rem;
  }

  .experience-card {
    margin-left: 2.5rem;
  }

  .card-header {
    padding: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .expand-button {
    margin-left: 0;
    align-self: flex-end;
  }

  .card-content {
    padding: 0 1.5rem 1.5rem;
  }

  .position-title {
    font-size: 1.2rem;
  }

  .period-info {
    flex-direction: column;
    gap: 0.5rem;
  }

  .summary-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .experience-card {
    margin-left: 2rem;
  }

  .card-header {
    padding: 1.25rem;
  }

  .card-content {
    padding: 0 1.25rem 1.25rem;
  }

  .tech-tags {
    gap: 0.25rem;
  }

  .tech-tag {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .summary-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1.25rem;
  }
}
</style>