"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { navigateToSection } from "../utils/scroll";

const ROTATING_PHRASES = [
  "easier to get done.",
  "simpler to manage.",
  "easier to scale.",
];

const LIQUID_HIDDEN = "polygon(0% 100%, 5% 100%, 10% 100%, 15% 100%, 20% 100%, 25% 100%, 30% 100%, 35% 100%, 40% 100%, 45% 100%, 50% 100%, 55% 100%, 60% 100%, 65% 100%, 70% 100%, 75% 100%, 80% 100%, 85% 100%, 90% 100%, 95% 100%, 100% 100%, 100% 100%, 0% 100%)";
const LIQUID_WAVE = "polygon(0% 82%, 5% 77%, 10% 70%, 15% 66%, 20% 67%, 25% 71%, 30% 76%, 35% 77%, 40% 72%, 45% 66%, 50% 64%, 55% 67%, 60% 73%, 65% 78%, 70% 78%, 75% 73%, 80% 67%, 85% 65%, 90% 69%, 95% 77%, 100% 83%, 100% 100%, 0% 100%)";
const LIQUID_FULL = "polygon(0% 0%, 5% 0%, 10% 0%, 15% 0%, 20% 0%, 25% 0%, 30% 0%, 35% 0%, 40% 0%, 45% 0%, 50% 0%, 55% 0%, 60% 0%, 65% 0%, 70% 0%, 75% 0%, 80% 0%, 85% 0%, 90% 0%, 95% 0%, 100% 0%, 100% 100%, 0% 100%)";

const liquidTransition = {
  clipPath: {
    duration: 1.55,
    ease: [0.42, 0, 0.18, 1] as const,
  },
  y: { duration: 1.35, ease: [0.22, 1, 0.36, 1] as const },
  opacity: { duration: 1.05, ease: "easeOut" as const },
  scaleY: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const },
};

export default function HeroGreeting() {
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
    }, 6200);

    return () => window.clearInterval(interval);
  }, [mounted, prefersReducedMotion]);

  const staticPhrase = ROTATING_PHRASES[phraseIndex];

  return (
    <div className="hero-layout section-wrap">
      <div className={`hero-copy ${mounted ? "is-mounted" : ""}`}>
        <p className="hero-hello">
          Mohit Aggarwal <span aria-hidden="true">·</span> AI &amp; software engineer
        </p>
        <h1 className="hero-title">
          <span className="hero-title__mask">
            <span className="hero-title__line">I make repetitive work</span>
          </span>
          <span className="hero-title__mask hero-title__mask--liquid">
            <span className="hero-title__line hero-title__line--accent">
              <span className="hero-title__phrase-window" aria-label={staticPhrase}>
                {ROTATING_PHRASES.map((phrase) => (
                  <span className="hero-title__phrase-sizer" aria-hidden="true" key={phrase}>{phrase}</span>
                ))}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={staticPhrase}
                    className="hero-title__phrase"
                    initial={prefersReducedMotion ? false : {
                      clipPath: LIQUID_HIDDEN,
                      y: 12,
                      opacity: 0.72,
                      scaleY: 0.94,
                    }}
                    animate={{
                      clipPath: [LIQUID_WAVE, LIQUID_FULL],
                      y: [4, 0],
                      opacity: [0.9, 1],
                      scaleY: [0.985, 1],
                    }}
                    exit={prefersReducedMotion ? undefined : {
                      clipPath: [LIQUID_WAVE, LIQUID_HIDDEN],
                      y: [-4, -9],
                      opacity: [0.94, 0],
                      scaleY: [1.012, 1.02],
                    }}
                    transition={prefersReducedMotion ? { duration: 0 } : liquidTransition}
                  >
                    {staticPhrase}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </span>
        </h1>
        <p className="hero-summary">
          I build practical AI tools and software that collect information, connect everyday apps, and make complex documents easier to understand.
        </p>
        <ul className="hero-focus" aria-label="Problems I solve">
          <li><span>01</span> Manual, repetitive workflows</li>
          <li><span>02</span> Information scattered across tools</li>
          <li><span>03</span> Dense documents and routine questions</li>
        </ul>
        <div className="hero-actions">
          <a className="hero-button hero-button--primary" href="#work" onClick={(event) => navigateToSection(event, "work")}>
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-button hero-button--quiet" href="#contact" onClick={(event) => navigateToSection(event, "contact")}>
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <a className="hero-scroll" href="#work" onClick={(event) => navigateToSection(event, "work")} aria-label="Scroll to explore selected projects">
        <span className="hero-scroll__track" aria-hidden="true"><i /></span>
        <span className="hero-scroll__label">Scroll to explore work</span>
      </a>
    </div>
  );
}
