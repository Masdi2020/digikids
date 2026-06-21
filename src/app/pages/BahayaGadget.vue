<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import {
  Eye,
  Brain,
  Moon,
  Heart,
  Users,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Search,
  Clock,
  Calendar,
  User,
} from 'lucide-vue-next'

import type { Article } from '../data/articles'
import { fetchArticles } from '../lib/api'

const categoryIcons: Record<string, any> = {
  'Kesehatan Mata': Eye,
  'Neurosains': Brain,
  'Kesehatan Tidur': Moon,
  'Kesehatan Fisik': Heart,
  'Psikologi Sosial': Users,
  'Psikologi Klinis': AlertTriangle,
}

const categoryColors: Record<
  string,
  {
    bg: string
    text: string
    border: string
    iconBg: string
  }
> = {
  'Kesehatan Mata': {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    iconBg: 'bg-rose-100',
  },

  Neurosains: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
  },

  'Kesehatan Tidur': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
  },

  'Kesehatan Fisik': {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
  },

  'Psikologi Sosial': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
  },

  'Psikologi Klinis': {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    iconBg: 'bg-orange-100',
  },
}

const dangerStats = [
  {
    label: 'Kasus miopi anak meningkat',
    value: '+300%',
    sub: 'dalam satu dekade',
  },

  {
    label: 'Anak SD dengan gangguan tidur',
    value: '7 / 10',
    sub: 'akibat gadget malam',
  },

  {
    label: 'Risiko obesitas meningkat',
    value: '2x',
    sub: 'pada anak gemar gadget',
  },

  {
    label: 'Anak pernah terpapar konten berbahaya',
    value: '1 : 3',
    sub: 'tanpa pengawasan',
  },
]

const search = ref('')
const articles = ref<Article[]>([])

onMounted(async () => {
  const all = await fetchArticles()
  articles.value = all.filter((a) => a.type === 'bahaya')
})

