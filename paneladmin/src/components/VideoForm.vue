<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8">
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
          <label class="block text-xs font-semibold text-slate-600 mb-1">Link YouTube *</label>
          <input
            v-model="youtubeUrl"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            @input="syncYouTubeUrl"
          >
          <p :class="['mt-1 text-xs font-medium', youtubeError ? 'text-rose-600' : 'text-slate-500']">
            {{ youtubeError || 'Tempel link YouTube biasa, Shorts, embed, atau youtu.be.' }}
          </p>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Judul Video</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Judul video edukasi..."
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
        </div>

        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="form.featured"
            type="checkbox"
            class="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
          >
          <span class="text-sm text-slate-700 font-medium">Jadikan Video Pilihan Utama</span>
        </label>

        <div v-if="form.img" class="rounded-xl overflow-hidden bg-slate-900">
          <img :src="form.img" alt="preview" class="w-full aspect-video object-cover">
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
import { reactive, ref } from 'vue'
import { X } from 'lucide-vue-next'
import type { Video } from '../data/videos'
import { VIDEO_CATEGORIES } from '../data/videos'

const props = defineProps<{ video?: Video | null }>()
const emit = defineEmits<{
  close: []
  submit: [video: Video]
}>()

const categories = VIDEO_CATEGORIES.filter(c => c !== 'Semua')
const youtubeUrl = ref(props.video?.youtubeId ? `https://www.youtube.com/watch?v=${props.video.youtubeId}` : '')
const youtubeError = ref('')

const form = reactive<Omit<Video, 'id'>>({
  title:     props.video?.title ?? '',
  category:  props.video?.category ?? categories[0],
  tag:       props.video?.tag ?? '',
  duration:  props.video?.duration ?? '',
  youtubeId: props.video?.youtubeId ?? '',
  views:     props.video?.views ?? '0',
  likes:     props.video?.likes ?? '0',
  img:       props.video?.img ?? '',
  featured:  props.video?.featured ?? false,
})

function parseYouTubeId(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ''

  try {
    const url = new URL(trimmed)
    const host = url.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return cleanId(url.pathname.slice(1))
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const fromQuery = url.searchParams.get('v')
      if (fromQuery) return cleanId(fromQuery)

      const parts = url.pathname.split('/').filter(Boolean)
      const marker = parts.findIndex(part => ['embed', 'shorts', 'live', 'v'].includes(part))
      if (marker !== -1 && parts[marker + 1]) {
        return cleanId(parts[marker + 1])
      }
    }
  } catch {
    return cleanId(trimmed)
  }

  return ''
}

function cleanId(value: string) {
  const match = value.match(/[a-zA-Z0-9_-]{11}/)
  return match?.[0] ?? ''
}

function youtubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

function syncYouTubeUrl() {
  youtubeError.value = ''
  const id = parseYouTubeId(youtubeUrl.value)

  if (!youtubeUrl.value.trim()) {
    form.youtubeId = ''
    form.img = ''
    return
  }

  if (!id) {
    youtubeError.value = 'Link YouTube tidak valid.'
    return
  }

  form.youtubeId = id
  form.img = youtubeThumbnail(id)
}

function handleSubmit() {
  syncYouTubeUrl()

  if (!form.youtubeId) {
    youtubeError.value = 'Link YouTube wajib diisi.'
    return
  }

  emit('submit', {
    id: props.video?.id ?? Date.now(),
    ...form,
    title: form.title.trim() || 'Video YouTube',
    tag: form.tag.trim() || 'YouTube',
    img: form.img || youtubeThumbnail(form.youtubeId),
  })
}
</script>
