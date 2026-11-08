"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import HeroGreeting from "./HeroGreeting";
import HeroCanvas from "./HeroCanvas";

export default function HeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  // The hero hands its visual focus to About as the next sticky panel arrives.
  const artworkScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.075]);
  const artworkY = useTransform(scrollYProgress, [0, 0.5], [0, -22]);
  const artworkOpacity = useTransform(scrollYProgress, [0, 0.38, 0.5], [1, 0.88, 0.48]);
  const copyOpacity = useTransform(scrollYProgress, [0.2, 0.42, 0.5], [1, 0.55, 0]);
  const copyY = useTransform(scrollYProgress, [0.2, 0.5], [0, -30]);
  const scrollShadow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.68, 0.78]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={stageRef} className="hero-scroll-stage">
      <section id="home" className="hero-section hero-section--sticky relative flex items-center">
        <div className="hero-art" aria-hidden="true">
          <motion.div
            className="hero-art__scroll-media"
            style={{
              scale: prefersReducedMotion ? 1 : artworkScale,
              y: prefersReducedMotion ? 0 : artworkY,
              opacity: prefersReducedMotion ? 1 : artworkOpacity,
            }}
          >
            <picture className="hero-art__picture">
              <Image
                src="/assets/mohit-story.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 680px) 100vw, 55vw"
                className="hero-art__image"
              />
            </picture>
          </motion.div>
          <div className="hero-art__shade" />
          <div className="hero-art__glow" />
          <motion.div className="hero-art__scroll-shadow" style={{ opacity: prefersReducedMotion ? 0 : scrollShadow }} />
        </div>
        <HeroCanvas />
        <HeroGreeting
          exitOpacity={prefersReducedMotion ? 1 : copyOpacity}
          exitY={prefersReducedMotion ? 0 : copyY}
        />
      </section>
    </div>
  );
}
