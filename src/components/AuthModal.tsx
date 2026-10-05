import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1e222d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-8 fill-current text-white" viewBox="0 0 36 28">
              <path d="M14.6 28H8.8L0 0h5.8l8.8 28zm10.7-17.7h-5.8L28 0h5.8l-8.5 10.3zm-3.5 17.7H16L24.8 0h5.8L21.8 28z" />
            </svg>
            <span className="font-bold text-base text-white">TradingView</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#787b86] hover:text-white rounded-lg hover:bg-[#1e222d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white tracking-tight">Get started for free</h3>
            <p className="text-xs text-[#787b86] mt-1.5">$0 forever, no credit card needed</p>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-xl text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-white">Welcome to TradingView!</div>
              <p className="text-xs text-gray-300">Your account is ready with $100,000 in paper trading capital.</p>
            </div>
          ) : (
            <>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => {
                  setSubmitted(true);
                  setTimeout(() => {
                    onSuccess('google-trader@tradingview.com');
                    onClose();
                  }, 800);
                }}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-[#1e222d] hover:bg-[#2a2e39] text-white rounded-xl border border-[#2a2e39] text-sm font-medium transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#1e222d] w-full" />
                <span className="bg-[#131722] px-3 text-[11px] text-[#787b86] uppercase tracking-wider">or email</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-[#787b86] mb-1 font-medium">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="trader@example.com"
                    className="w-full bg-[#1e222d] border border-[#2a2e39] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#2962ff] placeholder-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#0055ff] via-[#3366ff] to-[#7928ca] hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Create free account
                </button>
              </form>
            </>
          )}

          <div className="space-y-1.5 pt-2 border-t border-[#1e222d] text-[11px] text-[#787b86]">
            <div className="flex items-center gap-1.5 text-gray-300">
              <Check className="w-3.5 h-3.5 text-[#089981]" />
              <span>Full access to Supercharts with custom indicators</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Check className="w-3.5 h-3.5 text-[#089981]" />
              <span>Free real-time data &amp; 100M trader community</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
