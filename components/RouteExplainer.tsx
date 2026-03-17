'use client'
import { useState } from 'react'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'

const INFO: Record<string, { what: string; how: string; when: string }> = {
  'Bank Transfer':          { what: 'Traditional SWIFT/local clearing inter-bank wire.',           how: 'Moves through correspondent banks — each deducts fees.',         when: 'Best for large non-urgent transfers. Widest global coverage.' },
  'Wallet Transfer':        { what: 'Digital wallet — Payoneer, Wise, or mobile money.',           how: 'Stays within the platform, no correspondent hops.',              when: 'Best for mid-size same-day transfers. Great for SMEs.' },
  'Card Processing':        { what: 'Visa/Mastercard with FX conversion at processing time.',      how: 'Card network handles FX. High percentage fee applies.',          when: 'Best for very small amounts only.' },
  'Direct API Settlement':  { what: 'Direct API — Interswitch, Flutterwave, or Paystack.',         how: 'Bypasses banking rails entirely, routes to local settlement.',   when: 'Best for tech-enabled businesses. Lowest fees, fastest.' },
}

export default function RouteExplainer({ name }: { name: string }) {
  const [open, setOpen] = useState(false)
  const info = INFO[name]
  if (!info) return null

  return (
    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/40">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-400 font-semibold"
      >
        <Info className="w-3 h-3" />
        {open ? 'Hide info' : 'Learn more'}
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {open && (
        <div className="mt-2 text-xs space-y-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 animate-fadeup">
          <div><span className="font-bold text-slate-600 dark:text-slate-300">What: </span><span className="text-slate-500 dark:text-slate-400">{info.what}</span></div>
          <div><span className="font-bold text-slate-600 dark:text-slate-300">How: </span><span className="text-slate-500 dark:text-slate-400">{info.how}</span></div>
          <div><span className="font-bold text-indigo-500">When to use: </span><span className="text-slate-500 dark:text-slate-400">{info.when}</span></div>
        </div>
      )}
    </div>
  )
}
