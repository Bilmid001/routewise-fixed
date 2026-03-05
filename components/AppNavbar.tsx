'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Zap, User, LogOut, History, Menu, X, Bell, Shield, BarChart3 } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

export default function AppNavbar({ showSimBtn = true }: { showSimBtn?: boolean }) {
  const { user, profile, signOut } = useAuth()
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
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">RW</span>
          </div>
          <span className="font-display font-bold text-lg sm:text-xl">RouteWise</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-lg transition-all">
            <BarChart3 className="w-4 h-4" />Dashboard
          </Link>
          <Link href="/user/history" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-lg transition-all">
            <History className="w-4 h-4" />History
          </Link>
          <Link href="/user/history?tab=alerts" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-lg transition-all">
            <Bell className="w-4 h-4" />Alerts
          </Link>
          {profile?.role === 'admin' && (
            <Link href="/admin" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-all">
              <Shield className="w-4 h-4" />Admin
            </Link>
          )}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {showSimBtn && (
            <Link href="/simulate" className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              <Zap className="w-3.5 h-3.5" />Simulate
            </Link>
          )}
          {/* Avatar dropdown */}
          <div className="relative">
            <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
            </button>
            {dropOpen && (
              <div className="absolute right-0 top-11 w-56 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-[var(--border)]">
                  <div className="font-semibold text-sm truncate">{profile?.full_name || 'User'}</div>
                  <div className="text-xs text-[var(--text3)] truncate">{profile?.email}</div>
                </div>
                {[
                  { icon: User,     label: 'My Profile',      href: '/user/profile' },
                  { icon: History,  label: 'My Simulations',  href: '/user/history' },
                  { icon: Bell,     label: 'Rate Alerts',     href: '/user/history?tab=alerts' },
                  { icon: BarChart3,label: 'Dashboard',       href: '/dashboard' },
                ].map(item => (
                  <Link key={item.label} href={item.href} onClick={() => setDropOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text2)] hover:bg-[var(--bg2)] hover:text-[var(--text)] transition-colors">
                    <item.icon className="w-4 h-4" />{item.label}
                  </Link>
                ))}
                <div className="border-t border-[var(--border)] mt-1">
                  <button onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                    <LogOut className="w-4 h-4" />Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
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
          {/* User info */}
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)] mb-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-bold">{initials}</div>
              <div>
                <div className="font-semibold text-sm">{profile?.full_name || 'User'}</div>
                <div className="text-xs text-[var(--text3)]">{profile?.email}</div>
              </div>
            </div>
          )}
          {[
            { icon: BarChart3, label: 'Dashboard',      href: '/dashboard' },
            { icon: History,   label: 'My Simulations', href: '/user/history' },
            { icon: Bell,      label: 'Rate Alerts',    href: '/user/history?tab=alerts' },
            { icon: User,      label: 'Profile',        href: '/user/profile' },
          ].map(item => (
            <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--bg2)] rounded-xl transition-colors">
              <item.icon className="w-4 h-4" />{item.label}
            </Link>
          ))}
          {showSimBtn && (
            <Link href="/simulate" onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors mt-2">
              <Zap className="w-4 h-4" />Simulate Payment
            </Link>
          )}
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors">
            <LogOut className="w-4 h-4" />Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}
