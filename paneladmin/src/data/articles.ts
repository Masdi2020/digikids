export interface Reference {
  num: number;
  text: string;
  url?: string;
}

export interface ArticleSection {
  heading?: string;
  body: string;
  list?: string[];
}

export interface Article {
  id: string;
  type: "berita" | "bahaya" | "alternatif";
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  img: string;
  excerpt: string;
  lead: string;
  sections: ArticleSection[];
  references: Reference[];
}

const IMG = {
  tablet:     "https://images.unsplash.com/photo-1505976442149-53a82393903b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  outdoor:    "https://images.unsplash.com/photo-1761986758458-205d30cc9135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  reading:    "https://images.unsplash.com/flagged/photo-1551887373-6edba6dacbb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  screen:     "https://images.unsplash.com/photo-1647188443883-9be7cee25341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  family:     "https://images.unsplash.com/photo-1758687126549-3bfd368e59a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  drawing:    "https://images.unsplash.com/photo-1583238829785-7ba8a888bb72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  sports:     "https://images.unsplash.com/photo-1652688898581-8f4878c942e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  bedtime:    "https://images.unsplash.com/photo-1609173706484-78700d4ed198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  eye:        "https://images.unsplash.com/photo-1582434711242-db2daf32514f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  boardGame:  "https://images.unsplash.com/photo-1725398925420-11515f2cbb95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  video:      "https://images.unsplash.com/photo-1758873272808-5580ed7deb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  dark:       "https://images.unsplash.com/photo-1585577517704-f3d6f8023665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  active:     "https://images.unsplash.com/photo-1772523794495-57b712e32b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

export const BERITA_ARTICLES: Article[] = [
  {
    id: "berita-1",
    type: "berita",
    title: "WHO Perbarui Pedoman Screen Time untuk Anak Usia Dini",
    category: "Kesehatan Global",
    date: "5 Mei 2025",
    readTime: "5 menit",
    author: "Tim Redaksi BijakGadget",
    role: "Redaksi",
    img: IMG.tablet,
    excerpt: "Organisasi Kesehatan Dunia (WHO) kembali memperbarui panduan penggunaan layar bagi anak-anak usia 0-5 tahun, dengan penekanan lebih kuat pada interaksi fisik aktif.",
    lead: "Organisasi Kesehatan Dunia (WHO) secara resmi meluncurkan pembaruan pedoman screen time untuk anak usia dini pada April 2025. Pembaruan ini merupakan yang pertama sejak panduan awal diterbitkan pada 2019, dan muncul sebagai respons terhadap lonjakan penggunaan perangkat digital di kalangan anak-anak pasca-pandemi COVID-19.",
    sections: [
      {
        heading: "Isi Pembaruan Pedoman WHO",
        body: "Pedoman terbaru WHO menegaskan bahwa anak usia di bawah 2 tahun tidak dianjurkan menggunakan layar digital sama sekali, kecuali untuk video call. Untuk anak usia 3-4 tahun, batasan tetap pada 1 jam per hari dengan pengawasan ketat dari orang tua. Yang baru adalah penambahan panduan untuk anak usia 5 tahun yang memperkenalkan konsep 'screen time berkualitas' versus 'screen time pasif'.",
        list: [
          "Usia 0-2 tahun: tidak ada screen time, kecuali video call keluarga",
          "Usia 3-4 tahun: maksimal 1 jam per hari dengan pendampingan",
          "Usia 5 tahun: maksimal 1 jam, prioritaskan konten interaktif dan edukatif",
          "Semua usia: tidak ada gadget 1 jam sebelum tidur",
        ],
      },
      {
        heading: "Respons dari IDAI dan Kemenkes RI",
        body: "Ikatan Dokter Anak Indonesia (IDAI) menyambut positif pembaruan pedoman WHO ini dan menyatakan akan segera menyelaraskan rekomendasi nasional mereka. Kementerian Kesehatan RI juga mengindikasikan akan mengintegrasikan panduan baru ini ke dalam program edukasi posyandu dan PAUD di seluruh Indonesia. Langkah ini diharapkan dapat menjangkau jutaan orang tua di seluruh pelosok negeri.",
      },
    ],
    references: [
      { num: 1, text: "World Health Organization. (2025). Updated Guidelines on Screen Time for Children Under 5. Geneva: WHO Press.", url: "https://www.who.int" },
      { num: 2, text: "IDAI. (2025). Rekomendasi Penggunaan Media Digital pada Anak. Jakarta: Ikatan Dokter Anak Indonesia." },
      { num: 3, text: "Kementerian Kesehatan RI. (2025). Panduan Kesehatan Digital Anak. Jakarta: Kemenkes RI." },
      { num: 4, text: "Madigan, S., et al. (2019). Association Between Screen Time and Children's Performance on a Developmental Screening Test. JAMA Pediatrics, 173(3), 244-250." },
    ],
  },
  {
    id: "berita-2",
    type: "berita",
    title: "Studi: 7 dari 10 Anak SD Alami Gangguan Tidur Akibat Gadget",
    category: "Penelitian",
    date: "28 April 2025",
    readTime: "6 menit",
    author: "Tim Redaksi BijakGadget",
    role: "Redaksi",
    img: IMG.dark,
    excerpt: "Penelitian terbaru dari Universitas Indonesia menemukan bahwa mayoritas anak usia sekolah dasar mengalami gangguan tidur akibat penggunaan gadget menjelang waktu tidur.",
    lead: "Sebuah studi berskala nasional yang melibatkan lebih dari 2.400 siswa sekolah dasar di 12 kota besar Indonesia menemukan fakta mengkhawatirkan: tujuh dari sepuluh anak (70,3%) mengalami setidaknya satu gejala gangguan tidur yang berkaitan erat dengan kebiasaan menggunakan gadget menjelang waktu tidur.",
    sections: [
      {
        heading: "Temuan Utama Penelitian",
        body: "Penelitian yang dipimpin oleh Dr. Ratna Dewi dari Departemen Pediatri Universitas Indonesia ini dilakukan selama 18 bulan dari 2023 hingga awal 2025. Para peneliti menemukan bahwa anak-anak yang menggunakan gadget dalam 1 jam sebelum tidur memiliki rata-rata waktu tidur 47 menit lebih singkat dibandingkan teman sebaya yang tidak melakukan hal tersebut. Paparan cahaya biru dari layar secara signifikan menekan produksi melatonin - hormon kunci pengatur siklus tidur.",
        list: [
          "70,3% anak SD mengalami minimal satu gejala gangguan tidur",
          "Rata-rata waktu tidur 47 menit lebih singkat pada pengguna gadget malam hari",
          "Kesulitan konsentrasi di kelas meningkat 38% pada kelompok kurang tidur",
          "65% anak memiliki gadget di dalam kamar tidur mereka",
        ],
      },
      {
        heading: "Dampak pada Prestasi Akademik",
        body: "Lebih lanjut, penelitian ini menghubungkan kualitas tidur yang buruk dengan penurunan prestasi akademik. Anak-anak dengan gangguan tidur menunjukkan nilai rata-rata 15-20% lebih rendah dalam mata pelajaran yang membutuhkan konsentrasi tinggi seperti Matematika dan Bahasa Indonesia. Para ahli merekomendasikan penerapan 'digital curfew' keluarga - yaitu mematikan semua perangkat digital setidaknya 60-90 menit sebelum waktu tidur anak.",
      },
    ],
    references: [
      { num: 1, text: "Dewi, R., et al. (2025). Hubungan Penggunaan Gadget Malam Hari dengan Kualitas Tidur Anak Usia Sekolah di Indonesia. Jurnal Pediatri Indonesia, 65(2), 112-121." },
      { num: 2, text: "Hale, L., & Guan, S. (2015). Screen time and sleep among school-aged children and adolescents: A systematic literature review. Sleep Medicine Reviews, 21, 50-58." },
      { num: 3, text: "American Academy of Pediatrics. (2016). Media and Young Minds. Pediatrics, 138(5).", url: "https://www.aap.org" },
      { num: 4, text: "Chang, A. M., et al. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. PNAS, 112(4), 1232-1237." },
    ],
  },
  {
    id: "berita-3",
    type: "berita",
    title: "Platform Streaming Anak Kini Wajib Cantumkan Rating Konten",
    category: "Regulasi",
    date: "20 April 2025",
    readTime: "4 menit",
    author: "Tim Redaksi BijakGadget",
    role: "Redaksi",
    img: IMG.family,
    excerpt: "Pemerintah Indonesia resmi mewajibkan platform streaming yang menyediakan konten anak untuk menampilkan rating usia yang jelas dan fitur parental lock yang mudah diakses.",
    lead: "Kominfo resmi memberlakukan Peraturan Menteri Komunikasi dan Informatika Nomor 7 Tahun 2025 tentang Klasifikasi Konten Digital Anak. Regulasi ini mewajibkan semua platform Over-The-Top (OTT) yang beroperasi di Indonesia - termasuk Netflix, Disney+, YouTube, dan platform lokal - untuk menerapkan sistem rating konten yang seragam dan mudah dipahami orang tua.",
    sections: [
      {
        heading: "Isi Regulasi dan Kewajiban Platform",
        body: "Berdasarkan regulasi baru ini, setiap konten yang dapat diakses oleh pengguna di Indonesia wajib memiliki label usia yang jelas: A (untuk semua usia), 7+ (7 tahun ke atas), 13+ (13 tahun ke atas), 17+ (17 tahun ke atas), dan D (dewasa, 21+). Platform juga diwajibkan menyediakan fitur parental lock yang dapat diaktifkan dengan PIN, serta laporan aktivitas menonton mingguan yang dapat diakses orang tua.",
        list: [
          "Label rating usia wajib tampil jelas sebelum konten dimulai",
          "Fitur parental lock dengan PIN wajib tersedia di semua platform",
          "Laporan aktivitas menonton mingguan dapat diakses orang tua",
          "Platform yang melanggar dikenai denda hingga Rp 5 miliar",
        ],
      },
      {
        heading: "Respons Industri dan Publik",
        body: "Mayoritas platform besar menyatakan siap mematuhi regulasi ini, dengan beberapa di antaranya mengumumkan fitur tambahan seperti mode khusus anak yang otomatis membatasi konten. Dari sisi publik, survei Kominfo menemukan bahwa 87% orang tua mendukung penuh regulasi ini dan berharap implementasinya dapat segera berjalan efektif pada Juli 2025.",
      },
    ],
    references: [
      { num: 1, text: "Kominfo RI. (2025). Peraturan Menteri Komunikasi dan Informatika Nomor 7 Tahun 2025 tentang Klasifikasi Konten Digital Anak. Jakarta." },
      { num: 2, text: "KPAI. (2024). Laporan Tahunan Perlindungan Anak di Ruang Digital 2024. Jakarta: Komisi Perlindungan Anak Indonesia." },
      { num: 3, text: "Livingstone, S., & Blum-Ross, A. (2020). Parenting for a Digital Future. New York: NYU Press." },
    ],
  },
  {
    id: "berita-4",
    type: "berita",
    title: "Risiko Miopi pada Anak Meningkat 300% dalam Satu Dekade",
    category: "Kesehatan",
    date: "9 April 2025",
    readTime: "5 menit",
    author: "Tim Redaksi BijakGadget",
    role: "Redaksi",
    img: IMG.eye,
    excerpt: "Dokter spesialis mata memperingatkan lonjakan tajam kasus miopi pada anak usia sekolah yang erat kaitannya dengan paparan layar gadget yang berlebihan.",
    lead: "Data terbaru dari Perhimpunan Dokter Spesialis Mata Indonesia (Perdami) mengungkapkan lonjakan dramatis kasus miopi (rabun jauh) pada anak usia sekolah. Dalam rentang waktu 2015 hingga 2025, prevalensi miopi pada anak usia 6-12 tahun di Indonesia meningkat lebih dari 300%, dari sekitar 5% menjadi hampir 20% dari total populasi kelompok usia tersebut.",
    sections: [
      {
        heading: "Hubungan Screen Time dan Miopi",
        body: "Para dokter mata menjelaskan bahwa mekanisme utama di balik lonjakan ini adalah kombinasi dari dua faktor: pertama, paparan jarak dekat yang berkepanjangan pada layar gadget menyebabkan otot mata bekerja ekstra keras untuk fokus (akomodasi berlebih). Kedua, berkurangnya waktu di luar ruangan mengurangi paparan cahaya alami yang secara biologis penting untuk perkembangan mata yang sehat pada anak-anak.",
        list: [
          "Membaca layar dalam jarak <30 cm meningkatkan risiko miopi 2,6 kali lipat",
          "Setiap jam bermain di luar ruangan menurunkan risiko miopi hingga 14%",
          "Anak yang menggunakan gadget >4 jam/hari berisiko 4 kali lebih tinggi terkena miopi",
          "Miopi yang tidak tertangani dapat berkembang menjadi miopi berat (>6 dioptri)",
        ],
      },
      {
        heading: "Anjuran Dokter untuk Pencegahan",
        body: "Perdami mengeluarkan anjuran resmi agar orang tua menerapkan aturan 20-20-20: setiap 20 menit menatap layar, istirahatkan mata selama 20 detik dengan melihat objek sejauh 20 kaki (sekitar 6 meter). Selain itu, anak-anak didorong untuk menghabiskan minimal 2 jam per hari di luar ruangan di bawah sinar matahari alami sebagai intervensi pencegahan miopi yang terbukti secara ilmiah.",
      },
    ],
    references: [
      { num: 1, text: "Perdami. (2025). Laporan Prevalensi Miopi pada Anak Indonesia 2025. Jakarta: Perhimpunan Dokter Spesialis Mata Indonesia." },
      { num: 2, text: "Holden, B. A., et al. (2016). Global Prevalence of Myopia and High Myopia and Temporal Trends from 2000 through 2050. Ophthalmology, 123(5), 1036-1042." },
      { num: 3, text: "Xiong, S., et al. (2017). Time spent in outdoor activities in relation to myopia prevention and control. Acta Ophthalmologica, 95(6), 551-566." },
      { num: 4, text: "American Academy of Ophthalmology. (2020). 20-20-20 Rule for Digital Eye Strain. San Francisco: AAO.", url: "https://www.aao.org" },
    ],
  },
  {
    id: "berita-5",
    type: "berita",
    title: "Kurikulum Literasi Digital Sehat Hadir di 500 Sekolah Dasar",
    category: "Pendidikan",
    date: "2 April 2025",
    readTime: "4 menit",
    author: "Tim Redaksi BijakGadget",
    role: "Redaksi",
    img: IMG.video,
    excerpt: "Kemendikbud meluncurkan program Literasi Digital Sehat yang akan mengajarkan siswa SD cara menggunakan internet dan gadget secara bertanggung jawab sejak dini.",
    lead: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek) secara resmi meluncurkan Program Literasi Digital Sehat (LDS) yang akan diimplementasikan di 500 sekolah dasar pilot percontohan di 34 provinsi Indonesia mulai tahun ajaran 2025/2026. Program ini merupakan respons langsung pemerintah terhadap meningkatnya kasus dampak negatif penggunaan gadget pada anak usia sekolah.",
    sections: [
      {
        heading: "Isi Kurikulum dan Implementasi",
        body: "Kurikulum LDS dirancang sebagai modul terintegrasi yang masuk ke dalam mata pelajaran IPAS (Ilmu Pengetahuan Alam dan Sosial) dan Informatika. Materi yang diajarkan mencakup: cara mengidentifikasi konten hoaks, etika berkomunikasi di dunia maya, pemahaman tentang privasi data, serta manajemen waktu penggunaan gadget yang sehat. Program ini juga menyertakan sesi khusus untuk orang tua yang diselenggarakan satu kali per semester.",
        list: [
          "500 sekolah dasar pilot di 34 provinsi pada tahun ajaran 2025/2026",
          "Materi terintegrasi di mata pelajaran IPAS dan Informatika",
          "Sesi parenting digital satu kali per semester untuk orang tua",
          "Target ekspansi ke 5.000 sekolah pada 2027",
        ],
      },
      {
        heading: "Harapan dan Target Jangka Panjang",
        body: "Mendikbud menyatakan bahwa program ini merupakan bagian dari Peta Jalan Pendidikan Digital Indonesia 2025-2035. Pemerintah menargetkan pada 2030, minimal 80% siswa sekolah dasar di seluruh Indonesia telah mendapatkan pendidikan literasi digital yang terstruktur. Beberapa NGO dan perusahaan teknologi besar seperti Google Indonesia dan Tokopedia juga telah menyatakan kesiapan mereka untuk mendukung program ini melalui donasi perangkat dan pelatihan guru.",
      },
    ],
    references: [
      { num: 1, text: "Kemendikbudristek. (2025). Panduan Implementasi Program Literasi Digital Sehat. Jakarta: Kemdikbud Press." },
      { num: 2, text: "Salahudin, et al. (2023). Literasi Digital dan Dampaknya pada Perilaku Anak Sekolah Dasar. Jurnal Pendidikan Indonesia, 12(1), 45-58." },
      { num: 3, text: "UNICEF Indonesia. (2024). Keamanan Anak di Dunia Digital. Jakarta: UNICEF.", url: "https://www.unicef.org/indonesia" },
    ],
  },
];

