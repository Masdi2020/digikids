<template>
  <div class="space-y-5">
    <div>
      <h2 class="text-slate-800 font-black text-xl">Kelola Panduan</h2>
      <p class="text-slate-500 text-sm">Kelola konten screen time, langkah parental control, FAQ, dan aturan keluarga</p>
    </div>

    <div class="flex flex-wrap gap-2 border-b border-slate-200 pb-0">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all',
          activeTab === tab.key
            ? 'bg-white border border-b-white border-slate-200 text-violet-700 -mb-px'
            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="activeTab === 'screentime'" class="space-y-4">
      <div
        v-for="(item, i) in adminStore.screenTime"
        :key="i"
        class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="font-bold text-slate-800 text-sm">{{ item.age }}</span>
          <div class="flex gap-2">
            <button @click="editingSTIdx = i; stForm = { ...item }" class="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors">
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button @click="removeScreenTime(i)" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-slate-50 rounded-lg px-3 py-2">
            <span class="text-slate-500">Rekomendasi: </span>
            <span class="font-semibold text-slate-700">{{ item.recommended }}</span>
          </div>
          <div class="bg-slate-50 rounded-lg px-3 py-2">
            <span class="text-slate-500">Catatan: </span>
            <span class="font-semibold text-slate-700">{{ item.exceptions }}</span>
          </div>
        </div>

        <div v-if="editingSTIdx === i" class="mt-4 space-y-3 pt-4 border-t border-slate-100">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-slate-500 font-medium mb-1 block">Rekomendasi</label>
              <input v-model="stForm.recommended" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
            <div>
              <label class="text-xs text-slate-500 font-medium mb-1 block">Catatan</label>
              <input v-model="stForm.exceptions" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400" />
            </div>
          </div>
          <div>
            <label class="text-xs text-slate-500 font-medium mb-1 block">Deskripsi</label>
            <textarea v-model="stForm.desc" rows="2" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-400" />
          </div>
          <div class="flex gap-2">
            <button @click="saveScreenTime(i)" class="px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl hover:bg-violet-700 transition-colors">Simpan</button>
            <button @click="editingSTIdx = null" class="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">Batal</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'steps'" class="space-y-4">
      <div
        v-for="(step, i) in adminStore.parentalSteps"
        :key="i"
        class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
      >
        <div class="flex items-start gap-3 mb-3">
          <div class="w-8 h-8 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
            {{ step.step }}
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-slate-800 text-sm">{{ step.title }}</h4>
            <p class="text-slate-500 text-xs mt-1 line-clamp-2">{{ step.desc }}</p>
          </div>
          <div class="flex gap-1 flex-shrink-0">
            <button @click="editingStepIdx = i; stepForm = { ...step }" class="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors">
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button @click="removeStep(i)" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div v-if="editingStepIdx === i" class="mt-3 space-y-3 pt-3 border-t border-slate-100">
          <div>
            <label class="text-xs text-slate-500 font-medium mb-1 block">Judul</label>
            <input v-model="stepForm.title" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <div>
            <label class="text-xs text-slate-500 font-medium mb-1 block">Deskripsi</label>
            <textarea v-model="stepForm.desc" rows="2" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <div>
            <label class="text-xs text-slate-500 font-medium mb-1 block">Tindakan</label>
            <input v-model="stepForm.action" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <div class="flex gap-2">
            <button @click="saveStep(i)" class="px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl hover:bg-sky-700 transition-colors">Simpan</button>
            <button @click="editingStepIdx = null" class="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">Batal</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'faq'" class="space-y-4">
      <div
        v-for="(item, i) in adminStore.faqItems"
        :key="i"
        class="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3 mb-2">
          <p class="font-bold text-slate-800 text-sm flex-1">{{ item.question }}</p>
          <div class="flex gap-1 flex-shrink-0">
            <button @click="editingFaqIdx = i; faqForm = { ...item }" class="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <button @click="removeFaq(i)" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors">
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <p class="text-slate-500 text-xs leading-relaxed line-clamp-2">{{ item.answer }}</p>
        <div v-if="editingFaqIdx === i" class="mt-3 space-y-3 pt-3 border-t border-slate-100">
          <div>
            <label class="text-xs text-slate-500 font-medium mb-1 block">Pertanyaan</label>
            <input v-model="faqForm.question" type="text" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label class="text-xs text-slate-500 font-medium mb-1 block">Jawaban</label>
            <textarea v-model="faqForm.answer" rows="3" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div class="flex gap-2">
            <button @click="saveFaq(i)" class="px-4 py-2 bg-amber-500 text-white text-xs font-semibold rounded-xl hover:bg-amber-600 transition-colors">Simpan</button>
            <button @click="editingFaqIdx = null" class="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors">Batal</button>
          </div>
        </div>
      </div>
      <button
        @click="addFaq"
        class="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-semibold hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus class="w-4 h-4" /> Tambah FAQ
      </button>
    </div>

    <div v-if="activeTab === 'rules'" class="space-y-4">
      <div class="grid sm:grid-cols-2 gap-3">
        <div
          v-for="(rule, i) in adminStore.familyRules"
          :key="i"
          class="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex items-center gap-3"
        >
          <span class="text-2xl">{{ rule.emoji }}</span>
          <input
            v-model="rule.rule"
            type="text"
            class="flex-1 text-sm text-slate-700 font-medium bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg px-2 py-1"
            @blur="adminStore.savePanduan()"
          />
          <button @click="removeRule(i)" class="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors flex-shrink-0">
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <button
        @click="addRule"
        class="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm font-semibold hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus class="w-4 h-4" /> Tambah Aturan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Pencil, Trash2, Plus } from 'lucide-vue-next'
