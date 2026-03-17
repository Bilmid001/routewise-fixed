'use client'
import { TICKER_PAIRS,getMarketRate } from '@/lib/mockData'
export default function FxTicker() {
  const items=[...TICKER_PAIRS,...TICKER_PAIRS].map(p=>({...p,rate:getMarketRate(p.base,p.target)}))
  return (
    <div className="bg-indigo-950 text-indigo-200 text-xs py-2 overflow-hidden border-b border-indigo-900">
      <div className="ticker-track flex gap-8 whitespace-nowrap w-max">
        {items.map((p,i)=>(
          <span key={i} className="flex items-center gap-2 font-mono">
            <span className="text-indigo-400 font-bold">{p.pair}</span>
            <span className="text-white font-bold">{p.rate>=1?p.rate.toLocaleString('en-US',{maximumFractionDigits:4}):p.rate.toFixed(6)}</span>
            <span className="text-emerald-400">▲</span>
          </span>
        ))}
      </div>
    </div>
  )
}
