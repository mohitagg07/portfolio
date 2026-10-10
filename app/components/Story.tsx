"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

const PATH = [
  ["2025", "VIT Chennai", "B.Tech in Computer Science (AI & ML). Focused on generative AI, full-stack systems, and computer vision."],
  ["Internship", "Berger Paints", "Engineered 8+ reusable React components and embedded live ML model analytics visualizing 10,000+ records, cutting reporting turnaround by 25%."],
  ["Now", "Relu Consultancy", "Developing production automation tools, LLM workflows, and API bridges that eliminate manual repetitive work."],
];

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Story() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [topRef, topIn] = useInView<HTMLDivElement>(0.2);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  // During the first 60svh of the stage, About is fully visible.
  // Over the next 100svh, Work emerges over About while About darkens (0 -> 0.82).
  const shadowOpacity = useTransform(scrollYProgress, [60 / 260, 160 / 260], [0, 0.82]);

  return (
    <div ref={stageRef} className="about-scroll-stage">
      <section
        ref={sectionRef}
        id="about"
        className={`about-sticky-panel ${active ? "is-active" : ""}`}
      >
        <motion.div
          className="about-scroll-shadow"
          aria-hidden="true"
          style={{ opacity: prefersReducedMotion ? 0 : shadowOpacity }}
        />
        <ScrollReveal className="about-reveal-wrap">
          <div ref={topRef} className={`section-wrap about-grid ${topIn ? "is-in" : ""}`}>
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

            <div className="story-enter story-enter--right">
              <div className="story-photo mx-auto w-full">
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
              <ol className="vline pl-8">
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
    </div>
  );
}
