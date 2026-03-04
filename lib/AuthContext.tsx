'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getSupabaseBrowser } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

type Profile = {
  id: string; email: string; full_name?: string; company_name?: string
  country?: string; home_currency?: string; monthly_volume?: number
  onboarding_complete?: boolean; role?: string
}
type AuthCtx = {
  user: User | null; profile: Profile | null; session: Session | null
  loading: boolean; signOut: () => Promise<void>; refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthCtx>({
  user: null, profile: null, session: null, loading: true,
  signOut: async () => {}, refreshProfile: async () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = getSupabaseBrowser()

  const fetchProfile = async (uid: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).single()
    if (data) setProfile(data)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setProfile(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null); setProfile(null); setSession(null)
  }
  const refreshProfile = async () => { if (user) await fetchProfile(user.id) }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
