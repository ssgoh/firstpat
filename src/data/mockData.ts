import { TickerData, CommunityIdea, ActiveStock, IndicatorItem, BrokerItem, CandlePoint } from '../types';

export const INITIAL_TICKERS: TickerData[] = [
  {
    symbol: 'S&P 500',
    name: 'S&P 500 Index',
    tickerCode: 'SPX',
    price: 5864.67,
    change: 23.95,
    changePercent: 0.41,
    high24h: 5878.20,
    low24h: 5840.10,
    volume: '2.84B',
    currency: 'USD',
    category: 'summary',
    sparkline: [5830, 5835, 5845, 5840, 5855, 5850, 5860, 5864.67]
  },
  {
    symbol: 'Nasdaq 100',
    name: 'Nasdaq 100 Index',
    tickerCode: 'NDX',
    price: 20381.18,
    change: 127.40,
    changePercent: 0.63,
    high24h: 20450.00,
    low24h: 20250.30,
    volume: '3.12B',
    currency: 'USD',
    category: 'summary',
    sparkline: [20210, 20240, 20290, 20270, 20330, 20350, 20381.18]
  },
  {
    symbol: 'Bitcoin',
    name: 'Bitcoin / US Dollar',
    tickerCode: 'BTCUSD',
    price: 85420.00,
    change: 1798.50,
    changePercent: 2.15,
    high24h: 86100.00,
    low24h: 83200.00,
    volume: '42.8B',
    currency: 'USD',
    category: 'summary',
    sparkline: [83100, 83600, 84200, 83900, 84800, 85100, 85420.00]
  },
  {
    symbol: 'Gold',
    name: 'Gold Futures',
    tickerCode: 'GC1!',
    price: 4138.50,
    change: -14.50,
    changePercent: -0.35,
    high24h: 4165.00,
    low24h: 4130.00,
    volume: '185K',
    currency: 'USD',
    category: 'summary',
    sparkline: [4160, 4155, 4148, 4152, 4140, 4135, 4138.50]
  },
  {
    symbol: 'US Dollar',
    name: 'US Dollar Currency Index',
    tickerCode: 'DXY',
    price: 103.88,
    change: 0.12,
    changePercent: 0.12,
    high24h: 104.05,
    low24h: 103.65,
    volume: '1.2M',
    currency: 'USD',
    category: 'summary',
    sparkline: [103.70, 103.75, 103.80, 103.78, 103.85, 103.88]
  },
  {
    symbol: 'Crude Oil',
    name: 'Crude Oil WTI Futures',
    tickerCode: 'CL1!',
    price: 71.24,
    change: -0.60,
    changePercent: -0.84,
    high24h: 72.40,
    low24h: 70.90,
    volume: '410K',
    currency: 'USD',
    category: 'summary',
    sparkline: [72.10, 71.90, 71.70, 71.85, 71.40, 71.10, 71.24]
  },
  // Indices
  {
    symbol: 'Dow Jones',
    name: 'Dow Jones Industrial Average',
    tickerCode: 'DJI',
    price: 42352.75,
    change: 141.20,
    changePercent: 0.33,
    high24h: 42420.00,
    low24h: 42180.00,
    volume: '412M',
    currency: 'USD',
    category: 'indices',
    sparkline: [42190, 42240, 42290, 42310, 42352.75]
  },
  {
    symbol: 'Russell 2000',
    name: 'Russell 2000 Index',
    tickerCode: 'RUT',
    price: 2218.40,
    change: -12.10,
    changePercent: -0.54,
    high24h: 2235.00,
    low24h: 2210.00,
    volume: '1.1B',
    currency: 'USD',
    category: 'indices',
    sparkline: [2230, 2225, 2228, 2215, 2218.40]
  },
  // Crypto
  {
    symbol: 'Ethereum',
    name: 'Ethereum / US Dollar',
    tickerCode: 'ETHUSD',
    price: 3418.50,
    change: 74.20,
    changePercent: 2.22,
    high24h: 3460.00,
    low24h: 3320.00,
    volume: '18.4B',
    currency: 'USD',
    category: 'crypto',
    sparkline: [3320, 3360, 3390, 3380, 3418.50]
  },
  {
    symbol: 'Solana',
    name: 'Solana / US Dollar',
    tickerCode: 'SOLUSD',
    price: 184.60,
    change: 9.30,
    changePercent: 5.31,
    high24h: 188.00,
    low24h: 172.50,
    volume: '5.2B',
    currency: 'USD',
    category: 'crypto',
    sparkline: [173, 177, 181, 180, 184.60]
  },
  // Currencies
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    tickerCode: 'EURUSD',
    price: 1.0845,
    change: -0.0018,
    changePercent: -0.17,
    high24h: 1.0875,
    low24h: 1.0830,
    volume: '112B',
    currency: 'USD',
    category: 'currencies',
    sparkline: [1.0865, 1.0860, 1.0852, 1.0845]
  },
  {
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    tickerCode: 'USDJPY',
    price: 152.35,
    change: 0.42,
    changePercent: 0.28,
    high24h: 152.80,
    low24h: 151.70,
    volume: '95B',
    currency: 'JPY',
    category: 'currencies',
    sparkline: [151.8, 152.0, 152.2, 152.35]
  },
  // Futures
  {
    symbol: 'Natural Gas',
    name: 'Henry Hub Natural Gas',
    tickerCode: 'NG1!',
    price: 2.845,
    change: 0.065,
    changePercent: 2.34,
    high24h: 2.91,
    low24h: 2.76,
    volume: '120K',
    currency: 'USD',
    category: 'futures',
    sparkline: [2.76, 2.79, 2.82, 2.845]
  },
  {
    symbol: 'Silver',
    name: 'Silver Futures',
    tickerCode: 'SI1!',
    price: 33.42,
    change: -0.22,
    changePercent: -0.65,
    high24h: 33.90,
    low24h: 33.15,
    volume: '75K',
    currency: 'USD',
    category: 'futures',
    sparkline: [33.8, 33.6, 33.5, 33.42]
  }
];

