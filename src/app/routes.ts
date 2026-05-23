import { createRouter, createWebHistory } from 'vue-router'

// APP LAYOUT
import Layout from './components/Layout.vue'

// APP PAGES
import Home from './pages/Home.vue'
import Berita from './pages/Berita.vue'
// import BahayaGadget from './pages/BahayaGadget.vue'
// import PenggantiGadget from './pages/PenggantiGadget.vue'
// import Panduan from './pages/Panduan.vue'
// import VideoEdukasi from './pages/VideoEdukasi.vue'
// import AboutUs from './pages/AboutUs.vue'
import ArtikelDetail from './pages/ArtikelDetail.vue'

// // ADMIN
// import AdminRoot from '../paneladmin/PanelAdmin.vue'
// import AdminLayout from '../paneladmin/components/AdminLayout.vue'

// import Dashboard from '../paneladmin/pages/Dashboard.vue'
// import ManageBerita from '../paneladmin/pages/ManageBerita.vue'
// import ManageBahaya from '../paneladmin/pages/ManageBahaya.vue'
// import ManageAlternatif from '../paneladmin/pages/ManageAlternatif.vue'
// import ManagePanduan from '../paneladmin/pages/ManagePanduan.vue'
// import ManageVideo from '../paneladmin/pages/ManageVideo.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'berita',
        name: 'berita',
        component: Berita,
      },
      //   {
      //     path: 'bahaya-gadget',
      //     name: 'bahaya-gadget',
      //     component: BahayaGadget,
      //   },
      //   {
      //     path: 'pengganti-gadget',
      //     name: 'pengganti-gadget',
      //     component: PenggantiGadget,
      //   },
      //   {
      //     path: 'panduan',
      //     name: 'panduan',
      //     component: Panduan,
      //   },
      //   {
      //     path: 'video-edukasi',
      //     name: 'video-edukasi',
      //     component: VideoEdukasi,
      //   },
      //   {
      //     path: 'about',
      //     name: 'about',
      //     component: AboutUs,
      //   },
      {
        path: 'artikel/:id',
        name: 'artikel-detail',
        component: ArtikelDetail,
      },
    ],
  },

  //   {
  //     path: '/paneladmin',
  //     component: AdminRoot,
  //     children: [
  //       {
  //         path: '',
  //         component: AdminLayout,
  //         children: [
  //           {
  //             path: '',
  //             name: 'dashboard',
  //             component: Dashboard,
  //           },
  //           {
  //             path: 'berita',
  //             name: 'manage-berita',
  //             component: ManageBerita,
  //           },
  //           {
  //             path: 'bahaya-gadget',
  //             name: 'manage-bahaya',
  //             component: ManageBahaya,
  //           },
  //           {
  //             path: 'alternatif',
  //             name: 'manage-alternatif',
  //             component: ManageAlternatif,
  //           },
  //           {
  //             path: 'panduan',
  //             name: 'manage-panduan',
  //             component: ManagePanduan,
  //           },
  //           {
  //             path: 'video-edukasi',
  //             name: 'manage-video',
  //             component: ManageVideo,
  //           },
  //         ],
  //       },
  //     ],
  //   },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
