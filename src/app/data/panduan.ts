export type AgeIconName = "baby" | "toddler" | "preschool" | "school" | "teen";
export type StepIconName = "smartphone" | "lock" | "clock" | "globe" | "bell";

export interface ScreenTimeItem {
  id: string;
  iconName: AgeIconName;
  age: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  recommended: string;
  exceptions: string;
  desc: string;
  tips: string[];
}

export interface ParentalStep {
  id: string;
  step: number;
  iconName: StepIconName;
  title: string;
  color: string;
  desc: string;
  action: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FamilyRule {
  id: string;
  emoji: string;
  rule: string;
}

export const INITIAL_SCREEN_TIME: ScreenTimeItem[] = [
  {
    id: "st-1",
    iconName: "baby",
    age: "0–18 Bulan",
    color: "from-pink-400 to-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
    recommended: "Tidak dianjurkan",
    exceptions: "Video call keluarga saja",
    desc: "Otak bayi membutuhkan interaksi langsung, sentuhan, dan stimulasi nyata. Paparan layar justru dapat mengganggu perkembangan visual dan kemampuan berbahasa.",
    tips: [
      "Hindari menjadikan gadget sebagai 'penghibur' bayi",
      "Prioritaskan buku bergambar dan mainan fisik",
      "Video call dengan kakek/nenek masih diperbolehkan",
    ],
  },
  {
    id: "st-2",
    iconName: "toddler",
    age: "18–24 Bulan",
    color: "from-orange-400 to-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    recommended: "< 1 jam/hari",
    exceptions: "Konten berkualitas tinggi saja",
    desc: "Jika diperkenalkan pada media digital, pastikan konten berkualitas tinggi dan didampingi orang tua. Pilih konten edukatif yang interaktif, bukan pasif.",
    tips: [
      "Tonton bersama dan diskusikan konten",
      "Pilih aplikasi yang dirancang khusus untuk usia ini",
      "Pastikan tidak menggantikan waktu bermain fisik",
    ],
  },
  {
    id: "st-3",
    iconName: "preschool",
    age: "3–5 Tahun",
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
    recommended: "1 jam/hari",
    exceptions: "Konten edukatif berkualitas",
    desc: "Pada usia prasekolah, gadget boleh digunakan dengan pengawasan ketat. Fokus pada konten yang mendukung kesiapan sekolah seperti belajar huruf, angka, dan kreativitas.",
    tips: [
      "Tetapkan jadwal penggunaan yang konsisten",
      "Jadikan aktivitas menonton sebagai kegiatan bersama",
      "Pastikan ada waktu tidur siang tanpa gadget",
    ],
  },
  {
    id: "st-4",
    iconName: "school",
    age: "6–12 Tahun",
    color: "from-emerald-400 to-green-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    recommended: "2 jam/hari",
    exceptions: "Tidak termasuk PR digital",
    desc: "Anak usia sekolah mulai membutuhkan teknologi untuk belajar, namun tetap perlu batasan jelas. Pisahkan screen time untuk hiburan dan untuk keperluan pendidikan.",
    tips: [
      "Selesaikan PR & tugas sekolah sebelum hiburan",
      "Larang gadget 1 jam sebelum tidur",
      "Terapkan 'gadget-free zone' di meja makan",
    ],
  },
  {
    id: "st-5",
    iconName: "teen",
    age: "13–17 Tahun",
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    recommended: "2–3 jam/hari",
    exceptions: "Tidak termasuk kebutuhan belajar",
    desc: "Remaja membutuhkan otonomi lebih namun tetap perlu panduan. Diskusikan bersama tentang penggunaan media sosial, keamanan online, dan konsekuensi dari jejak digital.",
    tips: [
      "Buat kesepakatan bersama (family media plan)",
      "Ajari tentang privasi dan keamanan online",
      "Dorong untuk bergabung dalam aktivitas ekstrakurikuler",
    ],
  },
];

export const INITIAL_PARENTAL_STEPS: ParentalStep[] = [
  {
    id: "ps-1",
    step: 1,
    iconName: "smartphone",
    title: "Audit Perangkat Anak",
    color: "bg-sky-600",
    desc: "Inventarisasi semua perangkat yang digunakan anak: smartphone, tablet, laptop, smart TV, dan konsol game. Catat aplikasi yang sudah terpasang.",
    action: "Buat daftar semua aplikasi dan catat yang perlu pembatasan",
  },
  {
    id: "ps-2",
    step: 2,
    iconName: "lock",
    title: "Aktifkan Family Link / Screen Time",
    color: "bg-violet-600",
    desc: "Untuk Android: Gunakan Google Family Link. Untuk iOS/Mac: Gunakan Screen Time di Pengaturan. Untuk Windows: Gunakan Microsoft Family Safety.",
    action: "Download Family Link atau aktifkan Screen Time sesuai platform",
  },
  {
    id: "ps-3",
    step: 3,
    iconName: "clock",
    title: "Atur Batas Waktu Harian",
    color: "bg-emerald-600",
    desc: "Tetapkan batas waktu spesifik per kategori aplikasi (game, media sosial, hiburan). Atur jadwal downtime otomatis saat jam belajar, makan, dan tidur.",
    action: "Contoh: Game max 1 jam/hari, Media Sosial max 30 menit",
  },
  {
    id: "ps-4",
    step: 4,
    iconName: "globe",
    title: "Filter Konten Web",
    color: "bg-amber-600",
    desc: "Aktifkan SafeSearch di Google. Gunakan DNS family-friendly seperti 1.1.1.3 (Cloudflare for Families) atau Google Safe Browsing. Pasang ekstensi browser yang sesuai.",
    action: "Aktifkan SafeSearch dan atur DNS family-friendly di router rumah",
  },
  {
    id: "ps-5",
    step: 5,
    iconName: "bell",
    title: "Monitor & Review Berkala",
    color: "bg-rose-600",
    desc: "Tinjau laporan aktivitas anak setiap minggu. Diskusikan bersama anak apa yang mereka tonton dan mainkan. Sesuaikan pengaturan seiring perkembangan anak.",
    action: "Jadwalkan 'Family Digital Check-in' setiap minggu",
  },
];

export const INITIAL_FAQ: FaqItem[] = [
  {
    id: "faq-1",
    question: "Apakah gadget benar-benar harus sepenuhnya dilarang untuk anak?",
    answer:
      "Tidak harus dilarang sepenuhnya. Kuncinya adalah penggunaan yang seimbang dan terarah. Gadget bisa menjadi alat belajar yang sangat efektif jika digunakan dengan benar, konten yang tepat, durasi yang sesuai, dan didampingi orang tua.",
  },
  {
    id: "faq-2",
    question: "Bagaimana cara terbaik menegur anak yang kecanduan gadget?",
    answer:
      "Hindari konfrontasi langsung yang emosional. Mulailah dengan percakapan yang hangat dan empatik. Jelaskan dampaknya dengan bahasa yang sesuai usia. Tawarkan alternatif yang menarik. Buat kesepakatan bersama, bukan aturan sepihak.",
  },
  {
    id: "faq-3",
    question: "Apakah boleh menggunakan gadget untuk keperluan belajar online?",
    answer:
      "Tentu boleh! Penggunaan untuk keperluan belajar (mengerjakan PR, riset sekolah, kelas online) tidak dihitung dalam batas screen time hiburan. Namun, pastikan aplikasi yang digunakan aman dan orang tua tetap mengetahui kegiatannya.",
  },
  {
    id: "faq-4",
    question: "Sejak usia berapa anak boleh punya smartphone sendiri?",
    answer:
      "Para ahli umumnya merekomendasikan anak mendapatkan smartphone pertama mereka tidak sebelum usia 12–13 tahun, dan itu pun dengan pengawasan serta aturan yang jelas. Sebelum usia tersebut, gunakan perangkat bersama (shared device) dengan pengawasan ketat.",
  },
  {
    id: "faq-5",
    question: "Bagaimana jika anak marah saat dibatasi penggunaan gadget?",
    answer:
      "Reaksi marah adalah hal yang normal, terutama di awal penerapan aturan. Tetap tenang dan konsisten. Akui perasaan anak dengan validasi emosi. Tawarkan aktivitas pengganti yang menarik. Libatkan anak dalam membuat aturan agar mereka merasa punya kontrol.",
  },
  {
    id: "faq-6",
    question: "Apakah gadget di kamar tidur anak bahaya?",
    answer:
      "Ya, sangat tidak disarankan. Gadget di kamar tidur terbukti mengganggu kualitas dan kuantitas tidur anak. Cahaya biru dari layar menekan hormon melatonin. Solusinya: buat 'charging station' di luar kamar dan terapkan aturan gadget dikumpulkan 1 jam sebelum tidur.",
  },
];

export const INITIAL_FAMILY_RULES: FamilyRule[] = [
  { id: "fr-1", emoji: "🚫", rule: "Tidak ada gadget saat makan bersama" },
  { id: "fr-2", emoji: "🌙", rule: "Gadget dikumpulkan 1 jam sebelum tidur" },
  { id: "fr-3", emoji: "📚", rule: "Selesaikan PR sebelum bermain gadget" },
  { id: "fr-4", emoji: "🕐", rule: "Patuhi batas waktu screen time harian" },
  { id: "fr-5", emoji: "🛏️", rule: "Tidak ada gadget di kamar tidur anak" },
  { id: "fr-6", emoji: "👀", rule: "Orang tua berhak memantau aktivitas digital" },
  { id: "fr-7", emoji: "📴", rule: "Gadget dimatikan saat beribadah" },
  { id: "fr-8", emoji: "🤝", rule: "Ceritakan jika ada konten yang mengganggu" },
];
