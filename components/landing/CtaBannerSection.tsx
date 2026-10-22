'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 border border-indigo-700/40 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          {/* Background Ambient Glow Elements */}
          <div
            className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 w-80 h-80 bg-sky-500/20 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Mulai Bangun Karir Impian Anda Hari Ini</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Tingkatkan Peluang Wawancara Kerja dengan Format ATS Presisi
            </h2>

            <p className="text-sm sm:text-base text-indigo-200/90 max-w-2xl mx-auto leading-relaxed">
              Jangan biarkan kualifikasi hebat Anda gugur hanya karena format CV yang tidak terbaca mesin rekrutmen. Coba Resume Flow sekarang tanpa perlu registrasi akun.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder"
                id="cta-banner-button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-100 shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Buka Editor Resume Gratis</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </Link>
            </div>

            {/* Micro guarantees */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-indigo-200/75">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                100% Gratis Selamanya
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Tanpa Watermark Apapun
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Data Aman di Browser Anda
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
