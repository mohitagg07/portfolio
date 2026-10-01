"use client";

import { useState } from "react";
import { Github, Youtube, Linkedin, Mail, Copy, Check } from "lucide-react";
import { useInView } from "./useInView";

const EMAIL = "mohitaggarwal2003@gmail.com";
const LINKS = [
  { label: "GitHub", href: "https://github.com/mohitagg07", Icon: Github },
  { label: "YouTube", href: "https://youtube.com/@MohitAgg07", Icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohitagg07", Icon: Linkedin },
  { label: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [ref, seen] = useInView<HTMLDivElement>(0.2);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section-spacer relative overflow-hidden">
      <div className="radar" aria-hidden="true" />
      <div ref={ref} className={`section-wrap ${seen ? "is-in" : ""}`}>
        <div className="max-w-md">
          <h2 className="text-[clamp(36px,6vw,64px)] font-bold leading-[1.05]">
            Let&apos;s build
            <br />
            <span className="glow-text">something great.</span>
          </h2>
          <p className="mt-6 leading-8 text-[var(--fg-muted)]">
            Have an idea, need a website, or want to try AI in your work? Tell me about it. I&apos;ll reply as soon as I can.
          </p>

          <ul className="mt-10">
            {LINKS.map(({ label, href, Icon }, i) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
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
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Email copied" : "Copy my email"}
          </button>
        </div>
      </div>
    </section>
  );
}
