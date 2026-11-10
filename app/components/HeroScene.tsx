"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import HeroGreeting from "./HeroGreeting";

const GRID_STEP = 46;
const INFLUENCE_RADIUS = 170;
const MAX_DISPLACEMENT = 7;

type GridPoint = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
};

export default function HeroScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const section = sectionRef.current;
    if (!section) return;

    const bounds = section.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    section.style.setProperty("--hero-depth-x", `${(x * 5).toFixed(2)}px`);
    section.style.setProperty("--hero-depth-y", `${(y * 4).toFixed(2)}px`);
    section.style.setProperty("--hero-tilt-x", `${(-y * 0.3).toFixed(2)}deg`);
    section.style.setProperty("--hero-tilt-y", `${(x * 0.3).toFixed(2)}deg`);
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
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !section || !context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let points: GridPoint[] = [];
    let visible = document.visibilityState === "visible";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const pointer = { x: -1000, y: -1000, active: false };

    const paint = () => {
      context.clearRect(0, 0, width, height);

      context.beginPath();
      context.strokeStyle = "rgba(190, 226, 195, 0.045)";
      context.lineWidth = 0.65;
      for (let x = 0; x <= width; x += GRID_STEP) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += GRID_STEP) {
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      context.stroke();

      for (const point of points) {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distance = pointer.active ? Math.hypot(dx, dy) : INFLUENCE_RADIUS;
        const influence = pointer.active
          ? Math.max(0, 1 - distance / INFLUENCE_RADIUS)
          : 0;

        context.beginPath();
        context.fillStyle = `rgba(205, 231, 201, ${0.20 + influence * 0.34})`;
        context.arc(point.x, point.y, 0.8 + influence * 0.8, 0, Math.PI * 2);
        context.fill();
      }
    };

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
      for (let y = 20; y < height; y += GRID_STEP) {
        for (let x = 20; x < width; x += GRID_STEP) {
          points.push({ x, y, originX: x, originY: y, vx: 0, vy: 0 });
        }
      }
      paint();
    };

    const animate = () => {
      frame = 0;
      let stillMoving = false;

      for (const point of points) {
        const dx = point.originX - pointer.x;
        const dy = point.originY - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = pointer.active
          ? Math.max(0, 1 - distance / INFLUENCE_RADIUS)
          : 0;
        const directionX = distance > 0 ? dx / distance : 0;
        const directionY = distance > 0 ? dy / distance : 0;
        const targetX = point.originX + directionX * influence * MAX_DISPLACEMENT;
        const targetY = point.originY + directionY * influence * MAX_DISPLACEMENT;

        point.vx = (point.vx + (targetX - point.x) * 0.16) * 0.72;
        point.vy = (point.vy + (targetY - point.y) * 0.16) * 0.72;
        point.x += point.vx;
        point.y += point.vy;

        if (
          Math.abs(targetX - point.x) > 0.08 ||
          Math.abs(targetY - point.y) > 0.08 ||
          Math.abs(point.vx) > 0.08 ||
          Math.abs(point.vy) > 0.08
        ) {
          stillMoving = true;
        } else {
          point.x = targetX;
          point.y = targetY;
          point.vx = 0;
          point.vy = 0;
        }
      }

      paint();
      if (stillMoving && visible && !reduced && !coarse) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const schedule = () => {
      if (!frame && visible && !reduced && !coarse) {
        frame = window.requestAnimationFrame(animate);
      }
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
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        schedule();
      }
    };

    section.addEventListener("pointermove", onPointer, { passive: true });
    section.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    resize();

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
      <HeroGreeting />
      <div className="hero-v3__ticker" aria-hidden="true">
        <div className="hero-v3__ticker-track">
          <span>AI SYSTEMS <i>✳</i> SOFTWARE ENGINEERING <i>✳</i> AUTOMATION <i>✳</i> PRODUCT BUILDING <i>✳</i></span>
          <span>AI SYSTEMS <i>✳</i> SOFTWARE ENGINEERING <i>✳</i> AUTOMATION <i>✳</i> PRODUCT BUILDING <i>✳</i></span>
        </div>
      </div>
    </section>
  );
}
