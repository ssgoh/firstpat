import React, { useState } from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import { ActiveStock, IndicatorItem } from '../types';

interface MarketMoversAndIndicatorsProps {
  stocks: ActiveStock[];
  indicators: IndicatorItem[];
  onSelectStock: (stock: ActiveStock) => void;
  onSelectIndicator: (indicator: IndicatorItem) => void;
  onOpenSupercharts: (symbol: string) => void;
}

export const MarketMoversAndIndicators: React.FC<MarketMoversAndIndicatorsProps> = ({
  stocks,
  indicators,
  onSelectStock,
  onSelectIndicator,
  onOpenSupercharts
}) => {
  const [showAllStocks, setShowAllStocks] = useState(false);
  const [showAllIndicators, setShowAllIndicators] = useState(false);

  const displayedStocks = showAllStocks ? stocks : stocks.slice(0, 4);
  const displayedIndicators = showAllIndicators ? indicators : indicators.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 border-t border-[#1e222d]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Active US Stocks */}
        <div id="stocks">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Active US Stocks</h3>
            <button
              onClick={() => setShowAllStocks(!showAllStocks)}
              className="text-xs text-[#2962ff] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>{showAllStocks ? 'Show less' : 'See all most active'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-[#131722] rounded-xl border border-[#2a2e39] divide-y divide-[#1e222d] overflow-hidden">
            {displayedStocks.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              return (
                <div
                  key={stock.symbol}
                  onClick={() => {
                    onSelectStock(stock);
                    onOpenSupercharts(stock.symbol);
                  }}
                  className="p-3.5 flex items-center justify-between hover:bg-[#1a1e29] transition-colors cursor-pointer group"
                >
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-[#2962ff] transition-colors">
                      {stock.symbol}
                    </div>
                    <div className="text-xs text-[#787b86] mt-0.5">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-white tabular-nums">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `−${Math.abs(stock.changePercent).toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Featured Pine Script Indicators */}
        <div id="scripts">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Indicators and strategies</h3>
            <button
              onClick={() => setShowAllIndicators(!showAllIndicators)}
              className="text-xs text-[#2962ff] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>{showAllIndicators ? 'Show less' : 'See all indicators'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-[#131722] rounded-xl border border-[#2a2e39] divide-y divide-[#1e222d] overflow-hidden">
            {displayedIndicators.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectIndicator(item)}
                className="p-3.5 flex items-start justify-between hover:bg-[#1a1e29] transition-colors cursor-pointer group"
              >
                <div className="pr-3">
                  <div className="font-semibold text-sm text-white group-hover:text-[#2962ff] transition-colors line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#787b86] mt-1">
                    by {item.author} • {item.type}
                  </div>
                </div>
                <span className="text-xs bg-[#2a2e39] text-gray-300 px-2 py-0.5 rounded font-mono shrink-0 border border-gray-700/50 group-hover:border-blue-500/50 transition-colors">
                  {item.version}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
