import { Route, FxRate } from './supabase'

export const MOCK_ROUTES: Route[] = [
  {
    id: '1',
    name: 'Bank Transfer',
    spread_percent: 2.5,
    flat_fee: 15,
    percentage_fee: 0.5,
    average_settlement_hours: 48,
    reliability_score: 0.95,
  },
  {
    id: '2',
    name: 'Wallet Transfer',
    spread_percent: 1.2,
    flat_fee: 5,
    percentage_fee: 1.0,
    average_settlement_hours: 2,
    reliability_score: 0.88,
  },
  {
    id: '3',
    name: 'Card Processing',
    spread_percent: 3.0,
    flat_fee: 0,
    percentage_fee: 2.5,
    average_settlement_hours: 24,
    reliability_score: 0.92,
  },
  {
    id: '4',
    name: 'Direct API Settlement',
    spread_percent: 0.8,
    flat_fee: 10,
    percentage_fee: 0.3,
    average_settlement_hours: 1,
    reliability_score: 0.97,
  },
]

export const MOCK_FX_RATES: FxRate[] = [
  { id: '1', base_currency: 'USD', target_currency: 'NGN', market_rate: 1580 },
  { id: '2', base_currency: 'NGN', target_currency: 'USD', market_rate: 0.000633 },
  { id: '3', base_currency: 'USD', target_currency: 'GBP', market_rate: 0.787 },
  { id: '4', base_currency: 'GBP', target_currency: 'USD', market_rate: 1.270 },
  { id: '5', base_currency: 'USD', target_currency: 'EUR', market_rate: 0.921 },
  { id: '6', base_currency: 'EUR', target_currency: 'USD', market_rate: 1.086 },
  { id: '7', base_currency: 'NGN', target_currency: 'GBP', market_rate: 0.000498 },
  { id: '8', base_currency: 'GBP', target_currency: 'NGN', market_rate: 2007 },
  { id: '9', base_currency: 'NGN', target_currency: 'EUR', market_rate: 0.000583 },
  { id: '10', base_currency: 'EUR', target_currency: 'NGN', market_rate: 1715 },
  { id: '11', base_currency: 'GBP', target_currency: 'EUR', market_rate: 1.170 },
  { id: '12', base_currency: 'EUR', target_currency: 'GBP', market_rate: 0.855 },
]

export function getMarketRate(base: string, target: string): number {
  if (base === target) return 1
  const rate = MOCK_FX_RATES.find(
    (r) => r.base_currency === base && r.target_currency === target
  )
  return rate?.market_rate ?? 1
}

export const MOCK_SIMULATIONS = [
  { id: '1', amount: 10000, source_currency: 'NGN', destination_currency: 'USD', best_route: 'Direct API Settlement', savings_amount: 45.2, created_at: '2025-01-15T10:00:00Z' },
  { id: '2', amount: 5000, source_currency: 'USD', destination_currency: 'GBP', best_route: 'Direct API Settlement', savings_amount: 32.1, created_at: '2025-01-16T11:00:00Z' },
  { id: '3', amount: 25000, source_currency: 'GBP', destination_currency: 'NGN', best_route: 'Wallet Transfer', savings_amount: 120.5, created_at: '2025-01-17T09:00:00Z' },
  { id: '4', amount: 8000, source_currency: 'EUR', destination_currency: 'USD', best_route: 'Direct API Settlement', savings_amount: 28.9, created_at: '2025-01-18T14:00:00Z' },
  { id: '5', amount: 15000, source_currency: 'USD', destination_currency: 'NGN', best_route: 'Direct API Settlement', savings_amount: 89.3, created_at: '2025-01-19T16:00:00Z' },
  { id: '6', amount: 3000, source_currency: 'NGN', destination_currency: 'EUR', best_route: 'Wallet Transfer', savings_amount: 15.7, created_at: '2025-01-20T08:00:00Z' },
  { id: '7', amount: 12000, source_currency: 'GBP', destination_currency: 'USD', best_route: 'Direct API Settlement', savings_amount: 67.4, created_at: '2025-01-21T13:00:00Z' },
]
