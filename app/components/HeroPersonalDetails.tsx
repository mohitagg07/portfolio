"use client";

import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

export default function HeroPersonalDetails() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduceMotion ? 0 : 0.72,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <div className="hero-personal-details" aria-label="A note about my work">
      <motion.a
        href="#work"
        className="hero-principle"
        onClick={(event) => navigateToSection(event, "work")}
        aria-label="Read about the thinking behind my projects"
        {...reveal(0.5)}
        whileHover={reduceMotion ? undefined : { y: -4, rotate: -0.3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      >
        <span className="hero-principle__tape" aria-hidden="true" />
        <span className="hero-principle__eyebrow">A THOUGHT I COME BACK TO</span>
        <span className="hero-principle__quote-mark" aria-hidden="true">“</span>
        <blockquote>The hard part should stay behind the screen.</blockquote>
        <span className="hero-principle__source">— Mohit</span>
      </motion.a>
    </div>
  );
}
