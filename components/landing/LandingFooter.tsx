"use client";

import React from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Heart } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Resume Flow
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Platform pembuat resume profesional berstandar ATS (Applicant
              Tracking System) internasional. Menghasilkan dokumen PDF berbasis
              vektor teks murni dengan audit skor ATS real-time dan privasi 100%
              di browser pengguna.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Privasi Terjamin: Zero-Server Data Storage</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Fitur Unggulan
                </a>
              </li>
              <li>
                <a
                  href="#demo"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Live Showcase & Audit ATS
                </a>
              </li>
              <li>
                <a
                  href="#comparison"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Kenapa Standar ATS Penting?
                </a>
              </li>
              <li>
                <a
                  href="#templates"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Koleksi Template ATS
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Tools & Builder */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4">
              Aplikasi & Editor
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/builder"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-indigo-600 dark:text-indigo-400 transition-colors"
                >
                  Buka Resume Builder &rarr;
                </Link>
              </li>
              <li>
                <Link
                  href="/builder"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Uji Coba Data Contoh
                </Link>
              </li>
              <li>
                <Link
                  href="/builder"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Ekspor PDF Teks Murni
                </Link>
              </li>
              <li>
                <Link
                  href="/builder"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Backup & Restore JSON
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            © {new Date().getFullYear()} Resume Flow. 100% Free & Open ATS
            Resume Engine.
          </p>
          <Link
            href="https://github.com/achardian7/resume-flow"
            target="_blank"
            className="flex items-center gap-4"
          >
            <FaGithub size={20} />
            <span className="flex items-center gap-1"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
