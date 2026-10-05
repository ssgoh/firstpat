export interface TickerData {
  symbol: string;
  name: string;
  tickerCode: string;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  currency: string;
  category: 'summary' | 'indices' | 'crypto' | 'currencies' | 'futures';
  sparkline: number[];
}

export interface CommunityIdea {
  id: string;
  title: string;
  symbol: string;
  direction: 'Long' | 'Short' | 'Neutral';
  author: string;
  authorInitials: string;
  authorColor: string;
  timestamp: string;
  previewChartType: 'bitcoin' | 'aapl' | 'gold' | 'nvda' | 'generic';
  summary: string;
  fullAnalysis: string;
  timeframe: string;
  likes: number;
  commentsCount: number;
  category: 'editors' | 'popular' | 'more';
}

export interface ActiveStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

export interface IndicatorItem {
  id: string;
  title: string;
  author: string;
  type: 'Indicator' | 'Strategy';
  version: string;
  description: string;
  codeSnippet: string;
  likes: number;
}

export interface BrokerItem {
  id: string;
  name: string;
  badge: 'Featured' | 'Verified';
  badgeType: 'blue' | 'zinc';
  assetClass: string;
  rating: number;
  ratingLabel: string;
  description: string;
  spreads: string;
  minDeposit: string;
  leverage: string;
  regulators: string[];
}

export interface CandlePoint {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
