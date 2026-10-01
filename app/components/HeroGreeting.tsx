"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Planet from "./Planet";

const GLYPHS = "01<>/{}[]#$%&*+=?";

// Letters flicker like a signal, then settle into the real words.
function useDecode(text: string, delay: number | null) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (delay === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        frame++;
        const done = Math.floor(frame / 2);
        setOut(
          text.split("").map((c, i) =>
            c === " " || c === "\n" ? c : i < done ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          ).join("")
        );
        if (done >= text.length) { window.clearInterval(timer); setOut(text); }
      }, 35);
    }, delay);
    return () => { window.clearTimeout(start); window.clearInterval(timer); };
  }, [text, delay]);
  return out;
}

export default function HeroGreeting() {
  const [delay, setDelay] = useState<number | null>(null);
  useEffect(() => {
    // wait for the opening "hello world!" if it is playing
    setDelay((window as unknown as { __intro?: boolean }).__intro ? 3400 : 300);
  }, []);

  const title = "Hi, I'm Mohit.\nI make tech\neasy to use.";
  const decoded = useDecode(title, delay);

  return (
    <>
      {/* the 3D world sits behind everything */}
      <div className="absolute inset-0 z-0">
        <Planet />
      </div>

      <div className="section-wrap pointer-events-none relative z-10 flex w-full items-center justify-between gap-8 pb-16 pt-32">
        <h1 aria-label={title.replace(/\n/g, " ")} className="whitespace-pre-line text-[clamp(32px,4.6vw,64px)] font-bold leading-[1.1]">
          <span aria-hidden="true">{decoded}</span>
        </h1>

        <div
          className={`${delay === null ? "scan-wait" : "scan"} relative hidden aspect-[4/5] w-[min(22vw,280px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 lg:block`}
          style={{ "--scan-delay": `${(delay ?? 0) / 1000 + 0.4}s` } as React.CSSProperties}
        >
          <Image src="/assets/mohit-photo-crop.png" alt="Mohit Aggarwal" fill priority sizes="280px" className="object-cover object-top" />
        </div>
      </div>
    </>
  );
}
