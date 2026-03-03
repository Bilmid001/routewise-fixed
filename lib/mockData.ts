export type Route = {
  id: string; name: string; spread_percent: number; flat_fee: number;
  percentage_fee: number; average_settlement_hours: number; reliability_score: number;
}

export const MOCK_ROUTES: Route[] = [
  { id:'1', name:'Bank Transfer',        spread_percent:2.5, flat_fee:15, percentage_fee:0.5, average_settlement_hours:48, reliability_score:0.95 },
  { id:'2', name:'Wallet Transfer',       spread_percent:1.2, flat_fee:5,  percentage_fee:1.0, average_settlement_hours:2,  reliability_score:0.88 },
  { id:'3', name:'Card Processing',       spread_percent:3.0, flat_fee:0,  percentage_fee:2.5, average_settlement_hours:24, reliability_score:0.92 },
  { id:'4', name:'Direct API Settlement', spread_percent:0.8, flat_fee:10, percentage_fee:0.3, average_settlement_hours:1,  reliability_score:0.97 },
]

export const CURRENCIES = [
  { code:'NGN', name:'Nigerian Naira',      flag:'🇳🇬' },
  { code:'USD', name:'US Dollar',           flag:'🇺🇸' },
  { code:'GBP', name:'British Pound',       flag:'🇬🇧' },
  { code:'EUR', name:'Euro',                flag:'🇪🇺' },
  { code:'GHS', name:'Ghanaian Cedi',       flag:'🇬🇭' },
  { code:'KES', name:'Kenyan Shilling',     flag:'🇰🇪' },
  { code:'ZAR', name:'South African Rand',  flag:'🇿🇦' },
  { code:'XOF', name:'West African CFA',    flag:'🌍' },
  { code:'CAD', name:'Canadian Dollar',     flag:'🇨🇦' },
  { code:'AUD', name:'Australian Dollar',   flag:'🇦🇺' },
  { code:'CNY', name:'Chinese Yuan',        flag:'🇨🇳' },
  { code:'AED', name:'UAE Dirham',          flag:'🇦🇪' },
  { code:'INR', name:'Indian Rupee',        flag:'🇮🇳' },
  { code:'JPY', name:'Japanese Yen',        flag:'🇯🇵' },
  { code:'BRL', name:'Brazilian Real',      flag:'🇧🇷' },
]

export const FX_RATES: Record<string, number> = {
  'USD-NGN':1580,'NGN-USD':0.000633,
  'USD-GBP':0.787,'GBP-USD':1.270,
  'USD-EUR':0.921,'EUR-USD':1.086,
  'USD-GHS':15.8,'GHS-USD':0.0633,
  'USD-KES':129.5,'KES-USD':0.00772,
  'USD-ZAR':18.4,'ZAR-USD':0.0543,
  'USD-XOF':604,'XOF-USD':0.001656,
  'USD-CAD':1.368,'CAD-USD':0.731,
  'USD-AUD':1.521,'AUD-USD':0.658,
  'USD-CNY':7.24,'CNY-USD':0.138,
  'USD-AED':3.672,'AED-USD':0.272,
  'USD-INR':83.5,'INR-USD':0.01198,
  'USD-JPY':149.8,'JPY-USD':0.00668,
  'USD-BRL':4.97,'BRL-USD':0.201,
  'NGN-GBP':0.000498,'GBP-NGN':2007,
  'NGN-EUR':0.000583,'EUR-NGN':1715,
  'NGN-GHS':0.01,'GHS-NGN':100,
  'NGN-KES':0.082,'KES-NGN':12.2,
  'NGN-ZAR':0.01165,'ZAR-NGN':85.8,
  'NGN-AED':0.00233,'AED-NGN':430,
  'GBP-EUR':1.170,'EUR-GBP':0.855,
  'GBP-GHS':20.1,'GHS-GBP':0.0498,
  'AED-INR':22.7,'INR-AED':0.044,
  'CAD-NGN':1155,'NGN-CAD':0.000866,
  'AUD-NGN':1039,'NGN-AUD':0.000963,
  'CNY-NGN':218,'NGN-CNY':0.00459,
  'INR-NGN':18.9,'NGN-INR':0.0529,
  'JPY-NGN':10.55,'NGN-JPY':0.0948,
  'BRL-NGN':318,'NGN-BRL':0.00314,
  'XOF-NGN':2.61,'NGN-XOF':0.383,
}

export function getMarketRate(base: string, target: string): number {
  if (base === target) return 1
  const direct = FX_RATES[base + '-' + target]
  if (direct) return direct
  const toUsd = FX_RATES[base + '-USD']
  const fromUsd = FX_RATES['USD-' + target]
  if (toUsd && fromUsd) return toUsd * fromUsd
  return 1
}

export const TICKER_PAIRS = [
  { pair:'USD/NGN', base:'USD', target:'NGN' },
  { pair:'GBP/NGN', base:'GBP', target:'NGN' },
  { pair:'EUR/NGN', base:'EUR', target:'NGN' },
  { pair:'USD/GHS', base:'USD', target:'GHS' },
  { pair:'USD/KES', base:'USD', target:'KES' },
  { pair:'GBP/USD', base:'GBP', target:'USD' },
  { pair:'EUR/USD', base:'EUR', target:'USD' },
  { pair:'USD/AED', base:'USD', target:'AED' },
  { pair:'USD/INR', base:'USD', target:'INR' },
  { pair:'USD/JPY', base:'USD', target:'JPY' },
  { pair:'USD/ZAR', base:'USD', target:'ZAR' },
  { pair:'USD/CAD', base:'USD', target:'CAD' },
  { pair:'USD/CNY', base:'USD', target:'CNY' },
  { pair:'USD/BRL', base:'USD', target:'BRL' },
  { pair:'XOF/USD', base:'XOF', target:'USD' },
]

export const MOCK_SIMULATIONS = [
  { id:'1', amount:10000, source_currency:'NGN', destination_currency:'USD', best_route:'Direct API Settlement', savings_amount:45.2,  created_at:'2025-01-15T10:00:00Z' },
  { id:'2', amount:5000,  source_currency:'USD', destination_currency:'GBP', best_route:'Direct API Settlement', savings_amount:32.1,  created_at:'2025-01-16T11:00:00Z' },
  { id:'3', amount:25000, source_currency:'GBP', destination_currency:'NGN', best_route:'Wallet Transfer',       savings_amount:120.5, created_at:'2025-01-17T09:00:00Z' },
  { id:'4', amount:8000,  source_currency:'EUR', destination_currency:'USD', best_route:'Direct API Settlement', savings_amount:28.9,  created_at:'2025-01-18T14:00:00Z' },
  { id:'5', amount:15000, source_currency:'USD', destination_currency:'NGN', best_route:'Direct API Settlement', savings_amount:89.3,  created_at:'2025-01-19T16:00:00Z' },
  { id:'6', amount:3000,  source_currency:'NGN', destination_currency:'EUR', best_route:'Wallet Transfer',       savings_amount:15.7,  created_at:'2025-01-20T08:00:00Z' },
  { id:'7', amount:12000, source_currency:'GBP', destination_currency:'USD', best_route:'Direct API Settlement', savings_amount:67.4,  created_at:'2025-01-21T13:00:00Z' },
]
