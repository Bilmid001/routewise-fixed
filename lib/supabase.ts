import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Always return a fresh client so the current session token is always used
export function getSupabaseBrowser() {
  return createClient(url, anon, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'rw-auth' }
  })
}

export function getSupabaseServer() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY || anon)
}
