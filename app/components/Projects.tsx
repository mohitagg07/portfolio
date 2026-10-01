"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image: string;
  demo: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Innovix Studio",
    tagline: "Psychology-Driven Brand Platform",
    category: "Web",
    description: "A complete digital platform for a psychology-driven branding agency in Jammu. Designed to elevate brand experiences and drive client acquisition.",
    image: "/projects/project-1.png",
    demo: "https://innovix-branding-studio.vercel.app/",
    highlights: ["Fluid responsive design", "Interactive portfolio", "Client contact system"],
  },
  {
    id: 2,
    title: "MindCare",
    tagline: "AI Mental Health Companion",
    category: "AI",
    description: "A supportive AI assistant providing mental health conversations, emotional check-ins, and real-time mood recognition for daily wellness.",
    image: "/projects/project-2.png",
    demo: "https://mindcare-yb5c.vercel.app/",
    highlights: ["Context-aware chat", "Emotion recognition", "Private & secure"],
  },
  {
    id: 3,
    title: "LegalMind AI",
    tagline: "Smart Legal Document Analyzer",
    category: "AI",
    description: "Upload complex contracts and receive instant plain-English summaries, key clause highlights, and audio summaries for on-the-go listening.",
    image: "/projects/project-3.png",
    demo: "https://legal-doc-demystifier.vercel.app/",
    highlights: ["PDF & scan support", "Plain-English summaries", "Audio playback"],
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="section-spacer" style={{ position: "relative" }}>
      {/* Subtle divider */}
      <div className="section-divider" />

      <div className="section-wrap" style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="label-tag">Selected Work</span>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 600,
            }}
          >
            Projects built with
            <br />
            <span style={{ color: "#c8ff00", fontStyle: "italic" }}>intention</span>
          </h2>
        </div>

        {/* Projects list — editorial style */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PROJECTS.map((project, i) => (
            <a
              key={project.id}
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 24,
                padding: "40px 0",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 0.1}s`,
              }}
              className="md:!grid-cols-[1fr_1.4fr]"
            >
              {/* Left: Info */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      fontSize: 48,
                      fontWeight: 800,
                      fontFamily: "'Syne', sans-serif",
                      color: hoveredId === project.id ? "#c8ff00" : "rgba(255,255,255,0.08)",
                      letterSpacing: "-0.04em",
                      transition: "color 0.4s ease",
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#c8ff00",
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(200,255,0,0.15)",
                      background: "rgba(200,255,0,0.05)",
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#f5f5f0",
                    transition: "color 0.3s ease",
                  }}
                >
                  {project.title}
                </h3>

                <p style={{ fontSize: 14, color: "#c8ff00", fontWeight: 500 }}>
                  {project.tagline}
                </p>

                <p style={{ fontSize: 14, color: "#8a8a80", lineHeight: 1.7, maxWidth: 400 }}>
                  {project.description}
                </p>

                {/* Feature tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#8a8a80",
                        padding: "5px 12px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* View project link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: hoveredId === project.id ? "#c8ff00" : "#555550",
                    transition: "all 0.3s ease",
                    marginTop: 8,
                  }}
                >
                  <span>View Project</span>
                  <span
                    style={{
                      transition: "transform 0.3s ease",
                      transform: hoveredId === project.id ? "translateX(6px)" : "translateX(0)",
                      fontSize: 16,
                    }}
                  >
                    →
                  </span>
                </div>
              </div>

              {/* Right: Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: hoveredId === project.id ? "scale(1.02)" : "scale(1)",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {/* Overlay gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(5,5,5,0.3) 0%, transparent 50%)",
                    opacity: hoveredId === project.id ? 0 : 0.5,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </div>
            </a>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
      </div>
    </section>
  );
}