<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/block-lang -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import EmblaCarousel, { type EmblaCarouselType } from 'embla-carousel'

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Video,
  Shield,
  AlertTriangle,
  Gamepad2,
  Clock,
  Calendar,
} from 'lucide-vue-next'

import type { Article } from '../data/articles'
import { fetchArticles } from '../lib/api'

// ──────────────────────────────────────────────
// HERO SLIDER
// ──────────────────────────────────────────────
const allArticles = ref<Article[]>([])
const beritaArticles = computed(() => allArticles.value.filter((a) => a.type === 'berita'))
const bahayaArticles = computed(() => allArticles.value.filter((a) => a.type === 'bahaya'))
const alternatifArticles = computed(() => allArticles.value.filter((a) => a.type === 'alternatif'))
const heroSlides = computed(() => beritaArticles.value.slice(0, 5))
const selectedIndex = ref(0)

let emblaApi: EmblaCarouselType | undefined
let autoplayTimer: ReturnType<typeof setInterval> | undefined

const emblaRef = ref<HTMLElement | null>(null)

function initEmbla() {
  if (!emblaRef.value) return

  const api = EmblaCarousel(emblaRef.value, { loop: true })
  emblaApi = api

  api.on('select', () => {
    selectedIndex.value = api.selectedScrollSnap()
  })

  autoplayTimer = setInterval(() => {
    api.scrollNext()
  }, 5500)
}

function scrollPrev() {
  emblaApi?.scrollPrev()
}

function scrollNext() {
  emblaApi?.scrollNext()
}

function scrollTo(i: number) {
  emblaApi?.scrollTo(i)
}

onMounted(async () => {
  allArticles.value = await fetchArticles()
  initEmbla()
})

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
  emblaApi?.destroy()
})

// ──────────────────────────────────────────────
// BAHAYA + ALTERNATIF + BERITA
// ──────────────────────────────────────────────
const bahayaPreview = computed(() => bahayaArticles.value.slice(0, 3))
const alternatifPreview = computed(() => alternatifArticles.value.slice(0, 3))
const beritaPreview = computed(() => beritaArticles.value.slice(0, 4))

