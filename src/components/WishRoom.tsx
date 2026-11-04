import React, { useState } from 'react';
import { Sparkles, Wand2, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { celestialAudio } from '../utils/audio';

export const WishRoom: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [isWishing, setIsWishing] = useState<boolean>(false);
  const [wishGranted, setWishGranted] = useState<boolean>(false);
  const [screenDimmed, setScreenDimmed] = useState<boolean>(false);
  const [shootingStarActive, setShootingStarActive] = useState<boolean>(false);

  const areAllCandlesOut = candlesLit.every((lit) => !lit);

  const triggerWishSequence = () => {
    if (isWishing) return;
    setIsWishing(true);
    celestialAudio.playCandleBlow();

    // 1. Extinguish all candles
    setCandlesLit([false, false, false, false, false]);

    // 2. Dim the entire screen for a magical breathless moment
    setTimeout(() => {
      setScreenDimmed(true);
      celestialAudio.playWhoosh();
    }, 400);

    // 3. A shooting star crosses the screen
    setTimeout(() => {
      setShootingStarActive(true);
    }, 1000);

    // 4. Reveal glowing wish blessing + sound cascade
    setTimeout(() => {
      setScreenDimmed(false);
      setShootingStarActive(false);
      setWishGranted(true);
      setIsWishing(false);
      celestialAudio.playFireworks();

      // Launch soft pastel & champagne starlight confetti
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F6D69B', '#E9D5FF', '#FBCFE8', '#FFFFFF', '#BAE6FD'],
      });
    }, 2400);
  };

  const handleCandleClick = (index: number) => {
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);
    celestialAudio.playCandleBlow();

    // If all are now out, trigger wish reveal
    if (updated.every((lit) => !lit)) {
      triggerWishSequence();
    }
  };

  const handleRelight = () => {
    setCandlesLit([true, true, true, true, true]);
    setWishGranted(false);
    celestialAudio.playChime(1.1);
  };

  return (
    <section id="wish-room" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Full-screen darkening overlay during wish sequence */}
      {screenDimmed && (
        <div
          className="fixed inset-0 z-50 bg-[#030208]/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-700 pointer-events-none"
          aria-hidden="true"
        >
          {shootingStarActive && (
            <div className="absolute w-[300px] h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-white -rotate-45 -translate-x-full animate-[pulse_1s_infinite] shadow-[0_0_20px_#fff]" />
          )}
          <p className="font-cinzel text-xl sm:text-2xl text-amber-200/90 font-light tracking-widest animate-pulse">
            Make your wish, Salma...
          </p>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-300/20 px-3.5 py-1.5 rounded-full">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Interactive Wish Ritual</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-100">
          The Magical Wish Room
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light">
          Make a silent wish for this upcoming year, then blow out the glowing celestial candles.
        </p>
      </div>

      {/* 3D Tiered Birthday Cake Visual Container */}
      <div className="relative max-w-md mx-auto p-4 min-[360px]:p-6 sm:p-10 rounded-3xl glass-panel-glow border border-amber-300/30 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(246,214,155,0.15)] overflow-hidden">
        {/* Soft Ambient Radiance behind cake */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-amber-400/20 via-pink-400/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* 5 Interactive Candles on Top Tier */}
        <div className="flex items-end justify-center gap-2 min-[360px]:gap-3 sm:gap-6 mb-1 z-20">
          {candlesLit.map((isLit, idx) => (
            <div
              key={idx}
              onClick={() => handleCandleClick(idx)}
              className="flex flex-col items-center cursor-pointer group p-2 -m-1 sm:p-2 sm:-m-1 touch-manipulation min-w-[36px] sm:min-w-[44px]"
              title={isLit ? 'Click to blow out candle' : 'Candle is blown out'}
            >
              {/* Flame or Smoke */}
              <div className="h-9 flex items-center justify-center">
                {isLit ? (
                  <div className="relative animate-flame">
                    {/* Flame Core */}
                    <div className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-white shadow-[0_0_15px_#fbbf24] -translate-y-0.5" />
                    {/* Halo */}
                    <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-sm -z-10" />
                  </div>
                ) : (
                  /* Gentle Smoke Wisp */
                  <div className="w-1 h-4 rounded-full bg-slate-400/40 blur-[1px] -translate-y-1 animate-pulse" />
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-1.5 bg-slate-700" />

              {/* Candle Stick (Pastel Lavender and Gold spiral) */}
              <div className="w-3 sm:w-3.5 h-12 sm:h-14 rounded-t-sm bg-gradient-to-b from-purple-200 via-pink-100 to-amber-200 shadow-sm border-x border-purple-300/30 relative overflow-hidden">
                {/* Spiral stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(245,158,11,0.4)_3px,rgba(245,158,11,0.4)_6px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* 3-LAYER BIRTHDAY CAKE */}
        <div className="w-full flex flex-col items-center z-10 px-1">
          {/* Top Tier (Smallest) */}
          <div className="relative w-32 min-[360px]:w-36 sm:w-52 h-11 sm:h-14 rounded-2xl bg-gradient-to-b from-[#fce7f3] via-[#f5d0fe] to-[#e9d5ff] border border-amber-200/50 shadow-md flex items-center justify-center max-w-full">
            {/* Frosting Swirls & Pearls */}
            <div className="absolute -top-1 inset-x-2 flex justify-between px-1">
              {[...Array(7)].map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 min-[360px]:w-2 sm:w-2.5 h-1.5 min-[360px]:h-2 sm:h-2.5 rounded-full bg-gradient-to-tr from-amber-100 to-white shadow-[0_0_5px_#fff]"
                />
              ))}
            </div>
            {/* Decorative Gold Filigree Banner */}
            <span className="font-cinzel text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-purple-900/80">
              Salma ✨
            </span>
          </div>

          {/* Middle Tier */}
          <div className="relative w-44 min-[360px]:w-48 sm:w-68 h-13 sm:h-18 rounded-2xl bg-gradient-to-b from-[#fae8ff] via-[#f0abfc] to-[#c084fc] -mt-1 border border-pink-200/60 shadow-lg flex items-center justify-center max-w-full">
            {/* Frosting Swirls & Pearls */}
            <div className="absolute -top-1 inset-x-2 flex justify-between px-2">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className="w-2 min-[360px]:w-2.5 sm:w-3 h-2 min-[360px]:h-2.5 sm:h-3 rounded-full bg-gradient-to-tr from-amber-100 to-white shadow-[0_0_6px_#fff]"
                />
              ))}
            </div>
            {/* Celestial stars pattern */}
            <div className="flex items-center gap-1.5 sm:gap-3 text-purple-950/60">
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest">
                Happy Birthday
              </span>
              <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>

          {/* Bottom Tier (Base) */}
          <div className="relative w-52 min-[360px]:w-60 sm:w-84 h-15 sm:h-20 rounded-2xl bg-gradient-to-b from-[#ede9fe] via-[#ddd6fe] to-[#a855f7] -mt-1 border border-purple-300/60 shadow-2xl flex items-center justify-center max-w-full">
            {/* Frosting Swirls & Pearls */}
            <div className="absolute -top-1 inset-x-2 flex justify-between px-2 sm:px-3">
              {[...Array(11)].map((_, i) => (
                <span
                  key={i}
                  className="w-2 min-[360px]:w-2.5 sm:w-3 h-2 min-[360px]:h-2.5 sm:h-3 rounded-full bg-gradient-to-tr from-amber-100 to-white shadow-[0_0_6px_#fff]"
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 sm:gap-4 text-purple-950/70 font-cinzel text-[9px] min-[360px]:text-[10px] sm:text-xs font-bold tracking-wider">
              <span>✦</span>
              <span>FOREVER RADIANT</span>
              <span>✦</span>
            </div>
          </div>

          {/* Golden Cake Stand / Pedestal */}
          <div className="relative w-56 min-[360px]:w-64 sm:w-96 max-w-full h-4 sm:h-5 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-[0_10px_25px_rgba(0,0,0,0.6)] border border-amber-200/50 mt-1" />
          <div className="w-20 min-[360px]:w-24 sm:w-36 h-3.5 sm:h-4 bg-gradient-to-b from-amber-400 to-amber-700 rounded-b-xl shadow-md" />
        </div>

        {/* Action Controls */}
        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 z-10 w-full justify-center">
          {!areAllCandlesOut ? (
            <button
              onClick={triggerWishSequence}
              disabled={isWishing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 min-[360px]:px-8 py-3.5 min-h-[48px] rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_30px_rgba(246,214,155,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap touch-manipulation"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>Make a Wish 🌠</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full text-sm font-medium text-amber-200 bg-purple-900/60 hover:bg-purple-900 border border-amber-300/40 shadow-lg hover:scale-105 transition-all cursor-pointer touch-manipulation"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Relight Candles 🕯️</span>
            </button>
          )}
        </div>

        <p className="mt-3 text-[11px] text-purple-300/60 text-center">
          Tip: You can also tap individual candle flames to extinguish them!
        </p>
      </div>

      {/* Granted Wish Blessing Reveal Card */}
      {wishGranted && (
        <div className="mt-10 p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-amber-300/50 shadow-[0_0_50px_rgba(246,214,155,0.3)] text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="w-12 h-12 rounded-full bg-amber-300/20 border border-amber-300/50 flex items-center justify-center mx-auto mb-4 text-amber-300 shadow-[0_0_20px_#fde68a]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-white leading-snug">
            &ldquo;May every beautiful wish find its way to you, Salma.&rdquo;
          </h3>

          <p className="mt-3 text-sm text-purple-200/80 font-light">
            Your wish has been whispered to the cosmos and engraved among the stars.
          </p>
        </div>
      )}
    </section>
  );
};
