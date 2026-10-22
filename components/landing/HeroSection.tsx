"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileCheck2,
  Zap,
  Lock,
  Download,
  Flame,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-screen overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-indigo-500/20 via-sky-400/20 to-purple-500/15 blur-3xl pointer-events-none -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-10 w-72 h-72 bg-sky-400/10 blur-2xl pointer-events-none -z-10 rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 blur-2xl pointer-events-none -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Header Container */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-xs hover:border-indigo-300 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>100% Gratis • Tanpa Login • Tanpa Watermark</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.12]">
            Buat CV Standar ATS yang{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
              Lolos Screening HRD
            </span>{" "}
            & Perusahaan Impian
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Lebih dari{" "}
            <strong className="text-zinc-900 dark:text-zinc-200">
              75% CV langsung gugur
            </strong>{" "}
            oleh software ATS (Workday, Taleo, Greenhouse) karena tabel rumit,
            ikon grafis, dan teks gambar. Resume Flow menghasilkan{" "}
            <strong className="text-zinc-900 dark:text-zinc-200">
              PDF teks murni berbasis vektor
            </strong>{" "}
            dengan audit skor ATS real-time dan template teruji.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/builder"
              id="hero-cta-primary"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 cursor-pointer"
            >
              <span>Mulai Buat Resume Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Badges Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xs">
              <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  100% Teks Murni
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  PDF Layer Asli
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Audit Skor ATS
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Feedback Real-Time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xs">
              <Lock className="w-4 h-4 text-sky-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  100% Privat
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Tanpa Simpan Server
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xs">
              <Download className="w-4 h-4 text-purple-500 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  1 Halaman Presisi
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Skala Fleksibel
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
