import React, { useState } from 'react';
import { Sparkles, Heart, Eye, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EASTER_EGG_MESSAGE } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const HiddenUniverse: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  const handleUnlock = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    setIsUnlocked(true);
    celestialAudio.playFireworks();
    celestialAudio.playChime(1.6);

    confetti({
      particleCount: 70,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#F6D69B', '#F472B6', '#E9D5FF', '#BAE6FD', '#FFFFFF'],
    });
  };

  return (
    <>
      {/* Subtle Mystery Star Anchor (discreetly placed with subtle twinkling hint) */}
      <div className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-40">
        <button
          onClick={handleUnlock}
          onTouchStart={handleUnlock}
          className="group relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-purple-950/40 hover:bg-purple-900/70 border border-purple-500/20 hover:border-amber-300/40 transition-all cursor-pointer opacity-70 hover:opacity-100 touch-manipulation"
          aria-label="A mysterious faint star"
          title="✦ A mysterious faint star..."
        >
          {/* Subtle faint twinkle */}
          <span className="text-amber-300 text-xs sm:text-sm animate-[spin_6s_linear_infinite] group-hover:scale-125 inline-block transition-transform">
            ✦
          </span>
          <span className="sr-only">Secret Celestial Star</span>
        </button>
      </div>

      {/* Secret Dimension Bonus Modal */}
      {isUnlocked && (
        <div
          className="fixed inset-0 z-50 bg-[#060312]/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-500"
          onClick={() => setIsUnlocked(false)}
        >
          <div
            className="relative w-full max-w-xl p-5 sm:p-11 rounded-3xl glass-panel-glow border-2 border-amber-300/60 shadow-[0_0_80px_rgba(246,214,155,0.45)] text-center space-y-4 sm:space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsUnlocked(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 min-w-[40px] min-h-[40px] rounded-full text-purple-300/70 hover:text-white hover:bg-purple-900/50 transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
              aria-label="Close secret dimension"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Secret Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-300 via-pink-400 to-purple-600 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(246,214,155,0.7)] border-2 border-amber-100">
              <Eye className="w-8 h-8 text-slate-900" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                {EASTER_EGG_MESSAGE.badge}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                {EASTER_EGG_MESSAGE.title}
              </h3>
            </div>

            <p className="font-handwriting text-2xl sm:text-3xl text-amber-100 leading-snug sm:leading-relaxed pt-2">
              &ldquo;{EASTER_EGG_MESSAGE.text}&rdquo;
            </p>

            <div className="pt-4 flex items-center justify-center gap-2 border-t border-purple-400/20 text-xs text-purple-300/80">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>An eternal starlight secret discovered</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