export const BAHAYA_ARTICLES: Article[] = [
  {
    id: "bahaya-1",
    type: "bahaya",
    title: "Bahaya Gadget bagi Kesehatan Mata Anak: Miopi dan Digital Eye Strain",
    category: "Kesehatan Mata",
    date: "1 Mei 2025",
    readTime: "7 menit",
    author: "dr. Ahmad Fauzi, SpM",
    role: "Dokter Spesialis Mata",
    img: IMG.eye,
    excerpt: "Paparan layar gadget dalam jangka panjang dapat menyebabkan miopi, mata lelah kronis, dan sindrom mata kering yang berdampak serius pada penglihatan anak.",
    lead: "Di era digital ini, anak-anak menghabiskan rata-rata 4-6 jam sehari menatap layar gadget. Kebiasaan ini memiliki konsekuensi serius bagi kesehatan mata yang seringkali baru terasa dampaknya bertahun-tahun kemudian. Sebagai dokter spesialis mata, saya menyaksikan langsung lonjakan pasien anak dengan keluhan gangguan penglihatan yang hampir seluruhnya berkaitan dengan penggunaan gadget berlebih.",
    sections: [
      {
        heading: "Miopi: Epidemi Diam yang Mengintai",
        body: "Miopi atau rabun jauh terjadi ketika bola mata tumbuh terlalu panjang sehingga cahaya jatuh di depan retina, bukan tepat di atasnya. Penelitian menunjukkan bahwa membaca layar dalam jarak dekat secara terus-menerus merangsang pertumbuhan aksial bola mata yang berlebih. Setiap peningkatan satu dioptri miopi pada anak meningkatkan risiko kebutaan permanen pada usia lanjut hingga 67%. Ini bukan sekadar masalah harus memakai kacamata - ini adalah krisis kesehatan jangka panjang.",
        list: [
          "Membaca layar <30 cm selama >2 jam meningkatkan risiko miopi 2,6 kali lipat",
          "Anak-anak yang kurang paparan sinar matahari alami 4x lebih rentan terkena miopi",
          "Miopi berat (>6 dioptri) meningkatkan risiko ablasio retina, glaukoma, dan katarak",
          "Prevalensi miopi pada anak Indonesia melonjak dari 5% (2015) menjadi 19,8% (2025)",
        ],
      },
      {
        heading: "Digital Eye Strain: Sindrom Zaman Modern",
        body: "Selain miopi, Computer Vision Syndrome (CVS) atau Digital Eye Strain semakin umum pada anak-anak. Gejalanya meliputi mata merah, perih, gatal, penglihatan kabur sementara, sakit kepala, dan nyeri leher. Penyebabnya adalah berkurangnya frekuensi berkedip saat menatap layar (dari normal 15-20 kali/menit menjadi hanya 5-7 kali/menit), serta cahaya biru (blue light) bereaksi dengan molekul di retina. Terapkan aturan 20-20-20 dan pastikan pencahayaan ruangan yang cukup untuk meminimalkan risiko ini.",
      },
    ],
    references: [
      { num: 1, text: "Holden, B. A., et al. (2016). Global Prevalence of Myopia and High Myopia. Ophthalmology, 123(5), 1036-1042." },
      { num: 2, text: "Perdami. (2025). Laporan Prevalensi Gangguan Penglihatan pada Anak Indonesia. Jakarta." },
      { num: 3, text: "Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: prevalence, measurement and amelioration. BMJ Open Ophthalmology, 3(1)." },
      { num: 4, text: "American Academy of Ophthalmology. (2023). How to Prevent Myopia Progression. San Francisco: AAO.", url: "https://www.aao.org" },
      { num: 5, text: "Wu, P. C., et al. (2018). Myopia prevention and outdoor light intensity in a school-based cluster RCT. Ophthalmology, 125(8), 1239-1250." },
    ],
  },
];

