'use client';

import React from 'react';
import { Plus, Trash2, Briefcase, PlusCircle, X, Sparkles } from 'lucide-react';
import { ExperienceItem } from '@/types/resume';

interface ExperienceFormProps {
  experiences: ExperienceItem[];
  onAdd: () => void;
  onUpdate: (id: string, fields: Partial<ExperienceItem>) => void;
  onDelete: (id: string) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const handleAddBullet = (expId: string, bullets: string[]) => {
    onUpdate(expId, { bullets: [...bullets, ''] });
  };

  const handleUpdateBullet = (expId: string, bullets: string[], index: number, val: string) => {
    const updated = [...bullets];
    updated[index] = val;
    onUpdate(expId, { bullets: updated });
  };

  const handleDeleteBullet = (expId: string, bullets: string[], index: number) => {
    const updated = bullets.filter((_, i) => i !== index);
    onUpdate(expId, { bullets: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Pengalaman Kerja (Work Experience)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Gunakan format poin (bullet points) yang diawali kata kerja aksi dan mencantumkan metrik terukur.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800/60"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Pekerjaan
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 space-y-2">
          <Briefcase className="w-8 h-8 mx-auto stroke-1 text-zinc-300 dark:text-zinc-600" />
          <p className="text-xs">Belum ada riwayat pekerjaan yang ditambahkan.</p>
          <button
            type="button"
            onClick={onAdd}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            + Tambah pengalaman kerja pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, expIdx) => (
            <div
              key={exp.id}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-xs space-y-3.5 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Pekerjaan #{expIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(exp.id)}
                  className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Hapus riwayat pekerjaan ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Posisi / Jabatan
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Full Stack Engineer"
                    value={exp.role}
                    onChange={(e) => onUpdate(exp.id, { role: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tokopedia (GoTo Group)"
                    value={exp.company}
                    onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Lokasi (Kota, Negara)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jakarta, Indonesia"
                    value={exp.location}
                    onChange={(e) => onUpdate(exp.id, { location: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Mulai (Bulan / Tahun)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2022-03"
                        value={exp.startDate}
                        onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Selesai
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2024-05"
                        disabled={exp.isCurrent}
                        value={exp.isCurrent ? 'Present' : exp.endDate}
                        onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                        className={`w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                          exp.isCurrent
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                            : 'bg-zinc-50 dark:bg-zinc-950'
                        }`}
                      />
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-zinc-600 dark:text-zinc-400">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) =>
                        onUpdate(exp.id, {
                          isCurrent: e.target.checked,
                          endDate: e.target.checked ? '' : exp.endDate,
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                    />
                    <span>Saat ini masih bekerja di sini</span>
                  </label>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Poin Pencapaian & Tanggung Jawab (Bullet Points)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(exp.id, exp.bullets)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <PlusCircle className="w-3 h-3" />
                    Tambah Poin
                  </button>
                </div>

                <div className="space-y-1.5">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-zinc-400 mt-2 text-xs">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        placeholder="Awali dengan kata kerja aksi aktif (misal: 'Mengembangkan sistem caching yang memangkas latensi 40%...')"
                        onChange={(e) =>
                          handleUpdateBullet(exp.id, exp.bullets, bIdx, e.target.value)
                        }
                        className="flex-1 text-xs p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteBullet(exp.id, exp.bullets, bIdx)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors mt-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
