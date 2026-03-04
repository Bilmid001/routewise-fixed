'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

type Msg = { role:'user'|'assistant'; content: string }
const DEMO: Record<string,string> = {
  route: 'Direct API Settlement typically offers the best rates on NGN corridors — 0.8% spread vs 2.5% for bank transfers.',
  fee: 'Fees vary by rail: Bank Transfer $15 flat + 0.5%, Wallet Transfer $5 + 1.0%, Card 0% flat + 2.5%, API $10 + 0.3%.',
  fast: 'Direct API Settlement settles in 1 hour. Wallet Transfer takes ~2 hours. Bank Transfer can take up to 48 hours.',
  save: 'On a $10,000 NGN→USD transfer, choosing Direct API over Bank Transfer saves approximately $45-60.',
  currency: 'RouteWise supports 15 currencies: NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.',
  default: 'Great question! RouteWise analyzes 4 payment rails across 15 currencies using AI scoring weighted 50% cost, 30% speed, 20% reliability. Try running a simulation to see live results!',
}
function getDemoReply(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('route')||m.includes('best')) return DEMO.route
  if (m.includes('fee')||m.includes('cost')||m.includes('cheap')) return DEMO.fee
  if (m.includes('fast')||m.includes('quick')||m.includes('time')||m.includes('settle')) return DEMO.fast
  if (m.includes('save')||m.includes('saving')) return DEMO.save
  if (m.includes('currency')||m.includes('support')) return DEMO.currency
  return DEMO.default
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{role:'assistant',content:"Hi! I'm your RouteWise AI assistant. Ask me anything about payment routes, FX rates, fees, or settlement times! 🌍"}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottom = useRef<HTMLDivElement>(null)
  useEffect(()=>{ bottom.current?.scrollIntoView({behavior:'smooth'}) },[msgs])

  const send = async () => {
    if (!input.trim()||loading) return
    const userMsg = input.trim(); setInput(''); setLoading(true)
    setMsgs(p=>[...p,{role:'user',content:userMsg}])
    await new Promise(r=>setTimeout(r,800))
    setMsgs(p=>[...p,{role:'assistant',content:getDemoReply(userMsg)}])
    setLoading(false)
  }

  const suggestions = ['Best route for NGN→USD?','How fast is API settlement?','What fees should I expect?']

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 sm:w-96 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeup" style={{height:'480px'}}>
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2"><Bot className="w-5 h-5 text-white"/><div><div className="text-white font-bold text-sm">RouteWise AI</div><div className="text-indigo-200 text-xs">Payment Intelligence</div></div></div>
            <button onClick={()=>setOpen(false)} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5"/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m,i)=>(
              <div key={i} className={"flex "+(m.role==='user'?'justify-end':'justify-start')}>
                <div className={"max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed "+(m.role==='user'?'bg-indigo-600 text-white':'bg-[var(--bg2)] text-[var(--text)] border border-[var(--border)]')}>{m.content}</div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-[var(--bg2)] border border-[var(--border)] px-3.5 py-2.5 rounded-2xl flex gap-1">{[0,1,2].map(i=><span key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay:i*0.15+'s'}}/>)}</div></div>}
            <div ref={bottom}/>
          </div>
          {msgs.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map(s=><button key={s} onClick={()=>{setInput(s)}} className="text-xs border border-[var(--border)] rounded-full px-3 py-1 text-[var(--text2)] hover:border-indigo-400 hover:text-indigo-500 transition-all">{s}</button>)}
            </div>
          )}
          <div className="p-3 border-t border-[var(--border)] flex gap-2 flex-shrink-0">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about routes, fees, FX..."
              className="flex-1 bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 text-sm transition-all"/>
            <button onClick={send} disabled={!input.trim()||loading} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl w-10 flex items-center justify-center transition-colors flex-shrink-0"><Send className="w-4 h-4"/></button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-full shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95">
        {open?<X className="w-6 h-6"/>:<MessageCircle className="w-6 h-6"/>}
      </button>
    </div>
  )
}
