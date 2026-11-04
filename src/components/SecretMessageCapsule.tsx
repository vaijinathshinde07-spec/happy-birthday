import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Heart, Unlock, Lock, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SECRET_CAPSULE_MESSAGE } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const SecretMessageCapsule: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const handleOpenCapsule = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    celestialAudio.playEnvelopeOpen();
    celestialAudio.playChime(1.3);

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      celestialAudio.playFireworks();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#F6D69B', '#FDE68A', '#E9D5FF', '#BAE6FD'],
      });
    }, 700);
  };

  const handleClose = () => {
    setIsOpen(false);
    celestialAudio.playChime(0.9);
  };

  return (
    <section id="capsule" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200 bg-amber-500/10 border border-amber-300/20 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Celestial Relic</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-100">
          The Secret Message Capsule
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light">
          A floating crystal-and-gold canister preserved in high orbit. Tap to unlock its cosmic vault.
        </p>
      </div>

      {/* Floating 3D Capsule Object */}
      <div className="relative inline-flex flex-col items-center justify-center my-6">
        {/* Soft radial glow */}
        <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-amber-400/25 via-purple-600/20 to-pink-500/20 blur-2xl animate-pulse pointer-events-none" />

        <div
          onClick={handleOpenCapsule}
          className={`relative group cursor-pointer animate-float transition-transform duration-500 hover:scale-105 active:scale-95 ${
            isOpening ? 'scale-110' : ''
          }`}
          title="Click to unlock the secret capsule"
        >
          {/* Outer Golden Shell Container */}
          <div className="relative w-44 sm:w-56 h-60 sm:h-72 rounded-[45px] bg-gradient-to-b from-[#2a1b4d] via-[#1a0e36] to-[#0c0620] border-2 border-amber-300/60 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(246,214,155,0.25)] p-3 flex flex-col items-center justify-between overflow-hidden">
            {/* Top Golden Dome Ring */}
            <div className="w-full flex items-center justify-between px-3 py-1 border-b border-amber-300/40">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-cinzel text-[10px] tracking-widest text-amber-200 uppercase font-bold">
                Orbital Vault
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>

            {/* Central Glass Chamber with Floating Starlight Core */}
            <div className="relative w-full flex-1 my-2 rounded-2xl bg-gradient-to-b from-white/10 via-purple-500/10 to-indigo-900/30 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center overflow-hidden">
              {/* Internal spinning gyroscope rings */}
              <div className="absolute w-28 h-28 rounded-full border border-amber-300/30 -rotate-45 animate-[spin_8s_linear_infinite]" />
              <div className="absolute w-24 h-24 rounded-full border border-pink-300/30 rotate-45 animate-[spin_6s_linear_infinite_reverse]" />

              {/* Glowing Heart Core */}
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-300 via-pink-400 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.9)] border border-white/60 group-hover:scale-125 transition-transform">
                <Heart className="w-6 h-6 fill-rose-100 text-rose-200 animate-pulse" />
              </div>

              {/* Status Indicator */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-amber-300/40 text-[10px] font-mono text-amber-200">
                {isOpen ? <Unlock className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-amber-300" />}
                <span>{isOpen ? 'UNLOCKED' : 'TAP TO UNSEAL'}</span>
              </div>
            </div>

            {/* Bottom Golden Base Ring */}
            <div className="w-full flex items-center justify-center py-1 border-t border-amber-300/40">
              <span className="font-cinzel text-[9px] text-amber-200/70 tracking-widest uppercase">
                ✦ Encrypted with Love ✦
              </span>
            </div>
          </div>
        </div>

        {/* Prompt Button */}
        <div className="mt-6">
          <button
            onClick={handleOpenCapsule}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_20px_rgba(246,214,155,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-900" />
            <span>Open Capsule ✨</span>
          </button>
        </div>
      </div>

      {/* Holographic Revealed Message Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#070514]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-10 rounded-3xl glass-panel-glow border-2 border-amber-300/60 shadow-[0_0_60px_rgba(246,214,155,0.4)] text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 min-w-[40px] min-h-[40px] rounded-full text-purple-300/70 hover:text-white hover:bg-purple-900/50 transition-colors flex items-center justify-center cursor-pointer touch-manipulation"
              aria-label="Close capsule message"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 via-pink-400 to-purple-600 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(246,214,155,0.7)] border-2 border-white/50">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                ✦ {SECRET_CAPSULE_MESSAGE.prelude} ✦
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {SECRET_CAPSULE_MESSAGE.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-light pt-2">
              {SECRET_CAPSULE_MESSAGE.message}
            </p>

            <div className="pt-4 flex items-center justify-center border-t border-purple-400/20">
              <p className="font-cinzel text-xs uppercase tracking-widest text-amber-200">
                ✦ Eternal Birthday Blessing for Salma ✦
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
