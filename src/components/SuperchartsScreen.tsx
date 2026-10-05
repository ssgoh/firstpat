import React, { useState, useMemo, useRef } from 'react';
import { 
  ArrowLeft, Search, ChevronDown, BarChart2, TrendingUp, TrendingDown,
  Activity, Layers, Sliders, Camera, Share2, Settings, Plus, Maximize2,
  Eye, EyeOff, Shield, RefreshCw, PenTool, Type, HelpCircle, Check
} from 'lucide-react';
import { generateCandles, INITIAL_TICKERS, ACTIVE_US_STOCKS } from '../data/mockData';
import { CandlePoint, TickerData } from '../types';

interface SuperchartsScreenProps {
  currentSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  onBackToHome: () => void;
  onOpenSearch: () => void;
}

export const SuperchartsScreen: React.FC<SuperchartsScreenProps> = ({
  currentSymbol,
  onSelectSymbol,
  onBackToHome,
  onOpenSearch
}) => {
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1W'>('4H');
  const [chartType, setChartType] = useState<'candles' | 'line' | 'area'>('candles');
  const [showEMA, setShowEMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandlePoint | null>(null);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);
  const [activeDrawingTool, setActiveDrawingTool] = useState<string>('crosshair');
  
  // Paper trading state
  const [paperBalance, setPaperBalance] = useState(100000);
  const [positions, setPositions] = useState<{ symbol: string; qty: number; entryPrice: number; type: 'Buy' | 'Sell' }[]>([]);
  const [tradeNotice, setTradeNotice] = useState<string | null>(null);

  // Find ticker data or synthesize
  const ticker = useMemo(() => {
    const found = INITIAL_TICKERS.find(t => t.tickerCode === currentSymbol) ||
                  ACTIVE_US_STOCKS.find(s => s.symbol === currentSymbol);
    if (found) {
      return {
        code: ('tickerCode' in found ? found.tickerCode : found.symbol),
        name: found.name,
        price: found.price,
        changePercent: found.changePercent
      };
    }
    return {
      code: currentSymbol,
      name: `${currentSymbol} Asset`,
      price: 150.00,
      changePercent: 1.2
    };
  }, [currentSymbol]);

  // Generate candle data
  const candles = useMemo(() => {
    return generateCandles(ticker.price, 45, 0.012);
  }, [ticker.price, currentSymbol, timeframe]);

  // Min and max for chart scaling
  const { minPrice, maxPrice, maxVolume } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let maxVol = 0;
    candles.forEach(c => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });
    // Add 2% padding
    const pad = (max - min) * 0.06;
    return {
      minPrice: min - pad,
      maxPrice: max + pad,
      maxVolume: maxVol
    };
  }, [candles]);

  const activeCandle = hoveredCandle || candles[candles.length - 1];

  // Paper trade action
  const executeTrade = (type: 'Buy' | 'Sell') => {
    const qty = 1;
    const cost = ticker.price * qty;
    if (type === 'Buy' && paperBalance < cost) {
      setTradeNotice('Insufficient paper cash balance');
      setTimeout(() => setTradeNotice(null), 2500);
      return;
    }
    if (type === 'Buy') {
      setPaperBalance(prev => prev - cost);
    } else {
      setPaperBalance(prev => prev + cost);
    }
    setPositions(prev => [{ symbol: ticker.code, qty, entryPrice: ticker.price, type }, ...prev]);
    setTradeNotice(`${type} 1 ${ticker.code} @ $${ticker.price.toFixed(2)} executed!`);
    setTimeout(() => setTradeNotice(null), 3000);
  };

  // SVG Chart bounds
  const svgWidth = 840;
  const svgHeight = 440;
  const chartHeight = svgHeight - 80; // reserve 80px for volume
  const candleWidth = (svgWidth - 60) / candles.length;

  const getY = (val: number) => {
    return chartHeight - ((val - minPrice) / (maxPrice - minPrice)) * chartHeight;
  };

  // Calculate EMA 21
  const emaPoints = useMemo(() => {
    const k = 2 / (14 + 1);
    let ema = candles[0].close;
    return candles.map((c, i) => {
      ema = c.close * k + ema * (1 - k);
      const x = i * candleWidth + candleWidth / 2;
      const y = getY(ema);
      return { x, y };
    });
  }, [candles, candleWidth, minPrice, maxPrice]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#131722] text-white overflow-hidden select-none">
      {/* Top Chart Toolbar */}
      <div className="h-12 border-b border-[#2a2e39] bg-[#131722] px-3 flex items-center justify-between text-xs overflow-x-auto no-scrollbar gap-2 shrink-0">
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1e222d] hover:bg-[#2a2e39] text-gray-300 hover:text-white font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* Symbol Selector */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1e222d] hover:bg-[#2a2e39] font-bold text-white transition-colors cursor-pointer"
          >
            <span className="text-[#2962ff]">{ticker.code}</span>
            <span className="text-gray-400 font-normal hidden md:inline truncate max-w-[120px]">{ticker.name}</span>
            <Search className="w-3.5 h-3.5 text-gray-400 ml-1" />
          </button>

          {/* Price & Change Tag */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono px-2 py-0.5 rounded bg-black/40 border border-[#2a2e39]">
            <span className="font-bold text-white">${ticker.price.toFixed(2)}</span>
            <span className={`text-[11px] font-semibold ${ticker.changePercent >= 0 ? 'text-[#089981]' : 'text-[#f23645]'}`}>
              {ticker.changePercent >= 0 ? `+${ticker.changePercent.toFixed(2)}%` : `${ticker.changePercent.toFixed(2)}%`}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[#2a2e39] mx-1" />

          {/* Timeframe buttons */}
          {(['15m', '1H', '4H', '1D', '1W'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-1 rounded transition-colors cursor-pointer font-medium ${
                timeframe === tf ? 'bg-[#2962ff] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {tf}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-[#2a2e39] mx-1" />

          {/* Chart Type */}
          <button
            onClick={() => setChartType(chartType === 'candles' ? 'line' : chartType === 'line' ? 'area' : 'candles')}
            className="px-2.5 py-1 rounded bg-[#1e222d] hover:bg-[#2a2e39] text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="capitalize">{chartType}</span>
          </button>

          {/* Indicators Toggle */}
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
              showEMA ? 'bg-[#1e222d] text-emerald-400 font-semibold' : 'text-gray-400 hover:text-white hover:bg-[#1e222d]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>EMA 21</span>
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {tradeNotice && (
            <span className="hidden md:inline-block px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800 text-[11px] text-emerald-300 animate-pulse font-mono">
              {tradeNotice}
            </span>
          )}

          <button
            onClick={() => setShowWatchlist(!showWatchlist)}
            className={`p-1.5 rounded transition-colors ${
              showWatchlist ? 'bg-[#2962ff] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1e222d]'
            }`}
            title="Toggle Watchlist & Order Panel"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Terminal Viewport */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Drawing Tools Column */}
        <aside className="w-11 border-r border-[#2a2e39] bg-[#131722] flex flex-col items-center py-2 space-y-1 text-gray-400 shrink-0">
          {[
            { id: 'crosshair', icon: Activity, title: 'Crosshair' },
            { id: 'trendline', icon: TrendingUp, title: 'Trendline' },
            { id: 'fibonacci', icon: Sliders, title: 'Fibonacci Retracement' },
            { id: 'brush', icon: PenTool, title: 'Brush / Drawing' },
            { id: 'text', icon: Type, title: 'Annotate Text' }
          ].map(tool => {
            const Icon = tool.icon;
            const isActive = activeDrawingTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveDrawingTool(tool.id)}
                title={tool.title}
                className={`w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer ${
                  isActive ? 'bg-[#2962ff] text-white' : 'hover:bg-[#1e222d] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </aside>

        {/* Center Interactive SVG Chart Canvas */}
        <div className="flex-1 flex flex-col bg-[#0b0e14] relative overflow-hidden">
          {/* OHLC Bar Info Header */}
          <div className="px-4 py-2 bg-[#131722]/80 border-b border-[#1e222d] flex items-center gap-4 text-xs font-mono text-gray-300 z-10 overflow-x-auto no-scrollbar">
            <span className="font-bold text-white">{ticker.code}</span>
            <span>O: <strong className="text-white">${activeCandle.open.toFixed(2)}</strong></span>
            <span>H: <strong className="text-white">${activeCandle.high.toFixed(2)}</strong></span>
            <span>L: <strong className="text-white">${activeCandle.low.toFixed(2)}</strong></span>
            <span>C: <strong className={activeCandle.close >= activeCandle.open ? 'text-[#089981]' : 'text-[#f23645]'}>
              ${activeCandle.close.toFixed(2)}
            </strong></span>
            <span>Vol: <strong className="text-white">{activeCandle.volume.toLocaleString()}</strong></span>
            <span className="text-[#787b86] ml-auto">{activeCandle.time}</span>
          </div>

          {/* SVG Canvas Area */}
          <div 
            className="flex-1 relative cursor-crosshair overflow-hidden"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setHoverX(x);
              setHoverY(y);

              // Find closest candle index
              const index = Math.min(
                Math.max(0, Math.floor(x / candleWidth)),
                candles.length - 1
              );
              setHoveredCandle(candles[index]);
            }}
            onMouseLeave={() => {
              setHoverX(null);
              setHoverY(null);
              setHoveredCandle(null);
            }}
          >
            <svg 
              className="w-full h-full"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              {/* Horizontal Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                const y = chartHeight * ratio;
                const priceAtY = maxPrice - ratio * (maxPrice - minPrice);
                return (
                  <g key={idx}>
                    <line x1="0" y1={y} x2={svgWidth} y2={y} stroke="#1e222d" strokeWidth="0.8" strokeDasharray="3 3" />
                    <text x={svgWidth - 55} y={y - 4} fill="#787b86" fontSize="10" fontFamily="monospace">
                      ${priceAtY.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars */}
              {showVolume && candles.map((c, i) => {
                const isGreen = c.close >= c.open;
                const x = i * candleWidth + 2;
                const width = Math.max(1, candleWidth - 3);
                const volHeight = (c.volume / maxVolume) * 65;
                const y = svgHeight - volHeight;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x}
                    y={y}
                    width={width}
                    height={volHeight}
                    fill={isGreen ? '#089981' : '#f23645'}
                    opacity="0.3"
                  />
                );
              })}

              {/* Chart Rendering */}
              {chartType === 'candles' && candles.map((c, i) => {
                const isGreen = c.close >= c.open;
                const color = isGreen ? '#089981' : '#f23645';
                const xCenter = i * candleWidth + candleWidth / 2;
                const openY = getY(c.open);
                const closeY = getY(c.close);
                const highY = getY(c.high);
                const lowY = getY(c.low);
                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(2, Math.abs(openY - closeY));
                const width = Math.max(2, candleWidth - 4);

                return (
                  <g key={`candle-${i}`}>
                    {/* Upper & lower wicks */}
                    <line x1={xCenter} y1={highY} x2={xCenter} y2={lowY} stroke={color} strokeWidth="1.2" />
                    {/* Candle body */}
                    <rect
                      x={xCenter - width / 2}
                      y={bodyTop}
                      width={width}
                      height={bodyHeight}
                      fill={color}
                    />
                  </g>
                );
              })}

              {/* Line or Area Chart alternative */}
              {(chartType === 'line' || chartType === 'area') && (
                <>
                  {chartType === 'area' && (
                    <polygon
                      points={`0,${chartHeight} ${candles.map((c, i) => `${i * candleWidth + candleWidth / 2},${getY(c.close)}`).join(' ')} ${candles.length * candleWidth},${chartHeight}`}
                      fill="url(#area-gradient)"
                      opacity="0.4"
                    />
                  )}
                  <polyline
                    fill="none"
                    stroke="#2962ff"
                    strokeWidth="2.5"
                    points={candles.map((c, i) => `${i * candleWidth + candleWidth / 2},${getY(c.close)}`).join(' ')}
                  />
                  <defs>
                    <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2962ff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#2962ff" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </>
              )}

              {/* EMA 21 Line */}
              {showEMA && (
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.6"
                  opacity="0.8"
                  points={emaPoints.map(p => `${p.x},${p.y}`).join(' ')}
                />
              )}

              {/* Current Price Line */}
              <line
                x1="0"
                y1={getY(ticker.price)}
                x2={svgWidth}
                y2={getY(ticker.price)}
                stroke="#2962ff"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <rect
                x={svgWidth - 60}
                y={getY(ticker.price) - 10}
                width="60"
                height="20"
                fill="#2962ff"
                rx="3"
              />
              <text
                x={svgWidth - 55}
                y={getY(ticker.price) + 4}
                fill="#ffffff"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ${ticker.price.toFixed(2)}
              </text>
            </svg>

            {/* Crosshair Overlay */}
            {hoverX !== null && hoverY !== null && (
              <>
                <div 
                  className="absolute top-0 bottom-0 border-l border-dashed border-gray-400 pointer-events-none z-20"
                  style={{ left: `${hoverX}px` }}
                />
                <div 
                  className="absolute left-0 right-0 border-t border-dashed border-gray-400 pointer-events-none z-20"
                  style={{ top: `${hoverY}px` }}
                />
              </>
            )}
          </div>

          {/* Bottom Time Range Selector */}
          <div className="h-8 bg-[#131722] border-t border-[#1e222d] px-3 flex items-center justify-between text-[11px] text-[#787b86]">
            <div className="flex items-center space-x-2">
              {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'ALL'].map(r => (
                <button
                  key={r}
                  className="hover:text-white px-1.5 py-0.5 rounded hover:bg-[#1e222d] transition-colors cursor-pointer"
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span>Timezone: UTC-4 (New York)</span>
              <span className="font-mono text-emerald-400">● Market Open</span>
            </div>
          </div>
        </div>

        {/* Right Watchlist & Paper Trading Drawer */}
        {showWatchlist && (
          <aside className="w-64 sm:w-72 border-l border-[#2a2e39] bg-[#131722] flex flex-col shrink-0">
            {/* Watchlist Header */}
            <div className="p-3 border-b border-[#1e222d] flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Watchlist</span>
              <button
                onClick={onOpenSearch}
                className="p-1 text-[#787b86] hover:text-white rounded hover:bg-[#1e222d]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Watchlist Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#1e222d]/60">
              {INITIAL_TICKERS.slice(0, 6).map((item) => {
                const isSelected = item.tickerCode === ticker.code;
                const isPos = item.changePercent >= 0;
                return (
                  <div
                    key={item.tickerCode}
                    onClick={() => onSelectSymbol(item.tickerCode)}
                    className={`p-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#1e222d] border-l-2 border-[#2962ff]' : 'hover:bg-[#181c27]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{item.tickerCode}</div>
                      <div className="text-[10px] text-[#787b86] truncate max-w-[110px]">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white tabular-nums font-mono">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className={`text-[10px] font-semibold tabular-nums font-mono ${isPos ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {isPos ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instant Paper Trading Box */}
            <div className="p-3 bg-[#0c0e14] border-t border-[#1e222d] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#787b86]">Paper Cash</span>
                <span className="font-bold text-white font-mono">${paperBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => executeTrade('Buy')}
                  className="py-2 bg-[#089981] hover:bg-[#07806c] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex flex-col items-center"
                >
                  <span>BUY / LONG</span>
                  <span className="text-[10px] font-mono opacity-80">${ticker.price.toFixed(2)}</span>
                </button>
                <button
                  onClick={() => executeTrade('Sell')}
                  className="py-2 bg-[#f23645] hover:bg-[#d62837] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex flex-col items-center"
                >
                  <span>SELL / SHORT</span>
                  <span className="text-[10px] font-mono opacity-80">${ticker.price.toFixed(2)}</span>
                </button>
              </div>

              {positions.length > 0 && (
                <div className="text-[10px] text-[#787b86] text-center">
                  Open Positions: {positions.length} active trade(s)
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
