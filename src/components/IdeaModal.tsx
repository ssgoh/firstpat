import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Share2, Bookmark, BarChart2, Check } from 'lucide-react';
import { CommunityIdea } from '../types';

interface IdeaModalProps {
  idea: CommunityIdea | null;
  onClose: () => void;
  onOpenSupercharts: (symbol: string) => void;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({
  idea,
  onClose,
  onOpenSupercharts
}) => {
  const [likes, setLikes] = useState<number>(idea ? idea.likes : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Spot on analysis with that wave 2 double zigzag count!',
    'Watching the 0.618 golden pocket closely here.'
  ]);
  const [newComment, setNewComment] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!idea) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([newComment.trim(), ...comments]);
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const isShort = idea.direction === 'Short';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-3xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1e222d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${idea.authorColor}`}>
              {idea.authorInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{idea.author}</span>
                <span className="text-[11px] bg-[#1e222d] text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                  PRO+
                </span>
              </div>
              <div className="text-xs text-[#787b86]">
                Published {idea.timestamp} • Timeframe: {idea.timeframe}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[#787b86] hover:text-white rounded-lg hover:bg-[#1e222d] transition-colors relative"
              title="Share Idea"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setHasBookmarked(!hasBookmarked)}
              className={`p-2 rounded-lg hover:bg-[#1e222d] transition-colors ${
                hasBookmarked ? 'text-[#2962ff]' : 'text-[#787b86] hover:text-white'
              }`}
              title="Bookmark Idea"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#787b86] hover:text-white rounded-lg hover:bg-[#1e222d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Title & Direction */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-bold text-white font-mono">{idea.symbol}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                  isShort
                    ? 'text-red-400 bg-red-950/80 border border-red-800'
                    : 'text-emerald-400 bg-emerald-950/80 border border-emerald-800'
                }`}
              >
                {idea.direction} Setup
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              {idea.title}
            </h2>
          </div>

          {/* Interactive Chart Graphic Banner */}
          <div className="relative rounded-xl border border-[#2a2e39] bg-[#181c27] p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2e39]/60 text-xs text-[#787b86]">
              <span className="font-mono">{idea.symbol} • {idea.timeframe} • TradingView</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenSupercharts(idea.symbol);
                }}
                className="text-[#2962ff] hover:underline flex items-center gap-1 font-semibold"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Open in Supercharts</span>
              </button>
            </div>

            <div className="h-64 w-full pt-4">
              <svg className="w-full h-full" viewBox="0 0 500 220" fill="none">
                {/* Horizontal grid lines */}
                <line x1="0" y1="40" x2="500" y2="40" stroke="#2a2e39" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="#2a2e39" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#2a2e39" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="0" y1="190" x2="500" y2="190" stroke="#2a2e39" strokeWidth="0.8" strokeDasharray="4 4" />

                {/* Fibonacci / Target levels */}
                <rect x="0" y="80" width="500" height="35" fill="rgba(8, 153, 129, 0.08)" />
                <text x="440" y="100" fill="#089981" fontSize="10" fontFamily="monospace">Target Zone</text>
                
                <rect x="0" y="165" width="500" height="25" fill="rgba(242, 54, 69, 0.08)" />
                <text x="440" y="180" fill="#f23645" fontSize="10" fontFamily="monospace">Stop Loss</text>

                {/* Main trajectory path */}
                <path
                  d="M 10 160 Q 90 60 170 110 T 290 50 T 400 130 L 480 80"
                  fill="none"
                  stroke={isShort ? '#f23645' : '#089981'}
                  strokeWidth="3"
                />

                {/* Candlestick simulated bars */}
                <line x1="50" y1="120" x2="50" y2="170" stroke="#089981" strokeWidth="1.5" />
                <rect x="47" y="130" width="6" height="30" fill="#089981" />

                <line x1="120" y1="70" x2="120" y2="140" stroke="#089981" strokeWidth="1.5" />
                <rect x="117" y="80" width="6" height="40" fill="#089981" />

                <line x1="220" y1="60" x2="220" y2="130" stroke="#f23645" strokeWidth="1.5" />
                <rect x="217" y="70" width="6" height="45" fill="#f23645" />

                <line x1="330" y1="70" x2="330" y2="150" stroke="#f23645" strokeWidth="1.5" />
                <rect x="327" y="90" width="6" height="45" fill="#f23645" />

                <circle cx="290" cy="50" r="5" fill="#2962ff" stroke="#ffffff" strokeWidth="2" />
                <text x="295" y="45" fill="#ffffff" fontSize="11" fontWeight="bold">Entry</text>
              </svg>
            </div>
          </div>

          {/* Thesis Text */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Full Trade Breakdown</h4>
            <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed font-sans bg-[#0c0e14] p-4 rounded-xl border border-[#1e222d]">
              {idea.fullAnalysis}
            </div>
          </div>

          {/* Comments Section */}
          <div className="pt-4 border-t border-[#1e222d] space-y-4">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#787b86]" />
              <span>Trader Discussion ({comments.length})</span>
            </h4>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your perspective on this setup..."
                className="flex-1 bg-[#1e222d] border border-[#2a2e39] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2962ff] hover:bg-[#1e53e5] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Post
              </button>
            </form>

            {/* List */}
            <div className="space-y-2">
              {comments.map((c, i) => (
                <div key={i} className="p-3 bg-[#1e222d]/60 rounded-lg text-xs text-gray-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">Community Trader</span>
                    <span className="text-[10px] text-[#787b86]">Just now</span>
                  </div>
                  <div>{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#0c0e14] border-t border-[#1e222d] flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              hasLiked
                ? 'bg-[#2962ff] text-white'
                : 'bg-[#1e222d] text-gray-300 hover:text-white hover:bg-[#2a2e39]'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Boost / Like ({likes})</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSupercharts(idea.symbol);
            }}
            className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#0055ff] to-[#7928ca] hover:opacity-95 rounded-lg shadow-md transition-all cursor-pointer"
          >
            Open in Supercharts
          </button>
        </div>
      </div>
    </div>
  );
};
