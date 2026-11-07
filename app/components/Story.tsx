"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "./useInView";

const EASE = [0.16, 1, 0.3, 1] as const;

const milestones = [
  {
    period: "Education",
    title: "VIT Chennai",
    detail: "B.Tech in Computer Science, with a focus on AI & Machine Learning.",
  },
  {
    period: "Aug – Dec 2023",
    title: "Berger Paints",
    detail: "An internship that gave me an early look at how software and data support everyday business work.",
  },
  {
    period: "Independent builds",
    title: "MindCare & data tools",
    detail: "Exploring product ideas, user-controlled memory, data collection and practical automation.",
  },
] as const;

export default function Story() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>(0.08);
  const [approachRef, approachInView] = useInView<HTMLDivElement>(0.12);
  const reduceMotion = useReducedMotion();

  return (
    <div className="about-scroll-stage">
      <section
        ref={sectionRef}
        id="about"
        aria-labelledby="about-title"
        className="about-v2-section"
      >
        <div className="about-v2-container">
          <header className="about-v2-masthead">
            <div className="about-v2-masthead__label">
              <span className="about-v2-masthead__index">02</span>
              <span>ABOUT ME</span>
            </div>
            <span className="about-v2-masthead__location">
              A little about the person behind the builds · Jammu, India
            </span>
          </header>

          <div className="about-v2-intro">
            <motion.div
              className="about-v2-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.72, ease: EASE }}
            >
              <p className="about-v2-eyebrow">THE SHORT VERSION</p>
              <h2 id="about-title" className="about-v2-title">
                I keep asking,
                <span>Can this be simpler?</span>
              </h2>

              <div className="about-v2-biography">
                <p className="about-v2-greeting">Hey, I&apos;m Mohit.</p>
                <p>
                  I studied Computer Science at <strong>VIT Chennai</strong>, specialising in AI
                  and Machine Learning. What I enjoy most is not collecting technologies; it is
                  understanding why something is difficult and finding a better way to make it work.
                </p>
                <p>
                  That curiosity has taken me through web development, backend systems,
                  automation and AI-powered projects. I have explored ideas like <strong>MindCare</strong>
                  and a business-data collection pipeline, each teaching me something different
                  about building useful software.
                </p>
                <p className="about-v2-signoff">
                  I like getting into the details, learning by trying, and making the next version
                  a little better.
                </p>
              </div>

              <div className="about-v2-interests" aria-label="Areas of interest">
                <span>Usually exploring</span>
                <ul>
                  <li>Web products</li>
                  <li>Automation</li>
                  <li>Practical AI</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="about-v2-visual"
              data-about-portrait="true"
              data-about-interactive="portrait"
              initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: 1.5 }}
              animate={sectionInView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 28, rotate: 1.5 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.12, ease: EASE }}
            >
              <span className="about-v2-visual__wash" aria-hidden="true" />
              <figure className="about-v2-photo">
                <Image
                  src="/assets/mohit-story.jpg"
                  alt="Mohit outdoors in Jammu"
                  fill
                  priority={false}
                  sizes="(max-width: 900px) 86vw, 42vw"
                  quality={86}
                  className="about-v2-photo__image"
                />
                <span className="about-v2-photo__edge" aria-hidden="true" />
                <figcaption className="about-v2-photo__caption">
                  <span className="about-v2-photo__caption-dot" />
                  A moment away from the screen
                </figcaption>
              </figure>

              <div className="about-v2-note about-v2-note--top">
                <span className="about-v2-note__small">BASED IN</span>
                <strong>Jammu, India</strong>
              </div>

              <div className="about-v2-note about-v2-note--bottom">
                <span className="about-v2-note__scribble" aria-hidden="true">↗</span>
                <span>Still curious.<br />Still building.</span>
              </div>
            </motion.div>
          </div>

          <section className="about-v2-journey" aria-labelledby="about-journey-title">
            <div className="about-v2-section-heading">
              <div>
                <p className="about-v2-eyebrow">A FEW CHAPTERS</p>
                <h3 id="about-journey-title">The path so far<span>.</span></h3>
              </div>
              <p>Not a complete timeline—just a few experiences that shaped what I like to build.</p>
            </div>

            <ol className="about-v2-milestones">
              {milestones.map((item, index) => (
                <li className="about-v2-milestone" key={item.title}>
                  <span className="about-v2-milestone__number">0{index + 1}</span>
                  <div className="about-v2-milestone__content">
                    <span className="about-v2-milestone__period">{item.period}</span>
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section
            ref={approachRef}
            className="about-v2-approach"
            aria-labelledby="about-approach-title"
          >
            <div className="about-v2-approach__heading">
              <p className="about-v2-eyebrow">HOW I LIKE TO WORK</p>
              <h3 id="about-approach-title">
                Understand. <em>Build.</em> Refine.
              </h3>
            </div>
            <div className="about-v2-steps">
              {[
                {
                  number: "01",
                  title: "Understand first",
                  text: "Find the real friction before reaching for a tool or framework.",
                },
                {
                  number: "02",
                  title: "Build something useful",
                  text: "Choose a practical approach and turn the idea into something people can use.",
                },
                {
                  number: "03",
                  title: "Keep improving",
                  text: "Test it, learn from what breaks and make the experience better.",
                },
              ].map((step, index) => (
                <motion.article
                  className="about-v2-step"
                  data-about-interactive={`step-${index + 1}`}
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={approachInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.58, delay: index * 0.1, ease: EASE }}
                >
                  <span className="about-v2-step__number">{step.number}</span>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
