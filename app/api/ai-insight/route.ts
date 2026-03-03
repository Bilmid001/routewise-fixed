import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { routes, bestRoute, sourceCurrency, destinationCurrency, amount } = await req.json()
    const summary = routes.map((r: any, i: number) =>
      `${i+1}. ${r.name}: receives=${r.finalReceived.toFixed(2)} ${destinationCurrency}, fee=${r.totalFee.toFixed(2)}, settlement=${r.settlementHours}h, reliability=${(r.reliabilityScore*100).toFixed(0)}%, score=${r.score.toFixed(3)}`
    ).join('\n')
    const prompt = `You are a fintech routing intelligence assistant. A business wants to send ${amount} ${sourceCurrency} to ${destinationCurrency}.\n\nRoutes:\n${summary}\n\nTop route: ${bestRoute.name} (score: ${bestRoute.score.toFixed(3)}, receives: ${bestRoute.finalReceived.toFixed(2)} ${destinationCurrency}, settlement: ${bestRoute.settlementHours}h, reliability: ${(bestRoute.reliabilityScore*100).toFixed(0)}%)\n\nIn exactly 2 concise sentences, explain why this route is optimal. Mention cost advantage, speed, and reliability/risk.`
    const key = process.env.OPENAI_API_KEY
    if (!key || key === 'your_openai_api_key') {
      const savings = bestRoute.finalReceived - Math.min(...routes.map((r: any) => r.finalReceived))
      return NextResponse.json({
        insight: `${bestRoute.name} delivers the highest recipient value of ${bestRoute.finalReceived.toFixed(2)} ${destinationCurrency} by applying the lowest FX spread, saving approximately ${savings.toFixed(2)} ${destinationCurrency} over the least efficient route. With only ${bestRoute.settlementHours}-hour settlement and a ${(bestRoute.reliabilityScore*100).toFixed(0)}% reliability score, it provides the optimal balance of cost efficiency, speed, and transaction certainty.`,
        isDemo: true,
      })
    }
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: [{ role: 'user', content: prompt }], max_tokens: 200, temperature: 0.7 }),
    })
    const data = await res.json()
    return NextResponse.json({ insight: data.choices[0]?.message?.content ?? 'No insight generated.', isDemo: false })
  } catch {
    return NextResponse.json({ insight: 'AI insight temporarily unavailable.', isDemo: true })
  }
}
