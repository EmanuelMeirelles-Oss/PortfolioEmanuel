import React, { useEffect, useRef, useState } from 'react';

interface WarpTextProps {
  text: string;
  color?: string;
  warpStrength?: number;
  warpScale?: number;
  speed?: number;
  pointerInfluence?: number;
  pointerStrength?: number;
  refraction?: number;
  ripple?: boolean;
  fontSize?: number;
  fontWeight?: number | string;
  style?: React.CSSProperties;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: number;
  className?: string;
}

export const WarpText: React.FC<WarpTextProps> = ({
  text,
  color = '#f8f5ff',
  warpStrength = 0.045,
  warpScale = 1.2,
  speed = 0.32,
  pointerInfluence = 0.3,
  pointerStrength = 0.25,
  refraction = 0.008,
  ripple = true,
  fontSize = 110,
  fontWeight = 800,
  style = { height: '180px' },
  fontFamily = "'Kanit', sans-serif",
  letterSpacing = -0.06,
  lineHeight = 0.9,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  // Touch devices, small screens and "reduce motion" users get a plain
  // CSS gradient heading instead of the animated canvas: the mesh warp
  // has no meaningful pointer interaction on touch, its fixed-size canvas
  // clips long text on narrow viewports, and re-drawing a large cell grid
  // every frame forever was the main source of jank on mobile.
  const [useStaticFallback, setUseStaticFallback] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(
      '(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)'
    );
    const update = () => setUseStaticFallback(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (useStaticFallback) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let time = 0;
    let fittedFontSize = fontSize;

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d', { alpha: true });
    const computedFontFamily =
      fontFamily === 'inherit' ? "'Kanit', sans-serif" : fontFamily;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;

      // Shrink the font until the text fits the container so it never
      // gets clipped by the canvas edges on narrower viewports.
      fittedFontSize = fontSize;
      if (offscreenCtx && rect.width > 0) {
        offscreenCtx.font = `${fontWeight} ${fittedFontSize}px ${computedFontFamily}`;
        const maxWidth = rect.width * 0.96;
        const measured = offscreenCtx.measureText(text).width;
        if (measured > maxWidth && measured > 0) {
          fittedFontSize = Math.max(24, fittedFontSize * (maxWidth / measured));
        }
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = container.clientWidth / 2;
      mouseRef.current.targetY = container.clientHeight / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.014 * speed;

      // Balanced smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = rect.width;
      const h = rect.height;

      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Draw crisp gradient text on offscreen canvas
      if (offscreenCtx) {
        offscreenCtx.save();
        offscreenCtx.scale(dpr, dpr);
        offscreenCtx.clearRect(0, 0, w, h);

        offscreenCtx.font = `${fontWeight} ${fittedFontSize}px ${computedFontFamily}`;
        offscreenCtx.textAlign = 'center';
        offscreenCtx.textBaseline = 'middle';

        const gradient = offscreenCtx.createLinearGradient(0, 0, 0, h);
        gradient.addColorStop(0, '#646973');
        gradient.addColorStop(1, '#BBCCD7');
        offscreenCtx.fillStyle = gradient;

        offscreenCtx.fillText(text, w / 2, h / 2);
        offscreenCtx.restore();
      }

      // Render balanced smooth mesh distortion
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Grid resolution kept low enough to stay smooth on mid-range
      // hardware: this ran at 40x70 (2800 drawImage calls/frame) before.
      const gridRows = 22;
      const gridCols = 38;
      const cellW = w / gridCols;
      const cellH = h / gridRows;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const x = c * cellW;
          const y = r * cellH;

          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let displaceX = 0;
          let displaceY = 0;

          if (dist < 280) {
            const influence = Math.pow(1 - dist / 280, 2) * pointerInfluence * 35;
            displaceX += (dx / dist) * influence * pointerStrength;
            displaceY += (dy / dist) * influence * pointerStrength;
          }

          if (ripple) {
            const wave = Math.sin(dist * warpScale * 0.03 - time * 2.2) * warpStrength * 16;
            displaceX += wave;
            displaceY += wave;
          }

          const sourceX = (x + displaceX) * dpr;
          const sourceY = (y + displaceY) * dpr;
          const sourceW = cellW * dpr;
          const sourceH = cellH * dpr;

          const destX = x * dpr;
          const destY = y * dpr;
          const destW = cellW * dpr;
          const destH = cellH * dpr;

          if (
            sourceX >= 0 &&
            sourceY >= 0 &&
            sourceX + sourceW <= offscreenCanvas.width &&
            sourceY + sourceH <= offscreenCanvas.height
          ) {
            ctx.drawImage(
              offscreenCanvas,
              sourceX,
              sourceY,
              sourceW,
              sourceH,
              destX,
              destY,
              destW,
              destH
            );
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause the render loop entirely while the headline is scrolled out
    // of view instead of burning a full canvas redraw every frame forever.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationFrameId) animationFrameId = requestAnimationFrame(render);
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(container);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [
    useStaticFallback,
    text,
    color,
    warpStrength,
    warpScale,
    speed,
    pointerInfluence,
    pointerStrength,
    refraction,
    ripple,
    fontSize,
    fontWeight,
    fontFamily,
    letterSpacing,
    lineHeight,
  ]);

  if (useStaticFallback) {
    return (
      <div
        style={{ width: '100%', ...style }}
        className={`flex items-center justify-center overflow-hidden ${className}`}
      >
        <span
          className="hero-heading block w-full text-center"
          style={{
            fontFamily,
            fontWeight,
            letterSpacing: `${letterSpacing}em`,
            lineHeight,
            fontSize: 'clamp(2.75rem, 15vw, 5.5rem)',
          }}
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', position: 'relative', ...style }}
      className={`flex items-center justify-center overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};

export default WarpText;
