import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { TickerData } from '../types';

interface MarketTickersBarProps {
  tickers: TickerData[];
  onSelectTicker: (ticker: TickerData) => void;
  onOpenSupercharts: (symbol: string) => void;
}

export const MarketTickersBar: React.FC<MarketTickersBarProps> = ({
  tickers,
  onSelectTicker,
  onOpenSupercharts
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'indices' | 'crypto' | 'currencies' | 'futures'>('summary');

  const tabs: { id: 'summary' | 'indices' | 'crypto' | 'currencies' | 'futures'; label: string }[] = [
    { id: 'summary', label: 'Market summary' },
    { id: 'indices', label: 'Major indices' },
    { id: 'crypto', label: 'Crypto market cap' },
    { id: 'currencies', label: 'Currencies' },
    { id: 'futures', label: 'Futures' }
  ];

  // Filter tickers based on category or fallback to summary
  const displayedTickers = activeTab === 'summary' 
    ? tickers.filter(t => t.category === 'summary')
    : tickers.filter(t => t.category === activeTab);

  const formatPrice = (ticker: TickerData) => {
    if (ticker.price < 10) return ticker.price.toFixed(3);
    if (ticker.price < 500) return ticker.price.toFixed(2);
    return ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <section className="w-full border-t border-b border-[#2a2e39] bg-black py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Market Section Header & Tabs */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e222d] mb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-6 text-sm font-semibold">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 whitespace-nowrap transition-colors relative cursor-pointer ${
                    isActive ? 'text-white' : 'text-[#787b86] hover:text-white'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white -mb-[13px]" />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => onOpenSupercharts('SPX')}
            className="text-xs text-[#2962ff] hover:underline whitespace-nowrap hidden sm:inline-flex items-center gap-1 cursor-pointer"
          >
            <span>See all major indices</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Live Ticker Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {displayedTickers.map((ticker) => {
            const isPositive = ticker.changePercent >= 0;
            return (
              <div
                key={ticker.tickerCode}
                onClick={() => {
                  onSelectTicker(ticker);
                  onOpenSupercharts(ticker.tickerCode);
                }}
                className="bg-[#131722] hover:bg-[#1e222d] p-3 rounded-lg border border-[#2a2e39]/60 hover:border-gray-600 transition-all cursor-pointer group"
                role="button"
                tabIndex={0}
              >
                <div className="flex justify-between items-start text-xs">
                  <span className="font-bold text-white group-hover:text-[#2962ff] transition-colors truncate pr-1">
                    {ticker.symbol}
                  </span>
                  <span className="text-[10px] text-[#787b86] font-mono shrink-0">
                    {ticker.tickerCode}
                  </span>
                </div>
                <div className="mt-2 text-base font-bold text-white tabular-nums tracking-tight">
                  {formatPrice(ticker)}
                </div>
                <div
                  className={`flex items-center text-xs font-semibold mt-0.5 tabular-nums ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  <span>{isPositive ? `+${ticker.changePercent.toFixed(2)}%` : `−${Math.abs(ticker.changePercent).toFixed(2)}%`}</span>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 ml-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 ml-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
