import Link from 'next/link'
import { ArrowRight, Globe, Zap, Shield, TrendingUp, CheckCircle2, BarChart3 } from 'lucide-react'
import FxTicker from '@/components/FxTicker'
import ThemeToggle from '@/components/ThemeToggle'
import AIChatWidget from '@/components/AIChatWidget'

const steps = [
  { n:'01', title:'Enter Transaction',  desc:'Input amount, source and destination currencies from 15 global options.' },
  { n:'02', title:'Route Analysis',     desc:'Engine evaluates 4 payment rails simultaneously in real-time.' },
  { n:'03', title:'AI Scoring',         desc:'Routes ranked by cost 50%, speed 30%, reliability 20%.' },
  { n:'04', title:'Optimal Route',      desc:'Receive best route with AI-generated explanation and confidence meter.' },
]
const features = [
  { icon:Globe,      title:'15 Currencies',          desc:'NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.' },
  { icon:TrendingUp, title:'FX Intelligence',         desc:'Live spread analysis across all global corridors with real-time ticker.' },
  { icon:Zap,        title:'Speed vs Cost Engine',    desc:'Weighted scoring balances settlement time against transaction cost.' },
  { icon:Shield,     title:'AI Recommendations',      desc:'OpenAI-powered insights explain why each route is optimal.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] grid-bg text-[var(--text)]">
      <FxTicker />
      <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">RW</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">RouteWise</span>
            <span className="ml-2 hidden sm:inline bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/40">HACKATHON 2025</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-[var(--text2)] hover:text-[var(--text)] text-sm font-medium transition-colors hidden sm:block">Dashboard</Link>
            <ThemeToggle />
            <Link href="/simulate" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">Simulate</Link>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-400/10 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'1.5s'}} />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
            Cross-Border Payment Decision Intelligence
          </div>
          <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-none mb-6 tracking-tight">
            <span>Route</span><span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">Wise</span>
          </h1>
          <p className="text-xl text-[var(--text2)] max-w-2xl mx-auto mb-4 leading-relaxed">
            Stop overpaying on cross-border transfers. RouteWise analyzes every payment rail across 15 currencies to find your optimal route — saving SMEs thousands in fees and FX spreads.
          </p>
          <p className="text-sm text-[var(--text3)] mb-12">
            Built as a decision intelligence layer on top of payment infrastructure like Interswitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulate" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/25">
              Simulate Payment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="border border-[var(--border)] hover:border-indigo-300 dark:hover:border-indigo-600 text-[var(--text2)] hover:text-[var(--text)] font-semibold px-8 py-4 rounded-xl text-lg transition-all flex items-center justify-center gap-3 bg-[var(--card)]">
              <BarChart3 className="w-5 h-5" /> View Analytics
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">The Problem</div>
              <h2 className="font-display font-bold text-4xl mb-5 leading-tight">SMEs lose billions to <span className="text-rose-500">hidden payment fees</span></h2>
              <p className="text-[var(--text2)] leading-relaxed mb-6">Every cross-border payment involves FX spreads, flat fees, percentage fees and variable settlement windows. Without intelligent routing, businesses routinely overpay by 3–8% per transaction.</p>
              <ul className="space-y-2">
                {['4 payment rails with different fee structures','FX spreads vary from 0.8% to 3%+','Settlement times: 1 hour to 48 hours','15 currency corridors supported'].map(i => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text2)] text-sm"><CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />{i}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { l:'Avg Fee Overpayment', v:'4.2%', c:'text-rose-500' },
                { l:'Payment Rails',       v:'4+',   c:'text-indigo-600 dark:text-indigo-400' },
                { l:'Potential Savings',   v:'8%',   c:'text-emerald-600 dark:text-emerald-400' },
                { l:'Currencies Supported',v:'15',   c:'text-violet-600 dark:text-violet-400' },
              ].map(s => (
                <div key={s.l} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center shadow-sm">
                  <div className={`font-display font-extrabold text-3xl mb-1 ${s.c}`}>{s.v}</div>
                  <div className="text-[var(--text3)] text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">How It Works</div>
            <h2 className="font-display font-bold text-4xl">From input to optimal route in seconds</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.n} className="relative">
                {i < steps.length-1 && <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-400/30 to-transparent z-0" />}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 relative z-10 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <div className="font-display font-extrabold text-4xl text-indigo-200 dark:text-indigo-800 mb-3">{step.n}</div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-[var(--text3)] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Features</div>
            <h2 className="font-display font-bold text-4xl">Built for payment intelligence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors shadow-sm group">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/40 transition-colors">
                  <f.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-[var(--text3)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-indigo-600/5 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-700/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest">Built for Hackathon 2025</div>
          <h2 className="font-display font-extrabold text-5xl mb-5 leading-tight">Ready to optimize your payments?</h2>
          <p className="text-[var(--text2)] mb-10 text-lg">Start with a free simulation. No signup required. Covers 15 currencies and 4 payment rails.</p>
          <Link href="/simulate" className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-5 rounded-xl text-xl transition-all shadow-2xl shadow-indigo-500/25">
            Simulate Payment Now <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded" />
            <span className="font-display font-bold">RouteWise</span>
          </div>
          <p className="text-[var(--text3)] text-sm">Cross-border payment intelligence for SMEs. Hackathon 2025.</p>
          <p className="text-[var(--text3)] text-xs">Simulations only — no real payments processed.</p>
        </div>
      </footer>
      <AIChatWidget />
    </main>
  )
}
