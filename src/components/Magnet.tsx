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
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Pointer position is applied straight to the DOM node's transform
  // instead of going through React state: the old version called
  // setState on every mousemove pixel, re-rendering this whole subtree
  // 60+ times per second. A rAF-throttled ref update is effectively free.
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
        el.style.transform = `translate3d(${distX / strength}px, ${distY / strength}px, 0)`;
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

    window.addEventListener('mousemove', handleMouseMove);
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
