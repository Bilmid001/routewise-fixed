-- RouteWise Database Schema
-- Run this in your Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Routes table
CREATE TABLE IF NOT EXISTS routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  spread_percent NUMERIC(5,2) NOT NULL,
  flat_fee NUMERIC(10,2) NOT NULL,
  percentage_fee NUMERIC(5,2) NOT NULL,
  average_settlement_hours INTEGER NOT NULL,
  reliability_score NUMERIC(3,2) NOT NULL CHECK (reliability_score >= 0 AND reliability_score <= 1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FX Rates table
CREATE TABLE IF NOT EXISTS fx_rates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  base_currency TEXT NOT NULL,
  target_currency TEXT NOT NULL,
  market_rate NUMERIC(12,6) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(base_currency, target_currency)
);

-- Simulations table
CREATE TABLE IF NOT EXISTS simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount NUMERIC(15,2) NOT NULL,
  source_currency TEXT NOT NULL,
  destination_currency TEXT NOT NULL,
  best_route TEXT NOT NULL,
  savings_amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed routes
INSERT INTO routes (name, spread_percent, flat_fee, percentage_fee, average_settlement_hours, reliability_score)
VALUES
  ('Bank Transfer', 2.5, 15, 0.5, 48, 0.95),
  ('Wallet Transfer', 1.2, 5, 1.0, 2, 0.88),
  ('Card Processing', 3.0, 0, 2.5, 24, 0.92),
  ('Direct API Settlement', 0.8, 10, 0.3, 1, 0.97)
ON CONFLICT DO NOTHING;

-- Seed FX rates
INSERT INTO fx_rates (base_currency, target_currency, market_rate)
VALUES
  ('USD', 'NGN', 1580),
  ('NGN', 'USD', 0.000633),
  ('USD', 'GBP', 0.787),
  ('GBP', 'USD', 1.270),
  ('USD', 'EUR', 0.921),
  ('EUR', 'USD', 1.086),
  ('NGN', 'GBP', 0.000498),
  ('GBP', 'NGN', 2007),
  ('NGN', 'EUR', 0.000583),
  ('EUR', 'NGN', 1715),
  ('GBP', 'EUR', 1.170),
  ('EUR', 'GBP', 0.855)
ON CONFLICT (base_currency, target_currency) DO UPDATE SET market_rate = EXCLUDED.market_rate;
