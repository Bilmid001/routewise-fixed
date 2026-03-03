import { NextRequest, NextResponse } from 'next/server'
import { calculateRoutes } from '@/lib/calculations'
import { MOCK_ROUTES, getMarketRate } from '@/lib/mockData'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, sourceCurrency, destinationCurrency } = body

    if (!amount || !sourceCurrency || !destinationCurrency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const marketRate = getMarketRate(sourceCurrency, destinationCurrency)
    const result = calculateRoutes(numAmount, marketRate, MOCK_ROUTES)

    return NextResponse.json({
      success: true,
      data: result,
      sourceCurrency,
      destinationCurrency,
      amount: numAmount,
    })
  } catch (error) {
    console.error('Simulation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
