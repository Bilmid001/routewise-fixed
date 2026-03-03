'use client'
import { TICKER_PAIRS, getMarketRate } from '@/lib/mockData'

export default function FxTicker() {
  const items = [...TICKER_PAIRS, ...TICKER_PAIRS]
  return (
    <div className="w-full overflow-hidden bg-indigo-600/10 dark:bg-indigo-900/30 border-b border-indigo-200/40 dark:border-indigo-700/40 py-2">
      <div className="ticker-track flex gap-0 whitespace-nowrap">
        {items.map((t, i) => {
          const rate = getMarketRate(t.base, t.target)
          return (
            <span key={i} className="inline-flex items-center gap-2 px-6 text-xs font-mono text-indigo-700 dark:text-indigo-300">
              <span className="font-bold text-slate-700 dark:text-slate-200">{t.pair}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{rate >= 1 ? rate.toFixed(2) : rate.toFixed(6)}</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
