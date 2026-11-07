"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

const motionEase = [0.16, 1, 0.3, 1] as const;

interface JourneyMilestone {
  id: string;
  marker: string;
  title: string;
  subtitle: string;
  detail: string;
}

const JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
  {
    id: "milestone-vit",
    marker: "Foundation",
    title: "VIT Chennai",
    subtitle: "Computer Science (AI & ML)",
    detail:
      "Where curiosity turned into a habit of looking under the hood—learning core computer science while gravitating toward software that solves tangible problems.",
  },
  {
    id: "milestone-berger",
    marker: "Aug – Dec 2023",
    title: "Berger Paints Internship",
    subtitle: "August to December 2023",
    detail:
      "Stepping into real-world engineering workflows—seeing firsthand how practical software decisions affect day-to-day operations.",
  },
  {
    id: "milestone-mindcare",
    marker: "Product Exploration",
    title: "MindCare",
    subtitle: "Conversational product with user-controlled memory",
    detail:
      "Built around a simple question: how do you make a reflective space feel calm, private and genuinely helpful while keeping the user in control of their own context?",
  },
  {
    id: "milestone-scraper",
    marker: "Automation Pipeline",
    title: "Business Scraper",
    subtitle: "Business data collection and enrichment",
    detail:
      "Designed to take repetitive manual research—gathering scattered listings, deduplicating messy entries and enriching records—and turn it into a dependable pipeline.",
  },
];

