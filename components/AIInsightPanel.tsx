"use client"
import { useState, useEffect } from 'react'
import { Brain, Loader2, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

type Props = { routes: any[]; bestRoute: any; sourceCurrency: string; destinationCurrency: string; amount: number }

export default function AIInsightPanel({ routes, bestRoute, sourceCurrency, destinationCurrency, amount }: Props) {
  const [insight, setInsight] = useState('')
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const go = async () => {
      setLoading(true); setError('')
      try {
        const res = await fetch('/api/ai-insight', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ routes, bestRoute, sourceCurrency, destinationCurrency, amount }),
        })
        const d = await res.json()
        setInsight(d.insight); setIsDemo(d.isDemo)
      } catch { setError('Failed to load AI insight.') }
      finally { setLoading(false) }
    }
    go()
  }, [])

  return (
    <div className='bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-200 dark:border-violet-500/30 rounded-2xl overflow-hidden'>
      <button onClick={() => setExpanded(!expanded)} className='w-full flex items-center justify-between p-5 hover:bg-violet-50/50 transition-colors'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 bg-violet-100 dark:bg-violet-600/30 rounded-xl flex items-center justify-center'><Brain className='w-5 h-5 text-violet-600 dark:text-violet-400' /></div>
          <div className='text-left'>
            <div className='font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm'>AI Insights Panel <Sparkles className='w-3.5 h-3.5 text-violet-500' /></div>
            <div className='text-xs text-slate-400'>RouteWise Intelligence Engine</div>
          </div>
          {isDemo && !loading && <span className='ml-3 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full'>Demo Mode</span>}
        </div>
        {expanded ? <ChevronUp className='w-4 h-4 text-slate-400' /> : <ChevronDown className='w-4 h-4 text-slate-400' />}
      </button>
      {expanded && (
        <div className='px-5 pb-5 space-y-4'>
          {loading ? (
            <div className='flex items-center gap-3 text-slate-500 py-2'><Loader2 className='w-4 h-4 animate-spin text-violet-500' /><span className='text-sm'>Analyzing with AI intelligence...</span></div>
          ) : error ? (
            <div className='flex items-center gap-2 text-rose-500 text-sm'><AlertCircle className='w-4 h-4' />{error}</div>
          ) : (
            <>
              <p className='text-slate-700 dark:text-slate-300 leading-relaxed text-sm bg-white/60 dark:bg-slate-800/40 rounded-xl p-4 border border-violet-100 dark:border-violet-800/30'>{insight}</p>
              <div className='grid grid-cols-3 gap-3'>
                <div className='text-center bg-white/80 dark:bg-slate-800/60 rounded-xl p-3 border border-violet-100 dark:border-violet-800/30'>
                  <div className='text-violet-500 text-xs font-bold uppercase tracking-wider mb-1'>Cost Edge</div>
                  <div className='text-emerald-600 dark:text-emerald-400 font-bold text-sm'>{bestRoute.name.split(" ")[0]}</div>
                </div>
                <div className='text-center bg-white/80 dark:bg-slate-800/60 rounded-xl p-3 border border-violet-100 dark:border-violet-800/30'>
                  <div className='text-violet-500 text-xs font-bold uppercase tracking-wider mb-1'>Speed</div>
                  <div className='text-amber-600 dark:text-amber-400 font-bold text-sm'>{bestRoute.settlementHours}h</div>
                </div>
                <div className='text-center bg-white/80 dark:bg-slate-800/60 rounded-xl p-3 border border-violet-100 dark:border-violet-800/30'>
                  <div className='text-violet-500 text-xs font-bold uppercase tracking-wider mb-1'>Reliability</div>
                  <div className='text-emerald-600 dark:text-emerald-400 font-bold text-sm'>{(bestRoute.reliabilityScore*100).toFixed(0)}%</div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
