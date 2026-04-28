"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const skills = [
  { label: "Python",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { label: "React",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { label: "Next.js",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { label: "FastAPI",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { label: "MongoDB",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { label: "MySQL",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { label: "GCP",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
  { label: "OpenCV",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { label: "TypeScript",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { label: "Node.js",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { label: "TensorFlow",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { label: "Docker",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];

function AICursor() {
  return (
    <span style={{
      display: "inline-block", width: 6, height: 10,
      background: "#63dcb4", verticalAlign: "middle", marginLeft: 2,
      animation: "blink 1s step-end infinite",
    }} />
  );
}

export default function About(): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLElement>(".skill-item").forEach((el, i) => {
            setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0) scale(1)"; }, i * 55);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden">

      {/* ── Big Typography Statement ── */}
      <div className="relative px-6 pt-24 pb-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 700, height: 400, background: "rgba(108,99,255,0.05)", filter: "blur(120px)", borderRadius: "50%" }} />

        <div className="container mx-auto max-w-5xl relative z-10">
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(15px,2vw,20px)", fontFamily: "Inter,sans-serif", marginBottom: 8 }}>
            An AI Builder who
          </p>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(40px,8vw,90px)", lineHeight: 1.05, color: "#fff", letterSpacing: "-0.02em" }}>
            Ships ideas,{" "}<br />
            not just{" "}
            <span className="relative inline-block">
              <span style={{ color: "#a78bfa" }}>demos.</span>
              <svg className="absolute" style={{ bottom: "-10px", left: "-8px", width: "calc(100% + 16px)", height: "40px", overflow: "visible" }}
                viewBox="0 0 200 40" preserveAspectRatio="none">
                <ellipse cx="100" cy="20" rx="96" ry="17" fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth="2" strokeDasharray="4 3" />
              </svg>
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "clamp(13px,1.5vw,17px)", fontFamily: "Inter,sans-serif", marginTop: 28, maxWidth: 480 }}>
            Because if it doesn&apos;t run in production, what&apos;s the point?
          </p>
        </div>
      </div>

      {/* ── What I Do — Capability Cards ── */}
      <div className="px-6 py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto max-w-6xl">

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 36 }}>
            <span style={{ fontFamily: "DM Mono,monospace,Inter,sans-serif", fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>02 /</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", letterSpacing: "-0.02em" }}>What I Do</span>
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}>

            {/* Card 1 — AI Systems */}
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer", aspectRatio: "3/4", border: "0.5px solid rgba(255,255,255,0.09)", background: "#0f1117", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.02)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "85%", background: "#1a1d2e", borderRadius: 8, border: "0.5px solid rgba(99,220,180,0.25)", padding: 12, fontFamily: "monospace", fontSize: 9 }}>
                  <div style={{ display: "inline-block", background: "rgba(99,220,180,0.15)", border: "0.5px solid rgba(99,220,180,0.3)", color: "#63dcb4", fontSize: 8, padding: "2px 6px", borderRadius: 4, marginBottom: 8 }}>● llama-3.1</div>
                  <div style={{ marginBottom: 5 }}><span style={{ color: "#63dcb4" }}>user › </span><span style={{ color: "#8892b0" }}>Analyse this legal doc</span></div>
                  <div style={{ marginBottom: 5 }}><span style={{ color: "#63dcb4" }}>sys  › </span><span style={{ color: "#8892b0" }}>RAG pipeline running…</span></div>
                  <div style={{ color: "#ccd6f6", marginTop: 6, lineHeight: 1.6 }}>Clause 12 flags a 90-day lock-in. Risk: medium.<AICursor /></div>
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 40%,rgba(0,0,0,0.55) 100%)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, zIndex: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", marginBottom: 4 }}>AI Systems</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.55)" }}>LLMs · RAG · ML Pipelines</div>
              </div>
            </div>

            {/* Card 2 — Full Stack Apps */}
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer", aspectRatio: "3/4", border: "0.5px solid rgba(255,255,255,0.09)", background: "#faf8f4", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.02)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "88%", background: "#fff", borderRadius: 8, border: "0.5px solid #e8e4dc", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ background: "#2d2926", padding: "6px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                    <span style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                      {["Dashboard","API","DB"].map(t => <span key={t} style={{ fontFamily: "monospace", fontSize: 7, color: "rgba(255,255,255,0.5)" }}>{t}</span>)}
                    </span>
                  </div>
                  <div style={{ padding: 10 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                      {[["4.2k","Users"],["98%","Uptime"],["12ms","Latency"]].map(([num,lbl]) => (
                        <div key={lbl} style={{ flex: 1, background: "#f5f2ec", borderRadius: 5, padding: 5 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#2d2926" }}>{num}</div>
                          <div style={{ fontFamily: "monospace", fontSize: 7, color: "#9e9a92" }}>{lbl}</div>
                        </div>
                      ))}
                    </div>
                    {[["React",90,"#ff6b35"],["Next.js",75,"#3b82f6"],["FastAPI",60,"#8b5cf6"]].map(([lbl,w,col]) => (
                      <div key={lbl as string} style={{ display: "flex", gap: 4, marginBottom: 4, alignItems: "center" }}>
                        <span style={{ fontFamily: "monospace", fontSize: 7, color: "#9e9a92", width: 32 }}>{lbl}</span>
                        <div style={{ flex: 1, height: 5, background: "#f0ede7", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${w}%`, height: "100%", background: col as string, borderRadius: 3 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 30%,rgba(20,10,0,0.6) 100%)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, zIndex: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", marginBottom: 4 }}>Full Stack Apps</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.6)" }}>React · Next.js · FastAPI</div>
              </div>
            </div>

            {/* Card 3 — Production */}
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer", aspectRatio: "3/4", border: "0.5px solid rgba(255,255,255,0.09)", background: "#0a0e0a", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.02)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "85%", background: "#111611", borderRadius: 8, border: "0.5px solid rgba(134,239,172,0.2)", padding: 12, fontFamily: "monospace", fontSize: 9 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ color: "#86efac", fontSize: 9 }}>prod-env</span>
                    <span style={{ background: "rgba(134,239,172,0.15)", color: "#86efac", padding: "2px 6px", borderRadius: 3, fontSize: 8, border: "0.5px solid rgba(134,239,172,0.3)" }}>● live</span>
                  </div>
                  {[["Uptime","99.97%"],["Deploys / week","14"],["Build time","23s"]].map(([lbl,val]) => (
                    <div key={lbl} style={{ marginBottom: 7 }}>
                      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 8, marginBottom: 2 }}>{lbl}</div>
                      <div style={{ color: "#fff", fontSize: 11, fontWeight: 500 }}>{val}</div>
                    </div>
                  ))}
                  <div style={{ height: 24, display: "flex", alignItems: "flex-end", gap: 2, marginTop: 10 }}>
                    {[[40,false],[60,false],[50,false],[80,true],[70,true],[90,true],[100,true]].map(([h,active],i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, background: active ? "#86efac" : "rgba(134,239,172,0.25)", borderRadius: "2px 2px 0 0" }} />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 40%,rgba(0,0,0,0.55) 100%)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, zIndex: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", marginBottom: 4 }}>Production</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.55)" }}>Deployed · Scalable · CI/CD</div>
              </div>
            </div>

            {/* Card 4 — Engineering */}
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer", aspectRatio: "3/4", border: "0.5px solid rgba(255,255,255,0.09)", background: "#1c1c1e", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.02)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "85%", background: "#252528", borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 8.5, border: "0.5px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ marginBottom: 4, color: "rgba(255,255,255,0.3)" }}>{"// route handler"}</div>
                  <div style={{ marginBottom: 4 }}><span style={{ color: "#c084fc" }}>async function</span> <span style={{ color: "#7dd3fc" }}>handler</span>(req) {"{"}</div>
                  <div style={{ marginBottom: 4 }}>&nbsp;&nbsp;<span style={{ color: "#c084fc" }}>const</span> data = <span style={{ color: "#c084fc" }}>await</span></div>
                  <div style={{ marginBottom: 4 }}>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#7dd3fc" }}>db</span>.<span style={{ color: "#7dd3fc" }}>query</span>(<span style={{ color: "#86efac" }}>`SELECT *`</span>)</div>
                  <div style={{ marginBottom: 4 }}>&nbsp;&nbsp;<span style={{ color: "#c084fc" }}>return</span> <span style={{ color: "#7dd3fc" }}>transform</span>(data)</div>
                  <div>{"}"}</div>
                  <div style={{ marginTop: 10, display: "flex", gap: 6, alignItems: "center" }}>
                    {["API","Queue","DB"].map((node, i, arr) => (
                      <span key={node} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ background: "rgba(124,58,237,0.2)", border: "0.5px solid rgba(124,58,237,0.4)", borderRadius: 5, padding: "4px 7px", fontSize: 8, color: "#c084fc" }}>{node}</span>
                        {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 40%,rgba(0,0,0,0.55) 100%)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, zIndex: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", marginBottom: 4 }}>Engineering</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.55)" }}>Clean Code · Architecture</div>
              </div>
            </div>

            {/* Card 5 — Content & Brand */}
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", cursor: "pointer", aspectRatio: "3/4", border: "0.5px solid rgba(255,255,255,0.09)", background: "#fff5f0", transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px) scale(1.02)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "none"}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "88%", background: "#fff", borderRadius: 8, border: "0.5px solid #f0e4dc", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ background: "#ff4d2a", padding: "6px 10px" }}>
                    <span style={{ fontFamily: "Syne,sans-serif", fontSize: 9, fontWeight: 700, color: "#fff" }}>INNOVIX STUDIO</span>
                  </div>
                  <div style={{ padding: 10 }}>
                    <div style={{ fontFamily: "Syne,sans-serif", fontSize: 11, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 6 }}>Design that<br />converts.</div>
                    <div style={{ fontFamily: "monospace", fontSize: 8, color: "#9e9a92", marginBottom: 8 }}>UI · Copy · Identity</div>
                    <div style={{ background: "#ff4d2a", color: "#fff", fontSize: 8, fontFamily: "Syne,sans-serif", fontWeight: 700, padding: "4px 10px", borderRadius: 4, display: "inline-block" }}>Book a call →</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                      {["#ff4d2a","#1a1a1a","#fff5f0","#f5a623"].map((col, i) => (
                        <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: col, border: col === "#fff5f0" ? "0.5px solid #f0ddd5" : "none" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,transparent 30%,rgba(20,5,0,0.55) 100%)", zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 14, zIndex: 3 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Syne,sans-serif", marginBottom: 4 }}>Content & Brand</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.6)" }}>UI · Copy · Visual Identity</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bio + Skills ── */}
      <div className="py-24 px-6 relative">
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "rgba(167,139,250,0.04)", filter: "blur(140px)" }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <p style={{ color: "#a78bfa", fontSize: 11, letterSpacing: "0.12em", fontFamily: "Inter,sans-serif", textTransform: "uppercase", marginBottom: 14 }}>A bit about me</p>
                <h2 className="text-white" style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: "clamp(32px,5vw,40px)", lineHeight: 1.1 }}>Who I Am</h2>
                <div className="mt-3 w-10 h-px" style={{ background: "linear-gradient(to right, #6c63ff, transparent)" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "#9AA0A6", fontSize: 15, lineHeight: 1.7, fontFamily: "Inter,sans-serif" }}>
                <p>CS graduate from <span style={{ color: "#fff", fontWeight: 500 }}>VIT Chennai</span> (AI and ML, 2025). I build full-stack AI applications that solve real problems, not just demos that break in production.</p>
                <p>Interned at <span style={{ color: "#fff", fontWeight: 500 }}>Berger Paints</span> where I built and deployed ML models into a live analytics dashboard, cutting reporting time by 25% across 4 Agile sprints.</p>
                <p>Built and designed <span style={{ color: "#fff", fontWeight: 500 }}>Innovix</span> for a client — Jammu&apos;s first psychology-driven branding studio. Also built MindCare, an AI mental health chatbot with LLMs and real-time emotion detection.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
                {[
                  { title: "Berger Paints — ML Intern", period: "2024", detail: "Built ML models for analytics. Cut reporting time by 25%." },
                  { title: "VIT Chennai — AI and ML",   period: "2021–2025", detail: "B.Tech in Computer Science with AI/ML specialization." },
                ].map((exp) => (
                  <div key={exp.title} className="flex items-start gap-4"
                    style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(13,17,32,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ width: 2, alignSelf: "stretch", borderRadius: 9999, background: "linear-gradient(to bottom, #6c63ff, #a78bfa)", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                        <p style={{ color: "#fff", fontWeight: 600, fontSize: 13, fontFamily: "Syne,sans-serif" }}>{exp.title}</p>
                        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontFamily: "Inter,sans-serif" }}>{exp.period}</span>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "Inter,sans-serif", marginTop: 3 }}>{exp.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <div>
                <p style={{ color: "#a78bfa", fontSize: 11, letterSpacing: "0.12em", fontFamily: "Inter,sans-serif", textTransform: "uppercase", marginBottom: 14 }}>Core Stack</p>
                <h2 className="text-white" style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: "clamp(32px,5vw,40px)", lineHeight: 1.1 }}>Skills</h2>
                <div className="mt-3 w-10 h-px" style={{ background: "linear-gradient(to right, #6c63ff, transparent)" }} />
              </div>
              <div ref={gridRef} className="grid grid-cols-4 gap-3">
                {skills.map((skill) => (
                  <div key={skill.label} className="skill-item flex flex-col items-center gap-2"
                    style={{ padding: "14px 8px", borderRadius: 14, background: "rgba(13,17,32,0.6)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0, transform: "translateY(14px) scale(0.95)", transition: "opacity 0.4s ease, transform 0.4s ease, border-color 0.25s, background 0.25s", cursor: "default" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(108,99,255,0.4)"; el.style.background = "rgba(108,99,255,0.06)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "rgba(13,17,32,0.6)"; }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={skill.src} alt={skill.label} style={{ width: 30, height: 30, objectFit: "contain" }} />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "Inter,sans-serif", textAlign: "center", lineHeight: 1.3 }}>{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}