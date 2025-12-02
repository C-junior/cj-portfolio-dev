// Resume Configuration
// Update your resume information in this file
// All changes here will automatically reflect in your resume PDF and website

export const RESUME_CONFIG = {
  personal: {
    name: {
      full: "Cristovao Rodrigues de Carvalho Junior",
      display: "Cristovao Junior",
    },
    role: "Front-end Developer",
    location: "Tocantins, Brazil",
    photo: "/images/profile-photo.png", // Update with your photo path
    bio: "Passionate front-end developer with 5 years of experience creating modern web applications. Currently pursuing a degree in Systems Analysis and Development while working on innovative government technology solutions.",
    contact: {
      email: "ti.juniorc@gmail.com", // Update your email
      phone: "+55 (63) 9 8108-9718", // Update your phone
      website: "www.cristovaojuniordev.vercel.app", // Update your website
      location: "Tocantins, Brazil" // Update your location
    }
  },
  
  experience: [
    {
      id: 1,
      title: "Front-end Developer", // Update your job title
      company: "Agencia de Tecnologia de Informação do TO (ATI)", // Update company name
      location: "Tocantins, Brazil", // Update location
      period: {
        start: "2019", // Update start year
        end: "Present", // Update end year or keep "Present"
        duration: "5 years", // Update duration
      },
      type: "Full-time", // Update type
      description: "Leading frontend development initiatives and creating modern web applications for government technology solutions.", // Update description
      responsibilities: [
        "Developed and maintained responsive web applications using Vue.js and modern JavaScript", // Update responsibilities
        "Collaborated with design teams to implement pixel-perfect UI/UX designs",
        "Optimized application performance and implemented best practices for code quality",
        "Mentored junior developers and conducted code reviews",
        "Integrated frontend applications with RESTful APIs and backend services",
      ],
      technologies: ["Vue.js", "JavaScript", "HTML/CSS", "Figma", "Git"], // Update technologies
      achievements: [
        "Improved application load times by 40% through optimization techniques", // Update achievements
        "Successfully delivered 15+ projects on time and within budget",
        "Implemented responsive design patterns that improved mobile user experience",
      ],
    },
  ],
  
  education: {
    current: {
      degree: "Technology in Systems Analysis and Development", // Update degree
      degreePortuguese: "Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)", // Update degree in Portuguese
      institution: "UNITINS - Universidade de Tocantins", // Update institution
      status: "In Progress", // Update status
      startYear: "2023", // Update start year
      expectedGraduation: "2025", // Update graduation year
    },
    past: [
      {
        degree: "Technical Course in Computer Science", // Update degree
        degreePortuguese: "Curso Técnico em Informática", // Update degree in Portuguese
        institution: "IFTO - Instituto Federal do Tocantins", // Update institution
        status: "Completed", // Update status
        startYear: "2006", // Update start year
        endYear: "2008", // Update end year
        duration: "2 years", // Update duration
      }
    ]
  },
  
  skills: {
    frontend: [
      { name: "HTML/CSS/JavaScript", years: 5, level: 95 }, // Update skill name, years, and level
      { name: "Vue.js", years: 2.5, level: 90 },
      { name: "React", years: 0.33, level: 60 },
      { name: "jQuery", years: 1, level: 80 },
      { name: "Tailwind CSS", years: 1, level: 85 },
    ],
    design: [
      { name: "Web Design", years: 5, level: 90 }, // Update skill name, years, and level
      { name: "Figma", years: 3, level: 85 },
      { name: "UI Design", years: 4.5, level: 88 },
    ],
    soft: [
      { name: "Problem Solving", years: 5, level: 95 }, // Update skill name, years, and level
      { name: "Team Collaboration", years: 5, level: 90 },
      { name: "Communication", years: 5, level: 85 },
      { name: "Leadership", years: 4, level: 80 },
      { name: "Time Management", years: 5, level: 90 },
      { name: "Adaptability", years: 5, level: 95 },
    ],
  },
  
  languages: [
    { name: "Portuguese", level: "Native" }, // Update language name and level
    { name: "English", level: "Intermediate" },
  ],
  
  awards: [
    {
      title: "1st Place - Desafio Industrial da Fieto", // Update award title
      year: "2025", // Update year
      description: "Champion of the innovation marathon focused on circular economy in civil construction with the 'Sobra na Obra' project." // Update description
    },
    {
      title: "3rd Place - InovaUni Hackathon", // Update award title
      year: "2025", // Update year
      description: "Recognized for innovative solutions and technical excellence in university innovation competition." // Update description
    },
    {
      title: "1st Place - Startup Weekend Sebrae", // Update award title
      year: "2018", // Update year
      description: "Won first place in entrepreneurship competition, demonstrating business acumen and innovation." // Update description
    }
  ]
};