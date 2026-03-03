export type Lang = 'en' | 'yo' | 'ha' | 'ar' | 'fr'

export const LANGUAGES = [
  { code: 'en' as Lang, name: 'English',  flag: '🇬🇧', dir: 'ltr' },
  { code: 'yo' as Lang, name: 'Yoruba',   flag: '🇳🇬', dir: 'ltr' },
  { code: 'ha' as Lang, name: 'Hausa',    flag: '🇳🇬', dir: 'ltr' },
  { code: 'ar' as Lang, name: 'العربية',  flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr' as Lang, name: 'Français', flag: '🇫🇷', dir: 'ltr' },
]

export type TranslationKeys = {
  // Nav
  nav_simulate: string
  nav_dashboard: string
  nav_new_sim: string
  nav_history: string
  // Hero
  hero_badge: string
  hero_title1: string
  hero_title2: string
  hero_sub: string
  hero_built: string
  hero_cta: string
  hero_analytics: string
  // Problem
  prob_label: string
  prob_title: string
  prob_sub: string
  // Steps
  steps_label: string
  steps_title: string
  step1_title: string; step1_desc: string
  step2_title: string; step2_desc: string
  step3_title: string; step3_desc: string
  step4_title: string; step4_desc: string
  // Features
  feat_label: string
  feat_title: string
  feat1_title: string; feat1_desc: string
  feat2_title: string; feat2_desc: string
  feat3_title: string; feat3_desc: string
  feat4_title: string; feat4_desc: string
  // CTA
  cta_badge: string
  cta_title: string
  cta_sub: string
  cta_btn: string
  // Simulator
  sim_label: string
  sim_title: string
  sim_sub: string
  sim_amount: string
  sim_from: string
  sim_to: string
  sim_btn: string
  sim_analyzing: string
  sim_corridor: string
  sim_marketrate: string
  sim_placeholder: string
  sim_ready_title: string
  sim_ready_sub: string
  // Results
  res_title: string
  res_saving_by: string
  res_save: string
  res_more: string
  res_recipient: string
  res_receives: string
  res_fee: string
  res_settle: string
  res_reliability: string
  res_recommended: string
  res_best_cost: string
  res_fastest: string
  res_fxrate: string
  res_converted: string
  // AI
  ai_title: string
  ai_sub: string
  ai_demo: string
  ai_loading: string
  ai_cost: string
  ai_speed: string
  ai_reliability: string
  // Risk
  risk_title: string
  risk_low: string
  risk_medium: string
  risk_high: string
  risk_stable: string
  risk_moderate: string
  risk_volatile: string
  // Learn more
  learn_title: string
  learn_btn: string
  learn_close: string
  // Savings calc
  calc_title: string
  calc_sub: string
  calc_monthly: string
  calc_result: string
  calc_peryear: string
  calc_btn: string
  // Dashboard
  dash_label: string
  dash_title: string
  dash_sub: string
  dash_total: string
  dash_savings: string
  dash_score: string
  dash_settle: string
  dash_recent: string
  dash_amount: string
  dash_corridor: string
  dash_route: string
  dash_date: string
  // Confidence
  conf_high: string
  conf_medium: string
  conf_low: string
  // Footer
  footer_sub: string
  footer_disclaimer: string
  // CSV
  csv_export: string
  // Chat
  chat_placeholder: string
  chat_title: string
  chat_sub: string
}

export const T: Record<Lang, TranslationKeys> = {
  en: {
    nav_simulate:'Simulate', nav_dashboard:'Dashboard', nav_new_sim:'New Simulation', nav_history:'History',
    hero_badge:'Cross-Border Payment Decision Intelligence',
    hero_title1:'Route', hero_title2:'Wise',
    hero_sub:'Stop overpaying on cross-border transfers. RouteWise analyzes every payment rail across 15 currencies to find your optimal route — saving SMEs thousands in fees and FX spreads.',
    hero_built:'Built as a decision intelligence layer on top of payment infrastructure like Interswitch.',
    hero_cta:'Simulate Payment', hero_analytics:'View Analytics',
    prob_label:'The Problem', prob_title:'SMEs lose billions to hidden payment fees',
    prob_sub:'Every cross-border payment involves FX spreads, flat fees, percentage fees and variable settlement windows. Without intelligent routing, businesses routinely overpay by 3–8% per transaction.',
    steps_label:'How It Works', steps_title:'From input to optimal route in seconds',
    step1_title:'Enter Transaction', step1_desc:'Input amount, source and destination currencies from 15 global options.',
    step2_title:'Route Analysis', step2_desc:'Engine evaluates 4 payment rails simultaneously in real-time.',
    step3_title:'AI Scoring', step3_desc:'Routes ranked by cost 50%, speed 30%, reliability 20%.',
    step4_title:'Optimal Route', step4_desc:'Receive best route with AI explanation and confidence meter.',
    feat_label:'Features', feat_title:'Built for payment intelligence',
    feat1_title:'15 Currencies', feat1_desc:'NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.',
    feat2_title:'FX Intelligence', feat2_desc:'Live spread analysis across all global corridors with real-time ticker.',
    feat3_title:'Speed vs Cost Engine', feat3_desc:'Weighted scoring balances settlement time against transaction cost.',
    feat4_title:'AI Recommendations', feat4_desc:'OpenAI-powered insights explain why each route is optimal.',
    cta_badge:'Get Settle Faster & Save More.', cta_title:'Ready to optimize your payments?',
    cta_sub:'Start with a free simulation. No signup required. Covers 15 currencies and 4 payment rails.',
    cta_btn:'Simulate Payment Now',
    sim_label:'Payment Simulator', sim_title:'Find your optimal route',
    sim_sub:'Compare all 4 payment rails across 15 currencies. Maximize what your recipient receives.',
    sim_amount:'Amount to Send', sim_from:'From', sim_to:'To',
    sim_btn:'Simulate Payment', sim_analyzing:'Analyzing...', sim_corridor:'payment route',
    sim_marketrate:'Mid-Market Rate', sim_placeholder:'10,000',
    sim_ready_title:'Ready to analyze',
    sim_ready_sub:'Enter your transaction details and click Simulate Payment to see the full route comparison.',
    res_title:'Route Comparison', res_saving_by:'By choosing', res_save:'You save',
    res_more:'more in your recipient pocket vs worst route.', res_recipient:'Recipient gets',
    res_receives:'Receives', res_fee:'Total Fee', res_settle:'Settle', res_reliability:'Reliability',
    res_recommended:'RECOMMENDED', res_best_cost:'Best Cost', res_fastest:'Fastest',
    res_fxrate:'FX Rate', res_converted:'Converted',
    ai_title:'AI Insights Panel', ai_sub:'RouteWise Intelligence Engine', ai_demo:'Demo Mode',
    ai_loading:'Analyzing with AI intelligence...', ai_cost:'Cost Edge', ai_speed:'Speed', ai_reliability:'Reliability',
    risk_title:'Transaction Risk Analysis', risk_low:'Low Risk', risk_medium:'Medium Risk', risk_high:'High Risk',
    risk_stable:'Stable corridor', risk_moderate:'Moderate volatility', risk_volatile:'High FX volatility',
    learn_title:'About this Route', learn_btn:'Learn More', learn_close:'Close',
    calc_title:'SME Annual Savings Calculator', calc_sub:'See how much RouteWise saves your business per year',
    calc_monthly:'Monthly transfer volume (USD)', calc_result:'Estimated annual savings', calc_peryear:'/year',
    calc_btn:'Calculate Savings',
    dash_label:'Analytics Dashboard', dash_title:'Payment Intelligence', dash_sub:'Route performance analytics and simulation history.',
    dash_total:'Total Simulations', dash_savings:'Avg Savings (USD)', dash_score:'Top Route Score', dash_settle:'Avg Settlement',
    dash_recent:'Recent Simulations', dash_amount:'Amount', dash_corridor:'Corridor', dash_route:'Best Route', dash_date:'Date',
    conf_high:'High', conf_medium:'Medium', conf_low:'Low',
    footer_sub:'Cross-border payment intelligence for SMEs.',
    footer_disclaimer:'Simulations only — no real payments processed.',
    csv_export:'Export CSV', chat_placeholder:'Ask about routes, fees, FX...',
    chat_title:'RouteWise AI', chat_sub:'Payment Intelligence Assistant',
  },
  yo: {
    nav_simulate:'Ṣe Ìdánwò', nav_dashboard:'Pẹpẹ Ìṣakoso', nav_new_sim:'Ìdánwò Tuntun', nav_history:'Ìtàn',
    hero_badge:'Ìmọ̀ Ìpinnu Ìdúróṣinṣin Owó Àgbáyé',
    hero_title1:'Ọ̀nà', hero_title2:'Ọgbọ́n',
    hero_sub:'Dáwọ́ san owó àfikún fún gbígbe owó àgbáyé. RouteWise ṣe àgbéyẹ̀wò gbogbo ọ̀nà ìsanpá kọjá 15 owó láti wá ọ̀nà tó dára jùlọ fún ọ.',
    hero_built:'A kọ rẹ̀ gẹ́gẹ́ bí ìpele ìmọ̀ ìpinnu lórí àwọn ètò ìsanpá bíi Interswitch.',
    hero_cta:'Ṣe Ìdánwò Ìsanpá', hero_analytics:'Wo Ìtúpale',
    prob_label:'Ìṣòro', prob_title:'Àwọn SME ń pàdánù owó nítorí owó ìdíyelé tó farapamọ́',
    prob_sub:'Gbogbo ìsanpá àgbáyé ní FX spreads, owó aláìdára, àti àkókò ìtúsílẹ̀ tó yàtọ̀. Láìsí ọ̀nà ọgbọ́n, àwọn iṣowo máa ń san 3-8% ju bó ṣe yẹ lọ.',
    steps_label:'Bí Ó Ṣe Ń Ṣiṣẹ́', steps_title:'Láti ìgbéwọlé sí ọ̀nà tó dára jùlọ ní ìṣẹ́jú',
    step1_title:'Tẹ Ìdúnàádúrà', step1_desc:'Tẹ iye owó, owó tó jáde àti owó tó ń lọ sí láàrin 15 àṣàyàn.',
    step2_title:'Ìtúpalẹ̀ Ọ̀nà', step2_desc:'Ẹ̀rọ ń ṣe àgbéyẹ̀wò 4 ọ̀nà ìsanpá ní àkókò gidi.',
    step3_title:'Ìkóre AI', step3_desc:'Àwọn ọ̀nà tí a ṣe àkójọ nipa iye owó 50%, ìpẹ̀lẹ̀ 30%, ìgbẹ́kẹ̀lé 20%.',
    step4_title:'Ọ̀nà Tó Dára Jùlọ', step4_desc:'Gba ọ̀nà tó dára jùlọ pẹ̀lú ìtúpalẹ̀ AI àti mítà ìgbẹ́kẹ̀lé.',
    feat_label:'Àwọn Ẹ̀yà', feat_title:'A kọ fún ìmọ̀ ìsanpá',
    feat1_title:'15 Owó', feat1_desc:'NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.',
    feat2_title:'Ìmọ̀ FX', feat2_desc:'Ìtúpalẹ̀ FX spread gidi kọjá gbogbo àwọn ọ̀nà àgbáyé.',
    feat3_title:'Ẹ̀rọ Ìpẹ̀lẹ̀ vs Iye Owó', feat3_desc:'Ìdárayá tó ní ìwọ̀ntúnwọ̀nsì ìdúró àkókò pẹ̀lú iye owó.',
    feat4_title:'Àwọn Ìmọ̀ràn AI', feat4_desc:'Àwọn ìtúpalẹ̀ OpenAI ṣàlàyé ìdí tí ọ̀nà kọ̀ọ̀kan fi dára jùlọ.',
    cta_badge:'A Kọ Fún', cta_title:'Ṣé o ṣetán láti ṣe àmúnibọ̀wọ̀ ìsanpá rẹ?',
    cta_sub:'Bẹ̀rẹ̀ pẹ̀lú ìdánwò ọ̀fẹ́. Kò nílò ìforúkọsílẹ̀. Bo 15 owó àti 4 ọ̀nà ìsanpá.',
    cta_btn:'Ṣe Ìdánwò Ìsanpá Báyìí',
    sim_label:'Ẹ̀rọ Ìdánwò Ìsanpá', sim_title:'Wá ọ̀nà tó dára jùlọ fún ọ',
    sim_sub:'Ṣe àfiwéra gbogbo 4 ọ̀nà ìsanpá kọjá 15 owó.',
    sim_amount:'Iye Owó Láti Rán', sim_from:'Láti', sim_to:'Sí',
    sim_btn:'Ṣe Ìdánwò Ìsanpá', sim_analyzing:'Ń ṣe ìtúpalẹ̀...', sim_corridor:'ọ̀nà ìsanpá',
    sim_marketrate:'Iye Ọjà FX', sim_placeholder:'10,000',
    sim_ready_title:'Ṣetán láti ṣe ìtúpalẹ̀',
    sim_ready_sub:'Tẹ àwọn alaye ìdúnàádúrà rẹ kí o tẹ Ṣe Ìdánwò Ìsanpá.',
    res_title:'Ìfiwéra Ọ̀nà', res_saving_by:'Nípasẹ̀ yíyan', res_save:'O ń fipamọ́',
    res_more:'diẹ sii ninu apamọwọ olugba rẹ vs ọna ti o buru julo.',
    res_recipient:'Olùgbà gba', res_receives:'Gbà', res_fee:'Owó Àpapọ̀', res_settle:'Ìgbà', res_reliability:'Ìgbẹ́kẹ̀lé',
    res_recommended:'TÍ A ṢÈDÚRÓ', res_best_cost:'Iye Tó Dára Jùlọ', res_fastest:'Tó Yára Jùlọ',
    res_fxrate:'Iye FX', res_converted:'Tí Yí Padà',
    ai_title:'Pánẹ́ẹ̀lì Ìmọ̀ AI', ai_sub:'Ẹ̀rọ Ìmọ̀ RouteWise', ai_demo:'Ìpele Àpẹẹrẹ',
    ai_loading:'Ń ṣe ìtúpalẹ̀ pẹ̀lú AI...', ai_cost:'Àǹfààní Iye Owó', ai_speed:'Ìpẹ̀lẹ̀', ai_reliability:'Ìgbẹ́kẹ̀lé',
    risk_title:'Ìtúpalẹ̀ Ewu Ìdúnàádúrà', risk_low:'Ewu Kékeré', risk_medium:'Ewu Àárín', risk_high:'Ewu Gíga',
    risk_stable:'Ọ̀nà àárín tó dúró', risk_moderate:'Àyípadà dídúnná', risk_volatile:'Àyípadà FX gíga',
    learn_title:'Nípa Ọ̀nà Yìí', learn_btn:'Kọ́ Síwájú', learn_close:'Tún',
    calc_title:'Iṣiro Ìfipamọ́ Ọdọọdún SME', calc_sub:'Wo iye tí RouteWise ń fipamọ́ fún iṣowo rẹ lọdọọdún',
    calc_monthly:'Iye owó ìsanpá ọ̀sọ̀ọ̀sẹ̀ (USD)', calc_result:'Ìfipamọ́ àfojúsùn lọdọọdún', calc_peryear:'/ọdún',
    calc_btn:'Ṣe Iṣiro Ìfipamọ́',
    dash_label:'Pẹpẹ Ìtúpalẹ̀', dash_title:'Ìmọ̀ Ìsanpá', dash_sub:'Ìtúpalẹ̀ iṣẹ́ ọ̀nà àti ìtàn ìdánwò.',
    dash_total:'Àpapọ̀ Ìdánwò', dash_savings:'Ìfipamọ́ Àárín (USD)', dash_score:'Ìkóre Ọ̀nà Gíga', dash_settle:'Ìgbà Àárín',
    dash_recent:'Àwọn Ìdánwò Àìpẹ́', dash_amount:'Iye Owó', dash_corridor:'Ọ̀nà', dash_route:'Ọ̀nà Tó Dára Jùlọ', dash_date:'Ọjọ́',
    conf_high:'Gíga', conf_medium:'Àárín', conf_low:'Kékeré',
    footer_sub:'Ìmọ̀ ìsanpá àgbáyé fún àwọn SME.',
    footer_disclaimer:'Ìdánwò nìkànjù — kò sí ìsanpá gidi tí a ṣe.',
    csv_export:'Gbé CSV Jáde', chat_placeholder:'Béèrè nípa àwọn ọ̀nà, owó, FX...',
    chat_title:'RouteWise AI', chat_sub:'Olùrànlọ́wọ́ Ìmọ̀ Ìsanpá',
  },
  ha: {
    nav_simulate:'Gwadawa', nav_dashboard:'Allon Kula', nav_new_sim:'Gwaji Sabon', nav_history:'Tarihi',
    hero_badge:'Hankali na Yanke Shawara kan Biyan Kudi na Ƙasashen Waje',
    hero_title1:'Route', hero_title2:'Wise',
    hero_sub:'Daina biyan kuɗi fiye da kima kan canja wurin kuɗi na ƙasashen waje. RouteWise yana nazarin duk hanyoyin biyan kuɗi a cikin kuɗaɗe 15 don nemo hanyar da ta fi dacewa.',
    hero_built:'An gina shi a matsayin mataki na hankali a saman kayan aikin biyan kuɗi kamar Interswitch.',
    hero_cta:'Gwada Biyan Kuɗi', hero_analytics:'Duba Nazari',
    prob_label:'Matsalar', prob_title:'Ƴan kasuwa na rasa biliyoyin saboda kuɗin ɓoye',
    prob_sub:'Kowane biyan kuɗi na ƙasashen waje yana da farashin FX, kuɗin fito, da lokacin sasantawa daban-daban. Ba tare da jagorar hankali ba, kasuwancin na biyan 3-8% fiye da kima.',
    steps_label:'Yadda Yake Aiki', steps_title:'Daga shigarwa zuwa mafi kyawun hanya cikin dakika',
    step1_title:'Shigar da Ma\'amala', step1_desc:'Shigar da adadin, kuɗin tushe da kuɗin manufa daga zaɓuɓɓukan 15.',
    step2_title:'Nazarin Hanya', step2_desc:'Injin yana kimanta hanyoyin biyan kuɗi 4 a lokaci guda.',
    step3_title:'Maki na AI', step3_desc:'Hanyoyi an jera su ta farashi 50%, sauri 30%, dogaro 20%.',
    step4_title:'Mafi Kyawun Hanya', step4_desc:'Karɓi mafi kyawun hanya tare da bayanin AI da ma\'aunin kwarin gwiwa.',
    feat_label:'Abubuwan', feat_title:'An gina don hankali na biyan kuɗi',
    feat1_title:'Kuɗaɗe 15', feat1_desc:'NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.',
    feat2_title:'Hankali na FX', feat2_desc:'Nazarin yada FX a duk hanyoyin ƙasa da ƙasa.',
    feat3_title:'Injin Sauri vs Farashi', feat3_desc:'Maki mai nauyi yana daidaita lokacin sasantawa da farashi.',
    feat4_title:'Shawarwari na AI', feat4_desc:'Bayanai na OpenAI sun bayyana dalilin da yasa kowane hanya ya fi dacewa.',
    cta_badge:'Get Settle Faster & Save More.', cta_title:'Kana shirye don inganta biyan kuɗinka?',
    cta_sub:'Fara da gwajin kyauta. Ba a buƙatar rajista. Yana rufe kuɗaɗe 15 da hanyoyin biyan kuɗi 4.',
    cta_btn:'Gwada Biyan Kuɗi Yanzu',
    sim_label:'Na\'urar Gwaji', sim_title:'Nemo mafi kyawun hanyarka',
    sim_sub:'Kwatanta duk hanyoyin biyan kuɗi 4 a cikin kuɗaɗe 15.',
    sim_amount:'Adadin Da Za a Aika', sim_from:'Daga', sim_to:'Zuwa',
    sim_btn:'Gwada Biyan Kuɗi', sim_analyzing:'Ana nazari...', sim_corridor:'hanyar biyan kuɗi',
    sim_marketrate:'Farashin Kasuwa na FX', sim_placeholder:'10,000',
    sim_ready_title:'Shirye don nazari',
    sim_ready_sub:'Shigar da bayanan ma\'amalanku kuma danna Gwada Biyan Kuɗi.',
    res_title:'Kwatancen Hanya', res_saving_by:'Ta zaɓar', res_save:'Kana adana',
    res_more:'a cikin aljihu mai karɓa vs mafi munin hanya.',
    res_recipient:'Mai karɓa yana karɓa', res_receives:'Karɓa', res_fee:'Jimlar Kuɗi', res_settle:'Lokaci', res_reliability:'Dogaro',
    res_recommended:'SHAWARWA', res_best_cost:'Mafi Kyawun Farashi', res_fastest:'Mafi Sauri',
    res_fxrate:'Farashin FX', res_converted:'An Canza',
    ai_title:'Panel na Bayanin AI', ai_sub:'Injin Hankali na RouteWise', ai_demo:'Yanayin Demo',
    ai_loading:'Ana nazari da hankali na AI...', ai_cost:'Amfanin Farashi', ai_speed:'Sauri', ai_reliability:'Dogaro',
    risk_title:'Nazarin Haɗarin Ma\'amala', risk_low:'Ƙarancin Haɗari', risk_medium:'Haɗarin Matsakaici', risk_high:'Babban Haɗari',
    risk_stable:'Hanya mai ɗorewa', risk_moderate:'Canjin da ya dace', risk_volatile:'Babban canjin FX',
    learn_title:'Game da Wannan Hanya', learn_btn:'Koyo Ƙari', learn_close:'Rufe',
    calc_title:'Lissafin Ajiyar Shekara-shekara na SME', calc_sub:'Duba adadin da RouteWise ke adanawa wa kasuwancinka a kowace shekara',
    calc_monthly:'Adadin canja wurin kuɗi na wata-wata (USD)', calc_result:'Adadin ajiyar da ake tsammani a shekara', calc_peryear:'/shekara',
    calc_btn:'Lissafa Ajiya',
    dash_label:'Allon Nazari', dash_title:'Hankali na Biyan Kuɗi', dash_sub:'Nazarin aikin hanya da tarihin gwaji.',
    dash_total:'Jimlar Gwaji', dash_savings:'Ajiyar Matsakaici (USD)', dash_score:'Maki Hanya na Sama', dash_settle:'Matsakaicin Lokaci',
    dash_recent:'Gwaje-gwaje na Kwanan Nan', dash_amount:'Adadi', dash_corridor:'Hanya', dash_route:'Mafi Kyawun Hanya', dash_date:'Kwanan Wata',
    conf_high:'Sama', conf_medium:'Matsakaici', conf_low:'Ƙasa',
    footer_sub:'Hankali na biyan kuɗi na ƙasashen waje don ƴan kasuwa.',
    footer_disclaimer:'Gwaji ne kawai — ba a sarrafa biyan kuɗi na gaske.',
    csv_export:'Fitarwa CSV', chat_placeholder:'Yi tambaya game da hanyoyi, kuɗi, FX...',
    chat_title:'RouteWise AI', chat_sub:'Mataimaki na Hankali na Biyan Kuɗi',
  },
  ar: {
    nav_simulate:'محاكاة', nav_dashboard:'لوحة التحكم', nav_new_sim:'محاكاة جديدة', nav_history:'السجل',
    hero_badge:'ذكاء اتخاذ القرار في المدفوعات العابرة للحدود',
    hero_title1:'Route', hero_title2:'Wise',
    hero_sub:'توقف عن الدفع الزائد على التحويلات الدولية. يحلل RouteWise كل مسار دفع عبر 15 عملة للعثور على مسارك الأمثل — مما يوفر للشركات الصغيرة والمتوسطة آلاف الدولارات.',
    hero_built:'مبني كطبقة ذكاء قرار فوق البنية التحتية للمدفوعات مثل Interswitch.',
    hero_cta:'محاكاة الدفع', hero_analytics:'عرض التحليلات',
    prob_label:'المشكلة', prob_title:'تخسر الشركات الصغيرة والمتوسطة المليارات بسبب رسوم الدفع المخفية',
    prob_sub:'كل دفعة عابرة للحدود تتضمن فروق أسعار الصرف ورسوم ثابتة ونسبية ونوافذ تسوية متغيرة. بدون توجيه ذكي، تدفع الشركات عادةً 3-8٪ زائداً لكل معاملة.',
    steps_label:'كيف يعمل', steps_title:'من الإدخال إلى المسار الأمثل في ثوانٍ',
    step1_title:'أدخل المعاملة', step1_desc:'أدخل المبلغ وعملة المصدر والوجهة من 15 خياراً عالمياً.',
    step2_title:'تحليل المسار', step2_desc:'يقيّم المحرك 4 مسارات دفع في وقت واحد في الوقت الفعلي.',
    step3_title:'تقييم الذكاء الاصطناعي', step3_desc:'تُرتّب المسارات حسب التكلفة 50٪ والسرعة 30٪ والموثوقية 20٪.',
    step4_title:'المسار الأمثل', step4_desc:'احصل على أفضل مسار مع شرح الذكاء الاصطناعي ومقياس الثقة.',
    feat_label:'الميزات', feat_title:'مبني لذكاء المدفوعات',
    feat1_title:'15 عملة', feat1_desc:'NGN و USD و GBP و EUR و GHS و KES و ZAR و XOF و CAD و AUD و CNY و AED و INR و JPY و BRL.',
    feat2_title:'ذكاء صرف العملات', feat2_desc:'تحليل فروق الأسعار عبر جميع ممرات العملات العالمية.',
    feat3_title:'محرك السرعة مقابل التكلفة', feat3_desc:'التقييم الموزون يوازن بين وقت التسوية والتكلفة.',
    feat4_title:'توصيات الذكاء الاصطناعي', feat4_desc:'تشرح رؤى OpenAI سبب كون كل مسار هو الأمثل.',
    cta_badge:'Settle Faster & Save More.', cta_title:'هل أنت مستعد لتحسين مدفوعاتك؟',
    cta_sub:'ابدأ بمحاكاة مجانية. لا يلزم التسجيل. يغطي 15 عملة و4 مسارات دفع.',
    cta_btn:'محاكاة الدفع الآن',
    sim_label:'محاكي المدفوعات', sim_title:'ابحث عن مسارك الأمثل',
    sim_sub:'قارن جميع مسارات الدفع الأربعة عبر 15 عملة.',
    sim_amount:'المبلغ المراد إرساله', sim_from:'من', sim_to:'إلى',
    sim_btn:'محاكاة الدفع', sim_analyzing:'جار التحليل...', sim_corridor:'مسار الدفع',
    sim_marketrate:'سعر السوق الأوسط', sim_placeholder:'10,000',
    sim_ready_title:'جاهز للتحليل',
    sim_ready_sub:'أدخل تفاصيل معاملتك وانقر على محاكاة الدفع لرؤية المقارنة الكاملة.',
    res_title:'مقارنة المسارات', res_saving_by:'باختيار', res_save:'توفر',
    res_more:'أكثر في جيب المستفيد مقابل أسوأ مسار.',
    res_recipient:'يحصل المستفيد على', res_receives:'يحصل على', res_fee:'الرسوم الإجمالية', res_settle:'التسوية', res_reliability:'الموثوقية',
    res_recommended:'موصى به', res_best_cost:'أفضل تكلفة', res_fastest:'الأسرع',
    res_fxrate:'سعر الصرف', res_converted:'المحوّل',
    ai_title:'لوحة رؤى الذكاء الاصطناعي', ai_sub:'محرك ذكاء RouteWise', ai_demo:'وضع العرض التجريبي',
    ai_loading:'جار التحليل بذكاء اصطناعي...', ai_cost:'ميزة التكلفة', ai_speed:'السرعة', ai_reliability:'الموثوقية',
    risk_title:'تحليل مخاطر المعاملة', risk_low:'مخاطر منخفضة', risk_medium:'مخاطر متوسطة', risk_high:'مخاطر عالية',
    risk_stable:'ممر مستقر', risk_moderate:'تذبذب معتدل', risk_volatile:'تذبذب عملة عالٍ',
    learn_title:'حول هذا المسار', learn_btn:'تعلم المزيد', learn_close:'إغلاق',
    calc_title:'حاسبة المدخرات السنوية للشركات الصغيرة', calc_sub:'انظر كم يوفر RouteWise لعملك سنوياً',
    calc_monthly:'حجم التحويل الشهري (USD)', calc_result:'المدخرات السنوية المقدرة', calc_peryear:'/سنة',
    calc_btn:'احسب المدخرات',
    dash_label:'لوحة التحليلات', dash_title:'ذكاء المدفوعات', dash_sub:'تحليلات أداء المسار وسجل المحاكاة.',
    dash_total:'إجمالي المحاكاة', dash_savings:'متوسط المدخرات (USD)', dash_score:'أعلى نقاط المسار', dash_settle:'متوسط التسوية',
    dash_recent:'المحاكاة الأخيرة', dash_amount:'المبلغ', dash_corridor:'الممر', dash_route:'أفضل مسار', dash_date:'التاريخ',
    conf_high:'عالٍ', conf_medium:'متوسط', conf_low:'منخفض',
    footer_sub:'ذكاء المدفوعات العابرة للحدود للشركات الصغيرة.',
    footer_disclaimer:'محاكاة فقط — لا تتم معالجة مدفوعات حقيقية.',
    csv_export:'تصدير CSV', chat_placeholder:'اسأل عن المسارات والرسوم وأسعار الصرف...',
    chat_title:'RouteWise AI', chat_sub:'مساعد ذكاء المدفوعات',
  },
  fr: {
    nav_simulate:'Simuler', nav_dashboard:'Tableau de bord', nav_new_sim:'Nouvelle simulation', nav_history:'Historique',
    hero_badge:'Intelligence de décision pour paiements transfrontaliers',
    hero_title1:'Route', hero_title2:'Wise',
    hero_sub:'Arrêtez de surpayer vos transferts internationaux. RouteWise analyse chaque voie de paiement sur 15 devises pour trouver votre itinéraire optimal — économisant des milliers en frais et spreads FX.',
    hero_built:'Conçu comme une couche d\'intelligence de décision au-dessus de l\'infrastructure de paiement comme Interswitch.',
    hero_cta:'Simuler un paiement', hero_analytics:'Voir les analyses',
    prob_label:'Le problème', prob_title:'Les PME perdent des milliards à cause de frais cachés',
    prob_sub:'Chaque paiement transfrontalier implique des spreads de change, des frais fixes et variables. Sans routage intelligent, les entreprises surpaient généralement de 3 à 8 % par transaction.',
    steps_label:'Comment ça marche', steps_title:'De la saisie à l\'itinéraire optimal en quelques secondes',
    step1_title:'Saisir la transaction', step1_desc:'Entrez le montant, la devise source et la devise de destination parmi 15 options.',
    step2_title:'Analyse des voies', step2_desc:'Le moteur évalue 4 voies de paiement simultanément en temps réel.',
    step3_title:'Score IA', step3_desc:'Les voies sont classées par coût 50 %, vitesse 30 %, fiabilité 20 %.',
    step4_title:'Voie optimale', step4_desc:'Recevez la meilleure voie avec une explication IA et un indicateur de confiance.',
    feat_label:'Fonctionnalités', feat_title:'Conçu pour l\'intelligence de paiement',
    feat1_title:'15 devises', feat1_desc:'NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.',
    feat2_title:'Intelligence FX', feat2_desc:'Analyse des spreads en direct sur tous les corridors mondiaux.',
    feat3_title:'Moteur vitesse vs coût', feat3_desc:'Score pondéré équilibrant temps de règlement et coût.',
    feat4_title:'Recommandations IA', feat4_desc:'Les insights OpenAI expliquent pourquoi chaque voie est optimale.',
    cta_badge:'Get Settle Faster & Save More.', cta_title:'Prêt à optimiser vos paiements ?',
    cta_sub:'Commencez par une simulation gratuite. Sans inscription. Couvre 15 devises et 4 voies de paiement.',
    cta_btn:'Simuler maintenant',
    sim_label:'Simulateur de paiement', sim_title:'Trouvez votre voie optimale',
    sim_sub:'Comparez les 4 voies de paiement sur 15 devises.',
    sim_amount:'Montant à envoyer', sim_from:'De', sim_to:'À',
    sim_btn:'Simuler le paiement', sim_analyzing:'Analyse en cours...', sim_corridor:'voie de paiement',
    sim_marketrate:'Taux de marché médian', sim_placeholder:'10 000',
    sim_ready_title:'Prêt à analyser',
    sim_ready_sub:'Entrez les détails de votre transaction et cliquez sur Simuler le paiement.',
    res_title:'Comparaison des voies', res_saving_by:'En choisissant', res_save:'Vous économisez',
    res_more:'de plus dans la poche du destinataire vs la pire voie.',
    res_recipient:'Le destinataire reçoit', res_receives:'Reçoit', res_fee:'Frais totaux', res_settle:'Délai', res_reliability:'Fiabilité',
    res_recommended:'RECOMMANDÉ', res_best_cost:'Meilleur coût', res_fastest:'Le plus rapide',
    res_fxrate:'Taux FX', res_converted:'Converti',
    ai_title:'Panneau d\'insights IA', ai_sub:'Moteur d\'intelligence RouteWise', ai_demo:'Mode démo',
    ai_loading:'Analyse en cours avec l\'IA...', ai_cost:'Avantage coût', ai_speed:'Vitesse', ai_reliability:'Fiabilité',
    risk_title:'Analyse des risques de transaction', risk_low:'Risque faible', risk_medium:'Risque moyen', risk_high:'Risque élevé',
    risk_stable:'Corridor stable', risk_moderate:'Volatilité modérée', risk_volatile:'Forte volatilité FX',
    learn_title:'À propos de cette voie', learn_btn:'En savoir plus', learn_close:'Fermer',
    calc_title:'Calculateur d\'économies annuelles PME', calc_sub:'Voyez combien RouteWise économise pour votre entreprise par an',
    calc_monthly:'Volume mensuel de transfert (USD)', calc_result:'Économies annuelles estimées', calc_peryear:'/an',
    calc_btn:'Calculer les économies',
    dash_label:'Tableau de bord analytique', dash_title:'Intelligence de paiement', dash_sub:'Analyse de performance des voies et historique.',
    dash_total:'Total simulations', dash_savings:'Économies moy. (USD)', dash_score:'Meilleur score', dash_settle:'Délai moyen',
    dash_recent:'Simulations récentes', dash_amount:'Montant', dash_corridor:'Corridor', dash_route:'Meilleure voie', dash_date:'Date',
    conf_high:'Élevée', conf_medium:'Moyenne', conf_low:'Faible',
    footer_sub:'Intelligence de paiement transfrontalier pour PME.',
    footer_disclaimer:'Simulations uniquement — aucun paiement réel traité.',
    csv_export:'Exporter CSV', chat_placeholder:'Posez des questions sur les voies, frais, FX...',
    chat_title:'RouteWise AI', chat_sub:'Assistant intelligence de paiement',
  },
}
