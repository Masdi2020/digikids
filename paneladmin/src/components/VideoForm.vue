<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
      <div class="flex items-center justify-between p-5 border-b border-slate-100">
        <h2 class="text-slate-800 font-black text-lg">
          {{ video ? 'Edit Video' : 'Tambah Video Baru' }}
        </h2>
        <button @click="$emit('close')" class="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="p-5 space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Judul Video *</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Judul video edukasi..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Tag</label>
            <input
              v-model="form.tag"
              type="text"
              placeholder="Misal: 🩺 Dokter"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Durasi</label>
            <input
              v-model="form.duration"
              type="text"
              placeholder="Misal: 12:34"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">YouTube ID</label>
            <input
              v-model="form.youtubeId"
              type="text"
              placeholder="Misal: dQw4w9WgXcQ"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Tayangan</label>
            <input
              v-model="form.views"
              type="text"
              placeholder="Misal: 24.5K"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Suka</label>
            <input
              v-model="form.likes"
              type="text"
              placeholder="Misal: 1.2K"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">URL Thumbnail *</label>
          <input
            v-model="form.img"
            type="text"
            placeholder="https://..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="form.featured"
            type="checkbox"
            class="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
          />
          <span class="text-sm text-slate-700 font-medium">Jadikan Video Pilihan Utama</span>
        </label>

        <div v-if="form.img" class="rounded-xl overflow-hidden h-32 mt-2">
          <img :src="form.img" alt="preview" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-100">
        <button
          @click="$emit('close')"
          class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Batal
        </button>
        <button
          @click="handleSubmit"
          class="px-5 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
        >
          {{ video ? 'Simpan Perubahan' : 'Tambah Video' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { X } from 'lucide-vue-next'
import type { Video } from '../data/videos'
import { VIDEO_CATEGORIES } from '../data/videos'

const props = defineProps<{ video?: Video | null }>()
const emit = defineEmits<{
  close: []
  submit: [video: Video]
}>()

const categories = VIDEO_CATEGORIES.filter(c => c !== 'Semua')

const form = reactive<Omit<Video, 'id'>>({
  title:      props.video?.title ?? '',
  category:   props.video?.category ?? categories[0],
  tag:        props.video?.tag ?? '',
  duration:   props.video?.duration ?? '',
  youtubeId:  props.video?.youtubeId ?? '',
  views:      props.video?.views ?? '0',
  likes:      props.video?.likes ?? '0',
  img:        props.video?.img ?? '',
  featured:   props.video?.featured ?? false,
})

function handleSubmit() {
  if (!form.title.trim() || !form.img.trim()) {
    alert('Judul dan thumbnail wajib diisi.')
    return
  }
  emit('submit', {
    id: props.video?.id ?? Date.now(),
    ...form,
  })
}
</script>
