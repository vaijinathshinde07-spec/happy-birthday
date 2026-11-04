import React, { useState } from 'react';
import { Mail, Sparkles, Heart, Check, Copy, RotateCcw, X } from 'lucide-react';
import { LETTER_CONTENT } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const GlowingLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    celestialAudio.playEnvelopeOpen();
    celestialAudio.playChime(1.2);

    // Sequence: Flap opens -> Letter slides out and unfolds
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleClose = () => {
    if (!isOpen || isAnimating) return;
    setIsAnimating(true);
    celestialAudio.playChime(0.9);

    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 400);
  };

  const handleCopy = () => {
    const fullText = `${LETTER_CONTENT.salutation}\n\n${LETTER_CONTENT.paragraphs.join('\n\n')}\n\n${LETTER_CONTENT.closing}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="letter" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
      {/* Background celestial starlight bloom */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-purple-900/15 via-pink-900/10 to-amber-900/10 blur-[90px] pointer-events-none transition-opacity duration-1000 ${
          isOpen ? 'opacity-100' : 'opacity-30'
        }`}
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pink-300 bg-pink-500/10 border border-pink-300/20 px-3.5 py-1.5 rounded-full">
          <Mail className="w-3.5 h-3.5" />
          <span>A Celestial Keepsake</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100">
          The Letter That Glows
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light max-w-lg mx-auto">
          A heartfelt handwritten message sent across the cosmos, sealed with starlight and love.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          {!isOpen ? (
            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_30px_rgba(246,214,155,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-purple-900" />
              <span>Open Your Letter 💌</span>
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-purple-200 bg-purple-950/80 hover:bg-purple-900 border border-purple-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-200" />
              <span>Fold Letter Back ✉️</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
        {/* CLOSED ENVELOPE VIEW (when not open) */}
        {!isOpen && (
          <div
            onClick={handleOpen}
            className="group relative w-full max-w-[300px] min-[360px]:max-w-[340px] sm:max-w-[440px] md:max-w-[480px] aspect-[1.58/1] cursor-pointer animate-float transition-all duration-500 hover:scale-105 select-none touch-manipulation"
            title="Click to open letter"
          >
            {/* Soft outer glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600/30 via-pink-500/20 to-amber-300/25 blur-xl group-hover:opacity-100 opacity-60 transition-opacity" />

            {/* Envelope Body Frame */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#1a0f30] via-[#241344] to-[#140b26] border border-amber-300/35 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.25)] overflow-hidden">
              {/* Responsive SVG Envelope Geometry */}
              <svg
                viewBox="0 0 500 316"
                className="w-full h-full absolute inset-0 pointer-events-none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="envFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2c1752" />
                    <stop offset="100%" stopColor="#1e0f3b" />
                  </linearGradient>
                  <linearGradient id="envSideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1a0a33" />
                    <stop offset="100%" stopColor="#221142" />
                  </linearGradient>
                  <linearGradient id="envGoldLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F6D69B" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Left Side Flap */}
                <polygon
                  points="0,0 240,158 0,316"
                  fill="url(#envSideGrad)"
                  stroke="url(#envGoldLine)"
                  strokeWidth="0.8"
                />

                {/* Right Side Flap */}
                <polygon
                  points="500,0 260,158 500,316"
                  fill="url(#envSideGrad)"
                  stroke="url(#envGoldLine)"
                  strokeWidth="0.8"
                />

                {/* Bottom Triangle Flap */}
                <polygon
                  points="0,316 250,150 500,316"
                  fill="#29154c"
                  stroke="url(#envGoldLine)"
                  strokeWidth="1"
                />

                {/* Top Flap (pointing down when closed) */}
                <polygon
                  points="0,0 250,165 500,0"
                  fill="url(#envFlapGrad)"
                  stroke="url(#envGoldLine)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Wax Seal with Golden Star at center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_25px_rgba(245,158,11,0.8),inset_0_2px_4px_rgba(255,255,255,0.7)] border-2 border-amber-100 flex items-center justify-center transform group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-800/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-950" />
                  </div>
                  {/* Subtle radiating star spark */}
                  <span className="absolute -top-1 -right-1 text-xs text-amber-200 animate-ping">✦</span>
                </div>
              </div>

              {/* Hint text at bottom of envelope */}
              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none px-2">
                <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-widest text-amber-200/70">
                  Tap to unseal Salma&apos;s letter
                </span>
              </div>
            </div>
          </div>
        )}

        {/* EXPANDED LUXURY LETTER VIEW (when open) */}
        {isOpen && (
          <div className="relative w-full max-w-2xl mx-auto z-20 animate-in fade-in zoom-in-95 duration-500">
            {/* Ambient floating golden stardust around letter */}
            <div className="absolute -inset-4 sm:-inset-6 pointer-events-none" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float text-amber-300/70 text-xs"
                  style={{
                    left: `${(i * 13) % 95}%`,
                    top: `${(i * 14) % 85}%`,
                    animationDuration: `${3.5 + (i % 3)}s`,
                  }}
                >
                  ✦
                </div>
              ))}
            </div>

            {/* Letter Parchment Card */}
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#fdfbf7] via-[#faf5ec] to-[#f4eee2] text-slate-900 p-5 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_45px_rgba(246,214,155,0.35)] border-2 border-amber-200/80">
              {/* Close Button top-right */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 min-w-[40px] min-h-[40px] rounded-full text-slate-500 hover:text-slate-900 hover:bg-amber-100 transition-colors cursor-pointer flex items-center justify-center touch-manipulation"
                aria-label="Fold letter back"
                title="Fold letter back"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Letter Header */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-amber-800/15 pr-8 sm:pr-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  </div>
                  <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase text-purple-950">
                    A Celestial Milestone Letter
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full text-xs font-medium text-purple-900 bg-amber-200/60 hover:bg-amber-200 transition-colors cursor-pointer touch-manipulation"
                  title="Copy letter to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Letter</span>
                    </>
                  )}
                </button>
              </div>

              {/* Handwritten Letter Prose */}
              <div className="pt-5 sm:pt-6 font-handwriting text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl text-purple-950 leading-relaxed sm:leading-loose space-y-3.5 sm:space-y-5">
                <p className="font-bold text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl text-purple-900">
                  {LETTER_CONTENT.salutation}
                </p>

                {LETTER_CONTENT.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-800">
                    {p}
                  </p>
                ))}

                {/* Sign-off */}
                <div className="pt-4 flex items-center justify-end gap-2.5 text-2xl sm:text-3xl font-bold text-purple-950">
                  <span>{LETTER_CONTENT.closing}</span>
                  <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
                </div>
              </div>

              {/* Gold foil bottom stamp */}
              <div className="mt-8 pt-4 border-t border-amber-800/15 flex items-center justify-between text-[11px] font-cinzel text-amber-900/60 uppercase tracking-widest">
                <span>Inscribed for Salma</span>
                <span>✦ Bound by Starlight ✦</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
