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

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const isApiConfigured = Boolean(apiBaseUrl)

async function requestJson<T>(path: string): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured.')
  }

  const response = await fetch(`${apiBaseUrl}${path}`)
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json() as Promise<T>
}

export async function fetchArticles(): Promise<Article[]> {
  if (!apiBaseUrl) {
    return [...BERITA_ARTICLES, ...BAHAYA_ARTICLES, ...ALTERNATIF_ARTICLES]
  }

  try {
    return await requestJson<Article[]>('/api/articles')
  } catch (error) {
    console.error(error)
    return [...BERITA_ARTICLES, ...BAHAYA_ARTICLES, ...ALTERNATIF_ARTICLES]
  }
}

export async function fetchVideos(): Promise<Video[]> {
  if (!apiBaseUrl) {
    return [...INITIAL_VIDEOS]
  }

  try {
    return await requestJson<Video[]>('/api/videos')
  } catch (error) {
    console.error(error)
    return [...INITIAL_VIDEOS]
  }
}

export type PanduanPayload = {
  screenTime: ScreenTimeItem[]
  parentalSteps: ParentalStep[]
  faqItems: FaqItem[]
  familyRules: FamilyRule[]
}

export async function fetchPanduan(): Promise<PanduanPayload> {
  if (!apiBaseUrl) {
    return {
      screenTime: [...INITIAL_SCREEN_TIME],
      parentalSteps: [...INITIAL_PARENTAL_STEPS],
      faqItems: [...INITIAL_FAQ],
      familyRules: [...INITIAL_FAMILY_RULES],
    }
  }

  try {
    return await requestJson<PanduanPayload>('/api/panduan')
  } catch (error) {
    console.error(error)
    return {
      screenTime: [...INITIAL_SCREEN_TIME],
      parentalSteps: [...INITIAL_PARENTAL_STEPS],
      faqItems: [...INITIAL_FAQ],
      familyRules: [...INITIAL_FAMILY_RULES],
    }
  }
}
