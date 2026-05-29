import type { Article } from '../data/articles'
import type { Video } from '../data/videos'
import type { ScreenTimeItem, ParentalStep, FaqItem, FamilyRule } from '../data/panduan'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const isApiConfigured = Boolean(apiBaseUrl)

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured.')
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json() as Promise<T>
}

export async function uploadImage(file: File): Promise<string> {
  if (!apiBaseUrl) {
    throw new Error('API base URL is not configured.')
  }

  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${apiBaseUrl}/api/uploads/image`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Image upload failed')
  }

  const data = await response.json()
  return data.url as string
}

export function getArticles(type?: string) {
  const query = type ? `?type=${encodeURIComponent(type)}` : ''
  return requestJson<Article[]>(`/api/articles${query}`)
}

export function getArticle(id: string) {
  return requestJson<Article>(`/api/articles/${encodeURIComponent(id)}`)
}

export function createArticle(article: Article) {
  return requestJson<Article>('/api/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  })
}

export function updateArticle(id: string, article: Article) {
  return requestJson<Article>(`/api/articles/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(article),
  })
}

export function deleteArticle(id: string) {
  return requestJson<{ ok: boolean }>(`/api/articles/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}

export function getVideos() {
  return requestJson<Video[]>('/api/videos')
}

export function createVideo(video: Omit<Video, 'id'>) {
  return requestJson<Video>('/api/videos', {
    method: 'POST',
    body: JSON.stringify(video),
  })
}

export function updateVideo(id: number, video: Omit<Video, 'id'>) {
  return requestJson<Video>(`/api/videos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(video),
  })
}

export function deleteVideo(id: number) {
  return requestJson<{ ok: boolean }>(`/api/videos/${id}`, {
    method: 'DELETE',
  })
}

export type PanduanPayload = {
  screenTime: ScreenTimeItem[]
  parentalSteps: ParentalStep[]
  faqItems: FaqItem[]
  familyRules: FamilyRule[]
}

export function getPanduan() {
  return requestJson<PanduanPayload>('/api/panduan')
}

export function updatePanduan(payload: PanduanPayload) {
  return requestJson<PanduanPayload>('/api/panduan', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
