'use client'
import { useState } from 'react'
import { Download, History, Trash2, LogIn } from 'lucide-react'
import Link from 'next/link'
import SimulationForm from '@/components/SimulationForm'
import ResultsTable from '@/components/ResultsTable'
import AIInsightPanel from '@/components/AIInsightPanel'
import RiskAnalyzer from '@/components/RiskAnalyzer'
import FxTicker from '@/components/FxTicker'
import AppNavbar from '@/components/AppNavbar'
import AIChatWidget from '@/components/AIChatWidget'
import { useAuth } from '@/lib/AuthContext'
import { getSupabaseBrowser } from '@/lib/supabase'

type H = { id:number;amount:number;src:string;dst:string;bestRoute:string;savings:number;result:any }

export default function SimulatePage() {
  const { user } = useAuth()
  const supabase = getSupabaseBrowser()
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<H[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const handleResult = async (data: any) => {
    setResult(data)
    setHistory(prev => [{id:Date.now(),amount:data.amount,src:data.sourceCurrency,dst:data.destinationCurrency,bestRoute:data.data.bestRoute.name,savings:data.data.savings,result:data},...prev].slice(0,10))
    // Save to DB if logged in
    if (user) {
      await supabase.from('simulations').insert({
        user_id: user.id, amount: data.amount,
        source_currency: data.sourceCurrency, destination_currency: data.destinationCurrency,
        best_route_name: data.data.bestRoute.name, best_route_score: data.data.bestRoute.score,
        savings_amount: data.data.savings, market_rate: data.data.marketRate,
        routes_data: data.data.routes,
      })
    }
  }

  const handleExportCSV = () => {
    if (!result) return
    const hdrs = ['Route','FX Rate','Converted','Total Fee','Final Received','Settlement (h)','Reliability','Score']
    const rows = result.data.routes.map((r:any)=>[r.name,r.fxAdjustedRate.toFixed(4),r.convertedAmount.toFixed(2),r.totalFee.toFixed(2),r.finalReceived.toFixed(2),r.settlementHours,(r.reliabilityScore*100).toFixed(0)+'%',r.score.toFixed(3)])
    const csv = [hdrs,...rows].map(r=>r.join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download = 'routewise-'+Date.now()+'.csv'; a.click()
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker/>
      <AppNavbar showSimBtn={false}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Payment Simulator</div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl">Find your optimal route</h1>
            <p className="text-[var(--text2)] mt-2 text-sm sm:text-base">Compare all 4 payment rails across 15 currencies.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {!user && (
              <Link href="/auth/login" className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                <LogIn className="w-3.5 h-3.5"/>Sign in to save history
              </Link>
            )}
            <button onClick={()=>setShowHistory(!showHistory)} className="flex items-center gap-1.5 text-[var(--text2)] text-sm border border-[var(--border)] px-3 py-2 rounded-lg hover:border-indigo-300 transition-all">
              <History className="w-3.5 h-3.5"/>History
              {history.length>0 && <span className="bg-indigo-600 text-white text-xs px-1.5 rounded-full">{history.length}</span>}
            </button>
            {result && <button onClick={handleExportCSV} className="flex items-center gap-1.5 border border-[var(--border)] text-[var(--text2)] text-sm px-3 py-2 rounded-lg hover:border-indigo-300 transition-all"><Download className="w-3.5 h-3.5"/>CSV</button>}
          </div>
        </div>

        {showHistory && history.length>0 && (
          <div className="mb-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm flex items-center gap-2"><History className="w-4 h-4 text-indigo-500"/>Session History</h3>
              <button onClick={()=>setHistory([])} className="text-xs text-rose-500 flex items-center gap-1"><Trash2 className="w-3 h-3"/>Clear</button>
            </div>
            <div className="space-y-2">
              {history.map(h=>(
                <button key={h.id} onClick={()=>setResult(h.result)} className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between bg-[var(--bg2)] border border-[var(--border)] hover:border-indigo-300 rounded-xl px-4 py-3 transition-all text-left gap-2">
                  <div className="flex items-center gap-3"><span className="font-semibold text-sm">{h.src}→{h.dst}</span><span className="font-mono text-sm text-[var(--text2)]">{h.amount.toLocaleString()}</span></div>
                  <div className="flex items-center gap-3 text-sm"><span className="text-indigo-600 dark:text-indigo-400 hidden sm:block">{h.bestRoute}</span><span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+{h.savings.toFixed(2)}</span></div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8">
          <div className="xl:col-span-2">
            <div className="sticky top-20 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm">
              <h2 className="font-bold text-base sm:text-lg mb-5">Transaction Details</h2>
              <SimulationForm onResult={handleResult} isLoading={isLoading} setIsLoading={setIsLoading}/>
              {result && (
                <div className="mt-5 pt-5 border-t border-[var(--border)]">
                  <div className="text-xs text-[var(--text3)] uppercase tracking-widest mb-2">Mid-Market Rate</div>
                  <div className="font-mono font-bold text-base sm:text-lg">1 {result.sourceCurrency} = {result.data.marketRate>=1?result.data.marketRate.toFixed(4):result.data.marketRate.toFixed(8)} {result.destinationCurrency}</div>
                </div>
              )}
            </div>
          </div>
          <div className="xl:col-span-3 space-y-5 sm:space-y-6">
            {!result && !isLoading && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 sm:p-16 text-center shadow-sm">
                <div className="text-5xl sm:text-6xl mb-4">🌍</div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">Ready to analyze</h3>
                <p className="text-[var(--text2)] text-sm sm:text-base">Enter your transaction details and click Simulate Payment to see the full route comparison.</p>
              </div>
            )}
            {result && (
              <>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h2 className="font-bold text-base sm:text-lg mb-5">Route Comparison</h2>
                  <ResultsTable routes={result.data.routes} sourceCurrency={result.sourceCurrency} destinationCurrency={result.destinationCurrency} amount={result.amount} savings={result.data.savings}/>
                </div>
                <RiskAnalyzer bestRoute={result.data.bestRoute} sourceCurrency={result.sourceCurrency} destinationCurrency={result.destinationCurrency}/>
                <AIInsightPanel routes={result.data.routes} bestRoute={result.data.bestRoute} sourceCurrency={result.sourceCurrency} destinationCurrency={result.destinationCurrency} amount={result.amount}/>
              </>
            )}
          </div>
        </div>
      </div>
      <AIChatWidget/>
    </main>
  )
}
