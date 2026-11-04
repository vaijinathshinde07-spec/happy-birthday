import React, { useState, useEffect } from 'react';
import { Sparkles, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LUCKY_STAR_MESSAGES } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const LuckyStarCatch: React.FC = () => {
  const [starVisible, setStarVisible] = useState<boolean>(false);
  const [starPos, setStarPos] = useState({ x: 10, y: 30, angle: 35 });
  const [caughtMessage, setCaughtMessage] = useState<string | null>(null);
  const [catchCount, setCatchCount] = useState<number>(0);

  // Periodic appearance of the lucky star
  useEffect(() => {
    let timeoutId: number;

    const scheduleNextStar = (initial = false) => {
      // First star appears after 4-6 seconds, subsequent after 14-22 seconds
      const delay = initial ? (Math.random() * 2000 + 4000) : (Math.random() * 8000 + 14000);
      timeoutId = window.setTimeout(() => {
        // Randomize trajectory
        const startY = Math.random() * 45 + 15;
        const startX = Math.random() * 40 + 5;
        const angle = Math.random() * 20 + 25;
        setStarPos({ x: startX, y: startY, angle });
        setStarVisible(true);

        // Disappear after 8 seconds if not caught
        window.setTimeout(() => {
          setStarVisible(false);
          scheduleNextStar(false);
        }, 8000);
      }, delay);
    };

    scheduleNextStar(true);

    const onSummonEvent = () => handleSummon();
    window.addEventListener('summon-lucky-star', onSummonEvent);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('summon-lucky-star', onSummonEvent);
    };
  }, []);

  const handleCatchStar = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setStarVisible(false);

    let clientX = 0.5 * window.innerWidth;
    let clientY = 0.4 * window.innerHeight;
    if ('clientX' in e && typeof e.clientX === 'number') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    // Particle burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      },
      colors: ['#F6D69B', '#FBCFE8', '#BAE6FD', '#E9D5FF', '#FFFFFF'],
    });

    celestialAudio.playFireworks();
    celestialAudio.playChime(1.5);

    const randomMsg = LUCKY_STAR_MESSAGES[Math.floor(Math.random() * LUCKY_STAR_MESSAGES.length)];
    setCaughtMessage(randomMsg);
    setCatchCount((prev) => prev + 1);
  };

  const handleSummon = () => {
    if (starVisible) return;
    setStarPos({ x: 25, y: 25, angle: 30 });
    setStarVisible(true);
    celestialAudio.playWhoosh();

    setTimeout(() => {
      setStarVisible(false);
    }, 8000);
  };

  return (
    <>
      {/* Floating interactive shooting star */}
      {starVisible && (
        <div
          style={{
            left: `${starPos.x}vw`,
            top: `${starPos.y}vh`,
          }}
          className="fixed z-50 pointer-events-auto cursor-pointer animate-[pulse_1.5s_infinite]"
          onClick={handleCatchStar}
          onTouchStart={handleCatchStar}
          title="Quick! Tap to catch this lucky star!"
        >
          {/* Pulsing Star Core */}
          <div className="relative group p-4 -m-4">
            {/* Glowing Aura */}
            <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-lg animate-ping pointer-events-none" />

            <div className="relative flex items-center gap-2">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-300 via-pink-200 to-white shadow-[0_0_30px_rgba(251,191,36,0.9)] flex items-center justify-center transform group-hover:scale-125 transition-transform duration-200">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-500 animate-[spin_4s_linear_infinite]" />
              </div>

              {/* Trailing luminous tail */}
              <div
                className="w-20 sm:w-28 h-1 bg-gradient-to-r from-amber-200 via-pink-300 to-transparent rounded-full -rotate-12 blur-[0.5px]"
                aria-hidden="true"
              />

              <span className="hidden sm:inline-block text-[11px] font-cinzel font-bold text-amber-200 bg-purple-950/80 px-2 py-0.5 rounded-full border border-amber-300/40 shadow-lg whitespace-nowrap">
                Catch me! ✨
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Captured Lucky Star Modal */}
      {caughtMessage && (
        <div
          className="fixed inset-0 z-50 bg-[#070514]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setCaughtMessage(null)}
        >
          <div
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-amber-300/50 shadow-[0_0_60px_rgba(246,214,155,0.35)] text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCaughtMessage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 min-w-[40px] min-h-[40px] rounded-full text-purple-300/70 hover:text-white hover:bg-purple-900/50 transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
              aria-label="Close lucky star message"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Star Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-pink-200 to-white flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(246,214,155,0.7)] border-2 border-amber-100">
              <Sparkles className="w-8 h-8 text-amber-900 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                ✦ Cosmic Fortune Unlocked ✦
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                You Caught a Lucky Star!
              </h3>
            </div>

            <p className="font-handwriting text-2xl sm:text-3xl text-amber-100 leading-snug pt-2">
              &ldquo;{caughtMessage}&rdquo;
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-purple-400/20 text-xs text-purple-300/70">
              <span>Lucky stars caught: <strong className="text-amber-200 font-mono">{catchCount}</strong></span>
              <button
                onClick={() => setCaughtMessage(null)}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-200 to-pink-200 text-slate-900 font-semibold hover:opacity-90 transition-opacity"
              >
                Keep This Fortune ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
