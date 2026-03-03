'use client'
import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const routeData = [
  { name:'Bank',   score:0.721 },
  { name:'Wallet', score:0.812 },
  { name:'Card',   score:0.698 },
  { name:'API',    score:0.934 },
]
const trendData = [
  { date:'Jan 15', savings:45  },
  { date:'Jan 16', savings:32  },
  { date:'Jan 17', savings:120 },
  { date:'Jan 18', savings:29  },
  { date:'Jan 19', savings:89  },
  { date:'Jan 20', savings:16  },
  { date:'Jan 21', savings:67  },
]
const Tip = ({ active, payload, label }: any) => active && payload?.length ? (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-xl">
    <p className="text-slate-400 text-xs mb-1">{label}</p>
    {payload.map((p: any) => <p key={p.name} className="text-sm font-bold" style={{color:p.color}}>{p.name}: {typeof p.value==='number' ? p.value.toFixed(3) : p.value}</p>)}
  </div>
) : null

function AnimatedNumber({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0; const step = target / 75
    const t = setInterval(() => { cur += step; if (cur >= target) { setVal(target); clearInterval(t) } else { setVal(Math.floor(cur)) } }, 16)
    return () => clearInterval(t)
  }, [target])
  return <>{val}</>
}

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Simulations', val:247, suffix:'',  col:'text-indigo-600 dark:text-indigo-400', bg:'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/40' },
          { label:'Avg Savings (USD)', val:57,  suffix:'$', col:'text-emerald-600 dark:text-emerald-400', bg:'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40' },
          { label:'Top Route Score',   val:93,  suffix:'%', col:'text-violet-600 dark:text-violet-400',  bg:'bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800/40' },
          { label:'Avg Settlement',    val:1,   suffix:'h', col:'text-amber-600 dark:text-amber-400',   bg:'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/40' },
        ].map(s => (
          <div key={s.label} className={`border rounded-2xl p-5 ${s.bg}`}>
            <div className="text-slate-500 text-xs uppercase tracking-wider mb-2">{s.label}</div>
            <div className={`font-display font-extrabold text-3xl ${s.col}`}>{s.suffix}<AnimatedNumber target={s.val} /></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6">
          <h3 className="text-slate-900 dark:text-white font-bold mb-1">Route Performance Score</h3>
          <p className="text-slate-400 text-xs mb-4">Composite score: cost 50%, speed 30%, reliability 20%</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={routeData} margin={{top:5,right:5,left:-25,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{fill:'#94a3b8',fontSize:11}} tickLine={false} axisLine={false} />
              <YAxis tick={{fill:'#94a3b8',fontSize:11}} tickLine={false} axisLine={false} domain={[0.5,1]} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="score" name="Score" fill="#6366f1" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-6">
          <h3 className="text-slate-900 dark:text-white font-bold mb-1">Savings Trend</h3>
          <p className="text-slate-400 text-xs mb-4">Simulated savings over recent transactions (USD)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData} margin={{top:5,right:5,left:-25,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{fill:'#94a3b8',fontSize:11}} tickLine={false} axisLine={false} />
              <YAxis tick={{fill:'#94a3b8',fontSize:11}} tickLine={false} axisLine={false} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="savings" name="Savings" stroke="#8b5cf6" strokeWidth={2.5} dot={{fill:'#8b5cf6',r:4}} activeDot={{r:6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}