import React, { useEffect, useRef } from 'react';

interface CursorGridProps {
  cellSize?: number;
  color?: string;
  radius?: number;
  falloff?: 'smooth' | 'linear';
  holdTime?: number;
  fadeDuration?: number;
  lineWidth?: number;
  maxOpacity?: number;
  fillOpacity?: number;
  gridOpacity?: number;
  cellRadius?: number;
  clickPulse?: boolean;
  pulseSpeed?: number;
  className?: string;
}

interface ActiveCell {
  col: number;
  row: number;
  intensity: number;
  startTime: number;
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  startTime: number;
}

export const CursorGrid: React.FC<CursorGridProps> = ({
  cellSize = 70,
  color = '#D946EF',
  radius = 140,
  falloff = 'smooth',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCellsRef = useRef<Map<string, ActiveCell>>(new Map());
  const pulsesRef = useRef<Pulse[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mousePosRef.current = { x, y };
      } else {
        mousePosRef.current = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickPulse) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pulsesRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: radius * 2.5,
          startTime: performance.now(),
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    const render = (now: number) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      // Render static grid background if gridOpacity > 0
      if (gridOpacity > 0) {
        ctx.strokeStyle = color;
        ctx.globalAlpha = gridOpacity;
        ctx.lineWidth = lineWidth;

        for (let c = 0; c <= cols; c++) {
          ctx.beginPath();
          ctx.moveTo(c * cellSize, 0);
          ctx.lineTo(c * cellSize, height);
          ctx.stroke();
        }
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          ctx.moveTo(0, r * cellSize);
          ctx.lineTo(width, r * cellSize);
          ctx.stroke();
        }
      }

      // Update cell intensities based on cursor position
      const mouse = mousePosRef.current;
      if (mouse) {
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const cellCenterX = c * cellSize + cellSize / 2;
            const cellCenterY = r * cellSize + cellSize / 2;
            const dist = Math.hypot(mouse.x - cellCenterX, mouse.y - cellCenterY);

            if (dist <= radius) {
              let intensity = 1 - dist / radius;
              if (falloff === 'smooth') {
                intensity = Math.cos((dist / radius) * (Math.PI / 2));
              }

              const key = `${c},${r}`;
              activeCellsRef.current.set(key, {
                col: c,
                row: r,
                intensity,
                startTime: now,
              });
            }
          }
        }
      }

      // Render active cells
      const activeCells = activeCellsRef.current;
      activeCells.forEach((cell, key) => {
        const elapsed = now - cell.startTime;

        let alpha = cell.intensity * maxOpacity;
        if (elapsed > holdTime) {
          const fadeProgress = (elapsed - holdTime) / fadeDuration;
          if (fadeProgress >= 1) {
            activeCells.delete(key);
            return;
          }
          alpha *= 1 - fadeProgress;
        }

        if (alpha <= 0.001) return;

        const x = cell.col * cellSize;
        const y = cell.row * cellSize;

        ctx.globalAlpha = alpha;

        // Cell background fill if fillOpacity > 0
        if (fillOpacity > 0) {
          ctx.fillStyle = color;
          ctx.beginPath();
          if (cellRadius > 0) {
            ctx.roundRect(x + 2, y + 2, cellSize - 4, cellSize - 4, cellRadius);
          } else {
            ctx.rect(x + 2, y + 2, cellSize - 4, cellSize - 4);
          }
          ctx.fill();
        }

        // Cell border line
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        if (cellRadius > 0) {
          ctx.roundRect(x + 1, y + 1, cellSize - 2, cellSize - 2, cellRadius);
        } else {
          ctx.rect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        }
        ctx.stroke();
      });

      // Render click pulses
      const pulses = pulsesRef.current;
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const elapsed = now - pulse.startTime;
        const progress = (elapsed / pulseSpeed) * (pulse.maxRadius / radius);

        pulse.radius = progress * radius;
        const pulseAlpha = Math.max(0, 1 - pulse.radius / pulse.maxRadius);

        if (pulse.radius >= pulse.maxRadius || pulseAlpha <= 0) {
          pulses.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = pulseAlpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth * 2;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
    };
  }, [
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
  ]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
    </div>
  );
};

export default CursorGrid;
