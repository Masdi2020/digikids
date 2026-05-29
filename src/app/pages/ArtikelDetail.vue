<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ChevronRight,
  BookOpen,
  ExternalLink,
} from 'lucide-vue-next'

import type { Article } from '../data/articles'
import { fetchArticles } from '../lib/api'

const route = useRoute()
const router = useRouter()

const id = computed(() => route.params.id as string)

const article = ref<Article | undefined>()
const allArticles = ref<Article[]>([])
const isLoading = ref(true)

async function loadArticle() {
  isLoading.value = true
  allArticles.value = await fetchArticles()
  article.value = id.value ? allArticles.value.find((a) => a.id === id.value) : undefined
  isLoading.value = false
}

onMounted(loadArticle)
watch(id, loadArticle)

const typeBadge: Record<
  string,
  {
    label: string
    bg: string
    text: string
    border: string
    path: string
  }
> = {
  berita: {
    label: 'Berita',
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    border: 'border-sky-200',
    path: '/berita',
  },

  bahaya: {
    label: 'Bahaya Gadget',
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
    path: '/bahaya-gadget',
  },

  alternatif: {
    label: 'Alternatif Gadget',
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    path: '/pengganti-gadget',
  },
}

const typeHeaderGrad: Record<string, string> = {
  berita: 'from-sky-600 to-blue-700',
  bahaya: 'from-rose-700 to-red-900',
  alternatif: 'from-emerald-600 to-teal-700',
}

const badge = computed(() => {
  return article.value ? typeBadge[article.value.type] : typeBadge.berita
})

const gradHd = computed(() => {
  return article.value ? typeHeaderGrad[article.value.type] : typeHeaderGrad.berita
})

