import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, User, ChevronDown, BarChart2, TrendingUp, Layers, Newspaper, Code, ShieldCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSupercharts: (symbol?: string) => void;
  onOpenAuth: () => void;
  onOpenBrokers: () => void;
  activeScreen: 'home' | 'supercharts';
  setActiveScreen: (screen: 'home' | 'supercharts') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSupercharts,
  onOpenAuth,
  onOpenBrokers,
  activeScreen,
  setActiveScreen
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'FR', name: 'Français' },
    { code: 'JA', name: '日本語' },
    { code: 'ZH', name: '简体中文' }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setShowLangMenu(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-[#1e222d] px-4 lg:px-6 h-16 flex items-center justify-between transition-colors">
      {/* Left Navigation & Brand Logo */}
      <div className="flex items-center space-x-6 lg:space-x-8" ref={dropdownRef}>
        {/* TradingView Stylized SVG Logo */}
        <button
          onClick={() => setActiveScreen('home')}
          aria-label="TradingView Home"
          className="flex items-center text-white focus:outline-none hover:opacity-90 cursor-pointer"
        >
          <svg className="h-6 w-9 fill-current" viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6 28H8.8L0 0h5.8l8.8 28zm10.7-17.7h-5.8L28 0h5.8l-8.5 10.3zm-3.5 17.7H16L24.8 0h5.8L21.8 28z" />
            <circle cx="32" cy="4" r="3.2" />
          </svg>
        </button>

        {/* Quick Search Bar (Ctrl+K) */}
        <div
          onClick={onOpenSearch}
          className="hidden md:flex items-center relative w-56 lg:w-64 cursor-pointer group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpenSearch()}
          aria-label="Search symbols, ideas, indicators (Ctrl+K)"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#787b86] group-hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <div className="w-full pl-9 pr-3 py-1.5 bg-[#1e222d]/80 hover:bg-[#2a2e39] text-sm text-gray-300 rounded-full border border-transparent hover:border-gray-600 focus:outline-none focus:border-[#2962ff] transition-all duration-150 flex items-center justify-between">
            <span className="text-gray-400 group-hover:text-gray-200">Search (Ctrl+K)</span>
            <kbd className="hidden lg:inline-block text-[10px] bg-[#2a2e39] text-gray-400 px-1.5 py-0.5 rounded border border-gray-700">⌘K</kbd>
          </div>
        </div>

        {/* Main Navigation Menu Links with Dropdowns */}
        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-medium text-gray-200 relative">
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
              className={`hover:text-white flex items-center gap-1 transition-colors py-2 ${activeDropdown === 'products' ? 'text-white' : ''}`}
            >
              Products
              <ChevronDown className={`w-3.5 h-3.5 text-[#787b86] transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-white' : ''}`} />
            </button>
            {activeDropdown === 'products' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50 divide-y divide-[#1e222d]">
                <div className="space-y-1 pb-2">
                  <button
                    onClick={() => {
                      onOpenSupercharts('BTCUSD');
                      setActiveDropdown(null);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200 group"
                  >
                    <BarChart2 className="w-4 h-4 text-[#2962ff] group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-white">Supercharts</div>
                      <div className="text-xs text-gray-400">Next-gen charting terminal</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      const el = document.getElementById('stocks');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200 group"
                  >
                    <Layers className="w-4 h-4 text-[#089981] group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-white">Screeners</div>
                      <div className="text-xs text-gray-400">Stocks, Crypto, ETFs, Forex</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      const el = document.getElementById('scripts');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200 group"
                  >
                    <Code className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-semibold text-white">Pine Script®</div>
                      <div className="text-xs text-gray-400">Custom indicators & strategies</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Community Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'community' ? null : 'community')}
              className={`hover:text-white flex items-center gap-1 transition-colors py-2 ${activeDropdown === 'community' ? 'text-white' : ''}`}
            >
              Community
              <ChevronDown className={`w-3.5 h-3.5 text-[#787b86] transition-transform duration-200 ${activeDropdown === 'community' ? 'rotate-180 text-white' : ''}`} />
            </button>
            {activeDropdown === 'community' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    const el = document.getElementById('community');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  <TrendingUp className="w-4 h-4 text-[#2962ff]" />
                  <div>
                    <div className="font-semibold text-white">Trading Ideas</div>
                    <div className="text-xs text-gray-400">Top trader setups & analyses</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    const el = document.getElementById('scripts');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  <Code className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">Community Scripts</div>
                    <div className="text-xs text-gray-400">100,000+ public indicators</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Markets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'markets' ? null : 'markets')}
              className={`hover:text-white flex items-center gap-1 transition-colors py-2 ${activeDropdown === 'markets' ? 'text-white' : ''}`}
            >
              Markets
              <ChevronDown className={`w-3.5 h-3.5 text-[#787b86] transition-transform duration-200 ${activeDropdown === 'markets' ? 'rotate-180 text-white' : ''}`} />
            </button>
            {activeDropdown === 'markets' && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
                <button
                  onClick={() => {
                    onOpenSupercharts('SPX');
                    setActiveDropdown(null);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  <span>Major Indices</span>
                  <span className="text-xs text-[#089981] font-mono">+0.41%</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSupercharts('BTCUSD');
                    setActiveDropdown(null);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  <span>Cryptocurrency</span>
                  <span className="text-xs text-[#089981] font-mono">+2.15%</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSupercharts('GC1!');
                    setActiveDropdown(null);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  <span>Commodities & Futures</span>
                  <span className="text-xs text-[#f23645] font-mono">−0.35%</span>
                </button>
              </div>
            )}
          </div>

          {/* Brokers Link */}
          <button
            onClick={() => {
              setActiveDropdown(null);
              onOpenBrokers();
            }}
            className="hover:text-white flex items-center gap-1 transition-colors py-2"
          >
            Brokers
          </button>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
              className={`hover:text-white flex items-center gap-1 transition-colors py-2 ${activeDropdown === 'more' ? 'text-white' : ''}`}
            >
              More
              <ChevronDown className={`w-3.5 h-3.5 text-[#787b86] transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180 text-white' : ''}`} />
            </button>
            {activeDropdown === 'more' && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
                <a
                  href="#space-mission"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  Space Mission (Polaris Dawn)
                </a>
                <a
                  href="#pricing"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  Pricing & Plans
                </a>
                <a
                  href="#mobile"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-3 py-2 text-left hover:bg-[#1e222d] rounded-lg text-sm text-gray-200"
                >
                  Desktop & Mobile Apps
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right Utility Buttons & Profile Actions */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        {/* Terminal toggle button if user is currently in Supercharts */}
        {activeScreen === 'supercharts' ? (
          <button
            onClick={() => setActiveScreen('home')}
            className="px-3 py-1.5 text-xs font-semibold rounded bg-[#1e222d] hover:bg-[#2a2e39] text-gray-200 transition-colors"
          >
            ← Back to Home
          </button>
        ) : (
          <button
            onClick={() => onOpenSupercharts('BTCUSD')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#131722] hover:bg-[#1e222d] border border-[#2a2e39] text-gray-300 hover:text-white transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#2962ff]" />
            <span>Supercharts</span>
          </button>
        )}

        {/* Search button on mobile */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-[#1e222d]"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            aria-label="Change Language"
            className="flex items-center space-x-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors py-1 px-2 rounded hover:bg-[#131722]"
          >
            <Globe className="w-4 h-4 text-gray-300" />
            <span className="text-xs font-semibold">{selectedLanguage}</span>
          </button>
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-1 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                    selectedLanguage === lang.code ? 'bg-[#2962ff] text-white font-semibold' : 'text-gray-300 hover:bg-[#1e222d]'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-[10px] opacity-75">{lang.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Avatar / Sign In Icon */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Sign In or User Account"
            className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-[#131722] transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl p-2 z-50">
              <div className="px-3 py-2 border-b border-[#1e222d]">
                <div className="text-xs font-semibold text-white">Guest Trader</div>
                <div className="text-[11px] text-gray-400">Paper Trading Active</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuth();
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-[#1e222d] rounded-md font-medium"
                >
                  Sign In / Create Account
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenSupercharts('BTCUSD');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-[#1e222d] rounded-md"
                >
                  My Watchlists
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenBrokers();
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-[#1e222d] rounded-md"
                >
                  Trading Accounts
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Signature Blue-to-Violet Gradient "Get started" Button */}
        <button
          onClick={onOpenAuth}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-[#0055ff] via-[#3366ff] to-[#7928ca] hover:opacity-95 shadow-[0_0_20px_rgba(41,98,255,0.4)] transition-all transform active:scale-95 whitespace-nowrap cursor-pointer"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
