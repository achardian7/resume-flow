'use client';

import React from 'react';
import { Plus, Trash2, GraduationCap, PlusCircle, X, Sparkles } from 'lucide-react';
import { EducationItem } from '@/types/resume';

interface EducationFormProps {
  education: EducationItem[];
  onAdd: () => void;
  onUpdate: (id: string, fields: Partial<EducationItem>) => void;
  onDelete: (id: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const handleAddHighlight = (eduId: string, highlights: string[] = []) => {
    onUpdate(eduId, { highlights: [...highlights, ''] });
  };

  const handleUpdateHighlight = (
    eduId: string,
    highlights: string[] = [],
    index: number,
    val: string
  ) => {
    const updated = [...highlights];
    updated[index] = val;
    onUpdate(eduId, { highlights: updated });
  };

  const handleDeleteHighlight = (
    eduId: string,
    highlights: string[] = [],
    index: number
  ) => {
    const updated = highlights.filter((_, i) => i !== index);
    onUpdate(eduId, { highlights: updated });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Pendidikan (Education)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Cantumkan nama perguruan tinggi, gelar, program studi, dan IPK (opsional).
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800/60"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Pendidikan
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 space-y-2">
          <GraduationCap className="w-8 h-8 mx-auto stroke-1 text-zinc-300 dark:text-zinc-600" />
          <p className="text-xs">Belum ada data pendidikan yang ditambahkan.</p>
          <button
            type="button"
            onClick={onAdd}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            + Tambah riwayat pendidikan
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, eduIdx) => (
            <div
              key={edu.id}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-xs space-y-3.5 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Pendidikan #{eduIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(edu.id)}
                  className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Hapus data pendidikan ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Nama Institusi / Universitas
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Institut Teknologi Bandung (ITB)"
                    value={edu.institution}
                    onChange={(e) => onUpdate(edu.id, { institution: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Gelar Akademik
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarjana Komputer (S.Kom)"
                    value={edu.degree}
                    onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Jurusan / Program Studi
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Teknik Informatika"
                    value={edu.fieldOfStudy}
                    onChange={(e) => onUpdate(edu.id, { fieldOfStudy: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    IPK / GPA (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3.82 / 4.00"
                    value={edu.gpa}
                    onChange={(e) => onUpdate(edu.id, { gpa: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Lokasi (Kota, Negara)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bandung, Indonesia"
                    value={edu.location}
                    onChange={(e) => onUpdate(edu.id, { location: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Mulai
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2017-08"
                      value={edu.startDate}
                      onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Selesai
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2021-07"
                      value={edu.endDate}
                      onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Highlights / Prestasi / Aktivitas */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Poin Prestasi / Aktivitas / Kehormatan (Opsional)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddHighlight(edu.id, edu.highlights)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <PlusCircle className="w-3 h-3" />
                      Tambah Poin
                    </button>
                  </div>

                  {edu.highlights && edu.highlights.length > 0 ? (
                    <div className="space-y-1.5">
                      {edu.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-1.5">
                          <span className="text-zinc-400 text-xs">•</span>
                          <input
                            type="text"
                            value={highlight}
                            placeholder="e.g. Lulus predikat Cum Laude / Penerima beasiswa prestasi"
                            onChange={(e) =>
                              handleUpdateHighlight(edu.id, edu.highlights, hIdx, e.target.value)
                            }
                            className="flex-1 text-xs px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteHighlight(edu.id, edu.highlights, hIdx)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                            title="Hapus poin ini"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-zinc-400 italic">
                      Belum ada poin prestasi/kehormatan ditambahkan (opsional).
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
