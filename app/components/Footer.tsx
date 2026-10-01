"use client";

import { scrollToSection } from "../utils/scroll";
import { useVisibility } from "./useInView";

export default function Footer() {
  const [footerRef, active] = useVisibility<HTMLElement>(0.05, "120px 0px");
  const scrollToTop = () => {
    scrollToSection("home");
  };

  return (
    <footer
      ref={footerRef}
      className={`site-footer ${active ? "is-active" : ""}`}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "40px 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="section-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {/* Left */}
        <div>
          <p style={{ fontSize: 13, color: "#9aa7ba" }}>
            © {new Date().getFullYear()} Mohit Aggarwal. Crafted with care.
          </p>
        </div>

        {/* Right */}
        <button
          onClick={scrollToTop}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#a3adbd",
            padding: "10px 20px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            transition: "border-color 0.3s ease, color 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(200,255,0,0.2)";
            e.currentTarget.style.color = "#c8ff00";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#a3adbd";
          }}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
