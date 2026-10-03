"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Youtube, Linkedin, Mail, Copy, Check } from "lucide-react";
import { useInView, useVisibility } from "./useInView";

const EMAIL = "mohitaggarwal2003@gmail.com";
const LINKS = [
  { label: "GitHub", href: "https://github.com/mohitagg07", Icon: Github },
  { label: "YouTube", href: "https://youtube.com/@MohitAgg07", Icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohitagg07", Icon: Linkedin },
  { label: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
];

export default function ContactSection() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetCopyStatus = useRef<number | undefined>(undefined);
  const [sectionRef, active] = useVisibility<HTMLElement>(0.03);
  const [ref, seen] = useInView<HTMLDivElement>(0.2);

  useEffect(() => () => {
    if (resetCopyStatus.current !== undefined) {
      window.clearTimeout(resetCopyStatus.current);
    }
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    if (resetCopyStatus.current !== undefined) {
      window.clearTimeout(resetCopyStatus.current);
    }
    resetCopyStatus.current = window.setTimeout(() => setCopyStatus("idle"), 2500);
  };

  return (
    <section ref={sectionRef} id="contact" className={`section-spacer relative overflow-hidden ${active ? "is-active" : ""}`}>
      <div className="contact-depth" aria-hidden="true">
        <div className="contact-depth__orb" />
        <span className="contact-depth__ring contact-depth__ring--wide" />
        <span className="contact-depth__ring contact-depth__ring--tilted" />
      </div>
      <div ref={ref} className={`section-wrap ${seen ? "is-in" : ""}`}>
        <div className="contact-column max-w-md">
          <h2 className={`section-heading section-title ${seen ? "is-in" : ""}`}>
            Let&apos;s build
            <br />
            <span className="glow-text">something great.</span>
          </h2>
          <p className="section-lede mt-6">
            Have an idea, need a website, or want to try AI in your work? Tell me about it. I&apos;ll reply as soon as I can.
          </p>

          <ul className="mt-10">
            {LINKS.map(({ label, href, Icon }, i) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ "--i": i } as React.CSSProperties}
                  className="hline group flex items-center gap-4 py-4 font-medium transition-colors hover:text-[var(--accent)]"
                >
                  <Icon size={22} aria-hidden="true" className="shrink-0 text-white transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={copy}
            aria-live="polite"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {copyStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copyStatus === "copied" ? "Email copied" : copyStatus === "failed" ? "Copy failed — use the email link" : "Copy my email"}
          </button>
        </div>
      </div>
    </section>
  );
}
