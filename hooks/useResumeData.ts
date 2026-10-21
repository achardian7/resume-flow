'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ResumeData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  SectionType,
  SectionConfig,
  ResumeSettings,
} from '@/types/resume';
import { sampleResume, initialEmptyResume, defaultSections, defaultSettings } from '@/data/sampleResume';

const STORAGE_KEY = 'ats_resume_data_v1';

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResume);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage on client-side mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure sections array exists and has all current sections
        if (parsed && typeof parsed === 'object') {
          const mergedSections: SectionConfig[] = defaultSections.map((defSec) => {
            const existing = parsed.sections?.find((s: SectionConfig) => s.id === defSec.id);
            return existing ? { ...defSec, ...existing } : defSec;
          });
          // Sort sections by order
          mergedSections.sort((a, b) => a.order - b.order);

          // Clean up ghost sample highlights if the user modified the sample institution
          const cleanedEducation = Array.isArray(parsed.education)
            ? parsed.education.map((edu: EducationItem) => {
                if (
                  edu.institution !== 'Institut Teknologi Bandung (ITB)' &&
                  Array.isArray(edu.highlights) &&
                  edu.highlights.includes('Graduated with Cum Laude honors')
                ) {
                  return {
                    ...edu,
                    highlights: edu.highlights.filter(
                      (h) =>
                        h !== 'Graduated with Cum Laude honors' &&
                        h !== 'Lead Organizer of National Informatics Hackathon 2016'
                    ),
                  };
                }
                return edu;
              })
            : parsed.education;

          queueMicrotask(() => {
            setResumeData({
              ...parsed,
              education: cleanedEducation || [],
              sections: mergedSections,
              settings: { ...sampleResume.settings, ...(parsed.settings || {}) },
            });
            setIsHydrated(true);
          });
          return;
        }
      }
    } catch (err) {
      console.error('Failed to load resume data from localStorage:', err);
    }
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  // Sync to localStorage whenever resumeData changes, after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (err) {
      console.error('Failed to save resume data to localStorage:', err);
    }
  }, [resumeData, isHydrated]);

  // Personal info updater
  const updatePersonalInfo = useCallback((fields: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...fields },
    }));
  }, []);

  // Experience handlers
  const addExperience = useCallback(() => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: 'Nama Perusahaan Baru',
      role: 'Posisi / Jabatan',
      location: 'Kota, Negara',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Meningkatkan efisiensi sistem sebesar 20% dengan mengoptimalkan alur kerja backend.',
        'Memimpin tim beranggotakan 4 orang dalam menyelesaikan modul utama tepat waktu.',
      ],
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [newItem, ...prev.experiences],
    }));
  }, []);

  const updateExperience = useCallback((id: string, fields: Partial<ExperienceItem>) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...fields } : exp
      ),
    }));
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  }, []);

  // Education handlers
  const addEducation = useCallback(() => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'Universitas / Institusi',
      degree: 'Sarjana (S1)',
      fieldOfStudy: 'Jurusan / Program Studi',
      location: 'Kota, Negara',
      startDate: '2019-08',
      endDate: '2023-07',
      isCurrent: false,
      gpa: '3.75 / 4.00',
      highlights: [],
    };
    setResumeData((prev) => ({
      ...prev,
      education: [newItem, ...prev.education],
    }));
  }, []);

  const updateEducation = useCallback((id: string, fields: Partial<EducationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...fields } : edu
      ),
    }));
  }, []);

  const deleteEducation = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  // Skills handlers
  const addSkillCategory = useCallback(() => {
    const newCategory: SkillCategory = {
      id: `skill-${Date.now()}`,
      name: 'Kategori Keahlian Baru',
      skills: ['Skill A', 'Skill B'],
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newCategory],
    }));
  }, []);

  const updateSkillCategory = useCallback((id: string, name: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) => (cat.id === id ? { ...cat, name } : cat)),
    }));
  }, []);

  const deleteSkillCategory = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((cat) => cat.id !== id),
    }));
  }, []);

  const addSkillToCategory = useCallback((categoryId: string, skill: string) => {
    if (!skill.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) =>
        cat.id === categoryId && !cat.skills.includes(skill.trim())
          ? { ...cat, skills: [...cat.skills, skill.trim()] }
          : cat
      ),
    }));
  }, []);

  const removeSkillFromCategory = useCallback((categoryId: string, skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((s) => s !== skillToRemove) }
          : cat
      ),
    }));
  }, []);

  // Projects handlers
  const addProject = useCallback(() => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'Nama Proyek Unggulan',
      role: 'Lead Developer',
      technologies: 'React, Node.js, PostgreSQL',
      link: 'https://github.com/username/project',
      startDate: '2023-01',
      endDate: '2023-06',
      bullets: [
        'Mengembangkan aplikasi full-stack dengan 5,000+ pengguna aktif bulanan.',
        'Menerapkan arsitektur caching yang menurunkan waktu pemuatan hingga 40%.',
      ],
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [newItem, ...prev.projects],
    }));
  }, []);

  const updateProject = useCallback((id: string, fields: Partial<ProjectItem>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...fields } : proj
      ),
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  }, []);

  // Certifications handlers
  const addCertification = useCallback(() => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'Nama Sertifikasi Profesional',
      issuer: 'Lembaga Penerbit / Organisasi',
      issueDate: '2023-05',
      expirationDate: '2026-05',
      credentialId: 'CERT-12345',
      url: 'https://credential-url.com',
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [newItem, ...prev.certifications],
    }));
  }, []);

  const updateCertification = useCallback((id: string, fields: Partial<CertificationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...fields } : cert
      ),
    }));
  }, []);

  const deleteCertification = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  }, []);

  // Section Customization Handlers
  const updateSectionTitle = useCallback((sectionId: SectionType, customTitle: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, customTitle } : sec
      ),
    }));
  }, []);

  const toggleSectionVisibility = useCallback((sectionId: SectionType) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
      ),
    }));
  }, []);

  const moveSection = useCallback((sectionId: SectionType, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const sorted = [...prev.sections].sort((a, b) => a.order - b.order);
      const currentIndex = sorted.findIndex((s) => s.id === sectionId);
      if (currentIndex === -1) return prev;

      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;

      // Swap orders
      const temp = sorted[currentIndex].order;
      sorted[currentIndex].order = sorted[targetIndex].order;
      sorted[targetIndex].order = temp;

      sorted.sort((a, b) => a.order - b.order);
      return { ...prev, sections: sorted };
    });
  }, []);

  const reorderSections = useCallback((newOrderedIds: SectionType[]) => {
    setResumeData((prev) => {
      const updated = prev.sections.map((sec) => {
        const newIndex = newOrderedIds.indexOf(sec.id);
        return newIndex !== -1 ? { ...sec, order: newIndex } : sec;
      });
      updated.sort((a, b) => a.order - b.order);
      return { ...prev, sections: updated };
    });
  }, []);

  // Theme Settings updater
  const updateSettings = useCallback((fields: Partial<ResumeSettings>) => {
    setResumeData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...fields },
    }));
  }, []);

  // Reset to initial empty
  const resetToEmpty = useCallback(() => {
    setResumeData(initialEmptyResume);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Load sample data
  const loadSampleData = useCallback(() => {
    setResumeData(sampleResume);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleResume));
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Export JSON file
  const exportDataJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    const fileName = `${resumeData.personalInfo.fullName.trim().replace(/\s+/g, '_') || 'resume'}_data.json`;
    downloadAnchor.setAttribute('download', fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [resumeData]);

  // Import JSON file
  const importDataJSON = useCallback((jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
        setResumeData({
          ...sampleResume,
          ...parsed,
          sections: parsed.sections || defaultSections,
          settings: { ...defaultSettings, ...(parsed.settings || {}) },
        });
        return { success: true };
      }
      return { success: false, error: 'Format JSON resume tidak valid.' };
    } catch {
      return { success: false, error: 'Gagal membaca file JSON.' };
    }
  }, []);

  return {
    resumeData,
    isHydrated,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    updateSectionTitle,
    toggleSectionVisibility,
    moveSection,
    reorderSections,
    updateSettings,
    resetToEmpty,
    loadSampleData,
    exportDataJSON,
    importDataJSON,
  };
}
