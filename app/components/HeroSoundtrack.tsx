"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function HeroSoundtrack() {
  const playerRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const player = playerRef.current;
    if (!audio || !player) return;

    audio.pause();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.12) audio.pause();
      },
      { threshold: [0, 0.12, 0.5] }
    );
    const onVisibilityChange = () => {
      if (document.visibilityState !== "visible") audio.pause();
    };

    observer.observe(player);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      audio.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        setAudioError(false);
        await audio.play();
      } catch {
        setIsPlaying(false);
        setAudioError(true);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <motion.aside
      ref={playerRef}
      className={`hero-record-player${isPlaying ? " is-playing" : ""}`}
      aria-label="Mohit's soundtrack: Blinding Lights by The Weeknd"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.62,
        delay: reduceMotion ? 0 : 0.88,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/blinding_lights.mp3"
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setAudioError(true);
          setIsPlaying(false);
        }}
      />

      <div className="hero-record-player__label">
        <span>A SONG I KEEP COMING BACK TO</span>
        <span className="hero-record-player__label-right">THE WEEKND</span>
      </div>

      <div className="hero-record-player__main">
        <div
          className="hero-record-player__art"
          role="img"
          aria-label="Blinding Lights single artwork by The Weeknd"
        />
        <div className="hero-record-player__meta">
          <strong>{audioError ? "Audio unavailable" : "Blinding Lights"}</strong>
          <span>The Weeknd</span>
          <div className="hero-record-player__wave" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
        </div>
        <button
          className="hero-record-player__button"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            void togglePlayback();
          }}
          aria-label={isPlaying ? "Pause Blinding Lights" : "Play Blinding Lights"}
          aria-pressed={isPlaying}
          disabled={audioError}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5.5h3.7v13H7zM13.3 5.5H17v13h-3.7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.8c0-.8.9-1.3 1.6-.9l9.1 6.2c.6.4.6 1.3 0 1.8l-9.1 6.2c-.7.5-1.6 0-1.6-.9V5.8Z" />
            </svg>
          )}
        </button>
      </div>
      <span className="hero-record-player__status" aria-live="polite">
        {audioError ? "Audio could not be loaded" : isPlaying ? "Playing Blinding Lights" : "Ready to play"}
      </span>
    </motion.aside>
  );
}
