"use client";

import { navigateToSection } from "../utils/scroll";

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" />
      <circle cx="10" cy="8" r="2" />
    </svg>
  );
}

function EducationIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m1.5 7.2 8.5-4 8.5 4-8.5 4-8.5-4Z" />
      <path d="M5 9.1v4.1c2.8 2.1 7.2 2.1 10 0V9.1M18.5 7.2v5" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2" y="6" width="16" height="11" rx="2" />
      <path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h3A1.5 1.5 0 0 1 13 4.5V6M2 10h16M8 10v2h4v-2" />
    </svg>
  );
}

export default function HeroGreeting() {
  return (
    <div className="hero-layout section-wrap">
      <div className="hero-copy">
        <p className="hero-hello">
          <span className="hero-hello__role">Software engineer</span>
          <span className="hero-hello__divider" aria-hidden="true" />
          <span className="hero-hello__place"><PinIcon /> Jammu, India</span>
        </p>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-title__line">I make the messy parts</span>
          <span className="hero-title__line">
            of work <em className="hero-title__accent">feel simpler.</em>
          </span>
        </h1>

        <p className="hero-summary">
          I build web apps, automation and practical AI tools that turn complicated
          workflows into clear, useful products.
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

        <ul className="hero-proof" aria-label="A few details about my background">
          <li>
            <span className="hero-proof__value">5+</span>
            <span className="hero-proof__label">Projects &amp; experiments</span>
          </li>
          <li>
            <span className="hero-proof__value">01</span>
            <span className="hero-proof__label">Berger Paints internship</span>
          </li>
          <li>
            <span className="hero-proof__value">2025</span>
            <span className="hero-proof__label">B.Tech · VIT Chennai</span>
          </li>
        </ul>
      </div>

      <a
        className="hero-scroll"
        href="#work"
        onClick={(event) => navigateToSection(event, "work")}
        aria-label="Explore selected projects"
      >
        <span className="hero-scroll__track" aria-hidden="true">
          <i />
        </span>
        <span className="hero-scroll__label">Scroll to explore</span>
      </a>
    </div>
  );
}
