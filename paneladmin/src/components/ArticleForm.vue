<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
      <div class="flex items-center justify-between p-5 border-b border-slate-100">
        <h2 class="text-slate-800 font-black text-lg">
          {{ article ? 'Edit Artikel' : 'Tambah Artikel Baru' }}
        </h2>
        <button @click="$emit('close')" class="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex border-b border-slate-100 px-5 pt-3 gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-semibold transition-all',
            activeTab === tab.key
              ? 'bg-sky-50 text-sky-700 border-b-2 border-sky-500'
              : 'text-slate-500 hover:text-slate-700',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="p-5">
        <div v-if="activeTab === 'info'" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Judul Artikel *</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Masukkan judul artikel..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Kategori *</label>
              <input
                v-model="form.category"
                type="text"
                placeholder="Misal: Kesehatan"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Tanggal</label>
              <input
                v-model="form.date"
                type="text"
                placeholder="Misal: 1 Mei 2025"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Penulis</label>
              <input
                v-model="form.author"
                type="text"
                placeholder="Nama penulis"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Jabatan / Peran</label>
              <input
                v-model="form.role"
                type="text"
                placeholder="Misal: Dokter Spesialis"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Waktu Baca</label>
              <input
                v-model="form.readTime"
                type="text"
                placeholder="Misal: 5 menit"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Upload Gambar</label>
            <div
              :class="[
                'relative rounded-xl border-2 border-dashed p-4 transition-all',
                isDraggingImage
                  ? 'border-sky-400 bg-sky-50'
                  : 'border-slate-200 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/50',
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
              <div v-if="form.img" class="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center">
                <img
                  :src="form.img"
                  alt="Preview gambar artikel"
                  class="h-32 w-full rounded-lg object-cover sm:w-40"
                />
                <div class="space-y-3">
                  <div>
                    <p class="text-sm font-semibold text-slate-700">{{ imageFileName || 'Gambar artikel siap digunakan' }}</p>
                    <p class="text-xs text-slate-500">Drag gambar baru ke area ini untuk mengganti.</p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      type="button"
                      @click="openImagePicker"
                      class="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-700 transition-colors"
                    >
                      <UploadCloud class="h-4 w-4" /> Ganti Gambar
                    </button>
                    <button
                      type="button"
                      @click="clearImage"
                      class="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-rose-600 border border-rose-100 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 class="h-4 w-4" /> Hapus
                    </button>
                  </div>
                </div>
              </div>
              <button
                v-else
                type="button"
                @click="openImagePicker"
                class="flex min-h-36 w-full flex-col items-center justify-center rounded-lg text-center"
              >
                <UploadCloud class="mb-3 h-9 w-9 text-sky-500" />
                <span class="text-sm font-semibold text-slate-700">Drag & drop gambar di sini</span>
                <span class="mt-1 text-xs text-slate-500">atau klik untuk memilih file dari perangkat</span>
                <span class="mt-2 text-[11px] font-medium text-slate-400">Format JPG, PNG, WEBP. Maksimal 5 MB.</span>
              </button>
            </div>
            <p v-if="imageError" class="mt-1 text-xs font-medium text-rose-600">{{ imageError }}</p>
            <p v-if="isUploadingImage" class="mt-1 text-xs font-medium text-sky-600">Mengupload gambar...</p>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Ringkasan (Excerpt) *</label>
            <textarea
              v-model="form.excerpt"
              rows="3"
              placeholder="Ringkasan singkat artikel..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">Paragraf Pembuka (Lead)</label>
            <textarea
              v-model="form.lead"
              rows="4"
              placeholder="Paragraf pembuka artikel..."
              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div v-if="activeTab === 'konten'" class="space-y-5">
          <div
            v-for="(section, si) in form.sections"
            :key="si"
            class="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-slate-600 uppercase tracking-wide">Bagian {{ si + 1 }}</span>
              <button
                @click="removeSection(si)"
                class="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
            <div class="space-y-3">
              <input
                v-model="section.heading"
                type="text"
                placeholder="Judul bagian (opsional)"
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white"
              />
              <textarea
                v-model="section.body"
                rows="3"
                placeholder="Isi konten bagian ini..."
                class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white resize-none"
              />
              <div>
                <label class="block text-xs text-slate-500 mb-1">Poin-poin (satu per baris, opsional)</label>
                <textarea
                  :value="(section.list ?? []).join('\n')"
                  @input="updateSectionList(si, ($event.target as HTMLTextAreaElement).value)"
                  rows="3"
                  placeholder="Poin pertama&#10;Poin kedua&#10;Poin ketiga"
                  class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white resize-none font-mono"
                />
              </div>
            </div>
          </div>
          <button
            @click="addSection"
            class="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-semibold hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4" /> Tambah Bagian
          </button>
        </div>

        <div v-if="activeTab === 'referensi'" class="space-y-4">
          <div
            v-for="(refItem, ri) in form.references"
            :key="ri"
            class="bg-slate-50 rounded-xl p-4 border border-slate-200"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-slate-500">[{{ ri + 1 }}]</span>
              <button @click="removeRef(ri)" class="p-1 rounded text-rose-500 hover:bg-rose-50 transition-colors">
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              v-model="refItem.text"
              type="text"
              placeholder="Teks referensi lengkap..."
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white mb-2"
            />
            <input
              v-model="refItem.url"
              type="text"
              placeholder="URL sumber (opsional)"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent bg-white"
            />
          </div>
          <button
            @click="addRef"
            class="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-semibold hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition-all flex items-center justify-center gap-2"
          >
            <Plus class="w-4 h-4" /> Tambah Referensi
          </button>
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
          class="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors"
        >
          {{ article ? 'Simpan Perubahan' : 'Tambah Artikel' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { X, Trash2, Plus, UploadCloud } from 'lucide-vue-next'
import type { Article, ArticleSection, Reference } from '../data/articles'
import { uploadImage } from '../lib/api'

const props = defineProps<{
  article?: Article | null
  type: 'berita' | 'bahaya' | 'alternatif'
}>()

const emit = defineEmits<{
  close: []
  submit: [article: Article]
}>()

const tabs = [
  { key: 'info',      label: 'Info Dasar' },
  { key: 'konten',    label: 'Konten' },
  { key: 'referensi', label: 'Referensi' },
]
const activeTab = ref('info')
const imageInput = ref<HTMLInputElement | null>(null)
const isDraggingImage = ref(false)
const imageError = ref('')
const imageFileName = ref('')
const isUploadingImage = ref(false)

const form = reactive<{
  title: string
  category: string
  date: string
  author: string
  role: string
  readTime: string
  img: string
  excerpt: string
  lead: string
  sections: ArticleSection[]
  references: (Reference & { url?: string })[]
}>({
  title: props.article?.title ?? '',
  category: props.article?.category ?? '',
  date: props.article?.date ?? '',
  author: props.article?.author ?? '',
  role: props.article?.role ?? '',
  readTime: props.article?.readTime ?? '',
  img: props.article?.img ?? '',
  excerpt: props.article?.excerpt ?? '',
  lead: props.article?.lead ?? '',
  sections: props.article?.sections ? [...props.article.sections] : [],
  references: props.article?.references ? [...props.article.references] : [],
})

function addSection() {
  form.sections.push({ heading: '', body: '', list: [] })
}

function removeSection(index: number) {
  form.sections.splice(index, 1)
}

function updateSectionList(index: number, value: string) {
  const lines = value.split('\n').map(line => line.trim()).filter(Boolean)
  form.sections[index].list = lines
}

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

function clearImage() {
  form.img = ''
  imageFileName.value = ''
  imageError.value = ''
}

function addRef() {
  form.references.push({ num: form.references.length + 1, text: '', url: '' })
}

function removeRef(index: number) {
  form.references.splice(index, 1)
}

function handleSubmit() {
  if (isUploadingImage.value) {
    alert('Tunggu hingga upload gambar selesai.')
    return
  }
  if (!form.title.trim() || !form.category.trim() || !form.excerpt.trim()) {
    alert('Judul, kategori, dan ringkasan wajib diisi.')
    return
  }

  emit('submit', {
    id: props.article?.id ?? `${props.type}-${Date.now()}`,
    type: props.type,
    ...form,
    references: form.references.map((refItem, idx) => ({
      num: idx + 1,
      text: refItem.text,
      url: refItem.url?.trim() || undefined,
    })),
  })
}
</script>
