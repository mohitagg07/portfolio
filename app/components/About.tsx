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
    <section id="about" style={{ position: "relative", overflow: "hidden" }}>

      {/* ── Big Typography Statement ── */}
      <div className="section-block" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 700, height: 400, background: "rgba(108,99,255,0.05)", filter: "blur(120px)", borderRadius: "50%" }} />

        <div className="container-fluid" style={{ position: "relative", zIndex: 10 }}>
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

      {/* ── Bio + Skills ── */}
      <div className="section-block">
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "rgba(167,139,250,0.04)", filter: "blur(140px)" }} />

        <div className="container-fluid" style={{ position: "relative", zIndex: 10 }}>
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
              <div ref={gridRef} className="grid grid-cols-4 gap-x-4 gap-y-6">
                {skills.map((skill) => (
                  <div key={skill.label} className="skill-item flex flex-col items-center gap-2.5"
                    style={{ opacity: 0, transform: "translateY(14px) scale(0.95)", transition: "opacity 0.4s ease, transform 0.4s ease", cursor: "default" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={skill.src}
                      alt={skill.label}
                      style={{ width: 36, height: 36, objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))", transition: "transform 0.2s ease, filter 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "translateY(-3px) scale(1.12)"; (e.currentTarget as HTMLImageElement).style.filter = "drop-shadow(0 6px 16px rgba(108,99,255,0.35))"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "translateY(0) scale(1)"; (e.currentTarget as HTMLImageElement).style.filter = "drop-shadow(0 2px 8px rgba(0,0,0,0.4))"; }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 10.5, fontFamily: "Outfit,sans-serif", textAlign: "center", lineHeight: 1.3, letterSpacing: "0.01em" }}>{skill.label}</span>
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