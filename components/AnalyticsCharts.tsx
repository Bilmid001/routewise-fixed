'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts'

const routeData = [
  { name: 'Bank Transfer', score: 0.721, avgReceived: 9680 },
  { name: 'Wallet Transfer', score: 0.812, avgReceived: 9820 },
  { name: 'Card Processing', score: 0.698, avgReceived: 9540 },
  { name: 'Direct API', score: 0.934, avgReceived: 9910 },
]

const trendData = [
  { month: 'Jan 15', savings: 45 },
  { month: 'Jan 16', savings: 32 },
  { month: 'Jan 17', savings: 120 },
  { month: 'Jan 18', savings: 29 },
  { month: 'Jan 19', savings: 89 },
  { month: 'Jan 20', savings: 16 },
  { month: 'Jan 21', savings: 67 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-slate-400 text-xs mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-white text-sm font-bold">
            {p.name}: <span style={{ color: p.color }}>{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900/50 border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-1">Route Performance Score</h3>
        <p className="text-slate-500 text-xs mb-5">Composite scoring across cost, speed & reliability</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={routeData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} domain={[0.5, 1]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" name="Score" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900/50 border border-slate-700/60 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-1">Savings Trend</h3>
        <p className="text-slate-500 text-xs mb-5">Simulated savings over recent transactions (USD)</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone" dataKey="savings" name="Savings" stroke="#8b5cf6"
              strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
