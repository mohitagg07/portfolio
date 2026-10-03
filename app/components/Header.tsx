"use client";

import { useEffect, useRef, useState } from "react";
import { navigateToSection } from "../utils/scroll";

const LINKS = [["Work", "work"], ["About", "about"], ["Videos", "youtube"], ["Contact", "contact"]] as const;
const SOCIALS = [["GitHub", "https://github.com/mohitagg07"], ["YouTube", "https://youtube.com/@MohitAgg07"], ["LinkedIn", "https://linkedin.com/in/mohitagg07"]] as const;

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let lastScrolled: boolean | undefined;
    let lastNearTop = false;
    let scrollFrame = 0;
    const updateScrollState = () => {
      scrollFrame = 0;
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.max(0, Math.min(1, y / scrollable)) : 0;
      headerRef.current?.style.setProperty("--scroll-progress", String(progress));
      const nextScrolled = y > 40;
      const nextNearTop = y < 200;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (nextNearTop && !lastNearTop) setActive("");
      lastNearTop = nextNearTop;
    };
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(([, id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(scrollFrame); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const bar = "absolute left-3 h-0.5 w-5 rounded bg-white transition-transform duration-300";

  return (
    <>
      <header ref={headerRef} className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}>
        <div className="site-header__glass mx-auto flex items-center justify-between px-5 py-4 md:px-12">
          <span className="site-header__depth" aria-hidden="true" />
          <a href="#home" onClick={(event) => { navigateToSection(event, "home"); setOpen(false); }} aria-label="Mohit Aggarwal home" className="site-header__brand">
            <svg width="36" height="36" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="logo-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="30" y2="30">
                  <stop stopColor="#22d3ee" /><stop offset="1" stopColor="#c8ff00" />
                </linearGradient>
              </defs>
              <path d="M4 25V5l11 13L26 5v20" stroke="url(#logo-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="site-header__brand-copy" aria-hidden="true">
              <span>Mohit Aggarwal</span>
              <small>AI &amp; automation</small>
            </span>
          </a>

          <nav className="site-header__nav hidden items-center gap-2 md:flex" aria-label="Main">
            {LINKS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => { if (navigateToSection(event, id)) setActive(id); }}
                className={`site-header__link ${active === id ? "is-active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(event) => { if (navigateToSection(event, "contact")) setActive("contact"); }} className="site-header__cta hidden whitespace-nowrap md:inline-flex">
              Let&apos;s talk
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative h-11 w-11 md:hidden"
            >
              <span className={`${bar} top-[17px]`} style={{ transform: open ? "translateY(4.5px) rotate(45deg)" : "none" }} />
              <span className={`${bar} top-[26px]`} style={{ transform: open ? "translateY(-4.5px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: fades in with a short, lightweight link stagger */}
      <div
        aria-hidden={!open}
        className={`site-header__mobile fixed inset-0 z-[60] md:hidden ${open ? "is-open" : ""}`}
      >
        <div className="flex h-full flex-col justify-between px-8 pb-10 pt-28">
          <ul className="space-y-2">
            {LINKS.map(([label, id], i) => (
              <li
                key={id}
                style={{
                  transform: open ? "none" : "translateY(28px)",
                  opacity: open ? 1 : 0,
                  transition: "opacity .36s ease, transform .4s cubic-bezier(.16,1,.3,1)",
                  transitionDelay: open ? `${80 + i * 55}ms` : "0ms",
                }}
              >
                <a
                  href={`#${id}`}
                  onClick={(event) => { if (navigateToSection(event, id)) setActive(id); setOpen(false); }}
                  className="block text-[clamp(40px,12vw,64px)] font-bold leading-[1.15]"
                  style={{ fontFamily: "var(--font-main)", color: active === id ? "var(--accent)" : "var(--fg)" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ opacity: open ? 1 : 0, transition: "opacity .5s ease .45s" }}>
            <a href="mailto:mohitaggarwal2003@gmail.com" className="block text-sm text-[var(--fg-muted)]">mohitaggarwal2003@gmail.com</a>
            <div className="mt-4 flex gap-6 text-sm font-medium">
              {SOCIALS.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
