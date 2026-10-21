import { ResumeData } from '@/types/resume';

export interface AtsCheckItem {
  id: string;
  category: 'contact' | 'content' | 'formatting' | 'impact';
  title: string;
  description: string;
  passed: boolean;
  score: number;
  maxScore: number;
  tip?: string;
}

export interface AtsAuditResult {
  score: number;
  rating: 'Perlu Ditingkatkan' | 'Cukup Bagus' | 'Sangat Baik' | 'Sempurna untuk ATS';
  color: string;
  checklist: AtsCheckItem[];
  actionVerbsCount: number;
  metricsCount: number;
}

const ACTION_VERBS = [
  'architect', 'architected', 'spearhead', 'spearheaded', 'lead', 'led', 'develop', 'developed',
  'engineer', 'engineered', 'implement', 'implemented', 'optimize', 'optimized', 'design', 'designed',
  'build', 'built', 'orchestrate', 'orchestrated', 'streamline', 'streamlined', 'deliver', 'delivered',
  'manage', 'managed', 'create', 'created', 'increase', 'increased', 'reduce', 'reduced', 'improve', 'improved',
  'automate', 'automated', 'scale', 'scaled', 'execute', 'executed', 'launch', 'launched', 'mentor', 'mentored',
  'transform', 'transformed', 'establish', 'established', 'maintain', 'maintained'
];

