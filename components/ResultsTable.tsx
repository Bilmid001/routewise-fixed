'use client'
import { Trophy, Zap, TrendingUp, Clock, Shield } from 'lucide-react'
import ConfidenceMeter from './ConfidenceMeter'

type RouteResult = { id:string;name:string;fxAdjustedRate:number;convertedAmount:number;totalFee:number;finalReceived:number;settlementHours:number;reliabilityScore:number;score:number;isBestCost:boolean;isFastest:boolean;confidence:'high'|'medium'|'low' }
type Props = { routes: RouteResult[]; sourceCurrency: string; destinationCurrency: string; amount: number; savings: number }

export default function ResultsTable({ routes, sourceCurrency, destinationCurrency, amount, savings }: Props) {
  const best = routes[0]
  const savingsPct = best.convertedAmount > 0 ? ((savings / best.convertedAmount) * 100).toFixed(1) : '0'
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">By choosing {best.name}</div>
            <div className="text-xl font-display font-extrabold text-slate-900 dark:text-white">You save <span className="text-emerald-600 dark:text-emerald-400">{savings.toFixed(2)} {destinationCurrency}</span></div>
            <div className="text-sm text-slate-500 mt-1">That is {savingsPct}% more in your recipient pocket vs worst route.</div>
          </div>
          <div className="text-center bg-white dark:bg-slate-800 rounded-xl px-5 py-3 border border-emerald-100 dark:border-emerald-800/40">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Recipient gets</div>
            <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{best.finalReceived.toFixed(2)}</div>
            <div className="text-xs text-slate-500">{destinationCurrency}</div>
          </div>
        </div>
      </div>
      {routes.map((r, idx) => (
        <div key={r.id} className={`relative rounded-2xl border p-5 transition-all ${idx === 0 ? 'border-indigo-300 dark:border-indigo-500/50 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/20 shadow-md' : 'border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/40'}`}>
          {idx === 0 && (
            <div className="absolute -top-3 left-5">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"><Trophy className="w-3 h-3" /> RECOMMENDED</span>
            </div>
          )}
          <div className="flex items-start justify-between gap-4 mt-2">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>{idx+1}</div>
                <span className="font-bold text-slate-900 dark:text-white">{r.name}</span>
                {r.isBestCost && <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3"/>Best Cost</span>}
                {r.isFastest && <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Zap className="w-3 h-3"/>Fastest</span>}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div><div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Receives</div><div className="font-mono font-bold text-slate-900 dark:text-white text-sm">{r.finalReceived.toFixed(2)} <span className="text-xs text-slate-400">{destinationCurrency}</span></div></div>
                <div><div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Total Fee</div><div className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">{r.totalFee.toFixed(2)} <span className="text-xs text-slate-400">{sourceCurrency}</span></div></div>
                <div><div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1"><Clock className="w-3 h-3"/>Settle</div><div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">{r.settlementHours}h</div></div>
                <div><div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1"><Shield className="w-3 h-3"/>Reliability</div><div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">{(r.reliabilityScore*100).toFixed(0)}%</div></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex flex-wrap gap-4 text-xs text-slate-400">
                <span>FX Rate: <span className="font-mono text-slate-600 dark:text-slate-300">{r.fxAdjustedRate >= 1 ? r.fxAdjustedRate.toFixed(4) : r.fxAdjustedRate.toFixed(6)}</span></span>
                <span>Converted: <span className="font-mono text-slate-600 dark:text-slate-300">{r.convertedAmount.toFixed(2)} {destinationCurrency}</span></span>
              </div>
            </div>
            <ConfidenceMeter score={r.score} confidence={r.confidence} />
          </div>
        </div>
      ))}
    </div>
  )
}
