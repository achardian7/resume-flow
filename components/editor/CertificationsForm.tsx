'use client';

import React from 'react';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';
import { CertificationItem } from '@/types/resume';

interface CertificationsFormProps {
  certifications: CertificationItem[];
  onAdd: () => void;
  onUpdate: (id: string, fields: Partial<CertificationItem>) => void;
  onDelete: (id: string) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({
  certifications,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Sertifikasi & Lisensi (Certifications)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Sertifikasi resmi dari lembaga terakreditasi (AWS, Google, CNCF, Scrum Alliance, dll.).
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800/60"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Sertifikasi
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 space-y-2">
          <Award className="w-8 h-8 mx-auto stroke-1 text-zinc-300 dark:text-zinc-600" />
          <p className="text-xs">Belum ada sertifikasi yang ditambahkan.</p>
          <button
            type="button"
            onClick={onAdd}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            + Tambah sertifikasi pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-xs space-y-3.5 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Sertifikasi #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(cert.id)}
                  className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Hapus sertifikasi ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Nama Sertifikasi
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) => onUpdate(cert.id, { name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Lembaga Penerbit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) => onUpdate(cert.id, { issuer: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Tanggal Terbit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2023-04"
                    value={cert.issueDate}
                    onChange={(e) => onUpdate(cert.id, { issueDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Kedaluwarsa (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2026-04"
                    value={cert.expirationDate}
                    onChange={(e) => onUpdate(cert.id, { expirationDate: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Credential ID / Nomor Lisensi
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AWS-ASA-9941824"
                    value={cert.credentialId}
                    onChange={(e) => onUpdate(cert.id, { credentialId: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    <span className="inline-flex items-center gap-1">
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                      Tautan Verifikasi
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://aws.amazon.com/verification"
                    value={cert.url}
                    onChange={(e) => onUpdate(cert.id, { url: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
