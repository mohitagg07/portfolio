"use client";

import { useEffect, useState } from "react";

export default function Intro() {
  const [phase, setPhase] = useState<"draw" | "fade" | "done">("draw");

  useEffect(() => {
    const skip =
      sessionStorage.getItem("intro-seen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("intro-seen", "1");
    const t1 = setTimeout(() => setPhase("fade"), 3000);
    const t2 = setTimeout(() => setPhase("done"), 3900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#060810] px-6 transition-opacity duration-[900ms]"
      style={{ opacity: phase === "fade" ? 0 : 1, pointerEvents: "none" }}
    >
      <svg viewBox="0 0 700 200" className="w-full max-w-3xl">
        <defs>
          <linearGradient id="hello-grad" gradientUnits="userSpaceOnUse" x1="60" x2="640" y1="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#c8ff00" />
          </linearGradient>
        </defs>
        <text x="350" y="130" textAnchor="middle" className="hello-text">hello world!</text>
      </svg>
    </div>
  );
}
