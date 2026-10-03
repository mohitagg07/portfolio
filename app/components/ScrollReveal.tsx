"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  return (
    <motion.div
      className={`scroll-reveal ${className ?? ""}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }
      }
      onAnimationComplete={() => setSettled(true)}
      style={{ willChange: prefersReducedMotion || settled ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
