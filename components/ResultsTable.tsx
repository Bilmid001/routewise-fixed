'use client'
import { Trophy, Zap, Clock, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import ConfidenceMeter from './ConfidenceMeter'

const ROUTE_INFO: Record<string,{what:string;how:string;when:string}> = {
  'Bank Transfer':          {what:'Traditional SWIFT/local clearing inter-bank wire.',           how:'Moves through correspondent banks — each deducts fees.',           when:'Best for large non-urgent transfers. Widest global coverage.'},
  'Wallet Transfer':        {what:'Digital wallet transfer via Payoneer, Wise, mobile money.',   how:'Stays within the platform — no correspondent hops.',               when:'Best for mid-size same-day transfers. Great for SMEs.'},
  'Card Processing':        {what:'Visa/Mastercard with conversion at processing time.',          how:'Card network handles FX. High % fee applies.',                     when:'Best for very small amounts only.'},
  'Direct API Settlement':  {what:'Direct API integration — Interswitch, Flutterwave, Paystack.',how:'Bypasses banking rails entirely. Routes to local settlement.',     when:'Best for tech-enabled businesses. Lowest fees, fastest.'},
}

type RouteResult = { id:string;name:string;fxAdjustedRate:number;convertedAmount:number;totalFee:number;finalReceived:number;settlementHours:number;reliabilityScore:number;score:number;isBestCost:boolean;isFastest:boolean;confidence:string }
type Props = { routes:RouteResult[];sourceCurrency:string;destinationCurrency:string;amount:number;savings:number }

function RouteExplainer({ name }: { name: string }) {
  const [open, setOpen] = useState(false)
  const info = ROUTE_INFO[name]
  if (!info) return null
  return (
    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/40">
      <button onClick={()=>setOpen(!open)} className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-400 font-semibold">
        <Info className="w-3 h-3"/>{open?'Hide info':'Learn more'}{open?<ChevronUp className="w-3 h-3"/>:<ChevronDown className="w-3 h-3"/>}
      </button>
      {open && <div className="mt-2 text-xs space-y-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 animate-fadeup">
        <div><span className="font-bold text-slate-600 dark:text-slate-300">What: </span><span className="text-slate-500 dark:text-slate-400">{info.what}</span></div>
        <div><span className="font-bold text-slate-600 dark:text-slate-300">How: </span><span className="text-slate-500 dark:text-slate-400">{info.how}</span></div>
        <div><span className="font-bold text-indigo-500">When to use: </span><span className="text-slate-500 dark:text-slate-400">{info.when}</span></div>
      </div>}
    </div>
  )
}

export default function ResultsTable({ routes, sourceCurrency, destinationCurrency, amount, savings }: Props) {
  const best = routes[0]
  return (
    <div className="space-y-4">
      {/* Savings card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 sm:p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Best Route</div>
            <div className="font-display font-extrabold text-xl sm:text-2xl">{best.name}</div>
          </div>
          <div className="text-right">
            <div className="text-emerald-100 text-xs mb-1">Recipient gets</div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl font-mono">{best.finalReceived.toLocaleString('en-US',{maximumFractionDigits:2})} {destinationCurrency}</div>
            <div className="text-emerald-100 text-sm mt-1">Saves <span className="font-bold text-white">{savings.toFixed(2)} {destinationCurrency}</span> vs worst route</div>
          </div>
        </div>
      </div>

      {/* Route cards */}
      <div className="space-y-3">
        {routes.map((r, idx) => (
          <div key={r.id} className={"border rounded-2xl p-4 sm:p-5 transition-all " + (idx===0 ? "border-indigo-400 dark:border-indigo-600 bg-indigo-50/50 dark:bg-indigo-500/5 shadow-md" : "border-[var(--border)] bg-[var(--card)]")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {idx===0 && <span className="flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full"><Trophy className="w-3 h-3"/>BEST</span>}
                  {r.isBestCost && idx!==0 && <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">💰 Best Cost</span>}
                  {r.isFastest && <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full"><Zap className="w-3 h-3"/>Fastest</span>}
                  <span className="font-bold text-sm sm:text-base truncate">{r.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[var(--text3)]">
                  <div><div className="font-bold text-[var(--text2)] text-sm font-mono">{r.finalReceived.toLocaleString('en-US',{maximumFractionDigits:2})}</div><div>{destinationCurrency} received</div></div>
                  <div><div className="font-bold text-[var(--text2)] text-sm font-mono">{r.totalFee.toFixed(2)}</div><div>Total fee</div></div>
                  <div><div className="font-bold text-[var(--text2)] text-sm flex items-center gap-1"><Clock className="w-3 h-3"/>{r.settlementHours}h</div><div>Settlement</div></div>
                  <div><div className="font-bold text-[var(--text2)] text-sm">{(r.reliabilityScore*100).toFixed(0)}%</div><div>Reliability</div></div>
                </div>
                <RouteExplainer name={r.name}/>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ConfidenceMeter score={r.score} size={52}/>
                <span className="text-xs text-[var(--text3)]">Score</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
