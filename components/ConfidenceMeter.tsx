'use client'
type Props = { score: number; confidence: 'high' | 'medium' | 'low' }

export default function ConfidenceMeter({ score, confidence }: Props) {
  const pct = Math.min(Math.round(score * 100), 100)
  const ring = confidence === 'high' ? '#10b981' : confidence === 'medium' ? '#f59e0b' : '#ef4444'
  const label = confidence === 'high' ? 'High' : confidence === 'medium' ? 'Medium' : 'Low'
  const r = 20, circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" className="dark:stroke-slate-700" />
        <circle cx="26" cy="26" r={r} fill="none" stroke={ring} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 26 26)" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <text x="26" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill={ring} fontFamily="JetBrains Mono">{pct}</text>
      </svg>
      <span className="text-xs font-semibold" style={{ color: ring }}>{label}</span>
    </div>
  )
}
