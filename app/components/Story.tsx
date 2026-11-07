"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "./useInView";

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones = [
  {
    period: "THE FOUNDATIONS",
    title: "VIT Chennai",
    detail: "Computer Science (AI & Machine Learning). Learning how software works, not just how to use a framework.",
    interaction: "milestone-vit",
  },
  {
    period: "A FIRST LOOK AT INDUSTRY",
    title: "Berger Paints",
    detail: "Internship · August–December 2023. A chance to see how day-to-day business work and technology meet.",
    interaction: "milestone-berger",
  },
  {
    period: "LEARNING BY BUILDING",
    title: "Independent projects",
    detail: "MindCare, LegalMind AI, business-data enrichment and automation experiments.",
    interaction: "milestone-mindcare",
  },
] as const;

const principles = [
  {
    number: "01",
    title: "Start with the real problem",
    text: "Understand where the friction is before choosing a tool, model or framework.",
    interaction: "stage-understand",
  },
  {
    number: "02",
    title: "Make something useful",
    text: "Build the simplest version that genuinely helps someone get something done.",
    interaction: "stage-build",
  },
  {
    number: "03",
    title: "Care about the details",
    text: "Test it, notice what feels awkward, and keep refining until it works naturally.",
    interaction: "stage-refine",
  },
] as const;

