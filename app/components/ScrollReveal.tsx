"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "mask" | "clip-image";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -40px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  if (variant === "mask") {
    return (
      <div
        ref={containerRef}
        className={`scroll-reveal-mask-outer ${className}`.trim()}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          className="scroll-reveal-mask-inner"
          initial={prefersReducedMotion ? false : { opacity: 0, y: "105%" }}
          animate={prefersReducedMotion || isInView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "105%" }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }
          }
          onAnimationComplete={() => setSettled(true)}
          style={{ willChange: prefersReducedMotion || settled ? "auto" : "transform, opacity" }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (variant === "clip-image") {
    return (
      <motion.div
        ref={containerRef}
        className={`scroll-reveal-clip ${className}`.trim()}
        initial={prefersReducedMotion ? false : { opacity: 0, clipPath: "inset(5% 0% 5% 0% round 16px)", scale: 1.03 }}
        animate={prefersReducedMotion || isInView ? { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)", scale: 1 } : { opacity: 0, clipPath: "inset(5% 0% 5% 0% round 16px)", scale: 1.03 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
        }
        onAnimationComplete={() => setSettled(true)}
        style={{ willChange: prefersReducedMotion || settled ? "auto" : "clip-path, transform, opacity" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`scroll-reveal ${className}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }
      }
      onAnimationComplete={() => setSettled(true)}
      style={{ willChange: prefersReducedMotion || settled ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
