"use client";

import { useEffect, useState } from "react";

const GREETING = "Hello, world!";

export default function IntroLoader() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFinished(true);
      return;
    }

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
          removeId = window.setTimeout(() => setFinished(true), 850);
        }, 180);
      }
    }, 46);

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      if (holdId !== undefined) window.clearTimeout(holdId);
      if (removeId !== undefined) window.clearTimeout(removeId);
    };
  }, []);

  if (finished) return null;

  return (
    <div className={`intro-loader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      <div className="intro-loader__orbit"><i /></div>
      <div className="intro-loader__content">
        <p className="intro-loader__eyebrow"><span /> MOHIT AGGARWAL <i /> DIGITAL PORTFOLIO</p>
        <p className="intro-loader__greeting">
          <span>{GREETING.slice(0, visibleCount)}</span>
          {visibleCount < GREETING.length && <i />}
        </p>
        <div className="intro-loader__progress">
          <span style={{ transform: `scaleX(${visibleCount / GREETING.length})` }} />
        </div>
        <p className="intro-loader__status">{visibleCount === GREETING.length ? "READY TO EXPLORE" : "A MOMENT OF SPARK"}</p>
      </div>
    </div>
  );
}
