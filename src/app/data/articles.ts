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

// --- IMAGE CONSTANTS ---
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

// =================== BERITA ARTICLES ===================
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
    excerpt: "Organisasi Kesehatan Dunia (WHO) kembali memperbarui panduan penggunaan layar bagi anak-anak usia 0–5 tahun, dengan penekanan lebih kuat pada interaksi fisik aktif.",
    lead: "Organisasi Kesehatan Dunia (WHO) secara resmi meluncurkan pembaruan pedoman screen time untuk anak usia dini pada April 2025. Pembaruan ini merupakan yang pertama sejak panduan awal diterbitkan pada 2019, dan muncul sebagai respons terhadap lonjakan penggunaan perangkat digital di kalangan anak-anak pasca-pandemi COVID-19.",
    sections: [
      {
        heading: "Isi Pembaruan Pedoman WHO",
        body: "Pedoman terbaru WHO menegaskan bahwa anak usia di bawah 2 tahun tidak dianjurkan menggunakan layar digital sama sekali, kecuali untuk video call. Untuk anak usia 3–4 tahun, batasan tetap pada 1 jam per hari dengan pengawasan ketat dari orang tua. Yang baru adalah penambahan panduan untuk anak usia 5 tahun yang memperkenalkan konsep 'screen time berkualitas' versus 'screen time pasif'.",
        list: [
          "Usia 0–2 tahun: tidak ada screen time, kecuali video call keluarga",
          "Usia 3–4 tahun: maksimal 1 jam per hari dengan pendampingan",
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
      { num: 4, text: "Madigan, S., et al. (2019). Association Between Screen Time and Children's Performance on a Developmental Screening Test. JAMA Pediatrics, 173(3), 244–250." },
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
        body: "Penelitian yang dipimpin oleh Dr. Ratna Dewi dari Departemen Pediatri Universitas Indonesia ini dilakukan selama 18 bulan dari 2023 hingga awal 2025. Para peneliti menemukan bahwa anak-anak yang menggunakan gadget dalam 1 jam sebelum tidur memiliki rata-rata waktu tidur 47 menit lebih singkat dibandingkan teman sebaya yang tidak melakukan hal tersebut. Paparan cahaya biru dari layar secara signifikan menekan produksi melatonin — hormon kunci pengatur siklus tidur.",
        list: [
          "70,3% anak SD mengalami minimal satu gejala gangguan tidur",
          "Rata-rata waktu tidur 47 menit lebih singkat pada pengguna gadget malam hari",
          "Kesulitan konsentrasi di kelas meningkat 38% pada kelompok kurang tidur",
          "65% anak memiliki gadget di dalam kamar tidur mereka",
        ],
      },
      {
        heading: "Dampak pada Prestasi Akademik",
        body: "Lebih lanjut, penelitian ini menghubungkan kualitas tidur yang buruk dengan penurunan prestasi akademik. Anak-anak dengan gangguan tidur menunjukkan nilai rata-rata 15–20% lebih rendah dalam mata pelajaran yang membutuhkan konsentrasi tinggi seperti Matematika dan Bahasa Indonesia. Para ahli merekomendasikan penerapan 'digital curfew' keluarga — yaitu mematikan semua perangkat digital setidaknya 60–90 menit sebelum waktu tidur anak.",
      },
    ],
    references: [
      { num: 1, text: "Dewi, R., et al. (2025). Hubungan Penggunaan Gadget Malam Hari dengan Kualitas Tidur Anak Usia Sekolah di Indonesia. Jurnal Pediatri Indonesia, 65(2), 112–121." },
      { num: 2, text: "Hale, L., & Guan, S. (2015). Screen time and sleep among school-aged children and adolescents: A systematic literature review. Sleep Medicine Reviews, 21, 50–58." },
      { num: 3, text: "American Academy of Pediatrics. (2016). Media and Young Minds. Pediatrics, 138(5).", url: "https://www.aap.org" },
      { num: 4, text: "Chang, A. M., et al. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. PNAS, 112(4), 1232–1237." },
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
    lead: "Kominfo resmi memberlakukan Peraturan Menteri Komunikasi dan Informatika Nomor 7 Tahun 2025 tentang Klasifikasi Konten Digital Anak. Regulasi ini mewajibkan semua platform Over-The-Top (OTT) yang beroperasi di Indonesia — termasuk Netflix, Disney+, YouTube, dan platform lokal — untuk menerapkan sistem rating konten yang seragam dan mudah dipahami orang tua.",
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
    lead: "Data terbaru dari Perhimpunan Dokter Spesialis Mata Indonesia (Perdami) mengungkapkan lonjakan dramatis kasus miopi (rabun jauh) pada anak usia sekolah. Dalam rentang waktu 2015 hingga 2025, prevalensi miopi pada anak usia 6–12 tahun di Indonesia meningkat lebih dari 300%, dari sekitar 5% menjadi hampir 20% dari total populasi kelompok usia tersebut.",
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
      { num: 2, text: "Holden, B. A., et al. (2016). Global Prevalence of Myopia and High Myopia and Temporal Trends from 2000 through 2050. Ophthalmology, 123(5), 1036–1042." },
      { num: 3, text: "Xiong, S., et al. (2017). Time spent in outdoor activities in relation to myopia prevention and control. Acta Ophthalmologica, 95(6), 551–566." },
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
        body: "Mendikbud menyatakan bahwa program ini merupakan bagian dari Peta Jalan Pendidikan Digital Indonesia 2025–2035. Pemerintah menargetkan pada 2030, minimal 80% siswa sekolah dasar di seluruh Indonesia telah mendapatkan pendidikan literasi digital yang terstruktur. Beberapa NGO dan perusahaan teknologi besar seperti Google Indonesia dan Tokopedia juga telah menyatakan kesiapan mereka untuk mendukung program ini melalui donasi perangkat dan pelatihan guru.",
      },
    ],
    references: [
      { num: 1, text: "Kemendikbudristek. (2025). Panduan Implementasi Program Literasi Digital Sehat. Jakarta: Kemdikbud Press." },
      { num: 2, text: "Salahudin, et al. (2023). Literasi Digital dan Dampaknya pada Perilaku Anak Sekolah Dasar. Jurnal Pendidikan Indonesia, 12(1), 45–58." },
      { num: 3, text: "UNICEF Indonesia. (2024). Keamanan Anak di Dunia Digital. Jakarta: UNICEF." , url: "https://www.unicef.org/indonesia" },
    ],
  },
];

