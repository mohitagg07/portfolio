"use client";

import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECT_NOTES = [
  {
    number: "01",
    name: "LegalMind AI",
    type: "Document intelligence",
    detail: "Extraction · retrieval · safety",
  },
  {
    number: "02",
    name: "MindCare",
    type: "Reflective AI experience",
    detail: "Streaming · user-controlled memory",
  },
  {
    number: "03",
    name: "Business enrichment",
    type: "Data pipeline",
    detail: "Async crawling · entity cleanup",
  },
];

export default function HeroGreeting() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.68,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <div className="hero-v3__content">
      <motion.div className="hero-v3__copy" {...reveal(0.08)}>
        <p className="hero-v3__eyebrow">
          SOFTWARE ENGINEER <i aria-hidden="true" /> AI · AUTOMATION · SYSTEMS
        </p>

        <h1 id="hero-v3-title" className="hero-v3__title">
          <span className="hero-v3__line hero-v3__line--lead">I build software</span>
          <span className="hero-v3__line">that makes complicated</span>
          <em className="hero-v3__line hero-v3__line--accent">things feel clear.</em>
        </h1>

        <p className="hero-v3__summary">
          I work across AI, automation and full-stack engineering to make complex
          processes easier to understand, use and rely on.
        </p>

        <div className="hero-v3__actions">
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
            A little about me
          </a>
        </div>
      </motion.div>

      <motion.aside
        className="hero-v3__project-index"
        aria-label="Selected projects"
        {...reveal(0.24)}
      >
        <div className="hero-v3__project-index-head">
          <span>NOTES FROM THE WORKBENCH</span>
          <span>SELECTED BUILDS / 03</span>
        </div>

        <ol className="hero-v3__project-list">
          {PROJECT_NOTES.map((project, index) => (
            <motion.li
              key={project.number}
              initial={reduceMotion ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.52,
                delay: reduceMotion ? 0 : 0.34 + index * 0.11,
                ease: EASE,
              }}
            >
              <a
                href="#work"
                onClick={(event) => navigateToSection(event, "work")}
                aria-label={`${project.name}: view selected work`}
              >
                <span className="hero-v3__project-number">{project.number}</span>
                <span className="hero-v3__project-copy">
                  <strong>{project.name}</strong>
                  <span>{project.type}</span>
                  <small>{project.detail}</small>
                </span>
                <span className="hero-v3__project-arrow" aria-hidden="true">↗</span>
              </a>
            </motion.li>
          ))}
        </ol>

        <p className="hero-v3__project-index-foot">
          A few problems I’ve enjoyed working through.
        </p>
      </motion.aside>
    </div>
  );
}
