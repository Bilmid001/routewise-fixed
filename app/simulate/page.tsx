'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, History, Trash2 } from 'lucide-react'
import SimulationForm from '@/components/SimulationForm'
import ResultsTable from '@/components/ResultsTable'
import AIInsightPanel from '@/components/AIInsightPanel'
import FxTicker from '@/components/FxTicker'
import Navbar from '@/components/Navbar'
import RiskAnalyzer from '@/components/RiskAnalyzer'
import { useLang } from '@/lib/LangContext'
import ThemeToggle from '@/components/ThemeToggle'
import AIChatWidget from '@/components/AIChatWidget'

type SimHistory = { id:number; amount:number; src:string; dst:string; bestRoute:string; savings:number; result:any }

export default function SimulatePage() {
  const { t } = useLang()
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<SimHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const handleResult = (data: any) => {
    setResult(data)
    setHistory(prev => [{id:Date.now(),amount:data.amount,src:data.sourceCurrency,dst:data.destinationCurrency,bestRoute:data.data.bestRoute.name,savings:data.data.savings,result:data},...prev].slice(0,10))
  }

  const handleExportCSV = () => {
    if (!result) return
    const hdrs = ['Route','FX Rate','Converted','Total Fee','Final Received','Settlement (h)','Reliability','Score']
    const rows = result.data.routes.map((r: any) => [r.name,r.fxAdjustedRate.toFixed(4),r.convertedAmount.toFixed(2),r.totalFee.toFixed(2),r.finalReceived.toFixed(2),r.settlementHours,(r.reliabilityScore*100).toFixed(0)+'%',r.score.toFixed(3)])
    const csv = [hdrs,...rows].map(r=>r.join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='routewise-'+Date.now()+'.csv'; a.click()
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker />
      <Navbar showSimBtn={false} showDashBtn={true} />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Payment Simulator</div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl">Find your optimal route</h1>
          <p className="text-[var(--text2)] mt-2">Compare all 4 payment rails across 15 currencies.</p>
        </div>
        {showHistory && history.length > 0 && (
          <div className="mb-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm flex items-center gap-2"><History className="w-4 h-4 text-indigo-500" />Simulation History</h3>
              <button onClick={() => setHistory([])} className="text-xs text-rose-500 flex items-center gap-1"><Trash2 className="w-3 h-3" />Clear</button>
            </div>
            <div className="space-y-2">
              {history.map(h => (
                <button key={h.id} onClick={() => setResult(h.result)} className="w-full flex items-center justify-between bg-[var(--bg2)] border border-[var(--border)] hover:border-indigo-300 rounded-xl px-4 py-3 transition-all text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">{h.src} to {h.dst}</span>
                    <span className="font-mono text-sm text-[var(--text2)]">{h.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-indigo-600 dark:text-indigo-400 hidden sm:block">{h.bestRoute}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+{h.savings.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-2">
            <div className="sticky top-20 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-5">Transaction Details</h2>
              <SimulationForm onResult={handleResult} isLoading={isLoading} setIsLoading={setIsLoading} />
              {result && (
                <div className="mt-5 pt-5 border-t border-[var(--border)]">
                  <div className="text-xs text-[var(--text3)] uppercase tracking-widest mb-2">Mid-Market Rate</div>
                  <div className="font-mono font-bold text-lg">1 {result.sourceCurrency} = {result.data.marketRate >= 1 ? result.data.marketRate.toFixed(4) : result.data.marketRate.toFixed(8)} {result.destinationCurrency}</div>
                  <div className="text-xs text-[var(--text3)] mt-1">Simulated mid-market rate</div>
                </div>
              )}
            </div>
          </div>
          <div className="xl:col-span-3 space-y-6">
            {!result && !isLoading && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-16 text-center shadow-sm">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="font-bold text-xl mb-2">Ready to analyze</h3>
                <p className="text-[var(--text2)]">Enter your transaction details and click Simulate Payment to see the full route comparison.</p>
              </div>
            )}
            {result && (
              <>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg mb-5">Route Comparison</h2>
                  <ResultsTable routes={result.data.routes} sourceCurrency={result.sourceCurrency} destinationCurrency={result.destinationCurrency} amount={result.amount} savings={result.data.savings} />
                </div>
                <RiskAnalyzer bestRoute={result.data.bestRoute} sourceCurrency={result.sourceCurrency} destinationCurrency={result.destinationCurrency} />
                <AIInsightPanel routes={result.data.routes} bestRoute={result.data.bestRoute} sourceCurrency={result.sourceCurrency} destinationCurrency={result.destinationCurrency} amount={result.amount} />
              </>
            )}
          </div>
        </div>
      </div>
      <AIChatWidget />
    </main>
  )
}