export const ALTERNATIF_ARTICLES: Article[] = [
  {
    id: "alternatif-1",
    type: "alternatif",
    title: "9 Aktivitas Seru Pengganti Gadget untuk Anak di Rumah",
    category: "Aktivitas",
    date: "12 April 2025",
    readTime: "6 menit",
    author: "Tim Edukasi BijakGadget",
    role: "Edukator",
    img: IMG.boardGame,
    excerpt: "Aktivitas kreatif dan fisik bisa menjadi pengganti gadget yang menyenangkan sekaligus mendukung perkembangan anak.",
    lead: "Banyak orang tua kesulitan mencari aktivitas yang cukup menarik untuk menggantikan waktu layar anak. Padahal, ada banyak kegiatan yang bisa dilakukan di rumah tanpa gadget, sekaligus memperkuat bonding keluarga. Berikut 9 ide aktivitas yang bisa dicoba.",
    sections: [
      {
        heading: "Aktivitas Kreatif di Rumah",
        body: "Kegiatan seni dapat membantu anak mengekspresikan diri dan meningkatkan motorik halus. Anak juga belajar fokus dan bersabar saat membuat karya.",
        list: [
          "Mewarnai atau melukis dengan cat air",
          "Membuat kerajinan dari kertas bekas",
          "Membentuk plastisin atau clay",
          "Berkebun mini di pot kecil",
        ],
      },
      {
        heading: "Aktivitas Fisik yang Menyenangkan",
        body: "Selain kreativitas, anak juga membutuhkan aktivitas fisik yang cukup agar tubuhnya tetap sehat dan energik. Pilih aktivitas sederhana yang bisa dilakukan di dalam rumah atau halaman.",
        list: [
          "Senam ringan bersama keluarga",
          "Lomba halang rintang mini",
          "Bermain bola atau lompat tali",
          "Permainan tradisional seperti petak umpet",
        ],
      },
    ],
    references: [
      { num: 1, text: "WHO. (2020). Guidelines on Physical Activity for Children. Geneva: World Health Organization." },
      { num: 2, text: "CDC. (2022). Benefits of Physical Activity in Children. Atlanta: Centers for Disease Control and Prevention." },
    ],
  },
];
