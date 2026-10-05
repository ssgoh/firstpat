import React, { useState } from 'react';
import { X, ShieldCheck, Check, DollarSign, Award, ExternalLink, Zap } from 'lucide-react';
import { BrokerItem } from '../types';

interface BrokerModalProps {
  broker: BrokerItem | null;
  onClose: () => void;
  onConnectDemo: (brokerName: string) => void;
}

export const BrokerModal: React.FC<BrokerModalProps> = ({
  broker,
  onClose,
  onConnectDemo
}) => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  if (!broker) return null;

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      onConnectDemo(broker.name);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1e222d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1e222d] border border-[#2a2e39] flex items-center justify-center font-bold text-white text-lg">
              {broker.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{broker.name}</h3>
                <span className="text-[10px] bg-blue-900/40 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-800">
                  {broker.badge}
                </span>
              </div>
              <p className="text-xs text-[#787b86] mt-0.5">
                {broker.assetClass} • {broker.rating} ★ {broker.ratingLabel} (TradingView Verified Partner)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#787b86] hover:text-white rounded-lg hover:bg-[#1e222d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            {broker.description} Enjoy one-click execution from TradingView Supercharts with zero re-quotes and institutional grade liquidity.
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#1e222d]/60 rounded-xl border border-[#2a2e39]">
              <div className="text-[11px] text-[#787b86]">Spreads</div>
              <div className="text-sm font-bold text-white mt-1">{broker.spreads}</div>
            </div>
            <div className="p-3 bg-[#1e222d]/60 rounded-xl border border-[#2a2e39]">
              <div className="text-[11px] text-[#787b86]">Min Deposit</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">{broker.minDeposit}</div>
            </div>
            <div className="p-3 bg-[#1e222d]/60 rounded-xl border border-[#2a2e39]">
              <div className="text-[11px] text-[#787b86]">Max Leverage</div>
              <div className="text-sm font-bold text-white mt-1">{broker.leverage}</div>
            </div>
          </div>

          {/* Regulatory info */}
          <div className="p-3.5 bg-[#0c0e14] rounded-xl border border-[#1e222d]">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Regulated &amp; Audited By</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {broker.regulators.map((reg) => (
                <span
                  key={reg}
                  className="text-[11px] font-mono bg-[#1e222d] text-gray-300 px-2 py-0.5 rounded border border-gray-700"
                >
                  {reg}
                </span>
              ))}
            </div>
          </div>

          {connected && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Successfully linked {broker.name} demo paper account with $100,000 simulated balance!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0e14] border-t border-[#1e222d] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleConnect}
              disabled={connecting || connected}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                connected
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2962ff] hover:bg-[#1e53e5] text-white'
              }`}
            >
              {connecting ? (
                <>
                  <Zap className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : connected ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Broker Connected</span>
                </>
              ) : (
                <>
                  <span>Connect Demo / Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
