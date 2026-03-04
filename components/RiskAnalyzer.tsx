'use client'
import { ShieldCheck, ShieldAlert, ShieldX, TrendingUp, Clock, Activity } from 'lucide-react'
type Route = { name:string;settlementHours:number;reliabilityScore:number;score:number }
type Props = { bestRoute:Route;sourceCurrency:string;destinationCurrency:string }
export default function RiskAnalyzer({ bestRoute, sourceCurrency, destinationCurrency }: Props) {
  const em = ['NGN','GHS','KES','ZAR','XOF','BRL']
  const vol = em.includes(sourceCurrency)||em.includes(destinationCurrency)
  const risk = bestRoute.score>=0.85&&!vol?'low':bestRoute.score>=0.70||!vol?'medium':'high'
  const cfgs = {
    low:    {Icon:ShieldCheck,col:'text-emerald-600 dark:text-emerald-400',bg:'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30',dot:'bg-emerald-500',label:'Low Risk'},
    medium: {Icon:ShieldAlert, col:'text-amber-600 dark:text-amber-400',  bg:'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',      dot:'bg-amber-500',  label:'Medium Risk'},
    high:   {Icon:ShieldX,     col:'text-rose-600 dark:text-rose-400',    bg:'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30',            dot:'bg-rose-500',   label:'High Risk'},
  }
  const c = cfgs[risk]
  const factors = [
    {Icon:TrendingUp, text: vol?'High FX volatility on this corridor':'Stable currency corridor',                                                                ok:!vol},
    {Icon:Clock,      text: bestRoute.settlementHours<=2?'Fast settlement (low counterparty risk)':bestRoute.settlementHours>=24?'Slow settlement — higher exposure':'Moderate settlement window', ok:bestRoute.settlementHours<=4},
    {Icon:Activity,   text: bestRoute.reliabilityScore>=0.95?'High reliability score':bestRoute.reliabilityScore>=0.90?'Moderate volatility':'Lower reliability — monitor closely', ok:bestRoute.reliabilityScore>=0.90},
  ]
  return (
    <div className={"border rounded-2xl p-5 " + c.bg}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-slate-800/50 flex items-center justify-center"><c.Icon className={"w-5 h-5 "+c.col}/></div>
          <div><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Transaction Risk</div><div className={"font-bold "+c.col}>{c.label}</div></div>
        </div>
        <div className="flex items-center gap-1.5"><span className={"w-2 h-2 rounded-full animate-pulse "+c.dot}/><span className={"text-xs font-bold "+c.col}>{sourceCurrency}/{destinationCurrency}</span></div>
      </div>
      <div className="space-y-2">
        {factors.map((f,i)=>(
          <div key={i} className="flex items-center gap-3 bg-white/60 dark:bg-slate-900/30 rounded-xl px-3 py-2.5">
            <f.Icon className={"w-4 h-4 flex-shrink-0 "+(f.ok?'text-emerald-500':'text-amber-500')}/>
            <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{f.text}</span>
            <span>{f.ok?'✅':'⚠️'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
