'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, T, TranslationKeys, LANGUAGES } from './translations'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: TranslationKeys; dir: string }
const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: T['en'], dir: 'ltr' })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang
    if (saved && T[saved]) {
      setLangState(saved)
      document.documentElement.setAttribute('dir', LANGUAGES.find(x => x.code === saved)?.dir || 'ltr')
    }
  }, [])
  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
    const dir = LANGUAGES.find(x => x.code === l)?.dir || 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', l)
  }
  const dir = LANGUAGES.find(x => x.code === lang)?.dir || 'ltr'
  return <LangContext.Provider value={{ lang, setLang, t: T[lang], dir }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
