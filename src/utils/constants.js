// User profile data
export const USER_PROFILE = {
  name: {
    full: "Cristovão Rodrigues de Carvalho Junior",
    display: "Cristovão Junior",
  },
  role: "Front-end Developer",
  photo: "/images/projects/profile-photo.png", // Add your photo here
  bio: "Passionate front-end developer with 5 years of experience creating modern web applications. Currently pursuing a degree in Systems Analysis and Development while working on innovative government technology solutions.",
  location: "Tocantins, Brazil",
  education: {
    current: {
      degree: "Technology in Systems Analysis and Development",
      degreePortuguese:
        "Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)",
      institution: "University Name", // You can update this with your actual university
      status: "In Progress",
      startYear: "2023", // Update with actual year
      expectedGraduation: "2025", // Update with actual year
    },
  },
  experience: {
    total: 5,
    current: {
      company: "Agencia de Tecnologia de Informação do TO (ATI)",
      duration: 5,
    },
    positions: [
      {
        id: 1,
        title: "Front-end Developer",
        company: "Agencia de Tecnologia de Informação do TO (ATI)",
        location: "Tocantins, Brazil",
        period: {
          start: "2019",
          end: "Present",
          duration: "5 years",
        },
        type: "Full-time",
        description:
          "Leading frontend development initiatives and creating modern web applications for government technology solutions.",
        responsibilities: [
          "Developed and maintained responsive web applications using Vue.js and modern JavaScript",
          "Collaborated with design teams to implement pixel-perfect UI/UX designs",
          "Optimized application performance and implemented best practices for code quality",
          "Mentored junior developers and conducted code reviews",
          "Integrated frontend applications with RESTful APIs and backend services",
        ],
        technologies: ["Vue.js", "JavaScript", "HTML/CSS", "Figma", "Git"],
        achievements: [
          "Improved application load times by 40% through optimization techniques",
          "Successfully delivered 15+ projects on time and within budget",
          "Implemented responsive design patterns that improved mobile user experience",
        ],
      },
    ],
  },
  skills: {
    frontend: [
      { name: "HTML/CSS/JavaScript", years: 5, level: 95 },
      { name: "Vue.js", years: 2.5, level: 90 },
      { name: "React", years: 0.33, level: 60 },
      { name: "jQuery", years: 1, level: 80 },
      { name: "Tailwind CSS", years: 1, level: 85 },
    ],
    design: [
      { name: "Web Design", years: 5, level: 90 },
      { name: "Figma", years: 3, level: 85 },
      { name: "UI Design", years: 4.5, level: 88 },
    ],
  },
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Intermediate" },
  ],
};

// Navigation sections
export const NAVIGATION_SECTIONS = [
  { id: "hero", label: "Home", hash: "#hero" },
  { id: "about", label: "About", hash: "#about" },
  { id: "skills", label: "Skills", hash: "#skills" },
  { id: "experience", label: "Experience", hash: "#experience" },
  { id: "projects", label: "Projects", hash: "#projects" },
  { id: "contact", label: "Contact", hash: "#contact" },
];

// Theme configuration
export const THEME_CONFIG = {
  dark: {
    primary: "#1e3a8a",
    secondary: "#3b82f6",
    accent: "#60a5fa",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#cbd5e1",
  },
  light: {
    primary: "#1e3a8a",
    secondary: "#3b82f6",
    accent: "#2563eb",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
    textSecondary: "#475569",
  },
};

