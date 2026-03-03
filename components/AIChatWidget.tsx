'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

type Msg = { role: 'user'|'assistant'; content: string }

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{role:'assistant',content:'Hi! I am RouteWise AI. Ask me anything about payment routes, FX rates, fees, or our 15 supported currencies!'}])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg: Msg = { role: 'user', content: input.trim() }
    setMsgs(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, history: msgs.map(m=>({role:m.role,content:m.content})) }),
      })
      const d = await res.json()
      setMsgs(prev => [...prev, { role: 'assistant', content: d.reply }])
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Sorry, could not respond right now.' }])
    } finally { setLoading(false) }
  }

  const suggestions = ['Which route is cheapest?','How fast is API Settlement?','What is FX spread?','Best for NGN to USD?']

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 transition-all duration-200 hover:scale-110">
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!open && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{height:'480px'}}>
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <div>
              <div className="font-bold text-white text-sm flex items-center gap-1">RouteWise AI <Sparkles className="w-3 h-3 text-violet-200" /></div>
              <div className="text-indigo-200 text-xs">Payment Intelligence Assistant</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-emerald-300 text-xs">Live</span></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={"flex gap-2 " + (m.role==='user' ? 'flex-row-reverse' : '')}>
                <div className={"w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 " + (m.role==='assistant' ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-violet-100 dark:bg-violet-900/50')}>
                  {m.role==='assistant' ? <Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> : <User className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />}
                </div>
                <div className={"max-w-xs rounded-2xl px-3 py-2 text-sm leading-relaxed " + (m.role==='assistant' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' : 'bg-indigo-600 text-white')}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /></div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {msgs.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {suggestions.map(s => (
                <button key={s} onClick={() => setInput(s)} className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors">{s}</button>
              ))}
            </div>
          )}
          <div className="p-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Ask about routes, fees, FX..." className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 transition-all" />
            <button onClick={send} disabled={!input.trim()||loading} className="w-9 h-9 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl flex items-center justify-center transition-all flex-shrink-0"><Send className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      )}
    </>
  )
}
