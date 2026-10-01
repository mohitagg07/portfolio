"use client";

import { useState, useRef, useEffect } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("mohitaggarwal2003@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section ref={sectionRef} id="contact" className="section-spacer" style={{ position: "relative", overflow: "hidden" }}>
      <div className="radar" aria-hidden="true" />
      <div className="section-divider" />

      <div className="section-wrap" style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          {/* Label */}
          <span
            className="label-tag"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Get in Touch
          </span>

          {/* Big heading */}
          <h2
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            Let&apos;s build
            <br />
            something{" "}
            <span style={{ color: "#c8ff00", fontStyle: "italic" }}>great</span>
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "#8a8a80",
              lineHeight: 1.7,
              maxWidth: 460,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            Have a project idea, need a website, or want to explore AI solutions?
            I&apos;d love to hear about it.
          </p>

          {/* Email button — big and prominent */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginTop: 16,
            }}
          >
            <a
              href="mailto:mohitaggarwal2003@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 40px",
                borderRadius: 999,
                background: "#c8ff00",
                color: "#050505",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Send Me an Email
              <span style={{ fontSize: 20 }}>→</span>
            </a>

            {/* Copy email */}
            <button
              onClick={copyEmail}
              style={{
                background: "none",
                border: "none",
                color: "#8a8a80",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.3s ease",
                padding: "8px 16px",
                borderRadius: 8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c8ff00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a80")}
            >
              {copied ? "✓ Copied!" : "mohitaggarwal2003@gmail.com — Click to copy"}
            </button>
          </div>

          {/* Quick links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 32,
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            {[
              { href: "https://github.com/mohitagg07", label: "GitHub" },
              { href: "https://youtube.com/@MohitAgg07", label: "YouTube" },
              { href: "https://linkedin.com/in/mohitagg07", label: "LinkedIn" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#8a8a80",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,255,0,0.2)";
                  e.currentTarget.style.color = "#c8ff00";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#8a8a80";
                }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>

          {/* Location & availability */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
              fontSize: 13,
              color: "#555550",
              opacity: visible ? 1 : 0,
              transition: "all 0.8s ease 0.5s",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c8ff00",
                  boxShadow: "0 0 8px rgba(200,255,0,0.5)",
                }}
              />
              Available Now
            </span>
            <span>·</span>
            <span>Jammu, J&amp;K, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
