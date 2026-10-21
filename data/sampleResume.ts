import { ResumeData, SectionConfig, ResumeSettings } from '@/types/resume';

export const defaultSections: SectionConfig[] = [
  { id: 'summary', defaultTitle: 'Professional Summary', customTitle: 'Professional Summary', isVisible: true, order: 0 },
  { id: 'experience', defaultTitle: 'Work Experience', customTitle: 'Work Experience', isVisible: true, order: 1 },
  { id: 'education', defaultTitle: 'Education', customTitle: 'Education', isVisible: true, order: 2 },
  { id: 'skills', defaultTitle: 'Skills & Competencies', customTitle: 'Skills & Competencies', isVisible: true, order: 3 },
  { id: 'projects', defaultTitle: 'Key Projects', customTitle: 'Key Projects', isVisible: true, order: 4 },
  { id: 'certifications', defaultTitle: 'Certifications', customTitle: 'Certifications', isVisible: true, order: 5 },
];

export const defaultSettings: ResumeSettings = {
  template: 'ats-classic',
  fontFamily: 'Helvetica',
  fontSize: 'medium',
  spacing: 'normal',
  showDividers: true,
  accentColor: '#111827',
};

export const sampleResume: ResumeData = {
  personalInfo: {
    fullName: 'Alex Pratama, S.Kom',
    jobTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.pratama@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    website: 'https://alexpratama.dev',
    linkedin: 'linkedin.com/in/alexpratama',
    github: 'github.com/alexpratama',
    summary:
      'Results-driven Senior Software Engineer with 6+ years of experience architecting and delivering high-concurrency web platforms and microservices. Expert in TypeScript, React, Next.js, Node.js, and cloud deployments (AWS/GCP). Successfully increased system throughput by 42% and mentored 12+ junior engineers in agile best practices.',
  },
  experiences: [
    {
      id: 'exp-1',
      company: 'Tokopedia (GoTo Group)',
      role: 'Lead Full Stack Engineer',
      location: 'Jakarta, Indonesia',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Architected high-throughput checkout microservice using Next.js, Node.js, and Redis, handling over 150,000 requests per minute during major shopping festivals.',
        'Reduced p95 API response latency from 480ms to 135ms by implementing server-side caching and database query indexing in PostgreSQL.',
        'Spearheaded the migration of legacy monolith frontend to Next.js App Router, boosting Core Web Vitals score by 35% and conversion rates by 8.4%.',
        'Led a cross-functional team of 9 engineers; established automated CI/CD testing pipelines that reduced deployment rollback rates by 60%.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Bukalapak',
      role: 'Senior Software Engineer',
      location: 'Jakarta, Indonesia',
      startDate: '2019-08',
      endDate: '2022-02',
      isCurrent: false,
      bullets: [
        'Engineered dynamic merchant analytics dashboard utilized by 200,000+ active sellers daily, featuring real-time telemetry and export capabilities.',
        'Implemented end-to-end payment gateway integrations with QRIS, GoPay, and Virtual Accounts with 99.98% successful transaction reliability.',
        'Optimized frontend bundle size by 45% via code splitting, asset preloading, and dynamic module loading.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Digital Alpha Labs',
      role: 'Software Engineer',
      location: 'Bandung, Indonesia',
      startDate: '2018-01',
      endDate: '2019-07',
      isCurrent: false,
      bullets: [
        'Developed responsive SPA web applications using React and Tailwind CSS for international fintech clients.',
        'Collaborated closely with UX designers and product managers in 2-week agile sprint cycles, delivering 14 product releases on schedule.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Institut Teknologi Bandung (ITB)',
      degree: 'Sarjana Komputer (B.S.)',
      fieldOfStudy: 'Computer Science & Software Engineering',
      location: 'Bandung, Indonesia',
      startDate: '2013-08',
      endDate: '2017-07',
      isCurrent: false,
      gpa: '3.82 / 4.00',
      highlights: [],
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Programming Languages',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'Go (Golang)', 'Python', 'SQL'],
    },
    {
      id: 'skill-2',
      name: 'Frameworks & Frontend',
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'Redux / Zustand'],
    },
    {
      id: 'skill-3',
      name: 'Databases & Infrastructure',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS (ECS, S3, RDS)', 'Git / GitHub Actions'],
    },
    {
      id: 'skill-4',
      name: 'Methodologies & Core Competencies',
      skills: ['Microservices Architecture', 'System Design', 'CI/CD Pipelines', 'REST & GraphQL APIs', 'Agile / Scrum Leadership'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'CloudScale - Distributed Task Queue Platform',
      role: 'Creator & Maintainer',
      technologies: 'Go, Redis, Next.js, Docker',
      link: 'https://github.com/alexpratama/cloudscale',
      startDate: '2023-01',
      endDate: '2023-09',
      bullets: [
        'Built an open-source distributed job queue processing 50,000+ jobs/sec with exponential backoff and dead-letter queueing.',
        'Garnered over 850 GitHub stars and adopted by 15+ tech startups for background batch processing.',
      ],
    },
    {
      id: 'proj-2',
      title: 'PaySwift - Multi-Provider Payment SDK',
      role: 'Lead Developer',
      technologies: 'TypeScript, Node.js, Jest',
      link: 'https://github.com/alexpratama/payswift',
      startDate: '2022-05',
      endDate: '2022-11',
      bullets: [
        'Engineered unified TypeScript SDK abstracting major Indonesian payment gateways with automatic webhook verification and retry logic.',
        'Achieved 100% test coverage with automated unit and integration test suites.',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2023-04',
      expirationDate: '2026-04',
      credentialId: 'AWS-ASA-9941824',
      url: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'The Linux Foundation / CNCF',
      issueDate: '2022-10',
      expirationDate: '2025-10',
      credentialId: 'CKA-827104',
      url: 'https://www.cncf.io/certification/cka/',
    },
  ],
  sections: defaultSections,
  settings: defaultSettings,
};

export const initialEmptyResume: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [
    {
      id: 'skill-default-1',
      name: 'Core Skills',
      skills: [],
    },
  ],
  projects: [],
  certifications: [],
  sections: defaultSections,
  settings: defaultSettings,
};
