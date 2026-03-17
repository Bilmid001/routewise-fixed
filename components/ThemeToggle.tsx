'use client'
import { useEffect,useState } from 'react'
import { Sun,Moon } from 'lucide-react'
export default function ThemeToggle() {
  const [dark,setDark]=useState(false)
  useEffect(()=>{ setDark(document.documentElement.classList.contains('dark')) },[])
  const toggle=()=>{ const d=!dark; setDark(d); document.documentElement.classList.toggle('dark',d); localStorage.setItem('theme',d?'dark':'light') }
  return (
    <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border)] hover:border-indigo-300 transition-all text-[var(--text2)] hover:text-indigo-500">
      {dark?<Sun className="w-4 h-4"/>:<Moon className="w-4 h-4"/>}
    </button>
  )
}
