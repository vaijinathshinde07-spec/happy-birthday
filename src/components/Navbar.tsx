import React from 'react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  onWishClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onWishClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/15 bg-[#070514]/75 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="font-cinzel text-xs sm:text-base md:text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:opacity-90 transition-opacity whitespace-nowrap shrink truncate flex items-center gap-1 sm:gap-2"
        >
          <span className="truncate">The Universe Celebrates Salma&apos;s Birthday</span>
          <span className="text-amber-300 text-xs font-normal shrink-0">🌌</span>
        </a>

        {/* Zone 2: Concise Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest text-slate-300 font-medium">
          <a
            href="#hero"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Hero
          </a>
          <a
            href="#constellation"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Constellation
          </a>
          <a
            href="#letter"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Letter
          </a>
          <a
            href="#garden"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Garden
          </a>
          <a
            href="#wish-room"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Wishes
          </a>
          <a
            href="#capsule"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Capsule
          </a>
          <a
            href="#keepsake"
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Keepsake
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onWishClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-full text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_15px_rgba(246,214,155,0.3)] hover:shadow-[0_0_22px_rgba(246,214,155,0.5)] transition-all cursor-pointer whitespace-nowrap shrink-0 touch-manipulation"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900" />
            <span>Make a Wish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
