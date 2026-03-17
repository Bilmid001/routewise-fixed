'use client'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2,User,LogOut } from 'lucide-react'
import AppNavbar from '@/components/AppNavbar'
import FxTicker from '@/components/FxTicker'
import { useAuth } from '@/lib/AuthContext'
import { getSupabase } from '@/lib/supabase'
import { CURRENCIES } from '@/lib/mockData'
const COUNTRIES=['Nigeria','United Kingdom','United States','Ghana','Kenya','South Africa','UAE','France','Canada','Australia','India','Germany','Brazil','Other']
export default function ProfilePage() {
  const { user,profile,signOut,refreshProfile }=useAuth()
  const router=useRouter()
  const [form,setForm]=useState({full_name:'',company_name:'',country:'Nigeria',home_currency:'NGN',monthly_volume:''})
  const [saving,setSaving]=useState(false)
  const [saved,setSaved]=useState(false)
  useEffect(()=>{ if(!user){ router.push('/auth/login'); return }; if(profile) setForm({full_name:profile.full_name||'',company_name:profile.company_name||'',country:profile.country||'Nigeria',home_currency:profile.home_currency||'NGN',monthly_volume:String(profile.monthly_volume||'')}) },[user,profile])
  const set=(k:string,v:string)=>setForm(p=>({...p,[k]:v}))
  const save=async()=>{
    setSaving(true)
    await getSupabase().from('profiles').update({...form,monthly_volume:parseFloat(form.monthly_volume)||0}).eq('id',user!.id)
    await refreshProfile(); setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2000)
  }
  const inp="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker/><AppNavbar showSimBtn={true}/>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8"><div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Account</div><h1 className="font-display font-extrabold text-3xl sm:text-4xl">My Profile</h1></div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm mb-5 flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">{form.full_name?.[0]?.toUpperCase()||'?'}</div>
          <div><div className="font-bold text-lg">{form.full_name||'Your Name'}</div><div className="text-[var(--text3)] text-sm">{user?.email}</div><div className="flex items-center gap-2 mt-1"><span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-semibold">{profile?.role||'user'}</span>{profile?.onboarding_complete&&<span className="text-xs bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">✓ Verified</span>}</div></div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm mb-5">
          <h2 className="font-bold text-base sm:text-lg mb-5 flex items-center gap-2"><User className="w-4 h-4 text-indigo-500"/>Personal Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Full Name</label><input value={form.full_name} onChange={e=>set('full_name',e.target.value)} placeholder="Your Name" className={inp}/></div>
              <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Company</label><input value={form.company_name} onChange={e=>set('company_name',e.target.value)} placeholder="Optional" className={inp}/></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Country</label><select value={form.country} onChange={e=>set('country',e.target.value)} className={inp+" appearance-none"}>{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select></div>
              <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Home Currency</label><select value={form.home_currency} onChange={e=>set('home_currency',e.target.value)} className={inp+" appearance-none"}>{CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}</select></div>
            </div>
            <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Monthly Volume (USD)</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text3)] font-bold">$</span><input type="number" value={form.monthly_volume} onChange={e=>set('monthly_volume',e.target.value)} placeholder="10000" className={inp+" pl-8 font-mono"}/></div></div>
          </div>
          <button onClick={save} disabled={saving} className="mt-5 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all">
            {saving?<><Loader2 className="w-4 h-4 animate-spin"/>Saving...</>:saved?'✓ Saved!':'Save Changes'}
          </button>
        </div>
        <button onClick={async()=>{ await signOut(); router.push('/') }} className="flex items-center gap-2 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 px-5 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all font-semibold text-sm">
          <LogOut className="w-4 h-4"/>Sign Out
        </button>
      </div>
    </main>
  )
}
