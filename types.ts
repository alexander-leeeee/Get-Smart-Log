export enum TradeDirection {
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export interface Trade {
  id: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  size: number;
  direction: TradeDirection;
  date: string;
  notes: string;
  pnl: number;
  fees?: number;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface RiskCalculationResult {
  positionSizeUnits: number;
  positionSizeMoney: number;
  riskAmount: number;
  potentialReward: number;
  riskRewardRatio: number;
}

export type ViewState = 'HOME' | 'DASHBOARD' | 'JOURNAL' | 'RISK_CALC' | 'AI_ANALYSIS' | 'SETTINGS';