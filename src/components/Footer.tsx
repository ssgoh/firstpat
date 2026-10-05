import React from 'react';

interface FooterProps {
  onOpenSpaceMission: () => void;
  onOpenSupercharts: () => void;
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSpaceMission,
  onOpenSupercharts,
  onOpenAuth
}) => {
  return (
    <footer className="w-full bg-black border-t border-[#1e222d] text-[#787b86] pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Grid of Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-[#1e222d]">
          {/* Column 1: Products */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Products</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenSupercharts} className="hover:text-white transition-colors cursor-pointer text-left">
                  Supercharts
                </button>
              </li>
              <li>
                <a href="#stocks" className="hover:text-white transition-colors">
                  Stock Screener
                </a>
              </li>
              <li>
                <a href="#crypto" className="hover:text-white transition-colors">
                  Crypto Screener
                </a>
              </li>
              <li>
                <a href="#etfs" className="hover:text-white transition-colors">
                  ETF Screener
                </a>
              </li>
              <li>
                <a href="#heatmaps" className="hover:text-white transition-colors">
                  Stock Heatmap
                </a>
              </li>
              <li>
                <a href="#economic" className="hover:text-white transition-colors">
                  Economic Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Community */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Community</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#community" className="hover:text-white transition-colors">
                  Social network
                </a>
              </li>
              <li>
                <a href="#wall" className="hover:text-white transition-colors">
                  Wall of Love
                </a>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-white transition-colors cursor-pointer text-left">
                  Refer a friend
                </button>
              </li>
              <li>
                <a href="#creator" className="hover:text-white transition-colors">
                  Creator program
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-white transition-colors">
                  House Rules
                </a>
              </li>
              <li>
                <a href="#moderators" className="hover:text-white transition-colors">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Ideas & Pine */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Ideas &amp; Pine</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#community" className="hover:text-white transition-colors">
                  Trading Ideas
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition-colors">
                  Educational Ideas
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition-colors">
                  Editors&apos; picks
                </a>
              </li>
              <li>
                <a href="#scripts" className="hover:text-white transition-colors">
                  Pine Script®
                </a>
              </li>
              <li>
                <a href="#scripts" className="hover:text-white transition-colors">
                  Script Wizards
                </a>
              </li>
              <li>
                <a href="#scripts" className="hover:text-white transition-colors">
                  Pine Freelancers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Trading & Apps */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Trading &amp; Apps</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#desktop" className="hover:text-white transition-colors">
                  Desktop app
                </a>
              </li>
              <li>
                <a href="#mobile" className="hover:text-white transition-colors">
                  Mobile apps
                </a>
              </li>
              <li>
                <a href="#brokers" className="hover:text-white transition-colors">
                  Brokers
                </a>
              </li>
              <li>
                <a href="#brokers" className="hover:text-white transition-colors">
                  Compare Brokers
                </a>
              </li>
              <li>
                <a href="#the-leap" className="hover:text-white transition-colors">
                  The Leap
                </a>
              </li>
              <li>
                <button onClick={onOpenAuth} className="hover:text-white transition-colors cursor-pointer text-left">
                  Pricing &amp; Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Who we are
                </a>
              </li>
              <li>
                <button onClick={onOpenSpaceMission} className="hover:text-white transition-colors cursor-pointer text-left">
                  Space mission
                </button>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  TradingView Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#media-kit" className="hover:text-white transition-colors">
                  Media kit
                </a>
              </li>
              <li>
                <a href="#store" className="hover:text-white transition-colors">
                  Merch Store
                </a>
              </li>
            </ul>
          </div>

          {/* Column 6: Business & Tech */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Business</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#widgets" className="hover:text-white transition-colors">
                  Web Widgets
                </a>
              </li>
              <li>
                <a href="#charting-libs" className="hover:text-white transition-colors">
                  Charting libraries
                </a>
              </li>
              <li>
                <a href="#lightweight" className="hover:text-white transition-colors">
                  Lightweight Charts™
                </a>
              </li>
              <li>
                <a href="#advanced-charts" className="hover:text-white transition-colors">
                  Advanced Charts
                </a>
              </li>
              <li>
                <a href="#partner" className="hover:text-white transition-colors">
                  Partner program
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">
                  Security &amp; Bug Bounty
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Made by humans, Social links, Copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <svg className="h-5 w-7 fill-current text-white" viewBox="0 0 36 28">
              <path d="M14.6 28H8.8L0 0h5.8l8.8 28zm10.7-17.7h-5.8L28 0h5.8l-8.5 10.3zm-3.5 17.7H16L24.8 0h5.8L21.8 28z" />
            </svg>
            <span className="text-white font-medium">Made by humans</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-5 text-gray-400">
            <a
              href="https://x.com/tradingview"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@tradingview"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/tradingview"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/tradingview"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Disclaimers & Copyright Attribution */}
        <div className="mt-6 text-[11px] leading-relaxed text-zinc-600">
          Select market data provided by <a href="#ice" className="underline hover:text-zinc-400">ICE Data Services</a>. Select reference data provided by FactSet. Copyright © 2026 FactSet Research Systems Inc. Copyright © 2026, American Bankers Association. CUSIP Database provided by FactSet Research Systems Inc. All rights reserved. SEC filings and other documents provided by Quartr. © 2026 TradingView, Inc.
        </div>
      </div>
    </footer>
  );
};
