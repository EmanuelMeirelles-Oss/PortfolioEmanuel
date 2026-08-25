"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "default"
  | "secondary"
  | "destructive"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "orange"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "emerald"
  | "sky"
  | "slate"
  | "fuchsia";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  duration?: number;
  delay?: number;
  spread?: number;
  interactive?: boolean;
  style?: React.CSSProperties;
}

const variantMap: Record<Variant, string> = {
  default: "",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive dark:text-destructive-foreground",
  red: "text-red-600 dark:text-red-400",
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  purple: "text-purple-600 dark:text-purple-400",
  pink: "text-pink-600 dark:text-pink-400",
  orange: "text-orange-600 dark:text-orange-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  violet: "text-violet-600 dark:text-violet-400",
  rose: "text-rose-600 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
  lime: "text-lime-600 dark:text-lime-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  sky: "text-sky-600 dark:text-sky-400",
  slate: "text-slate-600 dark:text-slate-400",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
};

export function ShimmerText({
  children,
  className,
  variant = "default",
  interactive = true,
  style,
}: ShimmerTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    let targetPos = 50;
    let currentPos = 50;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Map screen cursor X (0% to 100%) to target position
      const pct = (e.clientX / window.innerWidth) * 100;
      // Clamp position strictly between 0% and 100% so text background never runs off edge
      targetPos = Math.min(Math.max(pct, 0), 100);
    };

    const update = () => {
      // Smooth lerp for liquid performance
      currentPos += (targetPos - currentPos) * 0.08;
      if (textRef.current) {
        const clampedPos = Math.min(Math.max(currentPos, 0), 100);
        textRef.current.style.backgroundPositionX = `${clampedPos}%`;
      }
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [interactive]);

  return (
    <div ref={containerRef} className="group overflow-visible inline-block max-w-full" style={style}>
      <div>
        <div
          ref={textRef}
          className={cn(
            "inline-block",
            variantMap[variant],
            className
          )}
          style={
            {
              WebkitTextFillColor: "transparent",
              background:
                "linear-gradient(90deg, #7A8593 0%, #C4D2DE 30%, #FFFFFF 50%, #C4D2DE 70%, #7A8593 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundRepeat: "repeat-x",
              backgroundSize: "200% 100%",
              backgroundPositionX: "50%",
              willChange: "background-position",
            } as React.CSSProperties
          }
        >
          <span>{children}</span>
        </div>
      </div>
    </div>
  );
}

export default ShimmerText;
