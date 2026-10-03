"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

const PATH = [
  ["2025", "VIT Chennai", "Finished my computer science degree, focused on AI."],
  ["Internship", "Berger Paints", "Taught a computer to learn from real company data."],
  ["Now", "Relu Consultancy", "Building tools that take repetitive work off clients' plates."],
];

const LEARNING = [
  ["Assistants that make decisions", "Not just answering, but planning the steps and using tools to get things done."],
  ["Teaching AI your own documents", "So it answers from your files instead of guessing."],
  ["Connecting everyday apps", "When this happens here, do that over there. No one has to remember."],
  ["Apps for your phone", "My fitness coach, VYRN, lives there and adapts to how you train."],
];

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Story() {
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [topRef, topIn] = useInView<HTMLDivElement>(0.2);
  const learningStageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: learningStageRef,
    offset: ["start start", "end start"],
  });
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.8]);

  return (
    <>
      <section ref={sectionRef} id="about" className={`section-spacer about-section ${active ? "is-active" : ""}`}>
        <ScrollReveal>
          <div ref={topRef} className={`section-wrap grid gap-16 md:grid-cols-[1.2fr_1fr] ${topIn ? "is-in" : ""}`}>
            <div className="story-enter max-w-xl">
              <h2 className="section-title story-title" aria-label="I make complex things feel simple.">
                {"I make complex things feel simple.".split(" ").map((w, i, words) => (
                  <Fragment key={`${i}-${w}`}>
                    <span className="rise-word" style={idx(i)} aria-hidden="true"><span>{w}</span></span>
                    {i < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h2>
              <div className="story-copy mt-6 space-y-4">
                <p>I live in Jammu and studied computer science in Chennai. Every project I pick has the same shape: something genuinely useful, buried under too much complexity.</p>
                <p>At work, I build tools that handle the boring parts for clients, like collecting information from websites, connecting apps, and answering routine questions automatically.</p>
                <p>On the side, I make my own: a companion for heavy days, a reader that explains contracts like a friend would, and a coach that learns how you train. I make videos about it on YouTube too.</p>
              </div>
            </div>

            <div className="story-enter story-enter--right space-y-10">
              <div className="story-photo mx-auto w-full max-w-[20rem]">
                <div className="story-photo__frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
                  <Image
                    src="/assets/mohit-story.jpg"
                    alt="Mohit seated outdoors in a black suit"
                    fill
                    sizes="(max-width: 768px) 80vw, 352px"
                    quality={75}
                    className="story-portrait object-cover"
                  />
                  <span className="story-photo__label"><i /> Jammu, India</span>
                </div>
              </div>
              <ol className="vline space-y-8 pl-8">
                {PATH.map(([when, where, what], i) => (
                  <li key={where} className="node relative" style={idx(i)}>
                    <span className="absolute -left-[36px] top-2 h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                    <p className="text-sm text-[var(--accent)]">{when}</p>
                    <p className="font-semibold">{where}</p>
                    <p className="text-sm text-[var(--fg-muted)]">{what}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <div ref={learningStageRef} className="learning-scroll-stage">
        <section
          id="learning"
          className="learning-sticky-panel sticky top-0 z-0 flex h-screen w-full flex-col justify-center overflow-hidden bg-[#0a0a0f]"
          aria-labelledby="learning-title"
        >
          <motion.div
            className="learning-shadow"
            aria-hidden="true"
            style={{ opacity: prefersReducedMotion ? 0 : shadowOpacity }}
          />
          <div className="section-wrap learning-sticky-content">
            <ScrollReveal>
              <h2 id="learning-title" className="learning-title">What I&apos;ve been getting good at lately</h2>
            </ScrollReveal>
            <dl className="learning-grid">
              {LEARNING.map(([title, text], i) => (
                <motion.div
                  key={title}
                  className="learning-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: 0.1 * i, duration: 0.5 }
                  }
                >
                  <dt>{title}</dt>
                  <dd>{text}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
