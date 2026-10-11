"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  depth: number;
  isAccent: boolean;
  alpha: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let mouseActive = false;

    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const isMobile = width < 768;
      const count = isMobile ? 32 : 64;

      for (let i = 0; i < count; i++) {
        const depth = 0.45 + Math.random() * 0.55;
        const speed = (0.2 + Math.random() * 0.35) * depth;
        const angle = Math.random() * Math.PI * 2;
        const isAccent = Math.random() < 0.2; // 20% vibrant lime nodes

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: isAccent ? (isMobile ? 2.2 : 2.8) : (isMobile ? 1.5 : 2.0),
          depth,
          isAccent,
          alpha: isAccent ? 0.9 : 0.45 + depth * 0.35,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = (parent && parent.clientWidth > 0) ? parent.clientWidth : window.innerWidth;
      height = (parent && parent.clientHeight > 0) ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();

      if (prefersReducedMotion) {
        drawFrame();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const onPointerLeave = () => {
      mouseActive = false;
    };

    const checkVisibility = () => {
      const scrollY = window.scrollY;
      const shouldBeVisible = scrollY < height * 1.2 && !document.hidden;
      if (shouldBeVisible !== isVisible) {
        isVisible = shouldBeVisible;
        if (isVisible && !prefersReducedMotion && !animId) {
          animId = requestAnimationFrame(loop);
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouseActive) {
        mouseX += (targetMouseX - mouseX) * 0.1;
        mouseY += (targetMouseY - mouseY) * 0.1;
      } else {
        mouseX += (-1000 - mouseX) * 0.05;
        mouseY += (-1000 - mouseY) * 0.05;
      }

      const connectionDist = width < 768 ? 100 : 145;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseDistThreshold = width < 768 ? 120 : 170;

      // Draw connective lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / connectionDist) * 0.38 * Math.min(p1.depth, p2.depth);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.isAccent || p2.isAccent) {
              ctx.strokeStyle = `rgba(200, 255, 0, ${lineAlpha * 1.35})`;
            } else {
              ctx.strokeStyle = `rgba(95, 220, 246, ${lineAlpha})`;
            }
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          if (mouseActive) {
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouseDistThreshold && mdist > 0.1) {
              const force = (1 - mdist / mouseDistThreshold) * 0.8 * p.depth;
              p.x += (mdx / mdist) * force * 2.2;
              p.y += (mdy / mdist) * force * 2.2;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        const radius = p.baseRadius * p.depth;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (p.isAccent) {
          ctx.fillStyle = `rgba(200, 255, 0, ${p.alpha})`;
          ctx.shadowColor = "rgba(200, 255, 0, 0.75)";
          ctx.shadowBlur = 9;
        } else {
          ctx.fillStyle = `rgba(95, 220, 246, ${p.alpha})`;
          ctx.shadowColor = "rgba(95, 220, 246, 0.5)";
          ctx.shadowBlur = 5;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      drawFrame();
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", checkVisibility, { passive: true });
    document.addEventListener("visibilitychange", checkVisibility);

    resize();

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", checkVisibility);
      document.removeEventListener("visibilitychange", checkVisibility);
    };
  }, []);

  return (
    <div className="hero-interactive-canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-interactive-canvas" />
    </div>
  );
}