// Projects data
export const PROJECTS = [
  {
    id: 1,
    title: "Naissa & Cristovão Wedding Website",
    description:
      "Beautiful and elegant wedding website featuring event details, photo gallery, RSVP system, and guest information.",
    image: "/images/projects/naissaecristovao.png",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Figma"],
    category: "Wedding Website",
    status: "Completed",
    year: "2024",
    features: [
      "Elegant and romantic design",
      "Photo gallery with lightbox",
      "RSVP management system",
      "Event timeline and details",
      "Mobile-responsive layout",
      "Guest information portal",
    ],
    links: {
      demo: "#", // Add actual wedding website link
      github: "#", // Add if available
    },
  },
  {
    id: 2,
    title: "ATI Government Portal",
    description:
      "Modern government services portal for Tocantins Technology Agency with improved accessibility and user experience.",
    image: "/images/projects/ati-portal.jpg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Figma"],
    category: "Web Development",
    status: "Completed",
    year: "2024",
    features: [
      "Responsive design for all devices",
      "WCAG 2.1 accessibility compliance",
      "Performance optimization",
      "Modern UI/UX design",
      "Government service integration",
    ],
    links: {
      demo: "https://ati.to.gov.br", // Update with actual link
      github: "#", // Add if available
    },
  },
  {
    id: 3,
    title: "Government Dashboard Analytics",
    description:
      "Real-time data visualization dashboard for monitoring government services and citizen engagement metrics.",
    image: "/images/projects/dashboard.jpg",
    technologies: ["Vue.js", "Chart.js", "JavaScript", "CSS3"],
    category: "Data Visualization",
    status: "Completed",
    year: "2023",
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Responsive grid layout",
      "Export functionality",
      "Multi-department integration",
    ],
    links: {
      demo: "#", // Update with actual link
      github: "#",
    },
  },
  {
    id: 3,
    title: "Citizen Services Platform",
    description:
      "Digital platform for citizens to access government services online with document management and appointment scheduling.",
    image: "/images/projects/citizen-services.jpg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "API Integration"],
    category: "Government Services",
    status: "Completed",
    year: "2023",
    features: [
      "Online service requests",
      "Document upload and management",
      "Appointment scheduling system",
      "Status tracking",
      "Mobile-responsive design",
    ],
    links: {
      demo: "#", // Update with actual link
      github: "#",
    },
  },
  {
    id: 4,
    title: "Internal Management System",
    description:
      "Comprehensive internal management system for government employees with workflow automation and reporting.",
    image: "/images/projects/management-system.jpg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Workflow Engine"],
    category: "Enterprise Software",
    status: "Completed",
    year: "2022",
    features: [
      "Workflow automation",
      "Employee management",
      "Report generation",
      "Role-based access control",
      "Integration with existing systems",
    ],
    links: {
      demo: "#", // Internal system
      github: "#",
    },
  },
  {
    id: 5,
    title: "Digital Forms Builder",
    description:
      "Dynamic form builder for creating government forms with validation, conditional logic, and data export capabilities.",
    image: "/images/projects/forms-builder.jpg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Form Engine"],
    category: "Form Builder",
    status: "Completed",
    year: "2022",
    features: [
      "Drag-and-drop form builder",
      "Conditional logic support",
      "Data validation rules",
      "Export to multiple formats",
      "Integration with databases",
    ],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: 6,
    title: "Personal Portfolio Website",
    description:
      "Modern portfolio website showcasing projects and skills with gamification elements and smooth animations.",
    image: "/images/projects/portfolio.jpg",
    technologies: ["Vue.js", "CSS3", "JavaScript", "Figma"],
    category: "Portfolio",
    status: "In Progress",
    year: "2024",
    features: [
      "Gamification elements",
      "Dark/Light theme toggle",
      "Smooth animations",
      "Responsive design",
      "Performance optimized",
    ],
    links: {
      demo: "#", // This portfolio
      github: "https://github.com/cristovao-junior", // Update with your GitHub
    },
  },
];

// Technology categories for filtering
export const TECHNOLOGY_CATEGORIES = [
  { name: "All", value: "all", color: "var(--color-accent)" },
  { name: "Vue.js", value: "Vue.js", color: "#4FC08D" },
  { name: "React", value: "React", color: "#61DAFB" },
  { name: "JavaScript", value: "JavaScript", color: "#F7DF1E" },
  { name: "CSS3", value: "CSS3", color: "#1572B6" },
  { name: "Tailwind", value: "Tailwind", color: "#06B6D4" },
  { name: "Figma", value: "Figma", color: "#F24E1E" },
  { name: "Wedding", value: "Wedding Website", color: "#EC4899" },
];

// Animation settings
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 400,
  },
  easing: {
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
