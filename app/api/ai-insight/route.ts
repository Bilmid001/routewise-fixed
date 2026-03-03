import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { routes, bestRoute, sourceCurrency, destinationCurrency, amount } = body

    const routeSummary = routes
      .map((r: any, i: number) =>
        `${i + 1}. ${r.name}: Final received = ${r.finalReceived.toFixed(2)} ${destinationCurrency}, ` +
        `Fee = ${r.totalFee.toFixed(2)} ${sourceCurrency}, ` +
        `Settlement = ${r.settlementHours}h, ` +
        `Reliability = ${(r.reliabilityScore * 100).toFixed(0)}%, ` +
        `Score = ${r.score.toFixed(3)}`
      )
      .join('\n')

    const prompt = `You are a fintech routing intelligence assistant.
A business wants to send ${amount} ${sourceCurrency} to ${destinationCurrency}.

Route analysis results:
${routeSummary}

Top-ranked route: ${bestRoute.name}
- Final received: ${bestRoute.finalReceived.toFixed(2)} ${destinationCurrency}
- Total fee: ${bestRoute.totalFee.toFixed(2)} ${sourceCurrency}  
- FX rate applied: ${bestRoute.fxAdjustedRate.toFixed(4)}
- Settlement time: ${bestRoute.settlementHours} hours
- Reliability: ${(bestRoute.reliabilityScore * 100).toFixed(0)}%
- Overall score: ${bestRoute.score.toFixed(3)}

Given these routes with cost, settlement time and reliability, explain in 2 concise sentences why the top-ranked route is optimal. Focus on cost advantage, speed reasoning, and briefly mention risk/reliability.`

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey || apiKey === 'your_openai_api_key') {
      // Return a mock AI response if no API key
      const savings = bestRoute.finalReceived - Math.min(...routes.map((r: any) => r.finalReceived))
      return NextResponse.json({
        insight: `${bestRoute.name} emerges as the optimal route by delivering the highest final amount of ${bestRoute.finalReceived.toFixed(2)} ${destinationCurrency} through its industry-leading low FX spread of ${bestRoute.fxAdjustedRate.toFixed(4)}, saving your business approximately ${savings.toFixed(2)} compared to the least efficient alternative. With a ${bestRoute.settlementHours}-hour settlement window and ${(bestRoute.reliabilityScore * 100).toFixed(0)}% reliability score, it strikes the perfect balance between cost efficiency, speed, and transaction certainty for cross-border SME payments.`,
        isDemo: true,
      })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const insight = data.choices[0]?.message?.content ?? 'Unable to generate insight.'

    return NextResponse.json({ insight, isDemo: false })
  } catch (error) {
    console.error('AI insight error:', error)
    return NextResponse.json({
      insight: 'AI insight temporarily unavailable. Please check your OpenAI API key configuration.',
      isDemo: true,
    })
  }
}
