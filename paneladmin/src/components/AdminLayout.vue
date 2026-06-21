<template>
  <div class="min-h-screen bg-slate-100 flex">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <aside
      :class="[
        'fixed top-0 left-0 h-full z-40 flex flex-col bg-slate-900 transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="flex items-center h-16 px-4 border-b border-slate-800 gap-3 flex-shrink-0">
        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <img :src="Logo" alt="Logo" class="w-full h-full object-contain" >
        </div>
        <div v-if="!sidebarCollapsed" class="flex flex-col leading-none overflow-hidden">
          <span class="text-sky-400 font-black text-sm tracking-tight whitespace-nowrap">DIGIKIDS</span>
          <span class="text-slate-400 text-xs font-medium">Panel Admin</span>
        </div>
      </div>

      <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="sidebarOpen = false"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
            isActive(item.to)
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white',
          ]"
        >
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="!sidebarCollapsed" class="truncate">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <button
        @click="sidebarCollapsed = !sidebarCollapsed"
        class="hidden lg:flex items-center justify-center h-10 border-t border-slate-800 text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <ChevronLeft v-if="!sidebarCollapsed" class="w-4 h-4" />
        <ChevronRight v-else class="w-4 h-4" />
      </button>
    </aside>

    <div :class="['flex-1 flex flex-col min-w-0 transition-all duration-300', sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64']">
      <header class="sticky top-0 z-20 bg-white border-b border-slate-200 flex items-center h-16 px-4 gap-4">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu class="w-5 h-5" />
        </button>
        <div class="flex-1">
          <h1 class="text-slate-800 font-bold text-sm">{{ currentPageTitle }}</h1>
        </div>
        <span class="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">Mode Admin</span>
      </header>

      <main class="flex-1 p-4 lg:p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import {
  Menu, ChevronLeft, ChevronRight,
  LayoutDashboard, Newspaper, AlertTriangle, Gamepad2, BookOpen, Video,
} from 'lucide-vue-next'

import Logo from '/Logo.png'

const route = useRoute()
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)

const navItems = [
  { to: '/',              label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/berita',        label: 'Kelola Berita', icon: Newspaper },
  { to: '/bahaya-gadget', label: 'Bahaya Gadget', icon: AlertTriangle },
  { to: '/alternatif',    label: 'Alternatif',    icon: Gamepad2 },
  { to: '/panduan',       label: 'Panduan',       icon: BookOpen },
  { to: '/video-edukasi', label: 'Video Edukasi', icon: Video },
]

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/berita': 'Kelola Berita',
  '/bahaya-gadget': 'Kelola Bahaya Gadget',
  '/alternatif': 'Kelola Alternatif',
  '/panduan': 'Kelola Panduan',
  '/video-edukasi': 'Kelola Video Edukasi',
}

const currentPageTitle = computed(() => pageTitles[route.path] ?? 'Panel Admin')

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>
