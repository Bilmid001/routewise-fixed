'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Bell, BellOff, Plus, Trash2, Clock, TrendingUp, BarChart3 } from 'lucide-react'
import AppNavbar from '@/components/AppNavbar'
import FxTicker from '@/components/FxTicker'
import { useAuth } from '@/lib/AuthContext'
import { getSupabaseBrowser } from '@/lib/supabase'
import { MOCK_SIMULATIONS, CURRENCIES } from '@/lib/mockData'

export default function HistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = getSupabaseBrowser()
  const [tab, setTab] = useState<'history'|'alerts'>('history')
  const [sims, setSims] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [alertForm, setAlertForm] = useState({ currency_pair:'', threshold:'', direction:'below' })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if (!user) { router.push('/auth/login'); return }
    loadData()
  },[user])

  const loadData = async () => {
    setLoading(true)
    const [simsRes, alertsRes] = await Promise.all([
      supabase.from('simulations').select('*').eq('user_id',user!.id).order('created_at',{ascending:false}).limit(50),
      supabase.from('email_alerts').select('*').eq('user_id',user!.id).order('created_at',{ascending:false}),
    ])
    setSims(simsRes.data?.length ? simsRes.data : MOCK_SIMULATIONS)
    setAlerts(alertsRes.data||[])
    setLoading(false)
  }

  const addAlert = async () => {
    if (!alertForm.currency_pair||!alertForm.threshold) return
    const { data } = await supabase.from('email_alerts').insert({ user_id:user!.id, currency_pair:alertForm.currency_pair, threshold:parseFloat(alertForm.threshold), direction:alertForm.direction, is_active:true }).select().single()
    if (data) setAlerts(p=>[data,...p])
    setAlertForm({currency_pair:'',threshold:'',direction:'below'})
  }

  const deleteAlert = async (id:string) => {
    await supabase.from('email_alerts').delete().eq('id',id)
    setAlerts(p=>p.filter(a=>a.id!==id))
  }

  const exportCSV = () => {
    const hdrs = ['Amount','Source','Destination','Best Route','Savings','Date']
    const rows = sims.map(s=>[s.amount,s.source_currency,s.destination_currency,s.best_route_name||s.best_route,s.savings_amount,new Date(s.created_at).toLocaleDateString()])
    const csv = [hdrs,...rows].map(r=>r.join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download = 'history.csv'; a.click()
  }

  const totalSaved = sims.reduce((s,sim)=>s+(sim.savings_amount||0),0)
  const currencies_used = [...new Set(sims.map(s=>s.source_currency+'/'+s.destination_currency))]

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker/>
      <AppNavbar showSimBtn={true}/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">My Account</div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl">Simulation History</h1>
          <p className="text-[var(--text2)] mt-2 text-sm">All your past simulations and rate alert settings</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[{icon:BarChart3,label:'Total Simulations',val:sims.length},{icon:TrendingUp,label:'Total Saved (USD)',val:'$'+totalSaved.toFixed(0)},{icon:Clock,label:'Corridors Used',val:currencies_used.length},{icon:Bell,label:'Active Alerts',val:alerts.filter(a=>a.is_active).length}].map(s=>(
            <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm text-center">
              <div className="font-display font-extrabold text-2xl text-indigo-600 dark:text-indigo-400">{s.val}</div>
              <div className="text-xs text-[var(--text3)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-1 mb-6 w-fit">
          {(['history','alerts'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={"px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all "+(tab===t?'bg-[var(--card)] shadow text-[var(--text)] border border-[var(--border)]':'text-[var(--text2)] hover:text-[var(--text)]')}>
              {t==='history'?'Simulations':'Rate Alerts'}
            </button>
          ))}
        </div>

        {tab==='history' && (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="font-bold text-base">All Simulations ({sims.length})</h2>
              <button onClick={exportCSV} className="flex items-center gap-1.5 text-sm border border-[var(--border)] text-[var(--text2)] px-3 py-2 rounded-lg hover:border-indigo-300 transition-all"><Download className="w-3.5 h-3.5"/>Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead><tr className="border-b border-[var(--border)]">
                  {['Amount','Corridor','Best Route','Savings','Date'].map(h=>(
                    <th key={h} className="text-left text-xs font-bold text-[var(--text3)] uppercase tracking-widest px-4 sm:px-6 py-3">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {sims.map((s,i)=>(
                    <tr key={s.id} className={"hover:bg-[var(--bg2)] transition-colors "+(i<sims.length-1?'border-b border-[var(--border)]':'')}>
                      <td className="px-4 sm:px-6 py-3.5 font-mono text-sm font-bold">{Number(s.amount).toLocaleString()} {s.source_currency}</td>
                      <td className="px-4 sm:px-6 py-3.5 text-sm font-medium">{s.source_currency} → {s.destination_currency}</td>
                      <td className="px-4 sm:px-6 py-3.5"><span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{s.best_route_name||s.best_route}</span></td>
                      <td className="px-4 sm:px-6 py-3.5 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">+${Number(s.savings_amount||0).toFixed(2)}</td>
                      <td className="px-4 sm:px-6 py-3.5 text-[var(--text3)] text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==='alerts' && (
          <div className="space-y-4">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 sm:p-6 shadow-sm">
              <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-indigo-500"/>Create Rate Alert</h2>
              <p className="text-sm text-[var(--text3)] mb-4">Get emailed when a currency pair crosses your threshold.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Currency Pair</label>
                <select value={alertForm.currency_pair} onChange={e=>setAlertForm(p=>({...p,currency_pair:e.target.value}))} className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-indigo-500 transition-all appearance-none text-sm">
                  <option value="">Select pair...</option>
                  {CURRENCIES.flatMap(a=>CURRENCIES.filter(b=>b.code!==a.code).map(b=><option key={a.code+b.code} value={a.code+'/'+b.code}>{a.flag}{a.code}/{b.flag}{b.code}</option>))}
                </select></div>
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Threshold Rate</label>
                <input type="number" value={alertForm.threshold} onChange={e=>setAlertForm(p=>({...p,threshold:e.target.value}))} placeholder="e.g. 1580" className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] placeholder:text-[var(--text3)] focus:outline-none focus:border-indigo-500 transition-all font-mono"/></div>
                <div><label className="block text-xs font-bold text-[var(--text3)] uppercase tracking-widest mb-2">Alert When</label>
                <select value={alertForm.direction} onChange={e=>setAlertForm(p=>({...p,direction:e.target.value}))} className="w-full bg-[var(--bg2)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text)] focus:outline-none focus:border-indigo-500 transition-all appearance-none text-sm">
                  <option value="below">Rate drops below</option>
                  <option value="above">Rate rises above</option>
                </select></div>
              </div>
              <button onClick={addAlert} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm"><Plus className="w-4 h-4"/>Add Alert</button>
            </div>

            {alerts.length===0 ? (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-10 text-center shadow-sm">
                <Bell className="w-10 h-10 text-[var(--text3)] mx-auto mb-3"/>
                <p className="text-[var(--text2)] font-semibold">No rate alerts yet</p>
                <p className="text-[var(--text3)] text-sm mt-1">Create your first alert above to get notified when rates move.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map(a=>(
                  <div key={a.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={"w-9 h-9 rounded-xl flex items-center justify-center "+(a.is_active?'bg-emerald-100 dark:bg-emerald-500/20':'bg-slate-100 dark:bg-slate-700')}>
                        {a.is_active?<Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>:<BellOff className="w-4 h-4 text-slate-400"/>}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{a.currency_pair}</div>
                        <div className="text-xs text-[var(--text3)]">Alert when rate {a.direction} <span className="font-mono font-bold">{a.threshold}</span></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={"text-xs font-bold px-2.5 py-1 rounded-full "+(a.is_active?'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400':'bg-slate-100 dark:bg-slate-700 text-slate-500')}>{a.is_active?'Active':'Inactive'}</span>
                      <button onClick={()=>deleteAlert(a.id)} className="text-rose-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"><Trash2 className="w-3.5 h-3.5"/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
