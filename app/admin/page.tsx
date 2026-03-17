'use client'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield,Users,BarChart3,TrendingUp,Globe } from 'lucide-react'
import AppNavbar from '@/components/AppNavbar'
import FxTicker from '@/components/FxTicker'
import { useAuth } from '@/lib/AuthContext'
import { getSupabase } from '@/lib/supabase'
export default function AdminPage() {
  const { user,session,loading }=useAuth()
  const router=useRouter()
  const [stats,setStats]=useState({users:0,simulations:0,totalSaved:0,topCorridor:'—'})
  const [users,setUsers]=useState<any[]>([])
  const [fetching,setFetching]=useState(true)
  useEffect(()=>{ if(!loading&&!user){ router.push('/auth/login'); return }; if(user&&session) load() },[user,session,loading])
  const load=async()=>{
    setFetching(true)
    const sb = getSupabase()
    const [ur,sr]=await Promise.all([sb.from('profiles').select('*').order('created_at',{ascending:false}).limit(50),sb.from('simulations').select('*').order('created_at',{ascending:false}).limit(200)])
    const u=ur.data||[]; const s=sr.data||[]
    const totalSaved=s.reduce((acc:number,sim:any)=>acc+(sim.savings_amount||0),0)
    const cc:Record<string,number>={}; s.forEach((sim:any)=>{ const k=(sim.source_currency||'?')+'/'+(sim.destination_currency||'?'); cc[k]=(cc[k]||0)+1 })
    const topCorridor=Object.entries(cc).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—'
    setStats({ users:u.length,simulations:s.length,totalSaved,topCorridor }); setUsers(u); setFetching(false)
  }
  if(loading||fetching) return <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]"><FxTicker/><AppNavbar/><div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"/></div></div>
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker/><AppNavbar showSimBtn={true}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-amber-600 dark:text-amber-400"/></div>
          <div><div className="text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Admin Panel</div><h1 className="font-display font-extrabold text-3xl sm:text-4xl">Platform Overview</h1></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[{icon:Users,label:'Total Users',val:stats.users,c:'text-indigo-600 dark:text-indigo-400'},{icon:BarChart3,label:'Total Simulations',val:stats.simulations,c:'text-violet-600 dark:text-violet-400'},{icon:TrendingUp,label:'Total Saved (USD)',val:'$'+stats.totalSaved.toFixed(0),c:'text-emerald-600 dark:text-emerald-400'},{icon:Globe,label:'Top Corridor',val:stats.topCorridor,c:'text-amber-600 dark:text-amber-400'}].map(s=>(
            <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><s.icon className={"w-4 h-4 "+s.c}/><span className="text-xs text-[var(--text3)] font-medium">{s.label}</span></div>
              <div className={"font-display font-extrabold text-xl sm:text-2xl "+s.c}>{s.val}</div>
            </div>
          ))}
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[var(--border)]"><h2 className="font-bold flex items-center gap-2"><Users className="w-4 h-4 text-indigo-500"/>Registered Users</h2></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[500px]">
            <thead><tr className="border-b border-[var(--border)]">{['Name','Email','Company','Role','Joined'].map(h=><th key={h} className="text-left text-xs font-bold text-[var(--text3)] uppercase tracking-widest px-4 sm:px-6 py-3">{h}</th>)}</tr></thead>
            <tbody>{users.map((u,i)=>(
              <tr key={u.id} className={"hover:bg-[var(--bg2)] transition-colors "+(i<users.length-1?'border-b border-[var(--border)]':'')}>
                <td className="px-4 sm:px-6 py-3.5 font-semibold text-sm">{u.full_name||'—'}</td>
                <td className="px-4 sm:px-6 py-3.5 text-sm text-[var(--text2)]">{u.email}</td>
                <td className="px-4 sm:px-6 py-3.5 text-sm text-[var(--text3)]">{u.company_name||'—'}</td>
                <td className="px-4 sm:px-6 py-3.5"><span className={"text-xs font-bold px-2 py-0.5 rounded-full "+(u.role==='admin'?'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400':'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400')}>{u.role||'user'}</span></td>
                <td className="px-4 sm:px-6 py-3.5 text-[var(--text3)] text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}</tbody>
          </table></div>
        </div>
      </div>
    </main>
  )
}
