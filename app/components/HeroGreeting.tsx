"use client";

import { navigateToSection } from "../utils/scroll";

export default function HeroGreeting() {
  return (
    <div className="hero-layout section-wrap">
      <div className="hero-copy">
        <p className="hero-hello">Mohit Aggarwal <span aria-hidden="true">·</span> AI &amp; software engineer</p>
        <h1>
          <span className="hero-title__line">I make repetitive work</span>
          <span className="hero-title__line hero-title__line--accent">easier to get done.</span>
        </h1>
        <p className="hero-summary">I build practical AI tools and software that collect information, connect everyday apps, and make complex documents easier to understand.</p>
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

      <a className="hero-scroll" href="#about" onClick={(event) => navigateToSection(event, "about")} aria-label="Scroll to explore the about section">
        <span className="hero-scroll__track" aria-hidden="true"><i /></span>
        <span className="hero-scroll__label">Scroll to explore</span>
      </a>
    </div>
  );
}
