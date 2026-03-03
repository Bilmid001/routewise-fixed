'use client'
import { useState } from 'react'
import { ArrowRight, ArrowLeftRight } from 'lucide-react'
import { CURRENCIES } from '@/lib/mockData'

type Props = { onResult: (data: any) => void; isLoading: boolean; setIsLoading: (v: boolean) => void }

export default function SimulationForm({ onResult, isLoading, setIsLoading }: Props) {
  const [amount, setAmount] = useState('')
  const [source, setSource] = useState('NGN')
  const [dest, setDest] = useState('USD')
  const [error, setError] = useState('')

  const swap = () => { const t = source; setSource(dest); setDest(t) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!amount || parseFloat(amount) <= 0) { setError('Please enter a valid amount.'); return }
    if (source === dest) { setError('Source and destination must be different.'); return }
    setIsLoading(true)
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, sourceCurrency: source, destinationCurrency: dest }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      onResult(json)
    } catch (err: any) {
      setError(err.message || 'Simulation failed.')
    } finally {
      setIsLoading(false)
    }
  }

  const srcInfo = CURRENCIES.find(c => c.code === source)
  const dstInfo = CURRENCIES.find(c => c.code === dest)

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Amount to Send</label>
        <div className="relative">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="10,000" min="1"
            className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white text-xl font-mono placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded-lg">{srcInfo?.flag} {source}</span>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">From</label>
          <select value={source} onChange={e => setSource(e.target.value)} className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer text-sm">
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
          </select>
        </div>
        <button type="button" onClick={swap} className="w-10 h-10 mb-0.5 flex-shrink-0 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 hover:text-indigo-500 transition-all text-slate-400">
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-widest">To</label>
          <select value={dest} onChange={e => setDest(e.target.value)} className="w-full bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-3.5 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer text-sm">
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{srcInfo?.flag} {source}</span>
        <span className="text-indigo-400 text-sm">— payment route →</span>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{dstInfo?.flag} {dest}</span>
      </div>
      {error && <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3 text-red-600 dark:text-red-400 text-sm">{error}</div>}
      <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/25">
        {isLoading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analyzing...</> : <>Simulate Payment <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  )
}
