<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'

import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Baby,
  GraduationCap,
  Users,
  Shield,
  Smartphone,
  Lock,
  Globe,
  Bell,
  Clock,
  Star,
  BookOpen,
} from 'lucide-vue-next'

const openIndex = ref<number | null>(null);

function toggleAccordion(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const screenTimeData = [
  {
    icon: Baby,
    age: '0–18 Bulan',
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    recommended: 'Tidak dianjurkan',
    exceptions: 'Video call keluarga saja',
    desc: 'Otak bayi membutuhkan interaksi langsung, sentuhan, dan stimulasi nyata.',
    tips: [
      "Hindari menjadikan gadget sebagai 'penghibur' bayi",
      'Prioritaskan buku bergambar dan mainan fisik',
      'Video call dengan kakek/nenek masih diperbolehkan',
    ],
  },
  {
    icon: Baby,
    age: '18–24 Bulan',
    color: 'from-orange-400 to-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    recommended: '< 1 jam/hari',
    exceptions: 'Konten berkualitas tinggi saja',
    desc: 'Gunakan konten edukatif berkualitas dan dampingi anak.',
    tips: [
      'Tonton bersama dan diskusikan konten',
      'Pilih aplikasi sesuai usia',
      'Jangan menggantikan waktu bermain fisik',
    ],
  },
  {
    icon: GraduationCap,
    age: '3–5 Tahun',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    recommended: '1 jam/hari',
    exceptions: 'Konten edukatif berkualitas',
    desc: 'Fokus pada kesiapan sekolah dan kreativitas.',
    tips: [
      'Tetapkan jadwal konsisten',
      'Tonton bersama',
      'Pastikan tidur siang tanpa gadget',
    ],
  },
  {
    icon: GraduationCap,
    age: '6–12 Tahun',
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    recommended: '2 jam/hari',
    exceptions: 'Tidak termasuk PR digital',
    desc: 'Pisahkan screen time hiburan dan pendidikan.',
    tips: [
      'PR sebelum hiburan',
      'Tidak ada gadget sebelum tidur',
      'Zona bebas gadget saat makan',
    ],
  },
  {
    icon: Users,
    age: '13–17 Tahun',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    recommended: '2–3 jam/hari',
    exceptions: 'Tidak termasuk kebutuhan belajar',
    desc: 'Ajarkan keamanan online dan tanggung jawab digital.',
    tips: [
      'Buat family media plan',
      'Ajarkan privasi online',
      'Dorong aktivitas ekstrakurikuler',
    ],
  },
]

const parentalSteps = [
  {
    step: 1,
    icon: Smartphone,
    title: 'Audit Perangkat Anak',
    color: 'bg-sky-600',
    desc: 'Catat semua perangkat dan aplikasi yang digunakan anak.',
    action: 'Buat daftar aplikasi yang perlu dibatasi',
  },
  {
    step: 2,
    icon: Lock,
    title: 'Aktifkan Family Link / Screen Time',
    color: 'bg-violet-600',
    desc: 'Gunakan parental control sesuai platform.',
    action: 'Aktifkan fitur parental control',
  },
  {
    step: 3,
    icon: Clock,
    title: 'Atur Batas Waktu Harian',
    color: 'bg-emerald-600',
    desc: 'Buat batas waktu penggunaan aplikasi.',
    action: 'Atur game max 1 jam/hari',
  },
  {
    step: 4,
    icon: Globe,
    title: 'Filter Konten Web',
    color: 'bg-amber-600',
    desc: 'Aktifkan SafeSearch dan DNS family-friendly.',
    action: 'Gunakan SafeSearch Google',
  },
  {
    step: 5,
    icon: Bell,
    title: 'Monitor & Review Berkala',
    color: 'bg-rose-600',
    desc: 'Diskusikan aktivitas digital anak setiap minggu.',
    action: 'Lakukan family digital check-in',
  },
]

const faqItems = [
  {
    question: 'Apakah gadget harus dilarang total?',
    answer:
      'Tidak. Yang penting adalah keseimbangan, durasi, dan pendampingan.',
  },
  {
    question: 'Bagaimana menegur anak yang kecanduan gadget?',
    answer:
      'Gunakan pendekatan empatik dan buat aturan bersama.',
  },
  {
    question: 'Apakah gadget untuk belajar diperbolehkan?',
    answer:
      'Tentu. Penggunaan pendidikan tidak termasuk screen time hiburan.',
  },
  {
    question: 'Kapan anak boleh punya smartphone sendiri?',
    answer:
      'Idealnya setelah usia 12–13 tahun dengan pengawasan.',
  },
  {
    question: 'Bagaimana jika anak marah saat dibatasi?',
    answer:
      'Tetap tenang, konsisten, dan tawarkan alternatif aktivitas.',
  },
  {
    question: 'Apakah gadget di kamar tidur berbahaya?',
    answer:
      'Ya, karena mengganggu kualitas tidur anak.',
  },
]

const familyRules = [
  { emoji: "🚫", rule: "Tidak ada gadget saat makan bersama" },
  { emoji: "🌙", rule: "Gadget dikumpulkan 1 jam sebelum tidur" },
  { emoji: "📚", rule: "Selesaikan PR sebelum bermain gadget" },
  { emoji: "🕐", rule: "Patuhi batas waktu screen time harian" },
  { emoji: "🛏️", rule: "Tidak ada gadget di kamar tidur anak" },
  { emoji: "👀", rule: "Orang tua berhak memantau aktivitas digital" },
  { emoji: "📴", rule: "Gadget dimatikan saat beribadah" },
  { emoji: "🤝", rule: "Ceritakan jika ada konten yang mengganggu" },
];

</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Page Header -->
    <div class="bg-gradient-to-br from-violet-600 to-purple-700 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-violet-200 text-sm mb-3">
          <span>Beranda</span>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white font-medium">Panduan</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-black text-white mb-2">
          Panduan Penggunaan Gadget
        </h1>
        <p class="text-violet-100 text-sm max-w-xl">
          Panduan lengkap berbasis riset untuk screen time anak sesuai usia dan
          cara mengatur kontrol orang tua yang efektif.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Screen Time by Age -->
      <section class="mb-14">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-violet-500 rounded-full" />
          <div>
            <h2 class="text-xl font-black text-slate-800">
              ⏱️ Panduan Screen Time Berdasarkan Usia
            </h2>
            <p class="text-slate-500 text-xs">Berdasarkan rekomendasi WHO, AAP, dan IDAI</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(item, i) in screenTimeData"
            :key="i"
            :class="`bg-white rounded-2xl border ${item.border} overflow-hidden shadow-sm hover:shadow-md transition-shadow`"
          >
            <div :class="`bg-gradient-to-r ${item.color} p-4 relative overflow-hidden`">
              <div class="absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-full" />
              <div class="relative flex items-center gap-3">
                <div class="w-9 h-9 bg-white/25 rounded-xl flex items-center justify-center">
                  <component :is="item.icon" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="text-white font-black text-base">{{ item.age }}</h3>
                  <p class="text-white/80 text-xs font-medium">{{ item.exceptions }}</p>
                </div>
              </div>
            </div>
            <div class="p-4">
              <div :class="`${item.bg} rounded-xl px-3 py-2 mb-3 flex items-center justify-between`">
                <span class="text-slate-600 text-xs font-medium">Rekomendasi</span>
                <span :class="`${item.text} font-black text-sm`">{{ item.recommended }}</span>
              </div>
              <p class="text-slate-600 text-xs leading-relaxed mb-3">{{ item.desc }}</p>
              <ul class="space-y-1.5">
                <li
                  v-for="(tip, ti) in item.tips"
                  :key="ti"
                  class="flex items-start gap-2 text-xs text-slate-600"
                >
                  <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Parental Control Steps -->
      <section class="mb-14">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-sky-500 rounded-full" />
          <div>
            <h2 class="text-xl font-black text-slate-800">
              🔒 Panduan Parental Control Step-by-Step
            </h2>
            <p class="text-slate-500 text-xs">Ikuti langkah-langkah berikut untuk melindungi anak secara digital</p>
          </div>
        </div>

        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-5 lg:left-8 top-0 bottom-0 w-0.5 bg-slate-200 z-0" />
          <div class="space-y-5">
            <div
              v-for="(s, i) in parentalSteps"
              :key="i"
              class="relative flex gap-5 lg:gap-8 pl-12 lg:pl-20"
            >
              <!-- Step badge -->
              <div :class="`absolute left-0 w-10 h-10 lg:w-16 lg:h-16 ${s.color} rounded-2xl flex items-center justify-center z-10 shadow-lg`">
                <div class="hidden lg:flex flex-col items-center">
                  <component :is="s.icon" class="w-5 h-5 text-white" />
                  <span class="text-white/80 text-xs font-bold">{{ s.step }}</span>
                </div>
                <component :is="s.icon" class="lg:hidden w-5 h-5 text-white" />
              </div>
              <!-- Content -->
              <div class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex-1 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between gap-2 mb-2">
                  <h3 class="text-slate-800 font-bold text-base">
                    Langkah {{ s.step }}: {{ s.title }}
                  </h3>
                  <span class="hidden sm:inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                    Step {{ s.step }}/5
                  </span>
                </div>
                <p class="text-slate-600 text-sm leading-relaxed mb-3">{{ s.desc }}</p>
                <div class="bg-sky-50 border border-sky-100 rounded-xl px-4 py-2.5 flex items-start gap-2">
                  <Star class="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <p class="text-sky-700 text-xs font-medium">{{ s.action }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Family Rules Template -->
      <section class="mb-14">
        <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-7 border border-emerald-100">
          <div class="flex items-center gap-3 mb-5">
            <Shield class="w-6 h-6 text-emerald-600" />
            <h2 class="text-xl font-black text-slate-800">
              📝 Template Aturan Media Keluarga
            </h2>
          </div>
          <p class="text-slate-600 text-sm mb-6">
            Buat perjanjian tertulis bersama seluruh anggota keluarga. Tempel di tempat yang mudah dilihat!
          </p>
          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="(r, i) in familyRules"
              :key="i"
              class="bg-white rounded-xl p-3.5 flex items-center gap-3 shadow-sm border border-emerald-100"
            >
              <span class="text-xl">{{ r.emoji }}</span>
              <span class="text-slate-700 text-sm font-medium">{{ r.rule }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Accordion -->
      <section class="mb-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1 h-8 bg-amber-500 rounded-full" />
          <div>
            <h2 class="text-xl font-black text-slate-800">
              ❓ Pertanyaan yang Sering Ditanyakan
            </h2>
            <p class="text-slate-500 text-xs">Jawaban dari para ahli untuk kekhawatiran Anda</p>
          </div>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, i) in faqItems"
            :key="i"
            :class="`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
              openIndex === i ? 'border-violet-300 shadow-md' : 'border-slate-200 hover:border-slate-300'
            }`"
          >
            <button
              @click="toggleAccordion(i)"
              class="w-full flex items-center justify-between p-5 text-left gap-4"
            >
              <span :class="`font-semibold text-sm ${openIndex === i ? 'text-violet-700' : 'text-slate-700'}`">
                {{ item.question }}
              </span>
              <ChevronDown
                :class="`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === i ? 'rotate-180 text-violet-600' : 'text-slate-400'
                }`"
              />
            </button>
            <Transition
              @before-enter="(el) => { (el as HTMLElement).style.height = '0'; (el as HTMLElement).style.overflow = 'hidden'; }"
              @enter="(el) => { (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px'; }"
              @after-enter="(el) => { (el as HTMLElement).style.height = ''; (el as HTMLElement).style.overflow = ''; }"
              @before-leave="(el) => { (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px'; (el as HTMLElement).style.overflow = 'hidden'; }"
              @leave="(el) => { (el as HTMLElement).style.height = '0'; }"
              @after-leave="(el) => { (el as HTMLElement).style.height = ''; (el as HTMLElement).style.overflow = ''; }"
            >
              <div v-if="openIndex === i" style="transition: height 200ms ease">
                <div class="px-5 pb-5">
                  <p class="text-slate-600 text-sm leading-relaxed">{{ item.answer }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Bottom CTA -->
      <div class="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-7 text-white text-center">
        <h3 class="text-2xl font-black mb-2">Butuh Inspirasi Aktivitas Pengganti?</h3>
        <p class="text-violet-100 text-sm mb-5">
          Setelah mengatur screen time, pastikan Anda punya stok aktivitas seru untuk mengisi waktu anak.
        </p>
        <RouterLink
          to="/pengganti-gadget"
          class="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors shadow-md"
        >
          <BookOpen class="w-4 h-4" />
          Lihat 100+ Alternatif Aktivitas
        </RouterLink>
      </div>

    </div>
  </div>
</template>
