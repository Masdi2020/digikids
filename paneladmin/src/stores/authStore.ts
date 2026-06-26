import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase, supabaseEnvError } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null)
  const isInitialized = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const user = computed(() => session.value?.user ?? null)
  const isAuthenticated = computed(() => Boolean(session.value))

  async function init() {
    if (isInitialized.value) return

    if (!isSupabaseConfigured || !supabase) {
      error.value = supabaseEnvError
      isInitialized.value = true
      return
    }

    const { data, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) {
      error.value = sessionError.message
    }

    session.value = data.session
    supabase.auth.onAuthStateChange((_event, nextSession) => {
      session.value = nextSession
    })
    isInitialized.value = true
  }

  async function login(email: string, password: string) {
    if (!isSupabaseConfigured || !supabase) {
      error.value = supabaseEnvError
      return false
    }

    isLoading.value = true
    error.value = null
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) {
        error.value = loginError.message
        return false
      }

      session.value = data.session
      return true
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  async function logout() {
    if (supabase) {
      await supabase.auth.signOut()
    }
    session.value = null
  }

  return {
    session,
    user,
    isAuthenticated,
    isInitialized,
    isLoading,
    error,
    init,
    login,
    logout,
  }
})
