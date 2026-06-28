<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import heic2any from 'heic2any'
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
} from 'lucide-vue-next'

const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e2e8f0'/%3E%3Ccircle cx='100' cy='78' r='40' fill='%2394a3b8'/%3E%3Cpath d='M36 196c0-35 28-64 64-64s64 29 64 64z' fill='%2394a3b8'/%3E%3C/svg%3E"

const localImages = import.meta.glob('../../assets/images/*', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

function resolveImg(src: string): string {
  if (!src) return fallbackImg
  if (/^(http:|data:|blob:)/.test(src)) return src
  const match = Object.entries(localImages).find(([path]) => path.endsWith('/' + src))
  return match ? match[1] : fallbackImg
}

const handleImgError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target.src !== fallbackImg) {
    target.src = fallbackImg
  }
}

const teamImg1 = resolveImg('Wildan.jpg')
const teamImg2 = resolveImg('Brikal.jpg')
const teamImg3 = resolveImg('Daniel.JPG')
const teamImg4 = resolveImg('Dimas.JPG')
const teamImg5 = resolveImg('Zaki.HEIC')
const teamImg6 = resolveImg('Zaka.jpg')
const teamImg7 = resolveImg('Ajwar.jpg')
const teamImg8 = resolveImg('Khoirullah.jpg')
const teamImg9 = resolveImg('Putri.jpg')

const teamMembers = ref([
  {
    name: 'Wildan',
    role: '-',
    desc: '-',
    img: teamImg1,
    imgPos: 'center',
    badges: [],
    icon: '👨‍💻',
  },
  {
    name: 'Brikal',
    role: '-',
    desc: '-',
    img: teamImg2,
    imgPos: 'center',
    badges: [],
    icon: '👩‍🎨',
  },
  {
    name: 'Daniel',
    role: '-',
    desc: '-',
    img: teamImg3,
    imgPos: 'center',
    badges: [],
    icon: '✍️',
  },
  {
    name: 'Dimas',
    role: '-',
    desc: '-',
    img: teamImg4,
    imgPos: 'center',
    badges: [],
    icon: '🎬',
  },
  {
    name: 'Zaki',
    role: '-',
    desc: '-',
    img: teamImg5,
    imgPos: 'center',
    badges: [],
    icon: '🤝',
  },
  {
    name: 'Zaka',
    role: '-',
    desc: '-',
    img: teamImg6,
    imgPos: 'center',
    badges: [],
    icon: '🤝',
  },
  {
    name: 'Ajwar',
    role: '-',
    desc: '-',
    img: teamImg7,
    imgPos: 'center',
    badges: [],
    icon: '🤝',
  },
  {
    name: 'Khoirullah',
    role: '-',
    desc: '-',
    img: teamImg8,
    imgPos: 'center',
    badges: [],
    icon: '🤝',
  },
  {
    name: 'Putri',
    role: '-',
    desc: '-',
    img: teamImg9,
    imgPos: 'center',
    badges: [],
    icon: '🤝',
  },
])

const objectUrls: string[] = [] // simpan untuk dibersihkan saat komponen di-unmount

const isHeic = (url: string) => /\.(heic|heif)$/i.test(url)

async function toDisplayableUrl(url: string): Promise<string> {
  if (!url || url === fallbackImg) return url
  try {
    const res = await fetch(url)
    const blob = await res.blob()

    const looksHeic =
      isHeic(url) || blob.type === 'image/heic' || blob.type === 'image/heif'

    if (!looksHeic) return url // bukan HEIC, biarkan apa adanya

    const out = await heic2any({ blob, toType: 'image/jpeg', quality: 0.85 })
    const jpegBlob = (Array.isArray(out) ? out[0] : out) as Blob

    const objectUrl = URL.createObjectURL(jpegBlob)
    objectUrls.push(objectUrl)
    return objectUrl
  } catch (e) {
    console.error('Gagal konversi HEIC:', url, e)
    return url // gagal -> biarkan @error handler ambil alih ke fallback
  }
}

onMounted(async () => {
  await Promise.all(
    teamMembers.value.map(async (m) => {
      m.img = await toDisplayableUrl(m.img)
    }),
  )
})

// Bebaskan memori object URL saat komponen dilepas
onBeforeUnmount(() => {
  objectUrls.forEach((u) => URL.revokeObjectURL(u))
})

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
                :src="member.img || fallbackImg"
                :alt="member.name"
                :style="{ objectPosition: member.imgPos }"
                @error="handleImgError"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
