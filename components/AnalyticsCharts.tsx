'use client'
import { useEffect, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const barData = [
  {name:'Bank',savings:38,fee:28},{name:'Wallet',savings:52,fee:18},{name:'Card',savings:18,fee:42},{name:'API',savings:72,fee:12}
]
const lineData = [
  {month:'Aug',simulations:12},{month:'Sep',simulations:19},{month:'Oct',simulations:28},{month:'Nov',simulations:35},{month:'Dec',simulations:48},{month:'Jan',simulations:62},{month:'Feb',simulations:71}
]

function AnimatedNum({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0; const step = target/60
    const t = setInterval(()=>{ start+=step; if(start>=target){setVal(target);clearInterval(t)}else setVal(Math.floor(start)) },20)
    return ()=>clearInterval(t)
  },[target])
  return <span>{val.toLocaleString()}</span>
}

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[{label:'Total Simulations',value:247,suffix:''},{label:'Avg Savings (USD)',value:57,prefix:'$'},{label:'Top Route Score',value:93,suffix:'%'},{label:'Avg Settlement',value:1,suffix:'h'}].map(s=>(
          <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-sm text-center">
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">
              {s.prefix||''}<AnimatedNum target={s.value}/>{s.suffix||''}
            </div>
            <div className="text-xs text-[var(--text3)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-4 text-[var(--text2)]">Route Performance — Avg Savings vs Fees (USD)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="name" tick={{fontSize:12,fill:'var(--text3)'}} axisLine={false}/>
              <YAxis tick={{fontSize:12,fill:'var(--text3)'}} axisLine={false}/>
              <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'12px',fontSize:12}}/>
              <Bar dataKey="savings" fill="#6366f1" radius={[6,6,0,0]} name="Avg Savings"/>
              <Bar dataKey="fee" fill="#e2e8f0" radius={[6,6,0,0]} name="Avg Fee"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-4 text-[var(--text2)]">Monthly Simulations Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="month" tick={{fontSize:12,fill:'var(--text3)'}} axisLine={false}/>
              <YAxis tick={{fontSize:12,fill:'var(--text3)'}} axisLine={false}/>
              <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:'12px',fontSize:12}}/>
              <Line type="monotone" dataKey="simulations" stroke="#8b5cf6" strokeWidth={3} dot={{fill:'#8b5cf6',r:4}} name="Simulations"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
