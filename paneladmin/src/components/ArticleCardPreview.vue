<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col">
    <div class="relative h-40 overflow-hidden bg-slate-100">
      <img
        v-if="article.img"
        :src="article.img"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <span :class="['absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full', typeBadge.bg, typeBadge.text]">
        {{ article.category }}
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="text-slate-800 font-bold text-sm leading-snug mb-2 line-clamp-2">{{ article.title }}</h3>
      <p class="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-3">{{ article.excerpt }}</p>

      <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
        <span class="flex items-center gap-1"><User class="w-3 h-3" />{{ article.author }}</span>
        <span class="flex items-center gap-1"><Calendar class="w-3 h-3" />{{ article.date }}</span>
        <span class="flex items-center gap-1"><Clock class="w-3 h-3" />{{ article.readTime }}</span>
      </div>

      <div class="flex items-center gap-3 text-xs text-slate-400 mb-4">
        <span class="flex items-center gap-1"><FileText class="w-3 h-3" />{{ article.sections.length }} bagian</span>
        <span class="flex items-center gap-1"><BookOpen class="w-3 h-3" />{{ article.references.length }} referensi</span>
      </div>

      <div class="flex items-center gap-2 pt-3 border-t border-slate-100">
        <button
          @click="$emit('edit', article)"
          class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-700 rounded-xl text-xs font-semibold hover:bg-sky-100 transition-colors"
        >
          <Pencil class="w-3.5 h-3.5" /> Edit
        </button>
        <button
          @click="$emit('delete', article)"
          class="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-colors"
        >
          <Trash2 class="w-3.5 h-3.5" /> Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User, Calendar, Clock, FileText, BookOpen, Pencil, Trash2 } from 'lucide-vue-next'
import type { Article } from '../data/articles'

const props = defineProps<{ article: Article }>()
defineEmits<{
  edit: [article: Article]
  delete: [article: Article]
}>()

const typeColors: Record<string, { bg: string; text: string }> = {
  berita:     { bg: 'bg-sky-100',     text: 'text-sky-700' },
  bahaya:     { bg: 'bg-rose-100',    text: 'text-rose-700' },
  alternatif: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
}

const typeBadge = computed(() => typeColors[props.article.type] ?? typeColors.berita)
</script>
