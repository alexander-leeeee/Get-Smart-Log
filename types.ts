export type MarketType = 'SPOT' | 'FUTURES';
export type BinanceOrderType = 'LIMIT' | 'MARKET' | 'STOP' | 'STOP_MARKET' | 'TRAILING_STOP_MARKET' | 'POST_ONLY' | 'TAKE_PROFIT' | 'TAKE_PROFIT_MARKET' | 'LIQUIDATION' | 'TWAP' | 'REVERSE' | string;

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
  marketType?: MarketType;
  orderType?: BinanceOrderType;
}

export interface User {
  id: number | string;
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

export interface ExchangeConnection {
  id: string;
  exchange: 'Binance' | 'Bybit' | 'OKX' | 'KuCoin' | 'Bitget' | 'Other';
  name: string;
  apiKey: string; // Storing masked or full key depending on security requirements (demo: full)
  createdAt: string;
}

export type ViewState = 'HOME' | 'DASHBOARD' | 'JOURNAL' | 'TERMINAL' | 'RISK_CALC' | 'AI_ANALYSIS' | 'EXCHANGE_CONNECT' | 'SETTINGS';

export type Language = 'ru' | 'en' | 'ua';