export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: 'idea-btc-wave2',
    title: 'Bitcoin: Wave 2 Could Target $75,000',
    symbol: 'BTCUSD',
    direction: 'Short',
    author: 'Roman_Pavelko_EWA',
    authorInitials: 'RP',
    authorColor: 'bg-blue-600/40 text-blue-200',
    timestamp: 'Today',
    previewChartType: 'bitcoin',
    summary: 'Bitcoin appears to have completed a five-wave advance in wave 1. The current pullback is likely developing as wave 2, taking the form of a downward double zigzag.',
    fullAnalysis: `Key Technical Observations:
1. Elliott Wave Count: Wave ((1)) finished at the recent local high around $88,000. We are now experiencing a sub-wave ((2)) corrective cycle.
2. Fibonacci Retracement: The 0.5 and 0.618 golden ratio zones lie precisely between $76,400 and $73,800.
3. Liquidity Pool: Large clusters of resting stop-orders sit underneath the swing low at $75,200.
4. Strategy Invalidation: A daily close back above $87,500 invalidates this immediate corrective projection.
Risk/Reward Ratio: 3.4:1 with protective stop at $87,900 and targets at $75,500 then $72,800.`,
    timeframe: '4H',
    likes: 1248,
    commentsCount: 94,
    category: 'editors'
  },
  {
    id: 'idea-aapl-multitimeframe',
    title: 'AAPL | Flexible Time Frames, Clearer Entries',
    symbol: 'NASDAQ:AAPL',
    direction: 'Long',
    author: 'davekclinton76',
    authorInitials: 'DK',
    authorColor: 'bg-emerald-600/40 text-emerald-200',
    timestamp: '07:30',
    previewChartType: 'aapl',
    summary: "Today's review focused on being flexible when your edge doesn't appear on your preferred higher time frame, using multiple charts together and respecting key retracements.",
    fullAnalysis: `Execution Thesis:
1. Daily Context: Apple has formed a prolonged higher-low compression structure just above the 50-day exponential moving average ($228.40).
2. Intra-Day Microstructure: The 15-minute timeframe produced a clean displacement with rising volume, breaking out of the morning opening range.
3. Anchored VWAP: Price is holding firmly above the earnings-anchored volume weighted average price.
4. Profit Objectives: Target 1 at $242.00 previous swing high, Target 2 at $250.00 psychological resistance. Stop loss placed below $225.80.`,
    timeframe: '1D / 15m',
    likes: 842,
    commentsCount: 57,
    category: 'editors'
  },
  {
    id: 'idea-gold-fibonacci',
    title: 'Gold Trapped in Key Fibonacci Zone Before Next Move',
    symbol: 'OANDA:XAUUSD',
    direction: 'Long',
    author: 'marisakel',
    authorInitials: 'MK',
    authorColor: 'bg-amber-600/40 text-amber-200',
    timestamp: 'Yesterday',
    previewChartType: 'gold',
    summary: 'Macro & Technical Breakdown: Gold has recently experienced a corrective wave after hitting its major macro highs, transitioning into a multi-week accumulation zone.',
    fullAnalysis: `Precious Metals Macro Outlook:
1. Central Bank Accumulation: Sovereign reserve buyers continue purchasing bullion on dips below $4,120.
2. Technical Confluence: The descending channel lower boundary aligns with the 0.382 retracement of the broader monthly impulse leg.
3. Momentum Divergence: 4-hour RSI demonstrates clear hidden bullish divergence against price lows.
4. Key Levels: Resistance breakout required at $4,185 to initiate the next expansion towards $4,300+ in Q4.`,
    timeframe: '1D',
    likes: 1530,
    commentsCount: 112,
    category: 'editors'
  },
  {
    id: 'idea-nvda-breakout',
    title: 'NVDA: Blackwell Architecture Volume Inflow Confirmation',
    symbol: 'NASDAQ:NVDA',
    direction: 'Long',
    author: 'TechAnalyst_Pro',
    authorInitials: 'TA',
    authorColor: 'bg-purple-600/40 text-purple-200',
    timestamp: '2 days ago',
    previewChartType: 'nvda',
    summary: 'NVIDIA shares breaking out of a 6-week bull pennant with institutional block volume confirming continuation towards $160 level.',
    fullAnalysis: `Volume profile indicates zero overhead resistance past $144. High probability continuation setup.`,
    timeframe: '1D',
    likes: 980,
    commentsCount: 68,
    category: 'popular'
  }
];

