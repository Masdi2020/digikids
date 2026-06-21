<script setup lang="ts">
import {
  MapPin,
  Target,
  Heart,
  Lightbulb,
  Users,
  ChevronRight,
  Mail,
  Github,
  Globe,
  Award,
  BookOpen,
  Video,
} from 'lucide-vue-next'

const teamImg1 =
  'https://images.unsplash.com/photo-1601655781320-205e34c94eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
const teamImg2 =
  'https://images.unsplash.com/photo-1765648636207-22c892e8fae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
const teamImg3 =
  'https://images.unsplash.com/photo-1732210038531-9cefab37885a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
const teamImg4 =
  'https://images.unsplash.com/photo-1609173706484-78700d4ed198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'
const teamImg5 =
  'https://images.unsplash.com/photo-1758687126549-3bfd368e59a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300'

const teamMembers = [
  {
    name: 'Ahmad Rizky Pratama',
    role: 'Project Lead & Backend Developer',
    desc: 'Bertanggung jawab atas arsitektur sistem, pengembangan API Node.js/Express, dan manajemen database Supabase.',
    img: teamImg1,
    badges: ['Node.js', 'Supabase', 'Express'],
    icon: '👨‍💻',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Frontend Developer & UI Designer',
    desc: 'Memimpin pengembangan antarmuka menggunakan Vue.js dan Tailwind CSS, serta mengimplementasikan desain yang responsif.',
    img: teamImg2,
    badges: ['Vue.js', 'Tailwind CSS', 'Figma'],
    icon: '👩‍🎨',
  },
  {
    name: 'Budi Santoso',
    role: 'Content Researcher & Writer',
    desc: 'Meriset dan menyusun konten edukasi tentang gadget, kesehatan digital anak, serta panduan berbasis bukti ilmiah.',
    img: teamImg3,
    badges: ['Riset', 'Konten', 'SEO'],
    icon: '✍️',
  },
  {
    name: 'Dewi Anggraini',
    role: 'Media & Video Production',
    desc: 'Memproduksi konten video edukasi, mengelola aset media visual, dan mengintegrasikan Cloudinary untuk manajemen gambar.',
    img: teamImg4,
    badges: ['Cloudinary', 'Video', 'Editing'],
    icon: '🎬',
  },
  {
    name: 'Farhan Maulana',
    role: 'QA & Community Outreach',
    desc: 'Memastikan kualitas website, melakukan testing lintas platform, dan menjadi jembatan komunikasi dengan warga RT 045.',
    img: teamImg5,
    badges: ['QA Testing', 'Community', 'Outreach'],
    icon: '🤝',
  },
]

const values = [
  {
    icon: Target,
    color: 'bg-sky-100 text-sky-600',
    title: 'Akurat & Terpercaya',
    desc: 'Semua konten berbasis penelitian ilmiah dan rekomendasi dari lembaga kesehatan internasional seperti WHO dan IDAI.',
  },
  {
    icon: Heart,
    color: 'bg-rose-100 text-rose-600',
    title: 'Ramah & Empatik',
    desc: 'Kami memahami tantangan orang tua di era digital. Setiap konten dibuat dengan empati tanpa menghakimi.',
  },
  {
    icon: Lightbulb,
    color: 'bg-amber-100 text-amber-600',
    title: 'Solusi Praktis',
    desc: 'Bukan hanya menjelaskan masalah, kami menyediakan solusi nyata yang langsung bisa diterapkan di rumah.',
  },
  {
    icon: Users,
    color: 'bg-emerald-100 text-emerald-600',
    title: 'Untuk Semua Keluarga',
    desc: 'Dirancang untuk semua tingkat melek teknologi — dari orang tua yang kurang familiar hingga yang sudah tech-savvy.',
  },
]

const achievements = [
  { icon: BookOpen, val: '50+', label: 'Artikel Edukasi' },
  { icon: Video, val: '30+', label: 'Video Edukasi' },
  { icon: Users, val: '500+', label: 'Keluarga Terjangkau' },
  { icon: Award, val: '3', label: 'Penghargaan Komunitas' },
]