// =================== BAHAYA ARTICLES ===================
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
    lead: "Di era digital ini, anak-anak menghabiskan rata-rata 4–6 jam sehari menatap layar gadget. Kebiasaan ini memiliki konsekuensi serius bagi kesehatan mata yang seringkali baru terasa dampaknya bertahun-tahun kemudian. Sebagai dokter spesialis mata, saya menyaksikan langsung lonjakan pasien anak dengan keluhan gangguan penglihatan yang hampir seluruhnya berkaitan dengan penggunaan gadget berlebih.",
    sections: [
      {
        heading: "Miopi: Epidemi Diam yang Mengintai",
        body: "Miopi atau rabun jauh terjadi ketika bola mata tumbuh terlalu panjang sehingga cahaya jatuh di depan retina, bukan tepat di atasnya. Penelitian menunjukkan bahwa membaca layar dalam jarak dekat secara terus-menerus merangsang pertumbuhan aksial bola mata yang berlebih. Setiap peningkatan satu dioptri miopi pada anak meningkatkan risiko kebutaan permanen pada usia lanjut hingga 67%. Ini bukan sekadar masalah harus memakai kacamata — ini adalah krisis kesehatan jangka panjang.",
        list: [
          "Membaca layar <30 cm selama >2 jam meningkatkan risiko miopi 2,6 kali lipat",
          "Anak-anak yang kurang paparan sinar matahari alami 4x lebih rentan terkena miopi",
          "Miopi berat (>6 dioptri) meningkatkan risiko ablasio retina, glaukoma, dan katarak",
          "Prevalensi miopi pada anak Indonesia melonjak dari 5% (2015) menjadi 19,8% (2025)",
        ],
      },
      {
        heading: "Digital Eye Strain: Sindrom Zaman Modern",
        body: "Selain miopi, Computer Vision Syndrome (CVS) atau Digital Eye Strain semakin umum pada anak-anak. Gejalanya meliputi mata merah, perih, gatal, penglihatan kabur sementara, sakit kepala, dan nyeri leher. Penyebabnya adalah berkurangnya frekuensi berkedip saat menatap layar (dari normal 15–20 kali/menit menjadi hanya 5–7 kali/menit), serta cahaya biru (blue light) bereaksi dengan molekul di retina. Terapkan aturan 20-20-20 dan pastikan pencahayaan ruangan yang cukup untuk meminimalkan risiko ini.",
      },
    ],
    references: [
      { num: 1, text: "Holden, B. A., et al. (2016). Global Prevalence of Myopia and High Myopia. Ophthalmology, 123(5), 1036–1042." },
      { num: 2, text: "Perdami. (2025). Laporan Prevalensi Gangguan Penglihatan pada Anak Indonesia. Jakarta." },
      { num: 3, text: "Sheppard, A. L., & Wolffsohn, J. S. (2018). Digital eye strain: prevalence, measurement and amelioration. BMJ Open Ophthalmology, 3(1)." },
      { num: 4, text: "American Academy of Ophthalmology. (2023). How to Prevent Myopia Progression. San Francisco: AAO.", url: "https://www.aao.org" },
      { num: 5, text: "Wu, P. C., et al. (2018). Myopia prevention and outdoor light intensity in a school-based cluster RCT. Ophthalmology, 125(8), 1239–1250." },
    ],
  },
  {
    id: "bahaya-2",
    type: "bahaya",
    title: "Dampak Gadget Berlebih pada Perkembangan Otak Anak Usia Dini",
    category: "Neurosains",
    date: "24 April 2025",
    readTime: "8 menit",
    author: "Prof. Dr. Siti Rahayu, Sp.KJ",
    role: "Psikolog Klinis Anak",
    img: IMG.screen,
    excerpt: "Penelitian neurosains terkini menunjukkan bahwa paparan layar berlebih pada usia dini dapat mengubah struktur otak anak, menghambat perkembangan bahasa, dan menurunkan kemampuan regulasi emosi.",
    lead: "Otak anak usia 0–6 tahun adalah organ yang paling plastis dan responsif terhadap stimulus lingkungan sepanjang kehidupan manusia. Setiap pengalaman yang dialami anak — termasuk paparan layar digital — secara harfiah membentuk koneksi saraf yang akan memengaruhi kecerdasan, perilaku, dan kesehatan mental mereka seumur hidup. Inilah mengapa para ilmuwan neurosains sangat menaruh perhatian serius pada fenomena 'screen time dini' yang kini menjadi kebiasaan jutaan keluarga di dunia.",
    sections: [
      {
        heading: "Apa yang Terjadi di Dalam Otak",
        body: "Studi neuroimaging (fMRI) yang dipublikasikan dalam JAMA Pediatrics menemukan bahwa anak usia 3–5 tahun dengan screen time >1 jam per hari menunjukkan integritas white matter yang lebih rendah di area otak yang berkaitan dengan bahasa, kemampuan membaca cepat, dan regulasi emosi. White matter adalah 'kabel' yang menghubungkan berbagai area otak — dan integritas white matter yang rendah berarti komunikasi antar-area otak tersebut kurang efisien.",
        list: [
          "Paparan layar berlebih menghambat perkembangan korteks prefrontal (area perencanaan dan kontrol diri)",
          "Konten yang berubah cepat (fast-paced media) melatih otak untuk tidak bisa fokus pada stimulasi lambat",
          "Berkurangnya interaksi tatap muka menghambat perkembangan 'teori pikiran' (kemampuan memahami perasaan orang lain)",
          "Defisit dalam kemampuan bahasa reseptif dan ekspresif pada anak dengan screen time tinggi",
        ],
      },
      {
        heading: "Interaksi Manusia: Tidak Bisa Digantikan Teknologi",
        body: "Dr. Patricia Kuhl dari University of Washington membuktikan bahwa bayi hanya dapat belajar bahasa dari interaksi dengan manusia nyata, bukan dari video atau layar. Penelitiannya menunjukkan bahwa bayi yang terpapar Mandarin melalui video selama berminggu-minggu tidak menunjukkan kemampuan diskriminasi bunyi Mandarin sama sekali, sementara bayi yang mendapat sesi bersama penutur asli Mandarin selama 12 sesi (hanya 5–6 jam total) menunjukkan kemampuan yang sama dengan bayi yang dibesarkan di Taiwan. Ini membuktikan betapa pentingnya interaksi langsung manusia versus layar.",
      },
    ],
    references: [
      { num: 1, text: "Cheng, S., et al. (2020). Association of screen time in early childhood with executive function, cognitive function. JAMA Pediatrics, 174(11)." },
      { num: 2, text: "Hutton, J. S., et al. (2020). Associations Between Screen-Based Media Use and Brain White Matter Integrity in Preschool-Aged Children. JAMA Pediatrics, 174(1)." },
      { num: 3, text: "Kuhl, P. K. (2007). Is speech learning 'gated' by the social brain? Developmental Science, 10(1), 110–120." },
      { num: 4, text: "IDAI. (2023). Dampak Media Digital pada Perkembangan Anak. Jakarta: Ikatan Dokter Anak Indonesia." },
    ],
  },
  {
    id: "bahaya-3",
    type: "bahaya",
    title: "Gangguan Tidur pada Anak Akibat Paparan Gadget: Fakta dan Solusi",
    category: "Kesehatan Tidur",
    date: "17 April 2025",
    readTime: "6 menit",
    author: "dr. Budi Santoso, SpA",
    role: "Dokter Spesialis Anak",
    img: IMG.dark,
    excerpt: "Cahaya biru dari layar gadget mengganggu produksi melatonin, menyebabkan anak sulit tidur, tidur lebih larut, dan bangun tidak segar — berdampak langsung pada prestasi dan pertumbuhan.",
    lead: "Tidur berkualitas bukan sekadar kebutuhan fisik — bagi anak-anak, tidur adalah saat di mana otak memproses informasi, memperkuat memori jangka panjang, dan memproduksi hormon pertumbuhan (growth hormone) dalam jumlah terbesar. Gangguan tidur kronis pada anak bukan hanya membuat mereka mengantuk di kelas, tetapi secara fundamental menghambat perkembangan fisik dan kognitif mereka.",
    sections: [
      {
        heading: "Mekanisme Blue Light dan Melatonin",
        body: "Kelenjar pineal di otak memproduksi melatonin (hormon tidur) sebagai respons terhadap gelap. Namun, cahaya biru (wavelength 460–490 nm) yang dipancarkan layar gadget sangat efektif dalam menekan produksi melatonin — bahkan lebih efektif daripada cahaya putih biasa. Penelitian menunjukkan bahwa paparan 2 jam cahaya tablet di malam hari menekan produksi melatonin hingga 38% dan menunda onset tidur rata-rata 1,5 jam pada anak-anak. Akibatnya, meski anak sudah di tempat tidur, mereka tidak bisa tertidur.",
        list: [
          "Paparan layar malam hari menekan melatonin hingga 38% pada anak-anak",
          "Anak yang tidur kurang dari 9 jam berisiko 2x lebih tinggi mengalami obesitas",
          "Kurang tidur kronik menurunkan konsentrasi, memori kerja, dan kemampuan belajar",
          "Hormon pertumbuhan diproduksi 70–80% saat tidur nyenyak (slow-wave sleep)",
        ],
      },
      {
        heading: "Solusi Praktis untuk Orang Tua",
        body: "Solusi yang direkomendasikan para ahli tidak harus dramatis. Langkah pertama adalah mengeluarkan semua gadget dari kamar tidur anak dan membuat 'charging station' keluarga di ruang tamu. Kedua, terapkan 'screen sunset' — matikan semua layar 60–90 menit sebelum waktu tidur yang ditetapkan. Gantikan dengan rutinitas pre-tidur yang menenangkan: mandi air hangat, membaca buku fisik, atau storytelling. Jika perlu, aktifkan mode 'Night Mode' atau filter cahaya biru pada semua perangkat keluarga.",
      },
    ],
    references: [
      { num: 1, text: "Chang, A. M., et al. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing. PNAS, 112(4), 1232–1237." },
      { num: 2, text: "Janssen, X., et al. (2020). Associations of screen time, sedentary time and physical activity with sleep in under 5s. Sleep Medicine Reviews, 49." },
      { num: 3, text: "National Sleep Foundation. (2023). Children and Sleep. Washington DC: NSF.", url: "https://www.sleepfoundation.org" },
      { num: 4, text: "Twenge, J. M., & Campbell, W. K. (2019). Media Use Is Linked to Lower Psychological Well-Being. Preventive Medicine Reports, 13, 271–277." },
    ],
  },
  {
    id: "bahaya-4",
    type: "bahaya",
    title: "Obesitas dan Postur Buruk: Dampak Fisik Nyata Screen Time Berlebih",
    category: "Kesehatan Fisik",
    date: "10 April 2025",
    readTime: "6 menit",
    author: "dr. Dewi Kusuma, SpOG",
    role: "Ahli Gizi dan Kesehatan Anak",
    img: IMG.tablet,
    excerpt: "Gaya hidup sedentari akibat penggunaan gadget berlebih meningkatkan risiko obesitas hingga dua kali lipat dan menyebabkan masalah postur kronis yang semakin umum pada anak-anak.",
    lead: "Ketika seorang anak duduk diam menatap layar selama berjam-jam, tubuhnya bukan sekadar tidak bergerak — proses metabolisme melambat, otot-otot melemah, dan postur tulang belakang terpengaruh dalam pola yang bisa menjadi permanen jika dibiarkan. Inilah yang oleh para dokter disebut sebagai 'sindrom gaya hidup sedentari', dan gadget adalah penyebab utama merebaknya sindrom ini pada generasi anak-anak saat ini.",
    sections: [
      {
        heading: "Gadget dan Krisis Obesitas Anak",
        body: "Hubungan antara screen time dan obesitas anak bersifat multi-faktor. Pertama, waktu di depan layar adalah waktu yang diambil dari aktivitas fisik. Kedua, menonton konten di gadget dikaitkan dengan meningkatnya konsumsi makanan ringan tidak sehat (mindless eating). Ketiga, paparan iklan makanan tidak sehat dalam konten digital secara aktif mendorong preferensi makanan tidak sehat pada anak. WHO memperkirakan 340 juta anak dan remaja di seluruh dunia mengalami kelebihan berat badan atau obesitas — dan angka ini terus meningkat seiring dengan peningkatan screen time global.",
        list: [
          "Setiap 1 jam tambahan screen time meningkatkan risiko obesitas 12% pada anak-anak",
          "'Text neck' (nyeri leher akibat menunduk ke gadget) kini ditemukan pada anak seusia 8 tahun",
          "Duduk >4 jam/hari dikaitkan dengan penurunan kepadatan tulang dan kekuatan otot",
          "Anak obesitas 3x lebih berisiko mengalami gangguan sendi dan pernapasan saat dewasa",
        ],
      },
      {
        heading: "Masalah Postur: 'Text Neck' pada Anak",
        body: "Kondisi yang disebut 'text neck' — ketegangan otot leher dan tulang belakang bagian atas akibat menundukkan kepala ke layar — kini bukan lagi eksklusif untuk orang dewasa. Ahli ortopedi anak melaporkan peningkatan signifikan kasus nyeri leher, bahu, dan punggung pada anak usia 8–15 tahun. Kepala manusia rata-rata berbobot 5–6 kg dalam posisi tegak, namun saat menunduk 60 derajat ke layar, beban efektif yang harus ditanggung tulang leher mencapai 27 kg. Bayangkan beban ini ditanggung tulang leher anak selama 4–6 jam sehari.",
      },
    ],
    references: [
      { num: 1, text: "WHO. (2024). Obesity and Overweight in Children. Geneva: World Health Organization.", url: "https://www.who.int" },
      { num: 2, text: "Biswas, A., et al. (2015). Sedentary time and its association with risk for disease incidence, mortality, and hospitalization. Annals of Internal Medicine, 162(2), 123–132." },
      { num: 3, text: "Hansraj, K. K. (2014). Assessment of stresses in the cervical spine caused by posture. Surgical Technology International, 25, 277–279." },
      { num: 4, text: "Ekelund, U., et al. (2019). Dose-response associations between accelerometry measured physical activity and sedentary time and all cause mortality. BMJ, 366." },
    ],
  },
  {
    id: "bahaya-5",
    type: "bahaya",
    title: "Isolasi Sosial: Ketika Layar Menggantikan Teman Nyata Anak",
    category: "Psikologi Sosial",
    date: "3 April 2025",
    readTime: "7 menit",
    author: "Dra. Ratna Wulandari, M.Psi",
    role: "Psikolog Perkembangan Anak",
    img: IMG.family,
    excerpt: "Anak-anak yang terlalu banyak berinteraksi dengan dunia digital cenderung kehilangan kemampuan sosial esensial, empati, dan kepercayaan diri dalam lingkungan nyata.",
    lead: "Manusia adalah makhluk sosial yang membutuhkan interaksi tatap muka untuk berkembang secara psikologis. Dalam 10.000 tahun evolusi manusia, keterampilan sosial kita — kemampuan membaca ekspresi wajah, memahami nada suara, merespons isyarat non-verbal — berkembang melalui jutaan jam interaksi langsung antar manusia. Dalam satu dekade, gadget telah mengganggu proses evolusioner ini secara fundamental, terutama pada generasi yang tumbuh dengan layar di genggaman.",
    sections: [
      {
        heading: "Hilangnya Keterampilan Sosial Fundamental",
        body: "Penelitian dari UCLA yang dipublikasikan di Computers in Human Behavior menemukan bahwa anak-anak usia 11–12 tahun yang menjalani 5 hari tanpa gadget (di sebuah camp alam) menunjukkan peningkatan dramatis dalam kemampuan membaca emosi wajah dibandingkan kelompok kontrol. Ini membuktikan bahwa otak anak sangat plastis dan keterampilan sosial dapat kembali berkembang ketika ada cukup interaksi manusia nyata — namun juga menunjukkan betapa screen time berlebih mengikis kemampuan tersebut.",
        list: [
          "Anak dengan screen time tinggi menunjukkan skor empati 20–30% lebih rendah dalam tes standar",
          "Interaksi via teks/pesan menghilangkan 93% informasi komunikasi (nada suara, ekspresi wajah)",
          "Anak yang lebih sering online memiliki lebih sedikit teman dekat di dunia nyata",
          "Kesepian kronis pada remaja meningkat 48% sejak 2012 — bersamaan dengan ledakan smartphone",
        ],
      },
      {
        heading: "Dampak pada Kesehatan Mental Jangka Panjang",
        body: "Jean Twenge, seorang psikolog dari San Diego State University, menunjukkan dalam bukunya 'iGen' bahwa generasi yang tumbuh dengan smartphone mengalami lonjakan tingkat depresi, kecemasan, dan kesepian yang belum pernah terjadi sebelumnya. Di Indonesia, data Riset Kesehatan Dasar 2023 menunjukkan prevalensi masalah mental emosional pada remaja mencapai 9,8% — dan para ahli menduga angka ini terus meningkat seiring meningkatnya penggunaan media sosial.",
      },
    ],
    references: [
      { num: 1, text: "Uhls, Y. T., et al. (2014). Five days at outdoor education camp without screens improves preteen skills with nonverbal emotion cues. Computers in Human Behavior, 39, 387–392." },
      { num: 2, text: "Twenge, J. M. (2017). iGen: Why Today's Super-Connected Kids Are Growing Up Less Rebellious. Atria Books." },
      { num: 3, text: "Kemenkes RI. (2023). Riset Kesehatan Dasar 2023. Jakarta: Badan Penelitian dan Pengembangan Kesehatan." },
      { num: 4, text: "Pew Research Center. (2023). Teens, Social Media and Technology 2023. Washington DC: Pew Research.", url: "https://www.pewresearch.org" },
    ],
  },
  {
    id: "bahaya-6",
    type: "bahaya",
    title: "Adiksi Gadget pada Anak: Tanda, Risiko, dan Cara Menanganinya",
    category: "Psikologi Klinis",
    date: "27 Maret 2025",
    readTime: "8 menit",
    author: "Prof. Dr. Siti Rahayu, Sp.KJ",
    role: "Psikiater Anak dan Remaja",
    img: IMG.screen,
    excerpt: "Adiksi digital kini diakui sebagai gangguan perilaku nyata. Kenali tanda-tanda kecanduan gadget pada anak dan langkah-langkah intervensi yang terbukti efektif.",
    lead: "Pada 2022, WHO secara resmi mengakui 'Gaming Disorder' sebagai gangguan mental dalam International Classification of Diseases (ICD-11). Namun, adiksi digital pada anak jauh lebih luas dari sekadar kecanduan game — ini mencakup ketergantungan kompulsif pada media sosial, YouTube, dan konten digital lainnya yang secara fundamental mengubah perilaku, suasana hati, dan fungsi sosial anak.",
    sections: [
      {
        heading: "Tanda-tanda Adiksi Gadget pada Anak",
        body: "Secara klinis, adiksi gadget ditandai oleh beberapa karakteristik kunci yang membedakannya dari sekadar 'suka bermain gadget'. Kuncinya adalah ketika penggunaan gadget mulai mengganggu fungsi kehidupan sehari-hari anak secara signifikan. Orang tua perlu waspada jika anak menunjukkan perubahan perilaku yang konsisten berkaitan dengan penggunaan gadget.",
        list: [
          "Marah, sedih, atau cemas berlebihan saat gadget diambil atau dibatasi (withdrawal)",
          "Terus meningkatkan durasi penggunaan untuk mendapat kepuasan yang sama (toleransi)",
          "Gagal dalam upaya berulang untuk mengurangi penggunaan sendiri",
          "Mengabaikan PR, hobi, dan interaksi dengan keluarga demi gadget",
          "Berbohong tentang berapa lama menggunakan gadget",
          "Menggunakan gadget sebagai satu-satunya cara mengatasi kebosanan atau stres",
        ],
      },
      {
        heading: "Intervensi yang Terbukti Efektif",
        body: "Penanganan adiksi gadget pada anak memerlukan pendekatan yang konsisten dan multi-modal. Penelitian menunjukkan bahwa larangan total justru sering kontraproduktif dan menimbulkan konflik keluarga. Pendekatan yang lebih efektif adalah 'harm reduction' — secara bertahap mengurangi screen time sambil mengisi waktu dengan alternatif yang memuaskan secara psikologis. Terapi perilaku kognitif (CBT) yang disesuaikan untuk adiksi digital juga terbukti efektif pada kasus yang lebih berat. Paling penting: orang tua perlu menjadi contoh yang baik dalam penggunaan gadget.",
      },
    ],
    references: [
      { num: 1, text: "WHO. (2022). ICD-11: Gaming Disorder. Geneva: World Health Organization.", url: "https://www.who.int/standards/classifications/classification-of-diseases" },
      { num: 2, text: "Kuss, D. J., & Griffiths, M. D. (2012). Internet gaming addiction: A systematic review of empirical research. International Journal of Mental Health and Addiction, 10(2), 278–296." },
      { num: 3, text: "American Psychological Association. (2023). Screen Time and Children. Washington DC: APA.", url: "https://www.apa.org" },
      { num: 4, text: "Andreassen, C. S. (2015). Online social network site addiction: A comprehensive review. Current Addiction Reports, 2(2), 175–184." },
      { num: 5, text: "KPAI. (2024). Laporan Pengaduan Kasus Adiksi Digital pada Anak 2024. Jakarta: KPAI." },
    ],
  },
];

