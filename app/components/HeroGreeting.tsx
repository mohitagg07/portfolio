"use client";

import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

export default function HeroGreeting() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.72,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <div className="hero-v3__content">
      <div className="hero-v3__copy">
        <motion.p className="hero-v3__eyebrow" {...reveal(0.08)}>
          SOFTWARE ENGINEERING <i aria-hidden="true">/</i> AI · AUTOMATION · SYSTEMS
        </motion.p>

        <motion.h1
          id="hero-v3-title"
          className="hero-v3__title"
          aria-label="I turn messy inputs into useful systems."
          {...reveal(0.18)}
        >
          <span className="hero-v3__line hero-v3__line--lead">I turn</span>
          <span className="hero-v3__line hero-v3__line--display">messy inputs</span>
          <span className="hero-v3__line hero-v3__line--display hero-v3__line--accent">
            into useful systems.
          </span>
        </motion.h1>

        <motion.p className="hero-v3__summary" {...reveal(0.34)}>
          I build AI, automation and full-stack tools for workflows that need untangling.
        </motion.p>

        <motion.div className="hero-v3__actions" {...reveal(0.46)}>
          <a
            className="hero-v3__button hero-v3__button--primary"
            href="#work"
            onClick={(event) => navigateToSection(event, "work")}
          >
            View selected work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="hero-v3__button hero-v3__button--secondary"
            href="#about"
            onClick={(event) => navigateToSection(event, "about")}
          >
            Meet the builder
          </a>
        </motion.div>

        <motion.div className="hero-v3__facts" aria-label="Selected projects and experiments" {...reveal(0.58)}>
          <div className="hero-v3__facts-count">
            <strong>5+</strong>
            <span>Projects &amp; experiments</span>
            <small>Ideas tested, built and improved.</small>
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
