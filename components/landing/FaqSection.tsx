'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa itu ATS (Applicant Tracking System) dan mengapa CV saya harus ATS-Friendly?',
      a: 'ATS adalah perangkat lunak otomatis (seperti Workday, Taleo, Greenhouse, Lever, dan SAP SuccessFactors) yang digunakan perusahaan untuk menyaring dan memfilter ribuan pelamar. Jika format CV Anda menggunakan grafis rumit, teks gambar, atau tabel bertingkat, sistem ATS akan gagal mengekstrak data Anda dan otomatis mengeliminasi lamaran Anda sebelum sempat dilihat oleh HRD.',
    },
    {
      q: 'Mengapa CV dari Canva atau aplikasi grafis kerap ditolak sistem ATS?',
      a: 'Aplikasi desain grafis umumnya mengekspor PDF sebagai gambar rata (flattened raster image) atau menggunakan struktur kolom ganda yang membaca teks secara melintang bukan berurutan. Selain itu, rating skill berupa bintang atau bar kemahiran tidak dapat diterjemahkan menjadi kata kunci teks oleh parser ATS.',
    },
    {
      q: 'Apakah Resume Flow benar-benar 100% gratis tanpa watermark atau batasan unduh?',
      a: 'Benar, 100% gratis selamanya! Tidak ada watermark tersembunyi, tidak ada batasan jumlah ekspor PDF, dan Anda tidak perlu memasukkan kartu kredit maupun mendaftar akun.',
    },
    {
      q: 'Apakah data pribadi atau riwayat karir saya disimpan di server?',
      a: 'Tidak sama sekali. Resume Flow dirancang dengan arsitektur privasi zero-backend. Seluruh informasi disimpan langsung di localStorage peramban Anda. Data pribadi Anda tidak pernah dikirimkan atau disimpan di server mana pun.',
    },
    {
      q: 'Bagaimana cara memastikan resume saya muat pas dalam 1 halaman?',
      a: 'Di tab "Desain & Format", Anda dapat mengubah kerapatan spasi (Compact / Normal / Spacious) dan skala ukuran font (Small / Medium / Large). Pengaturan ini dirancang agar Anda dapat mengoptimalkan ruang secara presisi agar seluruh riwayat karir pas dalam 1 lembar.',
    },
    {
      q: 'Bagaimana jika saya ingin melanjutkan edit resume di laptop lain?',
      a: 'Anda cukup mengklik tombol "Cadangan" (Backup JSON) di navigasi untuk mengunduh data resume dalam format .json. Di laptop baru, buka Resume Flow dan pilih "Pulihkan dari JSON" untuk melanjutkan pengeditan tanpa kehilangan data apa pun.',
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-zinc-50/70 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Hal-hal penting yang perlu Anda ketahui mengenai standar ATS dan Resume Flow.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
