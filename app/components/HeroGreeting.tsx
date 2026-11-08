"use client";

import { motion } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { navigateToSection } from "../utils/scroll";

interface HeroGreetingProps {
  exitOpacity?: MotionValue<number> | number;
  exitY?: MotionValue<number> | number;
}

export default function HeroGreeting({
  exitOpacity = 1,
  exitY = 0,
}: HeroGreetingProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="hero-layout section-wrap">
      <motion.div
        className={"hero-copy " + (mounted ? "is-mounted" : "")}
        style={{ opacity: exitOpacity, y: exitY }}
      >
        <p className="hero-hello">
          Mohit Aggarwal <span aria-hidden="true">·</span> Software engineer in Jammu
        </p>

        <h1 className="hero-title">
          <span className="hero-title__mask">
            <span className="hero-title__line">I make the messy parts</span>
          </span>
          <span className="hero-title__mask hero-title__mask--liquid">
            <span className="hero-title__line hero-title__line--accent">
              of work feel simpler.
            </span>
          </span>
        </h1>

        <p className="hero-summary">
          I build web apps, automation and practical AI tools. I like starting with
          the bit that frustrates people, then finding a clearer, more useful way
          to get it done.
        </p>

        <div className="hero-actions">
          <a
            className="hero-button hero-button--primary"
            href="#work"
            onClick={(event) => navigateToSection(event, "work")}
          >
            Selected work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="hero-button hero-button--quiet"
            href="#about"
            onClick={(event) => navigateToSection(event, "about")}
          >
            A little about me
          </a>
        </div>
      </motion.div>

      <a
        className="hero-scroll"
        href="#work"
        onClick={(event) => navigateToSection(event, "work")}
        aria-label="Scroll to explore selected projects"
      >
        <span className="hero-scroll__track" aria-hidden="true">
          <i />
        </span>
        <span className="hero-scroll__label">A little further down</span>
      </a>
    </div>
  );
}
