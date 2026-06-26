<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Play,
  X,
  ChevronRight,
  Search,
} from "lucide-vue-next";
import type { Video } from '../data/videos'
import { VIDEO_CATEGORIES } from '../data/videos'
import { fetchVideos } from '../lib/api'

const categories = VIDEO_CATEGORIES
const videos = ref<Video[]>([])

onMounted(async () => {
  videos.value = await fetchVideos()
})

const activeCategory = ref("Semua");
const search = ref("");
const selectedVideo = ref<Video | null>(null);

const filtered = computed(() =>
  videos.value.filter((v) => {
    const matchCat = activeCategory.value === "Semua" || v.category === activeCategory.value;
    const matchSearch = v.title.toLowerCase().includes(search.value.toLowerCase());
    return matchCat && matchSearch;
  })
)

const featured = computed(() => filtered.value.find((v) => v.featured) ?? filtered.value[0] ?? null);
const rest = computed(() => filtered.value.filter((v) => v.id !== featured.value?.id))

function youtubeEmbedUrl(video: Video) {
  const origin = window.location.origin
  return `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1&origin=${encodeURIComponent(origin)}`
}

function youtubeWatchUrl(video: Video) {
  return `https://www.youtube.com/watch?v=${video.youtubeId}`
}
</script>

<template>
  <div class="bg-slate-50 min-h-screen">

    <!-- Page Header -->
    <div class="bg-gradient-to-br from-amber-500 to-orange-600 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 text-amber-200 text-sm mb-3">
          <span>Beranda</span>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white font-medium">Video Edukasi</span>
        </div>
        <h1 class="text-3xl lg:text-4xl font-black text-white mb-2">
          Video Edukasi
        </h1>
        <p class="text-amber-100 text-sm max-w-xl">
          Koleksi video informatif tentang penggunaan gadget yang bijak, parental
          control, dan aktivitas alternatif untuk anak.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- Search + Filter -->
      <div class="flex flex-col sm:flex-row gap-4 mb-8">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Cari video..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              activeCategory === cat
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Featured Video -->
      <div v-if="featured" class="mb-8">
        <h2 class="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4 flex items-center gap-2">
          Video Pilihan Utama
        </h2>
        <div
          class="relative bg-slate-900 rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
          @click="selectedVideo = featured"
        >
          <img
            :src="featured.img"
            :alt="featured.title"
            class="w-full h-72 lg:h-96 object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <!-- Play Button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play class="w-9 h-9 text-white fill-white ml-1.5" />
            </div>
          </div>
          <div class="absolute bottom-6 left-6 right-6">
            <div class="flex items-center gap-2 mb-2">
              <span class="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {{ featured.tag }}
              </span>
            </div>
            <h3 class="text-white font-black text-xl lg:text-2xl leading-snug mb-2">
              {{ featured.title }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Video Grid -->
      <template v-if="rest.length > 0">
        <h2 class="text-sm font-bold text-slate-600 uppercase tracking-wide mb-4">
          Semua Video ({{ rest.length }})
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="video in rest"
            :key="video.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            @click="selectedVideo = video"
          >
            <!-- Thumbnail -->
            <div class="relative overflow-hidden h-48">
              <img
                :src="video.img"
                :alt="video.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <!-- Play Overlay -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-14 h-14 bg-amber-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                  <Play class="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>
              <!-- Bottom meta -->
              <div class="absolute bottom-3 left-3 right-3 flex items-center justify-start">
                <span class="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {{ video.tag }}
                </span>
              </div>
            </div>
            <!-- Info -->
            <div class="p-4">
              <h3 class="text-slate-800 font-bold text-sm leading-snug mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                {{ video.title }}
              </h3>
            </div>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="text-center py-20 text-slate-500">
        <Play class="w-12 h-12 mx-auto mb-3 text-slate-300" />
        <p class="font-medium">Tidak ada video yang ditemukan</p>
      </div>

    </div>

    <!-- Video Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedVideo"
          class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          @click="selectedVideo = null"
        >
          <div
            class="bg-slate-900 rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl"
            @click.stop
          >
            <!-- Video Player -->
            <div class="relative bg-black aspect-video">
              <iframe
                v-if="selectedVideo.youtubeId"
                :src="youtubeEmbedUrl(selectedVideo)"
                :title="selectedVideo.title"
                class="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
              <img
                v-else
                :src="selectedVideo.img"
                :alt="selectedVideo.title"
                class="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <button
                @click="selectedVideo = null"
                class="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <X class="w-4 h-4 text-white" />
              </button>
            </div>
            <div class="p-5">
              <h3 class="text-white font-bold text-lg mb-2">{{ selectedVideo.title }}</h3>
              <div class="flex justify-end">
                <a
                  v-if="selectedVideo.youtubeId"
                  :href="youtubeWatchUrl(selectedVideo)"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Buka di YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 200ms ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
