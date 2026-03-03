'use client'
import { Trophy, Zap, Clock, Shield, TrendingUp } from 'lucide-react'

type RouteResult = {
  id: string
  name: string
  fxAdjustedRate: number
  convertedAmount: number
  totalFee: number
  finalReceived: number
  settlementHours: number
  reliabilityScore: number
  score: number
  isBestCost: boolean
  isFastest: boolean
}

type Props = {
  routes: RouteResult[]
  sourceCurrency: string
  destinationCurrency: string
  amount: number
  savings: number
}

function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100)
  const color = pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-amber-400' : 'text-rose-400'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className={`text-sm font-mono font-bold ${color}`}>{score.toFixed(3)}</span>
    </div>
  )
}

export default function ResultsTable({ routes, sourceCurrency, destinationCurrency, amount, savings }: Props) {
  const best = routes[0]

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Best Route</div>
          <div className="text-white font-bold text-sm">{best.name}</div>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">You Receive</div>
          <div className="text-white font-bold text-sm font-mono">{best.finalReceived.toFixed(2)} {destinationCurrency}</div>
        </div>
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 text-center">
          <div className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-1">Max Savings</div>
          <div className="text-white font-bold text-sm font-mono">{savings.toFixed(2)} {destinationCurrency}</div>
        </div>
      </div>

      {/* Route cards */}
      <div className="space-y-3">
        {routes.map((route, idx) => (
          <div
            key={route.id}
            className={`relative rounded-2xl border p-5 transition-all ${
              idx === 0
                ? 'border-indigo-500/50 bg-gradient-to-r from-indigo-900/30 to-violet-900/20 shadow-lg shadow-indigo-900/20'
                : 'border-slate-700/60 bg-slate-900/40'
            }`}
          >
            {idx === 0 && (
              <div className="absolute -top-3 left-5">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> RECOMMENDED
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-1">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${idx === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-bold">{route.name}</span>
                    {route.isBestCost && <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" />Best Cost</span>}
                    {route.isFastest && <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Zap className="w-3 h-3" />Fastest</span>}
                  </div>
                  <ScoreBadge score={route.score} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">Receive</div>
                  <div className="text-white font-mono font-bold">{route.finalReceived.toFixed(2)}</div>
                  <div className="text-slate-500 text-xs">{destinationCurrency}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">Total Fee</div>
                  <div className="text-rose-400 font-mono font-bold">{route.totalFee.toFixed(2)}</div>
                  <div className="text-slate-500 text-xs">{sourceCurrency}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />Settlement</div>
                  <div className="text-amber-400 font-mono font-bold">{route.settlementHours}h</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5 flex items-center gap-1"><Shield className="w-3 h-3" />Reliability</div>
                  <div className="text-emerald-400 font-mono font-bold">{(route.reliabilityScore * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap gap-4 text-xs text-slate-500">
              <span>FX Rate: <span className="text-slate-400 font-mono">{route.fxAdjustedRate.toFixed(4)}</span></span>
              <span>Converted: <span className="text-slate-400 font-mono">{route.convertedAmount.toFixed(2)} {destinationCurrency}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
