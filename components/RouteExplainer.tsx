'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

const INFO: Record<string, { what:string; how:string; when:string }> = {
  'Bank Transfer': { what:'Traditional inter-bank wire using SWIFT or local clearing networks.', how:'Money moves through correspondent banks. Each deducts fees and applies their FX rate.', when:'Best for large non-urgent transfers. Widespread global coverage.' },
  'Wallet Transfer': { what:'Digital wallet-to-wallet via fintech platforms like Payoneer or Wise.', how:'Funds move within the platform — no correspondent bank hops needed, so it is faster.', when:'Best for mid-size transfers needing same-day delivery. Good for SMEs and freelancers.' },
  'Card Processing': { what:'Payment via Visa/Mastercard with currency conversion at processing time.', how:'The card network handles FX. A high percentage fee applies to the converted amount.', when:'Best for very small amounts only. Expensive at scale due to high % fees.' },
  'Direct API Settlement': { what:'Direct integration with payment APIs like Interswitch, Flutterwave, or Paystack.', how:'Bypasses traditional banking entirely. Routes directly to local settlement systems.', when:'Best for tech-enabled businesses. Lowest fees, fastest settlement, highest reliability.' },
}

export default function RouteExplainer({ routeName }: { routeName: string }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const info = INFO[routeName]
  if (!info) return null
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold transition-colors">
        <Info className="w-3.5 h-3.5" />{open ? t.learn_close : t.learn_btn}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && (
        <div className="mt-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-2 text-xs animate-fadeup">
          <div><span className="font-bold text-slate-700 dark:text-slate-200">What: </span><span className="text-slate-500 dark:text-slate-400">{info.what}</span></div>
          <div><span className="font-bold text-slate-700 dark:text-slate-200">How: </span><span className="text-slate-500 dark:text-slate-400">{info.how}</span></div>
          <div><span className="font-bold text-indigo-600 dark:text-indigo-400">When to use: </span><span className="text-slate-500 dark:text-slate-400">{info.when}</span></div>
        </div>
      )}
    </div>
  )
}
