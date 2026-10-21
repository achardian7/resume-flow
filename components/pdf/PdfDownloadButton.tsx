'use client';

import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { ResumePdfDocument } from './ResumePdfDocument';

interface PdfDownloadButtonProps {
  data: ResumeData;
  className?: string;
}

export const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({ data, className }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setIsSuccess(false);

      // Dynamically import pdf from @react-pdf/renderer on client
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();

      // Create download url
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const sanitizedName = (data.personalInfo.fullName || 'Resume')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `${sanitizedName}_ATS_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal membuat PDF. Silakan periksa data Anda dan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed ${
        isSuccess
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none'
      } ${className || ''}`}
      title="Download PDF teks murni ATS-friendly"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          <span>Membuat PDF...</span>
        </>
      ) : isSuccess ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-100" />
          <span>PDF Terunduh!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-white" />
          <span>Download PDF (ATS)</span>
        </>
      )}
    </button>
  );
};