export default function Story() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>(0.08);
  const [chaptersRef, chaptersInView] = useInView<HTMLElement>(0.12);
  const [principlesRef, principlesInView] = useInView<HTMLElement>(0.12);
  const reduceMotion = useReducedMotion();

  return (
    <div className="about-scroll-stage">
      <section
        ref={sectionRef}
        id="about"
        aria-labelledby="about-title"
        className="about-v3-section"
      >
        <div className="about-v3-intro">
          <div className="about-v3-shell">
            <header className="about-v3-masthead">
              <div className="about-v3-masthead__left">
                <span className="about-v3-index">02</span>
                <span>THE PERSON BEHIND THE BUILDS</span>
              </div>
              <span className="about-v3-masthead__right">JAMMU, INDIA <span aria-hidden="true">↗</span></span>
            </header>

            <div className="about-v3-spread">
              <motion.div
                className="about-v3-copy"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.72, delay: 0.04, ease: EASE }}
              >
                <p className="about-v3-kicker">A QUESTION I COME BACK TO</p>
                <h2 id="about-title" className="about-v3-title">
                  I keep asking,
                  <span>Can this be simpler?</span>
                </h2>

                <div className="about-v3-bio">
                  <p className="about-v3-greeting">Hey, I&apos;m Mohit.</p>
                  <p>
                    I studied Computer Science (AI &amp; Machine Learning) at <strong>VIT Chennai</strong>.
                    I like the part of building that happens before the code: understanding what is
                    frustrating, what is missing, and what would make an experience easier.
                  </p>
                  <p>
                    That curiosity has taken me through web development, backend systems,
                    automation and AI-powered projects. I&apos;ve explored <strong>MindCare</strong>,
                    <strong> LegalMind AI</strong> and business-data enrichment tools — each with a
                    different problem to untangle.
                  </p>
                  <p className="about-v3-bio__last">
                    Not every problem needs AI or a complicated stack. I enjoy finding the right
                    tool, getting the details right, and making something people can actually use.
                  </p>
                </div>

                <div className="about-v3-interests">
                  <span className="about-v3-interests__label">I KEEP EXPLORING</span>
                  <div className="about-v3-interest-list">
                    <span>Web products</span><i aria-hidden="true" />
                    <span>Automation</span><i aria-hidden="true" />
                    <span>Practical AI</span>
                  </div>
                </div>

                <a className="about-v3-work-link" href="#work">
                  A few things I&apos;ve built <span aria-hidden="true">↗</span>
                </a>
              </motion.div>

              <motion.div
                className="about-v3-visual"
                data-about-interactive="portrait"
                initial={reduceMotion ? false : { opacity: 0, y: 26, rotate: 1.5 }}
                animate={sectionInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 26, rotate: 1.5 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.14, ease: EASE }}
              >
                <span className="about-v3-visual__shape" aria-hidden="true" />
                <span className="about-v3-visual__corner-label">A LITTLE TIME AWAY FROM THE SCREEN</span>

                <figure
                  className="about-v3-photo"
                  data-about-portrait="true"
                  data-about-interactive="portrait"
                >
                  <Image
                    src="/assets/mohit-story.jpg"
                    alt="Mohit outdoors in Jammu"
                    fill
                    sizes="(max-width: 760px) 88vw, (max-width: 1100px) 48vw, 520px"
                    quality={88}
                    className="about-v3-photo__image"
                  />
                  <figcaption className="about-v3-photo__caption">
                    <span className="about-v3-photo__caption-mark" aria-hidden="true">✳</span>
                    Jammu, India
                  </figcaption>
                </figure>

                <a
                  className="about-v3-project-peek"
                  href="#work"
                  data-about-interactive="mindcare-artifact"
                  aria-label="Explore MindCare in the work section"
                >
                  <div className="about-v3-project-peek__top">
                    <span>ON THE DESK</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <div className="about-v3-project-peek__image">
                    <Image
                      src="/projects/project-2.png"
                      alt="MindCare project interface preview"
                      fill
                      sizes="260px"
                      quality={82}
                      className="about-v3-project-peek__img"
                    />
                  </div>
                  <div className="about-v3-project-peek__bottom">
                    <strong>MindCare</strong>
                    <span>Product exploration</span>
                  </div>
                </a>

                <svg className="about-v3-doodle" viewBox="0 0 110 76" fill="none" aria-hidden="true">
                  <path d="M4 63C25 36 59 17 98 14M98 14L86 7M98 14L91 27" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="about-v3-handnote">one idea at a time</span>
              </motion.div>
            </div>
          </div>
        </div>

        <section
          ref={chaptersRef}
          className="about-v3-chapters"
          aria-labelledby="about-chapters-title"
        >
          <div className="about-v3-lower-shell">
            <motion.div
              className="about-v3-chapters__heading"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={chaptersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.68, ease: EASE }}
            >
              <div>
                <p className="about-v3-paper-kicker">A FEW CHAPTERS</p>
                <h3 id="about-chapters-title">The route <em>so far.</em></h3>
              </div>
              <p className="about-v3-chapters__aside">
                A few places and projects that have shaped how I think about building.
              </p>
            </motion.div>

            <ol className="about-v3-timeline">
              {milestones.map((item, index) => (
                <motion.li
                  className="about-v3-milestone"
                  data-about-interactive={item.interaction}
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={chaptersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.62, delay: 0.1 + index * 0.12, ease: EASE }}
                >
                  <span className="about-v3-milestone__number">0{index + 1}</span>
                  <div className="about-v3-milestone__body">
                    <span className="about-v3-milestone__period">{item.period}</span>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <section
              ref={principlesRef}
              className="about-v3-practice"
              aria-labelledby="about-practice-title"
            >
              <div className="about-v3-practice__intro">
                <p className="about-v3-paper-kicker">A SMALL RULE I COME BACK TO</p>
                <h3 id="about-practice-title">
                  Make it useful <em>before making it clever.</em>
                </h3>
              </div>

              <div className="about-v3-principles">
                {principles.map((item, index) => (
                  <motion.article
                    className="about-v3-principle"
                    data-about-interactive={item.interaction}
                    key={item.number}
                    initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                    animate={principlesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.58, delay: index * 0.1, ease: EASE }}
                  >
                    <span className="about-v3-principle__number">{item.number}</span>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            <footer className="about-v3-footer">
              <span>STILL CURIOUS. STILL BUILDING.</span>
              <a href="#work">See what came out of it <span aria-hidden="true">↗</span></a>
            </footer>
          </div>
        </section>
      </section>
    </div>
  );
}
