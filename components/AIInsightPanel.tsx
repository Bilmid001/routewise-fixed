'use client'
import { useState, useEffect } from 'react'
import { Brain, Loader2, Sparkles, AlertCircle } from 'lucide-react'

type Props = {
  routes: any[]
  bestRoute: any
  sourceCurrency: string
  destinationCurrency: string
  amount: number
}

export default function AIInsightPanel({ routes, bestRoute, sourceCurrency, destinationCurrency, amount }: Props) {
  const [insight, setInsight] = useState('')
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/ai-insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ routes, bestRoute, sourceCurrency, destinationCurrency, amount }),
        })
        const data = await res.json()
        setInsight(data.insight)
        setIsDemo(data.isDemo)
      } catch {
        setError('Failed to load AI insight.')
      } finally {
        setLoading(false)
      }
    }
    fetchInsight()
  }, [routes, bestRoute, sourceCurrency, destinationCurrency, amount])

  return (
    <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/20 border border-violet-500/30 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-violet-600/30 rounded-xl flex items-center justify-center">
          <Brain className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className="text-white font-bold flex items-center gap-2">
            AI Insights Panel
            <Sparkles className="w-4 h-4 text-violet-400" />
          </h3>
          <p className="text-slate-500 text-xs">Powered by RouteWise Intelligence</p>
        </div>
        {isDemo && !loading && (
          <span className="ml-auto bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full border border-amber-500/30">
            Demo Mode
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
          <span className="text-sm">Analyzing payment routes with AI...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-rose-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed text-sm">{insight}</p>
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-violet-500/20">
            <div className="text-center">
              <div className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">Cost Edge</div>
              <div className="text-emerald-400 font-bold text-sm">{bestRoute.name.split(' ')[0]}</div>
            </div>
            <div className="text-center border-x border-violet-500/20">
              <div className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">Speed</div>
              <div className="text-amber-400 font-bold text-sm">{bestRoute.settlementHours}h</div>
            </div>
            <div className="text-center">
              <div className="text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">Risk</div>
              <div className="text-emerald-400 font-bold text-sm">{(bestRoute.reliabilityScore * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
