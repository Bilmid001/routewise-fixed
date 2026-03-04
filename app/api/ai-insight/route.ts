import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { bestRoute, sourceCurrency, destinationCurrency } = await req.json()
  const insights: Record<string,string> = {
    'Direct API Settlement': 'Direct API Settlement wins by bypassing correspondent banks entirely — delivering the tightest FX spread and real-time settlement.',
    'Wallet Transfer': 'Wallet Transfer is optimal here: competitive spread and rapid settlement make it the smart choice for this corridor.',
    'Bank Transfer': 'Bank Transfer is recommended as the flat fee is well-amortized at this transaction size, with strong SWIFT liquidity on this corridor.',
    'Card Processing': 'Card Processing edges ahead with zero flat fee — the percentage structure works in your favour at this smaller amount.',
  }
  return NextResponse.json({ insight: insights[bestRoute] || 'RouteWise recommends this route for the optimal balance of cost, speed, and reliability.' })
}
