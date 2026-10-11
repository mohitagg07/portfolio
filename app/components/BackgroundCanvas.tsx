"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  depth: number; // 0.4 to 1.0 (for parallax / depth sizing)
  isAccent: boolean;
  alpha: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer coordinates with smoothed interpolation
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let mouseActive = false;

    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      const isMobile = width < 768;
      const count = isMobile ? 32 : 68;

      for (let i = 0; i < count; i++) {
        const depth = 0.4 + Math.random() * 0.6;
        const speed = (0.15 + Math.random() * 0.35) * depth;
        const angle = Math.random() * Math.PI * 2;
        // 1 in 7 nodes has an electric lime accent
        const isAccent = Math.random() < 0.15;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: isAccent ? (isMobile ? 1.8 : 2.4) : (isMobile ? 1.2 : 1.8),
          depth,
          isAccent,
          alpha: isAccent ? 0.75 : 0.35 + depth * 0.35,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
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
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      mouseActive = true;
    };

    const onPointerLeave = () => {
      mouseActive = false;
    };

    // Pause animation when scrolled well past hero to conserve GPU/CPU
    const checkVisibility = () => {
      const scrollY = window.scrollY;
      const shouldBeVisible = scrollY < window.innerHeight * 1.3 && !document.hidden;
      if (shouldBeVisible !== isVisible) {
        isVisible = shouldBeVisible;
        if (isVisible && !prefersReducedMotion && !animId) {
          animId = requestAnimationFrame(loop);
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouseActive) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      } else {
        mouseX += (-1000 - mouseX) * 0.05;
        mouseY += (-1000 - mouseY) * 0.05;
      }

      const connectionDist = width < 768 ? 95 : 135;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseDistThreshold = width < 768 ? 110 : 160;

      // 1. Draw subtle connective lines between particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / connectionDist) * 0.22 * Math.min(p1.depth, p2.depth);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.isAccent || p2.isAccent) {
              ctx.strokeStyle = `rgba(200, 255, 0, ${lineAlpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(160, 205, 250, ${lineAlpha})`;
            }
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Mouse gentle gravitational / repulsion response
          if (mouseActive) {
            const mdx = p.x - mouseX;
            const mdy = p.y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouseDistThreshold && mdist > 0.1) {
              const force = (1 - mdist / mouseDistThreshold) * 0.6 * p.depth;
              p.x += (mdx / mdist) * force * 1.8;
              p.y += (mdy / mdist) * force * 1.8;
            }
          }

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges smoothly
          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;
        }

        const radius = p.baseRadius * p.depth;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        if (p.isAccent) {
          // Electric lime focal node
          ctx.fillStyle = `rgba(200, 255, 0, ${p.alpha})`;
          ctx.shadowColor = "rgba(200, 255, 0, 0.4)";
          ctx.shadowBlur = 8;
        } else {
          // Deep crystalline blue-silver node
          ctx.fillStyle = `rgba(180, 215, 255, ${p.alpha})`;
          ctx.shadowColor = "rgba(120, 180, 240, 0.25)";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for performance
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
    <div aria-hidden="true" className="ambient-scene">
      <div className="ambient-scene__grid" />
      <div className="ambient-scene__aurora" />
      <canvas ref={canvasRef} className="ambient-scene__canvas" />
    </div>
  );
}
