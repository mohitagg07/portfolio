"use client";

import { useEffect, useState } from "react";

const GREETING = "hello world";
const TYPE_DELAY_MS = 100;
const HOLD_MS = 1400;
const EXIT_MS = 620;

export default function IntroLoader() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFinished(true);
      return;
    }

    const root = document.documentElement;
    root.dataset.introLoading = "true";
    let count = 0;
    let intervalId: number | undefined;
    let holdId: number | undefined;
    let removeId: number | undefined;

    intervalId = window.setInterval(() => {
      count += 1;
      setVisibleCount(count);

      if (count >= GREETING.length && intervalId !== undefined) {
        window.clearInterval(intervalId);
        holdId = window.setTimeout(() => {
          setLeaving(true);
          removeId = window.setTimeout(() => {
            delete root.dataset.introLoading;
            setFinished(true);
          }, EXIT_MS);
        }, HOLD_MS);
      }
    }, TYPE_DELAY_MS);

    return () => {
      delete root.dataset.introLoading;
      if (intervalId !== undefined) window.clearInterval(intervalId);
      if (holdId !== undefined) window.clearTimeout(holdId);
      if (removeId !== undefined) window.clearTimeout(removeId);
    };
  }, []);

  if (finished) return null;

  return (
    <div className={`intro-loader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="intro-loader__content">
        <p className="intro-loader__greeting">
          <span>{GREETING.slice(0, visibleCount)}</span>
          {visibleCount < GREETING.length && <i />}
        </p>
      </div>
    </div>
  );
}
