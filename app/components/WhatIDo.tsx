"use client";
import { useState, useRef, useCallback } from "react";

const ITEMS = [
  {
    id: "ai",
    accent: "#63dcb4",
    accentRgb: "99,220,180",
    number: "01",
    label: "AI Systems",
    tags: ["LLMs", "Chatbots", "ML Pipelines"],
    desc: "Building intelligent systems with LLMs, vector databases, and ML pipelines that run reliably in production.",
    icon: (color: string, hovered: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.4" fill={hovered ? `${color}20` : "none"} style={{transition:"fill 0.3s"}}/>
        <rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="1.4" fill={hovered ? `${color}20` : "none"} style={{transition:"fill 0.3s"}}/>
        <rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.4" fill={hovered ? `${color}20` : "none"} style={{transition:"fill 0.3s"}}/>
        <rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="1.4" fill={hovered ? `${color}20` : "none"} style={{transition:"fill 0.3s"}}/>
        <circle cx="12" cy="12" r="2" fill={color} opacity={hovered ? 1 : 0.5} style={{transition:"opacity 0.3s"}}/>
      </svg>
    ),
  },
  {
    id: "fullstack",
    accent: "#818cf8",
    accentRgb: "129,140,248",
    number: "02",
    label: "Full Stack Apps",
    tags: ["Next.js", "FastAPI", "MongoDB"],
    desc: "End-to-end applications from database schema to pixel-perfect UI — deployed, fast, and scalable.",
    icon: (color: string, hovered: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="13" rx="2" stroke={color} strokeWidth="1.4" fill={hovered ? `${color}18` : "none"} style={{transition:"fill 0.3s"}}/>
        <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.45"/>
        <path d="M7 9l2.5 2.5L7 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 13.5h4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "prod",
    accent: "#34d399",
    accentRgb: "52,211,153",
    number: "03",
    label: "Live Deployment",
    tags: ["Vercel", "CI/CD", "Scalable"],
    desc: "Every project I ship goes live. CI/CD, monitoring, uptime — the boring stuff that actually matters.",
    icon: (color: string, hovered: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.4" fill={hovered ? `${color}15` : "none"} style={{transition:"fill 0.3s"}}/>
        <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "eng",
    accent: "#c084fc",
    accentRgb: "192,132,252",
    number: "04",
    label: "Engineering",
    tags: ["RAG", "Pipelines", "Architecture"],
    desc: "Clean architecture, RAG pipelines, and well-structured code that other developers can actually read.",
    icon: (color: string, hovered: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline points="16 18 22 12 16 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="14" y1="4" x2="10" y2="20" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity={hovered ? 0.65 : 0.2} style={{transition:"opacity 0.3s"}}/>
      </svg>
    ),
  },
  {
    id: "brand",
    accent: "#f472b6",
    accentRgb: "244,114,182",
    number: "05",
    label: "Content & Brand",
    tags: ["UI Design", "Identity", "Video"],
    desc: "UI, identity, and content strategy that converts — designed with psychology, not just aesthetics.",
    icon: (color: string, hovered: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 20h9" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill={hovered ? `${color}15` : "none"} style={{transition:"fill 0.3s"}}/>
      </svg>
    ),
  },
];

// Stagger offsets: alternating rows creates visual rhythm, breaks the rigid grid
const STAGGER = [0, 24, 0, 24, 0];

function ServiceCard({ item, index }: { item: typeof ITEMS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Live cursor tracking — updates CSS variables directly on the DOM node (no re-render)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <div
      ref={cardRef}
      className="wid-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        // CSS vars for cursor glow — consumed by ::after in <style>
        ["--accent" as string]: item.accent,
        ["--accentRgb" as string]: item.accentRgb,
        marginTop: STAGGER[index] ?? 0,
        position: "relative",
        borderRadius: 20,
        padding: "30px 28px 28px",
        background: hovered
          ? `linear-gradient(145deg, rgba(${item.accentRgb},0.09) 0%, rgba(6,8,20,0.97) 55%)`
          : "rgba(255,255,255,0.022)",
        border: hovered
          ? `1px solid rgba(${item.accentRgb},0.30)`
          : "1px solid rgba(255,255,255,0.06)",
        transition: "transform 0.35s cubic-bezier(0.34,1.15,0.64,1), box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(${item.accentRgb},0.12), inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 15px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top sheen — subtle lighting effect */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "40%",
        borderRadius: "20px 20px 0 0",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
        opacity: hovered ? 0.6 : 0.3,
        transition: "opacity 0.35s ease",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Corner glow — reduced intensity, spread wider */}
      <div style={{
        position: "absolute", top: -70, right: -70, width: 200, height: 200,
        background: `radial-gradient(circle, rgba(${item.accentRgb},${hovered ? "0.14" : "0.05"}), transparent 65%)`,
        pointerEvents: "none", transition: "all 0.45s ease", zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Icon + number */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            background: `rgba(${item.accentRgb},${hovered ? "0.16" : "0.07"})`,
            border: `1px solid rgba(${item.accentRgb},${hovered ? "0.42" : "0.18"})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.35s ease", flexShrink: 0,
            boxShadow: hovered ? `0 0 22px rgba(${item.accentRgb},0.28), inset 0 1px 0 rgba(255,255,255,0.12)` : "none",
          }}>
            {item.icon(item.accent, hovered)}
          </div>
          <span style={{
            fontFamily: "monospace", fontSize: 11, marginTop: 2,
            color: hovered ? `${item.accent}aa` : "rgba(255,255,255,0.15)",
            letterSpacing: "0.12em",
            transition: "color 0.3s ease",
          }}>
            {item.number}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "Syne,sans-serif", fontSize: 19, fontWeight: 700,
          color: hovered ? "#fff" : "rgba(255,255,255,0.85)",
          letterSpacing: "-0.025em", lineHeight: 1.2, margin: "0 0 10px",
          transition: "color 0.3s ease",
        }}>
          {item.label}
        </h3>

        {/* Description — proper contrast */}
        <p style={{
          color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.42)",
          fontSize: 13.5, fontFamily: "Inter,sans-serif",
          lineHeight: 1.78, margin: "0 0 22px",
          transition: "color 0.35s ease",
        }}>
          {item.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "monospace", fontSize: 11,
              color: hovered ? item.accent : "rgba(255,255,255,0.3)",
              background: hovered ? `rgba(${item.accentRgb},0.11)` : "rgba(255,255,255,0.04)",
              border: hovered ? `0.5px solid rgba(${item.accentRgb},0.30)` : "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 7, padding: "4px 12px", letterSpacing: "0.03em",
              transition: "all 0.3s ease",
              boxShadow: hovered ? `0 0 8px rgba(${item.accentRgb},0.08)` : "none",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: 20, right: 20, height: 1.5,
        background: `linear-gradient(to right, transparent, ${item.accent}65, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
      }} />
    </div>
  );
}

export default function WhatIDo(): React.JSX.Element {
  return (
    <section id="whatido" className="section-block" style={{ position: "relative", overflow: "hidden" }}>

      {/* Richer layered background */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 30%, rgba(120,80,255,0.07), transparent 55%), radial-gradient(circle at 80% 70%, rgba(0,255,200,0.04), transparent 55%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>02 /</span>
            <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.1)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 14px" }}>
            What I Build
          </h2>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 16, fontFamily: "Inter,sans-serif", lineHeight: 1.65, maxWidth: 440, margin: 0 }}>
            From AI pipelines to deployed products — here's what I actually ship.
          </p>
        </div>

        {/* Grid */}
        <div className="wid-grid">
          {ITEMS.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        /* Live cursor glow via CSS custom properties set in JS */
        .wid-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            rgba(255,255,255,0.07),
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
          z-index: 0;
        }
        .wid-card:hover::after {
          opacity: 1;
        }

        .wid-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .wid-grid { grid-template-columns: repeat(2, 1fr); }
          .wid-grid > * { margin-top: 0 !important; }
          .wid-grid > *:nth-child(even) { margin-top: 20px !important; }
        }

        @media (max-width: 600px) {
          .wid-grid { grid-template-columns: 1fr; }
          .wid-grid > * { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}