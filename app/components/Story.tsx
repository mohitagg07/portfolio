"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "./useInView";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Story() {
  const [sectionRef, sectionSeen] = useInView<HTMLElement>(0.08);
  const [factsRef, factsSeen] = useInView<HTMLDivElement>(0.12);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: reduceMotion || sectionSeen ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.65, delay, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="about-v4-section relative isolate scroll-mt-24"
    >
      <div className="about-v4-inner mx-auto w-full">
        <div className="about-v4-masthead">
          <p className="about-v4-masthead__title">About Me <span aria-hidden="true" /></p>
          <p className="about-v4-masthead__note">A little more than the work</p>
        </div>
        <div className="about-v4-layout">
          <motion.div className="about-v4-collage" {...reveal(0.08)}>
            <span className="about-v4-paper-shape" aria-hidden="true" />

            <div className="about-v4-jammu-tag" aria-label="Home base: Jammu, India">
              <span>HOME BASE</span>
              <strong>Jammu, India</strong>
            </div>

            <motion.figure
              data-about-portrait="true"
              data-about-interactive="portrait"
              className="about-v4-photo about-v4-photo--main"
              initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: -4 }}
              animate={reduceMotion || sectionSeen ? { opacity: 1, y: 0, rotate: -1.6 } : { opacity: 0, y: 24, rotate: -4 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.78, delay: 0.12, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -7, rotate: -0.2, scale: 1.012 }}
            >
              <Image
                src="/about/about-main.webp"
                alt="Mohit outdoors in a black shirt, among the greenery"
                fill
                sizes="(max-width: 760px) 76vw, (max-width: 1200px) 45vw, 620px"
                quality={90}
                className="about-v4-photo-image object-cover object-center"
              />
            </motion.figure>

            <motion.figure
              className="about-v4-photo about-v4-photo--selfie"
              initial={reduceMotion ? false : { opacity: 0, x: 18, rotate: 8 }}
              animate={reduceMotion || sectionSeen ? { opacity: 1, x: 0, rotate: 4 } : { opacity: 0, x: 18, rotate: 8 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.68, delay: 0.3, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -7, rotate: 1.5, scale: 1.025 }}
            >
              <Image
                src="/about/about-selfie.webp"
                alt="Mohit in a black leather jacket"
                fill
                sizes="(max-width: 760px) 31vw, 230px"
                quality={90}
                className="about-v4-photo-image object-cover object-center"
              />
            </motion.figure>

            <motion.figure
              className="about-v4-photo about-v4-photo--waterfall"
              initial={reduceMotion ? false : { opacity: 0, y: 20, rotate: 6 }}
              animate={reduceMotion || sectionSeen ? { opacity: 1, y: 0, rotate: 2.5 } : { opacity: 0, y: 20, rotate: 6 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.72, delay: 0.44, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -7, rotate: 0.5, scale: 1.025 }}
            >
              <Image
                src="/about/about-waterfall.webp"
                alt="Mohit visiting a waterfall"
                fill
                sizes="(max-width: 760px) 36vw, 260px"
                quality={90}
                className="about-v4-photo-image object-cover object-[50%_66%]"
              />
            </motion.figure>

            <span className="about-v4-tape about-v4-tape--main" aria-hidden="true" />
            <span className="about-v4-tape about-v4-tape--selfie" aria-hidden="true" />
            <span className="about-v4-name-tag">Mohit</span>
            <span className="about-v4-handnote">a little time away from the screen</span>
          </motion.div>

          <motion.div className="about-v4-copy-title" {...reveal(0.16)}>
            <p className="about-v4-eyebrow">HEY, I’M MOHIT</p>
            <h2 id="about-title" className="about-v4-title">
              <span>I like figuring</span>
              <span>things out.</span>
              <em>And making them work.</em>
            </h2>
          </motion.div>

          <motion.div className="about-v4-copy-body" {...reveal(0.28)}>
            <p>
              I studied Computer Science (AI &amp; Machine Learning) at <strong>VIT Chennai</strong>.
              I like getting to the bottom of a problem, trying ideas out, and turning the useful
              ones into software people can actually use.
            </p>
            <p>
              From web apps and automation to <strong>MindCare</strong> and <strong>LegalMind AI</strong>,
              I enjoy making ideas real, testing what works, and getting the small details right.
            </p>

            <div className="about-v4-interests" aria-label="What I enjoy">
              <span>Making useful things.</span>
              <span>Finding simpler ways to work.</span>
              <span>Exploring AI when it helps.</span>
            </div>

            <a href="#work" className="about-v4-link">
              A few things I’ve been working on <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={factsRef}
          className="about-v4-facts"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion || factsSeen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.68, ease: EASE }}
        >
          <div className="about-v4-fact">
            <span>WHERE I STUDIED</span>
            <strong>VIT Chennai</strong>
            <small>Computer Science · AI &amp; ML</small>
          </div>
          <div className="about-v4-fact">
            <span>FIRST INTERNSHIP</span>
            <strong>Berger Paints</strong>
            <small>August to December 2023</small>
          </div>
          <div className="about-v4-fact">
            <span>THINGS I’VE BUILT</span>
            <strong>MindCare · LegalMind AI</strong>
            <small>Business Scraper and automation tools</small>
          </div>
        </motion.div>

        <p className="about-v4-signoff">Still curious. Still making things.</p>
      </div>
    </section>
  );
}
