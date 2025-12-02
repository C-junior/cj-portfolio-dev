<template>
  <section
    id="cv"
    ref="sectionRef"
    class="cv-section section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="container">
      <div class="cv-header">
        <div class="cv-header-content">
          <h2 class="section-title">Professional Resume</h2>
          <div class="title-underline"></div>
        </div>
        
        <div class="cv-actions">
          <button 
            class="download-btn"
            @click="downloadPDF"
            :disabled="isGeneratingPDF"
          >
            <DownloadIcon 
              :size="20" 
              class="btn-icon" 
              :class="{ 'spinning': isGeneratingPDF }"
            />
            <span v-if="!isGeneratingPDF">Download PDF</span>
            <span v-else>Generating...</span>
          </button>
        </div>
      </div>

      <div id="cv-content" class="cv-content" style="display: none;">
        <!-- CV Header (only for PDF generation) -->
        <header class="cv-header-section">
          <div class="cv-personal-info">
            <div class="cv-profile-photo">
              <img
                v-if="!profileImageError"
                :src="resumeData.personal.photo"
                :alt="`${resumeData.personal.name.display} - Profile Photo`"
                @error="handleImageError"
              />
              <div v-else class="cv-profile-placeholder">
                <UserIcon :size="64" />
              </div>
            </div>

            <div class="cv-name-title">
              <h1>{{ resumeData.personal.name.full }}</h1>
              <h2>{{ resumeData.personal.role }}</h2>
              <div class="cv-contact-info">
                <div class="contact-item">
                  <MailIcon :size="16" />
                  <span>{{ resumeData.personal.contact.email }}</span>
                </div>
                <div class="contact-item">
                  <PhoneIcon :size="16" />
                  <span>{{ resumeData.personal.contact.phone }}</span>
                </div>
                <div class="contact-item">
                  <MapPinIcon :size="16" />
                  <span>{{ resumeData.personal.contact.location }}</span>
                </div>
                <div class="contact-item">
                  <GlobeIcon :size="16" />
                  <span>{{ resumeData.personal.contact.website }}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Summary -->
        <section class="cv-summary">
          <h3>PROFESSIONAL SUMMARY</h3>
          <p>{{ resumeData.personal.bio }}</p>
        </section>

        <!-- Experience -->
        <section class="cv-experience">
          <h3>WORK EXPERIENCE</h3>
          <div
            v-for="position in resumeData.experience"
            :key="position.id"
            class="cv-position"
          >
            <div class="position-header">
              <h4>{{ position.title }}</h4>
              <div class="position-details">
                <span class="company">{{ position.company }}</span>
                <span class="location">{{ position.location }}</span>
                <span class="period">{{ position.period.start }} - {{ position.period.end }}</span>
              </div>
            </div>
            <p class="position-description">{{ position.description }}</p>

            <div v-if="position.responsibilities && position.responsibilities.length" class="responsibilities">
              <h5>Key Responsibilities:</h5>
              <ul>
                <li v-for="(resp, index) in position.responsibilities" :key="index">{{ resp }}</li>
              </ul>
            </div>

            <div v-if="position.achievements && position.achievements.length" class="achievements">
              <h5>Key Achievements:</h5>
              <ul>
                <li v-for="(ach, index) in position.achievements" :key="index">{{ ach }}</li>
              </ul>
            </div>

            <div v-if="position.technologies && position.technologies.length" class="technologies">
              <h5>Technologies Used:</h5>
              <div class="tech-tags">
                <span
                  v-for="(tech, index) in position.technologies"
                  :key="index"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section class="cv-education">
          <h3>EDUCATION</h3>
          <div class="education-item">
            <div class="education-header">
              <h4>{{ resumeData.education.current.degree }}</h4>
              <div class="education-details">
                <span class="institution">{{ resumeData.education.current.institution }}</span>
                <span class="status">{{ resumeData.education.current.status }}</span>
                <span class="dates">{{ resumeData.education.current.startYear }} - {{ resumeData.education.current.expectedGraduation }}</span>
              </div>
            </div>
            <p class="education-description">{{ resumeData.education.current.degreePortuguese }}</p>
          </div>

          <div
            v-for="(edu, index) in resumeData.education.past"
            :key="index"
            class="education-item"
          >
            <div class="education-header">
              <h4>{{ edu.degree }}</h4>
              <div class="education-details">
                <span class="institution">{{ edu.institution }}</span>
                <span class="status">{{ edu.status }}</span>
                <span class="dates">{{ edu.startYear }} - {{ edu.endYear }}</span>
              </div>
            </div>
            <p class="education-description">{{ edu.degreePortuguese }}</p>
          </div>
        </section>

        <!-- Skills -->
        <section class="cv-skills">
          <h3>SKILLS & COMPETENCIES</h3>
          <div class="skills-grid">
            <div class="skill-category">
              <h4>Frontend Development</h4>
              <ul>
                <li v-for="skill in resumeData.skills.frontend" :key="skill.name">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-years">({{ skill.years }} years)</span>
                </li>
              </ul>
            </div>
            <div class="skill-category">
              <h4>Design & UI/UX</h4>
              <ul>
                <li v-for="skill in resumeData.skills.design" :key="skill.name">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-years">({{ skill.years }} years)</span>
                </li>
              </ul>
            </div>
            <div class="skill-category">
              <h4>Soft Skills</h4>
              <ul>
                <li v-for="skill in resumeData.skills.soft" :key="skill.name">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-years">({{ skill.years }} years)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Languages -->
        <section class="cv-languages">
          <h3>LANGUAGES</h3>
          <div class="languages-grid">
            <div
              v-for="(language, index) in resumeData.languages"
              :key="index"
              class="language-item"
            >
              <span class="language-name">{{ language.name }}</span>
              <span class="language-level">{{ language.level }}</span>
            </div>
          </div>
        </section>

        <!-- Awards & Recognition -->
        <section class="cv-awards">
          <h3>AWARDS & RECOGNITION</h3>
          <div class="awards-grid">
            <div
              v-for="(award, index) in resumeData.awards"
              :key="index"
              class="award-item"
            >
              <AwardIcon
                :size="20"
                class="award-icon"
                :class="index === 0 || index === 2 ? 'gold' : 'bronze'"
              />
              <div class="award-content">
                <h4>{{ award.title }}</h4>
                <p class="award-year">{{ award.year }}</p>
                <p class="award-description">{{ award.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Website content - only the download button -->
      <div class="cv-download-prompt">
        <p class="cv-prompt-text">Download a professional PDF version of my resume:</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
import { USER_PROFILE } from '@/utils/constants'
import { RESUME_CONFIG } from '@/config/resumeConfig'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {
  DownloadIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  AwardIcon
} from 'lucide-vue-next'

const userProfile = USER_PROFILE
const resumeData = RESUME_CONFIG

const { target: sectionRef, isVisible } = useIntersectionObserver({
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
})

const isGeneratingPDF = ref(false)
const profileImageError = ref(false)

const handleImageError = () => {
  profileImageError.value = true
}

const downloadPDF = async () => {
  isGeneratingPDF.value = true

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    })

    let yPos = 20; // Starting Y position
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20

    // Adding profile photo to the PDF if available
    if (resumeData.personal.photo) {
      try {
        const img = new Image();
        img.src = resumeData.personal.photo;

        // Load image and add it to PDF
        const imgData = await new Promise((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          };
          img.onerror = reject;
        });

        // Draw photo in the header area - rectangular with better proportions
        const photoWidth = 22;  // More rectangular width
        const photoHeight = 30; // More rectangular height
        const photoX = pageWidth - margin - photoWidth; // Positioned on the right
        const photoY = yPos - 8; // Adjusted position for taller photo

        pdf.addImage(imgData, 'JPEG', photoX, photoY, photoWidth, photoHeight, undefined, 'FAST');
      } catch (imgError) {
        console.warn('Could not load profile photo for PDF:', imgError);
      }
    }

    // Add title - adjusted positioning to better align with photo
    const titleYPos = yPos + 10; // Adjust title position to align better with photo
    pdf.setFontSize(22)
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.setFont(undefined, 'bold')
    pdf.text(resumeData.personal.name.full, margin, titleYPos, { align: 'left' })

    const roleYPos = titleYPos + 8;
    pdf.setFontSize(14)
    pdf.setTextColor(59, 130, 246) // var(--color-accent)
    pdf.setFont(undefined, 'normal')
    pdf.text(resumeData.personal.role, margin, roleYPos, { align: 'left' })

    yPos = roleYPos + 10; // Updated spacing after role

    // Contact info - arranged in two columns for better space use
    pdf.setFontSize(10)
    pdf.setTextColor(15, 23, 42) // var(--color-text)
    const contactInfo = [
      `Email: ${resumeData.personal.contact.email}`,
      `Phone: ${resumeData.personal.contact.phone}`,
      `Location: ${resumeData.personal.contact.location}`,
      `Website: ${resumeData.personal.contact.website}`
    ]

    // Render contact info in two columns
    const leftColumnX = margin;
    const rightColumnX = pageWidth / 2 + 10; // Slightly inset from center

    // Left column: Email and Phone
    pdf.text(contactInfo[0], leftColumnX, yPos, { align: 'left' }); // Email
    pdf.text(contactInfo[1], leftColumnX, yPos + 5, { align: 'left' }); // Phone

    // Right column: Location and Website
    pdf.text(contactInfo[2], rightColumnX, yPos, { align: 'left' }); // Location
    pdf.text(contactInfo[3], rightColumnX, yPos + 5, { align: 'left' }); // Website

    // Set the new Y position after contact info
    yPos += 10;

    // Add a separator line
    pdf.setDrawColor(59, 130, 246) // var(--color-accent)
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    // Professional Summary
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.text('PROFESSIONAL SUMMARY', margin, yPos)

    yPos += 7

    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    pdf.setTextColor(15, 23, 42) // var(--color-text)

    // Split bio text into lines to fit the page
    const bioLines = pdf.splitTextToSize(resumeData.personal.bio, pageWidth - 2 * margin)
    bioLines.forEach(line => {
      if (yPos > 270) { // Check if we're near the bottom of the page
        pdf.addPage()
        yPos = 20
      }
      pdf.text(line, margin, yPos)
      yPos += 8  // Increased line spacing
    })

    yPos += 12  // Increased spacing after summary

    // Work Experience
    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.text('WORK EXPERIENCE', margin, yPos)

    yPos += 7

    for (const position of resumeData.experience) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }

      pdf.setFontSize(11)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(position.title, margin, yPos)

      yPos += 6  // Increased spacing

      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(59, 130, 246) // var(--color-accent)
      pdf.text(`${position.company} • ${position.location}`, margin, yPos)
      yPos += 5  // Increased spacing

      pdf.setTextColor(100, 116, 139) // Secondary color
      pdf.text(`${position.period.start} - ${position.period.end}`, margin, yPos)
      yPos += 6  // Increased spacing

      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(position.description, margin, yPos)
      yPos += 7  // Increased spacing

      // Responsibilities
      if (position.responsibilities && position.responsibilities.length) {
        yPos += 3  // Increased spacing
        pdf.setFontSize(10)
        pdf.setFont(undefined, 'bold')
        pdf.setTextColor(30, 58, 138) // var(--color-primary)
        pdf.text('Key Responsibilities:', margin, yPos)
        yPos += 6  // Increased spacing

        for (const resp of position.responsibilities) {
          if (yPos > 270) {
            pdf.addPage()
            yPos = 20
          }
          pdf.setFont(undefined, 'normal')
          pdf.setTextColor(15, 23, 42) // var(--color-text)
          pdf.text(`• ${resp}`, margin + 2, yPos)
          yPos += 6  // Increased spacing
        }
      }

      // Achievements
      if (position.achievements && position.achievements.length) {
        yPos += 3  // Increased spacing
        pdf.setFontSize(10)
        pdf.setFont(undefined, 'bold')
        pdf.setTextColor(30, 58, 138) // var(--color-primary)
        pdf.text('Key Achievements:', margin, yPos)
        yPos += 6  // Increased spacing

        for (const ach of position.achievements) {
          if (yPos > 270) {
            pdf.addPage()
            yPos = 20
          }
          pdf.setFont(undefined, 'normal')
          pdf.setTextColor(15, 23, 42) // var(--color-text)
          pdf.text(`• ${ach}`, margin + 2, yPos)
          yPos += 6  // Increased spacing
        }
      }

      // Technologies
      if (position.technologies && position.technologies.length) {
        yPos += 3  // Increased spacing
        pdf.setFontSize(10)
        pdf.setFont(undefined, 'bold')
        pdf.setTextColor(30, 58, 138) // var(--color-primary)
        pdf.text('Technologies Used:', margin, yPos)
        yPos += 6  // Increased spacing

        const technologies = position.technologies.join(', ')
        const techLines = pdf.splitTextToSize(technologies, pageWidth - 2 * margin - 5)
        techLines.forEach(line => {
          if (yPos > 270) {
            pdf.addPage()
            yPos = 20
          }
          pdf.setFont(undefined, 'normal')
          pdf.setTextColor(15, 23, 42) // var(--color-text)
          pdf.text(line, margin + 2, yPos)
          yPos += 6  // Increased spacing
        })
      }

      yPos += 10 // Increased space between positions
    }

    // Education
    if (yPos > 270) {
      pdf.addPage()
      yPos = 20
    }

    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.text('EDUCATION', margin, yPos)

    yPos += 7

    // Current education
    pdf.setFontSize(11)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(15, 23, 42) // var(--color-text)
    pdf.text(resumeData.education.current.degree, margin, yPos)

    yPos += 6  // Increased spacing

    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    pdf.setTextColor(59, 130, 246) // var(--color-accent)
    pdf.text(resumeData.education.current.institution, margin, yPos)
    yPos += 5  // Increased spacing

    pdf.setTextColor(100, 116, 139) // Secondary color
    pdf.text(`${resumeData.education.current.startYear} - ${resumeData.education.current.expectedGraduation} • ${resumeData.education.current.status}`, margin, yPos)
    yPos += 6  // Increased spacing

    pdf.setFontSize(10)
    pdf.setFont(undefined, 'normal')
    pdf.setTextColor(15, 23, 42) // var(--color-text)
    pdf.text(resumeData.education.current.degreePortuguese, margin, yPos)
    yPos += 10  // Increased spacing

    // Past education
    for (const edu of resumeData.education.past) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }

      pdf.setFontSize(11)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(edu.degree, margin, yPos)

      yPos += 6  // Increased spacing

      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(59, 130, 246) // var(--color-accent)
      pdf.text(edu.institution, margin, yPos)
      yPos += 5  // Increased spacing

      pdf.setTextColor(100, 116, 139) // Secondary color
      pdf.text(`${edu.startYear} - ${edu.endYear} • ${edu.status}`, margin, yPos)
      yPos += 6  // Increased spacing

      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(edu.degreePortuguese, margin, yPos)
      yPos += 10  // Increased spacing
    }

    // Skills
    if (yPos > 270) {
      pdf.addPage()
      yPos = 20
    }

    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.text('SKILLS & COMPETENCIES', margin, yPos)

    yPos += 7

    pdf.setFontSize(10)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(15, 23, 42) // var(--color-text)
    pdf.text('Frontend Development:', margin, yPos)
    yPos += 5

    for (const skill of resumeData.skills.frontend) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(`${skill.name} (${skill.years} years)`, margin + 2, yPos)
      yPos += 5  // Increased spacing
    }

    yPos += 4  // Increased spacing

    pdf.setFontSize(10)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(15, 23, 42) // var(--color-text)
    pdf.text('Design & UI/UX:', margin, yPos)
    yPos += 6  // Increased spacing

    for (const skill of resumeData.skills.design) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(`${skill.name} (${skill.years} years)`, margin + 2, yPos)
      yPos += 5  // Increased spacing
    }

    yPos += 4  // Increased spacing

    pdf.setFontSize(10)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(15, 23, 42) // var(--color-text)
    pdf.text('Soft Skills:', margin, yPos)
    yPos += 6  // Increased spacing

    for (const skill of resumeData.skills.soft) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(`${skill.name} (${skill.years} years)`, margin + 2, yPos)
      yPos += 5  // Increased spacing
    }

    // Languages
    if (yPos > 270) {
      pdf.addPage()
      yPos = 20
    }

    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.text('LANGUAGES', margin, yPos)

    yPos += 7

    for (const language of resumeData.languages) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }
      pdf.setFontSize(10)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(`${language.name} - ${language.level}`, margin, yPos)
      yPos += 6  // Increased spacing
    }

    // Awards & Recognition
    if (yPos > 270) {
      pdf.addPage()
      yPos = 20
    }

    pdf.setFontSize(12)
    pdf.setFont(undefined, 'bold')
    pdf.setTextColor(30, 58, 138) // var(--color-primary)
    pdf.text('AWARDS & RECOGNITION', margin, yPos)

    yPos += 7

    for (const award of resumeData.awards) {
      if (yPos > 270) {
        pdf.addPage()
        yPos = 20
      }

      pdf.setFontSize(10)
      pdf.setFont(undefined, 'bold')
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      pdf.text(award.title, margin, yPos)
      yPos += 5  // Increased spacing

      pdf.setFontSize(9)
      pdf.setFont(undefined, 'normal')
      pdf.setTextColor(59, 130, 246) // var(--color-accent)
      pdf.text(award.year, margin, yPos)
      yPos += 5  // Increased spacing

      pdf.setFontSize(9)
      pdf.setTextColor(15, 23, 42) // var(--color-text)
      const awardLines = pdf.splitTextToSize(award.description, pageWidth - 2 * margin - 5)
      awardLines.forEach(line => {
        if (yPos > 270) {
          pdf.addPage()
          yPos = 20
        }
        pdf.text(line, margin + 2, yPos)
        yPos += 5  // Increased spacing
      })

      yPos += 4  // Increased spacing between awards
    }

    pdf.save('Cristovao-Junior-Resume.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
  } finally {
    isGeneratingPDF.value = false
  }
}

