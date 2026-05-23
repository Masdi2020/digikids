import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabaseEnvError =
  'Missing Supabase env vars. Copy paneladmin/.env.example to paneladmin/.env and fill VITE_SUPABASE_URL plus VITE_SUPABASE_ANON_KEY.'

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    throw new Error(supabaseEnvError)
  }

  return createClient(supabaseUrl!, supabaseAnonKey!)
}

export const supabase = isSupabaseConfigured ? getSupabaseClient() : null
