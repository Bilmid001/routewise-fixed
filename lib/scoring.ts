import type { RouteCalculation } from "./calculations";

export interface ScoredRoute extends RouteCalculation {
  costScore: number;
  speedScore: number;
  finalScore: number;
  rank: number;
}

export function scoreRoutes(calculations: RouteCalculation[]): ScoredRoute[] {
  const bestFinalReceived = Math.max(...calculations.map((c) => c.finalReceived));
  const fastestTime = Math.min(...calculations.map((c) => c.settlementHours));

  const scored: ScoredRoute[] = calculations.map((calc) => {
    const costScore = bestFinalReceived > 0 ? calc.finalReceived / bestFinalReceived : 0;
    const speedScore = calc.settlementHours > 0 ? fastestTime / calc.settlementHours : 0;
    const reliabilityScore = calc.route.reliability_score;

    const finalScore =
      0.5 * costScore + 0.3 * speedScore + 0.2 * reliabilityScore;

    return {
      ...calc,
      costScore,
      speedScore,
      finalScore,
      rank: 0,
    };
  });

  // Sort descending by finalScore, assign rank
  scored.sort((a, b) => b.finalScore - a.finalScore);
  scored.forEach((s, i) => {
    s.rank = i + 1;
  });

  return scored;
}
