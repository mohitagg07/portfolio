"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { navigateToSection } from "../utils/scroll";

const ROTATING_PHRASES = [
  "easier to get done.",
  "simpler to manage.",
  "easier to scale.",
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
    }, 4600);

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
          Mohit Aggarwal <span aria-hidden="true">·</span> AI &amp; software engineer
        </p>
        <h1 className="hero-title">
          <span className="hero-title__mask">
            <span className="hero-title__line">I make repetitive work</span>
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
                  {Array.from(phrase).map((character, index) => (
                    <span
                      className="hero-title__wave-letter"
                      key={phrase + "-" + index}
                      style={{ "--i": index } as CSSProperties}
                    >
                      {character === " " ? "\u00a0" : character}
                    </span>
                  ))}
                </span>
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
      </motion.div>

      <a className="hero-scroll" href="#work" onClick={(event) => navigateToSection(event, "work")} aria-label="Scroll to explore selected projects">
        <span className="hero-scroll__track" aria-hidden="true"><i /></span>
        <span className="hero-scroll__label">Scroll to explore work</span>
      </a>
    </div>
  );
}
