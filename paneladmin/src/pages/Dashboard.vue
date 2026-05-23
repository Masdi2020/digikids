<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
      >
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.iconBg]">
          <component :is="stat.icon" :class="['w-5 h-5', stat.iconColor]" />
        </div>
        <div class="text-2xl font-black text-slate-800 mb-0.5">{{ stat.value }}</div>
        <div class="text-slate-500 text-xs font-medium">{{ stat.label }}</div>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <div
        v-for="section in articleSections"
        :key="section.type"
        :class="['bg-white rounded-2xl border shadow-sm overflow-hidden', section.border]"
      >
        <div :class="['px-5 py-3 flex items-center gap-2 border-b', section.headerBg, section.border]">
          <component :is="section.icon" :class="['w-4 h-4', section.textColor]" />
          <h3 :class="['font-bold text-sm', section.textColor]">{{ section.label }}</h3>
          <span :class="['ml-auto text-xs font-bold px-2 py-0.5 rounded-full', section.badgeBg, section.textColor]">
            {{ section.articles.length }}
          </span>
        </div>
        <div class="divide-y divide-slate-50">
          <div
            v-for="article in section.articles.slice(0, 3)"
            :key="article.id"
            class="flex items-start gap-3 px-5 py-3"
          >
            <img
              :src="article.img"
              :alt="article.title"
              class="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-slate-700 text-xs font-semibold line-clamp-2 leading-snug">{{ article.title }}</p>
              <p class="text-slate-400 text-xs mt-0.5">{{ article.date }}</p>
            </div>
          </div>
        </div>
        <RouterLink
          :to="section.managePath"
          :class="['flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-t transition-colors', section.border, section.textColor, `hover:${section.headerBg}`]"
        >
          Kelola <ArrowRight class="w-3.5 h-3.5" />
        </RouterLink>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-5">
      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div class="flex items-center gap-2 mb-4">
          <BookOpen class="w-5 h-5 text-violet-600" />
          <h3 class="font-bold text-slate-800 text-sm">Konten Panduan</h3>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="info in panduanInfo"
            :key="info.label"
            :class="['rounded-xl p-3 border', info.bg, info.border]"
          >
            <div :class="['text-2xl font-black mb-0.5', info.text]">{{ info.count }}</div>
            <div class="text-slate-600 text-xs font-medium">{{ info.label }}</div>
          </div>
        </div>
        <RouterLink
          to="/panduan"
          class="flex items-center justify-center gap-1.5 mt-4 py-2.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition-colors"
        >
          Kelola Panduan <ArrowRight class="w-3.5 h-3.5" />
        </RouterLink>
      </div>

      <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div class="flex items-center gap-2 mb-4">
          <Video class="w-5 h-5 text-amber-600" />
          <h3 class="font-bold text-slate-800 text-sm">Video Edukasi</h3>
        </div>
        <div class="space-y-2">
          <div
            v-for="video in adminStore.videos.slice(0, 4)"
            :key="video.id"
            class="flex items-center gap-3"
          >
            <img :src="video.img" :alt="video.title" class="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-slate-700 text-xs font-semibold line-clamp-1">{{ video.title }}</p>
              <p class="text-slate-400 text-xs">{{ video.category }}</p>
            </div>
            <span v-if="video.featured" class="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
              Featured
            </span>
          </div>
        </div>
        <RouterLink
          to="/video-edukasi"
          class="flex items-center justify-center gap-1.5 mt-4 py-2.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors"
        >
          Kelola Video <ArrowRight class="w-3.5 h-3.5" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Newspaper, AlertTriangle, Gamepad2, Video, ArrowRight, BookOpen } from 'lucide-vue-next'
import { useAdminStore } from '../stores/adminStore'

const adminStore = useAdminStore()

const beritaArticles = computed(() => adminStore.articles.filter(a => a.type === 'berita'))
const bahayaArticles = computed(() => adminStore.articles.filter(a => a.type === 'bahaya'))
const alternatifArticles = computed(() => adminStore.articles.filter(a => a.type === 'alternatif'))

const stats = computed(() => [
  { label: 'Total Artikel',  value: adminStore.articles.length,        icon: Newspaper,     iconBg: 'bg-sky-100',    iconColor: 'text-sky-600' },
  { label: 'Artikel Berita', value: beritaArticles.value.length,       icon: Newspaper,     iconBg: 'bg-blue-100',   iconColor: 'text-blue-600' },
  { label: 'Bahaya Gadget',  value: bahayaArticles.value.length,       icon: AlertTriangle, iconBg: 'bg-rose-100',   iconColor: 'text-rose-600' },
  { label: 'Video Edukasi',  value: adminStore.videos.length,          icon: Video,         iconBg: 'bg-amber-100',  iconColor: 'text-amber-600' },
])

const articleSections = computed(() => [
  {
    type: 'berita',
    label: 'Berita Terbaru',
    icon: Newspaper,
    articles: beritaArticles.value,
    border: 'border-sky-100',
    headerBg: 'bg-sky-50',
    badgeBg: 'bg-sky-100',
    textColor: 'text-sky-700',
    managePath: '/berita',
  },
  {
    type: 'bahaya',
    label: 'Bahaya Gadget',
    icon: AlertTriangle,
    articles: bahayaArticles.value,
    border: 'border-rose-100',
    headerBg: 'bg-rose-50',
    badgeBg: 'bg-rose-100',
    textColor: 'text-rose-700',
    managePath: '/bahaya-gadget',
  },
  {
    type: 'alternatif',
    label: 'Alternatif Gadget',
    icon: Gamepad2,
    articles: alternatifArticles.value,
    border: 'border-emerald-100',
    headerBg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-100',
    textColor: 'text-emerald-700',
    managePath: '/alternatif',
  },
])

const panduanInfo = computed(() => [
  { label: 'Kelompok Usia',    count: adminStore.screenTime.length,    bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-700' },
  { label: 'Langkah Panduan',  count: adminStore.parentalSteps.length, bg: 'bg-sky-50',    border: 'border-sky-100',    text: 'text-sky-700' },
  { label: 'FAQ',              count: adminStore.faqItems.length,      bg: 'bg-amber-50',  border: 'border-amber-100',  text: 'text-amber-700' },
  { label: 'Aturan Keluarga',  count: adminStore.familyRules.length,   bg: 'bg-emerald-50',border: 'border-emerald-100',text: 'text-emerald-700' },
])
</script>
