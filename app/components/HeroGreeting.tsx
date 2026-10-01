"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const roles = ["AI Engineer", "Full-Stack Developer", "Creative Builder", "Content Creator"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  useEffect(() => {
    const current = roles[roleIdx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < current.length) {
            setText(current.slice(0, text.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          if (text.length > 0) {
            setText(current.slice(0, text.length - 1));
          } else {
            setDeleting(false);
            setRoleIdx((prev) => (prev + 1) % roles.length);
          }
        }
      },
      deleting ? 30 : 65
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, deleting, roleIdx]);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large ambient glow behind hero */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "60vh",
          background: "radial-gradient(ellipse, rgba(200,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-wrap" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            maxWidth: 900,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Status pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
              width: "fit-content",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c8ff00",
                boxShadow: "0 0 12px rgba(200,255,0,0.6)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: 12, fontWeight: 500, color: "#8a8a80", letterSpacing: "0.02em" }}>
              Available for new projects
            </span>
          </div>

          {/* Main heading */}
          <div>
            <h1
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
              }}
            >
              <span style={{ display: "block", color: "#f5f5f0" }}>I build things</span>
              <span style={{ display: "block", color: "#f5f5f0" }}>
                that{" "}
                <span
                  style={{
                    color: "#c8ff00",
                    fontStyle: "italic",
                    position: "relative",
                  }}
                >
                  think
                  <svg
                    viewBox="0 0 200 12"
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "100%",
                      height: 12,
                      overflow: "visible",
                    }}
                  >
                    <path
                      d="M 0 8 Q 50 0, 100 6 Q 150 12, 200 4"
                      fill="none"
                      stroke="#c8ff00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                      style={{
                        animation: heroVisible ? "drawLine 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards" : "none",
                      }}
                    />
                  </svg>
                </span>
                .
              </span>
            </h1>
          </div>

          {/* Typing role */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontFamily: "'Inter', monospace",
              fontSize: "clamp(16px, 2.5vw, 22px)",
              fontWeight: 400,
              color: "#8a8a80",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            <span style={{ color: "#c8ff00", marginRight: 8 }}>→</span>
            <span style={{ color: "#f5f5f0" }}>{text}</span>
            <span
              style={{
                width: 2,
                height: "1.1em",
                background: "#c8ff00",
                marginLeft: 2,
                animation: "cursor-blink 1s step-end infinite",
              }}
            />
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              lineHeight: 1.7,
              color: "#8a8a80",
              maxWidth: 560,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            I craft fast, beautiful websites and intelligent AI products
            that solve real problems. Based in Jammu, building for the world.
          </p>

          {/* CTA Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
            }}
          >
            <a
              href="#work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: 999,
                background: "#c8ff00",
                color: "#050505",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View My Work
              <span style={{ fontSize: 18 }}>↓</span>
            </a>

            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#f5f5f0",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,255,0,0.3)";
                e.currentTarget.style.background = "rgba(200,255,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Say Hello →
            </a>
          </div>

          {/* Social links row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 8,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
            }}
          >
            {[
              { href: "https://github.com/mohitagg07", label: "GitHub", icon: "GH" },
              { href: "https://youtube.com/@MohitAgg07", label: "YouTube", icon: "YT" },
              { href: "https://linkedin.com/in/mohitagg07", label: "LinkedIn", icon: "LI" },
              { href: "mailto:mohitaggarwal2003@gmail.com", label: "Email", icon: "✉" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                title={s.label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8a8a80",
                  transition: "all 0.3s ease",
                  letterSpacing: "-0.02em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c8ff00";
                  e.currentTarget.style.color = "#c8ff00";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#8a8a80";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Floating photo — absolute positioned on desktop */}
        <div
          style={{
            position: "absolute",
            right: "clamp(24px, 5vw, 80px)",
            bottom: "15%",
            width: "clamp(160px, 18vw, 260px)",
            height: "clamp(200px, 22vw, 320px)",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0) rotate(2deg)" : "translateY(40px) rotate(6deg)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            animation: "float 8s ease-in-out infinite 2s",
          }}
          className="hidden lg:block"
        >
          <Image
            src="/assets/mohit-photo-crop.png"
            alt="Mohit Aggarwal"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.6) 100%)",
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: heroVisible ? 0.3 : 0,
          transition: "opacity 1.5s ease 1.5s",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 500, color: "#8a8a80", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(180deg, rgba(200,255,0,0.4), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
