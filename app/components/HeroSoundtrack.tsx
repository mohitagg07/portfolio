"use client";

import { motion, useReducedMotion } from "motion/react";

export default function HeroSoundtrack() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      className="hero-soundtrack"
      aria-label="Portfolio soundtrack: Blinding Lights by The Weeknd"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.62,
        delay: prefersReducedMotion ? 0 : 1.02,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="hero-soundtrack__heading">
        <span>A song for the long builds</span>
        <span className="hero-soundtrack__index">MOHIT'S PICK</span>
      </div>
      <iframe
        title="Play Blinding Lights by The Weeknd"
        src="https://open.spotify.com/embed/track/0VjIjW4GlUZAMYd2vXMi3b?utm_source=generator&theme=0"
        width="100%"
        height="80"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </motion.aside>
  );
}