// =================== ALTERNATIF ARTICLES ===================
export const ALTERNATIF_ARTICLES: Article[] = [
  {
    id: "alternatif-1",
    type: "alternatif",
    title: "Petualangan Alam: Menemukan Dunia Nyata yang Lebih Seru dari Layar",
    category: "Alam & Lingkungan",
    date: "3 Mei 2025",
    readTime: "5 menit",
    author: "Tim BijakGadget",
    role: "Kontributor",
    img: IMG.outdoor,
    excerpt: "Bermain di alam terbuka bukan hanya menyenangkan — penelitian membuktikan manfaatnya luar biasa bagi perkembangan fisik, mental, dan kognitif anak secara bersamaan.",
    lead: "Selama ribuan tahun, alam adalah taman bermain utama anak-anak manusia. Namun dalam dua dekade terakhir, layar digital telah merebut posisi itu. Kabar baiknya: kembali ke alam tidak membutuhkan peralatan mahal atau perjalanan jauh. Halaman rumah, taman kota, atau bahkan pot tanaman di balkon bisa menjadi pintu masuk menuju dunia petualangan yang sesungguhnya.",
    sections: [
      {
        heading: "Mengapa Alam Begitu Penting bagi Anak?",
        body: "Teori Restorasi Perhatian (Attention Restoration Theory) yang dikembangkan oleh Kaplan & Kaplan menjelaskan bahwa alam memberikan jenis stimulasi yang memungkinkan otak anak untuk 'mengisi ulang daya' setelah kelelahan dari fokus yang diarahkan (directed attention) — seperti yang terjadi saat menggunakan gadget. Studi dari University of Illinois menemukan bahwa anak-anak dengan ADHD menunjukkan peningkatan konsentrasi yang signifikan setelah hanya 20 menit berjalan di taman, dibandingkan berjalan di lingkungan perkotaan.",
        list: [
          "Bermain di alam 2 jam per hari mengurangi risiko miopi hingga 50%",
          "Paparan sinar matahari pagi meningkatkan produksi vitamin D dan serotonin",
          "Kontak dengan tanah dan alam meningkatkan keanekaragaman mikrobiom usus yang mendukung imunitas",
          "Anak yang sering bermain di alam menunjukkan kreativitas dan kemampuan pemecahan masalah lebih tinggi",
        ],
      },
      {
        heading: "Ide Aktivitas Alam untuk Berbagai Usia",
        body: "Untuk anak usia 3–6 tahun: koleksi daun dan batu, mengamati serangga, berkebun menanam biji. Untuk usia 7–12 tahun: memancing, bersepeda, orienteering sederhana, membuat herbarium. Untuk remaja: hiking, berkemah, fotografi alam, berkebun sayuran. Orang tua tidak perlu menjadi ahli alam — cukup menemani, mengajukan pertanyaan terbuka, dan membiarkan rasa penasaran anak memimpin. Ingat: proses eksplorasi jauh lebih berharga daripada hasilnya.",
      },
    ],
    references: [
      { num: 1, text: "Kaplan, R., & Kaplan, S. (1989). The Experience of Nature: A Psychological Perspective. Cambridge University Press." },
      { num: 2, text: "Kuo, F. E., & Taylor, A. F. (2004). A potential natural treatment for Attention-Deficit/Hyperactivity Disorder. American Journal of Public Health, 94(9), 1580–1586." },
      { num: 3, text: "Louv, R. (2008). Last Child in the Woods: Saving Our Children From Nature-Deficit Disorder. Algonquin Books." },
      { num: 4, text: "Chawla, L. (2015). Benefits of nature contact for children. Journal of Planning Literature, 30(4), 433–452." },
    ],
  },
  {
    id: "alternatif-2",
    type: "alternatif",
    title: "Seni dan Kreasi: Membangkitkan Imajinasi Anak Melalui Karya Tangan",
    category: "Seni & Kreativitas",
    date: "27 April 2025",
    readTime: "5 menit",
    author: "Tim BijakGadget",
    role: "Kontributor",
    img: IMG.drawing,
    excerpt: "Melukis, menggambar, dan kerajinan tangan bukan sekadar hobi — aktivitas seni secara ilmiah terbukti meningkatkan kecerdasan emosional, motorik halus, dan kemampuan matematika anak.",
    lead: "Ketika seorang anak memegang kuas dan mulai menggoreskan warna di kanvas, bukan hanya tangannya yang bekerja — otaknya sedang melakukan aktivitas yang sangat kompleks: memvisualisasikan hasil akhir, merencanakan langkah, mengontrol gerakan halus, dan terus-menerus mengevaluasi serta menyesuaikan. Aktivitas seni adalah salah satu latihan otak paling komprehensif yang bisa diberikan orang tua kepada anaknya.",
    sections: [
      {
        heading: "Manfaat Ilmiah Aktivitas Seni pada Anak",
        body: "Penelitian dalam bidang neurosains seni (neuroaesthetics) menunjukkan bahwa proses membuat karya seni mengaktifkan jaringan otak yang sangat luas — termasuk area visual, motorik, dan limbik (emosi). Anak-anak yang secara rutin terlibat dalam aktivitas seni menunjukkan kemampuan yang lebih baik dalam matematika dan sains, karena keduanya membutuhkan visualisasi spasial dan pemikiran kreatif yang dilatih melalui seni.",
        list: [
          "Melukis dan menggambar melatih koordinasi mata-tangan yang penting untuk menulis",
          "Seni mendorong anak untuk toleran terhadap ketidakpastian dan tidak takut mencoba hal baru",
          "Kerajinan tangan melatih kesabaran, ketekunan, dan kemampuan mengikuti instruksi bertahap",
          "Ekspresi artistik menyediakan 'katup' emosional yang sehat untuk anak-anak",
        ],
      },
      {
        heading: "Memulai Aktivitas Seni di Rumah",
        body: "Memulai tidak membutuhkan studio seni atau peralatan mahal. Sediakan 'sudut kreatif' sederhana dengan kertas, krayon, cat air, tanah liat, atau bahkan material daur ulang. Yang terpenting adalah membiarkan anak bereksperimen bebas tanpa terlalu banyak diarahkan. Hindari mengomentari 'ini gambar apa?' — sebaliknya, tanyakan 'ceritakan tentang karyamu'. Validasi proses, bukan hanya hasil akhir.",
      },
    ],
    references: [
      { num: 1, text: "Hamblen, K. A. (1993). Theories and research that support art instruction for instrumental outcomes. Theory Into Practice, 32(4), 191–198." },
      { num: 2, text: "Winner, E., & Cooper, M. (2000). Mute those claims: No evidence (yet) for a causal link between arts study and academic achievement. Journal of Aesthetic Education, 34(3/4), 11–75." },
      { num: 3, text: "Eisner, E. (2002). The Arts and the Creation of Mind. Yale University Press." },
      { num: 4, text: "Hetland, L., et al. (2013). Studio Thinking 2: The Real Benefits of Visual Arts Education. Teachers College Press." },
    ],
  },
  {
    id: "alternatif-3",
    type: "alternatif",
    title: "Olahraga dan Aktivitas Fisik: Investasi Terbaik untuk Tumbuh Kembang Anak",
    category: "Kesehatan Fisik",
    date: "20 April 2025",
    readTime: "6 menit",
    author: "Tim BijakGadget",
    role: "Kontributor",
    img: IMG.sports,
    excerpt: "Aktivitas fisik bukan hanya baik untuk tubuh anak — olahraga teratur terbukti meningkatkan fungsi otak, prestasi akademik, dan kesehatan mental secara bersamaan.",
    lead: "Sebuah temuan riset yang mengejutkan: anak-anak yang berolahraga secara teratur tidak hanya lebih sehat secara fisik, tetapi juga mendapat nilai lebih tinggi di sekolah, lebih jarang mengalami depresi dan kecemasan, serta memiliki keterampilan sosial yang lebih baik. Olahraga adalah 'obat' alami paling komprehensif yang tersedia untuk anak-anak, dan tidak membutuhkan resep dokter.",
    sections: [
      {
        heading: "Bagaimana Olahraga Membuat Otak Lebih Cerdas",
        body: "Setiap kali anak berlari, melompat, atau bersepeda, jantungnya memompa lebih banyak darah ke otak. Ini meningkatkan pengiriman oksigen dan glukosa — dua 'bahan bakar' utama neuron otak. Lebih dari itu, olahraga merangsang produksi BDNF (Brain-Derived Neurotrophic Factor) — protein yang oleh para ilmuwan disebut sebagai 'pupuk untuk otak' karena mendorong pertumbuhan neuron baru dan memperkuat koneksi saraf yang ada, terutama di area hippocampus yang berperan dalam memori dan belajar.",
        list: [
          "WHO merekomendasikan minimal 60 menit aktivitas fisik sedang-hingga-berat per hari untuk anak 5–17 tahun",
          "Olahraga aerobik 3x seminggu meningkatkan volume hippocampus (area memori otak) pada anak",
          "Anak yang aktif secara fisik menunjukkan kemampuan konsentrasi 20% lebih baik di kelas",
          "Olahraga tim mengajarkan kerja sama, kepemimpinan, dan manajemen kalah-menang",
        ],
      },
      {
        heading: "Aktivitas yang Bisa Dimulai Hari Ini",
        body: "Tidak perlu mendaftarkan anak ke klub olahraga mahal untuk memulai. Bermain kejar-kejaran, lompat tali, dan sepak bola di halaman adalah awal yang sempurna. Untuk anak yang lebih pemalu, yoga anak atau bela diri seperti taekwondo bisa menjadi pilihan yang baik karena lebih individual namun tetap mengajarkan disiplin dan keterampilan. Kuncinya adalah menemukan aktivitas yang benar-benar dinikmati anak — keberlanjutan jauh lebih penting daripada intensitas.",
      },
    ],
    references: [
      { num: 1, text: "WHO. (2020). WHO Guidelines on Physical Activity and Sedentary Behaviour. Geneva: World Health Organization.", url: "https://www.who.int" },
      { num: 2, text: "Hillman, C. H., et al. (2008). Be smart, exercise your heart: exercise effects on brain and cognition. Nature Reviews Neuroscience, 9, 58–65." },
      { num: 3, text: "Ratey, J. J. (2008). Spark: The Revolutionary New Science of Exercise and the Brain. Little, Brown and Company." },
      { num: 4, text: "IDAI. (2022). Panduan Aktivitas Fisik untuk Anak dan Remaja Indonesia. Jakarta: IDAI." },
    ],
  },
  {
    id: "alternatif-4",
    type: "alternatif",
    title: "Membaca Buku: Jendela Dunia yang Tak Tergantikan oleh Layar Digital",
    category: "Literasi",
    date: "13 April 2025",
    readTime: "5 menit",
    author: "Tim BijakGadget",
    role: "Kontributor",
    img: IMG.reading,
    excerpt: "Membaca buku fisik memberikan manfaat kognitif yang berbeda dan lebih dalam dibandingkan membaca di layar. Temukan cara menumbuhkan kecintaan membaca pada anak sejak dini.",
    lead: "Di era Netflix dan YouTube, membaca buku mungkin terasa kuno. Namun sains membuktikan sebaliknya: membaca buku fisik mengaktifkan jaringan otak yang jauh lebih kompleks dibandingkan menonton video, dan manfaat kognitif jangka panjangnya tidak tertandingi oleh medium digital manapun. Anak yang membaca dengan penuh perhatian mengembangkan kemampuan berpikir kritis, empati, dan imajinasi yang menjadi fondasi kecerdasan sejati.",
    sections: [
      {
        heading: "Sains di Balik Kekuatan Membaca",
        body: "Peneliti neurosains Maryanne Wolf menjelaskan dalam bukunya 'Proust and the Squid' bahwa membaca buku yang kompleks melatih otak untuk melakukan 'pembacaan mendalam' (deep reading) — sebuah proses yang melibatkan analisis, inferensi, pemikiran kritis, dan koneksi dengan pengetahuan yang sudah ada. Proses ini berbeda secara fundamental dari membaca cepat konten digital. Anak yang terbiasa deep reading memiliki keunggulan signifikan dalam kemampuan berpikir kritis dan pemahaman akademis.",
        list: [
          "Membaca fiksi meningkatkan empati dengan melatih otak 'merasakan' perspektif karakter lain",
          "15 menit membaca per hari dapat membuat anak membaca 1 juta kata lebih per tahun",
          "Anak yang dibacakan cerita sejak bayi memiliki kosakata 2–3x lebih kaya saat masuk SD",
          "Membaca sebelum tidur (buku fisik) membantu relaksasi dan meningkatkan kualitas tidur",
        ],
      },
      {
        heading: "Menumbuhkan Kecintaan Membaca",
        body: "Kunci menumbuhkan minat baca bukan dengan memaksa — tapi dengan membuat membaca menjadi pengalaman yang menyenangkan dan personal. Biarkan anak memilih buku sendiri sesuai minat mereka, bahkan jika itu komik atau buku tentang dinosaurus. Bacakan cerita dengan suara keras dan ekspresif, bahkan untuk anak yang sudah bisa membaca sendiri — ini adalah waktu bonding yang berharga sekaligus menunjukkan bahwa membaca adalah aktivitas menyenangkan yang dihargai orang tua.",
      },
    ],
    references: [
      { num: 1, text: "Wolf, M. (2007). Proust and the Squid: The Story and Science of the Reading Brain. HarperCollins." },
      { num: 2, text: "Cunningham, A. E., & Stanovich, K. E. (1998). What reading does for the mind. American Educator, 22(1–2), 8–15." },
      { num: 3, text: "Mar, R. A., et al. (2006). Bookworms versus nerds: Exposure to fiction versus non-fiction, divergent associations with social ability. Journal of Research in Personality, 40(5), 694–712." },
      { num: 4, text: "Perpusnas RI. (2024). Indeks Membaca Nasional 2024. Jakarta: Perpustakaan Nasional RI." },
    ],
  },
  {
    id: "alternatif-5",
    type: "alternatif",
    title: "Permainan Logika dan Board Game: Mengasah Otak Tanpa Layar",
    category: "Permainan Edukatif",
    date: "6 April 2025",
    readTime: "5 menit",
    author: "Tim BijakGadget",
    role: "Kontributor",
    img: IMG.boardGame,
    excerpt: "Board game, catur, puzzle, dan permainan kartu bukan sekadar hiburan — penelitian membuktikan manfaatnya luar biasa untuk kecerdasan, strategi, dan kemampuan sosial anak.",
    lead: "Di rak toko, board game modern bukan hanya 'Monopoli versi baru' — ini adalah sistem pembelajaran yang dirancang oleh para perancang permainan berbakat untuk mengembangkan keterampilan spesifik seperti pemikiran strategis, manajemen risiko, negosiasi, dan kolaborasi. Dan tidak seperti video game, board game secara inheren membutuhkan kehadiran fisik dan interaksi sosial nyata — menjadikannya alat yang sempurna untuk kebersamaan keluarga.",
    sections: [
      {
        heading: "Manfaat Kognitif yang Didukung Penelitian",
        body: "Catur adalah contoh paling banyak diteliti. Sebuah meta-analisis yang menggabungkan data dari 24 studi menemukan bahwa bermain catur secara signifikan meningkatkan kemampuan matematika, membaca, dan pemecahan masalah pada anak-anak sekolah. Manfaat ini tidak terbatas pada catur — permainan strategi apa pun yang melibatkan perencanaan ke depan, evaluasi konsekuensi, dan pengambilan keputusan di bawah ketidakpastian memberikan manfaat kognitif serupa.",
        list: [
          "Catur meningkatkan kemampuan matematika dan membaca dalam meta-analisis dari 24 studi",
          "Puzzle melatih visualisasi spasial yang berhubungan dengan prestasi STEM",
          "Board game kooperatif mengajarkan negosiasi, kompromi, dan kerja sama tim",
          "Bermain kartu melatih memori kerja, kalkulasi probabilitas, dan strategi adaptif",
        ],
      },
      {
        heading: "Rekomendasi Board Game per Usia",
        body: "Usia 4–6 tahun: Zingo, Candy Land, Hoot Owl Hoot (game kooperatif pertama). Usia 7–10 tahun: Ticket to Ride Junior, Forbidden Island, catur, dan congklak. Usia 11–14 tahun: Catan, Pandemic, Wingspan. Usia 15+: Codenames, Sherlock Holmes Consulting Detective, Arkham Horror. Untuk permainan lokal: congklak, gobak sodor, dan ular tangga masih memiliki nilai edukatif yang tidak kalah dari board game modern.",
      },
    ],
    references: [
      { num: 1, text: "Sala, G., & Gobet, F. (2016). Do the benefits of chess instruction transfer to academic and cognitive skills? Educational Research Review, 18, 46–57." },
      { num: 2, text: "Uttal, D. H., et al. (2013). The malleability of spatial skills: A meta-analysis of training studies. Psychological Bulletin, 139(2), 352–402." },
      { num: 3, text: "Lancy, D. F., & Tindall, B. A. (1976). The study of play, games and sports: A reference guide. ERIC." },
      { num: 4, text: "PISA. (2022). Indonesia Country Report on Problem-Solving Skills. Paris: OECD." },
    ],
  },
  {
    id: "alternatif-6",
    type: "alternatif",
    title: "Musik dan Seni Pertunjukan: Ketika Anak Menemukan Bakat Tembunyi",
    category: "Seni Musik",
    date: "30 Maret 2025",
    readTime: "5 menit",
    author: "Tim BijakGadget",
    role: "Kontributor",
    img: IMG.active,
    excerpt: "Belajar alat musik atau menari bukan sekadar mengembangkan bakat seni — penelitian menunjukkan manfaat kognitif, sosial, dan emosional yang luar biasa bagi anak-anak.",
    lead: "Ada sesuatu yang luar biasa terjadi di otak seorang anak yang sedang memainkan alat musik: hampir seluruh korteks serebral aktif serentak — area visual memproses notasi, area motorik mengontrol gerakan jari, area auditori memproses suara, area emosi merespons melodi. Para ilmuwan menyebut ini 'olahraga penuh tubuh bagi otak' — dan tidak ada aktivitas lain yang mendekatinya dalam hal kompleksitas neuronalnya.",
    sections: [
      {
        heading: "Musik dan Kecerdasan: Bukti Neurosains",
        body: "Sebuah studi longitudinal Harvard selama 15 tahun menemukan bahwa anak-anak yang belajar alat musik selama minimal 2 tahun menunjukkan peningkatan signifikan dalam memori verbal, keterampilan membaca, kemampuan bahasa kedua, dan bahkan IQ verbal dibandingkan kelompok kontrol. Lebih mengejutkan lagi: manfaat ini bukan sekadar korelasi — penelitian eksperimental menunjukkan hubungan kausal antara latihan musik dan peningkatan fungsi kognitif.",
        list: [
          "Belajar alat musik meningkatkan kemampuan bahasa dan membaca pada anak disleksia",
          "Anak yang belajar musik menunjukkan memori auditori 20% lebih baik",
          "Bermain ansambel/grup mengajarkan disiplin, saling mendengarkan, dan sinkronisasi",
          "Pertunjukan musik melatih kepercayaan diri dan manajemen kecemasan performa",
        ],
      },
      {
        heading: "Memulai Perjalanan Musik Anak",
        body: "Tidak perlu memaksa anak memilih alat musik tertentu — biarkan mereka bereksperimen. Mulai dengan alat musik ritmis sederhana seperti perkusi atau ukulele yang tidak membutuhkan teknik terlalu kompleks. Rekorder (alat tiup sederhana) adalah pilihan klasik yang murah dan mengajarkan membaca notasi sejak dini. Untuk anak yang lebih suka bergerak, menari atau bergabung dalam sanggar tari tradisional memberikan manfaat yang sangat serupa dengan belajar musik.",
      },
    ],
    references: [
      { num: 1, text: "Schlaug, G., et al. (2005). Effects of music training on the child's brain and cognitive development. Annals of the New York Academy of Sciences, 1060, 219–230." },
      { num: 2, text: "Moreno, S., et al. (2011). Short-term music training enhances verbal intelligence and executive function. Psychological Science, 22(11), 1425–1433." },
      { num: 3, text: "Hallam, S. (2010). The power of music: Its impact on the intellectual, social and personal development of children and young people. International Journal of Music Education, 28(3), 269–289." },
      { num: 4, text: "Kemendikbud RI. (2023). Panduan Pengembangan Bakat Seni Anak. Jakarta: Direktorat SD." },
    ],
  },
];

// =================== UTILITY FUNCTIONS ===================
export function getAllArticles(): Article[] {
  return [...BERITA_ARTICLES, ...BAHAYA_ARTICLES, ...ALTERNATIF_ARTICLES];
}

export function getArticleById(id: string): Article | undefined {
  return getAllArticles().find((a) => a.id === id);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  return getAllArticles()
    .filter((a) => a.id !== article.id && a.type === article.type)
    .slice(0, count);
}
