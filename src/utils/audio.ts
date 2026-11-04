/**
 * Celestial Web Audio API Synthesizer
 * Provides crystal piano / celestial bell lullaby of the birthday melody
 * and interactive sound effects without relying on external media files.
 */

class CelestialAudioSystem {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private musicTimeout: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private listeners: Set<() => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getStatus() {
    return {
      isPlaying: this.isPlayingMusic,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  // Play a soft, dreamy celestial tone (sine + soft triangle + slight bell harmonic)
  private playNote(freq: number, startTime: number, duration: number, isMusic: boolean = true) {
    if (!this.ctx) return;
    const parentGain = isMusic ? this.musicGain : this.sfxGain;
    if (!parentGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warm overtone for celestial bell / rhodes piano vibe
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Envelope
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(parentGain);

    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  // Melodic birthday tune in dreamy celestial style:
  // Frequencies for a soft G major rendition:
  // G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F#5: 739.99, G5: 783.99
  private readonly MELODY: Array<{ freq: number; dur: number; rest: number }> = [
    // Happy Birthday to you
    { freq: 392.00, dur: 0.5, rest: 0.6 },
    { freq: 392.00, dur: 0.4, rest: 0.5 },
    { freq: 440.00, dur: 0.9, rest: 1.0 },
    { freq: 392.00, dur: 0.9, rest: 1.0 },
    { freq: 523.25, dur: 0.9, rest: 1.0 },
    { freq: 493.88, dur: 1.6, rest: 1.8 },

    // Happy Birthday to you
    { freq: 392.00, dur: 0.5, rest: 0.6 },
    { freq: 392.00, dur: 0.4, rest: 0.5 },
    { freq: 440.00, dur: 0.9, rest: 1.0 },
    { freq: 392.00, dur: 0.9, rest: 1.0 },
    { freq: 587.33, dur: 0.9, rest: 1.0 },
    { freq: 523.25, dur: 1.6, rest: 1.8 },

    // Happy Birthday Dear Salma
    { freq: 392.00, dur: 0.5, rest: 0.6 },
    { freq: 392.00, dur: 0.4, rest: 0.5 },
    { freq: 783.99, dur: 1.0, rest: 1.1 },
    { freq: 659.25, dur: 0.9, rest: 1.0 },
    { freq: 523.25, dur: 0.9, rest: 1.0 },
    { freq: 493.88, dur: 0.9, rest: 1.0 },
    { freq: 440.00, dur: 1.4, rest: 1.6 },

    // Happy Birthday to you
    { freq: 698.46, dur: 0.5, rest: 0.6 },
    { freq: 698.46, dur: 0.4, rest: 0.5 },
    { freq: 659.25, dur: 0.9, rest: 1.0 },
    { freq: 523.25, dur: 0.9, rest: 1.0 },
    { freq: 587.33, dur: 1.0, rest: 1.1 },
    { freq: 523.25, dur: 2.2, rest: 2.6 },
  ];

  public startMusic() {
    this.initContext();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;
    this.notify();
    this.loopMelody(0);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout !== null) {
      window.clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
    this.notify();
  }

  public toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  private loopMelody(noteIndex: number) {
    if (!this.isPlayingMusic || !this.ctx) return;

    const note = this.MELODY[noteIndex];
    const now = this.ctx.currentTime;
    this.playNote(note.freq, now, note.dur, true);

    // Add a gentle soft arpeggiated bass harmony note
    if (noteIndex % 3 === 0) {
      this.playNote(note.freq / 2, now + 0.05, note.dur * 1.5, true);
    }

    const nextIndex = (noteIndex + 1) % this.MELODY.length;
    // Slight pause between loops
    const delay = note.rest * 1000;

    this.musicTimeout = window.setTimeout(() => {
      this.loopMelody(nextIndex);
    }, delay);
  }

  // Interactive Sound Effects:
  public playChime(pitchMultiplier: number = 1) {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = 587.33 * pitchMultiplier;
    this.playNote(baseFreq, now, 0.7, false);
    this.playNote(baseFreq * 1.5, now + 0.08, 0.9, false);
    this.playNote(baseFreq * 2, now + 0.16, 1.2, false);
  }

  public playWhoosh() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.8);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  public playEnvelopeOpen() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.12, 0.8, false);
    });
  }

  public playCandleBlow() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    // Gentle whoosh + soft descending crystal
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.5);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  public playFireworks() {
    this.initContext();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;
    chords.forEach((freq, i) => {
      this.playNote(freq, now + i * 0.06, 1.5, false);
    });
  }
}

export const celestialAudio = new CelestialAudioSystem();
