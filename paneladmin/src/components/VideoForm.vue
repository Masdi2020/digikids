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
            @input="clearImageStatus"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Upload Thumbnail</label>
          <div
            :class="[
              'relative rounded-xl border-2 border-dashed p-4 transition-all',
              isDraggingImage
                ? 'border-amber-400 bg-amber-50'
                : 'border-slate-200 bg-slate-50 hover:border-amber-300 hover:bg-amber-50/50',
            ]"
            @dragenter.prevent="isDraggingImage = true"
            @dragover.prevent="isDraggingImage = true"
            @dragleave.prevent="isDraggingImage = false"
            @drop.prevent="handleImageDrop"
          >
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageSelect"
            />
            <div class="flex flex-col items-center justify-center text-center min-h-28">
              <UploadCloud class="mb-3 h-8 w-8 text-amber-500" />
              <span class="text-sm font-semibold text-slate-700">Drag & drop thumbnail di sini</span>
              <span class="mt-1 text-xs text-slate-500">atau klik tombol untuk memilih file dari perangkat</span>
              <span class="mt-2 text-[11px] font-medium text-slate-400">Format JPG, PNG, WEBP. Maksimal 5 MB.</span>
              <button
                type="button"
                @click="openImagePicker"
                class="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
              >
                <UploadCloud class="h-4 w-4" /> Pilih Gambar
              </button>
            </div>
          </div>
          <div class="mt-2 flex items-center justify-between gap-3">
            <p :class="['text-xs font-medium', imageError ? 'text-rose-600' : 'text-slate-500']">
              {{ imageError || imageFileName || 'URL tetap bisa dipakai jika tidak ingin upload file.' }}
            </p>
            <span v-if="isUploadingImage" class="text-xs font-medium text-amber-600">Mengupload...</span>
            <button
              v-if="imageFileName"
              type="button"
              @click="clearUploadedImage"
              class="shrink-0 text-xs font-semibold text-rose-600 hover:text-rose-700"
            >
              Hapus upload
            </button>
          </div>
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
import { reactive, ref } from 'vue'
import { X, UploadCloud } from 'lucide-vue-next'
import type { Video } from '../data/videos'
import { VIDEO_CATEGORIES } from '../data/videos'
import { uploadImage } from '../lib/api'

const props = defineProps<{ video?: Video | null }>()
const emit = defineEmits<{
  close: []
  submit: [video: Video]
}>()

const categories = VIDEO_CATEGORIES.filter(c => c !== 'Semua')
const imageInput = ref<HTMLInputElement | null>(null)
const isDraggingImage = ref(false)
const imageError = ref('')
const imageFileName = ref('')
const isUploadingImage = ref(false)

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

function openImagePicker() {
  imageInput.value?.click()
}

async function handleImageSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  await processImageFile(file)
  input.value = ''
}

async function handleImageDrop(event: DragEvent) {
  isDraggingImage.value = false
  const file = event.dataTransfer?.files?.[0]
  await processImageFile(file)
}

async function processImageFile(file?: File) {
  imageError.value = ''
  if (!file) return

  if (!file.type.startsWith('image/')) {
    imageError.value = 'File harus berupa gambar.'
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    imageError.value = 'Ukuran gambar maksimal 5 MB.'
    return
  }

  try {
    isUploadingImage.value = true
    const url = await uploadImage(file)
    form.img = url
    imageFileName.value = file.name
  } catch (error) {
    imageError.value = error instanceof Error ? error.message : 'Gambar gagal diupload.'
  } finally {
    isUploadingImage.value = false
  }
}

function clearUploadedImage() {
  form.img = ''
  imageFileName.value = ''
  imageError.value = ''
}

function clearImageStatus() {
  imageFileName.value = ''
  imageError.value = ''
}

function handleSubmit() {
  if (isUploadingImage.value) {
    alert('Tunggu hingga upload gambar selesai.')
    return
  }
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
