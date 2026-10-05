import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ThumbsUp, MessageSquare } from 'lucide-react';
import { CommunityIdea } from '../types';

interface CommunityIdeasSectionProps {
  ideas: CommunityIdea[];
  onSelectIdea: (idea: CommunityIdea) => void;
  onOpenSupercharts: (symbol: string) => void;
}

export const CommunityIdeasSection: React.FC<CommunityIdeasSectionProps> = ({
  ideas,
  onSelectIdea,
  onOpenSupercharts
}) => {
  const [activeCategory, setActiveCategory] = useState<'editors' | 'popular' | 'more'>('editors');
  const [showAllIdeas, setShowAllIdeas] = useState(false);

  // Filter ideas based on active category
  const filteredIdeas = activeCategory === 'more' 
    ? ideas 
    : ideas.filter(idea => idea.category === activeCategory || (activeCategory === 'editors' && idea.category === 'editors'));

  const displayedIdeas = showAllIdeas ? filteredIdeas : filteredIdeas.slice(0, 3);

  const renderMiniChart = (type: CommunityIdea['previewChartType']) => {
    switch (type) {
      case 'bitcoin':
        return (
          <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
            {/* Background grid lines */}
            <line x1="0" y1="35" x2="300" y2="35" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="115" x2="300" y2="115" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            {/* Wave 1-5 advance curve */}
            <path d="M 0 100 Q 60 40 120 70 T 200 40 T 300 20" fill="none" stroke="#089981" strokeWidth="2.5" />
            {/* Wave 2 corrective projection */}
            <path d="M 0 120 L 50 110 L 100 130 L 150 90 L 220 115 L 300 70" fill="none" stroke="#f23645" strokeDasharray="4 4" strokeWidth="1.5" />
            <circle cx="200" cy="40" r="4.5" fill="#089981" />
            <circle cx="220" cy="115" r="3.5" fill="#f23645" />
          </svg>
        );
      case 'aapl':
        return (
          <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
            <line x1="0" y1="35" x2="300" y2="35" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="115" x2="300" y2="115" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            {/* Breakout impulse curve */}
            <path d="M 0 130 Q 70 120 140 80 T 240 60 T 300 30" fill="none" stroke="#089981" strokeWidth="2.5" />
            <path d="M 140 80 L 300 80" stroke="#2962ff" strokeDasharray="3 3" strokeWidth="1" opacity="0.6" />
            <circle cx="240" cy="60" r="4.5" fill="#089981" />
          </svg>
        );
      case 'gold':
        return (
          <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
            <line x1="0" y1="35" x2="300" y2="35" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="115" x2="300" y2="115" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            {/* Fibonacci retest wave */}
            <path d="M 0 40 Q 80 90 150 75 T 230 110 T 300 65" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="230" cy="110" r="4.5" fill="#f59e0b" />
          </svg>
        );
      case 'nvda':
      default:
        return (
          <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
            <line x1="0" y1="35" x2="300" y2="35" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="#1e222d" strokeWidth="0.75" strokeDasharray="3 3" />
            <path d="M 0 110 Q 90 100 160 50 T 260 30 L 300 20" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <circle cx="260" cy="30" r="4.5" fill="#a855f7" />
          </svg>
        );
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16" id="community">
      {/* Header with Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#2a2e39] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Community ideas</span>
            <span className="text-[#787b86] text-xl">›</span>
          </h2>
          <p className="text-sm text-[#787b86] mt-1">Trading analysis and educational setups from top community traders</p>
        </div>

        {/* Filter Category Buttons */}
        <div className="flex items-center space-x-1 text-xs font-semibold bg-[#131722] p-1 rounded-lg border border-[#2a2e39]">
          <button
            onClick={() => setActiveCategory('editors')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeCategory === 'editors'
                ? 'bg-[#2a2e39] text-white shadow-sm font-semibold'
                : 'text-[#787b86] hover:text-white'
            }`}
          >
            Editors&apos; picks
          </button>
          <button
            onClick={() => setActiveCategory('popular')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeCategory === 'popular'
                ? 'bg-[#2a2e39] text-white shadow-sm font-semibold'
                : 'text-[#787b86] hover:text-white'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setActiveCategory('more')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeCategory === 'more'
                ? 'bg-[#2a2e39] text-white shadow-sm font-semibold'
                : 'text-[#787b86] hover:text-white'
            }`}
          >
            More
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {displayedIdeas.map((idea) => {
          const isShort = idea.direction === 'Short';
          return (
            <article
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="bg-[#131722] rounded-xl border border-[#2a2e39] overflow-hidden hover:border-gray-500 transition-all flex flex-col cursor-pointer group shadow-lg"
            >
              {/* Mini Technical Chart Graphic */}
              <div className="relative h-48 bg-[#181c27] overflow-hidden">
                {renderMiniChart(idea.previewChartType)}

                {/* Symbol and Direction Tag */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                  <span className="group-hover:text-[#2962ff] transition-colors">{idea.symbol}</span>
                  <span
                    className={`text-[10px] px-1 py-0.5 rounded font-mono uppercase ${
                      isShort
                        ? 'text-red-400 bg-red-950/70 border border-red-800'
                        : 'text-emerald-400 bg-emerald-950/70 border border-emerald-800'
                    }`}
                  >
                    {idea.direction}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-[#2962ff] transition-colors leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#787b86] mt-2 line-clamp-3 leading-relaxed">
                    {idea.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1e222d] flex items-center justify-between text-xs text-[#787b86]">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${idea.authorColor}`}>
                      {idea.authorInitials}
                    </div>
                    <span className="text-gray-300 font-medium hover:underline">
                      {idea.author}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#787b86]">{idea.timestamp}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* See All Ideas Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAllIdeas(!showAllIdeas)}
          className="inline-flex items-center text-sm font-semibold text-[#2962ff] hover:text-[#1e53e5] transition-colors cursor-pointer group"
        >
          <span>{showAllIdeas ? "Show fewer ideas" : "See all editors' picks ideas"}</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
