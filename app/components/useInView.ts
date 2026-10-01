"use client";

import { useEffect, useRef, useState } from "react";

// true once the element has scrolled into view (and stays true)
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

// Tracks current visibility so ambient motion can pause when a section leaves the screen.
export function useVisibility<T extends HTMLElement>(threshold = 0.05, rootMargin = "96px 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, visible] as const;
}

// A small, damped 3D response for the portrait and hero field; all movement stays on the transform layer.
export function useSpatialMotion<T extends HTMLElement>(maxTilt = 4, maxShift = 5, maxParallax = 12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const current = { x: 0, y: 0, rx: 0, ry: 0, scrollY: 0 };
    const target = { ...current };
    let inView = false;
    let motionFrame = 0;
    let scrollFrame = 0;

    const write = () => {
      element.style.setProperty("--spatial-x", `${current.x.toFixed(2)}px`);
      element.style.setProperty("--spatial-y", `${current.y.toFixed(2)}px`);
      element.style.setProperty("--spatial-rx", `${current.rx.toFixed(2)}deg`);
      element.style.setProperty("--spatial-ry", `${current.ry.toFixed(2)}deg`);
      element.style.setProperty("--spatial-scroll-y", `${current.scrollY.toFixed(2)}px`);
      element.style.setProperty("--spatial-light-x", `${(current.x / Math.max(maxShift, 1) * -50 + 50).toFixed(1)}%`);
      element.style.setProperty("--spatial-light-y", `${(current.y / Math.max(maxShift, 1) * -50 + 50).toFixed(1)}%`);
    };

    const animate = () => {
      if (reducedMotion || motionFrame) return;
      const tick = () => {
        motionFrame = 0;
        current.x += (target.x - current.x) * 0.14;
        current.y += (target.y - current.y) * 0.14;
        current.rx += (target.rx - current.rx) * 0.14;
        current.ry += (target.ry - current.ry) * 0.14;
        current.scrollY += (target.scrollY - current.scrollY) * 0.14;
        write();

        const settling = (Object.keys(current) as Array<keyof typeof current>).some((key) => Math.abs(target[key] - current[key]) > 0.015);
        if (settling) motionFrame = window.requestAnimationFrame(tick);
        else {
          Object.assign(current, target);
          write();
        }
      };
      motionFrame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!canTilt || reducedMotion || !inView) return;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      target.rx = -y * maxTilt;
      target.ry = x * maxTilt;
      target.x = -x * maxShift;
      target.y = -y * maxShift;
      animate();
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
      target.rx = 0;
      target.ry = 0;
      animate();
    };

    const onScroll = () => {
      if (reducedMotion || !inView || scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        if (!inView) {
          target.scrollY = 0;
          animate();
          return;
        }
        const bounds = element.getBoundingClientRect();
        const centerOffset = bounds.top + bounds.height / 2 - window.innerHeight / 2;
        target.scrollY = Math.max(-maxParallax, Math.min(maxParallax, -centerOffset * 0.014));
        animate();
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      setVisible(inView);
      if (inView) onScroll();
      else {
        target.x = 0;
        target.y = 0;
        target.rx = 0;
        target.ry = 0;
        target.scrollY = 0;
        animate();
      }
    }, { threshold: 0.01, rootMargin: "220px 0px" });

    element.addEventListener("pointermove", onPointerMove, { passive: true });
    element.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(motionFrame);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, [maxTilt, maxShift, maxParallax]);

  return [ref, visible] as const;
}
