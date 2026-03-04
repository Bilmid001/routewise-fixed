'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Loader2, ArrowLeft, Zap, CheckCircle } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const supabase = getSupabaseBrowser()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/auth/update-password' })
    if (error) { setError(error.message); setLoading(false) }
    else setSent(true)
  }

  if (sent) return (
    <div className="min-h-screen bg-[var(--bg)] grid-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-10 shadow-xl">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-indigo-600"/></div>
        <h2 className="font-display font-extrabold text-2xl mb-2">Email sent!</h2>
        <p className="text-[var(--text2)] mb-6">Check your inbox at <strong>{email}</strong> for a password reset link.</p>
        <Link href="/auth/login" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all">Back to Login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] grid-bg flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/auth/login" className="flex items-center gap-2 mb-8 text-[var(--text2)] hover:text-[var(--text)] transition-colors"><ArrowLeft className="w-4 h-4"/><span className="text-sm">Back to login</span></Link>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white"/></div>
          <div><div className="font-display font-extrabold text-xl">RouteWise</div><div className="text-xs text-[var(--text3)]">Payment Intelligence</div></div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl">
          <h1 className="font-display font-extrabold text-2xl mb-1">Reset password</h1>
          <p className="text-[var(--text2)] text-sm mb-6">Enter your email and we'll send you a reset link.</p>
          <form onSubmit={handleReset} className="space-y-4">
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@company.com"
              className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"/>
            {error && <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 rounded-xl px-4 py-3 text-rose-600 text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
              {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Sending...</>:'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
