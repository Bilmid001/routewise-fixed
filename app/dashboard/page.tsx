'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FxTicker from '@/components/FxTicker'
import Navbar from '@/components/Navbar'
import AIChatWidget from '@/components/AIChatWidget'
import { useAuth } from '@/lib/AuthContext'
import { getSupabaseBrowser } from '@/lib/supabase'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap, TrendingUp, Clock, BarChart3, History, ArrowRight, LogIn } from 'lucide-react'

type Sim = { id:string; amount:number; source_currency:string; destination_currency:string; best_route_name:string; savings_amount:number; best_route_score:number; created_at:string }

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const supabase = getSupabaseBrowser()
  const [sims, setSims] = useState<Sim[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) { router.push('/auth/login'); return }
    if (user) loadSims()
  }, [user, loading])

  const loadSims = async () => {
    setFetching(true)
    const { data } = await supabase
      .from('simulations')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(100)
    setSims(data || [])
    setFetching(false)
  }

  // Compute user stats
  const totalSaved   = sims.reduce((s, r) => s + (r.savings_amount || 0), 0)
  const avgScore     = sims.length ? sims.reduce((s, r) => s + (r.best_route_score || 0), 0) / sims.length : 0
  const topRoute     = sims.length ? Object.entries(sims.reduce((acc: Record<string,number>, s) => { acc[s.best_route_name] = (acc[s.best_route_name]||0)+1; return acc }, {})).sort((a,b)=>b[1]-a[1])[0][0] : '—'
  const corridors    = [...new Set(sims.map(s => s.source_currency + '/' + s.destination_currency))]

  // Chart data — simulations per month
  const monthlyMap: Record<string, { month: string; simulations: number; saved: number }> = {}
  sims.forEach(s => {
    const m = new Date(s.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    if (!monthlyMap[m]) monthlyMap[m] = { month: m, simulations: 0, saved: 0 }
    monthlyMap[m].simulations++
    monthlyMap[m].saved += s.savings_amount || 0
  })
  const chartData = Object.values(monthlyMap).slice(-7)

  // Route breakdown
  const routeCounts: Record<string, number> = {}
  sims.forEach(s => { routeCounts[s.best_route_name] = (routeCounts[s.best_route_name]||0)+1 })
  const routeData = Object.entries(routeCounts).map(([name, count]) => ({ name: name.replace(' Transfer','').replace(' Settlement','').replace('Direct API','API').replace('Processing','Card'), count }))

  if (loading || fetching) return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker /><Navbar />
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )

  if (!user) return null

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker />
      <Navbar showSimBtn={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">My Dashboard</div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl">
              {profile?.full_name ? "Hello, " + profile.full_name.split(' ')[0] + " 👋" : "My Payment Intelligence"}
            </h1>
            <p className="text-[var(--text2)] mt-2 text-sm">{profile?.company_name || user.email}</p>
          </div>
          <Link href="/simulate" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm">
            <Zap className="w-4 h-4" />New Simulation
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { label: 'Total Simulations', val: sims.length,              suffix: '',   color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Total Saved (USD)', val: '$'+totalSaved.toFixed(0), suffix: '',   color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Avg Route Score',   val: (avgScore*100).toFixed(0), suffix: '%',  color: 'text-violet-600 dark:text-violet-400' },
            { label: 'Corridors Used',    val: corridors.length,          suffix: '',   color: 'text-amber-600 dark:text-amber-400' },
          ].map(s => (
            <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-sm text-center">
              <div className={"font-display font-extrabold text-2xl sm:text-3xl mb-1 " + s.color}>{s.val}{s.suffix}</div>
              <div className="text-xs text-[var(--text3)]">{s.label}</div>
            </div>
          ))}
        </div>

        {sims.length === 0 ? (
          /* Empty state */
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-12 sm:p-16 text-center shadow-sm">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="font-bold text-xl mb-2">No simulations yet</h2>
            <p className="text-[var(--text2)] mb-6 text-sm">Run your first payment simulation to see your personal analytics and history here.</p>
            <Link href="/simulate" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all">
              <Zap className="w-4 h-4" />Run First Simulation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {chartData.length > 1 && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-sm mb-4 text-[var(--text2)]">My Simulations Over Time</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} />
                      <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: 12 }} />
                      <Line type="monotone" dataKey="simulations" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 4 }} name="Simulations" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              {routeData.length > 0 && (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
                  <h3 className="font-bold text-sm mb-4 text-[var(--text2)]">My Preferred Routes</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={routeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: 'var(--text3)' }} axisLine={false} />
                      <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: 12 }} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[6,6,0,0]} name="Times used" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Top corridor + top route insights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {[
                { label: 'Most Used Route',     val: topRoute, icon: Zap },
                { label: 'Top Corridor',         val: corridors[0] || '—', icon: TrendingUp },
                { label: 'Avg Savings per Sim',  val: sims.length ? '$'+(totalSaved/sims.length).toFixed(2) : '$0', icon: Clock },
              ].map(s => (
                <div key={s.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--text3)] mb-0.5">{s.label}</div>
                    <div className="font-bold text-sm truncate">{s.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent simulations table */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-bold flex items-center gap-2"><BarChart3 className="w-4 h-4 text-indigo-500" />Recent Simulations</h2>
                <Link href="/user/history" className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead><tr className="border-b border-[var(--border)]">
                    {['Amount', 'Corridor', 'Best Route', 'Savings', 'Date'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-[var(--text3)] uppercase tracking-widest px-4 sm:px-6 py-3">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {sims.slice(0, 8).map((s, i) => (
                      <tr key={s.id} className={"hover:bg-[var(--bg2)] transition-colors " + (i < 7 && i < sims.length - 1 ? 'border-b border-[var(--border)]' : '')}>
                        <td className="px-4 sm:px-6 py-3.5 font-mono text-sm font-bold">{Number(s.amount).toLocaleString()} {s.source_currency}</td>
                        <td className="px-4 sm:px-6 py-3.5 text-sm font-medium">{s.source_currency} → {s.destination_currency}</td>
                        <td className="px-4 sm:px-6 py-3.5"><span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{s.best_route_name}</span></td>
                        <td className="px-4 sm:px-6 py-3.5 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">+${Number(s.savings_amount || 0).toFixed(2)}</td>
                        <td className="px-4 sm:px-6 py-3.5 text-[var(--text3)] text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <AIChatWidget />
    </main>
  )
}
