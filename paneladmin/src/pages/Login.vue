<template>
  <main class="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
    <section class="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
      <div class="p-6 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 flex items-center justify-center">
            <img :src="Logo" alt="Logo" class="w-full h-full object-contain">
          </div>
          <div>
            <h1 class="text-slate-900 text-lg font-black leading-tight">DIGIKIDS Admin</h1>
            <p class="text-slate-500 text-xs font-medium">Masuk untuk mengelola konten</p>
          </div>
        </div>
      </div>

      <form class="p-6 space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            autocomplete="email"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="admin@digikids.id"
          >
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            placeholder="Password admin"
          >
        </div>

        <p v-if="authStore.error" class="rounded-xl bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700">
          {{ authStore.error }}
        </p>

        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
        >
          <LogIn class="w-4 h-4" />
          {{ authStore.isLoading ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LogIn } from 'lucide-vue-next'
import { useAuthStore } from '../stores/authStore'
import Logo from '/Logo.png'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function handleSubmit() {
  const ok = await authStore.login(email.value.trim(), password.value)
  if (!ok) return

  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
  router.replace(redirect)
}
</script>
