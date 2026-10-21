export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  name: string; // e.g., "Languages", "Frameworks & Libraries", "Tools & Platforms", "Soft Skills"
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  technologies: string;
  link: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  credentialId: string;
  url: string;
}

export type SectionType =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications';

export interface SectionConfig {
  id: SectionType;
  defaultTitle: string;
  customTitle: string;
  isVisible: boolean;
  order: number;
}

export type FontFamily = 'Helvetica' | 'Times-Roman' | 'Courier';
export type FontSizeScale = 'small' | 'medium' | 'large';
export type SpacingScale = 'compact' | 'normal' | 'spacious';
export type TemplateLayout = 'ats-classic' | 'ats-modern' | 'ats-minimal';

export interface ResumeSettings {
  template: TemplateLayout;
  fontFamily: FontFamily;
  fontSize: FontSizeScale;
  spacing: SpacingScale;
  showDividers: boolean;
  accentColor: string; // ATS standard subtle accents: '#111827', '#1e3a8a', '#0f766e', '#374151'
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  sections: SectionConfig[];
  settings: ResumeSettings;
}