const cardColors = [
  {
    bg: 'bg-emerald-500',
    light: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  { bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
] as const

function colorAt(i: number) {
  return cardColors[i % cardColors.length] ?? cardColors[0]
}
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- ══════════════════════════════════════════
         HERO SLIDER
    ══════════════════════════════════════════ -->
    <section class="relative w-full overflow-hidden" style="height: 76vh; min-height: 420px">
      <div ref="emblaRef" class="overflow-hidden h-full">
        <div class="flex h-full">
          <div
            v-for="article in heroSlides"
            :key="article.id"
            class="flex-[0_0_100%] relative h-full"
          >
            <img
              :src="article.img"
              :alt="article.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/20"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"
            />

            <div class="relative h-full flex items-center">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="max-w-2xl">
                  <div class="flex items-center gap-3 mb-4">
                    <span class="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {{ article.category }}
                    </span>
                    <span class="text-slate-300 text-xs flex items-center gap-1">
                      <Calendar class="w-3 h-3" /> {{ article.date }}
                    </span>
                    <span class="text-slate-300 text-xs flex items-center gap-1">
                      <Clock class="w-3 h-3" /> {{ article.readTime }} baca
                    </span>
                  </div>
                  <h2
                    class="text-white font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-4"
                  >
                    {{ article.title }}
                  </h2>
                  <p class="text-slate-300 text-base leading-relaxed mb-6 max-w-xl line-clamp-3">
                    {{ article.excerpt }}
                  </p>
                  <RouterLink
                    :to="`/artikel/${article.id}`"
                    class="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:gap-3 shadow-lg"
                  >
                    Baca Artikel <ArrowRight class="w-4 h-4" />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Arrows -->
      <button
        @click="scrollPrev"
        aria-label="Previous slide"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>
      <button
        @click="scrollNext"
        aria-label="Next slide"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20"
      >
        <ChevronRight class="w-5 h-5" />
      </button>

      <!-- Dots -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <button
          v-for="(_, i) in heroSlides"
          :key="i"
          @click="scrollTo(i)"
          :aria-label="`Go to slide ${i + 1}`"
          :class="[
            'rounded-full transition-all duration-300',
            i === selectedIndex
              ? 'w-8 h-2.5 bg-sky-400'
              : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70',
          ]"
        />
      </div>

      <!-- Counter -->
      <div
        class="absolute top-6 right-6 z-10 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full"
      >
        {{ selectedIndex + 1 }} / {{ heroSlides.length }}
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         BAHAYA GADGET
    ══════════════════════════════════════════ -->
    <section class="bg-slate-900 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <AlertTriangle class="w-5 h-5 text-rose-400" />
              <span class="text-rose-400 font-bold text-sm uppercase tracking-widest">
                Bahaya Gadget
              </span>
            </div>
            <h2 class="text-white font-black text-2xl lg:text-3xl leading-tight">
              Kenali Risiko Sebelum<br />Terlambat
            </h2>
            <p class="text-slate-400 text-sm mt-2 max-w-md">
              Artikel berbasis riset ilmiah tentang dampak nyata penggunaan gadget berlebih pada
              anak.
            </p>
          </div>
          <RouterLink
            to="/bahaya-gadget"
            class="self-start sm:self-auto inline-flex items-center gap-2 border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          >
            Lihat Semua <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <RouterLink
            v-for="art in bahayaPreview"
            :key="art.id"
            :to="`/artikel/${art.id}`"
            class="group relative bg-slate-800/70 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-rose-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                :src="art.img"
                :alt="art.title"
                class="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"
              />
              <span
                class="absolute top-3 left-3 bg-rose-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full"
              >
                {{ art.category }}
              </span>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3
                class="text-white font-bold text-sm leading-snug mb-2 group-hover:text-rose-300 transition-colors line-clamp-2"
              >
                {{ art.title }}
              </h3>
              <p class="text-slate-400 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                {{ art.excerpt }}
              </p>
              <div
                class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-700/50"
              >
                <span class="flex items-center gap-1">
                  <Calendar class="w-3 h-3" /> {{ art.date }}
                </span>
                <span
                  class="flex items-center gap-1 text-rose-400 font-medium group-hover:gap-2 transition-all"
                >
                  Baca <ArrowRight class="w-3 h-3" />
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         ALTERNATIF SERU
    ══════════════════════════════════════════ -->
    <section class="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <Gamepad2 class="w-5 h-5 text-emerald-600" />
              <span class="text-emerald-600 font-bold text-sm uppercase tracking-widest">
                Alternatif Seru
              </span>
            </div>
            <h2 class="text-slate-800 font-black text-2xl lg:text-3xl leading-tight">
              Seru dan Sehat<br />Tanpa Gadget
            </h2>
            <p class="text-slate-500 text-sm mt-2 max-w-md">
              Ide aktivitas kreatif dan menyenangkan yang jauh lebih baik untuk tumbuh kembang anak.
            </p>
          </div>
          <RouterLink
            to="/pengganti-gadget"
            class="self-start sm:self-auto inline-flex items-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
          >
            Lihat Semua <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <RouterLink
            v-for="(art, i) in alternatifPreview"
            :key="art.id"
            :to="`/artikel/${art.id}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                :src="art.img"
                :alt="art.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span
                :class="[
                  colorAt(i).bg,
                  'absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-full',
                ]"
              >
                {{ art.category }}
              </span>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3
                :class="[
                  'text-slate-800 font-bold text-sm leading-snug mb-2 transition-colors line-clamp-2',
                  `group-hover:${colorAt(i).text}`,
                ]"
              >
                {{ art.title }}
              </h3>
              <p class="text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1 mb-4">
                {{ art.excerpt }}
              </p>
              <div
                :class="[
                  'flex items-center gap-1.5 text-xs font-semibold group-hover:gap-2.5 transition-all',
                  colorAt(i).text,
                ]"
              >
                Baca Selengkapnya <ArrowRight class="w-3.5 h-3.5" />
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         PANDUAN + VIDEO CTA
    ══════════════════════════════════════════ -->
    <section class="py-16 bg-white border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-slate-800 font-black text-2xl lg:text-3xl mb-2">
            Panduan dan Edukasi Video
          </h2>
          <p class="text-slate-500 text-sm max-w-md mx-auto">
            Pelajari cara mengelola penggunaan gadget dengan panduan terstruktur dan video
            informatif.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <!-- Panduan -->
          <RouterLink
            to="/panduan"
            class="group relative bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl overflow-hidden p-7 flex flex-col justify-between min-h-[200px] shadow-lg hover:shadow-violet-300 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
            <div class="absolute -right-2 bottom-0 w-20 h-20 bg-white/5 rounded-full" />
            <div class="relative">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Shield class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-white font-black text-xl mb-2">Panduan Screen Time</h3>
              <p class="text-violet-200 text-sm leading-relaxed">
                Panduan lengkap berdasarkan usia, FAQ, dan langkah-langkah parental control.
              </p>
            </div>
            <div
              class="relative mt-5 inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all"
            >
              Baca Panduan <ArrowRight class="w-4 h-4" />
            </div>
          </RouterLink>

          <!-- Video -->
          <RouterLink
            to="/video-edukasi"
            class="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl overflow-hidden p-7 flex flex-col justify-between min-h-[200px] shadow-lg hover:shadow-amber-300 hover:-translate-y-1 transition-all duration-300"
          >
            <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
            <div class="absolute -right-2 bottom-0 w-20 h-20 bg-white/5 rounded-full" />
            <div class="relative">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Video class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-white font-black text-xl mb-2">Video Edukasi</h3>
              <p class="text-amber-100 text-sm leading-relaxed">
                Koleksi video informatif tentang gadget, parental control, dan aktivitas anak.
              </p>
            </div>
            <div
              class="relative mt-5 inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all"
            >
              Tonton Video <ArrowRight class="w-4 h-4" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         BERITA TERBARU
    ══════════════════════════════════════════ -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-8">
          <div>
            <span class="text-sky-600 font-bold text-sm uppercase tracking-widest block mb-2">
              Berita Terkini
            </span>
            <h2 class="text-slate-800 font-black text-2xl">Update Terbaru</h2>
          </div>
          <RouterLink
            to="/berita"
            class="text-sky-600 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            Semua Berita <ArrowRight class="w-4 h-4" />
          </RouterLink>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <RouterLink
            v-for="art in beritaPreview"
            :key="art.id"
            :to="`/artikel/${art.id}`"
            class="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
          >
            <div class="h-36 overflow-hidden">
              <img
                :src="art.img"
                :alt="art.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="p-4 flex flex-col flex-1">
              <span class="text-sky-600 text-xs font-semibold mb-1.5">{{ art.category }}</span>
              <h4
                class="text-slate-800 font-bold text-sm leading-snug flex-1 line-clamp-2 group-hover:text-sky-600 transition-colors"
              >
                {{ art.title }}
              </h4>
              <div
                class="flex items-center gap-1 text-slate-400 text-xs mt-3 pt-2 border-t border-slate-100"
              >
                <Clock class="w-3 h-3" /> {{ art.readTime }}
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         ABOUT STRIP
    ══════════════════════════════════════════ -->
    <section class="bg-slate-900 py-12">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <p class="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">
            Program Pengabdian Masyarakat
          </p>
          <h3 class="text-white font-black text-xl">BijakGadget — RT 045 Karang Joang</h3>
          <p class="text-slate-400 text-sm mt-1">
            Portal edukasi gratis untuk keluarga yang peduli masa depan digital anak.
          </p>
        </div>
        <div class="flex gap-3 flex-shrink-0">
          <RouterLink
            to="/about"
            class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all"
          >
            Tentang Kami
          </RouterLink>
          <RouterLink
            to="/panduan"
            class="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-400 transition-all"
          >
            <BookOpen class="w-4 h-4" /> Mulai Belajar
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
