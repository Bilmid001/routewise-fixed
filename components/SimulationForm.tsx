'use client'
import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { CURRENCIES, MOCK_ROUTES, getMarketRate } from '@/lib/mockData'
import { calculateRoutes } from '@/lib/calculations'

type Props = { onResult: (data: any) => void; isLoading: boolean; setIsLoading: (v: boolean) => void }

export default function SimulationForm({ onResult, isLoading, setIsLoading }: Props) {
  const [amount, setAmount] = useState('')
  const [src, setSrc] = useState('NGN')
  const [dst, setDst] = useState('USD')

  const swap = () => { setSrc(dst); setDst(src) }

  // Run calculation locally — zero network latency
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseFloat(amount)
    if (!num || num <= 0) return
    setIsLoading(true)
    try {
      const marketRate = getMarketRate(src, dst)
      const result = calculateRoutes(num, marketRate, MOCK_ROUTES)
      onResult({ amount: num, sourceCurrency: src, destinationCurrency: dst, data: result })
    } catch(e) { console.error(e) }
    finally { setIsLoading(false) }
  }

  const selClass = "w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-3 py-3 text-[var(--text)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none text-sm"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Amount</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="10,000" min="1" required
          className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono text-lg"/>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">From</label>
          <select value={src} onChange={e=>setSrc(e.target.value)} className={selClass}>
            {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
          </select>
        </div>
        <button type="button" onClick={swap} className="mb-0.5 w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[var(--border)] rounded-xl hover:border-indigo-400 hover:text-indigo-500 transition-all text-[var(--text3)]">
          <ArrowLeftRight className="w-4 h-4"/>
        </button>
        <div className="flex-1">
          <label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">To</label>
          <select value={dst} onChange={e=>setDst(e.target.value)} className={selClass}>
            {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" disabled={isLoading || !amount} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base">
        {isLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Analyzing...</> : '⚡ Simulate Payment'}
      </button>
    </form>
  )
}
