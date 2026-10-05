import React from 'react';
import { X, ExternalLink, Rocket, Shield, Globe, Award } from 'lucide-react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChart: (symbol: string) => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({
  isOpen,
  onClose,
  onOpenChart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Background Gradient */}
        <div className="relative p-6 bg-gradient-to-r from-blue-950/60 via-[#131722] to-purple-950/60 border-b border-[#1e222d] flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/60 shadow-lg shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-KlcEuXFqS9_JOZRCSU-v5jjAAQKpD7ssj2tFl_Kj0Hencs8zwMdZwgUEdLa0zoyA3lzhITidAQRDHbSfQytCpfUykc8VdEf0JslRvsM7v_5dRF9FeWp6eL7vXe5fXdhUo0lKMJDGh5195U7JbdgPXues32Ddlgb25acWZSQGFhhYDldw7zLnYYXkP13L4kj4HhyisxvrbBFdHESemus-5lc-rRUpmG9A5dSsoYm1rJCFAbnQb5vJ"
                alt="Astronaut Scott 'Kidd' Poteet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5" />
                <span>Polaris Dawn Mission</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                TradingView in High-Earth Orbit
              </h3>
              <p className="text-xs text-[#787b86] mt-0.5">
                With Mission Pilot Scott &quot;Kidd&quot; Poteet
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-300 leading-relaxed">
          <div>
            <h4 className="text-base font-semibold text-white mb-2">
              Taking Financial Intelligence Beyond Earth
            </h4>
            <p className="text-[#9598a1] leading-relaxed">
              During the historic <strong>Polaris Dawn</strong> mission—which reached an apogee of 1,400.7 kilometers, the highest Earth orbit flown by humans since the Apollo program—Mission Pilot Scott &quot;Kidd&quot; Poteet tested TradingView&apos;s real-time telemetry rendering and lightweight charting libraries over SpaceX Starlink laser crosslinks.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-[#1e222d]/60 rounded-xl border border-[#2a2e39] text-center">
              <div className="text-xs text-[#787b86]">Apogee Altitude</div>
              <div className="text-lg font-bold text-white mt-1 font-mono">1,400.7 km</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Highest since Apollo</div>
            </div>
            <div className="p-3 bg-[#1e222d]/60 rounded-xl border border-[#2a2e39] text-center">
              <div className="text-xs text-[#787b86]">Orbital Speed</div>
              <div className="text-lg font-bold text-white mt-1 font-mono">28,160 km/h</div>
              <div className="text-[10px] text-blue-400 mt-0.5">17,500 mph</div>
            </div>
            <div className="p-3 bg-[#1e222d]/60 rounded-xl border border-[#2a2e39] text-center">
              <div className="text-xs text-[#787b86]">Latency to Ticker</div>
              <div className="text-lg font-bold text-white mt-1 font-mono">&lt; 35 ms</div>
              <div className="text-[10px] text-purple-400 mt-0.5">Starlink Mesh</div>
            </div>
          </div>

          <div className="p-4 bg-[#181c27] rounded-xl border border-blue-900/30 flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300">
              <span className="font-semibold text-white">Space-Grade Reliability:</span> &quot;Whether analyzing market liquidity pools or evaluating orbital descent vectors, traders and pilots need the exact same thing: unshakeable speed and precision.&quot;
              <span className="block mt-1 text-[#787b86]">— Lt. Col. Scott Poteet (USAF Ret.)</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-[#0c0e14] border-t border-[#1e222d] flex items-center justify-between">
          <span className="text-xs text-[#787b86]">Space Exploration Meets Modern Finance</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white rounded-lg hover:bg-[#1e222d] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenChart('SPX');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2962ff] hover:bg-[#1e53e5] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Explore Supercharts</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
