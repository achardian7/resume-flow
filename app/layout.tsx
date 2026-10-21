import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Flow - ATS-Friendly Resume Builder",
  description:
    "Aplikasi pembuat resume profesional berstandar ATS (Applicant Tracking System) dengan live preview real-time, ekspor PDF berbasis teks murni, dan kustomisasi section fleksibel.",
  keywords: [
    "ATS Resume Builder",
    "CV ATS Friendly",
    "Applicant Tracking System",
    "PDF Resume Generator",
    "Interactive Resume",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
