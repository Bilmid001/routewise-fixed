'use client'
import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

const CURRENCIES = ['NGN', 'USD', 'GBP', 'EUR']

type Props = {
  onResult: (data: any) => void
  isLoading: boolean
  setIsLoading: (v: boolean) => void
}

export default function SimulationForm({ onResult, isLoading, setIsLoading }: Props) {
  const [amount, setAmount] = useState('')
  const [source, setSource] = useState('NGN')
  const [dest, setDest] = useState('USD')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }
    if (source === dest) {
      setError('Source and destination currencies must be different.')
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, sourceCurrency: source, destinationCurrency: dest }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      onResult(json)
    } catch (err: any) {
      setError(err.message || 'Simulation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-widest">
          Transaction Amount
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10,000"
            min="1"
            className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-5 py-4 text-white text-xl font-mono placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm">{source}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-widest">From</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-5 py-4 text-white font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
          >
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-widest">To</label>
          <select
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-5 py-4 text-white font-semibold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
          >
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/40"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Routes...
          </>
        ) : (
          <>
            Simulate Payment
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  )
}