export function analyzeAtsScore(data: ResumeData): AtsAuditResult {
  const checklist: AtsCheckItem[] = [];

  // 1. Contact Information
  const hasName = data.personalInfo.fullName.trim().length > 2;
  checklist.push({
    id: 'name',
    category: 'contact',
    title: 'Nama Lengkap Terisi',
    description: 'Nama kandidat harus jelas sebagai judul utama resume.',
    passed: hasName,
    score: hasName ? 10 : 0,
    maxScore: 10,
    tip: 'Pastikan nama Anda ditulis dengan jelas tanpa singkatan yang membingungkan.',
  });

  const hasEmail = /\S+@\S+\.\S+/.test(data.personalInfo.email);
  const hasPhone = data.personalInfo.phone.trim().length >= 8;
  const hasLocation = data.personalInfo.location.trim().length > 2;
  const contactPassed = hasEmail && hasPhone && hasLocation;
  checklist.push({
    id: 'contact_details',
    category: 'contact',
    title: 'Kontak Lengkap (Email, HP, Lokasi)',
    description: 'Parser ATS mencari email, nomor telepon, dan lokasi domisili.',
    passed: contactPassed,
    score: (hasEmail ? 5 : 0) + (hasPhone ? 5 : 0) + (hasLocation ? 5 : 0),
    maxScore: 15,
    tip: 'Cantumkan kota domisili, email profesional, dan nomor telepon aktif.',
  });

  // 2. Summary
  const summaryWords = data.personalInfo.summary.trim().split(/\s+/).filter(Boolean).length;
  const summaryOptimal = summaryWords >= 25 && summaryWords <= 120;
  checklist.push({
    id: 'summary',
    category: 'content',
    title: 'Ringkasan Profesional Terstruktur',
    description: 'Ringkasan karir singkat (25 - 120 kata) memperkenalkan keahlian inti Anda.',
    passed: summaryOptimal,
    score: summaryOptimal ? 10 : (summaryWords > 0 ? 5 : 0),
    maxScore: 10,
    tip: 'Buat ringkasan 2-4 kalimat yang menonjolkan nilai unik dan pengalaman utama Anda.',
  });

  // 3. Work Experience Items
  const hasExperience = data.experiences.length > 0;
  checklist.push({
    id: 'experience_present',
    category: 'content',
    title: 'Pengalaman Kerja Terdaftar',
    description: 'Bagian riwayat profesional memiliki minimal satu entri riwayat kerja.',
    passed: hasExperience,
    score: hasExperience ? 15 : 0,
    maxScore: 15,
    tip: 'Cantumkan posisi, nama perusahaan, serta periode waktu (bulan & tahun).',
  });

  // Count Action Verbs & Metrics
  let actionVerbsCount = 0;
  let metricsCount = 0;
  const metricRegex = /\b\d+(\.\d+)?%|\b\d+\+?|\$\d+/g;

  const allBullets = data.experiences.flatMap((exp) => exp.bullets);
  allBullets.forEach((bullet) => {
    const words = bullet.toLowerCase().split(/\s+/);
    if (words.length > 0 && ACTION_VERBS.includes(words[0])) {
      actionVerbsCount += 1;
    } else if (words.some((w) => ACTION_VERBS.includes(w))) {
      actionVerbsCount += 1;
    }

    const matches = bullet.match(metricRegex);
    if (matches) {
      metricsCount += matches.length;
    }
  });

  const hasStrongVerbs = actionVerbsCount >= 3;
  checklist.push({
    id: 'action_verbs',
    category: 'impact',
    title: 'Penggunaan Action Verbs Kuat',
    description: `Ditemukan ${actionVerbsCount} action verbs (seperti Architected, Spearheaded, Reduced).`,
    passed: hasStrongVerbs,
    score: hasStrongVerbs ? 15 : Math.min(10, actionVerbsCount * 3),
    maxScore: 15,
    tip: 'Mulai setiap poin pencapaian dengan kata kerja aksi aktif yang kuat.',
  });

  const hasMetrics = metricsCount >= 2;
  checklist.push({
    id: 'metrics',
    category: 'impact',
    title: 'Pencapaian Terukur (Metrik & Angka)',
    description: `Ditemukan ${metricsCount} indikator angka/persentase dalam pencapaian riwayat kerja.`,
    passed: hasMetrics,
    score: hasMetrics ? 15 : Math.min(10, metricsCount * 5),
    maxScore: 15,
    tip: 'Sertakan metrik terukur seperti persentase peningkatan, jumlah pengguna, atau penghematan waktu.',
  });

  // 4. Skills
  const totalSkills = data.skills.reduce((acc, cat) => acc + cat.skills.length, 0);
  const skillsPassed = totalSkills >= 5;
  checklist.push({
    id: 'skills',
    category: 'content',
    title: 'Keahlian Teknis / Relevan (Minimal 5)',
    description: `Ditemukan ${totalSkills} keahlian yang terdaftar.`,
    passed: skillsPassed,
    score: skillsPassed ? 10 : (totalSkills > 0 ? 5 : 0),
    maxScore: 10,
    tip: 'Kelompokkan keahlian ke dalam kategori logis agar mudah dipindai oleh bot ATS.',
  });

  // 5. Education
  const hasEducation = data.education.length > 0 && data.education[0].institution.trim().length > 0;
  checklist.push({
    id: 'education',
    category: 'content',
    title: 'Riwayat Pendidikan Valid',
    description: 'Mencantumkan nama institusi pendidikan dan program studi.',
    passed: hasEducation,
    score: hasEducation ? 10 : 0,
    maxScore: 10,
    tip: 'Tuliskan nama universitas, gelar, jurusan, dan tahun kelulusan.',
  });

  // Calculate Total Score
  const totalScore = checklist.reduce((sum, item) => sum + item.score, 0);

  let rating: AtsAuditResult['rating'] = 'Perlu Ditingkatkan';
  let color = 'text-amber-500';

  if (totalScore >= 90) {
    rating = 'Sempurna untuk ATS';
    color = 'text-emerald-500';
  } else if (totalScore >= 75) {
    rating = 'Sangat Baik';
    color = 'text-green-500';
  } else if (totalScore >= 50) {
    rating = 'Cukup Bagus';
    color = 'text-blue-500';
  }

  return {
    score: totalScore,
    rating,
    color,
    checklist,
    actionVerbsCount,
    metricsCount,
  };
}
