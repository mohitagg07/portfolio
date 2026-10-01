"use client";

import { useEffect, useState } from "react";

const LINKS = [["Work", "work"], ["About", "about"], ["Videos", "youtube"], ["Contact", "contact"]] as const;
const SOCIALS = [["GitHub", "https://github.com/mohitagg07"], ["YouTube", "https://youtube.com/@MohitAgg07"], ["LinkedIn", "https://linkedin.com/in/mohitagg07"]] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach(([, id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
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
      <header className={`fixed inset-x-0 top-0 z-[70] border-b transition-all duration-300 ${scrolled || open ? "border-white/5 bg-[#050505]/70 backdrop-blur-xl" : "border-transparent"}`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 md:px-10">
          <a href="#" onClick={() => setOpen(false)} aria-label="Mohit, back to top" className="flex items-center gap-2.5">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="logo-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="30" y2="30">
                  <stop stopColor="#22d3ee" /><stop offset="1" stopColor="#c8ff00" />
                </linearGradient>
              </defs>
              <path className="logo-m" d="M4 25V5l11 13L26 5v20" stroke="url(#logo-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="logo-word">mohit</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {LINKS.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-[var(--accent)] after:transition-transform after:duration-300 ${
                  active === id ? "text-[var(--accent)] after:scale-x-100" : "text-[var(--fg-muted)] after:scale-x-0 hover:text-[var(--fg)] hover:after:scale-x-100"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-bold text-[#050505] transition-transform hover:scale-105 md:inline-block">
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

      {/* Mobile menu: grows out of the button, links pop in one by one */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-2xl md:hidden"
        style={{
          clipPath: open ? "circle(150% at calc(100% - 36px) 34px)" : "circle(0px at calc(100% - 36px) 34px)",
          visibility: open ? "visible" : "hidden",
          transition: `clip-path .55s cubic-bezier(.16,1,.3,1), visibility 0s linear ${open ? "0s" : ".55s"}`,
        }}
      >
        <div className="flex h-full flex-col justify-between px-8 pb-10 pt-28">
          <ul className="space-y-2">
            {LINKS.map(([label, id], i) => (
              <li
                key={id}
                style={{
                  transform: open ? "none" : "translateY(28px)",
                  opacity: open ? 1 : 0,
                  transition: "all .5s cubic-bezier(.16,1,.3,1)",
                  transitionDelay: open ? `${120 + i * 70}ms` : "0ms",
                }}
              >
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block text-[clamp(40px,12vw,64px)] font-bold leading-[1.15]"
                  style={{ fontFamily: "'Syne', sans-serif", color: active === id ? "var(--accent)" : "var(--fg)" }}
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
                <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
