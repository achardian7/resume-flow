'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Wrench, X, Tag } from 'lucide-react';
import { SkillCategory } from '@/types/resume';

interface SkillsFormProps {
  skills: SkillCategory[];
  onAddCategory: () => void;
  onUpdateCategory: (id: string, name: string) => void;
  onDeleteCategory: (id: string) => void;
  onAddSkill: (categoryId: string, skill: string) => void;
  onRemoveSkill: (categoryId: string, skill: string) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddSkill,
  onRemoveSkill,
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleKeyDown = (catId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = inputValues[catId]?.trim();
      if (val) {
        onAddSkill(catId, val.replace(/,/g, ''));
        setInputValues((prev) => ({ ...prev, [catId]: '' }));
      }
    }
  };

  const handleAddClick = (catId: string) => {
    const val = inputValues[catId]?.trim();
    if (val) {
      onAddSkill(catId, val);
      setInputValues((prev) => ({ ...prev, [catId]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Keahlian & Kompetensi (Skills)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Dikelompokkan berdasarkan kategori logis. Tulis keahlian lalu tekan <strong>Enter</strong> atau koma (,).
          </p>
        </div>
        <button
          type="button"
          onClick={onAddCategory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors border border-indigo-200 dark:border-indigo-800/60"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Kategori
        </button>
      </div>

      <div className="space-y-3.5">
        {skills.map((category) => (
          <div
            key={category.id}
            className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-xs space-y-3 transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={category.name}
                onChange={(e) => onUpdateCategory(category.id, e.target.value)}
                placeholder="Nama Kategori (misal: Programming Languages)"
                className="text-xs font-bold text-zinc-900 dark:text-zinc-100 bg-transparent border-b border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 flex-1"
              />
              <button
                type="button"
                onClick={() => onDeleteCategory(category.id)}
                className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Hapus kategori ini"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tags display */}
            <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60">
              {category.skills.length === 0 ? (
                <span className="text-[11px] text-zinc-400 italic px-1">
                  Belum ada keahlian ditambahkan dalam kategori ini...
                </span>
              ) : (
                category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-2xs"
                  >
                    <Tag className="w-2.5 h-2.5 text-indigo-500" />
                    {skill}
                    <button
                      type="button"
                      onClick={() => onRemoveSkill(category.id, skill)}
                      className="hover:text-red-500 transition-colors ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Input tag */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik keahlian (misal: Docker) lalu tekan Enter..."
                value={inputValues[category.id] || ''}
                onChange={(e) =>
                  setInputValues((prev) => ({ ...prev, [category.id]: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(category.id, e)}
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleAddClick(category.id)}
                className="px-3 py-1.5 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl transition-colors shrink-0"
              >
                Tambah
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