export default function Story() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [sectionRef, active] = useInView<HTMLElement>(0.05);
  const [contentRef, inView] = useInView<HTMLDivElement>(0.1);
  const [journeyRef, journeyInView] = useInView<HTMLDivElement>(0.18);
  const [philosophyRef, philosophyInView] = useInView<HTMLDivElement>(0.18);
  const prefersReducedMotion = useReducedMotion();

  // Gentle parallax for the layered photo & project artifact collage
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 0.5, 1], [16, 0, -14]);
  const artifactY = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, -22]);
  const backingY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 12]);

  return (
    <div ref={stageRef} className="about-scroll-stage">
      <section
        ref={sectionRef}
        id="about"
        aria-label="About Mohit Aggarwal"
        className={"about-sticky-panel about-crafted-section " + (active ? "is-active" : "")}
      >
        <ScrollReveal className="about-reveal-wrap">
          <div
            ref={contentRef}
            className={"section-wrap about-crafted-canvas " + (inView ? "is-in" : "")}
          >
            {/* ── Top Editorial Masthead ── */}
            <header className="about-crafted-masthead">
              <div className="about-crafted-masthead__left">
                <span className="about-crafted-masthead__rule" aria-hidden="true" />
                <span className="about-crafted-masthead__kicker">About</span>
              </div>
              <span className="about-crafted-masthead__origin">
                Mohit Aggarwal · Jammu, India
              </span>
            </header>

            {/* ── Main Asymmetric Editorial Spread: Story on Left, Layered Collage on Right ── */}
            <div className="about-crafted-spread">
              {/* Left Column: Main Headline + Personal Story */}
              <div className="about-crafted-story-col">
                <h2
                  className="about-crafted-headline"
                  aria-label="I keep asking, Can this be simpler?"
                >
                  <span className="about-crafted-headline__line">
                    <motion.span
                      className="about-crafted-headline__word"
                      initial={prefersReducedMotion ? false : { y: "105%", opacity: 0 }}
                      animate={inView ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.72, delay: 0.04, ease: motionEase }
                      }
                    >
                      I keep asking,
                    </motion.span>
                  </span>

                  <span className="about-crafted-headline__line about-crafted-headline__line--serif">
                    <motion.span
                      className="about-crafted-headline__word"
                      initial={prefersReducedMotion ? false : { y: "105%", opacity: 0 }}
                      animate={inView ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.78, delay: 0.14, ease: motionEase }
                      }
                    >
                      Can this be{" "}
                      <span className="about-crafted-headline__underline-wrap">
                        simpler?
                        <svg
                          className="about-crafted-headline__underline"
                          viewBox="0 0 220 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M3 10.5C68 3.8 148 3.6 217 9.4"
                            stroke="#7CE2BC"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            initial={
                              prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }
                            }
                            animate={
                              inView
                                ? { pathLength: 1, opacity: 1 }
                                : { pathLength: 0, opacity: 0 }
                            }
                            transition={
                              prefersReducedMotion
                                ? { duration: 0 }
                                : { duration: 0.85, delay: 0.46, ease: motionEase }
                            }
                          />
                        </svg>
                      </span>
                    </motion.span>
                  </span>
                </h2>

                {/* Approved Personal Biography Copy */}
                <motion.div
                  className="about-crafted-bio"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.68, delay: 0.22, ease: motionEase }
                  }
                >
                  <p className="about-crafted-bio__greeting">Hey, I&apos;m Mohit.</p>

                  <p>
                    I studied Computer Science (AI &amp; Machine Learning) at{" "}
                    <strong>VIT Chennai</strong>. Somewhere along the way, I realised that what I
                    enjoy most isn&apos;t just writing code — it&apos;s figuring out why something
                    isn&apos;t working and finding a better way to make it work.
                  </p>

                  <p>
                    That curiosity has taken me through web development, backend systems,
                    automation and AI-powered projects. I&apos;ve experimented with building
                    products like <strong>MindCare</strong> and a{" "}
                    <strong>business-data collection and enrichment pipeline</strong>, each
                    presenting a different kind of problem to solve.
                  </p>

                  <p>
                    I enjoy getting into the details, trying things out, occasionally getting
                    stuck, and eventually turning a rough idea into something people can actually
                    use.
                  </p>

                  <p className="about-crafted-bio__closing">
                    I&apos;m not interested in adding AI to everything just because it&apos;s
                    trendy. I&apos;m interested in building the right solution for the problem.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Carefully Controlled Layered Photo & Project Artifact Collage */}
              <div className="about-crafted-collage-col">
                <div
                  className="about-crafted-collage"
                  data-about-portrait="true"
                  data-about-interactive="portrait"
                >
                  {/* Deep Teal Architectural Backing Plane */}
                  <motion.div
                    className="about-crafted-collage__backing"
                    aria-hidden="true"
                    style={{ y: prefersReducedMotion ? 0 : backingY }}
                  />

                  {/* Hand-Drawn Editorial Annotation Above Collage */}
                  <div className="about-crafted-collage__note">
                    <span className="about-crafted-collage__note-text">
                      Outside the terminal · Jammu
                    </span>
                    <svg
                      width="36"
                      height="24"
                      viewBox="0 0 36 24"
                      fill="none"
                      aria-hidden="true"
                      className="about-crafted-collage__note-arrow"
                    >
                      <motion.path
                        d="M3 4C16 4 25 10 30 20M30 20L23.5 17.5M30 20L32.5 13.5"
                        stroke="#7CE2BC"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                        animate={
                          inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
                        }
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.75, delay: 0.52, ease: motionEase }
                        }
                      />
                    </svg>
                  </div>

                  {/* Primary Authentic Portrait (/assets/mohit-story.jpg — different from Hero photo) */}
                  <motion.figure
                    className="about-crafted-collage__portrait"
                    initial={
                      prefersReducedMotion
                        ? false
                        : { clipPath: "inset(8% 0% 8% 0%)", opacity: 0 }
                    }
                    animate={
                      inView
                        ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
                        : { clipPath: "inset(8% 0% 8% 0%)", opacity: 0 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.86, delay: 0.16, ease: motionEase }
                    }
                    style={{ y: prefersReducedMotion ? 0 : portraitY }}
                  >
                    <Image
                      src="/assets/mohit-story.jpg"
                      alt="Mohit Aggarwal"
                      fill
                      sizes="(max-width: 960px) 86vw, 420px"
                      quality={85}
                      className="about-crafted-collage__portrait-img object-cover"
                    />
                    <div className="about-crafted-collage__grain" aria-hidden="true" />
                  </motion.figure>

                  {/* Overlapping Authentic Project Artifact 1: MindCare Screenshot */}
                  <motion.figure
                    className="about-crafted-collage__mindcare"
                    data-about-interactive="mindcare-artifact"
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -18, y: 16 }}
                    animate={
                      inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -18, y: 16 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.72, delay: 0.38, ease: motionEase }
                    }
                    style={{ y: prefersReducedMotion ? 0 : artifactY }}
                  >
                    <div className="about-crafted-collage__mindcare-frame">
                      <Image
                        src="/projects/project-2.png"
                        alt="MindCare product screenshot showing calm session reflection interface"
                        width={260}
                        height={146}
                        className="about-crafted-collage__mindcare-img"
                      />
                    </div>
                    <figcaption className="about-crafted-collage__artifact-caption">
                      <span className="about-crafted-collage__artifact-dot" aria-hidden="true" />
                      <span>MindCare — user-controlled session memory</span>
                    </figcaption>
                  </motion.figure>

                  {/* Overlapping Authentic Project Artifact 2: Business Scraper Pipeline Strip */}
                  <motion.div
                    className="about-crafted-collage__scraper"
                    data-about-interactive="scraper-artifact"
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 14, y: 14 }}
                    animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 14, y: 14 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.72, delay: 0.48, ease: motionEase }
                    }
                  >
                    <div className="about-crafted-collage__scraper-head">
                      <span className="about-crafted-collage__scraper-tag">Business Scraper</span>
                      <span className="about-crafted-collage__scraper-flow">
                        Collect → Deduplicate → Enrich
                      </span>
                    </div>
                    <p className="about-crafted-collage__scraper-note">
                      Turning scattered public directory listings into clean, verified records.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── Personal Journey: Flowing Editorial Milestone Timeline (No Generic Cards) ── */}
            <div ref={journeyRef} className="about-journey-section">
              <div className="about-journey-header">
                <div className="about-journey-header__title-group">
                  <span className="about-journey-header__kicker">Personal Journey</span>
                  <h3 className="about-journey-header__title">
                    Where the curiosity{" "}
                    <span className="about-journey-header__serif">took shape.</span>
                  </h3>
                </div>
                <p className="about-journey-header__aside">
                  Real milestones across university, industry and personal builds.
                </p>
              </div>

              {/* Continuous Handcrafted SVG Timeline Thread */}
              <div className="about-journey-track-wrap" aria-hidden="true">
                <svg
                  className="about-journey-track-svg"
                  viewBox="0 0 1120 24"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="12"
                    x2="1120"
                    y2="12"
                    stroke="rgba(245, 242, 234, 0.12)"
                    strokeWidth="1"
                  />
                  <motion.path
                    d="M0 12C280 6 560 18 840 10C960 7 1050 13 1120 12"
                    stroke="#7CE2BC"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.25 }}
                    animate={
                      journeyInView
                        ? { pathLength: 1, opacity: 0.85 }
                        : { pathLength: 0, opacity: 0.25 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 1.15, delay: 0.1, ease: motionEase }
                    }
                  />
                </svg>
              </div>

              <ol className="about-journey-list">
                {JOURNEY_MILESTONES.map((item, idx) => (
                  <motion.li
                    key={item.id}
                    className="about-journey-item"
                    data-about-interactive={item.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={
                      journeyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.62, delay: 0.12 + idx * 0.1, ease: motionEase }
                    }
                  >
                    <div className="about-journey-item__node-row">
                      <span className="about-journey-item__node" aria-hidden="true" />
                      <span className="about-journey-item__marker">{item.marker}</span>
                    </div>
                    <h4 className="about-journey-item__title">{item.title}</h4>
                    <p className="about-journey-item__subtitle">{item.subtitle}</p>
                    <p className="about-journey-item__detail">{item.detail}</p>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* ── Personal Engineering Philosophy: Understand → Build → Refine ── */}
            <div ref={philosophyRef} className="about-philosophy-section">
              <div className="about-philosophy-header">
                <div>
                  <span className="about-philosophy-header__kicker">
                    Engineering Philosophy
                  </span>
                  <h3 className="about-philosophy-header__title">
                    Understand{" "}
                    <span className="about-philosophy-header__arrow" aria-hidden="true">
                      →
                    </span>{" "}
                    Build{" "}
                    <span className="about-philosophy-header__arrow" aria-hidden="true">
                      →
                    </span>{" "}
                    <span className="about-philosophy-header__serif">Refine.</span>
                  </h3>
                </div>
                <p className="about-philosophy-header__summary">
                  How I approach a rough problem and turn it into calm, dependable software.
                </p>
              </div>

              <div className="about-philosophy-stages">
                {/* Connecting Hand-Drawn SVG Arcs Between Stages (Desktop) */}
                <svg
                  className="about-philosophy-connector"
                  viewBox="0 0 1080 54"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M210 28C280 8 360 8 430 28M430 28L419 21M430 28L418 33"
                    stroke="#7CE2BC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={
                      philosophyInView
                        ? { pathLength: 1, opacity: 0.72 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.85, delay: 0.3, ease: motionEase }
                    }
                  />
                  <motion.path
                    d="M595 28C665 46 745 46 815 28M815 28L803 23M815 28L805 35"
                    stroke="#7CE2BC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={
                      philosophyInView
                        ? { pathLength: 1, opacity: 0.72 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.85, delay: 0.55, ease: motionEase }
                    }
                  />
                </svg>

                {/* Stage 1: Understand */}
                <motion.article
                  className="about-philosophy-stage"
                  data-about-interactive="stage-understand"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={
                    philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.62, delay: 0.12, ease: motionEase }
                  }
                >
                  <div className="about-philosophy-stage__icon-wrap">
                    {/* Custom SVG: Tangled loop unravelling into a single clear path */}
                    <svg
                      width="56"
                      height="44"
                      viewBox="0 0 56 44"
                      fill="none"
                      aria-hidden="true"
                      className="about-philosophy-stage__svg"
                    >
                      <path
                        d="M4 28C10 28 12 12 20 12C27 12 27 32 19 32C12 32 15 18 26 20"
                        stroke="rgba(245, 242, 234, 0.42)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <motion.path
                        d="M24 20C32 21 38 22 51 22M51 22L45.5 17.5M51 22L45.5 26.5"
                        stroke="#7CE2BC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={prefersReducedMotion ? false : { pathLength: 0 }}
                        animate={philosophyInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.8, delay: 0.25, ease: motionEase }
                        }
                      />
                    </svg>
                    <span className="about-philosophy-stage__step">01 · First step</span>
                  </div>
                  <h4 className="about-philosophy-stage__title">Understand</h4>
                  <p className="about-philosophy-stage__body">
                    Sit with the problem before writing code—figuring out where the real friction
                    lives and what a simpler path actually looks like.
                  </p>
                </motion.article>

                {/* Stage 2: Build */}
                <motion.article
                  className="about-philosophy-stage"
                  data-about-interactive="stage-build"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={
                    philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.62, delay: 0.24, ease: motionEase }
                  }
                >
                  <div className="about-philosophy-stage__icon-wrap">
                    {/* Custom SVG: Structural blocks & drafting arc coming into alignment */}
                    <svg
                      width="56"
                      height="44"
                      viewBox="0 0 56 44"
                      fill="none"
                      aria-hidden="true"
                      className="about-philosophy-stage__svg"
                    >
                      <rect
                        x="6"
                        y="16"
                        width="18"
                        height="18"
                        rx="4"
                        stroke="rgba(245, 242, 234, 0.45)"
                        strokeWidth="1.6"
                      />
                      <motion.rect
                        x="26"
                        y="10"
                        width="22"
                        height="24"
                        rx="5"
                        stroke="#7CE2BC"
                        strokeWidth="2"
                        initial={prefersReducedMotion ? false : { pathLength: 0 }}
                        animate={philosophyInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.85, delay: 0.4, ease: motionEase }
                        }
                      />
                      <circle cx="37" cy="22" r="2.5" fill="#7CE2BC" />
                    </svg>
                    <span className="about-philosophy-stage__step">02 · Second step</span>
                  </div>
                  <h4 className="about-philosophy-stage__title">Build</h4>
                  <p className="about-philosophy-stage__body">
                    Turn the idea into working software—whether that means a clean web interface, a
                    backend workflow or a focused AI feature that does one job well.
                  </p>
                </motion.article>

                {/* Stage 3: Refine */}
                <motion.article
                  className="about-philosophy-stage"
                  data-about-interactive="stage-refine"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={
                    philosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.62, delay: 0.36, ease: motionEase }
                  }
                >
                  <div className="about-philosophy-stage__icon-wrap">
                    {/* Custom SVG: Rough signal smoothing into a clean, calibrated curve */}
                    <svg
                      width="56"
                      height="44"
                      viewBox="0 0 56 44"
                      fill="none"
                      aria-hidden="true"
                      className="about-philosophy-stage__svg"
                    >
                      <path
                        d="M5 29L13 15L20 31L27 17"
                        stroke="rgba(245, 242, 234, 0.35)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.path
                        d="M25 22C32 12 42 12 50 22"
                        stroke="#7CE2BC"
                        strokeWidth="2.1"
                        strokeLinecap="round"
                        initial={prefersReducedMotion ? false : { pathLength: 0 }}
                        animate={philosophyInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.85, delay: 0.55, ease: motionEase }
                        }
                      />
                      <circle cx="50" cy="22" r="2.6" fill="#7CE2BC" />
                    </svg>
                    <span className="about-philosophy-stage__step">03 · Third step</span>
                  </div>
                  <h4 className="about-philosophy-stage__title">Refine</h4>
                  <p className="about-philosophy-stage__body">
                    Test against real use, fix the rough edges where people get stuck, and strip
                    away anything that doesn&apos;t need to be there.
                  </p>
                </motion.article>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
