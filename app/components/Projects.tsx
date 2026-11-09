"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";
import InnovixProjectCover from "./InnovixProjectCover";

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
  implementation: string;
  challenge: string;
  stack: string[];
  image: string;
  secondaryImage?: string;
  demo: string;
  github?: string;
}

const SUPPORTING_PROJECTS: SupportingProject[] = [
  {
    title: "MindCare",
    category: "AI Reflection · Web App",
    description:
      "Most reflection tools either feel like a clinical form or store everything you type without asking. MindCare gives people a calmer space to talk things through, complete a guided check-in, and decide what context stays between conversations.",
    implementation:
      "Built with React and FastAPI using account-backed sessions, streamed responses, and an explicit memory toggle controlled by the user.",
    challenge:
      "What I learned: Designing around emotional topics meant keeping latency low on streamed replies while ensuring session memory could be turned off cleanly at the database layer.",
    stack: ["React", "FastAPI", "Streaming", "User-controlled memory"],
    image: "/projects/mindcare-room-hero.webp",
    secondaryImage: "/projects/project-2.png",
    demo: "https://mindcare-opal.vercel.app/",
    github: "https://github.com/mohitagg07",
  },
  {
    title: "Innovix Studio",
    category: "Brand & Studio Website",
    description:
      "A creative studio in Jammu needed a fast, clear web presence that explained their services without burying visitors in agency jargon and made starting a project enquiry straightforward.",
    implementation:
      "Engineered as a responsive Next.js application with optimized media delivery, structured service breakdowns, and a direct client enquiry flow.",
    challenge:
      "What I learned: Balancing expressive brand typography with sub-second page loads on mobile connections required careful image sizing and minimal client-side JavaScript.",
    stack: ["Next.js", "Responsive UI", "Client enquiries"],
    image: "/projects/project-1.png",
    demo: "https://innovix-branding-studio.vercel.app/",
    github: "https://github.com/mohitagg07",
  },
];

const SCRAPER_STAGES = [
  {
    step: "01",
    name: "Extraction & Retry Queue",
    tech: "Python · Playwright · AsyncIO",
    problem: "Public business directories paginate inconsistently and throttle burst requests.",
    solution:
      "Built an asynchronous worker queue with jittered backoff and selector fallbacks so interrupted runs resume cleanly without re-scraping completed pages.",
  },
  {
    step: "02",
    name: "Entity Deduplication & Cleaning",
    tech: "Pydantic · Fuzzy Matching",
    problem: "The same business often appears across sources with slightly different phone formats, abbreviations, or missing fields.",
    solution:
      "Normalized phone numbers, domains, and address tokens through strict Pydantic schemas before merging duplicate records into a single canonical entry.",
  },
  {
    step: "03",
    name: "Enrichment & Webhook Sync",
    tech: "FastAPI · REST Bridges",
    problem: "Raw CSV exports still required someone to manually copy records into internal spreadsheets and CRMs.",
    solution:
      "Added automated enrichment checks and a webhook bridge that pushes validated records directly into downstream tools.",
  },
] as const;

const GUARDRAIL_SAMPLES = [
  {
    label: "Indemnity Clause",
    rawClause: "Clause 14.2: Receiving Party shall indemnify Disclosing Party against all indirect or consequential losses without cap.",
    unfilteredOutput: "You must reject this contract immediately and refuse to sign Clause 14.2.",
    guardedOutput:
      "Plain-English note: This clause leaves liability uncapped for indirect losses. Commercial agreements often negotiate a mutual cap tied to contract value.",
  },
  {
    label: "Auto-Renewal Notice",
    rawClause: "Section 8.1: Agreement renews automatically for 24 months unless written notice is delivered 90 days prior.",
    unfilteredOutput: "Send a termination letter today so you do not get locked in.",
    guardedOutput:
      "Timeline obligation: A 90-day notice window applies before the renewal date. Added to the compliance calendar so the team can review in advance.",
  },
] as const;

const PROJECT_KICKERS = [
  "Featured · Document AI",
  "Prototype · Adaptive Coaching",
  "AI Reflection · Web App",
  "Brand & Studio Website",
];

const PROJECT_NAMES = [
  "LegalMind AI",
  "VYRN",
  "MindCare",
  "Innovix Studio",
];

