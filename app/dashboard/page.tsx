'use client'
import Link from 'next/link'
import FxTicker from '@/components/FxTicker'
import Navbar from '@/components/Navbar'
import AnalyticsCharts from '@/components/AnalyticsCharts'
import AIChatWidget from '@/components/AIChatWidget'
import { useAuth } from '@/lib/AuthContext'
import { MOCK_SIMULATIONS } from '@/lib/mockData'
import { Zap, TrendingUp, Clock, BarChart3, User } from 'lucide-react'

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const totalSaved = MOCK_SIMULATIONS.reduce((s,sim)=>s+sim.savings_amount,0)

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <FxTicker/>
      <Navbar showSimBtn={true} showDashBtn={false}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">Analytics Dashboard</div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl">Payment Intelligence</h1>
            <p className="text-[var(--text2)] mt-2 text-sm sm:text-base">Route performance analytics and simulation history.</p>
          </div>
          {user ? (
            <Link href="/user/profile" className="flex items-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 hover:border-indigo-300 transition-all">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {profile?.full_name?.[0]?.toUpperCase()||'U'}
              </div>
              <span className="text-sm font-medium">{profile?.full_name||'My Profile'}</span>
            </Link>
          ) : (
            <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"><User className="w-4 h-4"/>Create Account</Link>
          )}
        </div>

        {user && (
          <div className="mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 sm:p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Welcome back</div>
                <div className="font-display font-bold text-xl sm:text-2xl">{profile?.full_name||user.email}</div>
                {profile?.company_name && <div className="text-indigo-200 text-sm">{profile.company_name}</div>}
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl">${totalSaved.toFixed(0)}</div>
                  <div className="text-indigo-200 text-xs">Total saved</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl">{MOCK_SIMULATIONS.length}</div>
                  <div className="text-indigo-200 text-xs">Simulations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <AnalyticsCharts/>

        <div className="mt-6 sm:mt-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-bold text-base sm:text-lg flex items-center gap-2"><BarChart3 className="w-4 h-4 text-indigo-500"/>Recent Simulations</h2>
            {user && <Link href="/user/history" className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">View all →</Link>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead><tr className="border-b border-[var(--border)]">
                {['Amount','Corridor','Best Route','Savings','Date'].map(h=>(
                  <th key={h} className="text-left text-xs font-bold text-[var(--text3)] uppercase tracking-widest px-4 sm:px-6 py-3">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {MOCK_SIMULATIONS.map((s,i)=>(
                  <tr key={s.id} className={"border-b border-[var(--border)] hover:bg-[var(--bg2)] transition-colors "+(i===MOCK_SIMULATIONS.length-1?'border-b-0':'')}>
                    <td className="px-4 sm:px-6 py-3.5 font-mono text-sm font-bold">{s.amount.toLocaleString()} {s.source_currency}</td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm font-medium">{s.source_currency} → {s.destination_currency}</td>
                    <td className="px-4 sm:px-6 py-3.5"><span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{s.best_route}</span></td>
                    <td className="px-4 sm:px-6 py-3.5 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm">+${s.savings_amount.toFixed(2)}</td>
                    <td className="px-4 sm:px-6 py-3.5 text-[var(--text3)] text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AIChatWidget/>
    </main>
  )
}
