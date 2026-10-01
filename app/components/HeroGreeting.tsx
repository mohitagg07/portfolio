"use client";

import EnergyCore from "./EnergyCore";
import { navigateToSection } from "../utils/scroll";
import { useVisibility } from "./useInView";

export default function HeroGreeting() {
  const [heroRef, active] = useVisibility<HTMLDivElement>(0.01, "0px");

  return (
    <div ref={heroRef} className={`hero-layout section-wrap ${active ? "is-active" : ""}`}>
      <div className="hero-copy">
        <p className="hero-hello" aria-label="Hello world">
          <span className="hero-hello__dot" aria-hidden="true" />
          <span className="hero-hello__text" aria-hidden="true">hello world</span>
        </p>
        <h1 aria-label="AI & software, made useful.">
          <span className="hero-title__line" aria-hidden="true">AI &amp; software,</span>
          <span className="hero-title__line hero-title__line--accent" aria-hidden="true">made useful.</span>
        </h1>
        <div className="hero-actions">
          <a className="hero-button hero-button--primary" href="#work" onClick={(event) => navigateToSection(event, "work")}>
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-button hero-button--quiet" href="#contact" onClick={(event) => navigateToSection(event, "contact")}>
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <EnergyCore />
      </div>

      <a className="hero-scroll" href="#about" onClick={(event) => navigateToSection(event, "about")} aria-label="Scroll to explore the about section">
        <span className="hero-scroll__track" aria-hidden="true"><i /></span>
        <span className="hero-scroll__label">Scroll to explore</span>
      </a>
    </div>
  );
}
