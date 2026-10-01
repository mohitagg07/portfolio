import type { MouseEvent } from "react";

const DURATION_MS = 480;
let cancelCurrentScroll: (() => void) | null = null;

export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  cancelCurrentScroll?.();

  const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  const start = window.scrollY;
  const end = Math.max(0, start + target.getBoundingClientRect().top - margin);
  const distance = end - start;

  if (Math.abs(distance) < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, end);
    return;
  }

  let startTime: number | undefined;
  let frame = 0;
  let complete = false;

  const cleanup = () => {
    if (complete) return;
    complete = true;
    window.cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel, true);
    window.removeEventListener("touchstart", cancel, true);
    window.removeEventListener("pointerdown", cancel, true);
    window.removeEventListener("keydown", onKeyDown, true);
    if (cancelCurrentScroll === cancel) cancelCurrentScroll = null;
  };

  const cancel = () => cleanup();
  const onKeyDown = (event: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) cancel();
  };

  const step = (now: number) => {
    if (complete) return;
    startTime ??= now;
    const progress = Math.min((now - startTime) / DURATION_MS, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) frame = window.requestAnimationFrame(step);
    else cleanup();
  };

  cancelCurrentScroll = cancel;
  window.addEventListener("wheel", cancel, { capture: true, passive: true });
  window.addEventListener("touchstart", cancel, { capture: true, passive: true });
  window.addEventListener("pointerdown", cancel, { capture: true, passive: true });
  window.addEventListener("keydown", onKeyDown, true);
  frame = window.requestAnimationFrame(step);
}

export function navigateToSection(event: MouseEvent<HTMLAnchorElement>, id: string): boolean {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.currentTarget.target === "_blank"
  ) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  event.preventDefault();
  const hash = `#${id}`;
  if (window.location.hash !== hash) window.history.pushState(window.history.state, "", hash);
  scrollToSection(id);
  return true;
}