import { useAdminStore } from '../stores/adminStore'
import type { ScreenTimeItem, ParentalStep, FaqItem } from '../data/panduan'

const adminStore = useAdminStore()

const tabs = [
  { key: 'screentime', label: '⏱️ Screen Time' },
  { key: 'steps',      label: '🔒 Langkah Parental' },
  { key: 'faq',        label: '❓ FAQ' },
  { key: 'rules',      label: '📝 Aturan Keluarga' },
]
const activeTab = ref('screentime')

const editingSTIdx = ref<number | null>(null)
const stForm = ref<Partial<ScreenTimeItem>>({})

async function saveScreenTime(i: number) {
  Object.assign(adminStore.screenTime[i], stForm.value)
  editingSTIdx.value = null
  await adminStore.savePanduan()
}

async function removeScreenTime(index: number) {
  adminStore.screenTime.splice(index, 1)
  if (editingSTIdx.value === index) editingSTIdx.value = null
  await adminStore.savePanduan()
}

const editingStepIdx = ref<number | null>(null)
const stepForm = ref<Partial<ParentalStep>>({})

async function saveStep(i: number) {
  Object.assign(adminStore.parentalSteps[i], stepForm.value)
  editingStepIdx.value = null
  await adminStore.savePanduan()
}

async function removeStep(index: number) {
  adminStore.parentalSteps.splice(index, 1)
  adminStore.parentalSteps.forEach((step, i) => {
    step.step = i + 1
  })
  if (editingStepIdx.value === index) editingStepIdx.value = null
  await adminStore.savePanduan()
}

const editingFaqIdx = ref<number | null>(null)
const faqForm = ref<Partial<FaqItem>>({})

async function saveFaq(i: number) {
  Object.assign(adminStore.faqItems[i], faqForm.value)
  editingFaqIdx.value = null
  await adminStore.savePanduan()
}

async function addFaq() {
  adminStore.faqItems.push({ id: `faq-${Date.now()}`, question: 'Pertanyaan baru', answer: 'Jawaban...' })
  await adminStore.savePanduan()
}

async function removeFaq(index: number) {
  adminStore.faqItems.splice(index, 1)
  await adminStore.savePanduan()
}

async function addRule() {
  adminStore.familyRules.push({ id: `rule-${Date.now()}`, emoji: '✅', rule: 'Aturan baru' })
  await adminStore.savePanduan()
}

async function removeRule(index: number) {
  adminStore.familyRules.splice(index, 1)
  await adminStore.savePanduan()
}
</script>
