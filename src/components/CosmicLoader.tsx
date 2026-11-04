import React, { useState, useEffect } from 'react';
import { Sparkles, Star } from 'lucide-react';

interface CosmicLoaderProps {
  onComplete: () => void;
  minDuration?: number;
}

export const CosmicLoader: React.FC<CosmicLoaderProps> = ({
  onComplete,
  minDuration = 1400,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [subStatus, setSubStatus] = useState<string>('Igniting starlight...');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Check if autostart was requested in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        onComplete();
        return;
      }
    }

    const startTime = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct < 35) {
        setSubStatus('Igniting starlight...');
      } else if (pct < 75) {
        setSubStatus('Aligning constellations for Salma...');
      } else if (pct < 100) {
        setSubStatus('Gathering cosmic blessings...');
      } else {
        setSubStatus('Universe ready ✨');
        window.clearInterval(interval);
        setIsFadingOut(true);
        window.setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 40);

    return () => {
      window.clearInterval(interval);
    };
  }, [minDuration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070514] text-center px-4 transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      {/* Subtle background ambient nebulas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-purple-600/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-pink-500/15 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-sm w-full space-y-6">
        {/* Animated Orbital Central Star */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          {/* Orbital Ring 1 */}
          <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-[spin_6s_linear_infinite]" />
          {/* Orbital Ring 2 */}
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-300/40 animate-[spin_10s_linear_infinite_reverse]" />
          {/* Radiant Halo */}
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300/50 via-pink-400/40 to-purple-400/30 blur-md animate-ping" />

          {/* Core Star */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-200 via-pink-200 to-white shadow-[0_0_35px_rgba(246,214,155,0.9)] flex items-center justify-center border-2 border-white/80">
            <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-[spin_5s_linear_infinite]" />
          </div>
        </div>

        {/* Brand Tag */}
        <div className="inline-flex items-center gap-2 text-[11px] font-cinzel font-semibold uppercase tracking-widest text-amber-200/90 bg-amber-500/10 border border-amber-300/25 px-3 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-pink-300" />
          <span>The Universe Celebrates Salma</span>
        </div>

        {/* Required Primary Heading */}
        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-pink-200 leading-snug">
          Preparing Something Special for Salma...
        </h2>

        {/* Progress status & bar */}
        <div className="space-y-2 pt-2">
          <div className="w-full bg-purple-950/60 rounded-full h-2 border border-purple-400/20 p-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-purple-200/70">
            <span>{subStatus}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Skip button for instant entry */}
        <button
          onClick={() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 300);
          }}
          className="text-xs text-purple-300/50 hover:text-amber-200 transition-colors pt-2 cursor-pointer font-light underline-offset-4 hover:underline"
        >
          Skip into universe &rarr;
        </button>
      </div>
    </div>
  );
};
