"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#nav-root")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const navLinks = [
    { href: "#home",     label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#youtube",  label: "YouTube" },
    { href: "#contact",  label: "Connect" },
  ];

  return (
    <>
      <header
        id="nav-root"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "12px 16px",
          /* Prevent header itself from overflowing the viewport */
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* ── Pill container ── */}
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "8px 12px",
            borderRadius: 999,
            background: scrolled ? "rgba(10,12,22,0.88)" : "rgba(10,12,22,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5)"
              : "0 4px 20px rgba(0,0,0,0.25)",
            transition: "background 0.4s, box-shadow 0.4s",
            /* Prevent inner overflow */
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, overflow: "hidden", flexShrink: 0 }}>
              <Image src="/favicon.ico" alt="M" width={30} height={30} style={{ objectFit: "cover" }} />
            </div>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 15, fontFamily: "Syne, sans-serif", whiteSpace: "nowrap" }}>
              mohit.
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hdr-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 1, minWidth: 0 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontFamily: "Inter, sans-serif", textDecoration: "none", padding: "7px 12px", borderRadius: 999, whiteSpace: "nowrap", transition: "color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.background = "transparent"; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hdr-desktop-cta"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "#c8f135", color: "#0a0c16", fontSize: 13, fontWeight: 700, fontFamily: "Inter, sans-serif", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(200,241,53,0.3)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#d4f54a"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#c8f135"; el.style.transform = "translateY(0)"; }}
            >
              Start a project
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg style={{ width: 11, height: 11 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </a>

            {/* Mobile hamburger */}
            <button
              className="hdr-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ width: 34, height: 34, borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, cursor: "pointer", flexShrink: 0, padding: 0 }}
            >
              <span style={{ display: "block", width: 15, height: 1.5, background: "#fff", borderRadius: 9999, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translateY(5.5px)" : "none" }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "#fff", borderRadius: 9999, transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 15, height: 1.5, background: "#fff", borderRadius: 9999, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-5.5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown (full-width, below pill) ── */}
        <div
          className="hdr-mobile-menu"
          style={{
            maxWidth: 1140,
            margin: "8px auto 0",
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
            maxHeight: menuOpen ? 400 : 0,
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div style={{ background: "rgba(10,12,22,0.96)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 10 }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "13px 14px", color: "rgba(255,255,255,0.7)", fontSize: 15, fontFamily: "Inter,sans-serif", textDecoration: "none", borderRadius: 12, transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.color = "#fff"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.7)"; }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ padding: "8px 4px 4px", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 6 }}>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", background: "#c8f135", color: "#0a0c16", fontSize: 15, fontWeight: 700, fontFamily: "Inter,sans-serif", borderRadius: 12, textDecoration: "none" }}
              >
                Start a project ↗
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive rules live in globals.css */}
    </>
  );
}
