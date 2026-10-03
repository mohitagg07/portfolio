"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import HeroGreeting from "./HeroGreeting";
import ScrollReveal from "./ScrollReveal";

export default function HeroScene() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });
  const scrollShadow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.68, 0.78]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={stageRef} className="hero-scroll-stage">
      <section id="home" className="hero-section hero-section--sticky relative flex items-center">
        <div className="hero-art" aria-hidden="true">
          <picture className="hero-art__picture">
            <source media="(max-width: 680px)" srcSet="/hero-workspace-mobile.webp" />
            <Image
              src="/hero-workspace.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 680px) 100vw, 55vw"
              className="hero-art__image"
            />
          </picture>
          <div className="hero-art__shade" />
          <div className="hero-art__glow" />
          <motion.div className="hero-art__scroll-shadow" style={{ opacity: prefersReducedMotion ? 0 : scrollShadow }} />
        </div>
        <ScrollReveal className="hero-scroll-reveal">
          <HeroGreeting />
        </ScrollReveal>
      </section>
    </div>
  );
}
