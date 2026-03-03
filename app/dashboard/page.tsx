import Link from 'next/link'
import { ArrowLeft, TrendingUp, BarChart3, Clock, Zap } from 'lucide-react'
import AnalyticsCharts from '@/components/AnalyticsCharts'
import { MOCK_SIMULATIONS } from '@/lib/mockData'

export default function DashboardPage() {
  const totalSims = MOCK_SIMULATIONS.length
  const avgSavings = MOCK_SIMULATIONS.reduce((s, r) => s + r.savings_amount, 0) / totalSims
  const routeCounts: Record<string, number> = {}
  MOCK_SIMULATIONS.forEach((s) => {
    routeCounts[s.best_route] = (routeCounts[s.best_route] || 0) + 1
  })
  const mostSelected = Object.entries(routeCounts).sort((a, b) => b[1] - a[1])[0][0]
  const avgSettlement = 1.8 // hours for top route

  const stats = [
    { label: 'Total Simulations', value: totalSims.toString(), icon: BarChart3, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Average Savings', value: `$${avgSavings.toFixed(1)}`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Top Route', value: mostSelected.split(' ').slice(0, 2).join(' '), icon: Zap, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
    { label: 'Avg Settlement', value: `${avgSettlement}h`, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ]

  return (
    <main className="min-h-screen bg-[#050816] grid-bg text-white font-body">
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/60 bg-[#050816]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded" />
            <span className="font-display font-bold text-white">RouteWise</span>
          </Link>
          <Link href="/simulate" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
            New Simulation
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Analytics Dashboard</div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white">Payment Intelligence</h1>
            <p className="text-slate-400 mt-3">Overview of route performance and simulation analytics.</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className={`border rounded-2xl p-5 ${s.bg}`}>
                <div className="flex items-center gap-2 mb-3">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-slate-500 text-xs uppercase tracking-wider">{s.label}</span>
                </div>
                <div className={`font-display font-extrabold text-3xl ${s.color}`}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <AnalyticsCharts />

          {/* Recent simulations */}
          <div className="mt-8 bg-slate-900/50 border border-slate-700/60 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700/60">
              <h3 className="text-white font-bold">Recent Simulations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/40">
                    {['Amount', 'Corridor', 'Best Route', 'Savings', 'Date'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs text-slate-500 uppercase tracking-widest font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_SIMULATIONS.map((sim) => (
                    <tr key={sim.id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-mono text-white font-semibold">
                        {sim.amount.toLocaleString()} <span className="text-slate-500 text-xs">{sim.source_currency}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {sim.source_currency} → {sim.destination_currency}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">{sim.best_route}</span>
                      </td>
                      <td className="px-6 py-4 text-emerald-400 font-mono font-semibold">
                        +{sim.savings_amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {new Date(sim.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Route breakdown */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(routeCounts).map(([route, count]) => (
              <div key={route} className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-5">
                <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Route</div>
                <div className="text-white font-semibold text-sm mb-3">{route}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-700 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(count / totalSims) * 100}%` }} />
                  </div>
                  <span className="text-indigo-400 text-xs font-bold">{count}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
