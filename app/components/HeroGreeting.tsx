import EnergyCore from "./EnergyCore";

export default function HeroGreeting() {
  return (
    <div className="hero-layout section-wrap">
      <div className="hero-copy">
        <p className="hero-kicker">
          <span className="hero-kicker__dot" /> AI ENGINEER <span>/</span> FULL-STACK DEVELOPER
        </p>
        <h1>
          AI &amp; software,
          <br />
          <span>made useful.</span>
        </h1>
        <div className="hero-actions">
          <a className="hero-button hero-button--primary" href="#work">
            Explore my work <span aria-hidden="true">↗</span>
          </a>
          <a className="hero-button hero-button--quiet" href="#contact">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <EnergyCore />
      </div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to about">
        <span /> SCROLL TO EXPLORE
      </a>
    </div>
  );
}
