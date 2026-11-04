import React, { useState } from 'react';
import { Star as StarIcon, CheckCircle2, X } from 'lucide-react';
import { CONSTELLATION_STARS, ConstellationStar, calculateConstellationProgress } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const ConstellationOfSmiles: React.FC = () => {
  const [selectedStar, setSelectedStar] = useState<ConstellationStar | null>(null);
  const [discoveredIds, setDiscoveredIds] = useState<number[]>([1]); // First star lit for instant invitation

  const progress = calculateConstellationProgress(discoveredIds);

  const handleStarClick = (star: ConstellationStar) => {
    setSelectedStar(star);
    if (!discoveredIds.includes(star.id)) {
      setDiscoveredIds((prev) => [...prev, star.id]);
    }
    celestialAudio.playChime(1 + star.id * 0.15);
  };

  const handleCloseModal = () => {
    setSelectedStar(null);
  };

  return (
    <section id="constellation" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200 bg-amber-500/10 border border-amber-300/20 px-3.5 py-1.5 rounded-full">
          <StarIcon className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>Interactive Star Map</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-amber-100">
          The Constellation of Smiles
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light max-w-lg mx-auto">
          Six eternal stars aligned in Salma&apos;s celestial sky. Tap each star to illuminate its hidden message.
        </p>

        {/* Discovery Progress Meter */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="w-40 sm:w-48 h-2 rounded-full bg-purple-950/80 border border-purple-500/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 transition-all duration-700 rounded-full"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-xs font-medium text-amber-200/90 font-mono">
            {progress.count} of {progress.total} Stars Lit
          </span>
          {progress.isComplete && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              <CheckCircle2 className="w-3.5 h-3.5" /> Constellation Complete!
            </span>
          )}
        </div>
      </div>

      {/* Interactive Celestial Star Map Canvas Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[560px] rounded-3xl glass-panel-glow overflow-hidden p-4 sm:p-8 flex items-center justify-center border border-purple-400/25 shadow-[0_0_60px_rgba(20,10,45,0.85)]">
        {/* Subtle grid and circular orbital guidelines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(88,28,135,0.18)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute w-[80%] aspect-square rounded-full border border-purple-500/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
        <div className="absolute w-[50%] aspect-square rounded-full border border-purple-500/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

        {/* Constellation Connection Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="constellationLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6D69B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Polyline connecting the 6 stars into the crown constellation */}
          <polyline
            points="22,42 38,24 52,48 68,26 82,54 58,78 22,42"
            fill="rgba(168, 85, 247, 0.04)"
            stroke="url(#constellationLine)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            className="animate-pulse"
          />
          {/* Secondary bridge line */}
          <line
            x1="38"
            y1="24"
            x2="68"
            y2="26"
            stroke="rgba(246, 214, 155, 0.45)"
            strokeWidth="0.6"
            strokeDasharray="1.5 1.5"
          />
        </svg>

        {/* 6 Clickable Glowing Stars */}
        {CONSTELLATION_STARS.map((star) => {
          const isDiscovered = discoveredIds.includes(star.id);
          const isSelected = selectedStar?.id === star.id;

          return (
            <div
              key={star.id}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => handleStarClick(star)}
                className="relative group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-full active:scale-95 transition-transform"
                aria-label={`Star ${star.id}: ${star.name}`}
              >
                {/* Radiant pulsating halo */}
                <div
                  className={`absolute -inset-2 rounded-full transition-all duration-500 ${
                    isSelected
                      ? 'scale-150 opacity-100 bg-amber-300/35 blur-md'
                      : isDiscovered
                      ? 'opacity-70 bg-purple-400/25 blur-sm group-hover:scale-125 group-hover:opacity-100'
                      : 'opacity-30 bg-white/10 group-hover:opacity-75'
                  }`}
                />

                {/* Star icon & aura */}
                <div
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'scale-125 bg-amber-200 text-slate-900 shadow-[0_0_25px_#fde68a]'
                      : isDiscovered
                      ? 'bg-purple-900/90 text-amber-200 border border-amber-300/40 shadow-[0_0_15px_rgba(246,214,155,0.45)] group-hover:scale-115'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-700 group-hover:border-purple-400 group-hover:text-purple-200'
                  }`}
                >
                  <StarIcon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45 ${
                      isDiscovered ? 'fill-amber-300 text-amber-300' : 'text-slate-400'
                    }`}
                  />

                  {/* Star Index number badge */}
                  <span className="absolute -bottom-1 -right-1 text-[10px] font-mono px-1 rounded-full bg-purple-950 border border-purple-400/40 text-purple-200 font-bold">
                    {star.id}
                  </span>
                </div>

                {/* Floating Tooltip Label (Desktop hover) */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 hidden sm:block">
                  <span className="text-[11px] font-medium text-amber-200 bg-purple-950/95 border border-amber-300/30 px-2.5 py-0.5 rounded-full shadow-lg">
                    {star.name}
                  </span>
                </div>
              </button>
            </div>
          );
        })}

        {/* Constellation Watermark */}
        <div className="absolute bottom-2.5 left-3 sm:bottom-4 sm:left-6 pointer-events-none">
          <p className="font-cinzel text-[10px] sm:text-sm tracking-wider sm:tracking-widest uppercase text-purple-300/70">
            Constellation: Corona Salmae
          </p>
          <p className="text-[9px] sm:text-[11px] text-purple-400/50">Coordinates: RA 12h 44m · Epoch Forever</p>
        </div>
      </div>

      {/* Selected Star Revealed Message Card Modal */}
      {selectedStar && (
        <div className="mt-8 p-5 sm:p-8 rounded-3xl glass-panel-glow border border-amber-300/35 shadow-[0_0_40px_rgba(246,214,155,0.2)] relative animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-3xl mx-auto">
          <button
            onClick={handleCloseModal}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 min-w-[40px] min-h-[40px] rounded-full text-purple-300/70 hover:text-white hover:bg-purple-900/50 transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
            aria-label="Close star message"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-200 via-pink-200 to-purple-300 p-0.5 shadow-[0_0_20px_rgba(246,214,155,0.4)] shrink-0">
              <div className="w-full h-full bg-[#120a2e] rounded-[14px] flex items-center justify-center">
                <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-300 text-amber-300 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1.5 flex-1 pr-6 sm:pr-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                  Star {selectedStar.id} of 6 · {selectedStar.name}
                </span>
                <span className="text-purple-400">·</span>
                <span className="text-xs text-purple-300/80">{selectedStar.meaning}</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-white leading-snug">
                &ldquo;{selectedStar.message}&rdquo;
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
