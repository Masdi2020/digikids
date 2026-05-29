<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { Calendar, Clock, Search, ChevronRight, ArrowRight, User } from 'lucide-vue-next'

import type { Article } from '../data/articles'
import { fetchArticles } from '../lib/api'

const articles = ref<Article[]>([])

onMounted(async () => {
  const all = await fetchArticles()
  articles.value = all.filter((a) => a.type === 'berita')
})

const activeCategory = ref('Semua')
const search = ref('')

const categories = computed(() => {
  const unique = Array.from(new Set(articles.value.map((a) => a.category))).filter(Boolean)
  return ['Semua', ...unique]
})

const filtered = computed(() => {
  return articles.value.filter((a) => {
    const matchCat = activeCategory.value === 'Semua' || a.category === activeCategory.value

    const matchSearch =
      a.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.value.toLowerCase())

    return matchCat && matchSearch
  })
})

const featured = computed(() => filtered.value[0])

const rest = computed(() => filtered.value.slice(1))
</script>

<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Header -->
    <div class="bg-gradient-to-br from-sky-600 to-blue-700 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-sky-200 text-sm mb-3">
          <RouterLink to="/" class="hover:text-white transition-colors"> Beranda </RouterLink>

          <ChevronRight class="w-4 h-4" />

          <span class="text-white font-medium"> Berita </span>
        </div>

        <h1 class="text-3xl lg:text-4xl font-black text-white mb-2">Berita Gadget & Anak</h1>

        <p class="text-sky-100 text-sm max-w-xl">
          Informasi terkini seputar teknologi, kesehatan digital, dan parenting untuk membantu Anda
          membuat keputusan terbaik.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Search + Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <!-- Search -->
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

          <input
            v-model="search"
            type="text"
            placeholder="Cari artikel berita..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
          />
        </div>

        <!-- Categories -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600',
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="text-center py-20 text-slate-500">
        <Search class="w-12 h-12 mx-auto mb-3 text-slate-300" />

        <p class="font-medium">Tidak ada artikel yang ditemukan</p>
      </div>

      <template v-else>
        <!-- Featured -->
        <div v-if="featured" class="mb-8">
          <p class="text-sky-700 font-bold text-sm uppercase tracking-wide mb-4">
            Artikel Unggulan
          </p>

          <RouterLink
            :to="`/artikel/${featured.id}`"
            class="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 group hover:shadow-xl transition-all duration-300 grid lg:grid-cols-2"
          >
            <div class="relative h-60 lg:h-auto overflow-hidden">
              <img
                :src="featured.img"
                :alt="featured.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              <span
                class="absolute top-4 left-4 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                {{ featured.category }}
              </span>
            </div>

            <div class="p-7 flex flex-col justify-center">
              <h2
                class="text-slate-800 font-black text-xl lg:text-2xl mb-3 leading-snug group-hover:text-sky-700 transition-colors"
              >
                {{ featured.title }}
              </h2>

              <p class="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                {{ featured.excerpt }}
              </p>

              <div class="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span class="flex items-center gap-1">
                  <User class="w-3.5 h-3.5" />
                  {{ featured.author }}
                </span>

                <span class="flex items-center gap-1">
                  <Calendar class="w-3.5 h-3.5" />
                  {{ featured.date }}
                </span>

                <span class="flex items-center gap-1">
                  <Clock class="w-3.5 h-3.5" />
                  {{ featured.readTime }}
                </span>
              </div>

              <span
                class="inline-flex items-center gap-1.5 text-sky-600 font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Baca Artikel Lengkap

                <ArrowRight class="w-4 h-4" />
              </span>
            </div>
          </RouterLink>
        </div>

        <!-- Grid -->
        <template v-if="rest.length > 0">
          <p class="text-slate-600 font-bold text-sm uppercase tracking-wide mb-5">
            Artikel Lainnya ({{ rest.length }})
          </p>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouterLink
              v-for="article in rest"
              :key="article.id"
              :to="`/artikel/${article.id}`"
              class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  :src="article.img"
                  :alt="article.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                <span
                  class="absolute top-3 left-3 bg-white/90 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full"
                >
                  {{ article.category }}
                </span>
              </div>

              <div class="p-5 flex flex-col flex-1">
                <h3
                  class="text-slate-800 font-bold text-base leading-snug mb-2 group-hover:text-sky-600 transition-colors line-clamp-2"
                >
                  {{ article.title }}
                </h3>

                <p class="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                  {{ article.excerpt }}
                </p>

                <div
                  class="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100"
                >
                  <span class="flex items-center gap-1">
                    <Calendar class="w-3.5 h-3.5" />
                    {{ article.date }}
                  </span>

                  <span class="flex items-center gap-1">
                    <Clock class="w-3.5 h-3.5" />
                    {{ article.readTime }}
                  </span>
                </div>
              </div>
            </RouterLink>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
