"use client";

import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { navigateToSection } from "../utils/scroll";

export default function HeroGreeting() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`hero-layout section-wrap ${mounted ? "is-mounted" : ""}`}>
      <div className="hero-copy">
        <p className="hero-hello">
          <span className="hero-availability-dot" aria-hidden="true" />
          Mohit Aggarwal <span aria-hidden="true">/</span> AI &amp; software engineer
        </p>

        <h1 className="hero-title">
          <span className="hero-title__mask">
            <span className="hero-title__line">I turn complex ideas</span>
          </span>
          <span className="hero-title__mask">
            <span className="hero-title__line hero-title__line--accent">
              into useful software.
              <span className="hero-title__accent-pip" aria-hidden="true" />
            </span>
          </span>
        </h1>

        <p className="hero-summary">
          I build practical AI products, intelligent automations and thoughtful web experiences that make everyday work simpler.
        </p>

        <ul className="hero-focus" aria-label="Areas I work on">
          <li><span>01</span> AI &amp; LLM applications</li>
          <li><span>02</span> Workflow automation</li>
          <li><span>03</span> Full-stack engineering</li>
        </ul>

        <div className="hero-actions">
          <a
            className="hero-button hero-button--primary"
            href="#work"
            onClick={(event) => navigateToSection(event, "work")}
          >
            Explore my work <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a
            className="hero-button hero-button--quiet"
            href="#contact"
            onClick={(event) => navigateToSection(event, "contact")}
          >
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero-social-proof" aria-label="Find me online">
          <span>Find me online</span>
          <a href="https://github.com/mohitagg07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href="https://linkedin.com/in/mohitagg07" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
        </div>
      </div>

      <div className="hero-showcase" aria-label="Illustration of an AI workflow coming together">
        <div className="hero-showcase__glow hero-showcase__glow--blue" />
        <div className="hero-showcase__glow hero-showcase__glow--peach" />
        <div className="hero-showcase__orbit hero-showcase__orbit--outer" />
        <div className="hero-showcase__orbit hero-showcase__orbit--inner" />

        <div className="hero-showcase__core">
          <div className="hero-showcase__core-shine" />
          <span className="hero-showcase__core-mark">m<span>.</span></span>
          <span className="hero-showcase__core-caption">MAKE IT USEFUL</span>
        </div>

        <div className="hero-float-card hero-float-card--top">
          <span className="hero-float-card__icon hero-float-card__icon--violet">✳</span>
          <span><strong>AI that works</strong><small>From prompt to product</small></span>
          <span className="hero-float-card__spark">↗</span>
        </div>

        <div className="hero-float-card hero-float-card--side">
          <span className="hero-float-card__pulse" />
          <span><strong>Thoughtful systems</strong><small>Built around real problems</small></span>
        </div>

        <div className="hero-terminal">
          <div className="hero-terminal__top">
            <span className="hero-terminal__window-dots"><i /><i /><i /></span>
            <span>workflow.py</span>
            <span className="hero-terminal__live">LIVE THINKING</span>
          </div>
          <div className="hero-terminal__code" aria-hidden="true">
            <p><span>01</span><b>collect</b><em>(</em><i>signals</i><em>)</em></p>
            <p><span>02</span><b>connect</b><em>(</em><i>systems</i><em>)</em></p>
            <p><span>03</span><b>create</b><em>(</em><i>something useful</i><em>)</em></p>
          </div>
          <div className="hero-terminal__bottom">
            <span><i /> Built with curiosity</span>
            <span>JAMMU, IN</span>
          </div>
        </div>

        <div className="hero-orbit-tag hero-orbit-tag--one">LLMs</div>
        <div className="hero-orbit-tag hero-orbit-tag--two">AUTOMATION</div>
        <div className="hero-orbit-tag hero-orbit-tag--three">ENGINEERING</div>
      </div>

      <a
        className="hero-scroll"
        href="#about"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="Scroll to learn more about me"
      >
        <span className="hero-scroll__track" aria-hidden="true"><i /></span>
        <span className="hero-scroll__label">Scroll to explore</span>
      </a>
    </div>
  );
}
