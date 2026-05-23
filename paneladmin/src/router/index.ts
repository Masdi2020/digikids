import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '../components/AdminLayout.vue'
import Dashboard from '../pages/Dashboard.vue'
import ManageBerita from '../pages/ManageBerita.vue'
import ManageBahaya from '../pages/ManageBahaya.vue'
import ManageAlternatif from '../pages/ManageAlternatif.vue'
import ManagePanduan from '../pages/ManagePanduan.vue'
import ManageVideo from '../pages/ManageVideo.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      component: AdminLayout,
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
