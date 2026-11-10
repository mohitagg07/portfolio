"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import HeroGreeting from "./HeroGreeting";

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const section = sectionRef.current;
    if (!section) return;

    const bounds = section.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    section.style.setProperty("--hero-depth-x", `${(x * 7).toFixed(2)}px`);
    section.style.setProperty("--hero-depth-y", `${(y * 6).toFixed(2)}px`);
    section.style.setProperty("--hero-tilt-x", `${(-y * 0.55).toFixed(2)}deg`);
    section.style.setProperty("--hero-tilt-y", `${(x * 0.55).toFixed(2)}deg`);
  };

  const resetPointer = () => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.setProperty("--hero-depth-x", "0px");
    section.style.setProperty("--hero-depth-y", "0px");
    section.style.setProperty("--hero-tilt-x", "0deg");
    section.style.setProperty("--hero-tilt-y", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-v3"
      aria-labelledby="hero-v3-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <Image
        src="/assets/hero-background.avif"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-v3__image"
        aria-hidden="true"
      />
      <div className="hero-v3__shade" aria-hidden="true" />
      <HeroGreeting />
    </section>
  );
}
