import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()
    const key = process.env.OPENAI_API_KEY

    const systemPrompt = `You are RouteWise AI, a friendly and expert fintech payment routing assistant. You help SMEs understand cross-border payment routes, FX rates, fees, and settlement times. You have deep knowledge about payment rails including Bank Transfer, Wallet Transfer, Card Processing, and Direct API Settlement. You know about currencies: NGN (Nigerian Naira), USD, GBP, EUR, GHS (Ghana Cedi), KES (Kenyan Shilling), ZAR (South African Rand), XOF (West African CFA), CAD, AUD, CNY, AED, INR, JPY, BRL. Keep answers concise, helpful, and professional. If asked about specific routing decisions, explain the trade-offs between cost, speed, and reliability.`

    if (!key || key === 'your_openai_api_key') {
      const lower = message.toLowerCase()
      let reply = ''
      if (lower.includes('best route') || lower.includes('which route')) {
        reply = 'Based on RouteWise analysis, Direct API Settlement is typically the best route — it has the lowest FX spread (0.8%), minimal fees, and settles in just 1 hour with 97% reliability. However, for smaller amounts where flat fees matter more, Wallet Transfer can be competitive.'
      } else if (lower.includes('fx') || lower.includes('exchange rate') || lower.includes('spread')) {
        reply = 'FX spread is the difference between the mid-market rate and the rate you actually get. RouteWise compares spreads across all routes: Direct API (0.8%), Wallet (1.2%), Bank Transfer (2.5%), Card Processing (3.0%). The lower the spread, the more your recipient receives.'
      } else if (lower.includes('bank transfer')) {
        reply = 'Bank Transfer has a 2.5% FX spread, $15 flat fee + 0.5% percentage fee, and takes 48 hours to settle. It has 95% reliability. Best for large amounts where speed is not critical.'
      } else if (lower.includes('wallet')) {
        reply = 'Wallet Transfer has a 1.2% FX spread, $5 flat fee + 1.0% percentage fee, and settles in 2 hours. Reliability is 88%. Great for mid-size transfers needing quick settlement.'
      } else if (lower.includes('card')) {
        reply = 'Card Processing has a 3.0% FX spread, no flat fee but 2.5% percentage fee, and takes 24 hours. Best for very small amounts since there is no flat fee, but the high percentage fee makes it expensive for large transfers.'
      } else if (lower.includes('api') || lower.includes('direct')) {
        reply = 'Direct API Settlement is the top-performing route: 0.8% FX spread, $10 flat fee + 0.3% percentage fee, 1-hour settlement, and 97% reliability. It wins on cost, speed, and reliability for most transfer amounts.'
      } else if (lower.includes('ngn') || lower.includes('nigeria') || lower.includes('naira')) {
        reply = 'For NGN corridors, RouteWise currently simulates rates at: NGN/USD ~0.000633, NGN/GBP ~0.000498, NGN/EUR ~0.000583. Direct API Settlement typically delivers the best value for Nigerian outbound payments.'
      } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('cheap')) {
        reply = 'Total cost = flat fee + (amount x percentage fee) + FX spread cost. For a $10,000 transfer, Direct API costs roughly $10 + $30 = $40 total vs Bank Transfer at $15 + $50 = $65. RouteWise shows you the exact breakdown for any amount.'
      } else if (lower.includes('fast') || lower.includes('speed') || lower.includes('quick') || lower.includes('settlement')) {
        reply = 'Settlement times: Direct API = 1 hour, Wallet Transfer = 2 hours, Card Processing = 24 hours, Bank Transfer = 48 hours. If speed is critical, Direct API is your best option — and it is also the cheapest!'
      } else if (lower.includes('reliable') || lower.includes('safe') || lower.includes('risk')) {
        reply = 'Reliability scores: Direct API = 97%, Bank Transfer = 95%, Card Processing = 92%, Wallet Transfer = 88%. All routes are simulated for demonstration. In production, reliability reflects historical uptime and transaction success rates.'
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('help')) {
        reply = 'Hello! I am RouteWise AI. I can help you understand payment routes, FX spreads, fees, settlement times, and currency corridors. Try asking: "Which route is best for sending $5000 to Ghana?" or "What is an FX spread?"'
      } else {
        reply = 'Great question! RouteWise analyzes 4 payment rails — Bank Transfer, Wallet Transfer, Card Processing, and Direct API Settlement — across 15 currencies. Each route is scored on cost (50%), speed (30%), and reliability (20%). Want me to explain any specific route or currency corridor?'
      }
      return NextResponse.json({ reply, isDemo: true })
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message },
    ]
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: 'gpt-3.5-turbo', messages, max_tokens: 250, temperature: 0.7 }),
    })
    const data = await res.json()
    return NextResponse.json({ reply: data.choices[0]?.message?.content ?? 'I could not generate a response.', isDemo: false })
  } catch {
    return NextResponse.json({ reply: 'Chat temporarily unavailable. Please try again.', isDemo: true })
  }
}
