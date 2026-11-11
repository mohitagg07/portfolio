"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function HeroSoundtrack() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Never resume automatically after a remount or navigation.
    audio.pause();
    audio.currentTime = 0;

    return () => {
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
      className={`hero-soundtrack${isPlaying ? " is-playing" : ""}`}
      aria-label="Mohit's soundtrack: Blinding Lights by The Weeknd"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : 0.86,
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

      <div className="hero-soundtrack__topline">
        <span className="hero-soundtrack__eyebrow">A SONG I KEEP COMING BACK TO</span>
        <span className="hero-soundtrack__edition">PERSONAL SOUNDTRACK</span>
      </div>

      <div className="hero-soundtrack__main">
        <div
          className="hero-soundtrack__cover"
          role="img"
          aria-label="Blinding Lights single artwork by The Weeknd"
        />
        <div className="hero-soundtrack__track">
          <strong>{audioError ? "Audio unavailable" : "Blinding Lights"}</strong>
          <span>The Weeknd</span>
          <div className="hero-soundtrack__wave" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
        </div>
        <button
          className="hero-soundtrack__play"
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
      <p className="hero-soundtrack__hint" aria-live="polite">
        {audioError ? "The preview could not be loaded." : isPlaying ? "Playing" : "Press play when you want to listen."}
      </p>
    </motion.aside>
  );
}
