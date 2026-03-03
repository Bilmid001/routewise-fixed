"use client"
import Link from "next/link"
import { ArrowRight, Globe, Zap, Shield, TrendingUp, CheckCircle2, BarChart3 } from "lucide-react"
import FxTicker from "@/components/FxTicker"
import Navbar from "@/components/Navbar"
import AIChatWidget from "@/components/AIChatWidget"
import SavingsCalculator from "@/components/SavingsCalculator"
import { useLang } from "@/lib/LangContext"

export default function Home() {
  const { t } = useLang()
  return (
    <main className="min-h-screen bg-[var(--bg)] grid-bg text-[var(--text)]">
      <FxTicker />
      <Navbar showDashBtn={true} showSimBtn={true} />
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:"1.5s"}} />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-4 py-2 rounded-full mb-6 sm:mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />{t.hero_badge}
          </div>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl leading-none mb-4 sm:mb-6 tracking-tight">
            <span>{t.hero_title1}</span><span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">{t.hero_title2}</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text2)] max-w-2xl mx-auto mb-3 sm:mb-4 leading-relaxed px-2">{t.hero_sub}</p>
          <p className="text-sm text-[var(--text3)] mb-8 sm:mb-12">{t.hero_built}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/simulate" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/25">
              {t.hero_cta} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="border border-[var(--border)] hover:border-indigo-300 dark:hover:border-indigo-600 text-[var(--text2)] hover:text-[var(--text)] font-semibold px-6 sm:px-8 py-4 rounded-xl text-base sm:text-lg transition-all flex items-center justify-center gap-3 bg-[var(--card)]">
              <BarChart3 className="w-5 h-5" /> {t.hero_analytics}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">{t.prob_label}</div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 sm:mb-5 leading-tight">{t.prob_title.split("hidden")[0]}<span className="text-rose-500">hidden payment fees</span></h2>
              <p className="text-[var(--text2)] leading-relaxed mb-6 text-sm sm:text-base">{t.prob_sub}</p>
              <ul className="space-y-2">
                {["4 payment rails with different fee structures","FX spreads vary from 0.8% to 3%+","Settlement times: 1 hour to 48 hours","15 currency corridors supported"].map(i => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text2)] text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />{i}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[{l:"Avg Fee Overpayment",v:"4.2%",c:"text-rose-500"},{l:"Payment Rails",v:"4+",c:"text-indigo-600 dark:text-indigo-400"},{l:"Potential Savings",v:"8%",c:"text-emerald-600 dark:text-emerald-400"},{l:"Currencies",v:"15",c:"text-violet-600 dark:text-violet-400"}].map(s => (
                <div key={s.l} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-6 text-center shadow-sm">
                  <div className={"font-display font-extrabold text-3xl sm:text-4xl mb-1 " + s.c}>{s.v}</div>
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
            {[{n:"01",t_:t.step1_title,d:t.step1_desc},{n:"02",t_:t.step2_title,d:t.step2_desc},{n:"03",t_:t.step3_title,d:t.step3_desc},{n:"04",t_:t.step4_title,d:t.step4_desc}].map(s => (
              <div key={s.n} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="font-display font-extrabold text-4xl text-indigo-200 dark:text-indigo-800 mb-3">{s.n}</div>
                <h3 className="font-bold mb-2 text-sm sm:text-base">{s.t_}</h3>
                <p className="text-[var(--text3)] text-xs sm:text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <SavingsCalculator />
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">{t.feat_label}</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">{t.feat_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[{icon:Globe,t_:t.feat1_title,d:t.feat1_desc},{icon:TrendingUp,t_:t.feat2_title,d:t.feat2_desc},{icon:Zap,t_:t.feat3_title,d:t.feat3_desc},{icon:Shield,t_:t.feat4_title,d:t.feat4_desc}].map(f => (
              <div key={f.t_} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors shadow-sm group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold mb-2 text-sm sm:text-base">{f.t_}</h3>
                <p className="text-[var(--text3)] text-xs sm:text-sm leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-indigo-600/5 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-700/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest">{t.cta_badge}</div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mb-5 leading-tight">{t.cta_title}</h2>
          <p className="text-[var(--text2)] mb-8 sm:mb-10 text-base sm:text-lg">{t.cta_sub}</p>
          <Link href="/simulate" className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-lg sm:text-xl transition-all shadow-2xl shadow-indigo-500/25">
            {t.cta_btn} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2"><div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded" /><span className="font-display font-bold">RouteWise</span></div>
          <p className="text-[var(--text3)] text-sm">{t.footer_sub}</p>
          <p className="text-[var(--text3)] text-xs">{t.footer_disclaimer}</p>
        </div>
      </footer>
      <AIChatWidget />
    </main>
  )
}
