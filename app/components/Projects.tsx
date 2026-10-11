"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

interface PipelineStep {
  id: string;
  number: string;
  title: string;
  tech: string;
  summary: string;
  tradeoff: string;
}

const LEGALMIND_PIPELINE: PipelineStep[] = [
  {
    id: "step-ocr",
    number: "01",
    title: "Document Ingestion & OCR",
    tech: "Google Document AI",
    summary: "Extracts unstructured legal text, parsing contractual hierarchies, clause numbering, and signature blocks.",
    tradeoff: "Trade-off: Document AI was selected over standard Tesseract OCR to preserve complex multi-column legal table layouts without losing clause hierarchy.",
  },
  {
    id: "step-rag",
    number: "02",
    title: "Statute Retrieval & Kanoon Index",
    tech: "ChromaDB + Indian Kanoon",
    summary: "Indexes verified Indian legal statutes and precedents; matches ambiguous clauses against established case law and statutory definitions.",
    tradeoff: "Trade-off: Hybrid retrieval combining BM25 keyword matching with dense embeddings prevents missing exact statutory section numbers while preserving semantic context.",
  },
  {
    id: "step-guardrail",
    number: "03",
    title: "Advisory Blocker Guardrail",
    tech: "FastAPI Safety Middleware",
    summary: "Deterministic safety filter screens outputs before synthesis, intercepting prescriptive phrases and converting advisory statements into neutral explanations.",
    tradeoff: "Trade-off: Pattern-based safety screening intercepts unauthorized advisory phrasing, functioning as a software guardrail rather than guaranteed legal counsel.",
  },
  {
    id: "step-multimodal",
    number: "04",
    title: "Multimodal Synthesis",
    tech: "Mermaid.js · D3 · Cloud TTS",
    summary: "Generates plain-English clause breakdowns, an interactive chronological obligation timeline, and high-fidelity audio readouts for accessibility.",
    tradeoff: "Trade-off: Chronological milestone visualization enables users to spot upcoming compliance deadlines immediately without scanning 40 pages of text.",
  },
];

interface SupportingProject {
  title: string;
  category: string;
  description: string;
  implementation?: string;
  image: string;
  demo: string;
}

const SUPPORTING_PROJECTS: SupportingProject[] = [
  {
    title: "MindCare",
    category: "AI Companion · Web App",
    description: "Combines conversational check-ins, mood tracking over time, and emotion-related signals to support daily reflection.",
    implementation: "Built with persistent vector memory for conversational continuity across sessions, paired with real-time facial expression analysis.",
    image: "/projects/project-2.png",
    demo: "https://mindcare-yb5c.vercel.app/",
  },
  {
    title: "Innovix Studio",
    category: "Brand & Studio Website",
    description: "A website for a creative agency in Jammu, showcasing its service portfolio and helping potential clients make enquiries or schedule a call.",
    implementation: "Built as a responsive Next.js application with fast asset delivery and an integrated client inquiry flow.",
    image: "/projects/project-1.png",
    demo: "https://innovix-branding-studio.vercel.app/",
  },
];

const PROJECT_KICKERS = [
  "Featured · Document AI",
  "Featured · Adaptive AI Coaching",
  "Companion · Web App",
  "Brand & Studio Website",
];

const PROJECT_NAMES = [
  "LegalMind AI",
  "VYRN",
  "MindCare",
  "Innovix Studio",
];

