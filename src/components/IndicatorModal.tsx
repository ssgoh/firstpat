import React, { useState } from 'react';
import { X, Copy, Check, Code, Play } from 'lucide-react';
import { IndicatorItem } from '../types';

interface IndicatorModalProps {
  indicator: IndicatorItem | null;
  onClose: () => void;
  onAddToChart: (indicator: IndicatorItem) => void;
}

export const IndicatorModal: React.FC<IndicatorModalProps> = ({
  indicator,
  onClose,
  onAddToChart
}) => {
  const [copied, setCopied] = useState(false);

  if (!indicator) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(indicator.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1e222d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-950/60 text-purple-400 border border-purple-800 rounded-xl">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white line-clamp-1">{indicator.title}</h3>
                <span className="text-[10px] bg-[#2a2e39] text-gray-300 px-2 py-0.5 rounded font-mono">
                  {indicator.version}
                </span>
              </div>
              <p className="text-xs text-[#787b86]">
                Author: {indicator.author} • {indicator.type} • {indicator.likes.toLocaleString()} users
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
        <div className="p-5 overflow-y-auto space-y-4">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {indicator.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#787b86]">
              <span className="font-mono">Pine Script® Source Code</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-[#2962ff] hover:text-[#1e53e5] font-semibold transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 bg-[#0a0d14] rounded-xl border border-[#1e222d] font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed max-h-72">
              <code>{indicator.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0e14] border-t border-[#1e222d] flex items-center justify-between">
          <span className="text-xs text-[#787b86]">Compliant with TradingView Pine Script® v5 Standards</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddToChart(indicator);
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2962ff] hover:bg-[#1e53e5] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Apply to Supercharts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
