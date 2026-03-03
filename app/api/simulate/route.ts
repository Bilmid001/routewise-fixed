import { NextRequest, NextResponse } from 'next/server'
import { calculateRoutes } from '@/lib/calculations'
import { MOCK_ROUTES, getMarketRate } from '@/lib/mockData'

export async function POST(req: NextRequest) {
  try {
    const { amount, sourceCurrency, destinationCurrency } = await req.json()
    if (!amount || !sourceCurrency || !destinationCurrency)
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0)
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    const marketRate = getMarketRate(sourceCurrency, destinationCurrency)
    const result = calculateRoutes(num, marketRate, MOCK_ROUTES)
    return NextResponse.json({ success: true, data: result, sourceCurrency, destinationCurrency, amount: num })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
