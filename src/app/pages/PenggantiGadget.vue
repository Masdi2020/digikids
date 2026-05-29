<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import {
  TreePine,
  Palette,
  Bike,
  BookOpen,
  Puzzle,
  Music,
  ChevronRight,
  ArrowRight,
  Search,
  Clock,
  Calendar,
} from 'lucide-vue-next'

import type { Article } from '../data/articles'
import { fetchArticles } from '../lib/api'

const categoryIcon: Record<string, any> = {
  'Alam & Lingkungan': TreePine,
  'Seni & Kreativitas': Palette,
  'Kesehatan Fisik': Bike,
  'Literasi': BookOpen,
  'Permainan Edukatif': Puzzle,
  'Seni Musik': Music,
}

const categoryColor: Record<
  string,
  {
    grad: string
    light: string
    text: string
    border: string
  }
> = {
  'Alam & Lingkungan': {
    grad: 'from-emerald-400 to-green-500',
    light: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  'Seni & Kreativitas': {
    grad: 'from-pink-400 to-rose-500',
    light: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-200',
  },
  'Kesehatan Fisik': {
    grad: 'from-amber-400 to-orange-500',
    light: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  Literasi: {
    grad: 'from-sky-400 to-blue-500',
    light: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
  'Permainan Edukatif': {
    grad: 'from-violet-400 to-purple-500',
    light: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
  },
  'Seni Musik': {
    grad: 'from-teal-400 to-cyan-500',
    light: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
}

const search = ref('')
const articles = ref<Article[]>([])

onMounted(async () => {
  const all = await fetchArticles()
  articles.value = all.filter((a) => a.type === 'alternatif')
})

const filtered = computed(() => {
  return articles.value.filter((a) => {
    return (
      a.title.toLowerCase().includes(search.value.toLowerCase()) ||
      a.category.toLowerCase().includes(search.value.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const stats = [
  { val: '6', label: 'Kategori Aktivitas', sub: 'untuk semua usia' },
  { val: '100+', label: 'Ide Kegiatan', sub: 'praktis dan mudah' },
  { val: '0 Rp', label: 'Biaya Akses', sub: 'gratis selamanya' },
]
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Header -->
    <div
      class="bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 py-14 relative overflow-hidden"
    >
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"
        />

        <div
          class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"
        />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="flex items-center gap-2 text-emerald-200 text-sm mb-3">
          <RouterLink to="/" class="hover:text-white transition-colors">
            Beranda
          </RouterLink>

          <ChevronRight class="w-4 h-4" />

          <span class="text-white font-medium">Alternatif Gadget</span>
        </div>

        <h1 class="text-3xl lg:text-4xl font-black text-white mb-2">
          Seru Tanpa Gadget
        </h1>

        <p class="text-emerald-100 text-sm max-w-xl leading-relaxed">
          Panduan aktivitas seru, kreatif, dan menyenangkan sebagai pengganti gadget
          untuk anak di berbagai usia.
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-10">
        <div
          v-for="(s, i) in stats"
          :key="i"
          class="bg-white rounded-2xl p-4 text-center shadow-sm border border-emerald-100"
        >
          <div class="text-2xl font-black text-emerald-600">
            {{ s.val }}
          </div>

          <div class="text-slate-700 text-xs font-semibold">
            {{ s.label }}
          </div>

          <div class="text-slate-400 text-xs">
            {{ s.sub }}
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="flex items-center gap-4 mb-8">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            v-model="search"
            type="text"
            placeholder="Cari aktivitas..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
        </div>

        <span class="text-slate-500 text-sm">
          {{ filtered.length }} artikel
        </span>
      </div>

      <!-- Featured -->
      <div v-if="filtered.length > 0" class="mb-8">
        <RouterLink
          :to="`/artikel/${filtered[0].id}`"
          class="group relative bg-white rounded-2xl overflow-hidden shadow-md border border-emerald-100 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 grid lg:grid-cols-2"
        >
          <div class="relative h-60 lg:h-auto overflow-hidden">
            <img
              :src="filtered[0].img"
              :alt="filtered[0].title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />

            <div
              class="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full"
              :class="
                categoryColor[filtered[0].category]?.text || 'text-emerald-700'
              "
            >
              <component
                :is="
                  categoryIcon[filtered[0].category] || TreePine
                "
                class="w-3.5 h-3.5"
              />

              {{ filtered[0].category }}
            </div>
          </div>

          <div class="p-7 flex flex-col justify-center">
            <span class="text-emerald-600 text-xs font-bold uppercase tracking-wide mb-3">
              Panduan Utama
            </span>

            <h2
              class="text-slate-800 font-black text-xl lg:text-2xl mb-3 leading-snug group-hover:text-emerald-700 transition-colors"
            >
              {{ filtered[0].title }}
            </h2>

            <p class="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
              {{ filtered[0].excerpt }}
            </p>

            <div class="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <span class="flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5" />
                {{ filtered[0].date }}
              </span>

              <span class="flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" />
                {{ filtered[0].readTime }}
              </span>
            </div>

            <span
              class="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all"
            >
              Baca Panduan Lengkap

              <ArrowRight class="w-4 h-4" />
            </span>
          </div>
        </RouterLink>
      </div>

      <!-- Grid -->
      <template v-if="filtered.length > 1">
        <p class="text-slate-600 font-bold text-sm uppercase tracking-wide mb-5">
          Semua Kategori Aktivitas
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <RouterLink
            v-for="article in filtered.slice(1)"
            :key="article.id"
            :to="`/artikel/${article.id}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            :class="
              categoryColor[article.category]?.border || 'border-emerald-200'
            "
          >
            <!-- Image -->
            <div class="relative h-52 overflow-hidden">
              <img
                :src="article.img"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div
                class="absolute inset-0 opacity-30 group-hover:opacity-20 transition-opacity bg-gradient-to-t"
                :class="
                  categoryColor[article.category]?.grad ||
                  'from-emerald-400 to-green-500'
                "
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <!-- Badge -->
              <div
                class="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-full"
                :class="
                  categoryColor[article.category]?.text || 'text-emerald-700'
                "
              >
                <component
                  :is="categoryIcon[article.category] || TreePine"
                  class="w-3 h-3"
                />

                {{ article.category }}
              </div>

              <!-- Bottom icon -->
              <div class="absolute bottom-3 right-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br"
                  :class="
                    categoryColor[article.category]?.grad ||
                    'from-emerald-400 to-green-500'
                  "
                >
                  <component
                    :is="categoryIcon[article.category] || TreePine"
                    class="w-4 h-4 text-white"
                  />
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="p-5 flex flex-col flex-1">
              <h3
                class="text-slate-800 font-bold text-sm leading-snug mb-2 transition-colors line-clamp-2"
              >
                {{ article.title }}
              </h3>

              <p class="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                {{ article.excerpt }}
              </p>

              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <span class="text-slate-400 text-xs flex items-center gap-1">
                  <Clock class="w-3 h-3" />
                  {{ article.readTime }}
                </span>

                <span
                  class="font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all"
                  :class="
                    categoryColor[article.category]?.text || 'text-emerald-700'
                  "
                >
                  Baca

                  <ArrowRight class="w-3 h-3" />
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </template>

      <!-- Empty -->
      <div v-if="filtered.length === 0" class="text-center py-20 text-slate-500">
        <Search class="w-12 h-12 mx-auto mb-3 text-slate-300" />

        <p class="font-medium">Tidak ada aktivitas yang ditemukan</p>
      </div>

      <!-- CTA -->
      <div
        class="mt-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 class="font-black text-lg mb-1">
            Ingin Tahu Cara Mengatur Screen Time?
          </h3>

          <p class="text-emerald-100 text-sm">
            Panduan lengkap berbasis usia dan parental control tersedia di halaman
            Panduan.
          </p>
        </div>

        <RouterLink
          to="/panduan"
          class="flex-shrink-0 inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-md"
        >
          <BookOpen class="w-4 h-4" />

          Baca Panduan
        </RouterLink>
      </div>
    </div>
  </div>
</template>
