import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-purple-500/15 pt-12 pb-24 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-purple-300/60 z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-cinzel text-sm text-purple-200">
          <span>The Universe Celebrates Salma&apos;s Birthday</span>
          <span>·</span>
          <span className="text-amber-200 flex items-center gap-1">
            Happy Birthday <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>Crafted with starlight, wonder & immense joy</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full glass-panel hover:text-white transition-colors cursor-pointer text-xs touch-manipulation"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
