"use client";

import { useState } from "react";
import Image from "next/image";

// [tech talk, plain words]
const LINES: [string, string][] = [
  ["I build retrieval pipelines and agent workflows.", "I teach computers to read your files and finish routine work on their own."],
  ["I automate scraping and integrations for clients.", "I let software do the copying and pasting, so people get their hours back."],
];

export default function HeroGreeting() {
  const [plain, setPlain] = useState(false);

  return (
    <div className="section-wrap relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <h1 className="text-[clamp(44px,7.5vw,92px)] font-extrabold leading-[0.95]">
          Hi, I&apos;m Mohit.
          <br />
          I make tech easy to&nbsp;use.
        </h1>

        <ul className="mt-12 max-w-xl space-y-6" aria-live="polite">
          {LINES.map(([tech, simple], i) => (
            <li
              key={`${i}-${plain}`}
              className="anim-fade-in text-lg leading-relaxed"
              style={{
                animationDelay: `${i * 0.08}s`,
                color: plain ? "var(--fg)" : "var(--fg-muted)",
                fontFamily: plain ? undefined : "ui-monospace, Menlo, monospace",
                fontSize: plain ? undefined : 15,
              }}
            >
              {plain ? simple : tech}
            </li>
          ))}
        </ul>

        <button
          role="switch"
          aria-checked={plain}
          onClick={() => setPlain(!plain)}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 py-2 pl-2 pr-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <span
            className="flex h-6 w-11 items-center rounded-full p-0.5 transition-colors"
            style={{ background: plain ? "var(--accent)" : "rgba(255,255,255,0.12)" }}
          >
            <span
              className="h-5 w-5 rounded-full bg-[#050505] transition-transform motion-reduce:transition-none"
              style={{ transform: plain ? "translateX(20px)" : "none", background: plain ? "#050505" : "#f5f5f0" }}
            />
          </span>
          {plain ? "Back to tech talk" : "Say it in plain words"}
        </button>

        <div className="mt-14 flex flex-wrap gap-4 text-sm">
          <a href="#work" className="rounded-full bg-[var(--accent)] px-7 py-3 font-bold text-[#050505]">See what I&apos;ve made</a>
          <a href="#contact" className="rounded-full border border-white/10 px-7 py-3">Say hello</a>
        </div>
      </div>

      <div className="relative hidden aspect-[4/5] w-full max-w-[300px] justify-self-end overflow-hidden rounded-2xl border border-white/10 lg:block">
        <Image src="/assets/mohit-photo-crop.png" alt="Mohit Aggarwal" fill priority className="object-cover object-top" />
      </div>
    </div>
  );
}