export default function Projects() {
  const workStageRef = useRef<HTMLDivElement>(null);
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [transitionRef, transitionSeen] = useInView<HTMLDivElement>(0.2);
  const prefersReducedMotion = useReducedMotion();

  // This uses the same 100svh handoff window as About's fade:
  // Work begins rising as it enters from below, then settles as it reaches the top.
  const { scrollYProgress: workEntryProgress } = useScroll({
    target: workStageRef,
    offset: ["start end", "start start"],
  });
  const workContentLiftRaw = useTransform(workEntryProgress, [0, 0.62, 1], [76, 18, 0]);
  const workContentOpacityRaw = useTransform(workEntryProgress, [0, 1], [0.88, 1]);
  const workContentLift = useSpring(workContentLiftRaw, { stiffness: 185, damping: 29, mass: 0.58 });
  const workContentOpacity = useSpring(workContentOpacityRaw, { stiffness: 190, damping: 31, mass: 0.52 });
  const [legalMindView, setLegalMindView] = useState<"preview" | "architecture">("preview");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [activeMobileSlide, setActiveMobileSlide] = useState<number>(0);
  const [mindCareView, setMindCareView] = useState<"room" | "session">("room");
  const [scraperStageIdx, setScraperStageIdx] = useState<number>(0);
  const [guardrailIdx, setGuardrailIdx] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeStep = LEGALMIND_PIPELINE[activeStepIndex];
  const activeScraperStage = SCRAPER_STAGES[scraperStageIdx];
  const activeGuardrail = GUARDRAIL_SAMPLES[guardrailIdx];

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
    <div ref={workStageRef} className="work-scroll-stage">
      <section
        ref={sectionRef}
        id="work"
        className={`section-spacer work-section relative z-10 bg-[#f4f4f5] rounded-t-[3rem] shadow-2xl ${active ? "is-active" : ""}`}
      >
        <motion.div
          className="section-wrap work-entry-content"
          style={{
            y: prefersReducedMotion ? 0 : workContentLift,
            opacity: prefersReducedMotion ? 1 : workContentOpacity,
          }}
        >
          {/* Section Introduction */}
          <div className="project-intro-reveal">
            <div className="project-intro">
              <p className="project-eyebrow">Selected work <span aria-hidden="true">/</span> a few things I&apos;ve made</p>
              <ScrollReveal variant="mask" delay={0.05}>
                <h2 className="section-heading section-title">
                  A few things I&apos;ve <em className="work-title-accent">built.</em>
                </h2>
              </ScrollReveal>
              <p className="section-lede mt-5">
                A closer look at the problems, decisions and interfaces behind each build—from document-heavy workflows to personal products.
              </p>
            </div>
          </div>

          <div className="work-principles" aria-label="How I approach a build">
            <span className="work-principles__label">A simple rulebook</span>
            <div className="work-principles__item"><b>01</b><span>Start with the problem</span></div>
            <div className="work-principles__item"><b>02</b><span>Make the hard parts clear</span></div>
            <div className="work-principles__item"><b>03</b><span>Build for real use</span></div>
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
                  Important clauses, dates and obligations can hide inside pages of legal language. LegalMind helps turn an uploaded document into something easier to inspect and understand.
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
                  <span className="featured-badge">Prototype · Adaptive AI Coaching</span>
                </div>

                <h3 className="mobile-slide-title">
                  VYRN — Adaptive AI Coaching
                </h3>

                <p className="mobile-slide-summary">
                  Fixed workout plans rarely reflect how recovery changes from day to day. VYRN explores how readiness signals can inform training volume and recovery decisions.
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
                    A FastAPI prototype with a LangGraph decision flow. It models readiness inputs and suggests training-volume adjustments with context behind each recommendation.
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
                  <span className="featured-badge">AI Reflection · Web App</span>
                </div>

                <div className="mobile-slide-title-row">
                  <h3 className="mobile-slide-title">MindCare</h3>
                  <a
                    href="https://mindcare-opal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="supporting-link"
                    aria-label="MindCare: open live demo"
                  >
                    Live Demo <span aria-hidden="true" className="supporting-link-arrow">↗</span>
                  </a>
                </div>

                <p className="mobile-slide-summary">
                  A quieter space to talk things through, complete a guided check-in, and choose what context stays with you between conversations.
                </p>

                <div className="supporting-media supporting-media--mindcare mobile-mindcare-preview">
                  <Image
                    src="/projects/mindcare-room-hero.webp"
                    alt="MindCare homepage with its calm forest-green reflection experience"
                    width={640}
                    height={277}
                    quality={90}
                    className="supporting-image"
                  />
                </div>

                <div className="featured-implementation-block">
                  <span className="featured-implementation-label">Implementation</span>
                  <p className="featured-implementation-text">
                    React and FastAPI power account-backed sessions, streamed conversations, and a memory setting people control themselves.
                  </p>
                </div>

                <div className="project-tags mobile-project-tags" aria-label="MindCare technologies and capabilities">
                  {["React", "FastAPI", "Streaming", "User-controlled memory"].map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="mobile-slide-action">
                  <a
                    href="https://mindcare-opal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-demo-btn w-full justify-center"
                  >
                    Open MindCare <span aria-hidden="true">↗</span>
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

                <div className="supporting-media innovix-project-media rounded-xl overflow-hidden">
                  <InnovixProjectCover />
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
              <article className="featured-project-card mt-12" data-project-number="01" aria-labelledby="legalmind-heading">
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
                      Important clauses, dates and obligations can hide inside pages of legal language. LegalMind helps turn an uploaded document into something easier to inspect and understand.
                    </p>

                    <div className="featured-implementation-block">
                      <span className="featured-implementation-label">Implementation</span>
                      <p className="featured-implementation-text">
                        Google Document AI extracts structured clauses; retrieval connects relevant Indian statutes; and a safety layer keeps the output explanatory rather than prescriptive.
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
              <article className="featured-project-card featured-project-card--vyrn mt-10" data-project-number="02" aria-labelledby="vyrn-heading">
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
                      <span className="featured-badge">Prototype · Adaptive AI Coaching</span>
                    </div>

                    <h3 id="vyrn-heading" className="featured-project-title">
                      VYRN — Adaptive AI Coaching
                    </h3>

                    <p className="featured-project-summary">
                      Fixed workout plans rarely reflect how recovery changes from day to day. VYRN explores how readiness signals can inform training volume and recovery decisions.
                    </p>

                    <div className="featured-implementation-block">
                      <span className="featured-implementation-label">Implementation</span>
                      <p className="featured-implementation-text">
                        A FastAPI prototype with a LangGraph decision flow. It models readiness inputs and suggests training-volume adjustments with context behind each recommendation.
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
                  <span className="supporting-kicker">A little more from the workbench</span>
                  <h3 className="supporting-title">Other things I&apos;ve been making.</h3>
                </div>

                <div className="supporting-grid mt-8" role="region" aria-label="Supporting projects list">
                  {SUPPORTING_PROJECTS.map((proj) => {
                    const isMindCare = proj.title === "MindCare";
                    const displaySrc =
                      isMindCare && mindCareView === "session" && proj.secondaryImage
                        ? proj.secondaryImage
                        : proj.image;

                    return (
                      <article
                        key={proj.title}
                        className={`supporting-card${isMindCare ? " supporting-card--mindcare" : ""}`}
                      >
                        <ScrollReveal variant="clip-image" delay={0.08}>
                          <div
                            className={`supporting-media${
                              isMindCare ? " supporting-media--mindcare" : ""
                            }`}
                          >
                            {isMindCare ? (
                              <Image
                                src={displaySrc}
                                alt="MindCare reflection interface preview"
                                width={800}
                                height={500}
                                quality={90}
                                className="supporting-image"
                              />
                            ) : (
                              <InnovixProjectCover />
                            )}
                          </div>
                        </ScrollReveal>

                        <div className="supporting-body">
                          <div className="supporting-title-row">
                            <div className="supporting-heading-group">
                              <p className="supporting-category">{proj.category}</p>
                              <h4 className="supporting-name">{proj.title}</h4>
                            </div>
                            <div className="supporting-links-group">
                              {isMindCare && proj.secondaryImage ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMindCareView((v) => (v === "room" ? "session" : "room"))
                                  }
                                  className="supporting-view-switch"
                                  aria-pressed={mindCareView === "session"}
                                >
                                  {mindCareView === "room" ? "View Live Session UI" : "View Calm Room UI"}
                                </button>
                              ) : null}
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
                          </div>

                          <p className="supporting-description">{proj.description}</p>
                          {proj.implementation ? (
                            <p className="supporting-implementation">{proj.implementation}</p>
                          ) : null}
                          {proj.challenge ? (
                            <p className="supporting-challenge">{proj.challenge}</p>
                          ) : null}
                          <div
                            className="project-tags"
                            aria-label={`${proj.title} technologies and capabilities`}
                          >
                            {proj.stack.map((tag) => (
                              <span className="project-tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Phase 9: Playground, Workflows & Engineering Experiments */}
            <ScrollReveal delay={0.11}>
              <div id="experiments" className="workbench-experiments mt-16">
                <div className="supporting-header">
                  <span className="supporting-kicker">Playground &amp; workflow engineering</span>
                  <h3 className="supporting-title">
                    Pipelines, scrapers &amp; smaller experiments.
                  </h3>
                  <p className="workbench-lede">
                    Not everything needs a heavy frontend. Some of my favourite builds are
                    background pipelines and guardrails that quietly clean up messy data.
                  </p>
                </div>

                <div className="workbench-grid mt-8">
                  {/* Experiment 1: Business Scraper & Data Enrichment Pipeline */}
                  <article className="workbench-card" aria-labelledby="exp-scraper-title">
                    <div className="workbench-card__meta">
                      <span className="workbench-badge">Workflow Engineering · Python &amp; FastAPI</span>
                      <a
                        href="https://github.com/mohitagg07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="workbench-gh-link"
                      >
                        GitHub ↗
                      </a>
                    </div>
                    <h4 id="exp-scraper-title" className="workbench-card__title">
                      Business Scraper &amp; Data Enrichment Pipeline
                    </h4>
                    <p className="workbench-card__desc">
                      Built to replace manual directory research: collects unstructured business
                      listings, deduplicates messy records, validates schemas, and syncs clean
                      entries directly to downstream tools.
                    </p>

                    <div className="workbench-tabs" role="tablist" aria-label="Scraper pipeline stages">
                      {SCRAPER_STAGES.map((st, idx) => (
                        <button
                          key={st.step}
                          type="button"
                          role="tab"
                          aria-selected={scraperStageIdx === idx}
                          onClick={() => setScraperStageIdx(idx)}
                          className={`workbench-tab ${scraperStageIdx === idx ? "is-active" : ""}`}
                        >
                          <span>{st.step}</span> {st.name}
                        </button>
                      ))}
                    </div>

                    <div className="workbench-stage-box" aria-live="polite">
                      <p className="workbench-stage-tech">
                        Stage {activeScraperStage.step} · {activeScraperStage.tech}
                      </p>
                      <p className="workbench-stage-row">
                        <strong>The problem:</strong> {activeScraperStage.problem}
                      </p>
                      <p className="workbench-stage-row">
                        <strong>How I solved it:</strong> {activeScraperStage.solution}
                      </p>
                    </div>
                  </article>

                  {/* Experiment 2: Deterministic Advisory Guardrail Sandbox */}
                  <article className="workbench-card" aria-labelledby="exp-guardrail-title">
                    <div className="workbench-card__meta">
                      <span className="workbench-badge">Interactive Sandbox · Safety Middleware</span>
                      <span className="workbench-mono-tag">LegalMind Sub-System</span>
                    </div>
                    <h4 id="exp-guardrail-title" className="workbench-card__title">
                      Deterministic Advisory Blocker
                    </h4>
                    <p className="workbench-card__desc">
                      When summarizing contracts, LLMs often slip into giving unauthorized legal
                      advice. This middleware intercepts prescriptive phrasing and rewrites it into
                      neutral, factual context.
                    </p>

                    <div className="workbench-tabs" role="tablist" aria-label="Sample contract clauses">
                      {GUARDRAIL_SAMPLES.map((sample, idx) => (
                        <button
                          key={sample.label}
                          type="button"
                          role="tab"
                          aria-selected={guardrailIdx === idx}
                          onClick={() => setGuardrailIdx(idx)}
                          className={`workbench-tab ${guardrailIdx === idx ? "is-active" : ""}`}
                        >
                          Sample 0{idx + 1}: {sample.label}
                        </button>
                      ))}
                    </div>

                    <div className="workbench-stage-box" aria-live="polite">
                      <p className="workbench-clause-quote">&ldquo;{activeGuardrail.rawClause}&rdquo;</p>
                      <div className="workbench-diff">
                        <p className="workbench-diff__blocked">
                          <span>Intercepted:</span> {activeGuardrail.unfilteredOutput}
                        </p>
                        <p className="workbench-diff__safe">
                          <span>Neutral Output:</span> {activeGuardrail.guardedOutput}
                        </p>
                      </div>
                    </div>
                  </article>
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
        </motion.div>
      </section>
    </div>
  );
}