onMounted(() => {
  // Preload the profile image to improve rendering
  if (userProfile.photo) {
    const img = new Image()
    img.src = userProfile.photo
    img.onload = () => {
      console.log('Profile image loaded for CV section')
    }
    img.onerror = () => {
      profileImageError.value = true
    }
  }
})
</script>

<style scoped>
.cv-section {
  padding: 6rem 0;
  background: var(--color-surface);
  position: relative;
  overflow: hidden;
}

.cv-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
  opacity: 0.3;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.cv-header-content {
  text-align: left;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 1rem 0;
  position: relative;
}

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  margin: 0;
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.cv-section.is-visible .title-underline {
  transform: scaleX(1);
}

.cv-download-prompt {
  text-align: center;
  padding: 2rem;
  background: var(--color-surface);
  border-radius: 12px;
  margin-top: 2rem;
}

.cv-prompt-text {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.cv-actions {
  display: flex;
  gap: 1rem;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.download-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.download-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* CV Content Styles */
#cv-content {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.cv-header-section {
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.cv-personal-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.cv-profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid var(--color-primary);
}

.cv-profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cv-profile-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
}

.cv-name-title h1 {
  font-size: 2.2rem;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.cv-name-title h2 {
  font-size: 1.4rem;
  color: var(--color-accent);
  margin: 0 0 1.5rem 0;
  font-weight: 600;
}

.cv-contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.contact-item svg {
  color: var(--color-accent);
}

.cv-summary, .cv-experience, .cv-education, .cv-skills, .cv-languages, .cv-awards {
  margin-bottom: 2.5rem;
}

.cv-summary h3, .cv-experience h3, .cv-education h3, .cv-skills h3, .cv-languages h3, .cv-awards h3 {
  color: var(--color-primary);
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.cv-summary p {
  color: var(--color-text);
  line-height: 1.7;
  margin: 0;
}

.cv-position {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.cv-position:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.position-header {
  margin-bottom: 0.75rem;
}

.position-header h4 {
  font-size: 1.2rem;
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.position-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.company {
  font-weight: 600;
  color: var(--color-accent);
}

.position-description {
  color: var(--color-text);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.responsibilities h5, .achievements h5, .technologies h5 {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.responsibilities ul, .achievements ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--color-text-secondary);
}

.responsibilities li, .achievements li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.responsibilities li:last-child, .achievements li:last-child {
  margin-bottom: 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.education-header {
  margin-bottom: 0.5rem;
}

.education-header h4 {
  font-size: 1.1rem;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.education-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.institution {
  font-weight: 500;
}

.status {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-accent);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.education-description {
  color: var(--color-text-secondary);
  font-style: italic;
  margin: 0;
  font-size: 0.95rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.skill-category h4 {
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.skill-category ul {
  margin: 0;
  padding-left: 0;
}

.skill-category li {
  list-style: none;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  color: var(--color-text-secondary);
}

.skill-name {
  font-weight: 500;
  color: var(--color-text);
}

.skill-years {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.languages-grid {
  display: flex;
  gap: 2rem;
}

.language-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
  width: 100%;
  max-width: 200px;
}

.language-name {
  font-weight: 500;
  color: var(--color-text);
}

.language-level {
  color: var(--color-accent);
  font-weight: 600;
}

.awards-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.award-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: 8px;
}

.award-icon {
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.award-icon.gold {
  color: #FFD700;
}

.award-icon.bronze {
  color: #CD7F32;
}

.award-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
}

.award-year {
  font-size: 0.85rem;
  color: var(--color-accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
}

.award-description {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cv-section {
    padding: 4rem 0;
  }

  .container {
    max-width: 800px;
    padding: 0 1.5rem;
  }

  .cv-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .cv-actions {
    width: 100%;
    justify-content: center;
  }

  #cv-content {
    padding: 2rem;
  }

  .cv-personal-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .cv-contact-info {
    justify-content: center;
    text-align: center;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .cv-section {
    padding: 3rem 0;
  }

  .container {
    max-width: 600px;
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  #cv-content {
    padding: 1.5rem;
  }

  .cv-name-title h1 {
    font-size: 1.8rem;
  }

  .cv-name-title h2 {
    font-size: 1.2rem;
  }

  .cv-contact-info {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .languages-grid {
    flex-direction: column;
    gap: 0.5rem;
  }

  .language-item {
    max-width: none;
  }

  .position-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .award-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .award-icon {
    align-self: center;
  }

  .awards-grid {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .cv-section {
    padding: 2rem 0;
  }

  .container {
    padding: 0 0.75rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .cv-header-section {
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }

  #cv-content {
    padding: 1rem;
  }

  .cv-profile-photo {
    width: 80px;
    height: 80px;
  }

  .cv-name-title h1 {
    font-size: 1.6rem;
  }

  .cv-name-title h2 {
    font-size: 1.1rem;
  }

  .cv-contact-info {
    gap: 0.75rem;
  }

  .cv-summary h3, .cv-experience h3, .cv-education h3, .cv-skills h3, .cv-languages h3, .cv-awards h3 {
    font-size: 1.1rem;
  }

  .cv-position {
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .cv-name-title h2 {
    font-size: 1.05rem;
  }

  .contact-item {
    font-size: 0.85rem;
  }

  .position-header h4 {
    font-size: 1.1rem;
  }

  .award-content h4 {
    font-size: 0.95rem;
  }

  .award-year {
    font-size: 0.8rem;
  }

  .award-description {
    font-size: 0.85rem;
  }
}
</style>