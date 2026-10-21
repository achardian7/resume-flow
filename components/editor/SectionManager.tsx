'use client';

import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  GripVertical,
  RotateCcw,
  Sliders,
  Check,
} from 'lucide-react';
import { SectionConfig, SectionType } from '@/types/resume';

interface SectionManagerProps {
  sections: SectionConfig[];
  onUpdateTitle: (sectionId: SectionType, title: string) => void;
  onToggleVisibility: (sectionId: SectionType) => void;
  onMoveSection: (sectionId: SectionType, direction: 'up' | 'down') => void;
  onReorderSections: (newOrderedIds: SectionType[]) => void;
}

export const SectionManager: React.FC<SectionManagerProps> = ({
  sections,
  onUpdateTitle,
  onToggleVisibility,
  onMoveSection,
  onReorderSections,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const items = [...sortedSections];
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(targetIndex, 0, draggedItem);

    const orderedIds = items.map((i) => i.id);
    onReorderSections(orderedIds);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Kustomisasi & Urutan Section
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Ubah judul section, ubah urutan (naik/turun atau geser drag-and-drop), dan sembunyikan/tampilkan bagian resume sesuai kebutuhan.
        </p>
      </div>

      <div className="space-y-2.5">
        {sortedSections.map((section, index) => {
          const isFirst = index === 0;
          const isLast = index === sortedSections.length - 1;
          const isDragged = draggedIndex === index;
          const isHoveredTarget = dragOverIndex === index;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`p-3 rounded-2xl border transition-all duration-150 flex items-center gap-3 bg-white dark:bg-zinc-900 ${
                isDragged
                  ? 'opacity-40 border-indigo-400 dark:border-indigo-500 scale-[0.99]'
                  : isHoveredTarget
                  ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/30'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs'
              } ${!section.isVisible ? 'opacity-60 bg-zinc-50 dark:bg-zinc-950' : ''}`}
            >
              {/* Drag Handle */}
              <div
                className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1"
                title="Tahan dan geser untuk memindahkan urutan"
              >
                <GripVertical className="w-4 h-4" />
              </div>

              {/* Order Number Badge */}
              <div className="w-6 h-6 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center justify-center shrink-0">
                {index + 1}
              </div>

              {/* Editable Title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={section.customTitle}
                    onChange={(e) => onUpdateTitle(section.id, e.target.value)}
                    placeholder={section.defaultTitle}
                    className="w-full text-xs font-semibold text-zinc-900 dark:text-zinc-100 px-2.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {section.customTitle !== section.defaultTitle && (
                    <button
                      type="button"
                      onClick={() => onUpdateTitle(section.id, section.defaultTitle)}
                      className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors shrink-0"
                      title="Kembalikan ke nama default"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="text-[10px] text-zinc-400 pl-1 mt-0.5">
                  Default:{' '}
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">
                    {section.defaultTitle}
                  </span>
                </div>
              </div>

              {/* Move Up / Move Down Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={isFirst}
                  onClick={() => onMoveSection(section.id, 'up')}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Pindahkan ke atas"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={isLast}
                  onClick={() => onMoveSection(section.id, 'down')}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Pindahkan ke bawah"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Visibility Toggle Button */}
              <button
                type="button"
                onClick={() => onToggleVisibility(section.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors shrink-0 ${
                  section.isVisible
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50'
                    : 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                }`}
                title={section.isVisible ? 'Sembunyikan section ini' : 'Tampilkan section ini'}
              >
                {section.isVisible ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Aktif</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Tersembunyi</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>
          Semua perubahan urutan dan judul otomatis disinkronkan ke Live Preview & Ekspor PDF.
        </span>
      </div>
    </div>
  );
};
