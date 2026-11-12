"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Github, Youtube, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

const EMAIL = "mohitaggarwal2003@gmail.com";
const LINKS = [
  { label: "GitHub", href: "https://github.com/mohitagg07", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohitagg07", Icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/@MohitAgg07", Icon: Youtube },
];

export default function ContactSection() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [projectNote, setProjectNote] = useState("");
  const resetCopyStatus = useRef<number | undefined>(undefined);
  const [ref, seen] = useInView<HTMLDivElement>(0.2);

  useEffect(
    () => () => {
      if (resetCopyStatus.current !== undefined) {
        window.clearTimeout(resetCopyStatus.current);
      }
    },
    []
  );

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

  const handleQuickEnquiry = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      senderName.trim()
        ? `Project idea from ${senderName.trim()}`
        : "Project or workflow idea"
    );
    const message = projectNote.trim() || "Hi Mohit, I have a project idea I'd love to discuss.";
    const details = [
      senderName.trim() ? `Name: ${senderName.trim()}` : "",
      senderEmail.trim() ? `Reply to: ${senderEmail.trim()}` : "",
      "",
      message,
    ].filter(Boolean);
    const body = encodeURIComponent(details.join("\n"));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className={`section-spacer contact-section ${seen ? "is-active" : ""}`}
    >
      <div className="contact-art" aria-hidden="true">
        <div className="contact-art__shade" />
        <div className="contact-art__glow" />
      </div>

      <ScrollReveal className="contact-reveal">
        <div ref={ref} className={`section-wrap ${seen ? "is-in" : ""}`}>
          <div className="contact-editorial-grid">
            <div className="contact-column contact-panel">
              <p className="contact-kicker">
                <span>06</span> Collaboration &amp; enquiries
              </p>
              <ScrollReveal variant="mask">
                <h2 className={`section-heading section-title ${seen ? "is-in" : ""}`}>
                  Have a problem worth solving?{" "}
                  <em className="contact-title-serif">Let&apos;s make something useful.</em>
                </h2>
              </ScrollReveal>
              <p className="section-lede mt-6">
                Whether it&apos;s a product idea, a workflow that needs fixing or an
                interesting project, I&apos;d love to hear about it.
              </p>

              <ul className="contact-links mt-8">
                {LINKS.map(({ label, href, Icon }, i) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{ "--i": i } as React.CSSProperties}
                      className="hline contact-link group flex items-center gap-4 py-3.5 font-medium transition-colors hover:text-[var(--accent)]"
                    >
                      <Icon
                        size={20}
                        aria-hidden="true"
                        className="shrink-0 text-white transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                      />
                      <span>{label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="contact-primary-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Write me an email <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={copy}
                  aria-live="polite"
                  className="contact-copy inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  {copyStatus === "copied" ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )}
                  {copyStatus === "copied"
                    ? "Email copied"
                    : copyStatus === "failed"
                    ? "Copy failed — use the email link"
                    : "Copy my email"}
                </button>
              </div>
            </div>

            {/* Optional Short Project Enquiry Form */}
            <form
              onSubmit={handleQuickEnquiry}
              className="contact-enquiry-form"
              aria-label="Short project enquiry form"
            >
              <p className="contact-form-kicker">Quick project note</p>
              <h3 className="contact-form-title">Send a rough brief</h3>
              <p className="contact-form-sub">
                This opens a ready-to-send email in your mail app. Nothing is sent until you press Send.
              </p>

              <label className="contact-field">
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={100}
                  className="contact-input"
                />
              </label>

              <label className="contact-field">
                <span>Your email <small>(optional)</small></span>
                <input
                  type="email"
                  name="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  className="contact-input"
                />
              </label>

              <label className="contact-field">
                <span>What are you thinking of building or fixing?</span>
                <textarea
                  name="project"
                  rows={4}
                  value={projectNote}
                  onChange={(e) => setProjectNote(e.target.value)}
                  placeholder="A short description of the problem, workflow, or product idea..."
                  minLength={12}
                  maxLength={3000}
                  required
                  className="contact-textarea"
                />
              </label>

              <button type="submit" className="contact-submit-btn">
                Draft email to Mohit <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
