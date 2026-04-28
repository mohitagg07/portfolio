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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "#home",     label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#youtube",  label: "YouTube" },
    { href: "#contact",  label: "Connect" },
  ];

  return (
    <>
      {/* ─── Floating pill ─── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "12px 16px",
          boxSizing: "border-box",
          pointerEvents: "none",       // let clicks pass through padding area
        }}
      >
        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "8px 10px",
            borderRadius: 999,
            background: scrolled ? "rgba(10,12,22,0.92)" : "rgba(10,12,22,0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            transition: "background 0.4s",
            pointerEvents: "auto",     // clicks work on the pill itself
          }}
        >
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
              <Image src="/favicon.ico" alt="M" width={30} height={30} style={{ objectFit: "cover" }} />
            </div>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 15, fontFamily: "Syne,sans-serif", whiteSpace: "nowrap" }}>
              mohit.
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hdr-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontFamily: "Inter,sans-serif", textDecoration: "none", padding: "7px 12px", borderRadius: 999, whiteSpace: "nowrap", transition: "color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.background = "transparent"; }}
              >{link.label}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href="#contact" className="hdr-desktop-cta"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 999, background: "#c8f135", color: "#0a0c16", fontSize: 13, fontWeight: 700, fontFamily: "Inter,sans-serif", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 2px 12px rgba(200,241,53,0.3)", transition: "background 0.2s, transform 0.2s", flexShrink: 0 }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#d4f54a"; el.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#c8f135"; el.style.transform = "translateY(0)"; }}
          >
            Start a project
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg style={{ width: 10, height: 10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="hdr-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ width: 34, height: 34, borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: menuOpen ? "rgba(108,99,255,0.15)" : "rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4.5, cursor: "pointer", flexShrink: 0, padding: 0, transition: "background 0.2s" }}
          >
            <span style={{ display: "block", width: 15, height: 1.5, background: "#fff", borderRadius: 9999, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
            <span style={{ display: "block", width: 15, height: 1.5, background: "#fff", borderRadius: 9999, transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 15, height: 1.5, background: "#fff", borderRadius: 9999, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* ─── Mobile full-screen overlay menu ─── */}
      {/* Backdrop */}
      <div
        className="hdr-mobile-backdrop"
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 190,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* Menu panel — slides down from top */}
      <div
        className="hdr-mobile-panel"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 195,
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(8,10,20,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          padding: "80px 20px 28px",   /* top padding = header height */
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "14px 16px", color: "rgba(255,255,255,0.75)", fontSize: 18, fontFamily: "Syne,sans-serif", fontWeight: 600, textDecoration: "none", borderRadius: 14, transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.color = "#fff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.75)"; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px", background: "#c8f135", color: "#0a0c16", fontSize: 16, fontWeight: 700, fontFamily: "Inter,sans-serif", borderRadius: 14, textDecoration: "none" }}
          >
            Start a project ↗
          </a>
        </div>
      </div>
    </>
  );
}
