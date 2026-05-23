export interface Video {
  id: number;
  title: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  tag: string;
  img: string;
  youtubeId: string;
  featured?: boolean;
}

export const VIDEO_CATEGORIES = [
  "Semua",
  "Untuk Orang Tua",
  "Untuk Anak",
  "Parental Control",
  "Kesehatan",
  "Aktivitas",
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 1,
    title: "Mengapa Screen Time Berlebih Berbahaya? Penjelasan Dokter Anak",
    duration: "12:34",
    views: "24.5K",
    likes: "1.2K",
    category: "Untuk Orang Tua",
    tag: "🩺 Dokter",
    img: "https://images.unsplash.com/photo-1758873272808-5580ed7deb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
  },
  {
    id: 2,
    title: "Cara Mengatur Google Family Link untuk Anak",
    duration: "08:15",
    views: "18.3K",
    likes: "956",
    category: "Parental Control",
    tag: "🔒 Tutorial",
    img: "https://images.unsplash.com/photo-1505976442149-53a82393903b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Dampak Gadget pada Perkembangan Otak Anak Usia Dini",
    duration: "15:22",
    views: "31.7K",
    likes: "2.1K",
    category: "Kesehatan",
    tag: "🧠 Ilmiah",
    img: "https://images.unsplash.com/photo-1647188443883-9be7cee25341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "5 Cara Seru Mengalihkan Anak dari Gadget",
    duration: "07:48",
    views: "42.1K",
    likes: "3.4K",
    category: "Aktivitas",
    tag: "🎮 Tips",
    img: "https://images.unsplash.com/photo-1758687126549-3bfd368e59a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Panduan Lengkap Screen Time untuk Anak 3-12 Tahun",
    duration: "18:56",
    views: "15.9K",
    likes: "887",
    category: "Untuk Orang Tua",
    tag: "📋 Panduan",
    img: "https://images.unsplash.com/photo-1761986758458-205d30cc9135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Aktivitas Seni Kreatif untuk Anak tanpa Gadget",
    duration: "09:30",
    views: "28.4K",
    likes: "1.8K",
    category: "Aktivitas",
    tag: "🎨 Kreatif",
    img: "https://images.unsplash.com/photo-1583238829785-7ba8a888bb72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 7,
    title: "Membaca Bersama Anak: Manfaat dan Cara Memulai",
    duration: "06:12",
    views: "11.2K",
    likes: "743",
    category: "Untuk Anak",
    tag: "📚 Literasi",
    img: "https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 8,
    title: "Kisah Nyata: Keluarga Berhasil Lepas dari Kecanduan Gadget",
    duration: "21:05",
    views: "56.8K",
    likes: "4.7K",
    category: "Untuk Orang Tua",
    tag: "❤️ Kisah Nyata",
    img: "https://images.unsplash.com/photo-1609173706484-78700d4ed198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 9,
    title: "Olahraga Seru untuk Anak di Rumah Tanpa Peralatan",
    duration: "13:20",
    views: "19.6K",
    likes: "1.3K",
    category: "Aktivitas",
    tag: "⚽ Olahraga",
    img: "https://images.unsplash.com/photo-1652688898581-8f4878c942e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    youtubeId: "dQw4w9WgXcQ",
  },
];
