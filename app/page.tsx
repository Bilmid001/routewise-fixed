import Link from 'next/link'
import { ArrowRight, Globe, Zap, Shield, TrendingUp, CheckCircle2, BarChart3 } from 'lucide-react'

const steps = [
  { n: '01', title: 'Enter Transaction', desc: 'Input your amount, source and destination currencies.' },
  { n: '02', title: 'Route Analysis', desc: 'Our engine evaluates 4 live payment rails simultaneously.' },
  { n: '03', title: 'AI Scoring', desc: 'Routes are ranked by cost, speed and reliability scores.' },
  { n: '04', title: 'Optimal Route', desc: 'Receive the best route with AI-generated reasoning.' },
]

const features = [
  { icon: Globe, title: 'Multi-Rail Simulation', desc: 'Compare Bank, Wallet, Card and API settlement paths in real-time.' },
  { icon: TrendingUp, title: 'FX Intelligence', desc: 'Live spread analysis across NGN, USD, GBP and EUR corridors.' },
  { icon: Zap, title: 'Speed vs Cost', desc: 'Weighted scoring balances settlement time against transaction cost.' },
  { icon: Shield, title: 'Reliability Scoring', desc: 'Risk-adjusted recommendations for enterprise-grade confidence.' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] grid-bg text-white font-body overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/60 bg-[#050816]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg" />
            <span className="font-display font-bold text-xl text-white tracking-tight">RouteWise</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Dashboard</Link>
            <Link href="/simulate" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
              Simulate
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Decision Intelligence Platform
          </div>

          <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl leading-none mb-6 tracking-tight">
            <span className="text-white">Route</span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">Wise</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            Stop overpaying on cross-border transfers. RouteWise analyzes every payment rail to find your optimal route — saving SMEs thousands in fees and FX spreads.
          </p>

          <p className="text-sm text-slate-600 mb-12">
            Similar to how Interswitch optimizes African payment infrastructure, RouteWise is your decision intelligence layer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/simulate"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-2xl shadow-indigo-900/40 glow-indigo"
            >
              Simulate Payment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-3 bg-slate-900/50"
            >
              <BarChart3 className="w-5 h-5" />
              View Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">The Problem</div>
              <h2 className="font-display font-bold text-4xl text-white mb-5 leading-tight">
                SMEs lose billions to<br /><span className="text-rose-400">hidden payment fees</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Every cross-border payment involves FX spreads, flat fees, percentage fees and variable settlement windows. Without intelligent routing, businesses routinely overpay by 3–8% per transaction.
              </p>
              <ul className="space-y-3">
                {['Multiple payment rails with different fee structures', 'FX spreads that vary by 0.8% to 3%+', 'Settlement times from 1 hour to 48 hours', 'Reliability differences affecting cash flow'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Avg. Fee Overpayment', value: '4.2%', color: 'text-rose-400' },
                { label: 'Payment Rails Available', value: '4+', color: 'text-indigo-400' },
                { label: 'Potential Savings', value: 'Up to 8%', color: 'text-emerald-400' },
                { label: 'Supported Corridors', value: '12+', color: 'text-violet-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 text-center">
                  <div className={`font-display font-extrabold text-3xl mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-slate-500 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">How It Works</div>
            <h2 className="font-display font-bold text-4xl text-white">From input to optimal route in seconds</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.n} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-500/40 to-transparent z-0" />
                )}
                <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 relative z-10">
                  <div className="font-display font-extrabold text-4xl text-indigo-500/30 mb-3">{step.n}</div>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">Features</div>
            <h2 className="font-display font-bold text-4xl text-white">Built for payment intelligence</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors group">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600/30 transition-colors">
                  <f.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-slate-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-5xl text-white mb-5 leading-tight">
            Ready to optimize your payments?
          </h2>
          <p className="text-slate-400 mb-10 text-lg">Start with a free simulation. No signup required.</p>
          <Link
            href="/simulate"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-5 rounded-xl text-xl transition-all duration-200 shadow-2xl shadow-indigo-900/40"
          >
            Simulate Payment Now
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded" />
            <span className="font-display font-bold text-white">RouteWise</span>
          </div>
          <p className="text-slate-600 text-sm">© 2025 RouteWise. Cross-border payment intelligence for SMEs.</p>
          <p className="text-slate-700 text-xs">Simulations only — no real payments processed.</p>
        </div>
      </footer>
    </main>
  )
}
