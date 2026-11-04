import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronUp, ChevronDown } from 'lucide-react';
import { celestialAudio } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      const status = celestialAudio.getStatus();
      setIsPlaying(status.isPlaying);
      setIsMuted(status.isMuted);
      setVolume(status.volume);
    };

    update();
    const unsubscribe = celestialAudio.subscribe(update);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleTogglePlay = () => {
    celestialAudio.toggleMusic();
  };

  const handleToggleMute = () => {
    celestialAudio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    celestialAudio.setVolume(val);
  };

  return (
    <aside
      aria-label="Celestial Music Player"
      className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Expanded control panel */}
      {isExpanded && (
        <div className="mb-2 p-4 rounded-2xl glass-panel-glow text-xs text-purple-100 flex flex-col gap-3 w-[calc(100vw-24px)] max-w-[280px] sm:w-64 shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-amber-300/30 animate-in fade-in slide-in-from-bottom-3 duration-250">
          <div className="flex items-center justify-between">
            <span className="font-cinzel text-amber-200 text-xs font-semibold flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-pink-300" />
              Celestial Lullaby
            </span>
            <span className="text-[10px] text-purple-300/70 font-mono">Synthesizer</span>
          </div>

          <div className="text-[11px] text-purple-200/80 leading-snug">
            Soft birthday piano & crystal celeste harmonies.
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-2 pt-1 border-t border-purple-500/20">
            <button
              onClick={handleToggleMute}
              className="text-purple-300 hover:text-white transition-colors p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-pink-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-200" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-300 h-2 bg-purple-950/80 rounded-lg cursor-pointer"
              aria-label="Celestial music volume"
            />
            <span className="text-[10px] text-purple-300/90 font-mono w-7 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      )}

      {/* Floating minimal toggle dock */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#120a28]/90 backdrop-blur-xl shadow-[0_6px_25px_rgba(0,0,0,0.6)] border border-amber-300/30">
        <button
          onClick={handleTogglePlay}
          className="flex items-center gap-2 pl-3 pr-2.5 py-2 min-h-[44px] rounded-full bg-purple-500/20 hover:bg-purple-500/35 text-xs font-medium text-purple-100 transition-all cursor-pointer group active:scale-95 touch-manipulation"
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
        >
          {/* Animated 4-Bar Equalizer when playing */}
          <div className="flex items-end gap-0.5 h-3 w-3.5" aria-hidden="true">
            <span
              className={`w-0.5 bg-amber-300 rounded-full transition-all ${
                isPlaying ? 'h-3 animate-[pulse_0.8s_ease-in-out_infinite]' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-pink-300 rounded-full transition-all ${
                isPlaying ? 'h-2 animate-[pulse_1.1s_ease-in-out_infinite_0.2s]' : 'h-1.5'
              }`}
            />
            <span
              className={`w-0.5 bg-purple-300 rounded-full transition-all ${
                isPlaying ? 'h-3.5 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-amber-200 rounded-full transition-all ${
                isPlaying ? 'h-2 animate-[pulse_0.9s_ease-in-out_infinite_0.1s]' : 'h-0.5'
              }`}
            />
          </div>

          <span className="text-[11px] font-medium tracking-wide">
            {isPlaying ? 'Celestial Melody' : 'Play Melody'}
          </span>

          <div className="w-6 h-6 rounded-full bg-amber-300/20 flex items-center justify-center text-amber-200 group-hover:bg-amber-300/30 transition-colors">
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </div>
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 min-w-[36px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-purple-500/20 text-purple-300/80 hover:text-white transition-colors touch-manipulation"
          aria-label="Toggle audio controls"
          title="Audio settings"
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
