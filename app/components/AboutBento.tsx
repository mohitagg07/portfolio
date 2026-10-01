"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now)
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    { title: "Websites & Web Apps", desc: "Fast, responsive sites built with Next.js, React, and modern tools.", icon: "◈" },
    { title: "AI Products & Tools", desc: "Custom chatbots, document analyzers, and intelligent automation.", icon: "◉" },
    { title: "Design & Experience", desc: "Clean interfaces, intuitive flows, and memorable brand identities.", icon: "◆" },
    { title: "Content & Media", desc: "YouTube vlogs, tech stories, and creative digital narratives.", icon: "◇" },
  ];

  return (
    <section ref={sectionRef} id="about" className="section-spacer" style={{ position: "relative" }}>
      <div className="section-wrap">
        {/* Section label */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="label-tag">About</span>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 60,
            marginTop: 48,
          }}
          className="md:!grid-cols-[1.2fr_1fr]"
        >
          {/* Left: text content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              Building digital
              <br />
              products with{" "}
              <span style={{ color: "#c8ff00", fontStyle: "italic" }}>purpose</span>
            </h2>

            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.8,
                color: "#8a8a80",
                maxWidth: 500,
                marginBottom: 40,
              }}
            >
              I&apos;m Mohit Aggarwal — an AI engineer and full-stack developer based in
              Jammu, J&amp;K. I build clean, purposeful digital experiences that combine
              modern web technologies with intelligent systems. When I&apos;m not coding,
              you&apos;ll find me creating content on YouTube.
            </p>

            {/* Quick facts grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#c8ff00", letterSpacing: "-0.03em" }}>15+</div>
                <div style={{ fontSize: 12, color: "#8a8a80", fontWeight: 500, marginTop: 4 }}>Projects Shipped</div>
              </div>
              <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: "#f5f5f0", letterSpacing: "-0.03em" }}>100%</div>
                <div style={{ fontSize: 12, color: "#8a8a80", fontWeight: 500, marginTop: 4 }}>Client Satisfaction</div>
              </div>
              <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#f5f5f0" }}>Jammu, J&amp;K</div>
                <div style={{ fontSize: 12, color: "#8a8a80", fontWeight: 500, marginTop: 4 }}>Based in India</div>
              </div>
              <div style={{ padding: 20, borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Inter', monospace", color: "#c8ff00" }}>{timeStr || "—"}</div>
                <div style={{ fontSize: 12, color: "#8a8a80", fontWeight: 500, marginTop: 4 }}>Local Time (IST)</div>
              </div>
            </div>
          </div>

          {/* Right: capabilities */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <h3
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#8a8a80",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              What I do
            </h3>

            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                style={{
                  padding: "24px 28px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,255,0,0.2)";
                  e.currentTarget.style.background = "rgba(200,255,0,0.03)";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 18, color: "#c8ff00" }}>{cap.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f0", fontFamily: "'Syne', sans-serif" }}>{cap.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "#8a8a80", lineHeight: 1.6, paddingLeft: 30 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
