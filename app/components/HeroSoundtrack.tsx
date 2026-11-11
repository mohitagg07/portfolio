"use client";

import { useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export default function HeroSoundtrack() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

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

  const seek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const nextTime = Number(event.currentTarget.value);
    if (!audio || !Number.isFinite(nextTime)) return;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <motion.aside
      className={`hero-soundtrack${isPlaying ? " is-playing" : ""}`}
      aria-label="Mohit's soundtrack: Blinding Lights by The Weeknd"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.64,
        delay: reduceMotion ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/blinding_lights.mp3"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => {
          setAudioError(true);
          setIsPlaying(false);
        }}
      />

      <div className="hero-soundtrack__topline">
        <span className="hero-soundtrack__eyebrow">A SONG FOR THE LONG BUILDS</span>
        <span className="hero-soundtrack__edition">MOHIT'S PICK</span>
      </div>

      <div className="hero-soundtrack__main">
        <div className="hero-soundtrack__cover" aria-hidden="true">
          <span className="hero-soundtrack__cover-glow" />
          <span className="hero-soundtrack__cover-line" />
          <strong>M</strong>
        </div>

        <div className="hero-soundtrack__track">
          <strong>{audioError ? "Preview unavailable" : "Blinding Lights"}</strong>
          <span>The Weeknd <i>·</i> 28s preview</span>
          <div className="hero-soundtrack__wave" aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
        </div>

        <button
          className="hero-soundtrack__play"
          type="button"
          onClick={togglePlayback}
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

      <div className="hero-soundtrack__timeline">
        <input
          aria-label="Seek through the Blinding Lights preview"
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={Math.min(currentTime, duration || 1)}
          onChange={seek}
          disabled={!duration || audioError}
          style={{ "--track-progress": `${progress}%` } as CSSProperties}
        />
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </motion.aside>
  );
}
