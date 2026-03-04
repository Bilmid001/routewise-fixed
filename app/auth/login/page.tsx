'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, ArrowLeft, Zap } from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard')
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/auth/callback' } })
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] grid-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 text-[var(--text2)] hover:text-[var(--text)] transition-colors">
          <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back to home</span>
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
          <div><div className="font-display font-extrabold text-xl">RouteWise</div><div className="text-xs text-[var(--text3)]">Payment Intelligence</div></div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl mb-1">Welcome back</h1>
          <p className="text-[var(--text2)] text-sm mb-6">Sign in to your RouteWise account</p>

          <button onClick={handleGoogle} disabled={googleLoading} className="w-full flex items-center justify-center gap-3 border border-[var(--border)] hover:border-indigo-300 bg-[var(--card)] text-[var(--text)] font-semibold py-3 rounded-xl transition-all mb-4 text-sm">
            {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-[var(--border)]" /><span className="text-xs text-[var(--text3)]">or</span><div className="flex-1 h-px bg-[var(--border)]" /></div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@company.com"
                className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 pr-10 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                <button type="button" onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text3)] hover:text-[var(--text)] transition-colors">
                  {showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
              </div>
              <div className="flex justify-end mt-1"><Link href="/auth/reset-password" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</Link></div>
            </div>
            {error && <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl px-4 py-3 text-rose-600 dark:text-rose-400 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
              {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Signing in...</>:'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text2)] mt-6">
            Don't have an account? <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Sign up free</Link>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[var(--text3)]">
          <div className="flex items-center gap-1.5">🔒 256-bit encryption</div>
          <div className="flex items-center gap-1.5">🛡️ SOC 2 Ready</div>
          <div className="flex items-center gap-1.5">🚫 No data sold</div>
        </div>
      </div>
    </div>
  )
}
