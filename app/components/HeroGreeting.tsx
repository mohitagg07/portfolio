"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { navigateToSection } from "../utils/scroll";

const ROTATING_PHRASES = [
  "easier to get done.",
  "simpler to manage.",
  "faster to finish.",
];

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
    }, 3600);

    return () => window.clearInterval(interval);
  }, [mounted, prefersReducedMotion]);

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
              <span className="hero-title__phrase-window" aria-label={ROTATING_PHRASES[phraseIndex]}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ROTATING_PHRASES[phraseIndex]}
                    className="hero-title__phrase"
                    initial={prefersReducedMotion ? false : { y: "-112%", opacity: 0, filter: "blur(7px)", scaleY: 0.9 }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scaleY: 1 }}
                    exit={prefersReducedMotion ? undefined : { y: "112%", opacity: 0, filter: "blur(7px)", scaleY: 1.04 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ROTATING_PHRASES[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="hero-title__accent-pip" aria-hidden="true" />
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
