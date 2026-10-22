'use client';

import React from 'react';
import {
  FileText,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  FolderSync,
} from 'lucide-react';
import Link from 'next/link';
import { ResumeData } from '@/types/resume';
import { AtsAuditResult } from '@/utils/atsChecker';
import { PdfDownloadButton } from '@/components/pdf/PdfDownloadButton';

interface NavbarProps {
  data: ResumeData;
  atsAudit: AtsAuditResult;
  onOpenResetModal: () => void;
  onOpenImportExportModal: () => void;
  onOpenAtsModal: () => void;
  onLoadSample: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  data,
  atsAudit,
  onOpenResetModal,
  onOpenImportExportModal,
  onOpenAtsModal,
  onLoadSample,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 group transition-opacity hover:opacity-90"
            title="Kembali ke Beranda"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
                  Resume Flow
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/60 dark:border-indigo-800/60">
                  Builder
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
                100% Machine-Readable & Standard ATS Format
              </p>
            </div>
          </Link>
        </div>

        {/* Center / Stats: ATS Score Meter */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenAtsModal}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 transition-all text-xs font-medium cursor-pointer group"
            title="Klik untuk melihat checklist lengkap ATS"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="text-zinc-600 dark:text-zinc-400">Skor ATS:</span>
            <span className={`font-bold ${atsAudit.color}`}>{atsAudit.score}/100</span>
            <span className="text-[11px] text-zinc-400 hidden lg:inline">({atsAudit.rating})</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Load Sample Button */}
          <button
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"
            title="Muat data contoh resume software engineer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Contoh Data</span>
          </button>

          {/* Backup JSON Button */}
          <button
            onClick={onOpenImportExportModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"
            title="Simpan atau pulihkan cadangan JSON"
          >
            <FolderSync className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden sm:inline">Cadangan</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onOpenResetModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors border border-red-200 dark:border-red-900/40"
            title="Kosongkan seluruh isian form dan hapus localStorage"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* PDF Download Button */}
          <PdfDownloadButton data={data} />
        </div>
      </div>
    </header>
  );
};
