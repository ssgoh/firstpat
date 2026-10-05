import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onOpenSpaceStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onOpenSpaceStory
}) => {
  return (
    <section className="relative min-h-[540px] lg:min-h-[600px] flex flex-col items-center justify-between pt-16 sm:pt-20 pb-12 px-4 text-center hero-glow">
      {/* Central Hero Headline & Free Start CTA */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] text-balance">
          Where the world does markets
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-normal max-w-2xl mb-9 leading-relaxed text-balance">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* Main CTA Button & Subtext */}
        <div className="flex flex-col items-center">
          <button
            onClick={onGetStarted}
            className="group relative inline-flex items-center justify-center px-9 py-4 bg-white text-black font-bold text-lg rounded-2xl md:rounded-3xl hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-200 cursor-pointer active:scale-95"
          >
            Get started for free
          </button>
          <span className="mt-3 text-xs sm:text-sm text-[#787b86] font-normal tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>
      </div>

      {/* Space Story Pill Chip at Bottom of Hero */}
      <div className="mt-14 sm:mt-18">
        <button
          onClick={onOpenSpaceStory}
          className="inline-flex items-center gap-3.5 bg-[#131722]/90 hover:bg-[#1e222d] border border-[#2a2e39] py-2 px-5 rounded-full transition-all duration-200 group text-left cursor-pointer hover:border-gray-600"
        >
          {/* Circular Astronaut Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0 border border-zinc-700">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-KlcEuXFqS9_JOZRCSU-v5jjAAQKpD7ssj2tFl_Kj0Hencs8zwMdZwgUEdLa0zoyA3lzhITidAQRDHbSfQytCpfUykc8VdEf0JslRvsM7v_5dRF9FeWp6eL7vXe5fXdhUo0lKMJDGh5195U7JbdgPXues32Ddlgb25acWZSQGFhhYDldw7zLnYYXkP13L4kj4HhyisxvrbBFdHESemus-5lc-rRUpmG9A5dSsoYm1rJCFAbnQb5vJ"
              alt="Astronaut Scott 'Kidd' Poteet"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
              See our space story
              <ChevronRight className="w-3.5 h-3.5 ml-1 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-xs text-[#787b86] font-medium">With astronaut Scott &quot;Kidd&quot; Poteet</div>
          </div>
        </button>
      </div>
    </section>
  );
};
