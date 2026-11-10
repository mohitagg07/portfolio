"use client";

import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

function Word({ children, delay, accent = false }: { children: string; delay: number; accent?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.span
      className={accent ? "hero-v3__word hero-v3__word--accent" : "hero-v3__word"}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(3px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.68, delay: prefersReducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.span>
  );
}

export default function HeroGreeting() {
  return (
    <div className="hero-v3__content">
      <div className="hero-v3__copy">
        <div className="hero-v3__location" aria-label="Based in Jammu, India"><PinIcon /><span>Jammu, India</span></div>
        <p className="hero-v3__eyebrow">SOFTWARE ENGINEER <i /> AI &amp; AUTOMATION</p>
        <h1 id="hero-v3-title" className="hero-v3__title" aria-label="I make the messy parts of work feel simpler.">
          <span className="hero-v3__line" aria-hidden="true"><Word delay={0.08}>I</Word>{" "}<Word delay={0.15}>make</Word>{" "}<Word delay={0.22}>the</Word>{" "}<Word delay={0.29}>messy</Word>{" "}<Word delay={0.36}>parts</Word></span>
          <span className="hero-v3__line" aria-hidden="true"><Word delay={0.46}>of</Word>{" "}<Word delay={0.53}>work</Word>{" "}<em className="hero-v3__accent"><Word delay={0.64} accent>feel</Word>{" "}<Word delay={0.75} accent>simpler.</Word></em></span>
        </h1>
        <p className="hero-v3__summary">
          I build AI-powered products, useful software and automation that turn complicated ideas into simple, reliable solutions.
        </p>
        <div className="hero-v3__actions">
          <a className="hero-v3__button hero-v3__button--primary" href="#work" onClick={(event) => navigateToSection(event, "work")}>Explore selected work <span aria-hidden="true">↗</span></a>
          <a className="hero-v3__button hero-v3__button--secondary" href="#about" onClick={(event) => navigateToSection(event, "about")}>A little about me</a>
        </div>
        <div className="hero-v3__facts" aria-label="A few details about my background">
          <div><strong>5+</strong><span>Projects &amp; experiments</span></div>
          <div><strong>02</strong><span>Relu Consultancy · Berger Paints</span></div>
          <div><strong>2025</strong><span>B.Tech · VIT Chennai</span></div>
        </div>
      </div>
      <a className="hero-v3__scroll" href="#about" onClick={(event) => navigateToSection(event, "about")} aria-label="Scroll to about section">
        <span className="hero-v3__scroll-mark" aria-hidden="true" /><span>Scroll to explore</span>
      </a>
    </div>
  );
}
