'use client'
import { useState,useEffect } from 'react'
import { Brain,ChevronDown,ChevronUp,Sparkles } from 'lucide-react'
const INSIGHTS:Record<string,string> = {
  'Direct API Settlement':'Direct API Settlement wins by bypassing correspondent banks entirely — delivering the tightest FX spread and real-time settlement critical for volatile corridors.',
  'Wallet Transfer':'Wallet Transfer leads on this corridor due to its competitive spread and rapid settlement window. The flat fee advantage outweighs the slightly higher percentage fee.',
  'Bank Transfer':'Bank Transfer is recommended for this high-value transfer where the flat fee is well-amortized and the corridor benefits from established SWIFT liquidity.',
  'Card Processing':'Card Processing edges ahead with zero flat fee — the percentage structure becomes competitive at this smaller transaction size.',
}
type Props = { bestRoute:any;sourceCurrency:string;destinationCurrency:string;amount:number }
export default function AIInsightPanel({ bestRoute,sourceCurrency,destinationCurrency,amount }: Props) {
  const [insight,setInsight]=useState('')
  const [loading,setLoading]=useState(true)
  const [open,setOpen]=useState(true)
  useEffect(()=>{
    setLoading(true); setInsight('')
    const t=setTimeout(()=>{ setInsight(INSIGHTS[bestRoute.name]||'RouteWise recommends this route for the optimal balance of cost, speed, and reliability.'); setLoading(false) },1000)
    return ()=>clearTimeout(t)
  },[bestRoute.name])
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
      <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-[var(--bg2)] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center"><Brain className="w-5 h-5 text-white"/></div>
          <div className="text-left"><div className="font-bold text-sm">AI Insights</div><div className="text-xs text-[var(--text3)]">RouteWise Intelligence Engine</div></div>
        </div>
        {open?<ChevronUp className="w-4 h-4 text-[var(--text3)]"/>:<ChevronDown className="w-4 h-4 text-[var(--text3)]"/>}
      </button>
      {open&&(
        <div className="px-5 pb-5 border-t border-[var(--border)]">
          {loading?(
            <div className="flex items-center gap-3 py-4 text-[var(--text2)]">
              <div className="flex gap-1">{[0,1,2].map(i=><span key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay:i*0.15+'s'}}/>)}</div>
              <span className="text-sm">Analyzing with AI...</span>
            </div>
          ):(
            <div className="pt-4">
              <div className="flex items-start gap-3"><Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0"/><p className="text-sm text-[var(--text2)] leading-relaxed">{insight}</p></div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[{label:'Settlement',val:bestRoute.settlementHours+'h',ok:bestRoute.settlementHours<=4},{label:'Reliability',val:(bestRoute.reliabilityScore*100).toFixed(0)+'%',ok:bestRoute.reliabilityScore>=0.90},{label:'Score',val:(bestRoute.score*100).toFixed(0)+'%',ok:bestRoute.score>=0.80}].map(s=>(
                  <div key={s.label} className="bg-[var(--bg2)] rounded-xl p-3 text-center">
                    <div className={"font-bold font-mono text-sm "+(s.ok?'text-emerald-600 dark:text-emerald-400':'text-amber-600')}>{s.val}</div>
                    <div className="text-xs text-[var(--text3)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
