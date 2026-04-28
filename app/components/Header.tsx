"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* ── Fixed header wrapper: full width, no background, just a container ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "14px var(--section-pad-x, 32px)",
          pointerEvents: "none",
        }}
      >
        {/* Inner pill — max-width matches every section */}
        <div
          style={{
            maxWidth: "var(--container-max, 1180px)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "8px 10px 8px 14px",
            borderRadius: 999,
            background: scrolled
              ? "rgba(6,8,16,0.94)"
              : "rgba(6,8,16,0.70)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 4px 16px rgba(0,0,0,0.3)",
            transition: "background 0.4s, box-shadow 0.4s",
            pointerEvents: "auto",
          }}
        >
          {/* Logo */}
          <a href="#home" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, overflow: "hidden", border: "1px solid rgba(108,99,255,0.3)", flexShrink: 0 }}>
              <Image src="/favicon.ico" alt="M" width={32} height={32} style={{ objectFit: "cover" }} />
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "Syne,sans-serif", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
              mohit.
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hdr-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                style={{ color: "rgba(255,255,255,0.52)", fontSize: 13.5, fontFamily: "Outfit,sans-serif", fontWeight: 500, textDecoration: "none", padding: "7px 14px", borderRadius: 999, whiteSpace: "nowrap", transition: "color 0.2s, background 0.2s" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "rgba(255,255,255,0.52)"; el.style.background = "transparent"; }}
              >{link.label}</a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a href="#contact" className="hdr-desktop-cta"
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 999, background: "#c8f135", color: "#0a0c16", fontSize: 13, fontWeight: 700, fontFamily: "Outfit,sans-serif", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 2px 16px rgba(200,241,53,0.35)", transition: "background 0.2s, transform 0.2s, box-shadow 0.2s", flexShrink: 0 }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#d8f850"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 6px 24px rgba(200,241,53,0.5)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#c8f135"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 16px rgba(200,241,53,0.35)"; }}
          >
            Start a project ↗
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="hdr-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: menuOpen ? "rgba(108,99,255,0.18)" : "rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer", flexShrink: 0, padding: 0, transition: "background 0.2s" }}
          >
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff", borderRadius: 9999, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff", borderRadius: 9999, transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#fff", borderRadius: 9999, transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className="hdr-mobile-backdrop"
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 190,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* Mobile panel */}
      <div
        className="hdr-mobile-panel"
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 195,
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(6,8,16,0.97)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          padding: "88px 24px 32px",
          boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "15px 18px", color: "rgba(255,255,255,0.7)", fontSize: 19, fontFamily: "Syne,sans-serif", fontWeight: 700, textDecoration: "none", borderRadius: 14, transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.color = "#fff"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.7)"; }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "17px", background: "#c8f135", color: "#0a0c16", fontSize: 16, fontWeight: 700, fontFamily: "Outfit,sans-serif", borderRadius: 16, textDecoration: "none", boxShadow: "0 4px 20px rgba(200,241,53,0.3)" }}
          >
            Start a project ↗
          </a>
        </div>
      </div>
    </>
  );
}
