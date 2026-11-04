import React, { useRef, useState } from 'react';
import { Download, Sparkles, Heart, Check, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KEEPSAKE_CARD_DATA } from '../utils/constants';
import { celestialAudio } from '../utils/audio';

export const BirthdayKeepsake: React.FC = () => {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = () => {
    setDownloading(true);
    celestialAudio.playChime(1.4);

    // Render luxury card to offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setDownloading(false);
      return;
    }

    // 1. Deep Midnight Cosmic Background
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, '#04020c');
    bgGrad.addColorStop(0.4, '#0c0628');
    bgGrad.addColorStop(0.7, '#160938');
    bgGrad.addColorStop(1, '#050314');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // 2. Cosmic Nebulae
    const neb1 = ctx.createRadialGradient(300, 250, 20, 300, 250, 450);
    neb1.addColorStop(0, 'rgba(168, 85, 247, 0.28)');
    neb1.addColorStop(0.5, 'rgba(236, 72, 153, 0.16)');
    neb1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = neb1;
    ctx.fillRect(0, 0, 1200, 800);

    const neb2 = ctx.createRadialGradient(900, 550, 30, 900, 550, 400);
    neb2.addColorStop(0, 'rgba(246, 214, 155, 0.22)');
    neb2.addColorStop(0.6, 'rgba(67, 56, 202, 0.18)');
    neb2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = neb2;
    ctx.fillRect(0, 0, 1200, 800);

    // 3. Starlight Field
    for (let i = 0; i < 280; i++) {
      const sx = Math.random() * 1200;
      const sy = Math.random() * 800;
      const sz = Math.random() * 2 + 0.6;
      const alpha = Math.random() * 0.8 + 0.2;
      ctx.beginPath();
      ctx.arc(sx, sy, sz, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? `rgba(246, 214, 155, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    // 4. Gold Leaf Double Border Trim
    ctx.strokeStyle = '#F6D69B';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 1120, 720);

    ctx.strokeStyle = 'rgba(233, 213, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 1100, 700);

    // Corner Ornaments
    const drawCorner = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#F6D69B';
      ctx.fill();
    };
    drawCorner(50, 50);
    drawCorner(1150, 50);
    drawCorner(50, 750);
    drawCorner(1150, 750);

    // 5. Typography
    ctx.textAlign = 'center';

    // Subtitle Kicker
    ctx.font = '600 20px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#E9D5FF';
    ctx.letterSpacing = '6px';
    ctx.fillText('A CELESTIAL COMMEMORATION', 600, 140);

    // Main Greeting
    ctx.font = 'bold 36px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('HAPPY BIRTHDAY', 600, 200);

    // Recipient Name with Glow
    ctx.font = '900 84px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#FDE68A';
    ctx.shadowColor = 'rgba(253, 230, 138, 0.8)';
    ctx.shadowBlur = 25;
    ctx.fillText(KEEPSAKE_CARD_DATA.recipient, 600, 300);
    ctx.shadowBlur = 0;

    // Tagline
    ctx.font = 'italic 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FBCFE8';
    ctx.fillText(KEEPSAKE_CARD_DATA.tagline, 600, 370);

    // Heartfelt Blessing Quote
    ctx.font = '300 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('May your life always be illuminated with deep joy, genuine love,', 600, 460);
    ctx.fillText('countless adventures, and dreams that turn into reality.', 600, 500);

    // Handwritten Sign-off
    ctx.font = 'italic 32px "Caveat", cursive';
    ctx.fillStyle = '#F6D69B';
    ctx.fillText('With lots of love and celestial warmth, always ❤️', 600, 580);

    // Footer Signature
    ctx.font = '600 16px "Cinzel", Georgia, serif';
    ctx.fillStyle = 'rgba(233, 213, 255, 0.7)';
    ctx.fillText('THE UNIVERSE CELEBRATES SALMA · ETERNAL ARCHIVES', 600, 680);

    // Convert to downloadable PNG
    const link = document.createElement('a');
    link.download = `Salma-Celestial-Birthday-Keepsake.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloading(false);
    setDownloadSuccess(true);
    celestialAudio.playFireworks();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F6D69B', '#FBCFE8', '#FFFFFF'],
    });

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <section id="keepsake" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-200 bg-amber-500/10 border border-amber-300/20 px-3.5 py-1.5 rounded-full">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Lifetime Souvenir</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-purple-100">
          Digital Birthday Keepsake
        </h2>
        <p className="text-sm sm:text-base text-purple-200/80 font-light max-w-md mx-auto">
          A timeless commemorative birthday card you can keep forever. Save it directly to your device as high-res art.
        </p>
      </div>

      {/* Keepsake Visual Card Preview */}
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel-glow border-2 border-amber-300/40 shadow-[0_0_60px_rgba(246,214,155,0.2)] max-w-2xl mx-auto overflow-hidden">
        {/* Decorative celestial card preview */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120726] via-[#1c0c3b] to-[#0d051a] border border-amber-300/30 text-center space-y-4 shadow-inner">
          <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-purple-300/80">
            A Celestial Commemoration
          </span>

          <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-slate-300 uppercase">
            Happy Birthday
          </p>

          <h3 className="font-cinzel text-3xl min-[360px]:text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-white drop-shadow-[0_2px_20px_rgba(246,214,155,0.6)]">
            SALMA
          </h3>

          <p className="text-xs sm:text-sm text-pink-200/90 font-light italic">
            {KEEPSAKE_CARD_DATA.tagline}
          </p>

          <p className="text-xs sm:text-sm text-purple-100/80 max-w-md mx-auto leading-relaxed pt-2">
            {KEEPSAKE_CARD_DATA.quote}
          </p>

          <div className="pt-4 border-t border-purple-400/20 flex items-center justify-between text-[10px] sm:text-[11px] font-cinzel text-purple-300/70">
            <span>The Universe Celebrates Salma&apos;s Birthday</span>
            <span className="flex items-center gap-1 text-amber-200">
              Forever Bound <Sparkles className="w-3 h-3 text-amber-300" />
            </span>
          </div>
        </div>

        {/* Download Action Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 min-[360px]:px-8 py-3.5 min-h-[48px] rounded-full text-xs min-[360px]:text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 hover:from-amber-100 hover:to-pink-100 shadow-[0_0_30px_rgba(246,214,155,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap touch-manipulation"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Saved to Your Device! ✨</span>
              </>
            ) : downloading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-purple-900" />
                <span>Crafting Keepsake...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-purple-900" />
                <span>Save Keepsake as Image (PNG) 💌</span>
              </>
            )}
          </button>
        </div>

        <p className="mt-3 text-[11px] text-purple-300/60">
          Generated client-side in high resolution (1200×800) with starlight engraving.
        </p>
      </div>
    </section>
  );
};
