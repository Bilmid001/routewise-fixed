import { NextRequest,NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { message }=await req.json()
  const m=(message||'').toLowerCase()
  let reply='RouteWise analyzes 4 payment rails across 15 currencies — 50% cost, 30% speed, 20% reliability.'
  if(m.includes('route')||m.includes('best')) reply='Direct API Settlement typically wins — 0.8% spread vs 2.5% for bank transfers.'
  else if(m.includes('fee')||m.includes('cost')) reply='Fees: Bank $15+0.5%, Wallet $5+1.0%, Card $0+2.5%, API $10+0.3%.'
  else if(m.includes('fast')||m.includes('settle')) reply='Settlement: API 1h, Wallet 2h, Card 24h, Bank 48h.'
  else if(m.includes('currency')) reply='15 currencies: NGN, USD, GBP, EUR, GHS, KES, ZAR, XOF, CAD, AUD, CNY, AED, INR, JPY, BRL.'
  return NextResponse.json({ reply })
}
