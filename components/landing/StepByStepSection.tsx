"use client";

import React from "react";
import {
  FileSignature,
  SlidersHorizontal,
  CheckCircle,
  FileDown,
  Sparkles,
} from "lucide-react";

export const StepByStepSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Isi Data atau Muat Contoh",
      description:
        'Ketik data diri Anda dengan form yang intuitif, atau klik "Contoh Data" untuk mempelajari contoh bullet point berbasis metode STAR (Situation, Task, Action, Result).',
      icon: FileSignature,
      color: "from-indigo-600 to-violet-600",
    },
    {
      step: "02",
      title: "Periksa Skor & Checklist ATS",
      description:
        "Pantau indikator skor ATS secara live. Pastikan kontak lengkap, terdapat metrik angka terukur (%, Rp, $), dan kata kerja aksi tercantum sempurna.",
      icon: CheckCircle,
      color: "from-violet-600 to-sky-500",
    },
    {
      step: "03",
      title: "Pilih Template & Tipografi",
      description:
        "Pilih format Classic, Modern, atau Minimal, lalu sesuaikan font ATS aman (Helvetica, Times, Courier) dan warna aksen sesuai gaya profesional Anda.",
      icon: SlidersHorizontal,
      color: "from-blue-500 to-indigo-600",
    },
    {
      step: "04",
      title: "Unduh PDF Teks Murni",
      description:
        "Ekspor PDF vektor beresolusi tinggi yang 100% dapat dicari (searchable) dan disalin (copyable) oleh bot ATS, siap diunggah ke portal lowongan kerja.",
      icon: FileDown,
      color: "from-sky-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>Alur Pembuatan Simpel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            CV Berkualitas Tinggi Selesai Dalam Hitungan Menit
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Tanpa perlu pusing mengatur margin di Microsoft Word atau tersesat
            di desain grafis yang ditolak ATS.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 shadow-xs flex flex-col justify-between group hover:border-indigo-400/80 transition-all duration-300"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-indigo-500/30 transition-colors">
                      {item.step}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md shadow-indigo-500/20`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
