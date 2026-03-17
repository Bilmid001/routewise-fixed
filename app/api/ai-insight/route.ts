import { NextRequest,NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { bestRoute }=await req.json()
  const insights:Record<string,string>={ 'Direct API Settlement':'Direct API Settlement wins by bypassing correspondent banks — tightest FX spread and real-time settlement.','Wallet Transfer':'Wallet Transfer is optimal here: competitive spread and rapid settlement.','Bank Transfer':'Bank Transfer is recommended — flat fee amortized at this size, strong SWIFT liquidity.','Card Processing':'Card Processing edges ahead with zero flat fee at this smaller amount.' }
  return NextResponse.json({ insight:insights[bestRoute]||'RouteWise recommends this route for the optimal balance of cost, speed, and reliability.' })
}