export const ACTIVE_US_STOCKS: ActiveStock[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 141.54,
    changePercent: 2.24,
    volume: '54.2M',
    marketCap: '3.47T'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 219.57,
    changePercent: -1.45,
    volume: '68.9M',
    marketCap: '698B'
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    price: 156.25,
    changePercent: 0.88,
    volume: '32.1M',
    marketCap: '253B'
  },
  {
    symbol: 'MU',
    name: 'Micron Technology, Inc.',
    price: 102.10,
    changePercent: 3.12,
    volume: '21.5M',
    marketCap: '113B'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 231.85,
    changePercent: 1.15,
    volume: '44.8M',
    marketCap: '3.52T'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 428.12,
    changePercent: 0.45,
    volume: '18.9M',
    marketCap: '3.18T'
  }
];

export const INDICATORS_AND_STRATEGIES: IndicatorItem[] = [
  {
    id: 'ind-buyers-sellers',
    title: 'Buyers & Sellers Profile + Dynamic S/R',
    author: 'Zeiierman',
    type: 'Indicator',
    version: 'Pine v5',
    description: 'Calculates dynamic volume at bid/ask price levels and constructs multi-timeframe Support and Resistance zones automatically.',
    likes: 14200,
    codeSnippet: `//@version=5
indicator("Buyers & Sellers Profile + Dynamic S/R [Zeiierman]", overlay=true)

// Inputs
len = input.int(20, "Lookback Period", minval=5)
sens = input.float(1.5, "Sensitivity Multiplier")

// Volume delta estimation
volUp = close > open ? volume : 0
volDown = close < open ? volume : 0
delta = ta.cum(volUp - volDown)

// Dynamic support & resistance levels
highZone = ta.highest(high, len)
lowZone = ta.lowest(low, len)
midZone = math.avg(highZone, lowZone)

plot(highZone, "Dynamic Resistance", color=color.new(#f23645, 20), linewidth=2)
plot(lowZone, "Dynamic Support", color=color.new(#089981, 20), linewidth=2)
plot(midZone, "Equilibrium", color=color.new(#2962ff, 50), style=plot.style_circles)`
  },
  {
    id: 'ind-redk-stop',
    title: 'RedK Multi-Modal TrailingStop (RedK MMTStop)',
    author: 'RedKTrader',
    type: 'Indicator',
    version: 'Pine v5',
    description: 'An adaptive volatility trailing stop mechanism utilizing ATR and fractal pivots to lock in profits while avoiding early whipsaws.',
    likes: 9840,
    codeSnippet: `//@version=5
indicator("RedK Multi-Modal TrailingStop [RedKTrader]", overlay=true)

mult = input.float(2.0, "ATR Factor")
atrLen = input.int(14, "ATR Length")
atrVal = ta.atr(atrLen) * mult

var float trailStop = na
if close > nz(trailStop, close - atrVal)
    trailStop := math.max(nz(trailStop, 0), close - atrVal)
else
    trailStop := close + atrVal

plot(trailStop, "MMT Trailing Stop", color=close > trailStop ? #089981 : #f23645, linewidth=2)`
  },
  {
    id: 'ind-tasc-strategy',
    title: 'TASC 2026.10 A Low-Risk ETF-Trading Strategy',
    author: 'PineCodersTASC',
    type: 'Strategy',
    version: 'Pine v5',
    description: 'Published in Technical Analysis of Stocks & Commodities Oct 2026. Utilizes mean-reverting momentum filters for broad market ETFs.',
    likes: 6720,
    codeSnippet: `//@version=5
strategy("TASC 2026.10 Low-Risk ETF Strategy", overlay=true, initial_capital=100000)

fastEMA = ta.ema(close, 21)
slowEMA = ta.ema(close, 55)
rsiVal = ta.rsi(close, 14)

longCondition = ta.crossover(fastEMA, slowEMA) and rsiVal > 48
if (longCondition)
    strategy.entry("Long", strategy.long)

exitCondition = ta.crossunder(fastEMA, slowEMA) or rsiVal < 40
if (exitCondition)
    strategy.close("Long")`
  },
  {
    id: 'ind-boswaves-ribbon',
    title: 'Trend Target Ribbon [BOSWaves]',
    author: 'BOSWaves',
    type: 'Indicator',
    version: 'Pine v5',
    description: 'Color-coded exponential ribbon that visualizes trend alignment, compression phases, and momentum expansion triggers.',
    likes: 11500,
    codeSnippet: `//@version=5
indicator("Trend Target Ribbon [BOSWaves]", overlay=true)

e1 = ta.ema(close, 8)
e2 = ta.ema(close, 13)
e3 = ta.ema(close, 21)
e4 = ta.ema(close, 34)
e5 = ta.ema(close, 55)

trendColor = e1 > e5 ? color.new(#089981, 30) : color.new(#f23645, 30)
p1 = plot(e1, "EMA 8", color=trendColor)
p5 = plot(e5, "EMA 55", color=trendColor)
fill(p1, p5, color=trendColor, title="Ribbon Fill")`
  }
];