const related = computed(() => {
  if (!article.value) return []

  return allArticles.value
    .filter((a) => a.type === article.value?.type && a.id !== article.value?.id)
    .slice(0, 3)
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div
    v-if="isLoading"
    class="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3"
  >
    <div class="h-10 w-10 rounded-full border-4 border-slate-200 border-t-sky-500 animate-spin" />
    <p class="text-sm text-slate-500">Memuat artikel...</p>
  </div>

  <div
    v-else-if="!article"
    class="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4"
  >
    <h2 class="text-2xl font-black text-slate-700">Artikel tidak ditemukan</h2>

    <button
      @click="goBack"
      class="inline-flex items-center gap-2 text-sky-600 font-semibold hover:underline"
    >
      <ArrowLeft class="w-4 h-4" />

      Kembali
    </button>
  </div>

  <div v-else class="bg-slate-50 min-h-screen">
    <!-- Header -->
    <div :class="`bg-gradient-to-r ${gradHd} py-10`">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-white/70 text-sm mb-4">
          <RouterLink to="/" class="hover:text-white transition-colors"> Beranda </RouterLink>

          <ChevronRight class="w-4 h-4" />

          <RouterLink :to="badge?.path" class="hover:text-white transition-colors">
            {{ badge?.label }}
          </RouterLink>

          <ChevronRight class="w-4 h-4" />

          <span class="text-white font-medium line-clamp-1">
            {{ article.title }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-3 mb-3">
          <span :class="`${badge?.bg} ${badge?.text} text-xs font-bold px-3 py-1 rounded-full`">
            {{ article.category }}
          </span>
        </div>

        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug max-w-3xl mb-4"
        >
          {{ article.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-4 text-white/70 text-sm">
          <span class="flex items-center gap-1.5">
            <User class="w-4 h-4" />
            {{ article.author }} — {{ article.role }}
          </span>

          <span class="flex items-center gap-1.5">
            <Calendar class="w-4 h-4" />
            {{ article.date }}
          </span>

          <span class="flex items-center gap-1.5">
            <Clock class="w-4 h-4" />
            {{ article.readTime }} baca
          </span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Back -->
      <button
        @click="goBack"
        class="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />

        Kembali ke daftar artikel
      </button>

      <div class="grid lg:grid-cols-[1fr_300px] gap-10">
        <!-- CONTENT -->
        <article>
          <!-- Hero -->
          <div class="rounded-2xl overflow-hidden mb-8 shadow-md">
            <img :src="article.img" :alt="article.title" class="w-full h-64 sm:h-80 object-cover" />
          </div>

          <!-- Lead -->
          <div
            :class="`border-l-4 ${badge?.border} rounded-r-xl bg-white px-6 py-5 mb-8 shadow-sm`"
          >
            <p :class="`${badge?.text} text-sm font-semibold mb-1`">Pendahuluan</p>

            <p class="text-slate-700 text-base leading-relaxed">
              {{ article.lead }}
            </p>
          </div>

          <!-- Sections -->
          <div class="space-y-8">
            <div
              v-for="(section, i) in article.sections"
              :key="i"
              class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <h2
                v-if="section.heading"
                class="text-slate-800 font-black text-xl mb-4 flex items-center gap-2"
              >
                <span
                  :class="[
                    'w-1 h-6 rounded-full inline-block flex-shrink-0',
                    article.type === 'bahaya'
                      ? 'bg-rose-500'
                      : article.type === 'alternatif'
                        ? 'bg-emerald-500'
                        : 'bg-sky-500',
                  ]"
                />

                {{ section.heading }}
              </h2>

              <p class="text-slate-600 text-sm leading-[1.85] mb-4">
                {{ section.body }}
              </p>

              <ul v-if="section.list" class="space-y-2.5">
                <li v-for="(item, li) in section.list" :key="li" class="flex items-start gap-3">
                  <span
                    :class="[
                      'w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold text-white',
                      article.type === 'bahaya'
                        ? 'bg-rose-500'
                        : article.type === 'alternatif'
                          ? 'bg-emerald-500'
                          : 'bg-sky-500',
                    ]"
                  >
                    {{ li + 1 }}
                  </span>

                  <span class="text-slate-600 text-sm leading-relaxed">
                    {{ item }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <!-- REFERENCES -->
          <div class="mt-10 bg-slate-100 rounded-2xl p-6 border border-slate-200">
            <div class="flex items-center gap-2 mb-5">
              <BookOpen class="w-5 h-5 text-slate-600" />

              <h3 class="text-slate-800 font-black text-base">Daftar Pustaka / Referensi</h3>
            </div>

            <ol class="space-y-3">
              <li v-for="ref in article.references" :key="ref.num" class="flex items-start gap-3">
                <span
                  class="w-6 h-6 bg-slate-300 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                >
                  {{ ref.num }}
                </span>

                <div class="flex-1">
                  <p class="text-slate-600 text-xs leading-relaxed">
                    {{ ref.text }}
                  </p>

                  <a
                    v-if="ref.url"
                    :href="ref.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 text-xs font-medium mt-0.5"
                  >
                    <ExternalLink class="w-3 h-3" />

                    Buka Sumber
                  </a>
                </div>
              </li>
            </ol>
          </div>
        </article>

        <!-- SIDEBAR -->
        <aside class="space-y-6">
          <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 sticky top-24">
            <h3 class="text-slate-800 font-bold text-sm mb-3 border-b border-slate-100 pb-3">
              Ringkasan Artikel
            </h3>

            <p class="text-slate-500 text-xs leading-relaxed mb-4">
              {{ article.excerpt }}
            </p>
          </div>

          <!-- Related -->
          <div
            v-if="related.length > 0"
            class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
          >
            <h3 class="text-slate-800 font-bold text-sm mb-4">Artikel Terkait</h3>

            <div class="space-y-4">
              <RouterLink
                v-for="rel in related"
                :key="rel.id"
                :to="`/artikel/${rel.id}`"
                class="flex gap-3 group"
              >
                <img
                  :src="rel.img"
                  :alt="rel.title"
                  class="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />

                <div class="flex-1 min-w-0">
                  <p
                    class="text-slate-700 text-xs font-semibold leading-snug mb-1.5 group-hover:text-sky-600 transition-colors line-clamp-2"
                  >
                    {{ rel.title }}
                  </p>

                  <div class="flex items-center gap-2 text-xs text-slate-400">
                    <Clock class="w-3 h-3" />

                    <span>{{ rel.readTime }}</span>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
