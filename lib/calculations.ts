import { Route } from './mockData'
export type RouteResult = { id:string;name:string;fxAdjustedRate:number;convertedAmount:number;totalFee:number;finalReceived:number;settlementHours:number;reliabilityScore:number;score:number;costScore:number;speedScore:number;isBestCost:boolean;isFastest:boolean;confidence:'high'|'medium'|'low' }
export type SimulationResult = { routes:RouteResult[];bestRoute:RouteResult;savings:number;marketRate:number;worstReceived:number }
export function calculateRoutes(amount:number,marketRate:number,routes:Route[]):SimulationResult {
  const raw = routes.map(r=>{
    const fxAdjustedRate=marketRate*(1+r.spread_percent/100)
    const convertedAmount=amount*fxAdjustedRate
    const totalFee=r.flat_fee+amount*(r.percentage_fee/100)
    const finalReceived=convertedAmount-totalFee
    return {id:r.id,name:r.name,fxAdjustedRate,convertedAmount,totalFee,finalReceived,settlementHours:r.average_settlement_hours,reliabilityScore:r.reliability_score,score:0,costScore:0,speedScore:0,isBestCost:false,isFastest:false,confidence:'medium' as const}
  })
  const bestFinal=Math.max(...raw.map(r=>r.finalReceived))
  const worstFinal=Math.min(...raw.map(r=>r.finalReceived))
  const fastestTime=Math.min(...raw.map(r=>r.settlementHours))
  const scored:RouteResult[]=raw.map(r=>{
    const costScore=bestFinal/r.finalReceived
    const speedScore=fastestTime/r.settlementHours
    const score=0.5*costScore+0.3*speedScore+0.2*r.reliabilityScore
    const confidence:RouteResult['confidence']=score>=0.85?'high':score>=0.65?'medium':'low'
    return{...r,score,costScore,speedScore,isBestCost:r.finalReceived===bestFinal,isFastest:r.settlementHours===fastestTime,confidence}
  })
  scored.sort((a,b)=>b.score-a.score)
  return{routes:scored,bestRoute:scored[0],savings:bestFinal-worstFinal,marketRate,worstReceived:worstFinal}
}
