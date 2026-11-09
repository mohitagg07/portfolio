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

function SchoolIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" />
      <path d="M6 11v5.2c3.8 2.7 8.2 2.7 12 0V11M21.5 9v6" />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="7" width="18" height="14" rx="1.5" />
      <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
    </svg>
  );
}

export default function HeroGreeting() {
  return (
    <div className="hero-layout section-wrap">
      <div className="hero-copy">
        <div className="hero-hello" aria-label="Location, education and experience">
          <span className="hero-hello__place"><PinIcon /> Jammu, India</span>
          <span className="hero-hello__school"><SchoolIcon /> VIT Chennai</span>
          <span className="hero-hello__internship"><WorkIcon /> 2 internships</span>
        </div>

        <p className="hero-eyebrow">SOFTWARE ENGINEER · AI, AUTOMATION &amp; PRODUCT BUILDING</p>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-title__line">I make the messy</span>
          <span className="hero-title__line">parts of work</span>
          <span className="hero-title__line hero-title__line--final">
            <em className="hero-title__accent">feel simpler.</em>
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
            Explore selected work <span aria-hidden="true">↗</span>
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
            <span className="hero-proof__value">02</span>
            <span className="hero-proof__label">Relu Consultancy · Berger Paints</span>
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