const filtered = computed(() => {
  return articles.value.filter((a) => {
    return (
      a.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.value.toLowerCase()) ||
      a.category.toLowerCase().includes(search.value.toLocaleLowerCase())
    )
  })
})
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- HEADER -->
    <div class="bg-gradient-to-br from-rose-700 to-red-900 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-rose-300 text-sm mb-3">
          <RouterLink to="/" class="hover:text-white transition-colors">
            Beranda
          </RouterLink>

          <ChevronRight class="w-4 h-4" />

          <span class="text-white font-medium">Bahaya Gadget</span>
        </div>

        <h1 class="text-3xl lg:text-4xl font-black text-white mb-2">
          Bahaya Penggunaan Gadget Berlebih
        </h1>

        <p class="text-rose-100 text-sm max-w-xl leading-relaxed">
          Kumpulan artikel berbasis riset ilmiah tentang dampak nyata gadget pada kesehatan fisik,
          mental, dan sosial anak.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- STATS -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div
          v-for="(s, i) in dangerStats"
          :key="i"
          class="bg-white rounded-2xl p-4 shadow-sm border border-rose-100 text-center"
        >
          <div class="text-2xl font-black text-rose-600 mb-0.5">
            {{ s.value }}
          </div>

          <div class="text-slate-700 text-xs font-semibold leading-snug">
            {{ s.label }}
          </div>

          <div class="text-slate-400 text-xs mt-0.5">
            {{ s.sub }}
          </div>
        </div>
      </div>

      <!-- SEARCH -->
      <div class="flex items-center gap-4 mb-8">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            v-model="search"
            type="text"
            placeholder="Cari artikel bahaya gadget..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
          />
        </div>

        <span class="text-slate-500 text-sm">{{ filtered.length }} artikel</span>
      </div>

      <!-- EMPTY -->
      <div v-if="filtered.length === 0" class="text-center py-20 text-slate-500">
        <Search class="w-12 h-12 mx-auto mb-3 text-slate-300" />

        <p class="font-medium">Tidak ada artikel yang ditemukan</p>
      </div>

      <template v-else>
        <!-- FEATURED -->
        <div class="mb-6">
          <RouterLink
            :to="`/artikel/${filtered[0].id}`"
            class="group grid lg:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-md border border-rose-100 hover:shadow-xl hover:border-rose-200 transition-all duration-300"
          >
            <div class="relative h-60 lg:h-auto overflow-hidden">
              <img
                :src="filtered[0].img"
                :alt="filtered[0].title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent" />

              <span
                class="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                {{ filtered[0].category }}
              </span>
            </div>

            <div class="p-7 flex flex-col justify-center">
              <div class="flex items-center gap-2 mb-3">
                <AlertTriangle class="w-4 h-4 text-rose-500" />

                <span class="text-rose-600 text-xs font-bold uppercase tracking-wide">
                  Wajib Dibaca
                </span>
              </div>

              <h2
                class="text-slate-800 font-black text-xl lg:text-2xl mb-3 leading-snug group-hover:text-rose-700 transition-colors"
              >
                {{ filtered[0].title }}
              </h2>

              <p class="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                {{ filtered[0].excerpt }}
              </p>

              <div class="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span class="flex items-center gap-1">
                  <User class="w-3.5 h-3.5" />
                  {{ filtered[0].author }}
                </span>

                <span class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5" />
                  {{ filtered[0].readTime }}
                </span>
              </div>

              <span
                class="inline-flex items-center gap-1.5 text-rose-600 font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Baca Artikel Lengkap

                <ArrowRight class="w-4 h-4" />
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- GRID -->
        <div v-if="filtered.length > 1" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <RouterLink
            v-for="article in filtered.slice(1)"
            :key="article.id"
            :to="`/artikel/${article.id}`"
            :class="[
              'group bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col',
              categoryColors[article.category]?.border || 'border-rose-200',
            ]"
          >
            <!-- IMAGE -->
            <div class="relative h-44 overflow-hidden">
              <img
                :src="article.img"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <span
                :class="[
                  'absolute top-3 left-3 bg-white/90 text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full'
                ]"
              >
                {{ article.category }}
              </span>
            </div>

            <!-- BODY -->
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-start gap-3 mb-2">
                <div
                  :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                    categoryColors[article.category]?.iconBg,
                  ]"
                >
                  <component
                    :is="categoryIcons[article.category] || AlertTriangle"
                    :class="[
                      'w-4 h-4',
                      categoryColors[article.category]?.text || 'text-rose-700',
                    ]"
                  />
                </div>

                <h3
                  class="text-slate-800 font-bold text-sm leading-snug transition-colors line-clamp-2 flex-1"
                >
                  {{ article.title }}
                </h3>
              </div>

              <p class="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                {{ article.excerpt }}
              </p>

              <div
                class="flex items-center justify-between text-xs pt-3 border-t border-slate-100"
              >
                <span class="text-slate-400 flex items-center gap-1">
                  <Calendar class="w-3 h-3" />
                  {{ article.date }}
                </span>

                <span
                  :class="[
                    'font-semibold flex items-center gap-1 group-hover:gap-2 transition-all',
                    categoryColors[article.category]?.text,
                  ]"
                >
                  Baca

                  <ArrowRight class="w-3 h-3" />
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </template>

      <!-- CTA -->
      <div
        class="mt-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 class="font-black text-lg mb-1">Sudah Tahu Bahayanya?</h3>

          <p class="text-slate-400 text-sm">
            Temukan alternatif aktivitas seru dan panduan screen time yang tepat untuk anak Anda.
          </p>
        </div>

        <div class="flex gap-3 flex-shrink-0">
          <RouterLink
            to="/pengganti-gadget"
            class="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
          >
            Lihat Alternatif
          </RouterLink>

          <RouterLink
            to="/panduan"
            class="inline-flex items-center gap-2 bg-sky-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-700 transition-colors"
          >
            Baca Panduan
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
