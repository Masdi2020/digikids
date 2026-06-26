import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '../components/AdminLayout.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import ManageBerita from '../pages/ManageBerita.vue'
import ManageBahaya from '../pages/ManageBahaya.vue'
import ManageAlternatif from '../pages/ManageAlternatif.vue'
import ManagePanduan from '../pages/ManagePanduan.vue'
import ManageVideo from '../pages/ManageVideo.vue'
import { useAuthStore } from '../stores/authStore'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: '/',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', component: Dashboard },
        { path: 'berita', component: ManageBerita },
        { path: 'bahaya-gadget', component: ManageBahaya },
        { path: 'alternatif', component: ManageAlternatif },
        { path: 'panduan', component: ManagePanduan },
        { path: 'video-edukasi', component: ManageVideo },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  await authStore.init()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return '/'
  }

  return true
})
