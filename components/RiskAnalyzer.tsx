'use client'
import { useLang } from '@/lib/LangContext'
import { ShieldCheck, ShieldAlert, ShieldX, TrendingUp, Clock, Activity } from 'lucide-react'

type Route = { name:string; fxAdjustedRate:number; settlementHours:number; reliabilityScore:number; score:number }
type Props = { bestRoute:Route; sourceCurrency:string; destinationCurrency:string }

function getRisk(r: Route, src: string, dst: string) {
  const em = ['NGN','GHS','KES','ZAR','XOF','BRL']
  const vol = em.includes(src) || em.includes(dst)
  if (r.score >= 0.85 && !vol) return 'low'
  if (r.score >= 0.70 || !vol) return 'medium'
  return 'high'
}

export default function RiskAnalyzer({ bestRoute, sourceCurrency, destinationCurrency }: Props) {
  const { t } = useLang()
  const risk = getRisk(bestRoute, sourceCurrency, destinationCurrency)
  const emCurrencies = ['NGN','GHS','KES','ZAR','XOF','BRL']
  const isVolatile = emCurrencies.includes(sourceCurrency) || emCurrencies.includes(destinationCurrency)
  const cfgs = {
    low:    { Icon:ShieldCheck, col:'text-emerald-600 dark:text-emerald-400', bg:'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30', dot:'bg-emerald-500', label:t.risk_low },
    medium: { Icon:ShieldAlert,  col:'text-amber-600 dark:text-amber-400',   bg:'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',          dot:'bg-amber-500',   label:t.risk_medium },
    high:   { Icon:ShieldX,      col:'text-rose-600 dark:text-rose-400',     bg:'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30',              dot:'bg-rose-500',    label:t.risk_high },
  }
  const cfg = cfgs[risk]
  const factors = [
    { Icon:TrendingUp, text: isVolatile ? t.risk_volatile : t.risk_stable,                                                                                ok: !isVolatile },
    { Icon:Clock,      text: bestRoute.settlementHours <= 2 ? 'Fast settlement (low counterparty risk)' : bestRoute.settlementHours >= 24 ? 'Slow settlement — higher exposure' : 'Moderate settlement window', ok: bestRoute.settlementHours <= 4 },
    { Icon:Activity,   text: bestRoute.reliabilityScore >= 0.95 ? 'High reliability score' : bestRoute.reliabilityScore >= 0.90 ? t.risk_moderate : 'Lower reliability — monitor closely', ok: bestRoute.reliabilityScore >= 0.90 },
  ]
  return (
    <div className={"border rounded-2xl p-5 " + cfg.bg}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-slate-800/50 flex items-center justify-center"><cfg.Icon className={"w-5 h-5 " + cfg.col} /></div>
          <div><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.risk_title}</div><div className={"font-bold " + cfg.col}>{cfg.label}</div></div>
        </div>
        <div className="flex items-center gap-1.5"><span className={"w-2 h-2 rounded-full animate-pulse " + cfg.dot} /><span className={"text-xs font-bold " + cfg.col}>{sourceCurrency}/{destinationCurrency}</span></div>
      </div>
      <div className="space-y-2">
        {factors.map((f, i) => (
          <div key={i} className="flex items-center gap-3 bg-white/60 dark:bg-slate-900/30 rounded-xl px-3 py-2.5">
            <f.Icon className={"w-4 h-4 flex-shrink-0 " + (f.ok ? 'text-emerald-500' : 'text-amber-500')} />
            <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{f.text}</span>
            <span>{f.ok ? '✅' : '⚠️'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
