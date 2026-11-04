import React, { useState } from 'react';
import { Heart, Sparkles, Copy, Check, Smile } from 'lucide-react';
import { HAPPINESS_MESSAGES, getNextMessage, shuffleArray } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const HappinessCorner: React.FC = () => {
  const [deck, setDeck] = useState<string[]>(() => shuffleArray(HAPPINESS_MESSAGES));
  const [deckIndex, setDeckIndex] = useState<number>(1);
  const [currentMessage, setCurrentMessage] = useState<string>(
    "You carry a quiet grace that turns ordinary days into poetry."
  );
  const [smilesReceived, setSmilesReceived] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleGiveMeASmile = () => {
    setIsAnimating(true);
    celestialAudio.playChime(1.3);

    const result = getNextMessage(deck, deckIndex);
    setCurrentMessage(result.message);
    setDeckIndex(result.nextIndex);
    setDeck(result.newDeck);
    setSmilesReceived((prev) => prev + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="happiness" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pink-300 bg-pink-500/10 border border-pink-300/20 px-3.5 py-1.5 rounded-full">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400 animate-pulse" />
          <span>Infinite Joy Vault</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100">
          A Little Happiness Corner 💗
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light">
          Whenever you need a reminder of how extraordinary and cherished you are, tap below.
        </p>

        {/* Counter Metric */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs text-purple-300/70">
          <span>Smiles gathered today:</span>
          <span className="font-mono font-bold text-amber-200 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
            {smilesReceived}
          </span>
        </div>
      </div>

      {/* Main Interactive Message Card */}
      <div className="relative p-5 sm:p-10 md:p-12 rounded-3xl glass-panel-glow border border-pink-400/25 shadow-[0_10px_40px_rgba(236,72,153,0.15)] flex flex-col items-center text-center">
        {/* Glowing Heart Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-full bg-pink-500/30 blur-lg animate-pulse" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg border border-pink-200/40">
            <Heart className="w-8 h-8 fill-pink-100 text-pink-100 drop-shadow" />
          </div>
        </div>

        {/* Animated Message Quote */}
        <div
          className={`min-h-[110px] flex items-center justify-center transition-all duration-300 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <blockquote className="font-cinzel text-xl sm:text-2xl md:text-3xl text-slate-100 font-medium leading-relaxed max-w-2xl">
            &ldquo;{currentMessage}&rdquo;
          </blockquote>
        </div>

        {/* Card Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleGiveMeASmile}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-r from-pink-200 via-amber-200 to-purple-200 hover:from-pink-100 hover:to-amber-100 shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Smile className="w-4 h-4 text-purple-900" />
            <span>Give Me A Smile ✨</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium text-purple-200 bg-purple-950/70 hover:bg-purple-900 border border-purple-400/30 transition-all hover:scale-105 cursor-pointer"
            title="Copy this smile note"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-purple-300" />
                <span>Save This Note</span>
              </>
            )}
          </button>
        </div>

        {/* Note Footer */}
        <div className="mt-8 pt-4 border-t border-purple-500/15 w-full flex items-center justify-between text-[11px] text-purple-300/50">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300/60" />
            Deck of {HAPPINESS_MESSAGES.length} curated affirmations
          </span>
          <span>Crafted with cosmic warmth</span>
        </div>
      </div>
    </section>
  );
};
