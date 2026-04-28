"use client";

import Image from "next/image";

function GlobeIcon() {
  return (
    <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: 1,
    title: "Innovix",
    subtitle: "Jammu's First Psychology Creative Agency",
    description:
      "Designed and built the complete Innovix website for a client — a psychology-driven branding studio. Full brand identity, website, and client acquisition system. Where brands become experiences.",
    image: "/projects/project-1.png",
    mobilePos: "center",
    demo: "https://innovix-branding-studio.vercel.app/",
    urlLabel: "innovix.studio",
    flip: false,
  },
  {
    id: 2,
    title: "MindCare",
    subtitle: "AI-Powered Mental Health Chatbot",
    description:
      "Context-aware chatbot using LLaMA 3 and ChromaDB for memory-persistent conversations. CNN model for real-time facial emotion recognition with 90% accuracy across 7 emotional categories.",
    image: "/projects/project-2.png",
    mobilePos: "top",
    demo: "https://mindcare-yb5c.vercel.app/",
    urlLabel: "mindcare.vercel.app",
    flip: true,
  },
  {
    id: 3,
    title: "LegalMind AI",
    subtitle: "Generative AI Legal Document Demystifier",
    description:
      "Extracts legal clauses via OCR and Google Document AI with 95% accuracy. RAG pipeline on the Indian Kanoon corpus. Multi-modal output: plain-English summaries, visual timelines, and TTS audio from a single upload.",
    image: "/projects/project-3.png",
    mobilePos: "top",
    demo: "https://legal-doc-demystifier.vercel.app/",
    urlLabel: "legal-doc-demystifier.vercel.app",
    flip: false,
  },
];

/** Icon-only "View Live" button — black pill with globe icon */
function LiveIconBtn({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="View Live"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.75)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff",
        flexShrink: 0,
        transition: "background 0.2s, transform 0.2s",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "rgba(108,99,255,0.85)";
        el.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background = "rgba(0,0,0,0.75)";
        el.style.transform = "scale(1)";
      }}
    >
      <GlobeIcon />
    </a>
  );
}

export default function Projects(): React.JSX.Element {
  return (
    <section id="projects" className="section-block">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: 500, height: 240, background: "rgba(108,99,255,0.05)", filter: "blur(120px)" }}
      />

      <div className="container-fluid" style={{ position: "relative", zIndex: 10 }}>
        {/* Section header */}
        <div style={{ marginBottom: 64 }}>
          <p
            style={{ color: "#a78bfa", fontSize: 11, fontFamily: "Inter,sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}
          >
            What I have built
          </p>
          <h2
            className="text-white"
            style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 700, lineHeight: 1.1, fontFamily: "Syne,sans-serif" }}
          >
            Featured Projects
          </h2>
          <div style={{ marginTop: 12, width: 40, height: 1, background: "linear-gradient(to right, #6c63ff, transparent)" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
          {PROJECTS.map((project) => (
            <div key={project.id}>

              {/* ── DESKTOP layout (≥768px): side-by-side with glass card overlapping screenshot ── */}
              <div className="project-desktop" style={{ position: "relative", display: "flex", flexDirection: project.flip ? "row-reverse" : "row", alignItems: "flex-start" }}>

                {/* Screenshot — 58% */}
                <div style={{ width: "58%", flexShrink: 0, position: "relative", zIndex: 1 }}>
                  <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#0d1120", aspectRatio: "16/10", boxShadow: "0 32px 80px rgba(0,0,0,0.55)", position: "relative" }}>
                    {/* macOS bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, background: "#10131f", display: "flex", alignItems: "center", paddingLeft: 12, gap: 6, zIndex: 5 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "block" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "block" }} />
                      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
                        <GlobeIcon />
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>{project.urlLabel}</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, top: 28 }}>
                      <Image src={project.image} alt={project.title} fill sizes="55vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(8,11,20,0.6) 0%, transparent 100%)", zIndex: 3 }} />
                  </div>
                </div>

                {/* Text column — overlaps screenshot, pushed right/left */}
                <div style={{
                  width: "50%",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  paddingTop: 48,
                  ...(project.flip
                    ? { marginRight: "-8%", paddingRight: 32 }
                    : { marginLeft: "-8%", paddingLeft: 32 }),
                }}>
                  <p style={{ color: "#6c63ff", fontSize: 11, fontWeight: 700, fontFamily: "Inter,sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Featured Project
                  </p>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "clamp(24px,2.8vw,32px)", fontWeight: 700, lineHeight: 1.15, fontFamily: "Syne,sans-serif", marginBottom: 6 }}>
                      {project.title}
                    </h3>
                    <p style={{ color: "#a78bfa", fontSize: 15, fontFamily: "Inter,sans-serif", lineHeight: 1.5 }}>
                      {project.subtitle}
                    </p>
                  </div>
                  {/* Glass card */}
                  <div style={{ background: "rgba(10,12,22,0.78)", backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "20px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                    <p style={{ color: "rgba(200,205,225,0.88)", fontSize: 14, lineHeight: 1.75, margin: 0, fontFamily: "Inter,sans-serif" }}>
                      {project.description}
                    </p>
                  </div>
                  <LiveIconBtn href={project.demo} />
                </div>
              </div>

              {/* ── MOBILE layout (< 768px): image with ALL content overlaid at bottom ── */}
              <div className="project-mobile">
                <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "none", background: "rgba(8,10,20,1)", boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)" }}>
                  {/* Screenshot — tall enough to show content, fades to black */}
                  <div style={{ position: "relative", width: "100%", height: 240, overflow: "hidden" }}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover", objectPosition: (project as typeof project & { mobilePos: string }).mobilePos || "top" }}
                      sizes="100vw"
                    />
                    {/* Gradient: visible top 55%, then hard fade to page bg */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,10,20,0) 0%, rgba(8,10,20,0) 42%, rgba(8,10,20,0.65) 65%, rgba(8,10,20,1) 85%, rgba(8,10,20,1) 100%)" }} />
                  </div>

                  {/* Content — zero gap, same bg as gradient end */}
                  <div style={{ background: "rgba(8,10,20,1)", padding: "0 20px 26px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ color: "#6c63ff", fontSize: 10, fontWeight: 700, fontFamily: "Outfit,sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
                      Featured Project
                    </p>
                    <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.2, fontFamily: "Syne,sans-serif", margin: 0 }}>
                      {project.title}
                    </h3>
                    <p style={{ color: "#a78bfa", fontSize: 13, fontFamily: "Outfit,sans-serif", lineHeight: 1.5, margin: 0 }}>
                      {project.subtitle}
                    </p>
                    <p style={{ color: "rgba(180,185,210,0.75)", fontSize: 13.5, lineHeight: 1.7, fontFamily: "Outfit,sans-serif", margin: 0 }}>
                      {project.description}
                    </p>
                    <div style={{ paddingTop: 6 }}>
                      <LiveIconBtn href={project.demo} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Responsive rules live in globals.css */}
    </section>
  );
}