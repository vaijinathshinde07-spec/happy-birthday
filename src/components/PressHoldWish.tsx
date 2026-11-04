import React, { useState, useRef, useEffect } from 'react';
import { Star, Sparkles, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { celestialAudio } from '../utils/audio';

export const PressHoldWish: React.FC = () => {
  const [holding, setHolding] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [wishGranted, setWishGranted] = useState<boolean>(false);
  const [shootingStar, setShootingStar] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const holdDuration = 1800; // 1.8 seconds hold to empower wish

  const startHold = () => {
    if (wishGranted) return;
    setHolding(true);
    startTimeRef.current = Date.now();
    celestialAudio.playChime(1.0);

    const update = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProg = Math.min(100, (elapsed / holdDuration) * 100);
      setProgress(currentProg);

      if (currentProg >= 100) {
        // Complete hold
        setHolding(false);
        setShootingStar(true);
        celestialAudio.playWhoosh();
        celestialAudio.playFireworks();

        confetti({
          particleCount: 75,
          spread: 100,
          origin: { y: 0.55 },
          colors: ['#F6D69B', '#FBCFE8', '#BAE6FD', '#FFFFFF'],
        });

        setTimeout(() => {
          setShootingStar(false);
          setWishGranted(true);
        }, 1200);
      } else {
        animFrameRef.current = requestAnimationFrame(update);
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  };

  const endHold = () => {
    if (progress < 100) {
      setHolding(false);
      setProgress(0);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    setWishGranted(false);
    setProgress(0);
    celestialAudio.playChime(1.1);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Dynamic Shooting Star Across Screen during trigger */}
      {shootingStar && (
        <div
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/3 -left-20 w-[400px] h-1 bg-gradient-to-r from-transparent via-amber-200 to-white -rotate-12 animate-[slideIn_1.2s_ease-out_forwards] shadow-[0_0_25px_#fff]" />
        </div>
      )}

      {/* Section Header */}
      <div className="max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-300/20 px-3.5 py-1.5 rounded-full">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Interactive Starlight Empowerer</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-100">
          Make a Wish
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light">
          Close your eyes, think of your deepest wish, then press and hold the wishing star.
        </p>
      </div>

      {/* Main Interactive Press & Hold Circle */}
      <div className="relative inline-flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl glass-panel-glow border border-amber-300/30 shadow-[0_0_60px_rgba(246,214,155,0.15)] max-w-md w-full mx-auto select-none">
        {/* SVG Progress Ring */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="transparent"
              stroke="rgba(168, 85, 247, 0.2)"
              strokeWidth="4"
            />
            {/* Progress indicator */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="transparent"
              stroke="url(#wishProgressGrad)"
              strokeWidth="5"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
            <defs>
              <linearGradient id="wishProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F6D69B" />
                <stop offset="50%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Star Center Button */}
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            onTouchCancel={endHold}
            disabled={wishGranted}
            className={`absolute inset-4 rounded-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 focus:outline-none touch-none ${
              holding
                ? 'scale-95 bg-gradient-to-tr from-amber-400 via-pink-400 to-purple-600 shadow-[0_0_40px_rgba(251,191,36,0.9)]'
                : 'bg-gradient-to-tr from-purple-900/90 via-[#221040] to-indigo-950 border border-amber-300/40 shadow-[0_0_25px_rgba(246,214,155,0.3)] hover:scale-105'
            }`}
            aria-label="Press and hold to charge your birthday wish"
          >
            {/* Pulsing Starlight aura */}
            <div
              className={`absolute -inset-2 rounded-full bg-amber-300/30 blur-md pointer-events-none transition-opacity ${
                holding ? 'opacity-100 animate-ping' : 'opacity-30'
              }`}
            />

            <Star
              className={`w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-300 ${
                holding
                  ? 'fill-white text-white rotate-45 scale-110 drop-shadow-[0_0_15px_#fff]'
                  : 'fill-amber-300 text-amber-300'
              }`}
            />

            <span className="font-cinzel text-xs font-bold text-amber-200 mt-2 uppercase tracking-wider">
              {wishGranted
                ? 'Wish Blessed ✨'
                : holding
                ? `${Math.round(progress)}% Charging...`
                : 'Press & Hold'}
            </span>
          </button>
        </div>

        {/* Instructions */}
        <p className="mt-4 text-xs text-purple-300/70">
          {!wishGranted
            ? 'Hold for 2 seconds to release your shooting star'
            : 'Your wish has traveled across the cosmos!'}
        </p>

        {wishGranted && (
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-1.5 rounded-full text-xs text-amber-200 bg-purple-900/70 hover:bg-purple-900 border border-amber-300/40 transition-colors"
          >
            Make Another Wish 🌟
          </button>
        )}
      </div>

      {/* Wish Granted Reveal Message Card */}
      {wishGranted && (
        <div className="mt-10 p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-amber-300/60 shadow-[0_0_50px_rgba(246,214,155,0.35)] text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="w-12 h-12 rounded-full bg-amber-300/20 border border-amber-300/50 flex items-center justify-center mx-auto mb-3 text-amber-300 shadow-[0_0_20px_#fde68a]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-white leading-snug">
            &ldquo;May your beautiful wishes come true, Salma.&rdquo;
          </h3>

          <p className="mt-2 text-sm text-purple-200/90 font-light">
            Every hope you hold close to your heart is heard by the universe today.
          </p>
        </div>
      )}
    </section>
  );
};
