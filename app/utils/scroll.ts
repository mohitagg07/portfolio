import type { MouseEvent } from "react";

export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const margin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  const start = window.scrollY;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shortViewport = window.matchMedia("(max-height: 650px)").matches;
  const work = id === "youtube" && !reducedMotion && !shortViewport
    ? document.getElementById("work")
    : null;
  const end = work
    ? Math.max(0, start + work.getBoundingClientRect().bottom)
    : Math.max(0, start + target.getBoundingClientRect().top - margin);

  window.scrollTo({ top: end, behavior: reducedMotion ? "auto" : "smooth" });
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
