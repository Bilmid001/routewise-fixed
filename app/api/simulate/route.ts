import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ROUTES, getMarketRate } from '@/lib/mockData'
import { calculateRoutes } from '@/lib/calculations'

export async function POST(req: NextRequest) {
  const { amount, sourceCurrency, destinationCurrency } = await req.json()
  if (!amount||!sourceCurrency||!destinationCurrency) return NextResponse.json({error:'Missing fields'},{status:400})
  const marketRate = getMarketRate(sourceCurrency, destinationCurrency)
  const result = calculateRoutes(amount, marketRate, MOCK_ROUTES)
  return NextResponse.json({ amount, sourceCurrency, destinationCurrency, data: result })
}
