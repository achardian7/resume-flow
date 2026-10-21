"use client";

import React, { useState } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Sliders,
  Palette,
  Eye,
  Edit3,
  Loader2,
} from "lucide-react";
import { useResumeData } from "@/hooks/useResumeData";
import { analyzeAtsScore } from "@/utils/atsChecker";
import { Navbar } from "@/components/layout/Navbar";
import { PersonalInfoForm } from "@/components/editor/PersonalInfoForm";
import { ExperienceForm } from "@/components/editor/ExperienceForm";
import { EducationForm } from "@/components/editor/EducationForm";
import { SkillsForm } from "@/components/editor/SkillsForm";
import { ProjectsForm } from "@/components/editor/ProjectsForm";
import { CertificationsForm } from "@/components/editor/CertificationsForm";
import { SectionManager } from "@/components/editor/SectionManager";
import { StyleSettingsForm } from "@/components/editor/StyleSettingsForm";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { ResetConfirmModal } from "@/components/modals/ResetConfirmModal";
import { ImportExportModal } from "@/components/modals/ImportExportModal";
import { AtsScoreModal } from "@/components/modals/AtsScoreModal";

type TabType =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "sections"
  | "settings";

export default function Home() {
  const {
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
  } = useResumeData();

  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  // Modal States
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isImportExportModalOpen, setIsImportExportModalOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);

  // ATS Score Analysis
  const atsAudit = analyzeAtsScore(resumeData);

  const tabs: {
    id: TabType;
    label: string;
    icon: React.FC<{ className?: string }>;
    count?: number;
  }[] = [
    { id: "personal", label: "Profil & Kontak", icon: User },
    {
      id: "experience",
      label: "Pengalaman",
      icon: Briefcase,
      count: resumeData.experiences.length,
    },
    {
      id: "education",
      label: "Pendidikan",
      icon: GraduationCap,
      count: resumeData.education.length,
    },
    {
      id: "skills",
      label: "Keahlian",
      icon: Wrench,
      count: resumeData.skills.reduce((a, c) => a + c.skills.length, 0),
    },
    {
      id: "projects",
      label: "Proyek",
      icon: FolderGit2,
      count: resumeData.projects.length,
    },
    {
      id: "certifications",
      label: "Sertifikasi",
      icon: Award,
      count: resumeData.certifications.length,
    },
    { id: "sections", label: "Urutan Section", icon: Sliders },
    { id: "settings", label: "Desain & Format", icon: Palette },
  ];

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-medium">Memuat data ATS Resume Builder...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Top Navigation */}
      <Navbar
        data={resumeData}
        atsAudit={atsAudit}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onOpenImportExportModal={() => setIsImportExportModalOpen(true)}
        onOpenAtsModal={() => setIsAtsModalOpen(true)}
        onLoadSample={loadSampleData}
      />

      {/* Mobile Toggle Tabs (Visible only on screens < lg) */}
      <div className="lg:hidden sticky top-16 z-20 bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200 dark:border-zinc-800 p-2 backdrop-blur-xs flex gap-2">
        <button
          onClick={() => setMobileView("editor")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
            mobileView === "editor"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Resume Form
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-xl transition-all ${
            mobileView === "preview"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview ({atsAudit.score}%)
        </button>
      </div>

      {/* Main Workspace: Split Screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Form Editor */}
        <div
          className={`lg:col-span-6 xl:col-span-6 space-y-4 ${
            mobileView === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Editor Horizontal Navigation Tabs */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-2xs">
            <div className="flex overflow-x-auto no-scrollbar gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {typeof tab.count === "number" && tab.count > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive
                            ? "bg-white/25 text-white"
                            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content Card */}
          <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xs">
            {activeTab === "personal" && (
              <PersonalInfoForm
                personalInfo={resumeData.personalInfo}
                onChange={updatePersonalInfo}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceForm
                experiences={resumeData.experiences}
                onAdd={addExperience}
                onUpdate={updateExperience}
                onDelete={deleteExperience}
              />
            )}

            {activeTab === "education" && (
              <EducationForm
                education={resumeData.education}
                onAdd={addEducation}
                onUpdate={updateEducation}
                onDelete={deleteEducation}
              />
            )}

            {activeTab === "skills" && (
              <SkillsForm
                skills={resumeData.skills}
                onAddCategory={addSkillCategory}
                onUpdateCategory={updateSkillCategory}
                onDeleteCategory={deleteSkillCategory}
                onAddSkill={addSkillToCategory}
                onRemoveSkill={removeSkillFromCategory}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsForm
                projects={resumeData.projects}
                onAdd={addProject}
                onUpdate={updateProject}
                onDelete={deleteProject}
              />
            )}

            {activeTab === "certifications" && (
              <CertificationsForm
                certifications={resumeData.certifications}
                onAdd={addCertification}
                onUpdate={updateCertification}
                onDelete={deleteCertification}
              />
            )}

            {activeTab === "sections" && (
              <SectionManager
                sections={resumeData.sections}
                onUpdateTitle={updateSectionTitle}
                onToggleVisibility={toggleSectionVisibility}
                onMoveSection={moveSection}
                onReorderSections={reorderSections}
              />
            )}

            {activeTab === "settings" && (
              <StyleSettingsForm
                settings={resumeData.settings}
                onChange={updateSettings}
              />
            )}
          </div>
        </div>

        {/* Right Side: Sticky Live Preview */}
        <div
          className={`lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] ${
            mobileView === "editor" ? "hidden lg:block" : "block"
          }`}
        >
          <ResumePreview
            data={resumeData}
            atsAudit={atsAudit}
            onOpenAtsModal={() => setIsAtsModalOpen(true)}
          />
        </div>
      </main>

      {/* Modals */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetToEmpty}
      />

      <ImportExportModal
        isOpen={isImportExportModalOpen}
        onClose={() => setIsImportExportModalOpen(false)}
        data={resumeData}
        onImport={importDataJSON}
        onExport={exportDataJSON}
      />

      <AtsScoreModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        audit={atsAudit}
      />
    </div>
  );
}
