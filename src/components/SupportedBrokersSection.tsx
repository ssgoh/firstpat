import React from 'react';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { BrokerItem } from '../types';

interface SupportedBrokersSectionProps {
  brokers: BrokerItem[];
  onSelectBroker: (broker: BrokerItem) => void;
}

export const SupportedBrokersSection: React.FC<SupportedBrokersSectionProps> = ({
  brokers,
  onSelectBroker
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 border-t border-[#1e222d]" id="brokers">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Trading and brokers</h3>
          <p className="text-sm text-[#787b86] mt-1">
            Trade directly on Supercharts through supported, fully-verified brokers.
          </p>
        </div>
        <button
          onClick={() => onSelectBroker(brokers[0])}
          className="text-sm font-semibold text-[#2962ff] hover:text-[#1e53e5] flex items-center gap-1 cursor-pointer"
        >
          <span>See all brokers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brokers.map((broker) => {
          const isFeatured = broker.badge === 'Featured';
          return (
            <div
              key={broker.id}
              className="bg-[#131722] border border-[#2a2e39] p-4 rounded-xl flex flex-col justify-between hover:border-gray-500 transition-colors group"
            >
              <div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded inline-block ${
                    isFeatured
                      ? 'bg-blue-900/40 text-blue-300 border border-blue-800/60'
                      : 'bg-zinc-800 text-gray-300 border border-zinc-700/60'
                  }`}
                >
                  {broker.badge}
                </span>
                <h4 className="text-base font-bold text-white mt-2 group-hover:text-[#2962ff] transition-colors">
                  {broker.name}
                </h4>
                <p className="text-xs text-[#787b86] mt-0.5 flex items-center gap-1">
                  <span>{broker.assetClass}</span>
                  <span>•</span>
                  <span className="text-yellow-400 font-semibold">{broker.rating} ★</span>
                  <span>{broker.ratingLabel}</span>
                </p>
              </div>

              <button
                onClick={() => onSelectBroker(broker)}
                className="mt-4 w-full py-1.5 bg-[#2a2e39] hover:bg-[#363a45] text-xs font-semibold rounded text-white transition-colors cursor-pointer group-hover:bg-[#2962ff]"
              >
                Open account
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
