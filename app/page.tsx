import React from "react";
import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AtsComparisonSection } from "@/components/landing/AtsComparisonSection";
import { FeaturesGridSection } from "@/components/landing/FeaturesGridSection";
import { StepByStepSection } from "@/components/landing/StepByStepSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { CtaBannerSection } from "@/components/landing/CtaBannerSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Resume Flow - Pembuat CV ATS-Friendly Modern & Gratis",
  description:
    "Aplikasi pembuat resume berstandar Applicant Tracking System (ATS) dengan ekspor PDF berbasis teks murni, audit skor ATS real-time, dan template teruji yang disukai HRD.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <LandingNavbar />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <AtsComparisonSection />
        <FeaturesGridSection />
        <StepByStepSection />
        <FaqSection />
        <CtaBannerSection />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
