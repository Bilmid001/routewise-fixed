import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AnalyticsCharts from '@/components/AnalyticsCharts'
import FxTicker from '@/components/FxTicker'
import ThemeToggle from '@/components/ThemeToggle'
import AIChatWidget from '@/components/AIChatWidget'
import { MOCK_SIMULATIONS } from '@/lib/mockData'

export default function DashboardPage() {
  const routeCounts: Record<string, number> = {}
  MOCK_SIMULATIONS.forEach(s => { routeCounts[s.best_route] = (routeCounts[s.best_route]||0)+1 })

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker />
      <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[var(--text2)] hover:text-[var(--text)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded flex items-center justify-center"><span className="text-white text-xs font-bold">RW</span></div>
            <span className="font-display font-bold hidden sm:block">RouteWise</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/simulate" className="text-[var(--text2)] hover:text-[var(--text)] text-sm font-medium transition-colors hidden sm:block">Simulator</Link>
            <ThemeToggle />
            <Link href="/simulate" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">New Simulation</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Analytics Dashboard</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl">Payment Intelligence</h1>
          <p className="text-[var(--text2)] mt-2">Route performance analytics and simulation history overview.</p>
        </div>

        <AnalyticsCharts />

        <div className="mt-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="font-bold">Recent Simulations</h3>
            <span className="text-xs text-[var(--text3)]">{MOCK_SIMULATIONS.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  {['Amount','Corridor','Best Route','Savings','Date'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs text-[var(--text3)] uppercase tracking-widest font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_SIMULATIONS.map(sim => (
                  <tr key={sim.id} className="border-b border-[var(--border)] hover:bg-[var(--bg2)] transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold">{sim.amount.toLocaleString()} <span className="text-[var(--text3)] text-xs">{sim.source_currency}</span></td>
                    <td className="px-6 py-4 text-sm text-[var(--text2)]">{sim.source_currency} to {sim.destination_currency}</td>
                    <td className="px-6 py-4"><span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full">{sim.best_route}</span></td>
                    <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">+{sim.savings_amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-[var(--text3)] text-sm">{new Date(sim.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(routeCounts).map(([route, count]) => (
            <div key={route} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
              <div className="text-[var(--text3)] text-xs uppercase tracking-wider mb-1">Route</div>
              <div className="font-semibold text-sm mb-3">{route}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[var(--border)] rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width:(count/MOCK_SIMULATIONS.length*100)+'%'}} /></div>
                <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">{count}x</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AIChatWidget />
    </main>
  )
}
