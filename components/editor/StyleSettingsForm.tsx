'use client';

import React from 'react';
import { Palette, Type, LayoutTemplate, ShieldAlert, Check } from 'lucide-react';
import { ResumeSettings, FontFamily, FontSizeScale, SpacingScale, TemplateLayout } from '@/types/resume';

interface StyleSettingsFormProps {
  settings: ResumeSettings;
  onChange: (fields: Partial<ResumeSettings>) => void;
}

export const StyleSettingsForm: React.FC<StyleSettingsFormProps> = ({
  settings,
  onChange,
}) => {
  const templates: { id: TemplateLayout; name: string; desc: string }[] = [
    {
      id: 'ats-classic',
      name: 'ATS Classic (Standard)',
      desc: 'Format header tengah, garis pemisah elegan, 100% kompatibel dengan seluruh parser ATS.',
    },
    {
      id: 'ats-modern',
      name: 'ATS Modern (Clean Left)',
      desc: 'Header rata kiri modern dengan garis aksen tegas, cocok untuk industri teknologi.',
    },
    {
      id: 'ats-minimal',
      name: 'ATS Minimalist',
      desc: 'Desain ultra-sederhana tanpa dekorasi, memaksimalkan kerapatan data dan keterbacaan.',
    },
  ];

  const fonts: { id: FontFamily; name: string; category: string }[] = [
    { id: 'Helvetica', name: 'Helvetica / Arial', category: 'Sans-Serif (Modern & Terbaca Luas)' },
    { id: 'Times-Roman', name: 'Times New Roman', category: 'Serif (Formal & Tradisional)' },
    { id: 'Courier', name: 'Courier', category: 'Monospace (Gaya Tech & Kode)' },
  ];

  const fontSizes: { id: FontSizeScale; name: string; size: string }[] = [
    { id: 'small', name: 'Ringkas (9.5pt)', size: 'Muat lebih banyak data' },
    { id: 'medium', name: 'Standar (10.5pt)', size: 'Rekomendasi terbaik' },
    { id: 'large', name: 'Besar (11.5pt)', size: 'Keterbacaan maksimal' },
  ];

  const spacings: { id: SpacingScale; name: string }[] = [
    { id: 'compact', name: 'Kompak (Hemat Ruang)' },
    { id: 'normal', name: 'Normal (Seimbang)' },
    { id: 'spacious', name: 'Longgar (Lapang)' },
  ];

  const colors = [
    { hex: '#111827', name: 'Charcoal Black' },
    { hex: '#1e3a8a', name: 'Navy Blue' },
    { hex: '#0f766e', name: 'Dark Teal' },
    { hex: '#374151', name: 'Slate Gray' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Format & Tipografi Standar ATS
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Semua konfigurasi di bawah ini telah dikalibrasi agar tetap ramah parser ATS tanpa elemen grafis yang membingungkan.
        </p>
      </div>

      {/* Template Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
          <LayoutTemplate className="w-3.5 h-3.5 text-zinc-400" />
          Pilihan Tata Letak Template
        </label>
        <div className="grid grid-cols-1 gap-2">
          {templates.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => onChange({ template: tmpl.id })}
              className={`text-left p-3 rounded-2xl border transition-all ${
                settings.template === tmpl.id
                  ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {tmpl.name}
                </span>
                {settings.template === tmpl.id && (
                  <span className="p-0.5 rounded-full bg-indigo-600 text-white">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {tmpl.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-zinc-400" />
          Jenis Huruf (Font ATS Terverifikasi)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {fonts.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange({ fontFamily: f.id })}
              className={`text-left p-2.5 rounded-xl border transition-all ${
                settings.fontFamily === f.id
                  ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300'
              }`}
            >
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {f.name}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{f.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size & Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Skala Ukuran Teks
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {fontSizes.map((fs) => (
              <button
                key={fs.id}
                type="button"
                onClick={() => onChange({ fontSize: fs.id })}
                className={`p-2 rounded-xl text-center border text-xs font-medium transition-all ${
                  settings.fontSize === fs.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {fs.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Kerapatan Baris & Jarak (Spacing)
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {spacings.map((sp) => (
              <button
                key={sp.id}
                type="button"
                onClick={() => onChange({ spacing: sp.id })}
                className={`p-2 rounded-xl text-center border text-xs font-medium transition-all ${
                  settings.spacing === sp.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {sp.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accent Color & Dividers */}
      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Warna Aksen Judul
          </label>
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => onChange({ accentColor: c.hex })}
                className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                  settings.accentColor === c.hex ? 'scale-110 ring-2 ring-indigo-500 ring-offset-2' : ''
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {settings.accentColor === c.hex && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Garis Pembatas Section
          </label>
          <button
            type="button"
            onClick={() => onChange({ showDividers: !settings.showDividers })}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              settings.showDividers
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {settings.showDividers ? 'Garis Pemisah Aktif' : 'Tanpa Garis Pemisah'}
          </button>
        </div>
      </div>

      {/* Golden ATS Rules Banner */}
      <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-2xl text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          Aturan Emas Resume ATS
        </div>
        <p className="leading-relaxed">
          Hindari menyisipkan foto profil, tabel kompleks bertingkat, diagram bintang keahlian, atau kolom ganda mengambang yang dapat membingungkan parser ATS di perusahaan multinasional.
        </p>
      </div>
    </div>
  );
};
