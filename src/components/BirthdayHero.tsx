import React from 'react';
import { Sparkles, Heart, ChevronDown, Wand2, Compass } from 'lucide-react';
import { celestialAudio } from '../utils/audio';

interface BirthdayHeroProps {
  onExploreClick: () => void;
  onMakeWishClick: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({
  onExploreClick,
  onMakeWishClick,
}) => {
  const handleBalloonClick = (name: string) => {
    celestialAudio.playChime(1.4);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden"
    >
      {/* Soft celestial light rays filtering from zenith */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,_rgba(246,214,155,0.12)_0%,_rgba(168,85,247,0.08)_40%,_transparent_75%)] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Decorative Celestial Orbs / Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Floating Orb 1: Champagne Gold (Top Left) */}
        <div
          onClick={() => handleBalloonClick('gold')}
          className="pointer-events-auto absolute top-12 left-[4%] sm:left-[10%] animate-float cursor-pointer group transition-transform hover:scale-110 active:scale-95"
          title="Tap to chime"
        >
          <div className="relative w-14 h-18 sm:w-20 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-100 shadow-[0_10px_30px_rgba(245,158,11,0.4)] flex items-center justify-center">
            {/* Specular highlight */}
            <div className="absolute top-2 left-2.5 w-3.5 h-6 rounded-full bg-white/70 blur-[1px] -rotate-12" />
            <Sparkles className="w-4 h-4 text-amber-950/40" />
            {/* Knot & golden filament */}
            <div className="absolute -bottom-1.5 w-2 h-2 bg-amber-600 rotate-45" />
            <div className="absolute -bottom-16 w-0.5 h-16 bg-gradient-to-b from-amber-300/60 to-transparent" />
          </div>
        </div>

        {/* Floating Orb 2: Soft Rose Pink (Top Right) */}
        <div
          onClick={() => handleBalloonClick('pink')}
          className="pointer-events-auto absolute top-20 right-[5%] sm:right-[12%] animate-float-delayed cursor-pointer group transition-transform hover:scale-110 active:scale-95"
          title="Tap to chime"
        >
          <div className="relative w-12 h-16 sm:w-18 sm:h-22 rounded-full bg-gradient-to-tr from-pink-600 via-pink-300 to-pink-100 shadow-[0_10px_30px_rgba(236,72,153,0.4)] flex items-center justify-center">
            <div className="absolute top-2 left-2.5 w-3 h-5 rounded-full bg-white/70 blur-[1px] -rotate-12" />
            <Heart className="w-4 h-4 text-pink-950/40" />
            <div className="absolute -bottom-1.5 w-2 h-2 bg-pink-600 rotate-45" />
            <div className="absolute -bottom-16 w-0.5 h-16 bg-gradient-to-b from-pink-300/60 to-transparent" />
          </div>
        </div>

        {/* Floating Orb 3: Royal Lavender (Bottom Left, visible md+) */}
        <div
          onClick={() => handleBalloonClick('lavender')}
          className="pointer-events-auto hidden md:block absolute bottom-20 left-[12%] animate-float cursor-pointer group transition-transform hover:scale-110 active:scale-95"
          title="Tap to chime"
        >
          <div className="relative w-16 h-20 rounded-full bg-gradient-to-tr from-purple-700 via-purple-300 to-indigo-100 shadow-[0_10px_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
            <div className="absolute top-2 left-3 w-4 h-6 rounded-full bg-white/70 blur-[1px] -rotate-12" />
            <div className="absolute -bottom-1.5 w-2 h-2 bg-purple-700 rotate-45" />
            <div className="absolute -bottom-20 w-0.5 h-20 bg-gradient-to-b from-purple-300/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Atmospheric Kicker Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/35 border border-purple-400/25 text-purple-200 text-xs tracking-widest uppercase font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>A Celestial Milestone</span>
        <span className="text-purple-400">·</span>
        <span className="text-amber-200 font-semibold">Salma&apos;s Day</span>
      </div>

      {/* Main WOW Typography */}
      <div className="relative max-w-4xl mx-auto space-y-4">
        {/* Soft radial backlight behind typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[540px] h-48 sm:h-64 bg-gradient-to-r from-purple-600/30 via-pink-500/25 to-amber-300/25 blur-[75px] pointer-events-none -z-10" />

        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
          HAPPY BIRTHDAY,
          <br />
          <span className="relative inline-block mt-1 sm:mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 drop-shadow-[0_4px_30px_rgba(246,214,155,0.6)]">
              SALMA!
            </span>
            {/* Golden Star Sparkle over her name */}
            <span
              className="absolute -top-2 sm:-top-4 -right-5 sm:-right-8 text-xl sm:text-3xl text-amber-300 animate-bounce"
              aria-hidden="true"
            >
              ✨
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-purple-100/90 font-light max-w-2xl mx-auto leading-relaxed pt-2 px-2">
          &ldquo;If the universe had a favorite day, today would be one of them.&rdquo;
        </p>
      </div>

      {/* Trust & Harmony Indicators */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-purple-200/75">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
          Constellations Aligned
        </span>
        <span className="hidden sm:inline text-purple-400">·</span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          Infinite Wishes Queued
        </span>
        <span className="hidden sm:inline text-purple-400">·</span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
          Joy at Maximum Radiance
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 z-10 w-full max-w-md sm:max-w-none px-4">
        <a
          href="#constellation"
          onClick={() => celestialAudio.playChime(1.1)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_30px_rgba(246,214,155,0.45)] hover:shadow-[0_0_45px_rgba(246,214,155,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Compass className="w-4 h-4 text-amber-950" />
          <span>Explore The Constellation</span>
        </a>

        <a
          href="#wish-room"
          onClick={() => {
            celestialAudio.playChime(1.3);
            onMakeWishClick();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium text-purple-100 bg-purple-950/70 hover:bg-purple-900/80 border border-purple-400/35 hover:border-purple-300/60 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Wand2 className="w-4 h-4 text-pink-300" />
          <span>Make Birthday Wish 🌠</span>
        </a>
      </div>

      {/* Scroll Down Indicator */}
      <div
        onClick={onExploreClick}
        className="mt-14 flex flex-col items-center gap-1.5 text-purple-300/60 hover:text-purple-200 transition-colors cursor-pointer select-none"
      >
        <span className="text-[11px] uppercase tracking-widest font-mono">Scroll to Journey</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
