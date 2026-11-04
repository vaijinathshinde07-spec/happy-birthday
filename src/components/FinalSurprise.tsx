import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { celestialAudio } from '../utils/audio';

export const FinalSurprise: React.FC = () => {
  const [isSurpriseActive, setIsSurpriseActive] = useState<boolean>(false);

  const launchFireworks = () => {
    celestialAudio.playFireworks();
    celestialAudio.playChime(1.5);
    setIsSurpriseActive(true);

    // Multi-stage fireworks sequence
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F6D69B', '#E9D5FF', '#FBCFE8', '#FFFFFF', '#BAE6FD', '#F472B6'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Secondary burst after 600ms
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F6D69B', '#FBCFE8', '#E9D5FF'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F6D69B', '#FBCFE8', '#E9D5FF'],
      });
    }, 600);
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Floating upward celebratory stars/hearts when surprise active */}
      {isSurpriseActive && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-amber-200/80"
              style={{
                left: `${(i * 6.5) % 94}%`,
                top: `${(i * 12) % 80}%`,
                animationDuration: `${4 + (i % 4)}s`,
              }}
            >
              {i % 2 === 0 ? (
                <Sparkles className="w-5 h-5 text-amber-300" />
              ) : (
                <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Central Glowing Galaxy with SALMA in the Center */}
      <div className="relative mb-12 inline-flex items-center justify-center">
        {/* Soft rotating cosmic spiral backdrop */}
        <div className="absolute -inset-24 rounded-full bg-gradient-to-r from-purple-600/30 via-pink-500/25 to-amber-300/25 blur-3xl animate-pulse pointer-events-none" />

        {/* Orbiting celestial rings */}
        <div className="absolute w-52 h-52 sm:w-80 sm:h-80 rounded-full border border-purple-400/30 scale-y-50 rotate-45 animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-60 h-60 sm:w-96 sm:h-96 rounded-full border border-amber-300/20 scale-y-50 -rotate-30 animate-[spin_30s_linear_infinite_reverse]" />

        {/* Central Core Disk */}
        <div className="relative w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#1b0b3b] via-[#4c1d95] to-[#db2777] p-1 shadow-[0_0_80px_rgba(168,85,247,0.5),inset_0_0_40px_rgba(246,214,155,0.4)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#0c0620]/80 backdrop-blur-sm flex flex-col items-center justify-center border border-amber-200/40 p-3 sm:p-4">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 mb-1 animate-pulse" />
            <span className="font-cinzel text-2xl sm:text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-white drop-shadow-[0_2px_15px_rgba(246,214,155,0.6)]">
              SALMA
            </span>
            <span className="text-[10px] tracking-widest uppercase text-purple-300/80 font-mono mt-1">
              Epicenter of Joy
            </span>
          </div>
        </div>
      </div>

      {/* Narrative Lead */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
          &ldquo;Among billions of stars, today we celebrate YOU.&rdquo;
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light">
          You bring warmth to the cold cosmos, brightness to dark nights, and magic to everyday life.
        </p>

        {/* Surprise Button */}
        <div className="pt-4">
          <button
            onClick={launchFireworks}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-slate-900 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_35px_rgba(246,214,155,0.5)] hover:shadow-[0_0_55px_rgba(246,214,155,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-purple-900" />
            <span>One Last Little Surprise ✨</span>
          </button>
        </div>
      </div>

      {/* Heartfelt Final Message Modal / Reveal Card */}
      {isSurpriseActive && (
        <div className="mt-12 p-8 sm:p-12 rounded-3xl glass-panel-glow border-2 border-amber-300/40 shadow-[0_0_60px_rgba(246,214,155,0.25)] max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-pink-400">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-bounce" />
            <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-bounce" />
          </div>

          <p className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100">
            Thank you for being you, Salma.
          </p>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-light">
            I hope this little universe brought a smile to your face.
          </p>

          <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-light">
            May your life always be filled with happiness, love, laughter, and beautiful surprises.
          </p>

          <div className="pt-3 border-t border-purple-500/25 space-y-4">
            <p className="font-cinzel text-2xl sm:text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-white">
              HAPPY BIRTHDAY! ❤️
            </p>
            <p className="text-xs text-purple-300/80 font-light italic">
              ✦ May your light continue to inspire every corner of this universe ✦
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('keepsake');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_25px_rgba(246,214,155,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-900" />
                <span>Download Your Keepsake Card 💌 &darr;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gentle Celestial Starlight Bridge Divider */}
      <div className="relative mt-20 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-24 sm:w-48 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
        <span className="mx-3 text-amber-200/60 text-xs">✦</span>
        <div className="w-24 sm:w-48 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      </div>
    </section>
  );
};