export default function Projects() {
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [transitionRef, transitionSeen] = useInView<HTMLDivElement>(0.2);
  const [legalMindView, setLegalMindView] = useState<"preview" | "architecture">("preview");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeMobileSlide, setActiveMobileSlide] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeStep = LEGALMIND_PIPELINE[activeStepIndex];

  const scrollToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(3, index));
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const slides = container.children;
    if (slides[clamped]) {
      const slide = slides[clamped] as HTMLElement;
      const padLeft = parseInt(window.getComputedStyle(container).paddingLeft, 10) || 20;
      container.scrollTo({
        left: slide.offsetLeft - padLeft,
        behavior: "smooth",
      });
      setActiveMobileSlide(clamped);
    }
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrollLeft = container.scrollLeft;
        const firstChild = container.firstElementChild as HTMLElement | null;
        if (!firstChild) return;
        const slideWidth = firstChild.offsetWidth;
        const gap = 14;
        const newIndex = Math.min(3, Math.max(0, Math.round(scrollLeft / (slideWidth + gap))));
        setActiveMobileSlide(newIndex);
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleSliderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToSlide(activeMobileSlide - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToSlide(activeMobileSlide + 1);
    }
  };

  return (
    <div className="work-scroll-stage">
      <section
        ref={sectionRef}
        id="work"
        className={`section-spacer work-section relative z-10 bg-[#f4f4f5] rounded-t-[3rem] shadow-2xl ${active ? "is-active" : ""}`}
      >
        <div className="section-wrap">
          {/* Section Introduction */}
          <div className="project-intro-reveal">
            <div className="project-intro">
              <p className="project-eyebrow">Selected Engineering Work</p>
              <ScrollReveal variant="mask" delay={0.05}>
                <h2 className="section-heading section-title">
                  Software engineered for high-stakes workflows
                </h2>
              </ScrollReveal>
              <p className="section-lede mt-5">
                Practical systems for complex document interpretation, adaptive coaching decisions, and production automation.
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* MOBILE PROJECT SLIDER (visible on screens <= 768px)          */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="work-mobile-slider mt-8" aria-label="Mobile project slider">
            {/* Header controls: Counter + Prev / Next */}
            {/* Header: Synchronized Project Counter & Category */}
            <div className="mobile-slider-header">
              <div className="slider-counter-wrap">
                <span className="slider-counter-num">
                  {`0${activeMobileSlide + 1}`}
                  <small className="slider-counter-total"> / 04</small>
                </span>
                <span className="slider-counter-kicker">
                  {PROJECT_KICKERS[activeMobileSlide]}
                </span>
              </div>
            </div>

            {/* Swipeable Track */}
            <div
              ref={sliderRef}
              className="mobile-slider-track"
              role="region"
              aria-label="Swipeable projects list"
              tabIndex={0}
              onKeyDown={handleSliderKeyDown}
            >
              {/* Slide 1: LegalMind AI */}
              <article
                className={`mobile-slide-card ${activeMobileSlide === 0 ? "is-active-slide" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label="Project 1 of 4: LegalMind AI"
              >
                <div className="mobile-slide-badge-row">
                  <span className="featured-badge">Featured · Document AI</span>
                </div>

                <h3 className="mobile-slide-title">
                  <a
                    href="https://legal-doc-demystifier.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-title-link"
                    aria-label="LegalMind AI: open live web application demo"
                  >
                    LegalMind AI
                    <span aria-hidden="true" className="project-arrow">↗</span>
                  </a>
                </h3>

                <p className="mobile-slide-summary">
                  Contracts and legal notices are dense, complex, and difficult to parse without specialized training, making it easy to overlook critical obligations.
                </p>

                {/* View Mode Toggle for LegalMind AI on mobile */}
                <div className="mobile-mode-toggle-wrap">
                  <div className="view-mode-toggle" role="tablist" aria-label="LegalMind inspection modes">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={legalMindView === "preview"}
                      aria-controls="mobile-legalmind-preview"
                      id="mobile-tab-preview"
                      className={`toggle-tab ${legalMindView === "preview" ? "is-active" : ""}`}
                      onClick={() => setLegalMindView("preview")}
                    >
                      App Preview
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={legalMindView === "architecture"}
                      aria-controls="mobile-legalmind-arch"
                      id="mobile-tab-arch"
                      className={`toggle-tab ${legalMindView === "architecture" ? "is-active" : ""}`}
                      onClick={() => setLegalMindView("architecture")}
                    >
                      Architecture
                    </button>
                  </div>
                </div>

                {/* Display Panel */}
                {legalMindView === "preview" ? (
                  <div
                    id="mobile-legalmind-preview"
                    role="tabpanel"
                    aria-labelledby="mobile-tab-preview"
                    className="featured-media-viewport"
                  >
                    <div className="viewport-top-bar">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                      <span className="viewport-url">legal-doc-demystifier.vercel.app</span>
                    </div>
                    <div className="viewport-image-wrapper">
                      <Image
                        src="/projects/project-3.png"
                        alt="LegalMind AI contract demystifier interface showing plain-English clause breakdown"
                        width={800}
                        height={500}
                        quality={85}
                        className="viewport-image"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    id="mobile-legalmind-arch"
                    role="tabpanel"
                    aria-labelledby="mobile-tab-arch"
                    className="architecture-explorer-panel"
                  >
                    <div className="explorer-header">
                      <span className="explorer-kicker">Pipeline Stages</span>
                      <span className="explorer-indicator">Tap step to inspect trade-off</span>
                    </div>
                    <div className="pipeline-steps-grid" role="tablist" aria-label="Pipeline stages">
                      {LEGALMIND_PIPELINE.map((step, idx) => {
                        const isSelected = activeStepIndex === idx;
                        return (
                          <button
                            key={step.id}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            className={`pipeline-step-btn ${isSelected ? "is-selected" : ""}`}
                            onClick={() => setActiveStepIndex(idx)}
                          >
                            <span className="step-btn-num">{step.number}</span>
                            <span className="step-btn-title">{step.title}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="pipeline-inspection-box" aria-live="polite">
                      <span className="inspection-step-tag">Stage {activeStep.number} · {activeStep.tech}</span>
                      <p className="inspection-summary mt-1">{activeStep.summary}</p>
                      <div className="inspection-tradeoff mt-2">
                        <span className="tradeoff-badge">Architecture Decision</span>
                        <p className="tradeoff-text">{activeStep.tradeoff}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="featured-implementation-block">
                  <span className="featured-implementation-label">Implementation</span>
                  <p className="featured-implementation-text">
                    Processes uploaded contracts using Google Document AI to extract structured clauses and cross-references statutory definitions from Indian legal databases.
                  </p>
                </div>

                <div className="mobile-slide-action">
                  <a
                    href="https://legal-doc-demystifier.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-demo-btn w-full justify-center"
                  >
                    Launch Live Web App <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>

              {/* Slide 2: VYRN */}
              <article
                className={`mobile-slide-card ${activeMobileSlide === 1 ? "is-active-slide" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label="Project 2 of 4: VYRN"
              >
                <div className="mobile-slide-badge-row">
                  <span className="featured-badge">Featured · Adaptive AI Coaching</span>
                </div>

                <h3 className="mobile-slide-title">
                  VYRN — Adaptive AI Coaching
                </h3>

                <p className="mobile-slide-summary">
                  Static workout splits follow rigid progression schedules regardless of daily fatigue, poor sleep, or recovery deficits that impact training capacity.
                </p>

                <div className="vyrn-media-viewport">
                  <div className="vyrn-image-wrapper">
                    <Image
                      src="/projects/vyrn.png"
                      alt="VYRN mobile interface displaying biometric readiness score, training load, and dynamic volume recommendations"
                      width={800}
                      height={533}
                      quality={85}
                      className="vyrn-image"
                    />
                  </div>
                  <div className="vyrn-telemetry-badge">
                    <span className="telemetry-prototype-dot" />
                    <span className="telemetry-label">LangGraph Decision Graph · Prototype</span>
                  </div>
                </div>

                <div className="featured-implementation-block">
                  <span className="featured-implementation-label">Implementation</span>
                  <p className="featured-implementation-text">
                    A mobile coaching prototype engineered with a LangGraph decision workflow in FastAPI. It models training readiness inputs and recommends dynamic volume adjustments with contextual explanations.
                  </p>
                </div>
              </article>

              {/* Slide 3: MindCare */}
              <article
                className={`mobile-slide-card ${activeMobileSlide === 2 ? "is-active-slide" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label="Project 3 of 4: MindCare"
              >
                <div className="mobile-slide-badge-row">
                  <span className="featured-badge">AI Companion · Web App</span>
                </div>

                <div className="mobile-slide-title-row">
                  <h3 className="mobile-slide-title">MindCare</h3>
                  <a
                    href="https://mindcare-yb5c.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="supporting-link"
                    aria-label="MindCare: open live demo"
                  >
                    Live Demo <span aria-hidden="true" className="supporting-link-arrow">↗</span>
                  </a>
                </div>

                <p className="mobile-slide-summary">
                  Combines conversational check-ins, mood tracking over time, and emotion-related signals to support daily reflection.
                </p>

                <div className="supporting-media rounded-xl overflow-hidden border border-[#cbd5e1]">
                  <Image
                    src="/projects/project-2.png"
                    alt="MindCare preview"
                    width={800}
                    height={500}
                    quality={85}
                    className="supporting-image"
                  />
                </div>

                <div className="featured-implementation-block">
                  <span className="featured-implementation-label">Implementation</span>
                  <p className="featured-implementation-text">
                    Built with persistent vector memory for conversational continuity across sessions, paired with real-time facial expression analysis.
                  </p>
                </div>

                <div className="mobile-slide-action">
                  <a
                    href="https://mindcare-yb5c.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-demo-btn w-full justify-center"
                  >
                    Launch Live Demo <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>

              {/* Slide 4: Innovix Studio */}
              <article
                className={`mobile-slide-card ${activeMobileSlide === 3 ? "is-active-slide" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label="Project 4 of 4: Innovix Studio"
              >
                <div className="mobile-slide-badge-row">
                  <span className="featured-badge">Brand &amp; Studio Website</span>
                </div>

                <div className="mobile-slide-title-row">
                  <h3 className="mobile-slide-title">Innovix Studio</h3>
                  <a
                    href="https://innovix-branding-studio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="supporting-link"
                    aria-label="Innovix Studio: open live demo"
                  >
                    Live Demo <span aria-hidden="true" className="supporting-link-arrow">↗</span>
                  </a>
                </div>

                <p className="mobile-slide-summary">
                  A website for a creative agency in Jammu, showcasing its service portfolio and helping potential clients make enquiries or schedule a call.
                </p>

                <div className="supporting-media rounded-xl overflow-hidden border border-[#cbd5e1]">
                  <Image
                    src="/projects/project-1.png"
                    alt="Innovix Studio preview"
                    width={800}
                    height={500}
                    quality={85}
                    className="supporting-image"
                  />
                </div>

                <div className="featured-implementation-block">
                  <span className="featured-implementation-label">Implementation</span>
                  <p className="featured-implementation-text">
                    Built as a responsive Next.js application with fast asset delivery and an integrated client inquiry flow.
                  </p>
                </div>

                <div className="mobile-slide-action">
                  <a
                    href="https://innovix-branding-studio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-demo-btn w-full justify-center"
                  >
                    Launch Live Demo <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            </div>

            {/* Pagination Dots */}
            <div className="slider-pagination-wrap">
              <div className="slider-pagination-dots" role="tablist" aria-label="Project carousel pagination">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={activeMobileSlide === idx}
                    aria-label={`Go to project ${idx + 1}: ${PROJECT_NAMES[idx]}`}
                    className={`slider-dot ${activeMobileSlide === idx ? "is-active" : ""}`}
                    onClick={() => scrollToSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* DESKTOP EDITORIAL LAYOUT (visible on screens >= 769px)        */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div className="work-desktop-editorial">
            {/* Featured Project 1: LegalMind AI */}
            <ScrollReveal delay={0.06}>
              <article className="featured-project-card mt-12" aria-labelledby="legalmind-heading">
                <div className="featured-project-layout">
                  {/* Content Column */}
                  <div className="featured-project-info">
                    <div className="featured-project-badge-row">
                      <span className="featured-badge">Featured · Document AI</span>
                    </div>

                    <h3 id="legalmind-heading" className="featured-project-title">
                      <a
                        href="https://legal-doc-demystifier.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="featured-title-link"
                        aria-label="LegalMind AI: open live web application demo"
                      >
                        LegalMind AI
                        <span aria-hidden="true" className="project-arrow">↗</span>
                      </a>
                    </h3>

                    <p className="featured-project-summary">
                      Contracts and legal notices are dense, complex, and difficult to parse without specialized training, making it easy to overlook critical obligations.
                    </p>

                    <div className="featured-implementation-block">
                      <span className="featured-implementation-label">Implementation</span>
                      <p className="featured-implementation-text">
                        Processes uploaded contracts using Google Document AI to extract structured clauses and cross-references statutory definitions from Indian legal databases. Synthesizes plain-English summaries and obligation timelines with a safety filter that intercepts direct advisory outputs.
                      </p>
                    </div>

                    <div className="featured-actions">
                      <a
                        href="https://legal-doc-demystifier.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="featured-demo-btn"
                      >
                        Launch Live Web App <span aria-hidden="true">↗</span>
                      </a>

                      <div className="view-mode-toggle" role="tablist" aria-label="LegalMind inspection modes">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={legalMindView === "preview"}
                          aria-controls="legalmind-preview-panel"
                          id="tab-preview"
                          className={`toggle-tab ${legalMindView === "preview" ? "is-active" : ""}`}
                          onClick={() => setLegalMindView("preview")}
                        >
                          App Preview
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={legalMindView === "architecture"}
                          aria-controls="legalmind-arch-panel"
                          id="tab-arch"
                          className={`toggle-tab ${legalMindView === "architecture" ? "is-active" : ""}`}
                          onClick={() => setLegalMindView("architecture")}
                        >
                          Architecture Explorer
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual / Interactive Column */}
                  <div className="featured-project-display">
                    {legalMindView === "preview" ? (
                      <div
                        id="legalmind-preview-panel"
                        role="tabpanel"
                        aria-labelledby="tab-preview"
                        className="featured-media-viewport"
                      >
                        <div className="viewport-top-bar">
                          <span className="dot dot-red" />
                          <span className="dot dot-yellow" />
                          <span className="dot dot-green" />
                          <span className="viewport-url">legal-doc-demystifier.vercel.app</span>
                        </div>
                        <ScrollReveal variant="clip-image" delay={0.08}>
                          <div className="viewport-image-wrapper">
                            <Image
                              src="/projects/project-3.png"
                              alt="LegalMind AI contract demystifier interface showing plain-English clause breakdown"
                              width={1200}
                              height={750}
                              quality={85}
                              className="viewport-image"
                            />
                          </div>
                        </ScrollReveal>
                        <div className="viewport-caption">
                          <span>Multimodal output: plain-English clause translation, obligation timeline, and TTS audio</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        id="legalmind-arch-panel"
                        role="tabpanel"
                        aria-labelledby="tab-arch"
                        className="architecture-explorer-panel"
                      >
                        <div className="explorer-header">
                          <div className="explorer-title-wrap">
                            <span className="explorer-kicker">Interactive Architecture</span>
                            <h4 className="explorer-title">Legal Document Ingestion &amp; Safety Pipeline</h4>
                          </div>
                          <span className="explorer-indicator">Click step to inspect trade-off</span>
                        </div>

                        <div className="pipeline-steps-grid" role="tablist" aria-label="Pipeline stages">
                          {LEGALMIND_PIPELINE.map((step, idx) => {
                            const isSelected = activeStepIndex === idx;
                            return (
                              <button
                                key={step.id}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                className={`pipeline-step-btn ${isSelected ? "is-selected" : ""}`}
                                onClick={() => setActiveStepIndex(idx)}
                              >
                                <div className="step-btn-num">{step.number}</div>
                                <div className="step-btn-text">
                                  <span className="step-btn-title">{step.title}</span>
                                  <span className="step-btn-tech">{step.tech}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pipeline-inspection-box" aria-live="polite">
                          <div className="inspection-header">
                            <span className="inspection-step-tag">Stage {activeStep.number} · {activeStep.tech}</span>
                            <h5 className="inspection-step-title">{activeStep.title}</h5>
                          </div>
                          <p className="inspection-summary">{activeStep.summary}</p>
                          <div className="inspection-tradeoff">
                            <span className="tradeoff-badge">Architecture Decision</span>
                            <p className="tradeoff-text">{activeStep.tradeoff}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>

            {/* Featured Project 2: VYRN */}
            <ScrollReveal delay={0.08}>
              <article className="featured-project-card featured-project-card--vyrn mt-10" aria-labelledby="vyrn-heading">
                <div className="featured-project-layout featured-project-layout--reverse">
                  {/* Visual Column */}
                  <div className="featured-project-display">
                    <ScrollReveal variant="clip-image" delay={0.08}>
                      <div className="vyrn-media-viewport">
                        <div className="vyrn-image-wrapper">
                          <Image
                            src="/projects/vyrn.png"
                            alt="VYRN mobile interface displaying biometric readiness score, training load, and dynamic volume recommendations"
                            width={1200}
                            height={800}
                            quality={85}
                            className="vyrn-image"
                          />
                        </div>
                        <div className="vyrn-telemetry-badge">
                          <span className="telemetry-prototype-dot" />
                          <span className="telemetry-label">LangGraph Decision Graph · Prototype Interface</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Content Column */}
                  <div className="featured-project-info">
                    <div className="featured-project-badge-row">
                      <span className="featured-badge">Featured · Adaptive AI Coaching</span>
                    </div>

                    <h3 id="vyrn-heading" className="featured-project-title">
                      VYRN — Adaptive AI Coaching
                    </h3>

                    <p className="featured-project-summary">
                      Static workout splits follow rigid progression schedules regardless of daily fatigue, poor sleep, or recovery deficits that impact training capacity.
                    </p>

                    <div className="featured-implementation-block">
                      <span className="featured-implementation-label">Implementation</span>
                      <p className="featured-implementation-text">
                        A mobile coaching prototype engineered with a LangGraph decision workflow in FastAPI. It models training readiness inputs and recommends dynamic volume adjustments with contextual explanations.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>

            {/* Supporting Projects Section */}
            <ScrollReveal delay={0.1}>
              <div className="supporting-section mt-16">
                <div className="supporting-header">
                  <span className="supporting-kicker">Additional Selected Work</span>
                  <h3 className="supporting-title">Specialized tools and web applications</h3>
                </div>

                <div className="supporting-grid mt-8" role="region" aria-label="Supporting projects list">
                  {SUPPORTING_PROJECTS.map((proj) => (
                    <article key={proj.title} className="supporting-card">
                      <ScrollReveal variant="clip-image" delay={0.08}>
                        <div className="supporting-media">
                          <Image
                            src={proj.image}
                            alt={`${proj.title} preview`}
                            width={800}
                            height={500}
                            quality={85}
                            className="supporting-image"
                          />
                        </div>
                      </ScrollReveal>

                      <div className="supporting-body">
                        <div className="supporting-title-row">
                          <div className="supporting-heading-group">
                            <p className="supporting-category">{proj.category}</p>
                            <h4 className="supporting-name">{proj.title}</h4>
                          </div>
                          {proj.demo ? (
                            <a
                              href={proj.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="supporting-link"
                              aria-label={`${proj.title}: open live demo`}
                            >
                              Live Demo <span aria-hidden="true" className="supporting-link-arrow">↗</span>
                            </a>
                          ) : null}
                        </div>

                        <p className="supporting-description">{proj.description}</p>
                        {proj.implementation ? (
                          <p className="supporting-implementation">{proj.implementation}</p>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Section Transition Indicator */}
          <ScrollReveal delay={0.12}>
            <div
              ref={transitionRef}
              className={`project-transition ${transitionSeen ? "is-in" : ""}`}
              aria-hidden="true"
            >
              <span />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
