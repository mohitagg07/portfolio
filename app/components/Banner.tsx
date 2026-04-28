"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import VisitorBadge from "./VisitorBadge";
import GitHubStats from "./GitHubStats";

export default function Banner(): React.JSX.Element {
  const texts = ["AI Engineer", "Full Stack Builder", "Shipped to Production", "ML Systems Builder"];
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
        const t = setTimeout(() => { setIsDeleting(true); setTypingSpeed(50); }, 2000);
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
    for (let i = 0; i < 180; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2 + 0.2, alpha: Math.random() * 0.6 + 0.2, speed: Math.random() * 0.003 + 0.001, twinkle: Math.random() * Math.PI * 2 });
    }
    for (let i = 0; i < 4; i++) comets.push({ x: 0, y: 0, vx: 0, vy: 0, length: 0, alpha: 0, active: false });

    const spawnComet = (c: typeof comets[0]) => {
      c.x = Math.random() * canvas.width * 0.5; c.y = 0;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const speed = 6 + Math.random() * 5;
      c.vx = Math.cos(angle) * speed; c.vy = Math.sin(angle) * speed;
      c.length = 80 + Math.random() * 100; c.alpha = 0.7 + Math.random() * 0.2; c.active = true;
    };
    comets.forEach((c, i) => setTimeout(() => spawnComet(c), i * 2000 + Math.random() * 2000));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.twinkle += s.speed;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,170,255,${a})`; ctx.fill();
      });
      comets.forEach((c) => {
        if (!c.active) return;
        const grad = ctx.createLinearGradient(c.x - c.vx * (c.length / 6), c.y - c.vy * (c.length / 6), c.x, c.y);
        grad.addColorStop(0, `rgba(108,99,255,0)`); grad.addColorStop(0.6, `rgba(167,139,250,${c.alpha * 0.4})`); grad.addColorStop(1, `rgba(255,255,255,${c.alpha})`);
        ctx.beginPath(); ctx.moveTo(c.x - c.vx * (c.length / 6), c.y - c.vy * (c.length / 6)); ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(c.x, c.y, 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${c.alpha})`; ctx.fill();
        c.x += c.vx; c.y += c.vy; c.alpha -= 0.008;
        if (c.alpha <= 0 || c.x > canvas.width + 100 || c.y > canvas.height + 100) {
          c.active = false; setTimeout(() => spawnComet(c), 2000 + Math.random() * 4000);
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#6c63ff]/8 blur-[140px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] rounded-full bg-[#a78bfa]/7 blur-[100px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto max-w-6xl relative" style={{ zIndex: 10 }}>
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Photo */}
          <div className="flex justify-center w-full lg:w-[42%] order-first lg:order-last animate-fade-up-delay-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ background: "conic-gradient(from 0deg, transparent 50%, #6c63ff 70%, #a78bfa 85%, transparent)", padding: "2px", borderRadius: "50%", width: "calc(100% + 12px)", height: "calc(100% + 12px)", top: "-6px", left: "-6px" }} />
              <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-[#6c63ff]/35 shadow-2xl animate-float" style={{ boxShadow: "0 0 60px rgba(108,99,255,0.28), 0 0 120px rgba(108,99,255,0.1)" }}>
                <Image src="/assets/mohit-photo-crop.png" alt="Mohit Aggarwal" fill sizes="(max-width: 768px) 240px, 288px" className="object-cover object-top" style={{ filter: "brightness(0.92) contrast(1.08) saturate(1.05)" }} priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/50 via-transparent to-transparent" />
              </div>
              {/* Badges */}
              <div className="absolute -left-8 top-8 flex items-center gap-2 bg-[#0d1120]/90 backdrop-blur-md border border-[#6c63ff]/20 rounded-xl px-3 py-2 text-xs text-white/75 font-[family-name:var(--font-outfit)] shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
                <svg className="w-3.5 h-3.5 text-[#6c63ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Full Stack Dev
              </div>
              <div className="absolute -right-8 bottom-8 flex items-center gap-2 bg-[#0d1120]/90 backdrop-blur-md border border-[#a78bfa]/20 rounded-xl px-3 py-2 text-xs text-white/75 font-[family-name:var(--font-outfit)] shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <svg className="w-3.5 h-3.5 text-[#a78bfa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                AI Builder
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 space-y-5 text-center lg:text-left lg:w-[58%] order-last lg:order-first">
            {/* Name */}
            <div className="animate-fade-up-delay-1 space-y-1">
              <p className="text-white/40 text-[15px] font-[family-name:var(--font-outfit)]">Hey there, I am</p>
              <h1 className="font-extrabold leading-[1.05] tracking-tight font-[family-name:var(--font-syne)]" style={{ fontSize: "clamp(48px, 8vw, 64px)" }}>
                <span className="text-white">Mohit</span>
                <br />
                <span className="text-gradient">Aggarwal</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="animate-fade-up-delay-2">
              <p className="text-xl lg:text-2xl text-white/75 font-[family-name:var(--font-outfit)]">
                <span className="text-[#6c63ff] font-semibold">{displayedText}</span>
                <span className="animate-blink text-[#6c63ff]">|</span>
              </p>
            </div>

            <p className="animate-fade-up-delay-3 text-[16px] text-white/45 max-w-[420px] mx-auto lg:mx-0 font-[family-name:var(--font-outfit)] leading-[1.65]">
              Building production-ready AI systems. From legal document analysis to real-time emotion-aware chatbots. I turn ideas into products.
            </p>

            {/* Stats + visitor count */}
            <div className="animate-fade-up-delay-4 space-y-4">
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4 border-t border-white/5">
                <GitHubStats />
              </div>
              <div className="flex justify-center lg:justify-start">
                <VisitorBadge />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/25 text-xs font-[family-name:var(--font-outfit)]">
          <span>scroll</span>
          <svg className="w-3.5 h-3.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
