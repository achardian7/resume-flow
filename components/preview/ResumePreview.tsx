'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Printer, ShieldCheck } from 'lucide-react';
import { ResumeData, SectionType } from '@/types/resume';
import { AtsAuditResult } from '@/utils/atsChecker';

interface ResumePreviewProps {
  data: ResumeData;
  atsAudit: AtsAuditResult;
  onOpenAtsModal: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  atsAudit,
  onOpenAtsModal,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const { personalInfo, experiences, education, skills, projects, certifications, sections, settings } = data;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 60));
  const handleZoomReset = () => setZoomLevel(100);

  const handlePrint = () => {
    window.print();
  };

  // Font family mapping to CSS
  const fontClass =
    settings.fontFamily === 'Times-Roman'
      ? 'font-serif'
      : settings.fontFamily === 'Courier'
      ? 'font-mono'
      : 'font-sans';

  // Base font size mapping
  const textSizeClass =
    settings.fontSize === 'small'
      ? 'text-[11px] leading-[1.35]'
      : settings.fontSize === 'large'
      ? 'text-[13px] leading-[1.55]'
      : 'text-[12px] leading-[1.45]';

  const headingSizeClass =
    settings.fontSize === 'small'
      ? 'text-[13px]'
      : settings.fontSize === 'large'
      ? 'text-[16px]'
      : 'text-[14px]';

  const nameSizeClass =
    settings.fontSize === 'small'
      ? 'text-xl'
      : settings.fontSize === 'large'
      ? 'text-3xl'
      : 'text-2xl';

  const spacingClass =
    settings.spacing === 'compact'
      ? 'space-y-2 mb-2'
      : settings.spacing === 'spacious'
      ? 'space-y-4 mb-4'
      : 'space-y-3 mb-3';

  const itemSpacingClass =
    settings.spacing === 'compact' ? 'mb-2' : settings.spacing === 'spacious' ? 'mb-3.5' : 'mb-2.5';

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const renderSection = (sectionId: SectionType, customTitle: string) => {
    switch (sectionId) {
      case 'summary':
        if (!personalInfo.summary.trim()) return null;
        return (
          <div key="summary" className={spacingClass}>
            <h4
              className={`font-bold uppercase tracking-wider ${headingSizeClass} pb-1 ${
                settings.showDividers ? 'border-b border-zinc-300' : ''
              }`}
              style={{ color: settings.accentColor }}
            >
              {customTitle}
            </h4>
            <p className="text-zinc-800 text-justify leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        );

      case 'experience':
        if (experiences.length === 0) return null;
        return (
          <div key="experience" className={spacingClass}>
            <h4
              className={`font-bold uppercase tracking-wider ${headingSizeClass} pb-1 ${
                settings.showDividers ? 'border-b border-zinc-300' : ''
              }`}
              style={{ color: settings.accentColor }}
            >
              {customTitle}
            </h4>
            <div className="space-y-2.5">
              {experiences.map((exp) => (
                <div key={exp.id} className={itemSpacingClass}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900">{exp.role}</span>
                    <span className="text-[11px] font-semibold text-zinc-600">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-zinc-700 italic text-[11px]">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc list-outside pl-4 mt-1 space-y-0.5 text-zinc-800">
                      {exp.bullets
                        .filter((b) => b.trim().length > 0)
                        .map((b, bIdx) => (
                          <li key={bIdx} className="text-justify leading-snug">
                            {b}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className={spacingClass}>
            <h4
              className={`font-bold uppercase tracking-wider ${headingSizeClass} pb-1 ${
                settings.showDividers ? 'border-b border-zinc-300' : ''
              }`}
              style={{ color: settings.accentColor }}
            >
              {customTitle}
            </h4>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className={itemSpacingClass}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900">{edu.institution}</span>
                    <span className="text-[11px] font-semibold text-zinc-600">
                      {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-zinc-700 text-[11px]">
                    <span>
                      {edu.degree}
                      {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                      {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                    </span>
                    {edu.location && <span className="italic">{edu.location}</span>}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ul className="list-disc list-outside pl-4 mt-1 space-y-0.5 text-zinc-800 text-[11px]">
                      {edu.highlights
                        .filter((h) => h.trim().length > 0)
                        .map((h, hIdx) => (
                          <li key={hIdx} className="text-justify leading-snug">
                            {h}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className={spacingClass}>
            <h4
              className={`font-bold uppercase tracking-wider ${headingSizeClass} pb-1 ${
                settings.showDividers ? 'border-b border-zinc-300' : ''
              }`}
              style={{ color: settings.accentColor }}
            >
              {customTitle}
            </h4>
            <div className="space-y-1">
              {skills.map((cat) => (
                <div key={cat.id} className="text-[11px] leading-snug">
                  <span className="font-bold text-zinc-900">{cat.name}: </span>
                  <span className="text-zinc-800">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className={spacingClass}>
            <h4
              className={`font-bold uppercase tracking-wider ${headingSizeClass} pb-1 ${
                settings.showDividers ? 'border-b border-zinc-300' : ''
              }`}
              style={{ color: settings.accentColor }}
            >
              {customTitle}
            </h4>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className={itemSpacingClass}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900">{proj.title}</span>
                    <span className="text-[11px] font-semibold text-zinc-600">
                      {proj.startDate}
                      {proj.endDate ? ` – ${proj.endDate}` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11px] text-zinc-700">
                    <span>
                      {proj.role ? `${proj.role} ` : ''}
                      {proj.technologies ? `[${proj.technologies}]` : ''}
                    </span>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-600 underline hover:text-zinc-900"
                      >
                        {proj.link.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                  {proj.bullets && proj.bullets.length > 0 && (
                    <ul className="list-disc list-outside pl-4 mt-1 space-y-0.5 text-zinc-800">
                      {proj.bullets
                        .filter((b) => b.trim().length > 0)
                        .map((b, bIdx) => (
                          <li key={bIdx} className="text-justify leading-snug">
                            {b}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <div key="certifications" className={spacingClass}>
            <h4
              className={`font-bold uppercase tracking-wider ${headingSizeClass} pb-1 ${
                settings.showDividers ? 'border-b border-zinc-300' : ''
              }`}
              style={{ color: settings.accentColor }}
            >
              {customTitle}
            </h4>
            <div className="space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-zinc-900">{cert.name}</span>
                    <span className="text-zinc-600">
                      {cert.issueDate}
                      {cert.expirationDate ? ` – ${cert.expirationDate}` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-700">
                    <span>
                      {cert.issuer}
                      {cert.credentialId ? ` (ID: ${cert.credentialId})` : ''}
                    </span>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-zinc-900"
                      >
                        Verifikasi
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const contactItems: React.ReactNode[] = [];
  if (personalInfo.email) {
    contactItems.push(
      <a key="email" href={`mailto:${personalInfo.email}`} className="hover:underline">
        {personalInfo.email}
      </a>
    );
  }
  if (personalInfo.phone) {
    contactItems.push(<span key="phone">{personalInfo.phone}</span>);
  }
  if (personalInfo.location) {
    contactItems.push(<span key="loc">{personalInfo.location}</span>);
  }
  if (personalInfo.linkedin) {
    contactItems.push(
      <a
        key="linkedin"
        href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {personalInfo.linkedin.replace(/^https?:\/\//, '')}
      </a>
    );
  }
  if (personalInfo.github) {
    contactItems.push(
      <a
        key="github"
        href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {personalInfo.github.replace(/^https?:\/\//, '')}
      </a>
    );
  }
  if (personalInfo.website) {
    contactItems.push(
      <a
        key="web"
        href={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {personalInfo.website.replace(/^https?:\/\//, '')}
      </a>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Live Preview Controls Header */}
      <div className="px-4 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Live Resume Preview
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-semibold">
            Real-time
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1.5">
          {/* ATS Mini Pill */}
          <button
            onClick={onOpenAtsModal}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            title="Lihat skor ATS resume Anda"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            <span className={`font-bold ${atsAudit.color}`}>{atsAudit.score}%</span>
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Perkecil pratinjau"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomReset}
              className="px-2 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Reset zoom ke 100%"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Perbesar pratinjau"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            title="Cetak pratinjau halaman"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Scrollable Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[780px] shrink-0"
        >
          {/* Simulated A4 Page Paper */}
          <div
            id="printable-resume"
            className={`w-full min-h-[1050px] p-8 sm:p-12 bg-white text-zinc-900 shadow-xl rounded-sm border border-zinc-200/80 ${fontClass} ${textSizeClass}`}
          >
            {/* Resume Header */}
            <div
              className={`mb-4 pb-2 ${
                settings.template === 'ats-modern'
                  ? 'text-left border-b-2'
                  : 'text-center'
              }`}
              style={{
                borderColor: settings.template === 'ats-modern' ? settings.accentColor : undefined,
              }}
            >
              <h1
                className={`font-bold tracking-tight uppercase ${nameSizeClass}`}
                style={{ color: settings.accentColor }}
              >
                {personalInfo.fullName || 'NAMA LENGKAP'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-zinc-600 font-medium italic text-sm mt-0.5">
                  {personalInfo.jobTitle}
                </p>
              )}
              <div
                className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-600 mt-2 ${
                  settings.template === 'ats-modern' ? 'justify-start' : 'justify-center'
                }`}
              >
                {contactItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item}
                    {idx < contactItems.length - 1 && <span className="text-zinc-300">|</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Dynamic Sections in User-Specified Order */}
            {sortedSections.map((sec) => {
              if (!sec.isVisible) return null;
              return renderSection(sec.id, sec.customTitle || sec.defaultTitle);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
