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
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">URL Gambar</label>
              <input
                v-model="form.img"
                type="text"
                placeholder="https://..."
                class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
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
import { X, Trash2, Plus } from 'lucide-vue-next'
import type { Article, ArticleSection, Reference } from '../data/articles'

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

function addRef() {
  form.references.push({ num: form.references.length + 1, text: '', url: '' })
}

function removeRef(index: number) {
  form.references.splice(index, 1)
}

function handleSubmit() {
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
