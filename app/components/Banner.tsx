"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import VisitorBadge from "./VisitorBadge";
import GitHubStats from "./GitHubStats";

export default function Banner(): React.JSX.Element {
  const texts = ["AI Engineer", "Full Stack Builder", "Lifestyle Creator", "ML Systems Builder"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const t = setTimeout(() => setDisplayedText(currentText.slice(0, displayedText.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => { setIsDeleting(true); setTypingSpeed(45); }, 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayedText.length > 0) {
        const t = setTimeout(() => setDisplayedText(currentText.slice(0, displayedText.length - 1)), typingSpeed);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setTypingSpeed(100);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, isDeleting, currentTextIndex, typingSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; r: number; alpha: number; speed: number; twinkle: number }[] = [];
    const comets: { x: number; y: number; vx: number; vy: number; length: number; alpha: number; active: boolean }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.3 + 0.2, alpha: Math.random() * 0.5 + 0.15, speed: Math.random() * 0.003 + 0.001, twinkle: Math.random() * Math.PI * 2 });
    }
    for (let i = 0; i < 3; i++) comets.push({ x: 0, y: 0, vx: 0, vy: 0, length: 0, alpha: 0, active: false });

    const spawnComet = (c: typeof comets[0]) => {
      c.x = Math.random() * canvas.width * 0.5; c.y = 0;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const speed = 7 + Math.random() * 5;
      c.vx = Math.cos(angle) * speed; c.vy = Math.sin(angle) * speed;
      c.length = 90 + Math.random() * 110; c.alpha = 0.75; c.active = true;
    };
    comets.forEach((c, i) => setTimeout(() => spawnComet(c), i * 2500 + Math.random() * 2000));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.twinkle += s.speed;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190,180,255,${a})`; ctx.fill();
      });
      comets.forEach((c) => {
        if (!c.active) return;
        const grad = ctx.createLinearGradient(c.x - c.vx * (c.length / 6), c.y - c.vy * (c.length / 6), c.x, c.y);
        grad.addColorStop(0, `rgba(108,99,255,0)`);
        grad.addColorStop(0.6, `rgba(167,139,250,${c.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${c.alpha})`);
        ctx.beginPath(); ctx.moveTo(c.x - c.vx * (c.length / 6), c.y - c.vy * (c.length / 6)); ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(c.x, c.y, 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${c.alpha})`; ctx.fill();
        c.x += c.vx; c.y += c.vy; c.alpha -= 0.007;
        if (c.alpha <= 0 || c.x > canvas.width + 100 || c.y > canvas.height + 100) {
          c.active = false; setTimeout(() => spawnComet(c), 2500 + Math.random() * 4000);
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: 96,
        paddingBottom: 48,
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "20%", left: "28%", width: 560, height: 560, borderRadius: "50%", background: "rgba(108,99,255,0.09)", filter: "blur(150px)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: "20%", right: "18%", width: 300, height: 300, borderRadius: "50%", background: "rgba(167,139,250,0.07)", filter: "blur(110px)", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }} className="grid-bg opacity-20 pointer-events-none" />

      {/* Unified container — same padding as all other sections */}
      <div
        className="container-fluid"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="banner-row" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(32px, 6vw, 64px)", justifyContent: "space-between" }}>

          {/* ── Left: Text ── */}
          <div className="banner-text" style={{ flex: "1 1 320px", minWidth: 0, maxWidth: 560 }}>

            {/* Intro line */}
            <div className="animate-fade-up" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ display: "inline-block", width: 28, height: 1.5, background: "rgba(108,99,255,0.6)", borderRadius: 999 }} />
              <span style={{ color: "rgba(255,255,255,0.38)", fontSize: 13.5, fontFamily: "Outfit,sans-serif", letterSpacing: "0.04em" }}>Hey there, I&apos;m</span>
            </div>

            {/* Name */}
            <h1 className="animate-fade-up-delay-1" style={{ marginBottom: 6, letterSpacing: "-0.03em" }}>
              <span style={{ color: "#fff" }}>Mohit</span><br />
              <span className="text-gradient">Aggarwal</span>
            </h1>

            {/* Typewriter */}
            <div className="animate-fade-up-delay-2" style={{ marginBottom: 20 }}>
              <p style={{ fontSize: "clamp(17px,2.5vw,22px)", color: "rgba(255,255,255,0.72)", fontFamily: "Outfit,sans-serif", fontWeight: 500 }}>
                <span style={{ color: "#8b82ff", fontWeight: 600 }}>{displayedText}</span>
                <span className="animate-blink" style={{ color: "#8b82ff" }}>|</span>
              </p>
            </div>

            {/* Bio */}
            <p className="animate-fade-up-delay-3" style={{ fontSize: 15.5, color: "rgba(255,255,255,0.42)", maxWidth: 440, lineHeight: 1.75, marginBottom: 32, fontFamily: "Outfit,sans-serif" }}>
              Building production-ready AI systems that ship to production. I turn complex ideas into real products. Off the clock — capturing life, places, and raw moments on YouTube.
            </p>

            {/* Identity chips */}
            <div className="animate-fade-up-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {["AI Builder", "Full Stack Dev", "Lifestyle Creator", "Ships to Prod"].map((chip) => (
                <span key={chip} style={{
                  display: "inline-flex", alignItems: "center", padding: "5px 13px",
                  borderRadius: 999, fontSize: 12, fontWeight: 600,
                  background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)",
                  color: "rgba(167,139,250,0.9)", fontFamily: "Outfit,sans-serif",
                  letterSpacing: "0.02em",
                }}>
                  {chip}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="animate-fade-up-delay-4" style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 40px" }}>
                <GitHubStats />
              </div>
              <VisitorBadge />
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className="animate-fade-up-delay-2 banner-photo" style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ position: "relative" }}>
              {/* Spinning ring */}
              <div className="animate-spin-slow" style={{ position: "absolute", inset: -7, borderRadius: "50%", background: "conic-gradient(from 0deg, transparent 50%, #6c63ff 72%, #a78bfa 88%, transparent)", padding: 2 }} />
              {/* Photo */}
              <div
                className="animate-float"
                style={{ position: "relative", width: "clamp(220px,32vw,290px)", height: "clamp(220px,32vw,290px)", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(108,99,255,0.35)", boxShadow: "0 0 70px rgba(108,99,255,0.25), 0 0 140px rgba(108,99,255,0.1)" }}
              >
                <Image src="/assets/mohit-photo-crop.png" alt="Mohit Aggarwal" fill sizes="290px" style={{ objectFit: "cover", objectPosition: "top", filter: "brightness(0.93) contrast(1.07)" }} priority />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,8,16,0.45) 0%, transparent 50%)" }} />
              </div>
              {/* Badge 1 */}
              <div className="animate-float" style={{ position: "absolute", left: -16, top: 24, display: "flex", alignItems: "center", gap: 7, background: "rgba(10,12,28,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: 12, padding: "8px 13px", fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Outfit,sans-serif", animationDelay: "0.6s", whiteSpace: "nowrap" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#8b82ff" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Full Stack Dev
              </div>
              {/* Badge 2 */}
              <div className="animate-float" style={{ position: "absolute", right: -20, bottom: 28, display: "flex", alignItems: "center", gap: 7, background: "rgba(10,12,28,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, padding: "8px 13px", fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Outfit,sans-serif", animationDelay: "1.1s", whiteSpace: "nowrap" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                Lifestyle Creator
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 56, color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "Outfit,sans-serif", letterSpacing: "0.06em" }}>
          <span>scroll</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ animation: "float 2s ease-in-out infinite" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
