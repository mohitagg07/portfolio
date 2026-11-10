"use client";

import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

function Word({
  children,
  delay,
  accent = false,
}: {
  children: string;
  delay: number;
  accent?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={accent ? "hero-v3__word hero-v3__word--accent" : "hero-v3__word"}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14, filter: "blur(1.5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.58,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.span>
  );
}

export default function HeroGreeting() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="hero-v3__content">
      <div className="hero-v3__copy">
        <h1
          id="hero-v3-title"
          className="hero-v3__title"
          aria-label="I build useful systems that make work feel simpler."
        >
          <span className="hero-v3__line" aria-hidden="true">
            <Word delay={0.08}>I</Word>{" "}
            <Word delay={0.14}>build</Word>{" "}
            <Word delay={0.2}>useful</Word>{" "}
            <Word delay={0.27}>systems</Word>
          </span>
          <span className="hero-v3__line" aria-hidden="true">
            <Word delay={0.38}>that</Word>{" "}
            <Word delay={0.45}>make</Word>{" "}
            <Word delay={0.52}>work</Word>{" "}
            <em className="hero-v3__accent">
              <Word delay={0.62} accent>feel</Word>{" "}
              <Word delay={0.72} accent>simpler.</Word>
            </em>
          </span>
        </h1>

        <div className="hero-v3__actions">
          <motion.a
            className="hero-v3__button hero-v3__button--primary"
            href="#work"
            onClick={(event) => navigateToSection(event, "work")}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: 0.82 }}
          >
            Explore my work <span aria-hidden="true">↗</span>
          </motion.a>
          <motion.a
            className="hero-v3__button hero-v3__button--secondary"
            href="#about"
            onClick={(event) => navigateToSection(event, "about")}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: 0.9 }}
          >
            A little about me
          </motion.a>
        </div>

        <motion.div
          className="hero-v3__facts"
          aria-label="Selected work"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 1.02 }}
        >
          <div>
            <strong>5+</strong>
            <span>Projects &amp; experiments</span>
          </div>
        </motion.div>
      </div>

      <a
        className="hero-v3__scroll"
        href="#about"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="Scroll to about section"
      >
        <span className="hero-v3__scroll-mark" aria-hidden="true" />
        <span>Scroll to explore</span>
      </a>
    </div>
  );
}
