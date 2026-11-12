"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "./useInView";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Story() {
  const [sectionRef, sectionSeen] = useInView<HTMLElement>(0.08);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: reduceMotion || sectionSeen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.62, delay, ease: EASE },
  });

  const inViewReveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.14 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.68, ease: EASE },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="about-fieldnotes relative isolate scroll-mt-24"
    >
      <div className="about-fieldnotes__inner mx-auto w-full">
        <header className="about-fieldnotes__masthead">
          <div className="about-fieldnotes__masthead-title">
            <span>About Me</span>
            <i aria-hidden="true" />
          </div>
          <p>01 / JAMMU, INDIA</p>
        </header>

        <div className="about-fieldnotes__intro">
          <motion.div className="about-fieldnotes__gallery" {...reveal(0.06)}>
            <motion.figure
              data-about-portrait="true"
              data-about-interactive="portrait"
              className="about-fieldnotes__photo about-fieldnotes__photo--main"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion || sectionSeen ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.72, delay: 0.08, ease: EASE }}
            >
              <Image
                src="/about/about-main.webp"
                alt="Mohit outdoors in a black shirt, among the greenery"
                fill
                sizes="(max-width: 760px) 61vw, (max-width: 1100px) 43vw, 620px"
                quality={88}
                className="about-fieldnotes__photo-image"
              />
            </motion.figure>

            <motion.figure
              className="about-fieldnotes__photo about-fieldnotes__photo--selfie"
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={reduceMotion || sectionSeen ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.62, delay: 0.2, ease: EASE }}
            >
              <Image
                src="/about/about-selfie.webp"
                alt="Mohit in a black leather jacket"
                fill
                sizes="(max-width: 760px) 30vw, 240px"
                quality={88}
                className="about-fieldnotes__photo-image"
              />
            </motion.figure>

            <motion.figure
              className="about-fieldnotes__photo about-fieldnotes__photo--waterfall"
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={reduceMotion || sectionSeen ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.62, delay: 0.3, ease: EASE }}
            >
              <Image
                src="/about/about-waterfall.webp"
                alt="Mohit visiting a waterfall"
                fill
                sizes="(max-width: 760px) 30vw, 240px"
                quality={88}
                className="about-fieldnotes__photo-image about-fieldnotes__photo-image--waterfall"
              />
            </motion.figure>

            <span className="about-fieldnotes__gallery-index" aria-hidden="true">01—03</span>
          </motion.div>

          <motion.div className="about-fieldnotes__copy" {...reveal(0.14)}>
            <p className="about-fieldnotes__eyebrow">
              SOFTWARE ENGINEER <span aria-hidden="true">·</span> AI &amp; AUTOMATION
            </p>

            <h2 id="about-title" className="about-fieldnotes__title">
              <span>I like figuring</span>
              <span>things out.</span>
              <em>And making them work.</em>
            </h2>

            <div className="about-fieldnotes__bio">
              <p>
                I studied Computer Science (AI &amp; Machine Learning) at <strong>VIT Chennai</strong>.
                Most of my work starts with something that isn’t working as well as it should: a
                manual process, scattered information, or a complex workflow. I look for where
                software, automation or AI can turn that friction into something useful.
              </p>
              <p>
                I build, test, notice what breaks, and keep improving until the solution feels
                clear to use.
              </p>
            </div>

            <div className="about-fieldnotes__focus" aria-label="Areas I work across">
              <span>AI-POWERED PRODUCTS</span>
              <span>WORKFLOW AUTOMATION</span>
              <span>FULL-STACK SYSTEMS</span>
            </div>
          </motion.div>
        </div>

        <motion.section
          className="about-fieldnotes__chapter about-fieldnotes__approach"
          aria-labelledby="about-approach-title"
          {...inViewReveal}
        >
          <div className="about-fieldnotes__chapter-heading">
            <p className="about-fieldnotes__kicker">02 <span>/</span> HOW I APPROACH A BUILD</p>
            <h3 id="about-approach-title">From messy inputs to something people can use.</h3>
            <p className="about-fieldnotes__chapter-intro">
              The work moves from understanding the friction to connecting the right tools,
              then refining what people actually use.
            </p>
          </div>

          <div className="about-fieldnotes__process" aria-label="My approach to building">
            <article className="about-fieldnotes__step">
              <span className="about-fieldnotes__step-number">01</span>
              <div>
                <h4>Find the friction.</h4>
                <p>Spot the repetitive step, unclear decision, or information gap.</p>
              </div>
            </article>
            <article className="about-fieldnotes__step">
              <span className="about-fieldnotes__step-number">02</span>
              <div>
                <h4>Connect the pieces.</h4>
                <p>Bring data, APIs and AI together where they make the workflow simpler.</p>
              </div>
            </article>
            <article className="about-fieldnotes__step">
              <span className="about-fieldnotes__step-number">03</span>
              <div>
                <h4>Make it dependable.</h4>
                <p>Refine the interface, test edge cases, and improve the next version.</p>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section
          className="about-fieldnotes__beyond"
          aria-labelledby="about-beyond-title"
          {...inViewReveal}
        >
          <div className="about-fieldnotes__beyond-copy">
            <p className="about-fieldnotes__kicker">03 <span>/</span> BEYOND THE SCREEN</p>
            <h3 id="about-beyond-title">Some things deserve to stay outside the workspace.</h3>
            <p>
              Time outdoors, a change of scene, and good people. That’s usually enough to come
              back with a clearer head.
            </p>
          </div>

          <div className="about-fieldnotes__memories">
            <motion.figure
              className="about-fieldnotes__memory"
              data-about-interactive="memory-mountain"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.64, delay: 0.04, ease: EASE }}
            >
              <div className="about-fieldnotes__memory-image">
                <Image
                  src="/about/mountain-memory.webp"
                  alt="Two people sitting in a grassy clearing, looking out toward the trees"
                  fill
                  sizes="(max-width: 760px) 44vw, (max-width: 1100px) 32vw, 420px"
                  quality={86}
                  className="about-fieldnotes__memory-photo about-fieldnotes__memory-photo--outdoors"
                />
              </div>
              <figcaption>
                <span>OFF THE CLOCK</span>
                <strong>A little time outdoors.</strong>
              </figcaption>
            </motion.figure>

            <motion.figure
              className="about-fieldnotes__memory about-fieldnotes__memory--friends"
              data-about-interactive="memory-friends"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.64, delay: 0.14, ease: EASE }}
            >
              <div className="about-fieldnotes__memory-image">
                <Image
                  src="/about/friends-memory.webp"
                  alt="Mohit sharing an outdoor moment with friends"
                  fill
                  sizes="(max-width: 760px) 44vw, (max-width: 1100px) 32vw, 420px"
                  quality={86}
                  className="about-fieldnotes__memory-photo about-fieldnotes__memory-photo--friends"
                />
              </div>
              <figcaption>
                <span>GOOD COMPANY</span>
                <strong>Better with good people.</strong>
              </figcaption>
            </motion.figure>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
