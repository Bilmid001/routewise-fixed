'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import SimulationForm from '@/components/SimulationForm'
import ResultsTable from '@/components/ResultsTable'
import AIInsightPanel from '@/components/AIInsightPanel'

export default function SimulatePage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleExportCSV = () => {
    if (!result) return
    const headers = ['Route', 'FX Rate', 'Converted Amount', 'Total Fee', 'Final Received', 'Settlement (h)', 'Reliability', 'Score']
    const rows = result.data.routes.map((r: any) => [
      r.name,
      r.fxAdjustedRate.toFixed(4),
      r.convertedAmount.toFixed(2),
      r.totalFee.toFixed(2),
      r.finalReceived.toFixed(2),
      r.settlementHours,
      (r.reliabilityScore * 100).toFixed(0) + '%',
      r.score.toFixed(3),
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `routewise-simulation-${Date.now()}.csv`
    a.click()
  }

  return (
    <main className="min-h-screen bg-[#050816] grid-bg text-white font-body">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/60 bg-[#050816]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded" />
            <span className="font-display font-bold text-white">RouteWise</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Dashboard</Link>
            {result && (
              <button onClick={handleExportCSV} className="flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Payment Simulator</div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white">Find your optimal route</h1>
            <p className="text-slate-400 mt-3">Compare all payment rails and maximize what your recipient receives.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Form */}
            <div className="xl:col-span-2">
              <div className="sticky top-24 bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-white font-bold text-lg mb-5">Transaction Details</h2>
                <SimulationForm onResult={setResult} isLoading={isLoading} setIsLoading={setIsLoading} />

                {/* Market rate info */}
                {result && (
                  <div className="mt-5 pt-5 border-t border-slate-700/50">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Market Rate</div>
                    <div className="font-mono text-white font-bold text-lg">
                      1 {result.sourceCurrency} = {result.data.marketRate.toFixed(4)} {result.destinationCurrency}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Mid-market rate (simulated)</div>
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="xl:col-span-3 space-y-6">
              {!result && !isLoading && (
                <div className="bg-slate-900/40 border border-slate-700/40 rounded-2xl p-16 text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-white font-bold text-xl mb-2">Ready to analyze</h3>
                  <p className="text-slate-500">Enter your transaction details and click Simulate Payment to see route comparison.</p>
                </div>
              )}

              {result && (
                <>
                  <div className="bg-slate-900/50 border border-slate-700/60 rounded-2xl p-6">
                    <h2 className="text-white font-bold text-lg mb-5">Route Comparison</h2>
                    <ResultsTable
                      routes={result.data.routes}
                      sourceCurrency={result.sourceCurrency}
                      destinationCurrency={result.destinationCurrency}
                      amount={result.amount}
                      savings={result.data.savings}
                    />
                  </div>
                  <AIInsightPanel
                    routes={result.data.routes}
                    bestRoute={result.data.bestRoute}
                    sourceCurrency={result.sourceCurrency}
                    destinationCurrency={result.destinationCurrency}
                    amount={result.amount}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
