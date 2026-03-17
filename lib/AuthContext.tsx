'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getSupabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

type Profile = {
  id: string; email: string; full_name?: string; company_name?: string
  country?: string; home_currency?: string; monthly_volume?: number
  onboarding_complete?: boolean; role?: string
}
type Ctx = {
  user: User | null; profile: Profile | null; session: Session | null
  loading: boolean; signOut: () => Promise<void>; refreshProfile: () => Promise<void>
}

const AuthContext = createContext<Ctx>({
  user: null, profile: null, session: null, loading: true,
  signOut: async () => {}, refreshProfile: async () => {},
})

// Supabase client created ONCE at module level — never inside a component
const sb = getSupabase()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (uid: string) => {
    const { data } = await sb
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single()
    if (data) setProfile(data)
  }

  useEffect(() => {
    // Get initial session once
    sb.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchProfile(s.user.id)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) fetchProfile(s.user.id)
      else { setProfile(null) }
    })

    return () => subscription.unsubscribe()
  }, []) // empty deps — run once only

  const signOut = async () => {
    await sb.auth.signOut()
    setUser(null); setProfile(null); setSession(null)
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
