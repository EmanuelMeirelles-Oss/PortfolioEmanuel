"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring } from "motion/react";
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
  duration = 2.5,
  delay = 1.0,
  interactive = true,
  style,
}: ShimmerTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Gentle, calm spring lerp
  const mouseXSpring = useSpring(50, { stiffness: 45, damping: 22 });
  const [bgPos, setBgPos] = useState("50%");
  const [isMouseActive, setIsMouseActive] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsMouseActive(true);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseXSpring.set(Math.min(Math.max(relativeX, -30), 130));
      } else {
        const globalX = (e.clientX / window.innerWidth) * 100;
        mouseXSpring.set(globalX);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseXSpring]);

  useEffect(() => {
    if (!interactive) return;
    const unsubscribe = mouseXSpring.on("change", (val) => {
      const mappedPos = -80 + (val / 100) * 310;
      setBgPos(`${mappedPos}%`);
    });
    return () => unsubscribe();
  }, [interactive, mouseXSpring]);

  return (
    <div ref={containerRef} className="group overflow-hidden inline-block" style={style}>
      <div>
        <motion.div
          className={cn(
            "inline-block [--shimmer-contrast:rgba(255,255,255,1)]",
            variantMap[variant],
            className,
          )}
          style={
            {
              WebkitTextFillColor: "transparent",
              background:
                "linear-gradient(to right, #808A98 0%, #C4D2DE 28%, #FFFFFF 50%, #C4D2DE 72%, #808A98 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundRepeat: "no-repeat",
              backgroundSize: "75% 200%",
              backgroundPositionX: isMouseActive ? bgPos : undefined,
              filter: "drop-shadow(0 2px 10px rgba(255,255,255,0.08))",
            } as React.CSSProperties
          }
          initial={
            isMouseActive
              ? undefined
              : {
                  backgroundPositionX: "250%",
                }
          }
          animate={
            isMouseActive
              ? undefined
              : {
                  backgroundPositionX: ["-100%", "250%"],
                }
          }
          transition={
            isMouseActive
              ? undefined
              : {
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  repeatDelay: 2.0,
                  ease: "easeInOut",
                }
          }
        >
          <span>{children}</span>
        </motion.div>
      </div>
    </div>
  );
}

export default ShimmerText;
