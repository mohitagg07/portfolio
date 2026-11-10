"use client";

import { motion, useReducedMotion } from "motion/react";

const TRACK_URL = "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b";

export default function HeroSoundtrack() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      className="hero-soundtrack"
      aria-label="A track playing in the background of the portfolio"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.65,
        delay: prefersReducedMotion ? 0 : 1.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="hero-soundtrack__art" aria-hidden="true">
        <span className="hero-soundtrack__art-horizon" />
        <span className="hero-soundtrack__art-sun" />
      </div>

      <div className="hero-soundtrack__meta">
        <span className="hero-soundtrack__eyebrow">ON REPEAT</span>
        <strong>Blinding Lights</strong>
        <span className="hero-soundtrack__artist">The Weeknd</span>
      </div>

      <div className="hero-soundtrack__wave" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i /><i /><i />
      </div>

      <a
        className="hero-soundtrack__play"
        href={TRACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Listen to Blinding Lights by The Weeknd"
        title="Listen to Blinding Lights"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5.8c0-.8.9-1.3 1.6-.9l9.1 6.2c.6.4.6 1.3 0 1.8l-9.1 6.2c-.7.5-1.6 0-1.6-.9V5.8Z" />
        </svg>
      </a>

      <span className="hero-soundtrack__hint">LISTEN</span>
    </motion.aside>
  );
}
