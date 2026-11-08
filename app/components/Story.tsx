"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "./useInView";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Story() {
  const [sectionRef, sectionSeen] = useInView<HTMLElement>(0.08);
  const [factsRef, factsSeen] = useInView<HTMLDivElement>(0.12);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: sectionSeen ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.72, delay, ease: EASE },
  });

  return (
    <div className="about-scroll-stage">
      <section
        ref={sectionRef}
        id="about"
        aria-labelledby="about-title"
        className="about-v4-section relative isolate overflow-hidden scroll-mt-24 text-[#f4eedf]"
      >
        <div className="about-v4-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-12 pt-28 sm:px-8 lg:px-14 lg:pb-16 lg:pt-32">
          <header className="about-v4-header flex items-center justify-between border-b border-white/15 pb-4">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-[#e9e0ce]">About Me</p>
            <p className="text-[11px] tracking-[0.12em] text-[#a9b8a9]">A LITTLE MORE THAN THE WORK</p>
          </header>

          <div className="grid items-center gap-9 pt-8 md:gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-14 lg:pt-10">
            <motion.div
              className="about-v4-collage relative mx-auto h-[410px] w-full max-w-[570px] sm:h-[500px] lg:h-[585px]"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={sectionSeen ? { opacity: 1 } : { opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.55 }}
            >
              <div className="about-v4-jammu-tag absolute left-[1%] top-[1%] z-30 flex -rotate-[7deg] flex-col justify-center px-5 py-2.5 sm:px-6 sm:py-3">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#6a735a]">Home base</span>
                <strong className="font-[var(--font-accent-face)] text-[24px] font-normal italic leading-none text-[#263d30] sm:text-[29px]">Jammu, India</strong>
              </div>

              <motion.figure
                data-about-portrait="true"
                data-about-interactive="portrait"
                className="about-v4-photo about-v4-photo--main group absolute left-[19%] top-[9%] z-20 h-[79%] w-[61%] -rotate-[3.5deg] cursor-pointer"
                initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: -8 }}
                animate={sectionSeen ? { opacity: 1, y: 0, rotate: -3.5 } : { opacity: 0, y: 28, rotate: -8 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.82, delay: 0.16, ease: EASE }}
                whileHover={reduceMotion ? undefined : { y: -9, rotate: 0, scale: 1.015 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              >
                <Image
                  src="/about/about-main.webp"
                  alt="Mohit outdoors in a black shirt"
                  fill
                  sizes="(max-width: 760px) 62vw, (max-width: 1100px) 34vw, 350px"
                  quality={88}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <span className="about-v4-photo-grain pointer-events-none absolute inset-0" aria-hidden="true" />
              </motion.figure>

              <motion.figure
                className="about-v4-photo about-v4-photo--selfie group absolute right-[1%] top-[12%] z-30 h-[39%] w-[29%] rotate-[5deg] cursor-pointer"
                initial={reduceMotion ? false : { opacity: 0, x: 24, rotate: 11 }}
                animate={sectionSeen ? { opacity: 1, x: 0, rotate: 5 } : { opacity: 0, x: 24, rotate: 11 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.76, delay: 0.38, ease: EASE }}
                whileHover={reduceMotion ? undefined : { y: -8, rotate: 1, scale: 1.035 }}
              >
                <Image
                  src="/about/about-selfie.webp"
                  alt="Mohit in a leather jacket"
                  fill
                  sizes="(max-width: 760px) 30vw, 170px"
                  quality={86}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </motion.figure>

              <motion.figure
                className="about-v4-photo about-v4-photo--waterfall group absolute bottom-[4%] left-[1%] z-30 h-[42%] w-[35%] -rotate-[5deg] cursor-pointer"
                initial={reduceMotion ? false : { opacity: 0, y: 25, rotate: -10 }}
                animate={sectionSeen ? { opacity: 1, y: 0, rotate: -5 } : { opacity: 0, y: 25, rotate: -10 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.54, ease: EASE }}
                whileHover={reduceMotion ? undefined : { y: -8, rotate: -1, scale: 1.035 }}
              >
                <Image
                  src="/about/about-waterfall.webp"
                  alt="Mohit visiting a waterfall"
                  fill
                  sizes="(max-width: 760px) 36vw, 200px"
                  quality={86}
                  className="object-cover object-[50%_66%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </motion.figure>

              <span className="about-v4-tape about-v4-tape--main pointer-events-none absolute left-[39%] top-[5%] z-40" aria-hidden="true" />
              <span className="about-v4-tape about-v4-tape--small pointer-events-none absolute right-[15%] top-[8%] z-40" aria-hidden="true" />
              <svg className="about-v4-scribble pointer-events-none absolute bottom-[1%] right-[8%] z-40" viewBox="0 0 120 50" fill="none" aria-hidden="true">
                <path d="M4 36C33 15 72 9 111 16M101 7L112 16L98 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="about-v4-handnote pointer-events-none absolute bottom-[0%] right-[20%] z-40">out for a change of scene</span>
            </motion.div>

            <motion.div className="about-v4-copy relative z-10 lg:pl-1" {...reveal(0.2)}>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b85b]">HEY, I’M MOHIT</p>
              <h2 id="about-title" className="about-v4-title">
                I like figuring
                <span>things out.</span>
                <em>And making them work.</em>
              </h2>

              <div className="mt-6 max-w-[540px] space-y-4 text-[15px] leading-[1.75] text-[#c9d2c8] sm:text-[16px]">
                <p>
                  I studied Computer Science (AI &amp; Machine Learning) at <strong>VIT Chennai</strong>.
                  I’ve always enjoyed understanding how things work, then finding a better way to do them.
                </p>
                <p>
                  That curiosity has taken me from web projects and automation to ideas like
                  <strong> MindCare</strong> and <strong>LegalMind AI</strong>. I like making ideas real,
                  trying them out, and getting the small details right.
                </p>
              </div>

              <div className="about-v4-interests mt-7 flex max-w-[550px] flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/15 pt-4 text-[13px] text-[#e9e5d8]">
                <span>Making ideas useful</span>
                <i aria-hidden="true" />
                <span>Taking the busywork out</span>
                <i aria-hidden="true" />
                <span>Exploring AI when it helps</span>
              </div>

              <a
                href="#work"
                className="about-v4-link mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[#8be0bd] transition-all duration-300 hover:gap-4 hover:text-[#c3f1d9]"
              >
                A few things I’ve been working on <span aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            ref={factsRef}
            className="about-v4-facts relative mt-11 grid grid-cols-2 gap-x-5 gap-y-5 px-6 py-7 sm:px-8 lg:mt-6 lg:grid-cols-3 lg:gap-0 lg:px-10 lg:py-8"
            initial={reduceMotion ? false : { opacity: 0, y: 20, rotate: -0.3 }}
            animate={factsSeen ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 20, rotate: -0.3 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.72, ease: EASE }}
          >
            <div className="about-v4-fact">
              <span>STUDIED AT</span>
              <strong>VIT Chennai</strong>
              <small>B.Tech · Computer Science (AI &amp; ML)</small>
            </div>
            <div className="about-v4-fact">
              <span>FIRST INTERNSHIP</span>
              <strong>Berger Paints</strong>
              <small>August to December 2023</small>
            </div>
            <div className="about-v4-fact col-span-2 lg:col-span-1">
              <span>THINGS I’VE BUILT</span>
              <strong>MindCare · LegalMind AI</strong>
              <small>Business Scraper and automation tools</small>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
