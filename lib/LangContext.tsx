'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'en' | 'yo' | 'ha' | 'ar' | 'fr'
export const LANGUAGES = [
  { code: 'en' as Lang, name: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'yo' as Lang, name: 'Yoruba',   flag: '🇳🇬', dir: 'ltr' },
  { code: 'ha' as Lang, name: 'Hausa',    flag: '🇳🇬', dir: 'ltr' },
  { code: 'ar' as Lang, name: 'العربية',  flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr' as Lang, name: 'Français', flag: '🇫🇷', dir: 'ltr' },
]

export type T = {
  hero_badge:string; hero_cta:string; hero_sub:string; hero_built:string; hero_analytics:string
  prob_label:string; prob_title:string; prob_sub:string
  steps_label:string; steps_title:string
  feat_label:string; feat_title:string
  cta_badge:string; cta_title:string; cta_sub:string; cta_btn:string
  nav_simulate:string; nav_dashboard:string; nav_signin:string; nav_signup:string
  footer_sub:string; footer_disc:string
}

export const TRANSLATIONS: Record<Lang, T> = {
  en: {
    hero_badge:'Cross-Border Payment Decision Intelligence', hero_cta:'Get Started Free', hero_sub:'Stop overpaying on cross-border transfers. RouteWise analyzes every payment rail across 15 currencies to find your optimal route.', hero_built:'Built as a decision intelligence layer on top of payment infrastructure like Interswitch.', hero_analytics:'Try Demo',
    prob_label:'The Problem', prob_title:'SMEs lose billions to hidden payment fees', prob_sub:'Every cross-border payment involves FX spreads, flat fees, and variable settlement windows. Without intelligent routing, businesses routinely overpay by 3–8%.',
    steps_label:'How It Works', steps_title:'From input to optimal route in seconds',
    feat_label:'Features', feat_title:'Built for payment intelligence',
    cta_badge:'Built for Hackathon 2025', cta_title:'Ready to optimize your payments?', cta_sub:'Start free. No credit card required. Covers 15 currencies and 4 payment rails.', cta_btn:'Create Free Account',
    nav_simulate:'Simulate', nav_dashboard:'Dashboard', nav_signin:'Sign In', nav_signup:'Sign Up Free',
    footer_sub:'Cross-border payment intelligence for SMEs. Hackathon 2025.', footer_disc:'Simulations only — no real payments processed.',
  },
  yo: {
    hero_badge:'Ìmọ̀ Ìpinnu Ìdúróṣinṣin Owó Àgbáyé', hero_cta:'Bẹ̀rẹ̀ Ọ̀fẹ́', hero_sub:'Dáwọ́ san owó àfikún fún gbígbe owó àgbáyé. RouteWise ṣe àgbéyẹ̀wò gbogbo ọ̀nà ìsanpá kọjá 15 owó.', hero_built:'A kọ rẹ̀ gẹ́gẹ́ bí ìpele ìmọ̀ ìpinnu lórí àwọn ètò ìsanpá bíi Interswitch.', hero_analytics:'Gbìyànjú Demo',
    prob_label:'Ìṣòro', prob_title:'Àwọn SME ń pàdánù owó nítorí owó ìdíyelé tó farapamọ́', prob_sub:'Gbogbo ìsanpá àgbáyé ní FX spreads àti àkókò ìtúsílẹ̀ tó yàtọ̀. Láìsí ọ̀nà ọgbọ́n, àwọn iṣowo máa ń san 3-8% ju.',
    steps_label:'Bí Ó Ṣe Ń Ṣiṣẹ́', steps_title:'Láti ìgbéwọlé sí ọ̀nà tó dára jùlọ ní ìṣẹ́jú',
    feat_label:'Àwọn Ẹ̀yà', feat_title:'A kọ fún ìmọ̀ ìsanpá',
    cta_badge:'A Kọ Fún Hackathon 2025', cta_title:'Ṣé o ṣetán láti ṣe àmúnibọ̀wọ̀ ìsanpá rẹ?', cta_sub:'Bẹ̀rẹ̀ ọ̀fẹ́. Kò nílò káàdì kirẹditi. Bo 15 owó àti 4 ọ̀nà ìsanpá.', cta_btn:'Ṣẹ̀dá Àkáǹtì Ọ̀fẹ́',
    nav_simulate:'Ṣe Ìdánwò', nav_dashboard:'Pẹpẹ', nav_signin:'Wọlé', nav_signup:'Forúkọ Sílẹ̀',
    footer_sub:'Ìmọ̀ ìsanpá àgbáyé fún àwọn SME. Hackathon 2025.', footer_disc:'Ìdánwò nìkànjù — kò sí ìsanpá gidi.',
  },
  ha: {
    hero_badge:'Hankali na Yanke Shawara kan Biyan Kudi na Ƙasashen Waje', hero_cta:'Fara Kyauta', hero_sub:'Daina biyan kuɗi fiye da kima. RouteWise yana nazarin duk hanyoyin biyan kuɗi a cikin kuɗaɗe 15.', hero_built:'An gina shi a matsayin mataki na hankali a saman kayan aikin biyan kuɗi kamar Interswitch.', hero_analytics:'Gwada Demo',
    prob_label:'Matsalar', prob_title:'Yan kasuwa na rasa biliyoyin saboda kudin ɓoye', prob_sub:'Kowane biyan kuɗi na ƙasashen waje yana da farashin FX da lokacin sasantawa daban-daban. Ba tare da jagorar hankali ba kasuwanci na biyan 3-8% fiye.',
    steps_label:'Yadda Yake Aiki', steps_title:'Daga shigarwa zuwa mafi kyawun hanya cikin dakika',
    feat_label:'Abubuwan', feat_title:'An gina don hankali na biyan kuɗi',
    cta_badge:'An gina don Hackathon 2025', cta_title:'Kana shirye don inganta biyan kuɗinka?', cta_sub:'Fara kyauta. Ba a buƙatar katin kuɗi. Yana rufe kuɗaɗe 15 da hanyoyin 4.', cta_btn:'Ƙirƙiri Asusun Kyauta',
    nav_simulate:'Gwadawa', nav_dashboard:'Allon', nav_signin:'Shiga', nav_signup:'Yi Rajista',
    footer_sub:'Hankali na biyan kuɗi na ƙasashen waje don yan kasuwa. Hackathon 2025.', footer_disc:'Gwaji ne kawai — ba a sarrafa biyan kuɗi na gaske.',
  },
  ar: {
    hero_badge:'ذكاء اتخاذ القرار في المدفوعات العابرة للحدود', hero_cta:'ابدأ مجاناً', hero_sub:'توقف عن الدفع الزائد على التحويلات الدولية. يحلل RouteWise كل مسار دفع عبر 15 عملة.', hero_built:'مبني كطبقة ذكاء قرار فوق البنية التحتية للمدفوعات مثل Interswitch.', hero_analytics:'جرب العرض',
    prob_label:'المشكلة', prob_title:'تخسر الشركات المليارات بسبب الرسوم المخفية', prob_sub:'كل دفعة عابرة للحدود تتضمن فروق أسعار الصرف ورسوم متغيرة. بدون توجيه ذكي تدفع الشركات 3-8٪ زيادة.',
    steps_label:'كيف يعمل', steps_title:'من الإدخال إلى المسار الأمثل في ثوانٍ',
    feat_label:'الميزات', feat_title:'مبني لذكاء المدفوعات',
    cta_badge:'مبني لـ Hackathon 2025', cta_title:'هل أنت مستعد لتحسين مدفوعاتك؟', cta_sub:'ابدأ مجاناً. لا يلزم بطاقة ائتمان. يغطي 15 عملة و4 مسارات.', cta_btn:'إنشاء حساب مجاني',
    nav_simulate:'محاكاة', nav_dashboard:'لوحة', nav_signin:'تسجيل الدخول', nav_signup:'إنشاء حساب',
    footer_sub:'ذكاء المدفوعات العابرة للحدود للشركات. Hackathon 2025.', footer_disc:'محاكاة فقط — لا تتم معالجة مدفوعات حقيقية.',
  },
  fr: {
    hero_badge:'Intelligence de décision pour paiements transfrontaliers', hero_cta:'Commencer gratuitement', hero_sub:'Arrêtez de surpayer vos transferts internationaux. RouteWise analyse chaque voie de paiement sur 15 devises.', hero_built:"Conçu comme une couche d'intelligence de décision au-dessus de l'infrastructure de paiement.", hero_analytics:'Essayer la démo',
    prob_label:'Le problème', prob_title:'Les PME perdent des milliards à cause de frais cachés', prob_sub:'Chaque paiement transfrontalier implique des spreads de change et des fenêtres de règlement variables. Sans routage intelligent les entreprises surpaient de 3-8%.',
    steps_label:'Comment ça marche', steps_title:"De la saisie à l'itinéraire optimal en quelques secondes",
    feat_label:'Fonctionnalités', feat_title:"Conçu pour l'intelligence de paiement",
    cta_badge:'Conçu pour Hackathon 2025', cta_title:'Prêt à optimiser vos paiements ?', cta_sub:'Commencez gratuitement. Sans carte de crédit. Couvre 15 devises et 4 voies.', cta_btn:'Créer un compte gratuit',
    nav_simulate:'Simuler', nav_dashboard:'Tableau', nav_signin:'Se connecter', nav_signup:"S'inscrire",
    footer_sub:'Intelligence de paiement transfrontalier pour PME. Hackathon 2025.', footer_disc:'Simulations uniquement — aucun paiement réel traité.',
  },
}

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: T; dir: string }
const LangContext = createContext<LangCtx>({ lang:'en', setLang:()=>{}, t:TRANSLATIONS['en'], dir:'ltr' })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  useEffect(() => {
    const saved = localStorage.getItem('rw-lang') as Lang
    if (saved && TRANSLATIONS[saved]) {
      setLangState(saved)
      document.documentElement.setAttribute('dir', LANGUAGES.find(l=>l.code===saved)?.dir||'ltr')
    }
  }, [])
  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('rw-lang', l)
    const dir = LANGUAGES.find(x=>x.code===l)?.dir||'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', l)
  }
  const dir = LANGUAGES.find(x=>x.code===lang)?.dir||'ltr'
  return <LangContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang], dir }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
