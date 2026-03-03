'use client'
import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { LANGUAGES } from '@/lib/translations'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find(l => l.code === lang)
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 transition-all text-sm font-medium text-slate-700 dark:text-slate-200">
        <Globe className="w-4 h-4 text-indigo-500 flex-shrink-0" />
        <span className="hidden sm:inline">{current?.flag} {current?.name}</span>
        <span className="sm:hidden">{current?.flag}</span>
        <ChevronDown className={"w-3.5 h-3.5 text-slate-400 transition-transform flex-shrink-0 " + (open ? "rotate-180" : "")} />
      </button>
      {open && (
        <div className="absolute top-11 right-0 z-50 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden py-1">
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false) }}
              className={"w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors " + (lang === l.code ? "text-indigo-600 dark:text-indigo-400 font-semibold" : "text-slate-700 dark:text-slate-300")}>
              <span className="text-base">{l.flag}</span>
              <span>{l.name}</span>
              {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
