"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(24px, 5vw, 80px)",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.03em",
            color: "#f5f5f0",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          mohit
        </a>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-hover"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#8a8a80",
                letterSpacing: "0.02em",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a80")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#050505",
              background: "#c8ff00",
              padding: "8px 20px",
              borderRadius: 999,
              letterSpacing: "0.02em",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(200,255,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Let&apos;s Talk
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            color: "#f5f5f0",
            width: 40,
            height: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: menuOpen ? 0 : 6,
            position: "relative",
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              width: 24,
              height: 2,
              background: "#f5f5f0",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: menuOpen ? "rotate(45deg) translateY(0)" : "none",
              position: menuOpen ? "absolute" : "relative",
            }}
          />
          <span
            style={{
              width: 24,
              height: 2,
              background: "#f5f5f0",
              borderRadius: 2,
              transition: "all 0.3s ease",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 24,
              height: 2,
              background: "#f5f5f0",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: menuOpen ? "rotate(-45deg) translateY(0)" : "none",
              position: menuOpen ? "absolute" : "relative",
            }}
          />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(5,5,5,0.97)",
            backdropFilter: "blur(30px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            animation: "fadeIn 0.3s ease both",
          }}
        >
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: "#f5f5f0",
                letterSpacing: "-0.02em",
                opacity: 0,
                animation: `fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s both`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#050505",
              background: "#c8ff00",
              padding: "14px 40px",
              borderRadius: 999,
              opacity: 0,
              animation: "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.4s both",
            }}
          >
            Let&apos;s Talk →
          </a>
        </div>
      )}
    </>
  );
}
