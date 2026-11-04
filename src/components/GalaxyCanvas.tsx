import React, { useEffect, useRef } from 'react';

interface GalaxyCanvasProps {
  isWarping?: boolean;
  onWarpComplete?: () => void;
  speedMultiplier?: number;
  interactive?: boolean;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  spectralClass: 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M';
  hasDiffraction: boolean;
  colorRgb: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  decay: number;
  color: string;
  width: number;
}


export const GalaxyCanvas: React.FC<GalaxyCanvasProps> = ({
  isWarping = false,
  onWarpComplete,
  speedMultiplier = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const warpProgressRef = useRef(0);
  const onWarpCompleteRef = useRef(onWarpComplete);
  onWarpCompleteRef.current = onWarpComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / width - 0.5) * 30;
      const ny = (e.clientY / height - 0.5) * 30;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      const touch = e.touches[0];
      const nx = (touch.clientX / width - 0.5) * 20;
      const ny = (touch.clientY / height - 0.5) * 20;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Spectral Class RGB Colors:
    // O/B: Celestial Ice Blue (186, 230, 253), (147, 197, 253)
    // A: Pure White (255, 255, 255)
    // F/G: Champagne Gold (246, 214, 155), (253, 230, 138)
    // K/M: Soft Rose Lavender (244, 208, 234), (233, 213, 255)
    const spectralColors = {
      O: '186, 230, 253',
      B: '147, 197, 253',
      A: '255, 255, 255',
      F: '253, 230, 138',
      G: '246, 214, 155',
      K: '233, 213, 255',
      M: '251, 207, 232',
    };

    const spectralKeys: Array<'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M'> = [
      'O', 'B', 'A', 'F', 'G', 'K', 'M',
    ];

    let stars: Star[] = [];
    const starCount = Math.min(380, Math.floor((width * height) / 3400));

    function initStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const spec = spectralKeys[Math.floor(Math.random() * spectralKeys.length)];
        // Natural magnitude: most are faint (size 0.5 to 1.2), a few are prominent (size 1.8 to 2.4)
        const isBright = Math.random() < 0.08;
        const size = isBright
          ? Math.random() * 0.9 + 1.8
          : Math.random() * 0.8 + 0.5;

        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2.2,
          z: Math.random() * 1000 + 1,
          size,
          baseAlpha: isBright ? Math.random() * 0.3 + 0.7 : Math.random() * 0.4 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          spectralClass: spec,
          hasDiffraction: isBright && Math.random() < 0.5,
          colorRgb: spectralColors[spec],
        });
      }
    }

    initStars();

    // Shooting stars system
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + 2500;

    const spawnShootingStar = () => {
      // Natural angle ~20 to 45 degrees downwards
      const angle = (Math.random() * 25 + 20) * (Math.PI / 180);
      shootingStars.push({
        x: Math.random() * (width * 0.75),
        y: Math.random() * (height * 0.35),
        length: Math.random() * 120 + 90,
        speed: Math.random() * 12 + 14,
        angle,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.009,
        color: Math.random() > 0.5 ? '#F6D69B' : '#E9D5FF',
        width: Math.random() * 1.2 + 1.4,
      });
      nextShootingStarTime = Date.now() + Math.random() * 6000 + 4000;
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Parallax scroll offset (gentle shift)
      const scrollParallax = scrollRef.current * 0.06;

      // 1. REALISTIC MIDNIGHT SKY GRADIENT
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#03010b'); // Deep cosmic void
      skyGrad.addColorStop(0.3, '#07041a'); // Dark violet-blue
      skyGrad.addColorStop(0.65, '#0b0626'); // Atmospheric midnight
      skyGrad.addColorStop(1, '#050314'); // Deep obsidian
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. SOFT MOONLIGHT / CELESTIAL DIFFUSION (Top-Right)
      const moonGrad = ctx.createRadialGradient(
        width * 0.85 + mouseRef.current.x * 0.3,
        height * 0.12 + mouseRef.current.y * 0.3,
        0,
        width * 0.85,
        height * 0.12,
        Math.max(width * 0.5, 450)
      );
      moonGrad.addColorStop(0, 'rgba(233, 213, 255, 0.08)'); // Gentle lavender moonlight
      moonGrad.addColorStop(0.35, 'rgba(186, 230, 253, 0.04)'); // Soft ice-blue haze
      moonGrad.addColorStop(1, 'rgba(3, 1, 11, 0)');
      ctx.fillStyle = moonGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. REALISTIC VOLUMETRIC NEBULA CLOUDS (Deep space gas & dust lanes)
      // Nebula Cloud A: Soft Violet & Cosmic Magenta (Left-Center)
      const nebGradA = ctx.createRadialGradient(
        width * 0.28 + mouseRef.current.x * 0.4,
        height * 0.42 - scrollParallax * 0.5,
        20,
        width * 0.28,
        height * 0.42 - scrollParallax * 0.5,
        width * 0.6
      );
      nebGradA.addColorStop(0, 'rgba(88, 28, 135, 0.14)'); // Royal purple
      nebGradA.addColorStop(0.4, 'rgba(112, 26, 117, 0.09)'); // Cosmic magenta
      nebGradA.addColorStop(0.8, 'rgba(30, 16, 68, 0.04)');
      nebGradA.addColorStop(1, 'rgba(3, 1, 11, 0)');
      ctx.fillStyle = nebGradA;
      ctx.fillRect(0, 0, width, height);

      // Nebula Cloud B: Midnight Indigo & Champagne Glow (Bottom-Right)
      const nebGradB = ctx.createRadialGradient(
        width * 0.72 - mouseRef.current.x * 0.3,
        height * 0.7 - scrollParallax * 0.4,
        30,
        width * 0.72,
        height * 0.7 - scrollParallax * 0.4,
        width * 0.55
      );
      nebGradB.addColorStop(0, 'rgba(67, 56, 202, 0.11)'); // Deep indigo
      nebGradB.addColorStop(0.45, 'rgba(217, 119, 6, 0.05)'); // Soft champagne reflection
      nebGradB.addColorStop(0.8, 'rgba(17, 24, 39, 0.03)');
      nebGradB.addColorStop(1, 'rgba(3, 1, 11, 0)');
      ctx.fillStyle = nebGradB;
      ctx.fillRect(0, 0, width, height);

      // Nebula Cloud C: Soft Pastel Pink Stardust (Upper Center)
      const nebGradC = ctx.createRadialGradient(
        width * 0.52 + mouseRef.current.x * 0.2,
        height * 0.22 - scrollParallax * 0.3,
        10,
        width * 0.52,
        height * 0.22 - scrollParallax * 0.3,
        width * 0.4
      );
      nebGradC.addColorStop(0, 'rgba(244, 114, 182, 0.07)'); // Rose stardust
      nebGradC.addColorStop(0.6, 'rgba(168, 85, 247, 0.04)');
      nebGradC.addColorStop(1, 'rgba(3, 1, 11, 0)');
      ctx.fillStyle = nebGradC;
      ctx.fillRect(0, 0, width, height);

      // 5. WARP ACCELERATION
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let warpMultiplier = 1;
      if (isWarping && !prefersReduced) {
        warpProgressRef.current = Math.min(warpProgressRef.current + dt * 1.5, 3.2);
        warpMultiplier = 1 + warpProgressRef.current * 18;

        if (warpProgressRef.current >= 3.2 && onWarpCompleteRef.current) {
          onWarpCompleteRef.current();
          onWarpCompleteRef.current = undefined;
        }
      } else if (isWarping && prefersReduced && onWarpCompleteRef.current) {
        onWarpCompleteRef.current();
        onWarpCompleteRef.current = undefined;
      }

      // 6. REALISTIC STARS WITH SPECTRAL CLASSES & DIFFRACTION SPIKES
      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y - scrollParallax * 0.7;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star forward with subtle continuous drift
        const effSpeed = prefersReduced ? 0.2 : speedMultiplier;
        star.z -= 32 * effSpeed * warpMultiplier * dt;
        if (star.z <= 0) {
          star.z += 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2.2;
        }

        const k = 420 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
          star.twinklePhase += star.twinkleSpeed;
          // Smooth atmospheric twinkle wave
          const twinkle = Math.sin(star.twinklePhase) * 0.22;
          const alpha = Math.max(0.12, Math.min(1, star.baseAlpha + twinkle));

          if (isWarping && warpMultiplier > 2) {
            // Draw warp streaks
            const prevK = 420 / (star.z + 45 * warpMultiplier * 0.1);
            const prevPx = star.x * prevK + cx;
            const prevPy = star.y * prevK + cy;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.strokeStyle = `rgba(${star.colorRgb}, ${alpha * 0.95})`;
            ctx.lineWidth = Math.min(star.size * k * 1.4, 4.5);
            ctx.stroke();
          } else {
            const renderSize = Math.max(0.65, star.size * k);

            // Draw crisp stellar body
            ctx.beginPath();
            ctx.arc(px, py, renderSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.colorRgb}, ${alpha})`;
            ctx.fill();

            // Atmospheric luminous corona for brighter stars
            if (renderSize > 1.4) {
              ctx.beginPath();
              ctx.arc(px, py, renderSize * 2.4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${star.colorRgb}, ${alpha * 0.18})`;
              ctx.fill();
            }

            // Subtle 4-point cross diffraction spikes on anchor stars
            if (star.hasDiffraction && renderSize > 1.6 && !isWarping) {
              const spikeLen = renderSize * 3.8;
              ctx.strokeStyle = `rgba(${star.colorRgb}, ${alpha * 0.35})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              // Horizontal spike
              ctx.moveTo(px - spikeLen, py);
              ctx.lineTo(px + spikeLen, py);
              // Vertical spike
              ctx.moveTo(px, py - spikeLen);
              ctx.lineTo(px, py + spikeLen);
              ctx.stroke();
            }
          }
        }
      }

      // 7. REALISTIC SHOOTING STARS
      if (Date.now() > nextShootingStarTime && !isWarping) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= ss.decay;

        if (ss.alpha <= 0 || ss.x > width + 150 || ss.y > height + 150) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const ssGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        ssGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        ssGrad.addColorStop(0.2, `${ss.color}E6`);
        ssGrad.addColorStop(0.6, `rgba(168, 85, 247, ${ss.alpha * 0.4})`);
        ssGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // White-hot ionization head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.shadowColor = ss.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [interactive, isWarping, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
