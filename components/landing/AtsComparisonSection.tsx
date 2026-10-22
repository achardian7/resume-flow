'use client';

import React from 'react';
import Link from 'next/link';
import {
  XCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Cpu,
} from 'lucide-react';

export const AtsComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="py-20 sm:py-28 bg-zinc-50/60 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Fakta Nyata Screening Rekrutmen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Mengapa CV Desain Grafis / Canva Kerap Gagal di ATS?
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Perusahaan menengah hingga multinasional menggunakan sistem ATS untuk menyaring ratusan pelamar. Inilah perbedaan mendasar format resume Anda:
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Bad / Canva Card */}
          <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-red-200/70 dark:border-red-950/60 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400">
                    <TrendingDown className="w-3.5 h-3.5" />
                    CV Desain Grafis (Canva / Illustrator)
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                    Menarik di Mata, Namun Buta di Mata Bot ATS
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center text-red-500 shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Problems List */}
              <ul className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Teks Terkunci Sebagai Gambar (Raster PDF):</strong>
                    Banyak alat grafis mengekspor PDF sebagai gambar datar sehingga bot parser membaca dokumen kosong tanpa kata kunci.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Bar Kemampuan / Bintang Ikonis:</strong>
                    Ikon seperti "Skill Python: ★★★★☆" tidak memiliki arti bagi parser cerdas dan hanya membuang ruang penting.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Tata Letak Kolom Ganda Acak:</strong>
                    Parser membaca kiri-ke-kanan secara horizontal. Akibatnya, kalimat di kolom kiri tercampur aduk dengan teks kolom kanan.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Header Kustom Non-Standar:</strong>
                    Judul seksi seperti "My Journey" atau "Things I Love" gagal diidentifikasi sebagai Work Experience oleh ATS.
                  </div>
                </li>
              </ul>
            </div>

            {/* Bottom Stat */}
            <div className="mt-8 pt-4 border-t border-red-100 dark:border-red-950/50 flex items-center justify-between text-xs font-semibold text-red-600 dark:text-red-400">
              <span>Risiko Eliminasi Otomatis:</span>
              <span className="text-base font-black">&gt; 75% Ditolak</span>
            </div>
          </div>

          {/* Good / Resume Flow Card */}
          <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border-2 border-indigo-500/70 dark:border-indigo-500/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md">
              Direkomendasikan Recruiter Global
            </div>

            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Resume Flow (Standar ATS Internasional)
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                    100% Terbaca & Lolos ke Meja HRD
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>

              {/* Solution List */}
              <ul className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">PDF Vektor Berbasis Teks Asli (Selectable):</strong>
                    Dihasilkan secara native sehingga setiap kata, tanggal, dan alamat email dapat disalin dan diindeks sempurna oleh mesin ATS.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Kategori Skill Terstruktur:</strong>
                    Keahlian dikelompokkan secara logis (Languages, Frameworks, Tools) mempermudah pencocokan keyword otomatis dengan kualifikasi lowongan.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Alur Baca Linier & Hierarki Heading Baku:</strong>
                    Menggunakan heading standar (Work Experience, Education, Skills, Projects) yang dikenali semua sistem ATS dunia.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 dark:text-zinc-200 block">Audit Skor ATS Real-Time:</strong>
                    Sistem otomatis mengecek keberadaan metrik terukur (%, Rp, $) dan kata kerja aksi sebelum Anda mengunduh dokumen.
                  </div>
                </li>
              </ul>
            </div>

            {/* Bottom Stat & Link */}
            <div className="mt-8 pt-4 border-t border-indigo-100 dark:border-indigo-950/50 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Tingkat Keterbacaan Mesin:</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">100% Machine-Readable</span>
            </div>
          </div>
        </div>

        {/* CTA Banner under comparison */}
        <div className="mt-12 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:gap-3"
          >
            <span>Ubah Format CV Anda ke Standar ATS Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
