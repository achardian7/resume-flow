'use client';

import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { AtsAuditResult } from '@/utils/atsChecker';

interface AtsScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  audit: AtsAuditResult;
}

export const AtsScoreModal: React.FC<AtsScoreModalProps> = ({
  isOpen,
  onClose,
  audit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 shrink-0">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Analisis Kepatuhan ATS (Applicant Tracking System)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Evaluasi struktur resume berdasarkan standar algoritma pembaca ATS modern.
            </p>
          </div>
        </div>

        {/* Score Overview Card */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl mb-4 shrink-0 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Skor Kelayakan ATS
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${audit.color}`}>
                {audit.score}
              </span>
              <span className="text-sm font-semibold text-zinc-400">/ 100</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 ${audit.color}`}>
                {audit.rating}
              </span>
            </div>
          </div>

          <div className="text-right text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
            <div>
              Action Verbs:{' '}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {audit.actionVerbsCount}
              </strong>
            </div>
            <div>
              Metrik Terukur:{' '}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {audit.metricsCount}
              </strong>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Detail Poin Pemeriksaan
          </h4>

          {audit.checklist.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                item.passed
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                  : 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  {item.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h5>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {item.description}
                    </p>
                    {item.tip && !item.passed && (
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 font-medium bg-amber-100/50 dark:bg-amber-900/30 px-2 py-1 rounded">
                        💡 Saran: {item.tip}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-xs font-bold shrink-0 text-zinc-600 dark:text-zinc-300">
                  {item.score}/{item.maxScore}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
