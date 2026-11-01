"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

const PATH = [
  ["2025", "VIT Chennai", "B.Tech in Computer Science (AI & ML). Focused on generative AI, full-stack systems, and computer vision."],
  ["Internship", "Berger Paints", "Engineered 8+ reusable React components and embedded live ML model analytics visualizing 10,000+ records, cutting reporting turnaround by 25%."],
  ["Now", "Relu Consultancy", "Developing production automation tools, LLM workflows, and API bridges that eliminate manual repetitive work."],
];

const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;
const motionEase = [0.16, 1, 0.3, 1] as const;

export default function Story() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [sectionRef, active] = useInView<HTMLElement>(0.03);
  const [topRef, topIn] = useInView<HTMLDivElement>(0.2);
  const prefersReducedMotion = useReducedMotion();

  // This progress starts as the hero is leaving and completes as About reaches the top.
  const { scrollYProgress: incomingProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "start start"],
  });
  const seamOpacity = useTransform(incomingProgress, [0, 0.45, 1], [0, 0.75, 1]);
  const seamScale = useTransform(incomingProgress, [0, 1], [0.18, 1]);
  const portraitSettle = useTransform(incomingProgress, [0, 1], [1.045, 1]);

  const portraitPointerX = useMotionValue(0);
  const portraitPointerY = useMotionValue(0);
  const portraitRotateX = useSpring(
    useTransform(portraitPointerY, [-0.5, 0.5], [3.5, -3.5]),
    { stiffness: 170, damping: 24, mass: 0.45 }
  );
  const portraitRotateY = useSpring(
    useTransform(portraitPointerX, [-0.5, 0.5], [-4, 4]),
    { stiffness: 170, damping: 24, mass: 0.45 }
  );

  const handlePortraitPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));

    portraitPointerX.set(x - 0.5);
    portraitPointerY.set(y - 0.5);
    event.currentTarget.style.setProperty("--story-light-x", x * 100 + "%");
    event.currentTarget.style.setProperty("--story-light-y", y * 100 + "%");
    event.currentTarget.dataset.tilting = "true";
  };

  const resetPortraitPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    portraitPointerX.set(0);
    portraitPointerY.set(0);
    event.currentTarget.dataset.tilting = "false";
  };

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
        className={"about-sticky-panel " + (active ? "is-active" : "")}
      >
        <motion.div
          className="about-entry-seam"
          aria-hidden="true"
          style={{
            opacity: prefersReducedMotion ? 0 : seamOpacity,
            scaleX: prefersReducedMotion ? 0 : seamScale,
          }}
        />
        <motion.div
          className="about-scroll-shadow"
          aria-hidden="true"
          style={{ opacity: prefersReducedMotion ? 0 : shadowOpacity }}
        />
        <ScrollReveal className="about-reveal-wrap">
          <div ref={topRef} className={"section-wrap about-grid " + (topIn ? "is-in" : "")}>
            <div className="story-enter max-w-xl">
              <h2 className="section-title story-title" aria-label="I make complex things feel simple.">
                {"I make complex things feel simple.".split(" ").map((word, i, words) => (
                  <Fragment key={i + "-" + word}>
                    <span className="rise-word" style={idx(i)} aria-hidden="true">
                      <motion.span
                        initial={prefersReducedMotion ? false : { y: "115%", opacity: 0 }}
                        animate={topIn ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.72, delay: 0.1 + i * 0.045, ease: motionEase }}
                      >
                        {word}
                      </motion.span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </h2>
              <div className="story-copy mt-6 space-y-4">
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={topIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.62, delay: 0.34, ease: motionEase }}
                >
                  I live in Jammu and studied computer science in Chennai. Every project I pick has the same shape: something genuinely useful, buried under too much complexity.
                </motion.p>
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={topIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.62, delay: 0.45, ease: motionEase }}
                >
                  At work, I build tools that handle the boring parts for clients, like collecting information from websites, connecting apps, and answering routine questions automatically.
                </motion.p>
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={topIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.62, delay: 0.56, ease: motionEase }}
                >
                  On the side, I make my own: a companion for heavy days, a reader that explains contracts like a friend would, and a coach that learns how you train. I make videos about it on YouTube too.
                </motion.p>
              </div>
            </div>

            <div className="story-enter story-enter--right">
              <div className="story-photo mx-auto w-full">
                <motion.div
                  className="story-photo__frame relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
                  style={{
                    scale: prefersReducedMotion ? 1 : portraitSettle,
                    rotateX: prefersReducedMotion ? 0 : portraitRotateX,
                    rotateY: prefersReducedMotion ? 0 : portraitRotateY,
                    transformPerspective: 1100,
                    transformStyle: "preserve-3d",
                  }}
                  onPointerMove={handlePortraitPointerMove}
                  onPointerLeave={resetPortraitPointer}
                >
                  <Image
                    src="/assets/mohit-story.jpg"
                    alt="Mohit seated outdoors in a black suit"
                    fill
                    sizes="(max-width: 768px) 80vw, 352px"
                    quality={75}
                    className="story-portrait object-cover"
                  />
                  <span className="story-photo__label"><i /> Jammu, India</span>
                </motion.div>
              </div>
              <ol className="vline pl-8">
                <motion.span
                  className="vline__motion-track"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { scaleY: 0 }}
                  animate={topIn ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.32, ease: motionEase }}
                />
                {PATH.map(([when, where, what], i) => (
                  <motion.li
                    key={where}
                    className="node relative"
                    style={idx(i)}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -14 }}
                    animate={topIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.62, delay: 0.42 + i * 0.12, ease: motionEase }}
                  >
                    <span className="absolute -left-[36px] top-2 h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                    <p className="text-sm text-[var(--accent)]">{when}</p>
                    <p className="font-semibold">{where}</p>
                    <p className="text-sm text-[var(--fg-muted)]">{what}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
