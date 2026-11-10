"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

export default function HeroPersonalDetails() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.58,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <div className="hero-personal-details" aria-label="Personal details and selected work">
      <motion.a
        href="#about"
        className="hero-polaroid hero-polaroid--home"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="Explore the About section: home base, Jammu"
        {...reveal(0.68)}
      >
        <span className="hero-polaroid__pin" aria-hidden="true" />
        <span className="hero-polaroid__photo">
          <Image
            src="/about/about-main.webp"
            alt="A personal photograph from Mohit's About section"
            fill
            sizes="(max-width: 1100px) 110px, 148px"
          />
        </span>
        <span className="hero-polaroid__caption">
          <small>FROM THE CAMERA ROLL</small>
          <strong>Between the builds</strong>
        </span>
      </motion.a>

      <motion.a
        href="#about"
        className="hero-polaroid hero-polaroid--field"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="Explore more personal photographs in About"
        {...reveal(0.82)}
      >
        <span className="hero-polaroid__pin" aria-hidden="true" />
        <span className="hero-polaroid__photo">
          <Image
            src="/about/about-waterfall.webp"
            alt="A waterfall from Mohit's personal photo collage"
            fill
            sizes="(max-width: 1100px) 100px, 136px"
          />
        </span>
        <span className="hero-polaroid__caption">
          <small>OFF THE SCREEN</small>
          <strong>Outside the workspace</strong>
        </span>
      </motion.a>

      <motion.aside
        className="hero-workbench"
        aria-label="Selected areas of work"
        {...reveal(0.96)}
      >
        <div className="hero-workbench__heading">
          <span>THE WORKBENCH</span>
          <small>A FEW THINGS I'VE BUILT</small>
        </div>
        <a href="#work" onClick={(event) => navigateToSection(event, "work")}>
          <span className="hero-workbench__number">01</span>
          <span className="hero-workbench__copy">
            <strong>MindCare</strong>
            <small>AI reflection product</small>
          </span>
          <span className="hero-workbench__arrow" aria-hidden="true">↗</span>
        </a>
        <a href="#legalmind-heading" onClick={(event) => navigateToSection(event, "legalmind-heading")}>
          <span className="hero-workbench__number">02</span>
          <span className="hero-workbench__copy">
            <strong>LegalMind AI</strong>
            <small>Document intelligence</small>
          </span>
          <span className="hero-workbench__arrow" aria-hidden="true">↗</span>
        </a>
        <a href="#experiments" onClick={(event) => navigateToSection(event, "experiments")}>
          <span className="hero-workbench__number">03</span>
          <span className="hero-workbench__copy">
            <strong>Business Scraper</strong>
            <small>Data enrichment pipeline</small>
          </span>
          <span className="hero-workbench__arrow" aria-hidden="true">↗</span>
        </a>
      </motion.aside>

      <motion.a
        href="#work"
        className="hero-principle"
        onClick={(event) => navigateToSection(event, "work")}
        aria-label="Explore MindCare and its product principle"
        {...reveal(1.08)}
      >
        <span className="hero-principle__eyebrow">A PRINCIPLE I BUILD BY</span>
        <span className="hero-principle__quote-mark" aria-hidden="true">“</span>
        <blockquote>People should not have to explain their story from zero.</blockquote>
        <span className="hero-principle__source">MindCare <i>·</i> Product principle <b aria-hidden="true">↗</b></span>
      </motion.a>
    </div>
  );
}
