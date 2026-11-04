import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { celestialAudio } from '../utils/audio';

interface OpeningSceneProps {
  onEnter: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onEnter }) => {
  const [stage, setStage] = useState<number>(0);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  // Progressive cinematic reveal stages (smooth, clean line-by-line sequence)
  useEffect(() => {
    // Stage 1: "A SPECIAL DAY IN THE UNIVERSE"
    const t1 = setTimeout(() => setStage((s) => Math.max(s, 1)), 200);
    // Stage 2: "HAPPY BIRTHDAY"
    const t2 = setTimeout(() => setStage((s) => Math.max(s, 2)), 600);
    // Stage 3: "SALMA ✨"
    const t3 = setTimeout(() => setStage((s) => Math.max(s, 3)), 1100);
    // Stage 4: "Some souls make the universe a little more beautiful."
    const t4 = setTimeout(() => setStage((s) => Math.max(s, 4)), 1600);
    // Stage 5: "The Universe Celebrates Salma's Birthday"
    const t5 = setTimeout(() => setStage((s) => Math.max(s, 5)), 2100);
    // Stage 6: Enter Button reveal
    const t6 = setTimeout(() => setStage((s) => Math.max(s, 6)), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const handleAccelerate = () => {
    if (stage < 6) {
      setStage(6);
    }
  };

  const handleEnterClick = () => {
    if (isWarping) return;
    setIsWarping(true);
    celestialAudio.playWhoosh();
    celestialAudio.playChime(1.2);
    celestialAudio.startMusic();
    onEnter();
  };

  return (
    <div
      onClick={handleAccelerate}
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center px-4 sm:px-6 select-none overflow-hidden transition-all duration-1000 ease-out ${
        isWarping ? 'scale-125 opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Volumetric Nebula Atmosphere (Centered, smooth radial diffusion) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        {/* Soft deep space cosmic violet & navy aura */}
        <div className="absolute w-[800px] sm:w-[1100px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-tr from-indigo-950/30 via-purple-900/20 to-blue-900/20 blur-[130px]" />
        {/* Soft rose stardust glow */}
        <div className="absolute w-[600px] sm:w-[800px] h-[500px] sm:h-[650px] rounded-full bg-pink-600/10 blur-[120px] animate-corona-breathe" />
      </div>

      {/* Main Celestial Composition - Perfectly Centered, Spacious & Elegant */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full mx-auto text-center px-4">

        {/* 1. Small Elegant Text: "A SPECIAL DAY IN THE UNIVERSE" */}
        <div className="min-h-[24px] sm:min-h-[28px] flex items-center justify-center">
          <p
            className={`text-[10px] min-[360px]:text-xs sm:text-sm tracking-[0.2em] min-[360px]:tracking-[0.35em] uppercase text-purple-200/90 font-medium transition-all duration-1000 ease-out flex items-center gap-2 ${
              stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]" />
            A SPECIAL DAY IN THE UNIVERSE
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]" />
          </p>
        </div>

        {/* 2. Main Large Heading: "HAPPY BIRTHDAY" (Prominent, bold, unmistakable) */}
        <div className="min-h-[48px] sm:min-h-[84px] md:min-h-[104px] flex items-center justify-center mt-2 sm:mt-3 px-2">
          <h1
            className={`font-cinzel text-3xl min-[360px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider min-[360px]:tracking-widest text-[#fef3c7] leading-none select-none transition-all duration-1000 ease-out [text-shadow:_0_0_20px_rgba(254,240,138,0.7),_0_0_45px_rgba(251,191,36,0.4)] ${
              stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            HAPPY BIRTHDAY
          </h1>
        </div>

        {/* 3. Name: "SALMA ✨" */}
        <div className="min-h-[40px] sm:min-h-[70px] md:min-h-[85px] flex items-center justify-center mt-1 sm:mt-2">
          <h2
            className={`font-cinzel text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide min-[360px]:tracking-wider text-[#fbcfe8] transition-all duration-1000 ease-out [text-shadow:_0_0_25px_rgba(244,114,182,0.7),_0_0_50px_rgba(216,180,254,0.4)] ${
              stage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}
          >
            SALMA ✨
          </h2>
        </div>

        {/* 4. Emotional Subtitle: "Some souls make the universe a little more beautiful." */}
        <div className="min-h-[32px] sm:min-h-[40px] flex items-center justify-center mt-3 sm:mt-5 max-w-xl mx-auto px-2">
          <p
            className={`text-sm min-[360px]:text-base sm:text-lg md:text-xl text-purple-100/95 font-light italic tracking-wide transition-all duration-1000 ease-out [text-shadow:_0_2px_12px_rgba(0,0,0,0.9)] ${
              stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            &ldquo;Some souls make the universe a little more beautiful.&rdquo;
          </p>
        </div>

        {/* Starlight Divider Line with glowing diamond star */}
        <div
          className={`my-4 sm:my-6 flex items-center justify-center gap-3 w-40 sm:w-64 transition-all duration-1000 ease-out ${
            stage >= 4 ? 'opacity-85 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/40 to-amber-300/60" />
          <Star className="w-3.5 h-3.5 text-amber-200 fill-amber-200/80 animate-pulse" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-purple-400/40 to-amber-300/60" />
        </div>

        {/* 5. Main Title: "The Universe Celebrates Salma's Birthday" */}
        <div
          className={`transition-all duration-1000 ease-out px-2 ${
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <h3 className="font-cinzel text-xs min-[360px]:text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-[0.1em] min-[360px]:tracking-[0.18em] uppercase text-amber-200/95 [text-shadow:_0_0_20px_rgba(254,240,138,0.5)]">
            The Universe Celebrates Salma&apos;s Birthday
          </h3>

          {/* 6. Small Description: "A little universe, created just for you." */}
          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-purple-300/85 font-light tracking-wider">
            A little universe, created just for you.
          </p>
        </div>

        {/* 7. Enter Button with Translucent Glass Effect */}
        <div
          className={`mt-6 sm:mt-10 flex flex-col items-center transition-all duration-1000 ease-out ${
            stage >= 6
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative group">
            {/* Soft Ambient Radiance */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400/35 via-pink-500/25 to-purple-600/35 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnterClick();
              }}
              className="relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 min-[360px]:px-8 sm:px-11 py-3.5 sm:py-4.5 min-h-[48px] rounded-full text-sm min-[360px]:text-base sm:text-lg font-medium text-slate-100 backdrop-blur-2xl bg-white/[0.07] hover:bg-white/[0.15] border border-white/25 hover:border-amber-200/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),0_0_30px_rgba(246,214,155,0.3)] hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.6),0_0_45px_rgba(246,214,155,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden touch-manipulation"
            >
              {/* Internal subtle starlight light streak on hover */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-20 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />

              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 animate-pulse relative z-10 shrink-0" />
              <span className="relative z-10 font-semibold tracking-wide text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
                Enter Salma&apos;s Universe ✨
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
            </button>
          </div>

          {/* Subtitle & Direct Access Link */}
          <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-purple-300/70 font-medium px-2">
            <span>An immersive celestial birthday experience</span>
            <span aria-hidden="true" className="text-purple-400/40">·</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnterClick();
              }}
              className="min-h-[44px] inline-flex items-center text-amber-200/90 hover:text-amber-100 transition-colors underline decoration-dotted underline-offset-4 cursor-pointer touch-manipulation"
            >
              Direct Entry
            </button>
          </div>
        </div>

      </div>

      {/* Discreet bottom tap hint before full reveal */}
      {stage < 6 && (
        <div className="absolute bottom-6 z-30 text-center animate-fade-in">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setStage(6);
            }}
            className="text-xs text-purple-300/50 hover:text-purple-200 transition-colors cursor-pointer"
          >
            Tap anywhere to enter ✨
          </button>
        </div>
      )}
    </div>
  );
};
