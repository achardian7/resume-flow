'use client';

import React, { useState } from 'react';
import { Download, Upload, Copy, Check, X, AlertCircle, FileText } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onImport: (jsonString: string) => { success: boolean; error?: string };
  onExport: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  data,
  onImport,
  onExport,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!importText.trim()) {
      setErrorMsg('Masukkan teks JSON atau unggah file .json terlebih dahulu.');
      return;
    }

    const res = onImport(importText);
    if (res.success) {
      setSuccessMsg('Data resume berhasil diimpor!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setErrorMsg(res.error || 'Gagal mengimpor data. Format JSON tidak sesuai.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Cadangan & Transfer Data (JSON)
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 mb-5">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'export'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Download className="w-4 h-4" />
            Ekspor Data
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex items-center gap-2 pb-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'import'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Upload className="w-4 h-4" />
            Impor Data
          </button>
        </div>

        {activeTab === 'export' ? (
          <div className="space-y-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Simpan cadangan data resume Anda ke file JSON untuk dipulihkan nanti atau dipindahkan ke perangkat lain.
            </p>

            <div className="flex gap-2">
              <button
                onClick={onExport}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download File .json
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm font-medium rounded-xl transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Tersalin!' : 'Salin JSON'}
              </button>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={jsonString}
                rows={8}
                className="w-full text-xs font-mono p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Unggah file cadangan <code>.json</code> atau tempel teks JSON untuk memulihkan resume Anda.
            </p>

            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-center hover:border-indigo-500 transition-colors">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                id="json-file-input"
                className="hidden"
              />
              <label
                htmlFor="json-file-input"
                className="cursor-pointer flex flex-col items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400"
              >
                <Upload className="w-6 h-6 text-zinc-400" />
                <span className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                  Pilih file .json
                </span>
                <span>atau tempel teks di bawah</span>
              </label>
            </div>

            <textarea
              placeholder='Tempel teks JSON di sini (misal: {"personalInfo": {...}})...'
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={6}
              className="w-full text-xs font-mono p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:border-indigo-500"
            />

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              onClick={handleExecuteImport}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Terapkan Impor Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
