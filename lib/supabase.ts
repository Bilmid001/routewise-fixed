import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Route = {
  id: string
  name: string
  spread_percent: number
  flat_fee: number
  percentage_fee: number
  average_settlement_hours: number
  reliability_score: number
}

export type FxRate = {
  id: string
  base_currency: string
  target_currency: string
  market_rate: number
}

export type Simulation = {
  id: string
  amount: number
  source_currency: string
  destination_currency: string
  best_route: string
  savings_amount: number
  created_at: string
}
