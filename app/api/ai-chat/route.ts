import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const m = (message||'').toLowerCase()
  let reply = 'RouteWise analyzes 4 payment rails across 15 currencies using AI scoring: 50% cost, 30% speed, 20% reliability. Run a simulation to see live results!'
  if (m.includes('route')||m.includes('best')) reply = 'Direct API Settlement typically wins on most corridors — 0.8% spread vs 2.5% for bank transfers.'
  else if (m.includes('fee')||m.includes('cost')) reply = 'Fees by rail: Bank $15+0.5%, Wallet $5+1.0%, Card $0+2.5%, API $10+0.3%. API wins on larger amounts.'
  else if (m.includes('fast')||m.includes('settle')) reply = 'Settlement times: Direct API 1h, Wallet Transfer 2h, Card Processing 24h, Bank Transfer 48h.'
  else if (m.includes('currency')) reply = 'We support 15 currencies: NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.'
  return NextResponse.json({ reply })
}
