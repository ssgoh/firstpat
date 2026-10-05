import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, ArrowRight, BarChart2 } from 'lucide-react';
import { INITIAL_TICKERS, ACTIVE_US_STOCKS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'stocks' | 'crypto' | 'forex' | 'indices' | 'futures'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Aggregate searchable items
  const allItems = [
    ...INITIAL_TICKERS.map(t => ({
      code: t.tickerCode,
      name: t.name,
      exchange: t.category.toUpperCase(),
      price: t.price,
      changePercent: t.changePercent,
      category: t.category === 'summary' ? 'indices' : t.category
    })),
    ...ACTIVE_US_STOCKS.map(s => ({
      code: s.symbol,
      name: s.name,
      exchange: 'NASDAQ',
      price: s.price,
      changePercent: s.changePercent,
      category: 'stocks'
    }))
  ];

  // Deduplicate
  const uniqueItems = Array.from(new Map(allItems.map(item => [item.code, item])).values());

  const filteredItems = uniqueItems.filter(item => {
    const matchesQuery = item.code.toLowerCase().includes(query.toLowerCase()) || 
                         item.name.toLowerCase().includes(query.toLowerCase());
    if (!matchesQuery) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'stocks') return item.category === 'stocks';
    if (activeTab === 'crypto') return item.category === 'crypto';
    if (activeTab === 'forex') return item.category === 'currencies';
    if (activeTab === 'indices') return item.category === 'indices';
    if (activeTab === 'futures') return item.category === 'futures';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#1e222d] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, currency, or company..."
            autoFocus
            className="flex-1 bg-transparent text-white text-base focus:outline-none placeholder-gray-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787b86] hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-[#2a2e39] hover:bg-[#363a45] text-gray-300 px-2.5 py-1.5 rounded-lg border border-gray-700 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center space-x-2 px-4 py-2 border-b border-[#1e222d] bg-[#0c0e14] overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'forex', label: 'Forex' },
            { id: 'indices', label: 'Indices' },
            { id: 'futures', label: 'Futures' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#2962ff] text-white font-medium'
                  : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#1e222d] p-2 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#787b86]">
              No financial symbols matching &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map(item => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={item.code}
                  onClick={() => {
                    onSelectSymbol(item.code);
                    onClose();
                  }}
                  className="p-3 flex items-center justify-between hover:bg-[#1e222d] rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1e222d] group-hover:bg-[#2a2e39] flex items-center justify-center font-bold text-xs text-white">
                      {item.code.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white group-hover:text-[#2962ff] transition-colors">
                          {item.code}
                        </span>
                        <span className="text-[10px] bg-[#2a2e39] text-[#787b86] px-1.5 py-0.5 rounded font-mono">
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-[#787b86] line-clamp-1">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-white tabular-nums">
                      ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className={`text-xs font-semibold tabular-nums ${isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `−${Math.abs(item.changePercent).toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-[#0c0e14] border-t border-[#1e222d] flex items-center justify-between text-[11px] text-[#787b86]">
          <span>Select any symbol to launch interactive Supercharts</span>
          <span>TradingView Global Search</span>
        </div>
      </div>
    </div>
  );
};
