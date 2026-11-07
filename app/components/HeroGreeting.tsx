"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { navigateToSection } from "../utils/scroll";

const ROTATING_PHRASES = [
  "into useful software.",
  "into calmer workflows.",
  "into tools people use.",
];

interface HeroGreetingProps {
  exitOpacity?: MotionValue<number> | number;
  exitY?: MotionValue<number> | number;
}

export default function HeroGreeting({
  exitOpacity = 1,
  exitY = 0,
}: HeroGreetingProps) {
  const [mounted, setMounted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % ROTATING_PHRASES.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [mounted, prefersReducedMotion]);

  const phrase = ROTATING_PHRASES[phraseIndex];

  return (
    <div className="hero-layout section-wrap">
      <motion.div
        className={"hero-copy " + (mounted ? "is-mounted" : "")}
        style={{ opacity: exitOpacity, y: exitY }}
      >
        <p className="hero-hello">
          Mohit Aggarwal <span aria-hidden="true">·</span> Software, Automation &amp; AI
        </p>

        <h1 className="hero-title">
          <span className="hero-title__mask">
            <span className="hero-title__line">I like turning messy problems</span>
          </span>
          <span className="hero-title__mask hero-title__mask--liquid">
            <span className="hero-title__line hero-title__line--accent">
              <span className="hero-title__phrase-window" role="img" aria-label={phrase}>
                {ROTATING_PHRASES.map((item) => (
                  <span className="hero-title__phrase-sizer" aria-hidden="true" key={item}>
                    {item}
                  </span>
                ))}
                <span className="hero-title__phrase" aria-hidden="true" key={phrase}>
                  {phrase}
                </span>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero-summary">
          Hey, I&apos;m Mohit — a software engineer who enjoys taking ideas from rough
          beginnings to useful products. I work across web development, automation and
          AI, always looking for a better way to solve everyday problems.
        </p>

        <div className="hero-actions">
          <a
            className="hero-button hero-button--primary"
            href="#work"
            onClick={(event) => navigateToSection(event, "work")}
          >
            See what I&apos;ve built <span aria-hidden="true">↗</span>
          </a>
          <a
            className="hero-button hero-button--quiet"
            href="#contact"
            onClick={(event) => navigateToSection(event, "contact")}
          >
            Have a project in mind? Let&apos;s talk.
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
        <span className="hero-scroll__label">Scroll to explore work</span>
      </a>
    </div>
  );
}
