<template>
  <div class="space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-slate-800 font-black text-xl">{{ config.title }}</h2>
        <p class="text-slate-500 text-sm">{{ articles.length }} artikel tersedia</p>
      </div>
      <button
        @click="openAdd"
        :class="['inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors', config.addBtn]"
      >
        <Plus class="w-4 h-4" /> Tambah Artikel
      </button>
    </div>

    <div class="relative max-w-sm">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        v-model="search"
        type="text"
        placeholder="Cari artikel..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>

    <div v-if="filtered.length === 0" class="text-center py-20 text-slate-400">
      <FileText class="w-12 h-12 mx-auto mb-3 text-slate-200" />
      <p class="font-medium">Tidak ada artikel ditemukan</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <button
        @click="openAdd"
        class="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 transition-all min-h-[200px]"
      >
        <Plus class="w-10 h-10" />
        <span class="font-semibold text-sm">Tambah Artikel Baru</span>
      </button>

      <ArticleCardPreview
        v-for="article in filtered"
        :key="article.id"
        :article="article"
        @edit="openEdit"
        @delete="openDelete"
      />
    </div>
  </div>

  <ArticleForm
    v-if="showForm"
    :article="editingArticle"
    :type="type"
    @close="showForm = false"
    @submit="handleFormSubmit"
  />

  <ConfirmDialog
    v-if="deletingArticle"
    title="Hapus Artikel?"
    :message="`Artikel &quot;${deletingArticle.title}&quot; akan dihapus permanen.`"
    @confirm="handleDelete"
    @cancel="deletingArticle = null"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Search, FileText } from 'lucide-vue-next'
import { useAdminStore } from '../stores/adminStore'
import type { Article } from '../data/articles'
import ArticleCardPreview from '../components/ArticleCardPreview.vue'
import ArticleForm from '../components/ArticleForm.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const props = defineProps<{
  type: 'berita' | 'bahaya' | 'alternatif'
}>()

const configs = {
  berita:     { title: 'Kelola Berita', addBtn: 'bg-sky-600 hover:bg-sky-700' },
  bahaya:     { title: 'Kelola Bahaya Gadget', addBtn: 'bg-rose-600 hover:bg-rose-700' },
  alternatif: { title: 'Kelola Alternatif Gadget', addBtn: 'bg-emerald-600 hover:bg-emerald-700' },
}
const config = computed(() => configs[props.type])

const adminStore = useAdminStore()
const search = ref('')
const showForm = ref(false)
const editingArticle = ref<Article | null>(null)
const deletingArticle = ref<Article | null>(null)

const articles = computed(() => adminStore.articles.filter(a => a.type === props.type))

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return articles.value.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q)
  )
})

function openAdd() {
  editingArticle.value = null
  showForm.value = true
}

function openEdit(article: Article) {
  editingArticle.value = article
  showForm.value = true
}

function openDelete(article: Article) {
  deletingArticle.value = article
}

async function handleFormSubmit(article: Article) {
  if (editingArticle.value) {
    await adminStore.updateArticle(article)
  } else {
    await adminStore.addArticle(article)
  }
  showForm.value = false
  editingArticle.value = null
}

async function handleDelete() {
  if (deletingArticle.value) {
    await adminStore.deleteArticle(deletingArticle.value.id)
    deletingArticle.value = null
  }
}
</script>
