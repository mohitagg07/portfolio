"use client";

import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

export default function HeroGreeting() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <div className="hero-v3__content">
      <div className="hero-v3__copy">
        <motion.p className="hero-v3__eyebrow" {...reveal(0.08)}>
          SOFTWARE ENGINEER <i aria-hidden="true">/</i> AI &amp; AUTOMATION
        </motion.p>

        <motion.h1
          id="hero-v3-title"
          className="hero-v3__title"
          aria-label="I build software that makes complicated things feel clear."
          {...reveal(0.18)}
        >
          <span className="hero-v3__line">I build software</span>
          <span className="hero-v3__line">that makes complicated</span>
          <span className="hero-v3__line">
            things <em className="hero-v3__accent">feel clear.</em>
          </span>
        </motion.h1>

        <motion.p className="hero-v3__summary" {...reveal(0.34)}>
          I turn rough ideas and tangled workflows into useful things people can rely on.
        </motion.p>

        <motion.div className="hero-v3__actions" {...reveal(0.46)}>
          <a
            className="hero-v3__button hero-v3__button--primary"
            href="#work"
            onClick={(event) => navigateToSection(event, "work")}
          >
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="hero-v3__button hero-v3__button--secondary"
            href="#about"
            onClick={(event) => navigateToSection(event, "about")}
          >
            A little about me
          </a>
        </motion.div>

        <motion.div className="hero-v3__facts" aria-label="Selected work and working principles" {...reveal(0.58)}>
          <div className="hero-v3__facts-count">
            <strong>5+</strong>
            <span>Projects &amp; experiments</span>
            <small>Ideas explored, built and improved along the way.</small>
          </div>
          <div className="hero-v3__practice" aria-label="How I approach a project">
            <span>Understand the problem</span>
            <span>Build what helps</span>
            <span>Care about the details</span>
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
