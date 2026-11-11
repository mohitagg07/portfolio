"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { navigateToSection } from "../utils/scroll";

export default function HeroPersonalDetails() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduceMotion ? 0 : 0.72,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <div className="hero-personal-details" aria-label="Personal photographs and a note about my work">
      <motion.a
        href="#about"
        className="hero-polaroid hero-polaroid--home"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="See more photographs from time away from the desk"
        {...reveal(0.5)}
      >
        <span className="hero-polaroid__pin" aria-hidden="true" />
        <span className="hero-polaroid__photo">
          <Image
            src="/about/mountain-memory.webp"
            alt="Two people taking in a wide mountain view"
            fill
            sizes="(max-width: 767px) 44vw, (max-width: 1100px) 120px, 152px"
          />
        </span>
        <span className="hero-polaroid__caption">
          <small>OFF THE CLOCK</small>
          <strong>A view worth the climb.</strong>
        </span>
      </motion.a>

      <motion.a
        href="#about"
        className="hero-polaroid hero-polaroid--field"
        onClick={(event) => navigateToSection(event, "about")}
        aria-label="See more photographs with friends"
        {...reveal(0.64)}
      >
        <span className="hero-polaroid__pin" aria-hidden="true" />
        <span className="hero-polaroid__photo">
          <Image
            src="/about/friends-memory.webp"
            alt="Mohit with three friends at an outdoor gathering"
            fill
            priority
            sizes="(max-width: 767px) 44vw, (max-width: 1100px) 116px, 148px"
          />
        </span>
        <span className="hero-polaroid__caption">
          <small>GOOD COMPANY</small>
          <strong>Better with good people.</strong>
        </span>
      </motion.a>

      <motion.a
        href="#work"
        className="hero-principle"
        onClick={(event) => navigateToSection(event, "work")}
        aria-label="Read about the thinking behind my projects"
        {...reveal(0.82)}
        whileHover={reduceMotion ? undefined : { y: -4, rotate: -0.3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.995 }}
      >
        <span className="hero-principle__tape" aria-hidden="true" />
        <span className="hero-principle__eyebrow">A THOUGHT I COME BACK TO</span>
        <span className="hero-principle__quote-mark" aria-hidden="true">“</span>
        <blockquote>The hard part should stay behind the screen.</blockquote>
        <span className="hero-principle__source">— Mohit</span>
      </motion.a>
    </div>
  );
}
