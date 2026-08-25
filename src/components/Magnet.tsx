import React, { useRef, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 180,
  strength = 3.5,
  activeTransition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
  inactiveTransition = 'transform 0.5s ease-out',
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    let isActive = false;
    let rafId = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      rafId = 0;
      const evt = pending;
      if (!evt) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = evt.x - centerX;
      const distY = evt.y - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < threshold) {
        if (!isActive) {
          isActive = true;
          el.style.transition = activeTransition;
        }
        // Move horizontally and downward/laterally, but clamp upward movement to 0
        // so the top of the character avatar NEVER moves up into the text region!
        const moveX = distX / strength;
        const rawMoveY = distY / strength;
        const moveY = Math.max(0, rawMoveY);

        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      } else if (isActive) {
        isActive = false;
        el.style.transition = inactiveTransition;
        el.style.transform = 'translate3d(0px, 0px, 0)';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: 'translate3d(0px, 0px, 0)',
        transition: inactiveTransition,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};