export const BROKERS: BrokerItem[] = [
  {
    id: 'broker-oanda',
    name: 'OANDA',
    badge: 'Featured',
    badgeType: 'blue',
    assetClass: 'Forex',
    rating: 4.5,
    ratingLabel: 'Great',
    description: 'Direct trading integration with institutional grade spreads and ultra-low latency execution.',
    spreads: 'From 0.6 pips',
    minDeposit: '$0',
    leverage: '1:50 (US) / 1:200 (Global)',
    regulators: ['CFTC', 'NFA', 'FCA', 'ASIC']
  },
  {
    id: 'broker-ninjatrader',
    name: 'NinjaTrader',
    badge: 'Verified',
    badgeType: 'zinc',
    assetClass: 'Futures',
    rating: 4.5,
    ratingLabel: 'Great',
    description: 'Premier futures broker with low day trading margins on CME, CBOT, NYMEX, and E-mini contracts.',
    spreads: '$0.09 micro / $0.59 standard',
    minDeposit: '$50',
    leverage: '$500 margin per ES',
    regulators: ['CFTC', 'NFA']
  },
  {
    id: 'broker-forexcom',
    name: 'FOREX.com',
    badge: 'Verified',
    badgeType: 'zinc',
    assetClass: 'Forex',
    rating: 4.5,
    ratingLabel: 'Great',
    description: 'Global leader in currency trading and indices with powerful API and native Supercharts support.',
    spreads: 'From 0.8 pips EUR/USD',
    minDeposit: '$100',
    leverage: '1:50',
    regulators: ['FCA', 'CFTC', 'NFA', 'IIROC']
  },
  {
    id: 'broker-okx',
    name: 'OKX',
    badge: 'Verified',
    badgeType: 'zinc',
    assetClass: 'Crypto',
    rating: 4.4,
    ratingLabel: 'Very Good',
    description: 'Leading cryptocurrency spot & perpetual futures exchange with deep order book liquidity and proof of reserves.',
    spreads: 'Maker 0.08% / Taker 0.10%',
    minDeposit: '$10',
    leverage: 'Up to 100x',
    regulators: ['VARA Dubai', 'CySEC EEA']
  }
];

// Helper to generate realistic candle bars for Supercharts terminal
export function generateCandles(basePrice: number, count: number = 60, volatility: number = 0.008): CandlePoint[] {
  const candles: CandlePoint[] = [];
  let currentPrice = basePrice;
  const now = Date.now();
  const stepMs = 4 * 60 * 60 * 1000; // 4-hour bars

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now - i * stepMs);
    const timeStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const change = (Math.random() - 0.48) * currentPrice * volatility;
    const open = currentPrice;
    const close = Math.max(open + change, open * 0.9);
    const high = Math.max(open, close) + Math.random() * currentPrice * (volatility * 0.7);
    const low = Math.min(open, close) - Math.random() * currentPrice * (volatility * 0.7);
    const volume = Math.floor(Math.random() * 500000 + 100000);

    candles.push({
      time: timeStr,
      timestamp: time.getTime(),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentPrice = close;
  }

  return candles;
}
