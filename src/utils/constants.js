// User profile data
export const USER_PROFILE = {
  name: {
    full: "Cristovao Rodrigues de Carvalho Junior",
    display: "Cristovao Junior",
  },
  role: "Front-end Developer",
  photo: "/images/profile-photo.png", // Add your photo here
  bio: "Passionate front-end developer with 5 years of experience creating modern web applications. Currently pursuing a degree in Systems Analysis and Development while working on innovative government technology solutions.",
  location: "Tocantins, Brazil",
  education: {
    current: {
      degree: "Technology in Systems Analysis and Development",
      degreePortuguese:
        "Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)",
      institution: "UNITINS - Universidade de Tocantins", // Your actual university
      status: "In Progress",
      startYear: "2023", // Update with actual year
      expectedGraduation: "2025", // Update with actual year
    },
    past: [
      {
        degree: "Technical Course in Computer Science",
        degreePortuguese: "Curso Técnico em Informática",
        institution: "IFTO - Instituto Federal do Tocantins",
        status: "Completed",
        startYear: "2006",
        endYear: "2008",
        duration: "2 years",
      }
    ]
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
    title: "Agrotins 2025 - Agricultural Technology Fair",
    description:
      "Digital platform for Agrotins 2025, the largest agricultural technology fair in Northern Brazil celebrating 25 years with over 200,000 expected visitors and R$ 4.2 billion in business projections.",
    image: "/images/projects/agrotins.png",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Figma", "API Integration"],
    category: "Web Development",
    status: "Completed",
    year: "2025",
    features: [
      "Responsive design for all devices",
      "Event management and scheduling system",
      "Exhibitor and visitor information portal",
      "Technology showcase platform",
      "Business networking capabilities",
      "Real-time event updates and notifications"
    ],
    links: {
      demo: "https://agrotins.to.gov.br", // Official Agrotins website
      github: "#", // Add if available
    },
  },
  {
    id: 3,
    title: "Hydrocultivo AI - Intelligent Irrigation Management Assistant",
    description:
      "Advanced AI-powered chat agent that helps farmers optimize irrigation management by automatically retrieving climate data via API integration. The system provides intelligent recommendations for efficient water usage, crop scheduling, and irrigation timing based on real-time weather forecasts and historical data.",
    image: "/images/projects/hydrocultivoai.png",
    technologies: ["Vue.js", "AI/ML", "API Integration", "JavaScript", "CSS3", "Node.js"],
    category: "AI Solutions",
    status: "Completed",
    year: "2024",
    features: [
      "Intelligent AI chat interface for farmers",
      "Automatic climate data retrieval via API",
      "Personalized irrigation recommendations",
      "Real-time weather integration",
      "Crop-specific water management advice",
      "Historical data analysis for optimization",
      "Mobile-responsive design for field use",
      "Multi-language support for accessibility"
    ],
    links: {
      demo: "#", // Add actual demo link
      github: "#", // Add if available
    },
  },
  {
    id: 4,
    title: "CodeNews - Atendimento System for Hospitals",
    description:
      "Advanced patient management system designed specifically for hospital environments, featuring real-time appointment scheduling, patient tracking, medical history management, and comprehensive healthcare workflow automation. The system streamlines hospital operations and enhances patient care through integrated communication tools and data analytics.",
    image: "/images/projects/codenews.svg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "API Integration", "Database"],
    category: "Healthcare Software",
    status: "Completed",
    year: "2024",
    features: [
      "Real-time patient tracking system",
      "Medical history management",
      "Appointment scheduling and notifications",
      "Healthcare workflow automation",
      "Integrated communication tools",
      "Comprehensive reporting and analytics",
      "Secure data encryption and privacy compliance",
      "Multi-department coordination capabilities"
    ],
    links: {
      demo: "#", // Add actual demo link
      github: "#", // Add if available
    },
  },

  {
    id: 5,
    title: "Agenda do Governador - Government Event Management",
    description:
      "Specialized platform for government officials to manage public events, meetings, and schedules. Features include real-time calendar synchronization, public announcement systems, media coordination tools, and comprehensive event documentation for transparency and public access.",
    image: "/images/projects/agenda-governador.svg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Real-time Database", "Notification System"],
    category: "Government Software",
    status: "Completed",
    year: "2024",
    features: [
      "Real-time calendar management",
      "Public event announcement system",
      "Media coordination tools",
      "Transparency and public access features",
      "Comprehensive event documentation",
      "Automated notification system",
      "Multi-user access with role-based permissions",
      "Analytics for public engagement metrics"
    ],
    links: {
      demo: "#", // Add actual demo link
      github: "#", // Add if available
    },
  },
  {
    id: 6,
    title: "Quartzo Engenharia Civil - Construction Management",
    description:
      "Complete project management solution for civil engineering companies, featuring project tracking, resource management, timeline coordination, budget monitoring, and client communication tools. Designed to streamline construction workflows and enhance project delivery efficiency.",
    image: "/images/projects/quartzo-engenharia.svg",
    technologies: ["Vue.js", "JavaScript", "CSS3", "Project Management", "Database"],
    category: "Construction Software",
    status: "Completed",
    year: "2024",
    features: [
      "Project timeline and milestone tracking",
      "Resource allocation and management",
      "Budget monitoring and financial reports",
      "Client communication portal",
      "Document management system",
      "Team collaboration tools",
      "Quality control and inspection tracking",
      "Real-time project status updates"
    ],
    links: {
      demo: "#", // Add actual demo link
      github: "#", // Add if available
    },
  },
  {
    id: 7,
    title: "Citizen Services Platform",
    description:
      "Digital platform for citizens to access government services online with document management and appointment scheduling.",
    image: "/images/projects/citizen-services.svg",
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
    id: 9,
    title: "Internal Management System",
    description:
      "Comprehensive internal management system for government employees with workflow automation and reporting.",
    image: "/images/projects/management-system.svg",
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
    id: 10,
    title: "Digital Forms Builder",
    description:
      "Dynamic form builder for creating government forms with validation, conditional logic, and data export capabilities.",
    image: "/images/projects/forms-builder.svg",
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
    id: 11,
    title: "Personal Portfolio Website",
    description:
      "Modern portfolio website showcasing projects and skills with gamification elements and smooth animations.",
    image: "/images/projects/portfolio.svg",
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
  { name: "Healthcare", value: "Healthcare Software", color: "#10B981" },
  { name: "Education", value: "Educational Technology", color: "#8B5CF6" },
  { name: "Government", value: "Government Software", color: "#6366F1" },
  { name: "Construction", value: "Construction Software", color: "#F59E0B" },
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
