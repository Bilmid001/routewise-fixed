'use client'
import Link from 'next/link'
import { ArrowRight,Globe,Zap,Shield,TrendingUp,CheckCircle2,Lock,Star } from 'lucide-react'
import FxTicker from '@/components/FxTicker'
import PublicNavbar from '@/components/PublicNavbar'
import AIChatWidget from '@/components/AIChatWidget'
import SavingsCalculator from '@/components/SavingsCalculator'
import { useAuth } from '@/lib/AuthContext'
import { useLang } from '@/lib/LangContext'
export default function Home() {
  const { user }=useAuth()
  const { t }=useLang()
  return (
    <main className="min-h-screen bg-[var(--bg)] grid-bg text-[var(--text)]">
      <FxTicker/><PublicNavbar/>
      <section className="pt-16 sm:pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow"/>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'1.5s'}}/>
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-4 py-2 rounded-full mb-6 sm:mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"/>{t.hero_badge}
          </div>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-none mb-4 sm:mb-6 tracking-tight">
            Route<span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">Wise</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text2)] max-w-2xl mx-auto mb-3 leading-relaxed px-2">{t.hero_sub}</p>
          <p className="text-sm text-[var(--text3)] mb-8 sm:mb-12">{t.hero_built}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            {user?(
              <Link href="/simulate" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/25">{t.hero_cta} <ArrowRight className="w-5 h-5"/></Link>
            ):(
              <>
                <Link href="/auth/signup" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/25">{t.hero_cta} <ArrowRight className="w-5 h-5"/></Link>
                <Link href="/simulate" className="border border-[var(--border)] hover:border-indigo-300 text-[var(--text2)] hover:text-[var(--text)] font-semibold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3 bg-[var(--card)]">{t.hero_demo}</Link>
              </>
            )}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-[var(--text3)]">
            {['🔒 256-bit SSL','🛡️ SOC 2 Ready','🚫 No data sold','⚡ Instant results','🌍 15 currencies'].map(b=><span key={b} className="bg-[var(--card)] border border-[var(--border)] px-3 py-1.5 rounded-full">{b}</span>)}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">{t.prob_label}</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 leading-tight">{t.prob_title.includes('hidden')?<>{t.prob_title.split('hidden')[0]}<span className="text-rose-500">hidden</span>{t.prob_title.split('hidden')[1]}</>:t.prob_title}</h2>
              <p className="text-[var(--text2)] leading-relaxed mb-6 text-sm sm:text-base">{t.prob_sub}</p>
              <ul className="space-y-2">{['4 payment rails with different fee structures','FX spreads vary from 0.8% to 3%+','Settlement times: 1 hour to 48 hours','15 currency corridors supported'].map(i=><li key={i} className="flex items-center gap-3 text-[var(--text2)] text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0"/>{i}</li>)}</ul>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[{l:'Avg Fee Overpayment',v:'4.2%',c:'text-rose-500'},{l:'Payment Rails',v:'4+',c:'text-indigo-600 dark:text-indigo-400'},{l:'Max Savings',v:'8%',c:'text-emerald-600 dark:text-emerald-400'},{l:'Currencies',v:'15',c:'text-violet-600 dark:text-violet-400'}].map(s=>(
                <div key={s.l} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6 text-center shadow-sm">
                  <div className={"font-display font-extrabold text-3xl sm:text-4xl mb-1 "+s.c}>{s.v}</div>
                  <div className="text-[var(--text3)] text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">{t.steps_label}</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">{t.steps_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[{n:'01',title:'Enter Transaction',desc:'Amount, source and destination currencies from 15 global options.'},{n:'02',title:'Route Analysis',desc:'Evaluates 4 payment rails simultaneously — runs locally, instant.'},{n:'03',title:'AI Scoring',desc:'Ranked by cost 50%, speed 30%, reliability 20%.'},{n:'04',title:'Optimal Route',desc:'Best route with AI explanation, risk analysis, and confidence meter.'}].map(s=>(
              <div key={s.n} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="font-display font-extrabold text-4xl text-indigo-200 dark:text-indigo-800 mb-3">{s.n}</div>
                <h3 className="font-bold mb-2 text-sm sm:text-base">{s.title}</h3>
                <p className="text-[var(--text3)] text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]"><div className="max-w-6xl mx-auto"><SavingsCalculator/></div></section>
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">{t.feat_label}</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">{t.feat_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[{icon:Globe,title:'15 Currencies',desc:'NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.'},{icon:TrendingUp,title:'FX Intelligence',desc:'Live spread analysis across all corridors with real-time ticker.'},{icon:Zap,title:'Instant Simulation',desc:'Calculation runs locally — results appear in under 1ms, no server wait.'},{icon:Lock,title:'Secure Auth',desc:'Sign in with Google or email. All simulations saved permanently.'},{icon:Star,title:'Personal Dashboard',desc:'Your own analytics: charts, history, total saved, preferred routes.'},{icon:Shield,title:'Risk Analysis',desc:'Risk assessed per corridor — FX volatility, settlement, reliability.'}].map(f=>(
              <div key={f.title} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4"><f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400"/></div>
                <h3 className="font-bold mb-2 text-sm sm:text-base">{f.title}</h3>
                <p className="text-[var(--text3)] text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-indigo-200 dark:border-indigo-700/40">Built for Hackathon 2025</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mb-5 leading-tight">{t.cta_title}</h2>
          <p className="text-[var(--text2)] mb-8 text-base sm:text-lg">{t.cta_sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all shadow-2xl shadow-indigo-500/25">{t.cta_btn} <ArrowRight className="w-5 h-5"/></Link>
            <Link href="/auth/login" className="inline-flex items-center justify-center gap-3 border border-[var(--border)] hover:border-indigo-300 text-[var(--text2)] font-semibold px-8 py-4 rounded-xl text-lg transition-all bg-[var(--card)]">{t.nav_signin}</Link>
          </div>
        </div>
      </section>
      <footer className="border-t border-[var(--border)] py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded"/><span className="font-display font-bold">RouteWise</span></div>
          <p className="text-[var(--text3)] text-sm">{t.footer_sub}</p>
          <p className="text-[var(--text3)] text-xs">Simulations only — no real payments processed.</p>
        </div>
      </footer>
      <AIChatWidget/>
    </main>
  )
}
