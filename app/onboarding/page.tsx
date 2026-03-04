'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Zap, Building2, Globe, DollarSign, CheckCircle } from 'lucide-react'
import { getSupabaseBrowser } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'
import { CURRENCIES } from '@/lib/mockData'

const STEPS = ['Welcome','Company','Preferences','Done']
const COUNTRIES = ['Nigeria','United Kingdom','United States','Ghana','Kenya','South Africa','UAE','France','Canada','Australia','India','Germany','Brazil','Other']

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth()
  const router = useRouter()
  const supabase = getSupabaseBrowser()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ fullName:'', company:'', country:'Nigeria', homeCurrency:'NGN', monthlyVolume:'10000' })
  const [saving, setSaving] = useState(false)

  const set = (k: string, v: string) => setData(p=>({...p,[k]:v}))

  const finish = async () => {
    setSaving(true)
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id, full_name: data.fullName, company_name: data.company,
        country: data.country, home_currency: data.homeCurrency,
        monthly_volume: parseFloat(data.monthlyVolume)||0, onboarding_complete: true,
      })
      await refreshProfile()
    }
    router.push('/dashboard')
  }

  const pct = ((step) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen bg-[var(--bg)] grid-bg flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white"/></div>
          <span className="font-display font-extrabold text-xl">RouteWise</span>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-[var(--text3)] mb-2">
            <span>Setup {step+1} of {STEPS.length}</span><span>{STEPS[step]}</span>
          </div>
          <div className="h-1.5 bg-[var(--border)] rounded-full"><div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500" style={{width:pct+'%'}}/></div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl">
          {step === 0 && (
            <div className="text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl mb-3">Welcome to RouteWise!</h1>
              <p className="text-[var(--text2)] mb-6">We'll set up your account in 3 quick steps so you get the most out of your payment intelligence platform.</p>
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                {[{e:'⚡',t:'Fast Setup'},{e:'🔒',t:'Secure'},{e:'🤖',t:'AI Powered'}].map(i=>(
                  <div key={i.t} className="bg-[var(--bg2)] rounded-xl p-3 border border-[var(--border)]">
                    <div className="text-2xl mb-1">{i.e}</div><div className="text-xs text-[var(--text3)]">{i.t}</div>
                  </div>
                ))}
              </div>
              <button onClick={()=>setStep(1)} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          )}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center"><Building2 className="w-5 h-5 text-indigo-600"/></div>
                <div><h2 className="font-bold text-xl">Company Details</h2><p className="text-sm text-[var(--text3)]">Tell us about yourself</p></div>
              </div>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Your Full Name</label>
                <input value={data.fullName} onChange={e=>set('fullName',e.target.value)} placeholder="Ibrahim Aliyu" className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 transition-all"/></div>
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Company Name</label>
                <input value={data.company} onChange={e=>set('company',e.target.value)} placeholder="Your Company Ltd" className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 transition-all"/></div>
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Country</label>
                <select value={data.country} onChange={e=>set('country',e.target.value)} className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-indigo-500 transition-all appearance-none">
                  {COUNTRIES.map(c=><option key={c}>{c}</option>)}
                </select></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setStep(0)} className="flex-1 border border-[var(--border)] text-[var(--text2)] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:border-indigo-300 transition-all"><ArrowLeft className="w-4 h-4"/>Back</button>
                <button onClick={()=>setStep(2)} className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">Next <ArrowRight className="w-4 h-4"/></button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-violet-600"/></div>
                <div><h2 className="font-bold text-xl">Payment Preferences</h2><p className="text-sm text-[var(--text3)]">Helps us personalize your experience</p></div>
              </div>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Home Currency</label>
                <select value={data.homeCurrency} onChange={e=>set('homeCurrency',e.target.value)} className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-indigo-500 transition-all appearance-none">
                  {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
                </select></div>
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Monthly Transfer Volume (USD)</label>
                <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text3)] font-bold">$</span>
                <input type="number" value={data.monthlyVolume} onChange={e=>set('monthlyVolume',e.target.value)} placeholder="10000" className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl pl-8 pr-4 py-3 text-[var(--text)] focus:outline-none focus:border-indigo-500 transition-all font-mono"/></div>
                <p className="text-xs text-[var(--text3)] mt-1">Used to calculate your potential annual savings</p></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setStep(1)} className="flex-1 border border-[var(--border)] text-[var(--text2)] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:border-indigo-300 transition-all"><ArrowLeft className="w-4 h-4"/>Back</button>
                <button onClick={()=>setStep(3)} className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">Next <ArrowRight className="w-4 h-4"/></button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-600"/></div>
              <h2 className="font-display font-extrabold text-2xl mb-2">All set!</h2>
              <p className="text-[var(--text2)] mb-6">Your RouteWise account is ready. You can now run simulations, track your history, set rate alerts, and more.</p>
              <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-4 mb-6 text-left space-y-2">
                {[['Name',data.fullName||'—'],['Company',data.company||'—'],['Country',data.country],['Home Currency',data.homeCurrency],['Monthly Volume','$'+parseInt(data.monthlyVolume||'0').toLocaleString()]].map(([k,v])=>(
                  <div key={k} className="flex justify-between text-sm"><span className="text-[var(--text3)]">{k}</span><span className="font-semibold">{v}</span>
                </div>))}
              </div>
              <button onClick={finish} disabled={saving} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                {saving?'Saving...':'Go to Dashboard 🚀'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
