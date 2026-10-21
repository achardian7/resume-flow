'use client';

import React from 'react';
import { Plus, Trash2, FolderGit2, PlusCircle, X, ExternalLink } from 'lucide-react';
import { ProjectItem } from '@/types/resume';

interface ProjectsFormProps {
  projects: ProjectItem[];
  onAdd: () => void;
  onUpdate: (id: string, fields: Partial<ProjectItem>) => void;
  onDelete: (id: string) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({
  projects,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const handleAddBullet = (projId: string, bullets: string[]) => {
    onUpdate(projId, { bullets: [...bullets, ''] });
  };

  const handleUpdateBullet = (projId: string, bullets: string[], index: number, val: string) => {
    const updated = [...bullets];
    updated[index] = val;
    onUpdate(projId, { bullets: updated });
  };

  const handleDeleteBullet = (projId: string, bullets: string[], index: number) => {
    const updated = bullets.filter((_, i) => i !== index);
    onUpdate(projId, { bullets: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Proyek Unggulan (Projects)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Sebutkan teknologi yang digunakan dan dampak teknis yang dihasilkan.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800/60"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Proyek
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 space-y-2">
          <FolderGit2 className="w-8 h-8 mx-auto stroke-1 text-zinc-300 dark:text-zinc-600" />
          <p className="text-xs">Belum ada proyek yang ditambahkan.</p>
          <button
            type="button"
            onClick={onAdd}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            + Tambah proyek pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-xs space-y-3.5 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Proyek #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(proj.id)}
                  className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Hapus proyek ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Nama Proyek
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CloudScale Distributed Task Platform"
                    value={proj.title}
                    onChange={(e) => onUpdate(proj.id, { title: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Peran (Role)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Creator & Maintainer"
                    value={proj.role}
                    onChange={(e) => onUpdate(proj.id, { role: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Teknologi yang Digunakan
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Go, Redis, Docker, Next.js"
                    value={proj.technologies}
                    onChange={(e) => onUpdate(proj.id, { technologies: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    <span className="inline-flex items-center gap-1">
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                      Tautan URL / Repository
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://github.com/username/repo"
                    value={proj.link}
                    onChange={(e) => onUpdate(proj.id, { link: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:col-span-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Mulai
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2023-01"
                      value={proj.startDate}
                      onChange={(e) => onUpdate(proj.id, { startDate: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Selesai
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2023-06"
                      value={proj.endDate}
                      onChange={(e) => onUpdate(proj.id, { endDate: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Poin Deskripsi Proyek
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(proj.id, proj.bullets)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <PlusCircle className="w-3 h-3" />
                    Tambah Poin
                  </button>
                </div>

                <div className="space-y-1.5">
                  {proj.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-zinc-400 mt-2 text-xs">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        placeholder="Tuliskan tantangan teknis atau metrik keberhasilan proyek..."
                        onChange={(e) =>
                          handleUpdateBullet(proj.id, proj.bullets, bIdx, e.target.value)
                        }
                        className="flex-1 text-xs p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteBullet(proj.id, proj.bullets, bIdx)}
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
