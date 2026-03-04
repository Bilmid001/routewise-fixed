'use client'
type Props = { score: number; size?: number }
export default function ConfidenceMeter({ score, size = 52 }: Props) {
  const r = 20; const circ = 2 * Math.PI * r
  const fill = circ * (1 - score); const pct = Math.round(score * 100)
  const color = score >= 0.85 ? '#10b981' : score >= 0.65 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={size} height={size} viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-slate-200 dark:text-slate-700"/>
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={fill} transform="rotate(-90 24 24)"
          style={{transition:'stroke-dashoffset 0.8s ease'}}/>
        <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{pct}%</text>
      </svg>
    </div>
  )
}
