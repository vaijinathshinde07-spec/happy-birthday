import React, { useState } from 'react';
import { Sparkles, Flower2, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GARDEN_FLOWERS, GardenFlower } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const GardenOfHappiness: React.FC = () => {
  const [grownFlowers, setGrownFlowers] = useState<GardenFlower[]>([]);
  const [activeFlower, setActiveFlower] = useState<GardenFlower | null>(null);
  const isGardenComplete = grownFlowers.length === GARDEN_FLOWERS.length;

  const handleGrowNextFlower = () => {
    if (isGardenComplete) return;

    const nextIndex = grownFlowers.length;
    const flower = GARDEN_FLOWERS[nextIndex];
    setGrownFlowers((prev) => [...prev, flower]);
    setActiveFlower(flower);

    celestialAudio.playChime(1.1 + nextIndex * 0.12);

    // If this completed the 6th flower, trigger celebration
    if (nextIndex === GARDEN_FLOWERS.length - 1) {
      setTimeout(() => {
        celestialAudio.playFireworks();
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#E9D5FF', '#BAE6FD', '#FDE68A', '#6EE7B7'],
        });
      }, 500);
    }
  };

  const handleResetGarden = () => {
    setGrownFlowers([]);
    setActiveFlower(null);
    celestialAudio.playChime(0.9);
  };

  return (
    <section id="garden" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-pink-300 bg-pink-500/10 border border-pink-300/20 px-3.5 py-1.5 rounded-full">
          <Flower2 className="w-3.5 h-3.5" />
          <span>Interactive Enchantment</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-amber-100">
          A Garden of Happiness
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light max-w-lg mx-auto">
          Every blossom carries a wish for your future. Tap the garden soil to bloom six celestial flowers.
        </p>

        {/* Progress & Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-300/80 font-mono">
              Blossoms in bloom: {grownFlowers.length} of 6
            </span>
            <div className="w-28 sm:w-36 h-2 rounded-full bg-purple-950 border border-purple-500/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 transition-all duration-500 rounded-full"
                style={{ width: `${(grownFlowers.length / 6) * 100}%` }}
              />
            </div>
          </div>

          {!isGardenComplete ? (
            <button
              onClick={handleGrowNextFlower}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-900 bg-gradient-to-r from-pink-200 via-amber-200 to-purple-200 hover:from-pink-100 hover:to-amber-100 shadow-[0_0_20px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-900" />
              <span>Bloom Next Flower 🌸</span>
            </button>
          ) : (
            <button
              onClick={handleResetGarden}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-purple-200 bg-purple-950/70 hover:bg-purple-900 border border-purple-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-200" />
              <span>Plant Again 🌱</span>
            </button>
          )}
        </div>
      </div>

      {/* Enchanted Celestial Garden Meadow Bed */}
      <div
        onClick={!isGardenComplete ? handleGrowNextFlower : undefined}
        className={`relative w-full min-h-[380px] sm:min-h-[440px] rounded-3xl glass-panel-glow border border-pink-400/25 p-6 sm:p-10 flex flex-col justify-end overflow-hidden shadow-[0_0_50px_rgba(30,10,40,0.8)] select-none ${
          !isGardenComplete ? 'cursor-pointer' : ''
        }`}
        title={!isGardenComplete ? 'Click anywhere on the meadow to grow a flower' : ''}
      >
        {/* Subtle luminous soil and glowing root network */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0b2b] via-[#100720]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-[radial-gradient(ellipse_at_bottom,_rgba(244,114,182,0.15)_0%,_transparent_75%)] pointer-events-none" />

        {/* Floating starlight spores / fireflies */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/60 animate-ping"
              style={{
                left: `${(i * 8.5 + 4) % 94}%`,
                top: `${(i * 7 + 25) % 80}%`,
                animationDuration: `${2.5 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* 6 Celestial Flower Slots Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 items-end pb-4">
          {GARDEN_FLOWERS.map((flower, idx) => {
            const isGrown = idx < grownFlowers.length;
            const isSelected = activeFlower?.id === flower.id;

            return (
              <div
                key={flower.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isGrown) {
                    setActiveFlower(flower);
                    celestialAudio.playChime(1.2 + idx * 0.1);
                  } else {
                    handleGrowNextFlower();
                  }
                }}
                className="flex flex-col items-center justify-end h-52 sm:h-72 cursor-pointer group touch-manipulation"
              >
                {isGrown ? (
                  /* Blossomed Flower Animation */
                  <div className="flex flex-col items-center animate-in fade-in zoom-in-75 duration-700">
                    {/* Glowing Flower Petal Head */}
                    <div
                      style={{
                        boxShadow: `0 0 25px ${flower.glowColor}`,
                        borderColor: flower.petalColor,
                      }}
                      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-115 ${
                        isSelected ? 'scale-125 ring-2 ring-amber-300' : ''
                      }`}
                    >
                      {/* Petals SVG */}
                      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite]">
                        {[0, 60, 120, 180, 240, 300].map((deg) => (
                          <ellipse
                            key={deg}
                            cx="50"
                            cy="26"
                            rx="12"
                            ry="20"
                            fill={flower.petalColor}
                            opacity="0.85"
                            transform={`rotate(${deg} 50 50)`}
                          />
                        ))}
                        {/* Golden starlight center */}
                        <circle cx="50" cy="50" r="14" fill="#FDE68A" />
                      </svg>
                      {/* Center spark */}
                      <span className="absolute text-[11px] font-bold text-amber-900 pointer-events-none">✦</span>
                    </div>

                    {/* Living Stem & Leaves */}
                    <div className="relative w-1.5 h-20 sm:h-36 bg-gradient-to-b from-emerald-400 via-emerald-600 to-emerald-900 rounded-full my-0.5">
                      {/* Left Leaf */}
                      <div className="absolute top-6 sm:top-8 -left-3.5 sm:-left-4 w-3.5 sm:w-4 h-2 sm:h-2.5 rounded-full bg-emerald-500 -rotate-30 origin-right" />
                      {/* Right Leaf */}
                      <div className="absolute top-12 sm:top-16 -right-3.5 sm:-right-4 w-3.5 sm:w-4 h-2 sm:h-2.5 rounded-full bg-emerald-400 rotate-30 origin-left" />
                    </div>

                    {/* Flower Name Tag */}
                    <span className="text-[10px] sm:text-[11px] font-cinzel font-semibold text-purple-200/90 whitespace-nowrap text-center mt-1 group-hover:text-amber-200 transition-colors">
                      {flower.name}
                    </span>
                  </div>
                ) : (
                  /* Empty Soil Seed Plot with Subtle Pulsing Marker */
                  <div className="flex flex-col items-center justify-end h-full pb-2">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-purple-500/30 flex items-center justify-center text-purple-400/50 group-hover:border-pink-300/60 group-hover:text-pink-200 transition-all">
                      <span className="text-xs">+</span>
                    </div>
                    <div className="w-12 h-2 rounded-full bg-purple-900/40 mt-3" />
                    <span className="text-[10px] text-purple-400/40 font-mono mt-1">Seed {idx + 1}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty Garden Helper Prompt */}
        {grownFlowers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-6 py-3 rounded-2xl glass-panel border border-pink-300/30 text-center animate-pulse">
              <p className="font-cinzel text-sm sm:text-base text-amber-200 font-semibold">
                Tap anywhere on the meadow to plant your first flower ✨
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Flower Message Box */}
      {activeFlower && (
        <div className="mt-8 p-6 sm:p-8 rounded-3xl glass-panel-glow border border-pink-300/40 shadow-[0_0_40px_rgba(244,114,182,0.2)] max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start sm:items-center gap-4">
            <div
              style={{ backgroundColor: activeFlower.petalColor }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0 text-slate-900 font-bold"
            >
              🌸
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                  {activeFlower.name} · {activeFlower.type}
                </span>
                <span className="text-purple-400">·</span>
                <span className="text-xs text-purple-300/70">Blooming Blessing</span>
              </div>
              <p className="font-cinzel text-base sm:text-xl font-bold text-white leading-relaxed">
                &ldquo;{activeFlower.message}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Complete Garden Celebration Card */}
      {isGardenComplete && (
        <div className="mt-8 p-6 sm:p-8 rounded-3xl glass-panel-glow border-2 border-emerald-400/40 shadow-[0_0_50px_rgba(110,231,183,0.3)] text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-400/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-300 shadow-[0_0_20px_#6ee7b7]">
            <CheckCircle2 className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            The Garden of Happiness is in Full Bloom! 🌺
          </h3>

          <p className="text-sm text-purple-200/90 leading-relaxed font-light">
            Just like these celestial blossoms, Salma, may your life always grow in warmth, elegance, and beauty.
          </p>
        </div>
      )}
    </section>
  );
};
