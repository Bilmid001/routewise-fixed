'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Loader2,CheckCircle } from 'lucide-react'
import PublicNavbar from '@/components/PublicNavbar'
import FxTicker from '@/components/FxTicker'
import { getSupabase } from '@/lib/supabase'
export default function ResetPasswordPage() {
  const [email,setEmail]=useState('')
  const [loading,setLoading]=useState(false)
  const [sent,setSent]=useState(false)
  const [error,setError]=useState('')
  const handle=async(e:React.FormEvent)=>{
    e.preventDefault(); setError(''); setLoading(true)
    const { error }=await getSupabase().auth.resetPasswordForEmail(email,{ redirectTo:window.location.origin+'/auth/update-password' })
    if(error){ setError(error.message); setLoading(false) } else setSent(true)
  }
  if(sent) return (
    <div className="min-h-screen bg-[var(--bg)] grid-bg text-[var(--text)]"><FxTicker/><PublicNavbar/>
      <div className="flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-10 shadow-xl">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-indigo-600"/></div>
          <h2 className="font-display font-extrabold text-2xl mb-2">Email sent!</h2>
          <p className="text-[var(--text2)] mb-6">Check <strong>{email}</strong> for a reset link.</p>
          <Link href="/auth/login" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all">Back to Login</Link>
        </div>
      </div>
    </div>
  )
  return (
    <div className="min-h-screen bg-[var(--bg)] grid-bg text-[var(--text)]"><FxTicker/><PublicNavbar/>
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8"><h1 className="font-display font-extrabold text-3xl mb-2">Reset password</h1><p className="text-[var(--text2)] text-sm">Enter your email and we&apos;ll send a reset link.</p></div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl">
            <form onSubmit={handle} className="space-y-4">
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@company.com" className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 transition-all"/>
              {error&&<div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 rounded-xl px-4 py-3 text-rose-600 text-sm">{error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Sending...</>:'Send Reset Link'}
              </button>
            </form>
            <p className="text-center text-sm text-[var(--text2)] mt-6"><Link href="/auth/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
