import React, { useState, useEffect } from 'react';
import { Hourglass, Lock, Unlock, Sparkles, Send, Check } from 'lucide-react';
import { TIME_CAPSULE_MESSAGE } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const TimeCapsule: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customNote, setCustomNote] = useState<string>('');
  const [savedNote, setSavedNote] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const existing = localStorage.getItem('salma_time_capsule_note');
    if (existing) {
      setSavedNote(existing);
    }
  }, []);

  const handleOpenCapsule = () => {
    if (!isOpen) {
      celestialAudio.playEnvelopeOpen();
    } else {
      celestialAudio.playChime(1.0);
    }
    setIsOpen(!isOpen);
  };

  const handleSaveCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNote.trim()) return;

    localStorage.setItem('salma_time_capsule_note', customNote);
    setSavedNote(customNote);
    setCustomNote('');
    setIsSaved(true);
    celestialAudio.playChime(1.5);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <section id="time-capsule" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200 bg-amber-500/10 border border-amber-300/20 px-3.5 py-1.5 rounded-full">
          <Hourglass className="w-3.5 h-3.5" />
          <span>Across The Constellations of Time</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-100">
          The Time Capsule
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light">
          A timeless vault preserved in starlight, carrying encouragement for every tomorrow.
        </p>
      </div>

      {/* Time Capsule Vault Chamber */}
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel-glow border border-amber-300/30 shadow-[0_0_50px_rgba(246,214,155,0.12)]">
        {/* Top Vault Seal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 via-purple-600 to-indigo-950 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#120a28] rounded-[14px] flex items-center justify-center">
                {isOpen ? (
                  <Unlock className="w-5 h-5 text-amber-300" />
                ) : (
                  <Lock className="w-5 h-5 text-purple-300" />
                )}
              </div>
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white">
                {TIME_CAPSULE_MESSAGE.title}
              </h3>
              <p className="text-xs text-purple-300/70">{TIME_CAPSULE_MESSAGE.subtitle}</p>
            </div>
          </div>

          <button
            onClick={handleOpenCapsule}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] rounded-full text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-200 to-pink-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_20px_rgba(246,214,155,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap touch-manipulation"
          >
            {isOpen ? 'Close Capsule' : 'Open Your Time Capsule ✨'}
          </button>
        </div>

        {/* Revealed Encouragement Card */}
        {isOpen && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-950/70 via-indigo-950/60 to-[#0e0724] border border-amber-200/25 shadow-inner">
              <div className="flex items-center gap-2 text-amber-200 text-xs font-mono uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Message Inscribed for Future Salma</span>
              </div>

              <div className="space-y-4 text-purple-100/90 text-sm sm:text-base leading-relaxed font-light">
                {TIME_CAPSULE_MESSAGE.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-purple-400/20 text-right">
                <p className="font-cinzel text-xs sm:text-sm font-semibold text-amber-200">
                  {TIME_CAPSULE_MESSAGE.signoff}
                </p>
              </div>
            </div>

            {/* Saved Custom Note If Present */}
            {savedNote && (
              <div className="p-5 rounded-2xl bg-amber-400/10 border border-amber-300/30">
                <p className="text-xs font-mono uppercase tracking-wider text-amber-200 mb-2">
                  ✦ Salma&apos;s Sealed Wish for the Future:
                </p>
                <p className="font-handwriting text-xl sm:text-2xl text-amber-100">
                  &ldquo;{savedNote}&rdquo;
                </p>
              </div>
            )}

            {/* Add Custom affirmation to local capsule */}
            <form onSubmit={handleSaveCustomNote} className="space-y-3 pt-2">
              <label
                htmlFor="future-note"
                className="block text-xs font-medium text-purple-200/80"
              >
                Optional: Write a personal dream or note to seal into your time capsule:
              </label>
              <div className="flex gap-2">
                <input
                  id="future-note"
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g., By this time next year, I will have..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/30 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-amber-300/70"
                />
                <button
                  type="submit"
                  disabled={!customNote.trim()}
                  className="px-5 py-2.5 min-h-[44px] rounded-xl text-xs font-semibold text-slate-900 bg-amber-200 hover:bg-amber-100 disabled:opacity-40 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 touch-manipulation"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-800" /> Sealed
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Seal Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
