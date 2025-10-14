// User profile data
export const USER_PROFILE = {
  name: {
    full: "Cristovão Rodrigues de Carvalho Junior",
    display: "Cristovão Junior"
  },
  role: "Front-end Developer",
  experience: {
    total: 5,
    current: {
      company: "Agencia de Tecnologia de Informação do TO (ATI)",
      duration: 5
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
          duration: "5 years"
        },
        type: "Full-time",
        description: "Leading frontend development initiatives and creating modern web applications for government technology solutions.",
        responsibilities: [
          "Developed and maintained responsive web applications using Vue.js and modern JavaScript",
          "Collaborated with design teams to implement pixel-perfect UI/UX designs",
          "Optimized application performance and implemented best practices for code quality",
          "Mentored junior developers and conducted code reviews",
          "Integrated frontend applications with RESTful APIs and backend services"
        ],
        technologies: ["Vue.js", "JavaScript", "HTML/CSS", "Figma", "Git"],
        achievements: [
          "Improved application load times by 40% through optimization techniques",
          "Successfully delivered 15+ projects on time and within budget",
          "Implemented responsive design patterns that improved mobile user experience"
        ]
      }
    ]
  },
  skills: {
    frontend: [
      { name: "HTML/CSS/JavaScript", years: 5, level: 95 },
      { name: "Vue.js", years: 2.5, level: 90 },
      { name: "React", years: 0.33, level: 60 },
      { name: "jQuery", years: 1, level: 80 },
      { name: "Tailwind CSS", years: 1, level: 85 }
    ],
    design: [
      { name: "Web Design", years: 5, level: 90 },
      { name: "Figma", years: 3, level: 85 },
      { name: "UI Design", years: 4.5, level: 88 }
    ]
  },
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Intermediate" }
  ]
}

// Navigation sections
export const NAVIGATION_SECTIONS = [
  { id: 'hero', label: 'Home', hash: '#hero' },
  { id: 'about', label: 'About', hash: '#about' },
  { id: 'skills', label: 'Skills', hash: '#skills' },
  { id: 'experience', label: 'Experience', hash: '#experience' },
  { id: 'projects', label: 'Projects', hash: '#projects' },
  { id: 'contact', label: 'Contact', hash: '#contact' }
]

// Theme configuration
export const THEME_CONFIG = {
  dark: {
    primary: "#1e3a8a",
    secondary: "#3b82f6", 
    accent: "#60a5fa",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#cbd5e1"
  },
  light: {
    primary: "#1e3a8a",
    secondary: "#3b82f6",
    accent: "#2563eb",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
    textSecondary: "#475569"
  }
}

// Projects data
export const PROJECTS = [
  {
    id: 1,
    title: "Government Portal Redesign",
    description: "Complete redesign of a government services portal with improved UX and accessibility compliance.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Figma"],
    category: "Web Development",
    status: "Completed",
    year: "2024",
    features: [
      "Responsive design for all devices",
      "WCAG 2.1 accessibility compliance",
      "Performance optimization",
      "Modern UI/UX design"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 2,
    title: "Interactive Dashboard",
    description: "Real-time data visualization dashboard for monitoring government services and metrics.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "Chart.js", "JavaScript", "CSS3"],
    category: "Data Visualization",
    status: "Completed",
    year: "2023",
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Responsive grid layout",
      "Export functionality"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Modern e-commerce solution with shopping cart, payment integration, and admin panel.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "JavaScript", "Tailwind", "Figma"],
    category: "E-commerce",
    status: "In Progress",
    year: "2024",
    features: [
      "Shopping cart functionality",
      "Payment gateway integration",
      "Product catalog management",
      "Admin dashboard"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 4,
    title: "Mobile-First Web App",
    description: "Progressive web application optimized for mobile devices with offline capabilities.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "PWA", "JavaScript", "CSS3"],
    category: "Mobile Development",
    status: "Completed",
    year: "2023",
    features: [
      "Progressive Web App features",
      "Offline functionality",
      "Push notifications",
      "Mobile-optimized UI"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 5,
    title: "Design System Library",
    description: "Comprehensive design system and component library for consistent UI across projects.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "Storybook", "CSS3", "Figma"],
    category: "Design System",
    status: "Completed",
    year: "2023",
    features: [
      "Reusable component library",
      "Design tokens system",
      "Documentation site",
      "Accessibility guidelines"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  },
  {
    id: 6,
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills with gamification elements.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "CSS3", "JavaScript", "Figma"],
    category: "Portfolio",
    status: "In Progress",
    year: "2024",
    features: [
      "Gamification elements",
      "Dark/Light theme toggle",
      "Smooth animations",
      "Responsive design"
    ],
    links: {
      demo: "#",
      github: "#"
    }
  }
]

// Technology categories for filtering
export const TECHNOLOGY_CATEGORIES = [
  { name: "All", value: "all", color: "var(--color-accent)" },
  { name: "Vue.js", value: "Vue.js", color: "#4FC08D" },
  { name: "React", value: "React", color: "#61DAFB" },
  { name: "JavaScript", value: "JavaScript", color: "#F7DF1E" },
  { name: "CSS3", value: "CSS3", color: "#1572B6" },
  { name: "Tailwind", value: "Tailwind", color: "#06B6D4" },
  { name: "Figma", value: "Figma", color: "#F24E1E" }
]

// Animation settings
export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 400
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
}