import React, { useEffect, useRef } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  children?: React.ReactNode;
  className?: string;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  distance: number;
  startTime: number;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#ffffff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      for (let i = 0; i < sparkCount; i++) {
        const angle = (2 * Math.PI * i) / sparkCount + (Math.random() * 0.2 - 0.1);
        sparksRef.current.push({
          x,
          y,
          angle,
          distance: sparkRadius * (0.8 + Math.random() * 0.4),
          startTime: now,
        });
      }

      // The render loop only runs while sparks are animating; kick it
      // back off here instead of redrawing an empty canvas forever.
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    container.addEventListener('click', handleClick);

    const render = (now: number) => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        const elapsed = now - spark.startTime;
        const progress = Math.min(1, elapsed / duration);

        if (progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }

        // Ease-out distance movement
        const currentDist = spark.distance * Math.sin(progress * (Math.PI / 2));
        const currentX = spark.x + Math.cos(spark.angle) * currentDist;
        const currentY = spark.y + Math.sin(spark.angle) * currentDist;

        const alpha = 1 - progress;
        const currentSize = sparkSize * (1 - progress * 0.5);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = sparkColor;
        ctx.beginPath();
        ctx.arc(currentX, currentY, currentSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (sparks.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = 0;
      }
    };

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50" />
      {children}
    </div>
  );
};

export default ClickSpark;
