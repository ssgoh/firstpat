import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarketTickersBar } from './components/MarketTickersBar';
import { CommunityIdeasSection } from './components/CommunityIdeasSection';
import { MarketMoversAndIndicators } from './components/MarketMoversAndIndicators';
import { SupportedBrokersSection } from './components/SupportedBrokersSection';
import { Footer } from './components/Footer';
import { SuperchartsScreen } from './components/SuperchartsScreen';
import { SearchModal } from './components/SearchModal';
import { SpaceStoryModal } from './components/SpaceStoryModal';
import { IdeaModal } from './components/IdeaModal';
import { BrokerModal } from './components/BrokerModal';
import { IndicatorModal } from './components/IndicatorModal';
import { AuthModal } from './components/AuthModal';

import { 
  INITIAL_TICKERS, 
  COMMUNITY_IDEAS, 
  ACTIVE_US_STOCKS, 
  INDICATORS_AND_STRATEGIES, 
  BROKERS 
} from './data/mockData';
import { TickerData, CommunityIdea, ActiveStock, IndicatorItem, BrokerItem } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'supercharts'>('home');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('BTCUSD');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpaceStoryOpen, setIsSpaceStoryOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<CommunityIdea | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<BrokerItem | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorItem | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Live market state with micro-ticks
  const [tickers, setTickers] = useState<TickerData[]>(INITIAL_TICKERS);
  const [activeStocks, setActiveStocks] = useState<ActiveStock[]>(ACTIVE_US_STOCKS);

  // Global keyboard shortcut for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subtle real-time price fluctuation simulation (realistic market heartbeat)
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => {
        // Randomly tick 1 or 2 items per interval
        if (Math.random() > 0.4) return t;
        const delta = (Math.random() - 0.49) * 0.001 * t.price;
        const newPrice = Math.max(0.01, t.price + delta);
        const newPct = t.changePercent + (delta / t.price) * 10;
        return {
          ...t,
          price: Number(newPrice.toFixed(t.price > 100 ? 2 : 4)),
          changePercent: Number(newPct.toFixed(2))
        };
      }));

      setActiveStocks(prev => prev.map(s => {
        if (Math.random() > 0.3) return s;
        const delta = (Math.random() - 0.48) * 0.002 * s.price;
        const newPrice = Math.max(0.1, s.price + delta);
        const newPct = s.changePercent + (delta / s.price) * 10;
        return {
          ...s,
          price: Number(newPrice.toFixed(2)),
          changePercent: Number(newPct.toFixed(2))
        };
      }));
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleOpenSupercharts = (symbol?: string) => {
    if (symbol) {
      setSelectedSymbol(symbol);
    }
    setActiveScreen('supercharts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#2962ff] selection:text-white flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSupercharts={handleOpenSupercharts}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenBrokers={() => setSelectedBroker(BROKERS[0])}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />

      {/* Main View Router */}
      {activeScreen === 'home' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onGetStarted={() => setIsAuthOpen(true)}
            onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
          />

          {/* Live Market Tickers Bar */}
          <MarketTickersBar
            tickers={tickers}
            onSelectTicker={(ticker) => setSelectedSymbol(ticker.tickerCode)}
            onOpenSupercharts={handleOpenSupercharts}
          />

          {/* Community Ideas Section */}
          <CommunityIdeasSection
            ideas={COMMUNITY_IDEAS}
            onSelectIdea={(idea) => setSelectedIdea(idea)}
            onOpenSupercharts={handleOpenSupercharts}
          />

          {/* Market Movers & Pine Script Indicators */}
          <MarketMoversAndIndicators
            stocks={activeStocks}
            indicators={INDICATORS_AND_STRATEGIES}
            onSelectStock={(stock) => handleOpenSupercharts(stock.symbol)}
            onSelectIndicator={(indicator) => setSelectedIndicator(indicator)}
            onOpenSupercharts={handleOpenSupercharts}
          />

          {/* Supported Brokers Section */}
          <SupportedBrokersSection
            brokers={BROKERS}
            onSelectBroker={(broker) => setSelectedBroker(broker)}
          />

          {/* Comprehensive Footer */}
          <Footer
            onOpenSpaceMission={() => setIsSpaceStoryOpen(true)}
            onOpenSupercharts={() => handleOpenSupercharts('SPX')}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        </main>
      ) : (
        <SuperchartsScreen
          currentSymbol={selectedSymbol}
          onSelectSymbol={(sym) => setSelectedSymbol(sym)}
          onBackToHome={() => setActiveScreen('home')}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={(sym) => handleOpenSupercharts(sym)}
      />

      <SpaceStoryModal
        isOpen={isSpaceStoryOpen}
        onClose={() => setIsSpaceStoryOpen(false)}
        onOpenChart={(sym) => handleOpenSupercharts(sym)}
      />

      <IdeaModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onOpenSupercharts={handleOpenSupercharts}
      />

      <BrokerModal
        broker={selectedBroker}
        onClose={() => setSelectedBroker(null)}
        onConnectDemo={(name) => {
          // Connected demo
        }}
      />

      <IndicatorModal
        indicator={selectedIndicator}
        onClose={() => setSelectedIndicator(null)}
        onAddToChart={(indicator) => {
          setSelectedIndicator(null);
          handleOpenSupercharts(selectedSymbol);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(email) => {
          // Logged in
        }}
      />
    </div>
  );
}
