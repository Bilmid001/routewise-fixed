import { Route } from './supabase'

export type RouteResult = {
  id: string
  name: string
  fxAdjustedRate: number
  convertedAmount: number
  totalFee: number
  finalReceived: number
  settlementHours: number
  reliabilityScore: number
  score: number
  isBestCost: boolean
  isFastest: boolean
}

export type SimulationResult = {
  routes: RouteResult[]
  bestRoute: RouteResult
  savings: number
  marketRate: number
}

export function calculateRoutes(
  amount: number,
  marketRate: number,
  routes: Route[]
): SimulationResult {
  const results: RouteResult[] = routes.map((route) => {
    const fxAdjustedRate = marketRate * (1 + route.spread_percent / 100)
    const convertedAmount = amount * fxAdjustedRate
    const totalFee = route.flat_fee + amount * (route.percentage_fee / 100)
    const finalReceived = convertedAmount - totalFee

    return {
      id: route.id,
      name: route.name,
      fxAdjustedRate,
      convertedAmount,
      totalFee,
      finalReceived,
      settlementHours: route.average_settlement_hours,
      reliabilityScore: route.reliability_score,
      score: 0,
      isBestCost: false,
      isFastest: false,
    }
  })

  const bestFinalReceived = Math.max(...results.map((r) => r.finalReceived))
  const fastestTime = Math.min(...results.map((r) => r.settlementHours))

  const scored = results.map((r) => {
    const costScore = bestFinalReceived / r.finalReceived
    const speedScore = fastestTime / r.settlementHours
    const score =
      0.5 * costScore + 0.3 * speedScore + 0.2 * r.reliabilityScore

    return {
      ...r,
      score,
      isBestCost: r.finalReceived === bestFinalReceived,
      isFastest: r.settlementHours === fastestTime,
    }
  })

  scored.sort((a, b) => b.score - a.score)

  const bestRoute = scored[0]
  const worstFinalReceived = Math.min(...scored.map((r) => r.finalReceived))
  const savings = bestRoute.finalReceived - worstFinalReceived

  return { routes: scored, bestRoute, savings, marketRate }
}
