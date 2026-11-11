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
    <div className="hero-personal-details" aria-label="Personal photographs and selected work">
      <motion.a
        href="#about"
        className="hero-polaroid hero-polaroid--home"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="Explore the mountain photograph in About"
        {...reveal(0.62)}
      >
        <span className="hero-polaroid__pin" aria-hidden="true" />
        <span className="hero-polaroid__photo">
          <Image
            src="/about/mountain-memory.webp"
            alt="A quiet mountain viewpoint beneath a wide cloudy sky"
            fill
            sizes="(max-width: 767px) 44vw, (max-width: 1100px) 120px, 152px"
          />
        </span>
        <span className="hero-polaroid__caption">
          <small>OFF THE CLOCK</small>
          <strong>A day above the clouds</strong>
        </span>
      </motion.a>

      <motion.a
        href="#about"
        className="hero-polaroid hero-polaroid--field"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="Explore the group photograph in About"
        {...reveal(0.76)}
      >
        <span className="hero-polaroid__pin" aria-hidden="true" />
        <span className="hero-polaroid__photo">
          <Image
            src="/about/friends-memory.webp"
            alt="Mohit with friends at an outdoor gathering"
            fill
            sizes="(max-width: 767px) 44vw, (max-width: 1100px) 116px, 148px"
          />
        </span>
        <span className="hero-polaroid__caption">
          <small>THE PEOPLE BEHIND THE BUILDS</small>
          <strong>Good people, great milestones</strong>
        </span>
      </motion.a>

      <motion.aside
        className="hero-workbench"
        aria-label="Selected projects"
        {...reveal(0.9)}
      >
        <span className="hero-workbench__pin" aria-hidden="true" />
        <div className="hero-workbench__heading">
          <span>The workbench</span>
          <small>A FEW THINGS I'VE BEEN BUILDING</small>
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
        aria-label="Explore the MindCare product principle"
        {...reveal(1.02)}
      >
        <span className="hero-principle__tape" aria-hidden="true" />
        <span className="hero-principle__eyebrow">A PRINCIPLE I BUILD BY</span>
        <span className="hero-principle__quote-mark" aria-hidden="true">“</span>
        <blockquote>People should not have to explain their story from zero.</blockquote>
        <span className="hero-principle__source">MindCare <i>·</i> Product principle <b aria-hidden="true">↗</b></span>
      </motion.a>
    </div>
  );
}
