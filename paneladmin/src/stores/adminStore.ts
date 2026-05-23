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

  function addArticle(a: Article) {
    articles.value.unshift(a)
  }
  function updateArticle(a: Article) {
    const idx = articles.value.findIndex(x => x.id === a.id)
    if (idx !== -1) articles.value[idx] = a
  }
  function deleteArticle(id: string) {
    articles.value = articles.value.filter(x => x.id !== id)
  }

  function addVideo(v: Video) {
    videos.value.unshift(v)
  }
  function updateVideo(v: Video) {
    const idx = videos.value.findIndex(x => x.id === v.id)
    if (idx !== -1) videos.value[idx] = v
  }
  function deleteVideo(id: number) {
    videos.value = videos.value.filter(x => x.id !== id)
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
  }
})
