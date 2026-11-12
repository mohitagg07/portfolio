"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "./useInView";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Story() {
  const [sectionRef, sectionSeen] = useInView<HTMLElement>(0.08);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: reduceMotion || sectionSeen ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.65, delay, ease: EASE },
  });

  const photoReveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18, rotate: -1.5 },
    whileInView: { opacity: 1, y: 0, rotate: 0 },
    viewport: { once: true, amount: 0.24 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.68, delay, ease: EASE },
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
              I’m drawn to the parts of a project that need a bit of untangling: a slow process,
              scattered information, or an idea that hasn’t quite become a product yet.
            </p>
            <p>
              I’ve worked on web apps, automation and projects like <strong>MindCare</strong> and
              <strong> LegalMind AI</strong>. I enjoy making a first version, seeing where it falls
              short, and making the next one better.
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

        <motion.section
          className="about-v5-approach"
          aria-labelledby="about-approach-title"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.72, ease: EASE }}
        >
          <div className="about-v5-chapter-heading">
            <p className="about-v5-kicker">02 <span>/</span> THE WAY I THINK</p>
            <div>
              <h3 id="about-approach-title">Good work starts before the first line of code.</h3>
              <p>
                I like understanding what is actually getting in the way, then finding a clear,
                useful way through it. The details matter, but so does knowing which details
                don’t need to be there.
              </p>
            </div>
          </div>

          <div className="about-v5-approach-list">
            <article>
              <span className="about-v5-number">01</span>
              <div>
                <h4>Understand the problem.</h4>
                <p>Look past the request and get to what someone really needs.</p>
              </div>
            </article>
            <article>
              <span className="about-v5-number">02</span>
              <div>
                <h4>Make it useful.</h4>
                <p>Build something clear, practical and dependable in everyday use.</p>
              </div>
            </article>
            <article>
              <span className="about-v5-number">03</span>
              <div>
                <h4>Keep making it better.</h4>
                <p>Pay attention to what feels awkward, then refine without adding noise.</p>
              </div>
            </article>
          </div>

          <blockquote className="about-v5-note">
            <span className="about-v5-note__eyebrow">A THOUGHT I COME BACK TO</span>
            <p>The hard part should stay behind the screen.</p>
            <cite>— Mohit</cite>
          </blockquote>
        </motion.section>

        <motion.section
          className="about-v5-beyond"
          aria-labelledby="about-beyond-title"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.72, ease: EASE }}
        >
          <div className="about-v5-beyond-heading">
            <div>
              <p className="about-v5-kicker">03 <span>/</span> BEYOND THE SCREEN</p>
              <h3 id="about-beyond-title">Some things are better shared offline.</h3>
            </div>
            <p>
              New places, familiar faces, and the moments in between. A little distance from
              the screen is often the best way to return with a fresh perspective.
            </p>
          </div>

          <div className="about-v5-memory-grid">
            <motion.figure
              className="about-v5-memory-card about-v5-memory-card--mountain"
              data-about-interactive="memory-mountain"
              {...photoReveal(0.04)}
              whileHover={reduceMotion ? undefined : { y: -7, rotate: -0.6, scale: 1.012 }}
            >
              <span className="about-v5-memory-card__tape" aria-hidden="true" />
              <div className="about-v5-memory-card__image">
                <Image
                  src="/about/mountain-memory.jpg"
                  alt="A quiet mountain view shared with someone close"
                  fill
                  sizes="(max-width: 760px) 86vw, (max-width: 1200px) 42vw, 520px"
                  className="object-cover"
                  style={{ objectPosition: "center 72%" }}
                  quality={88}
                />
              </div>
              <figcaption>
                <small>AWAY FROM THE DESK</small>
                <strong>A view worth the climb.</strong>
              </figcaption>
            </motion.figure>

            <motion.figure
              className="about-v5-memory-card about-v5-memory-card--friends"
              data-about-interactive="memory-friends"
              {...photoReveal(0.16)}
              whileHover={reduceMotion ? undefined : { y: -7, rotate: 0.5, scale: 1.012 }}
            >
              <span className="about-v5-memory-card__tape" aria-hidden="true" />
              <div className="about-v5-memory-card__image">
                <Image
                  src="/about/friends-memory.png"
                  alt="Mohit sharing a moment with friends at an outdoor gathering"
                  fill
                  sizes="(max-width: 760px) 86vw, (max-width: 1200px) 42vw, 520px"
                  className="object-cover"
                  style={{ objectPosition: "center 48%" }}
                  quality={88}
                />
              </div>
              <figcaption>
                <small>GOOD COMPANY</small>
                <strong>Better with good people.</strong>
              </figcaption>
            </motion.figure>
          </div>

          <p className="about-v5-beyond-signoff">Not everything worth remembering happens at a desk.</p>
        </motion.section>

        <motion.div
          className="about-v5-next"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.62, ease: EASE }}
        >
          <div>
            <p className="about-v5-kicker">04 <span>/</span> WHAT’S NEXT</p>
            <h3>Curious about what I make?</h3>
            <p>A closer look at the ideas, projects and experiments I’ve been working on.</p>
          </div>
          <a href="#work" className="about-v5-next-link">
            Explore selected work <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
