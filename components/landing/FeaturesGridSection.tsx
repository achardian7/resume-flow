'use client';

import React from 'react';
import {
  ShieldCheck,
  FileText,
  Sliders,
  Move,
  Lock,
  Download,
  Sparkles,
  Layers,
  CheckCircle,
  Eye,
} from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      badge: 'Audit Real-Time',
      color: 'indigo',
      title: 'Skor ATS Cerdas 0–100',
      description:
        'Cek kekuatan resume sebelum melamar. Sistem memverifikasi kata kerja aksi (STAR), metrik hasil (angka/persen), kejelasan kontak, dan rasio panjang teks secara otomatis.',
    },
    {
      icon: FileText,
      badge: 'Bukan Raster Image',
      color: 'sky',
      title: 'Ekspor PDF Teks Murni',
      description:
        'Dibuat dengan engine vektor modern. Setiap kata dapat diseleksi, dicari dengan Ctrl+F, dan dibaca dengan akurasi 100% oleh parser Workday, Taleo, Greenhouse, & Lever.',
    },
    {
      icon: Sliders,
      badge: 'Presisi Kerapatan',
      color: 'emerald',
      title: 'Kontrol Pas 1 Halaman',
      description:
        'Atur skala font (Small/Medium/Large) dan kerapatan vertikal (Compact/Normal/Spacious) dengan satu klik agar resume tertata rapi persis dalam 1 lembar standar.',
    },
    {
      icon: Move,
      badge: 'Kustomisasi Penuh',
      color: 'purple',
      title: 'Atur Urutan & Nama Section',
      description:
        'Pindahkan seksi Pendidikan ke atas untuk Fresh Graduate, atau prioritaskan Pengalaman & Proyek untuk Profesional. Ubah judul seksi dan sembunyikan yang tidak perlu.',
    },
    {
      icon: Lock,
      badge: 'Zero Database',
      color: 'amber',
      title: '100% Privasi & Tanpa Login',
      description:
        'Data Anda adalah hak Anda. Seluruh isian CV disimpan secara eksklusif di localStorage peramban Anda. Tanpa pendaftaran akun, tanpa pelacak, dan tanpa iklan.',
    },
    {
      icon: Download,
      badge: 'Portabilitas Cepat',
      color: 'rose',
      title: 'Backup & Restore JSON',
      description:
        'Ekspor konfigurasi resume Anda ke file JSON dalam 1 detik. Pulihkan kapan saja atau buat berbagai versi resume berbeda untuk berbagai macam lamaran kerja.',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Fitur Unggulan Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Dirancang Khusus untuk Memaksimalkan Peluang Panggilan Wawancara
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Setiap fitur di Resume Flow dioptimalkan mengikuti pedoman rekrutmen perusahaan Fortune 500 dan standar format Applicant Tracking System.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-7 shadow-xs hover:shadow-xl hover:border-indigo-300/80 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {feat.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
