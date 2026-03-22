'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu,X,Zap } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useLang } from '@/lib/LangContext'
export default function PublicNavbar() {
  const { t }=useLang()
  const [open,setOpen]=useState(false)
  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">RW</span></div>
          <span className="font-display font-bold text-lg sm:text-xl">RouteWise</span>
          <span className="hidden sm:inline bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/40">[RW]</span>
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher/><ThemeToggle/>
          <Link href="/auth/login" className="text-[var(--text2)] hover:text-[var(--text)] text-sm font-medium px-3 py-2 transition-colors">{t.nav_signin}</Link>
          <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">{t.nav_signup}</Link>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher/><ThemeToggle/>
          <button onClick={()=>setOpen(!open)} className="p-2 rounded-lg border border-[var(--border)] text-[var(--text2)]">{open?<X className="w-4 h-4"/>:<Menu className="w-4 h-4"/>}</button>
        </div>
      </div>
      {open&&(
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-4 space-y-2">
          <Link href="/simulate" onClick={()=>setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors"><Zap className="w-4 h-4"/>Try Demo</Link>
          <Link href="/auth/login" onClick={()=>setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors">{t.nav_signin}</Link>
          <Link href="/auth/signup" onClick={()=>setOpen(false)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors"><Zap className="w-4 h-4"/>{t.nav_signup}</Link>
        </div>
      )}
    </nav>
  )
}
