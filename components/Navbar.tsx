'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Zap, User, LogOut, History, Menu, X, Bell, Shield } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { useLang } from '@/lib/LangContext'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar({ showSimBtn = true }: { showSimBtn?: boolean }) {
  const { user, profile, signOut } = useAuth()
  const { t } = useLang()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  const handleSignOut = async () => { await signOut(); router.push('/') }
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : profile?.email?.slice(0, 2).toUpperCase() || 'U'

  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">RW</span>
          </div>
          <span className="font-display font-bold text-lg sm:text-xl truncate">RouteWise</span>
          <span className="hidden md:inline bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/40">2025</span>
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          {user && profile?.role === 'admin' && (
            <Link href="/admin" className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-sm font-medium transition-colors">
              <Shield className="w-4 h-4" />Admin
            </Link>
          )}
          <LanguageSwitcher />
          <ThemeToggle />
          {!user ? (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="text-[var(--text2)] hover:text-[var(--text)] text-sm font-medium px-3 py-2 transition-colors">{t.nav_signin}</Link>
              <Link href="/auth/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">{t.nav_signup}</Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {showSimBtn && (
                <Link href="/simulate" className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  <Zap className="w-3.5 h-3.5" />{t.nav_simulate}
                </Link>
              )}
              {/* Avatar dropdown */}
              <div className="relative">
                <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                </button>
                {dropOpen && (
                  <div className="absolute right-0 top-11 w-52 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden py-1 z-50">
                    <div className="px-4 py-3 border-b border-[var(--border)]">
                      <div className="font-semibold text-sm truncate">{profile?.full_name || 'User'}</div>
                      <div className="text-xs text-[var(--text3)] truncate">{profile?.email}</div>
                    </div>
                    {[
                      { icon: User,    label: 'Profile',        href: '/user/profile' },
                      { icon: History, label: 'My Simulations', href: '/user/history' },
                      { icon: Bell,    label: 'Rate Alerts',    href: '/user/history?tab=alerts' },
                    ].map(item => (
                      <Link key={item.label} href={item.href} onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text2)] hover:bg-[var(--bg2)] hover:text-[var(--text)] transition-colors">
                        <item.icon className="w-4 h-4" />{item.label}
                      </Link>
                    ))}
                    <div className="border-t border-[var(--border)] mt-1">
                      <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                        <LogOut className="w-4 h-4" />Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg border border-[var(--border)] text-[var(--text2)]">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-4 space-y-1">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)] mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{initials}</div>
              <div><div className="font-semibold text-sm">{profile?.full_name || 'User'}</div><div className="text-xs text-[var(--text3)]">{profile?.email}</div></div>
            </div>
          )}
          {user ? (
            <>
              <Link href="/dashboard"   onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors"><History className="w-4 h-4" />Dashboard</Link>
              <Link href="/user/history" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors"><History className="w-4 h-4" />My Simulations</Link>
              <Link href="/user/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors"><User className="w-4 h-4" />Profile</Link>
              {showSimBtn && <Link href="/simulate" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors mt-2"><Zap className="w-4 h-4" />{t.nav_simulate}</Link>}
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"><LogOut className="w-4 h-4" />Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login"  onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors"><User className="w-4 h-4" />{t.nav_signin}</Link>
              <Link href="/auth/signup" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors mt-2"><Zap className="w-4 h-4" />{t.nav_signup}</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
