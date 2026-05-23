<template>
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-slate-800 font-black text-xl">Kelola Video Edukasi</h2>
        <p class="text-slate-500 text-sm">{{ adminStore.videos.length }} video tersedia</p>
      </div>
      <button
        @click="openAdd"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors"
      >
        <Plus class="w-4 h-4" /> Tambah Video
      </button>
    </div>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <button
        @click="openAdd"
        class="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all min-h-[200px]"
      >
        <Plus class="w-10 h-10" />
        <span class="font-semibold text-sm">Tambah Video Baru</span>
      </button>

      <div
        v-for="video in adminStore.videos"
        :key="video.id"
        class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col"
      >
        <div class="relative h-40 overflow-hidden bg-slate-900">
          <img
            :src="video.img"
            :alt="video.title"
            class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span class="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {{ video.tag }}
            </span>
            <span class="bg-black/70 text-white text-xs px-2 py-1 rounded font-mono">{{ video.duration }}</span>
          </div>
          <span
            v-if="video.featured"
            class="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
          >
            Featured
          </span>
        </div>
        <div class="p-4 flex flex-col flex-1">
          <h3 class="text-slate-800 font-bold text-sm leading-snug mb-1 line-clamp-2">{{ video.title }}</h3>
          <span class="text-slate-400 text-xs mb-3">{{ video.category }}</span>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-4">
            <span class="flex items-center gap-1"><Eye class="w-3 h-3" />{{ video.views }}</span>
            <span class="flex items-center gap-1"><ThumbsUp class="w-3 h-3" />{{ video.likes }}</span>
          </div>
          <div class="flex gap-2 mt-auto">
            <button
              @click="openEdit(video)"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              <Pencil class="w-3.5 h-3.5" /> Edit
            </button>
            <button
              @click="openDelete(video)"
              class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              <Trash2 class="w-3.5 h-3.5" /> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <VideoForm
    v-if="showForm"
    :video="editingVideo"
    @close="showForm = false"
    @submit="handleFormSubmit"
  />

  <ConfirmDialog
    v-if="deletingVideo"
    title="Hapus Video?"
    :message="`Video &quot;${deletingVideo.title}&quot; akan dihapus permanen.`"
    @confirm="handleDelete"
    @cancel="deletingVideo = null"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Eye, ThumbsUp, Pencil, Trash2 } from 'lucide-vue-next'
import { useAdminStore } from '../stores/adminStore'
import type { Video } from '../data/videos'
import VideoForm from '../components/VideoForm.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const adminStore = useAdminStore()
const showForm = ref(false)
const editingVideo = ref<Video | null>(null)
const deletingVideo = ref<Video | null>(null)

function openAdd() {
  editingVideo.value = null
  showForm.value = true
}

function openEdit(video: Video) {
  editingVideo.value = video
  showForm.value = true
}

function openDelete(video: Video) {
  deletingVideo.value = video
}

function handleFormSubmit(video: Video) {
  if (editingVideo.value) {
    adminStore.updateVideo(video)
  } else {
    adminStore.addVideo(video)
  }
  showForm.value = false
  editingVideo.value = null
}

function handleDelete() {
  if (deletingVideo.value) {
    adminStore.deleteVideo(deletingVideo.value.id)
    deletingVideo.value = null
  }
}
</script>
