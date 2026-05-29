import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '../data/articles'
import { BERITA_ARTICLES, BAHAYA_ARTICLES, ALTERNATIF_ARTICLES } from '../data/articles'
import type { Video } from '../data/videos'
import { INITIAL_VIDEOS } from '../data/videos'
import type { ScreenTimeItem, ParentalStep, FaqItem, FamilyRule } from '../data/panduan'
import {
  INITIAL_SCREEN_TIME,
  INITIAL_PARENTAL_STEPS,
  INITIAL_FAQ,
  INITIAL_FAMILY_RULES,
} from '../data/panduan'
import {
  isApiConfigured,
  getArticles,
  createArticle,
  updateArticle as apiUpdateArticle,
  deleteArticle as apiDeleteArticle,
  getVideos,
  createVideo,
  updateVideo as apiUpdateVideo,
  deleteVideo as apiDeleteVideo,
  getPanduan,
  updatePanduan,
} from '../lib/api'

export const useAdminStore = defineStore('admin', () => {
  const articles = ref<Article[]>([
    ...BERITA_ARTICLES,
    ...BAHAYA_ARTICLES,
    ...ALTERNATIF_ARTICLES,
  ])
  const videos = ref<Video[]>([...INITIAL_VIDEOS])
  const screenTime = ref<ScreenTimeItem[]>([...INITIAL_SCREEN_TIME])
  const parentalSteps = ref<ParentalStep[]>([...INITIAL_PARENTAL_STEPS])
  const faqItems = ref<FaqItem[]>([...INITIAL_FAQ])
  const familyRules = ref<FamilyRule[]>([...INITIAL_FAMILY_RULES])
  const apiError = ref<string | null>(null)
  const isLoading = ref(false)

  async function loadAll() {
    if (!isApiConfigured) return

    isLoading.value = true
    apiError.value = null
    try {
      const [articleData, videoData, panduanData] = await Promise.all([
        getArticles(),
        getVideos(),
        getPanduan(),
      ])

      articles.value = articleData
      videos.value = videoData
      screenTime.value = panduanData.screenTime
      parentalSteps.value = panduanData.parentalSteps
      faqItems.value = panduanData.faqItems
      familyRules.value = panduanData.familyRules
    } catch (error) {
      apiError.value = error instanceof Error ? error.message : 'Gagal memuat data API.'
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  async function addArticle(a: Article) {
    if (isApiConfigured) {
      const created = await createArticle(a)
      articles.value.unshift(created)
      return
    }
    articles.value.unshift(a)
  }
  async function updateArticle(a: Article) {
    if (isApiConfigured) {
      const updated = await apiUpdateArticle(a.id, a)
      const idx = articles.value.findIndex(x => x.id === updated.id)
      if (idx !== -1) articles.value[idx] = updated
      return
    }
    const idx = articles.value.findIndex(x => x.id === a.id)
    if (idx !== -1) articles.value[idx] = a
  }
  async function deleteArticle(id: string) {
    if (isApiConfigured) {
      await apiDeleteArticle(id)
    }
    articles.value = articles.value.filter(x => x.id !== id)
  }

  async function addVideo(v: Video) {
    if (isApiConfigured) {
      const created = await createVideo({
        title: v.title,
        category: v.category,
        tag: v.tag,
        duration: v.duration,
        youtubeId: v.youtubeId,
        views: v.views,
        likes: v.likes,
        img: v.img,
        featured: v.featured,
      })
      videos.value.unshift(created)
      return
    }
    videos.value.unshift(v)
  }
  async function updateVideo(v: Video) {
    if (isApiConfigured) {
      const updated = await apiUpdateVideo(v.id, {
        title: v.title,
        category: v.category,
        tag: v.tag,
        duration: v.duration,
        youtubeId: v.youtubeId,
        views: v.views,
        likes: v.likes,
        img: v.img,
        featured: v.featured,
      })
      const idx = videos.value.findIndex(x => x.id === updated.id)
      if (idx !== -1) videos.value[idx] = updated
      return
    }
    const idx = videos.value.findIndex(x => x.id === v.id)
    if (idx !== -1) videos.value[idx] = v
  }
  async function deleteVideo(id: number) {
    if (isApiConfigured) {
      await apiDeleteVideo(id)
    }
    videos.value = videos.value.filter(x => x.id !== id)
  }

  async function savePanduan() {
    if (!isApiConfigured) return
    await updatePanduan({
      screenTime: screenTime.value,
      parentalSteps: parentalSteps.value,
      faqItems: faqItems.value,
      familyRules: familyRules.value,
    })
  }

  return {
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
    screenTime,
    parentalSteps,
    faqItems,
    familyRules,
    loadAll,
    savePanduan,
    apiError,
    isLoading,
  }
})
