'use client'
import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
import { useLang } from '@/lib/LangContext'

export default function SavingsCalculator() {
  const { t } = useLang()
  const [monthly, setMonthly] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const m = parseFloat(monthly.replace(/,/g, ''))
    if (!m || m <= 0) return
    setResult(m * 12 * 0.042)
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 sm:p-10 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-7 h-7 text-white" />
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-2">{t.calc_title}</h2>
        <p className="text-indigo-200 mb-8 text-sm sm:text-base">{t.calc_sub}</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold text-lg">$</span>
            <input type="number" value={monthly} onChange={e => { setMonthly(e.target.value); setResult(null) }} placeholder="50000" min="0"
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 font-mono text-lg transition-all" />
          </div>
          <button onClick={calculate} className="bg-white hover:bg-indigo-50 text-indigo-700 font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 flex-shrink-0">
            <TrendingUp className="w-4 h-4" />{t.calc_btn}
          </button>
        </div>
        {result !== null && (
          <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-6 animate-fadeup">
            <div className="text-indigo-200 text-sm mb-2">{t.calc_result}</div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-1">
              ${result.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              <span className="text-2xl text-indigo-300">{t.calc_peryear}</span>
            </div>
            <p className="text-indigo-200 text-sm mt-2">Based on average 4.2% fee overpayment across unoptimized payment corridors.</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[{l:'Monthly savings',v:'$'+(result/12).toLocaleString('en-US',{maximumFractionDigits:0})},{l:'Avg savings rate',v:'4.2%'},{l:'Routes optimized',v:'4'}].map(s => (
                <div key={s.l} className="bg-white/10 rounded-xl p-3">
                  <div className="text-indigo-200 text-xs mb-1">{s.l}</div>
                  <div className="font-bold text-white text-sm">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
