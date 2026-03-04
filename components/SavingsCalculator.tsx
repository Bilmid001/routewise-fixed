'use client'
import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
export default function SavingsCalculator() {
  const [monthly, setMonthly] = useState('')
  const [result, setResult] = useState<number|null>(null)
  const calc = () => { const m=parseFloat(monthly); if(m>0) setResult(m*12*0.042) }
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 sm:p-10 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Calculator className="w-7 h-7"/></div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-2">SME Annual Savings Calculator</h2>
        <p className="text-indigo-200 mb-8 text-sm sm:text-base">See how much RouteWise saves your business per year</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold text-lg">$</span>
            <input type="number" value={monthly} onChange={e=>{setMonthly(e.target.value);setResult(null)}} placeholder="50000" min="0"
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 font-mono text-lg transition-all"/>
          </div>
          <button onClick={calc} className="bg-white hover:bg-indigo-50 text-indigo-700 font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 flex-shrink-0">
            <TrendingUp className="w-4 h-4"/>Calculate
          </button>
        </div>
        {result!==null && (
          <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-6 animate-fadeup">
            <div className="text-indigo-200 text-sm mb-2">Estimated annual savings</div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl mb-1">${result.toLocaleString('en-US',{maximumFractionDigits:0})}<span className="text-2xl text-indigo-300">/year</span></div>
            <p className="text-indigo-200 text-sm mt-2">Based on average 4.2% fee overpayment across unoptimized corridors.</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[{l:'Monthly savings',v:'$'+(result/12).toLocaleString('en-US',{maximumFractionDigits:0})},{l:'Savings rate',v:'4.2%'},{l:'Rails optimized',v:'4'}].map(s=>(
                <div key={s.l} className="bg-white/10 rounded-xl p-3"><div className="text-indigo-200 text-xs mb-1">{s.l}</div><div className="font-bold text-sm">{s.v}</div></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
