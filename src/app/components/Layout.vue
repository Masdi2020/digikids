<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'

import {
  Smartphone,
  Menu,
  X,
  Home,
  Newspaper,
  AlertTriangle,
  Gamepad2,
  BookOpen,
  Video,
  Users,
  ChevronUp,
} from 'lucide-vue-next'

import Logo from '../../../public/Logo.png'

const route = useRoute()

const menuOpen = ref(false)
const scrolled = ref(false)
const showTop = ref(false)

const navLinks = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/berita', label: 'Berita', icon: Newspaper },
  { to: '/bahaya-gadget', label: 'Bahaya Gadget', icon: AlertTriangle },
  { to: '/pengganti-gadget', label: 'Alternatif', icon: Gamepad2 },
  { to: '/panduan', label: 'Panduan', icon: BookOpen },
  { to: '/video-edukasi', label: 'Video', icon: Video },
  { to: '/about', label: 'Tentang Kami', icon: Users },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  showTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const isActive = (to: string) => {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

watch(
  () => route.path,
  () => {
    menuOpen.value = false

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  },
)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-sky-100/50' : 'bg-white',
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2.5 group">
            <div
              class="w-10 h-10 flex items-center justify-center"
            >
              <img :src="Logo" alt="Logo" class="w-full h-full object-contain" >
            </div>

            <div class="flex flex-col leading-none">
              <span class="text-sky-600 font-black text-lg tracking-tight"> DIGI </span>

              <span class="text-slate-700 font-bold text-xs tracking-widest uppercase"> KIDS </span>
            </div>
          </RouterLink>

          <!-- Desktop Nav -->
          <nav class="hidden lg:flex items-center gap-1">
            <RouterLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              :class="[
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive(link.to)
                  ? 'bg-sky-50 text-sky-600 font-semibold'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50',
              ]"
            >
              {{ link.label }}
            </RouterLink>
          </nav>

          <!-- CTA + Mobile Toggle -->
          <div class="flex items-center gap-3">
            <RouterLink
              to="/panduan"
              class="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-sky-300 hover:scale-105 transition-all duration-200"
            >
              <BookOpen class="w-4 h-4" />
              Panduan
            </RouterLink>

            <button
              @click="menuOpen = !menuOpen"
              class="lg:hidden p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
              aria-label="Toggle menu"
            >
              <X v-if="menuOpen" class="w-5 h-5" />

              <Menu v-else class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="menuOpen" class="lg:hidden bg-white border-t border-slate-100 shadow-xl">
        <nav class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
              isActive(link.to)
                ? 'bg-sky-50 text-sky-600 font-semibold'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
          >
            <component :is="link.icon" class="w-4 h-4" />

            {{ link.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 pt-16 lg:pt-20">
      <RouterView />
    </main>

    <footer class="bg-slate-900 text-slate-300 pt-14 pb-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800"
        >
          <!-- Brand -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-2.5 mb-4">
              <div
                class="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center"
              >
                <Smartphone class="w-5 h-5 text-white" />
              </div>

              <span class="text-white font-black text-xl"> BijakGadget </span>
            </div>

            <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
              Portal edukasi untuk orang tua dan anak tentang penggunaan gadget yang bijak, sehat,
              dan bertanggung jawab. Program Pengabdian Masyarakat RT 045 Karang Joang.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">Halaman</h4>

            <ul class="space-y-2.5">
              <li v-for="link in navLinks.slice(0, 4)" :key="link.to">
                <RouterLink
                  :to="link.to"
                  class="text-slate-400 hover:text-sky-400 text-sm transition-colors"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">Lainnya</h4>

            <ul class="space-y-2.5">
              <li v-for="link in navLinks.slice(4)" :key="link.to">
                <RouterLink
                  :to="link.to"
                  class="text-slate-400 hover:text-sky-400 text-sm transition-colors"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-slate-500 text-xs">
            © 2025 BijakGadget — Program Pengabdian Masyarakat RT 045 Karang Joang
          </p>

          <div class="flex items-center gap-4">
            <p class="text-slate-500 text-xs">Dibuat dengan ❤️ untuk generasi sehat</p>

            <RouterLink
              to="/paneladmin"
              class="text-slate-600 hover:text-sky-400 text-xs border border-slate-700 hover:border-sky-600 px-3 py-1 rounded-lg transition-all"
            >
              Panel Admin
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>

    <button
      v-if="showTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 w-11 h-11 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-sky-700 hover:scale-110 transition-all duration-200"
      aria-label="Scroll to top"
    >
      <ChevronUp class="w-5 h-5" />
    </button>
  </div>
</template>
