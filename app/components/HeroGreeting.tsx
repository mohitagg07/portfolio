"use client";

import { useEffect, useState } from "react";
import Planet from "./Planet";

// [tech talk, plain words]
const LINES: [string, string][] = [
  ["I build retrieval pipelines and agent workflows.", "I teach computers to read your files and finish routine work on their own."],
  ["I automate scraping and integrations for clients.", "I let software do the copying and pasting, so people get their hours back."],
];

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
  const [plain, setPlain] = useState(false);
  const [delay, setDelay] = useState<number | null>(null);
  useEffect(() => {
    // wait for the opening "hello world!" if it is playing
    setDelay((window as unknown as { __intro?: boolean }).__intro ? 3400 : 300);
  }, []);

  const title = "Hi, I'm Mohit.\nI make tech\neasy to use.";
  const decoded = useDecode(title, delay);

  return (
    <>
      <div className="absolute inset-y-0 right-0 z-0 w-full opacity-40 lg:w-[60%] lg:opacity-100">
        <Planet />
      </div>

      <div className="section-wrap relative z-10 w-full pb-16 pt-32">
        <div className="max-w-md">
          <h1 aria-label={title.replace(/\n/g, " ")} className="whitespace-pre-line text-[clamp(32px,4.6vw,64px)] font-bold leading-[1.1]">
            <span aria-hidden="true">{decoded}</span>
          </h1>

          <ul className="mt-8 space-y-4" aria-live="polite">
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
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 py-2 pl-2 pr-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            <span className="flex h-6 w-11 items-center rounded-full p-0.5 transition-colors" style={{ background: plain ? "var(--accent)" : "rgba(255,255,255,0.12)" }}>
              <span className="h-5 w-5 rounded-full transition-transform motion-reduce:transition-none" style={{ transform: plain ? "translateX(20px)" : "none", background: plain ? "#050505" : "#f5f5f0" }} />
            </span>
            {plain ? "Back to tech talk" : "Say it in plain words"}
          </button>

          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <a href="#work" className="rounded-full bg-[var(--accent)] px-7 py-3 font-bold text-[#050505]">See what I&apos;ve made</a>
            <a href="#contact" className="rounded-full border border-white/10 px-7 py-3">Say hello</a>
          </div>
        </div>
      </div>
    </>
  );
}
