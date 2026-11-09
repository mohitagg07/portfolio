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

function Word({ children, delay, accent = false }: {
  children: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <span
      className={accent ? "hero-word hero-word--accent" : "hero-word"}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <span className="hero-word__inner">{children}</span>
    </span>
  );
}

export default function HeroGreeting() {
  return (
    <div className="hero-layout">
      <div className="hero-copy">
        <div className="hero-hello" aria-label="Location, education and experience">
          <span><PinIcon /> Jammu, India</span>
          <span><SchoolIcon /> VIT Chennai</span>
          <span><WorkIcon /> 2 internships</span>
        </div>

        <p className="hero-eyebrow">SOFTWARE ENGINEER <i aria-hidden="true" /> AI, AUTOMATION &amp; PRODUCT BUILDING</p>

        <h1
          id="hero-title"
          className="hero-title"
          aria-label="I make the messy parts of work feel simpler."
        >
          <span className="hero-title__line" aria-hidden="true">
            <Word delay={0.16}>I</Word>
            <Word delay={0.23}>make</Word>
            <Word delay={0.30}>the</Word>
            <Word delay={0.37}>messy</Word>
            <Word delay={0.44}>parts</Word>
          </span>
          <span className="hero-title__line" aria-hidden="true">
            <Word delay={0.54}>of</Word>
            <Word delay={0.61}>work</Word>
            {" "}
            <em className="hero-title__accent">
              <Word delay={0.72} accent>feel</Word>
              <Word delay={0.82} accent>simpler.</Word>
            </em>
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
        aria-label="Scroll to selected work"
      >
        <span className="hero-scroll__track" aria-hidden="true"><i /></span>
        <span className="hero-scroll__label">Scroll to explore</span>
      </a>
    </div>
  );
}
