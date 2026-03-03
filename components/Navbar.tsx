'use client'
import Link from 'next/link'
import { BarChart3, Zap } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useLang } from '@/lib/LangContext'

export default function Navbar({ showSimBtn = true, showDashBtn = true }: { showSimBtn?: boolean; showDashBtn?: boolean }) {
  const { t } = useLang()
  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-white text-xs font-bold">RW</span></div>
          <span className="font-display font-bold text-lg sm:text-xl truncate">RouteWise</span>
          <span className="hidden md:inline bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/40">HACKATHON</span>
        </Link>
        <div className="flex items-center gap-2 flex-shrink-0">
          {showDashBtn && <Link href="/dashboard" className="hidden sm:flex items-center gap-1.5 text-[var(--text2)] hover:text-[var(--text)] text-sm font-medium transition-colors"><BarChart3 className="w-4 h-4" /><span>{t.nav_dashboard}</span></Link>}
          <LanguageSwitcher />
          <ThemeToggle />
          {showSimBtn && <Link href="/simulate" className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors"><Zap className="w-3.5 h-3.5" /><span className="hidden sm:inline">{t.nav_simulate}</span></Link>}
        </div>
      </div>
    </nav>
  )
}