const techStack = [
  { name: 'Vue.js', desc: 'Frontend', color: 'bg-emerald-500' },
  { name: 'Tailwind CSS', desc: 'Styling', color: 'bg-sky-500' },
  { name: 'Node.js', desc: 'Backend', color: 'bg-green-600' },
  { name: 'Express', desc: 'API', color: 'bg-slate-600' },
  { name: 'Supabase', desc: 'Database', color: 'bg-emerald-700' },
  { name: 'Cloudinary', desc: 'Media', color: 'bg-blue-500' },
]
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-slate-700 to-slate-900 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <span>Beranda</span>

          <ChevronRight class="w-4 h-4" />

          <span class="text-white font-medium">Tentang Kami</span>
        </div>

        <h1 class="text-3xl lg:text-4xl font-black text-white mb-2">Tentang DIGIKIDS</h1>

        <p class="text-slate-300 text-sm max-w-xl">
          Program Pengabdian Masyarakat untuk meningkatkan kesadaran tentang penggunaan gadget yang
          bijak di lingkungan RT 045 Karang Joang.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Mission Section -->
      <section class="mb-14">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span
              class="inline-block bg-sky-100 text-sky-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide"
            >
              Misi Kami
            </span>

            <h2 class="text-2xl lg:text-3xl font-black text-slate-800 mb-4 leading-snug">
              Membangun Generasi Digital yang
              <span class="text-sky-600">Sehat & Bijak</span>
            </h2>

            <p class="text-slate-600 text-sm leading-relaxed mb-4">
              DIGIKIDS lahir dari keprihatinan nyata yang kami lihat di lingkungan RT 045 Karang
              Joang, Balikpapan Utara. Semakin banyak anak-anak di lingkungan kami yang menghabiskan
              waktu berlebihan dengan gadget, dan orang tua seringkali tidak tahu harus berbuat apa.
            </p>

            <p class="text-slate-600 text-sm leading-relaxed mb-6">
              Kami hadir sebagai sumber informasi terpercaya yang mudah diakses — menyajikan panduan
              praktis, artikel edukasi, dan video informatif dalam bahasa Indonesia yang ramah untuk
              semua kalangan orang tua.
            </p>

            <div class="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">
              <MapPin class="w-5 h-5 text-rose-500 flex-shrink-0" />

              <div>
                <p class="text-slate-800 font-bold text-sm">Program Pengabdian Masyarakat</p>

                <p class="text-slate-500 text-xs">
                  RT 045, Karang Joang, Balikpapan Utara, Kalimantan Timur
                </p>
              </div>
            </div>
          </div>

          <!-- Achievements -->
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="(item, i) in values"
              :key="i"
              class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
            >
              <div :class="`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`">
                <component :is="item.icon" class="w-5 h-5" />
              </div>

              <h3 class="text-slate-800 font-bold text-base">{{ item.title }}</h3>

              <p class="text-slate-500 text-xs leading-relaxed">{{ item.desc }}</p>
            </div>

            <div
              class="col-span-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-5 text-white"
            >
              <p class="font-bold text-base mb-1">🎯 Visi Kami</p>

              <p class="text-sky-100 text-sm leading-relaxed">
                Menjadi referensi utama pendidikan digital keluarga di Indonesia, khususnya untuk
                masyarakat di Kalimantan Timur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="mb-10">
        <div class="text-center mb-10">
          <span
            class="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wide"
          >
            Tim Kami
          </span>

          <h2 class="text-2xl lg:text-3xl font-black text-slate-800 mb-2">
            Bertemu dengan Tim Pengembang
          </h2>

          <p class="text-slate-500 text-sm max-w-lg mx-auto">
            Lima mahasiswa yang bersemangat menggunakan teknologi untuk memberikan dampak positif
            bagi komunitas sekitar mereka.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(member, i) in teamMembers"
            :key="i"
            :class="[
              'bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group',
              i === 4 ? 'sm:col-start-1 lg:col-start-2' : '',
            ]"
          >
            <!-- Card Top -->
            <div
              class="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200"
            >
              <img
                :src="member.img"
                :alt="member.name"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div
                class="absolute top-4 right-4 text-2xl bg-white/20 backdrop-blur-sm rounded-xl px-2.5 py-1"
              >
                {{ member.icon }}
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5">
              <h3 class="text-slate-800 font-black text-base mb-0.5">{{ member.name }}</h3>

              <p class="text-sky-600 text-xs font-semibold mb-3">{{ member.role }}</p>

              <p class="text-slate-500 text-xs leading-relaxed mb-4">{{ member.desc }}</p>

              <!-- Badges -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="badge in member.badges"
                  :key="badge"
                  class="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {{ badge }}
                </span>
              </div>

              <!-- Social Links -->
              <div class="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  class="w-8 h-8 bg-slate-100 hover:bg-sky-100 hover:text-sky-600 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                >
                  <Mail class="w-4 h-4" />
                </button>

                <button
                  class="w-8 h-8 bg-slate-100 hover:bg-slate-800 hover:text-white rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                >
                  <Github class="w-4 h-4" />
                </button>

                <button
                  class="w-8 h-8 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-lg flex items-center justify-center text-slate-500 transition-colors"
                >
                  <Globe class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="mb-10">
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-7 text-white">
          <h3 class="text-xl font-black mb-2">🛠️ Teknologi yang Kami Gunakan</h3>

          <p class="text-slate-400 text-sm mb-6">
            Stack teknologi modern untuk pengalaman pengguna terbaik
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div v-for="tech in techStack" :key="tech.name" class="text-center">
              <div
                :class="`${tech.color} text-white text-sm font-bold px-3 py-2 rounded-xl mb-1.5`"
              >
                {{ tech.name }}
              </div>

              <div class="text-slate-400 text-xs">{{ tech.desc }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section>
        <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 class="text-2xl font-black mb-2">Punya Pertanyaan atau Saran?</h3>

          <p class="text-sky-100 text-sm mb-5 max-w-md mx-auto">
            Kami sangat terbuka untuk masukan dari warga dan seluruh pengguna portal ini. Bersama,
            kita wujudkan generasi digital yang lebih sehat!
          </p>

          <div class="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:bijakgadget@rt045karangjoang.id"
              class="inline-flex items-center gap-2 bg-white text-sky-700 font-bold px-5 py-2.5 rounded-xl hover:bg-sky-50 transition-colors text-sm"
            >
              <Mail class="w-4 h-4" />
              Hubungi Kami
            </a>

            <a
              href="#"
              class="inline-flex items-center gap-2 bg-white/15 text-white border border-white/30 font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors text-sm"
            >
              <Globe class="w-4 h-4" />
              RT 045 Karang Joang
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
