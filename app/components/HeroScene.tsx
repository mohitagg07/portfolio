"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import HeroGreeting from "./HeroGreeting";

const GRID_STEP = 42;

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const section = sectionRef.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    section.style.setProperty("--hero-depth-x", `${(x * 5).toFixed(2)}px`);
    section.style.setProperty("--hero-depth-y", `${(y * 4).toFixed(2)}px`);
    section.style.setProperty("--hero-tilt-x", `${(-y * 0.35).toFixed(2)}deg`);
    section.style.setProperty("--hero-tilt-y", `${(x * 0.35).toFixed(2)}deg`);
    section.style.setProperty("--hero-pointer-x", `${event.clientX - bounds.left}px`);
    section.style.setProperty("--hero-pointer-y", `${event.clientY - bounds.top}px`);
  };

  const resetPointer = () => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.setProperty("--hero-depth-x", "0px");
    section.style.setProperty("--hero-depth-y", "0px");
    section.style.setProperty("--hero-tilt-x", "0deg");
    section.style.setProperty("--hero-tilt-y", "0deg");
  };

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let points: Array<{ x: number; y: number; ox: number; oy: number; vx: number; vy: number }> = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let visible = true;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = [];
      for (let y = 18; y < height; y += GRID_STEP) {
        for (let x = 18; x < width; x += GRID_STEP) {
          points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
      paint();
    };

    const paint = () => {
      context.clearRect(0, 0, width, height);
      for (const point of points) {
        const dx = pointer.active ? point.x - pointer.x : 0;
        const dy = pointer.active ? point.y - pointer.y : 0;
        const distance = Math.hypot(dx, dy);
        const radius = pointer.active && distance < 190 ? (1 - distance / 190) * 5 : 0;
        const alpha = pointer.active && distance < 190 ? 0.23 + (1 - distance / 190) * 0.3 : 0.2;
        context.beginPath();
        context.fillStyle = `rgba(190, 226, 195, ${alpha})`;
        context.arc(point.ox + (radius ? dx / Math.max(distance, 1) * radius : 0), point.oy + (radius ? dy / Math.max(distance, 1) * radius : 0), radius ? 1.35 : 0.85, 0, Math.PI * 2);
        context.fill();
      }
    };

    const animate = () => {
      frame = 0;
      for (const point of points) {
        const dx = point.ox - point.x;
        const dy = point.oy - point.y;
        point.vx = (point.vx + dx * 0.16) * 0.72;
        point.vy = (point.vy + dy * 0.16) * 0.72;
        point.x += point.vx;
        point.y += point.vy;
      }
      paint();
      if (!reduced && !coarse && visible) frame = window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      if (!frame && !reduced && !coarse && visible) frame = window.requestAnimationFrame(animate);
    };
    const onPointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      schedule();
    };
    const onLeave = () => {
      pointer.active = false;
      schedule();
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (!visible && frame) window.cancelAnimationFrame(frame);
      else schedule();
    };

    section.addEventListener("pointermove", onPointer, { passive: true });
    section.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    resize();
    if (!reduced && !coarse) schedule();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => drawGrid(), [drawGrid]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-v3"
      aria-labelledby="hero-v3-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <Image
        src="/assets/hero-background.avif"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-v3__image"
        aria-hidden="true"
      />
      <div className="hero-v3__shade" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-v3__grid" aria-hidden="true" />
      <div className="hero-v3__annotation hero-v3__annotation--top" aria-hidden="true">
        <span>FIELD NOTES / 001</span><i /> <span>BUILDING WITH INTENT</span>
      </div>
      <div className="hero-v3__annotation hero-v3__annotation--right" aria-hidden="true">
        <span>01</span><span>IDEA</span><b />
        <span>02</span><span>BUILD</span><b />
        <span>03</span><span>REFINE</span>
      </div>
      <HeroGreeting />
      <div className="hero-v3__ticker" aria-hidden="true">
        <div className="hero-v3__ticker-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index}>AI SYSTEMS <i>✳</i> SOFTWARE ENGINEERING <i>✳</i> AUTOMATION <i>✳</i> PRODUCT BUILDING <i>✳</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}
