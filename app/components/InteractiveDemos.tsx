"use client";

import { useEffect, useRef, useState } from "react";

export default function InteractivePlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Interactive wave canvas
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 320);
    let animId: number;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 320;
    };
    window.addEventListener("resize", onResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouch, { passive: true });

    let step = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      step += 0.025;

      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, width, height);

      const cols = 40;
      const rows = 20;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (width / (cols - 1)) * i;
          const baseY = (height / (rows - 1)) * j;

          const dist = Math.hypot(x - mouseX, baseY - mouseY);
          const ripple = Math.sin(dist * 0.04 - step * 2) * 15 * (80 / (dist + 30));
          const wave = Math.sin(i * 0.2 + step) * 6 + Math.cos(j * 0.15 + step * 0.7) * 6;

          const y = baseY + wave + ripple;
          const radius = Math.max(0.8, 2.5 - dist * 0.004);
          const alpha = Math.min(0.8, Math.max(0.05, 1 - dist / (width * 0.5)));

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 255, 0, ${alpha * 0.6})`;
          ctx.fill();
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouch);
    };
  }, [visible]);

  // FAQ data
  const faqs = [
    {
      q: "How do we start a project together?",
      a: "We begin with a brief discovery call to understand your goals. Then I create a plan, design mockups, build, and deliver — with your feedback at every step.",
    },
    {
      q: "What services do you offer?",
      a: "Full website development, custom AI tools & chatbots, UI/UX design, brand identity, and YouTube content creation.",
    },
    {
      q: "Where are you based?",
      a: "Jammu, J&K, India — working with clients locally and globally across all time zones. Fast responses guaranteed.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="playground" className="section-spacer" style={{ position: "relative" }}>
      <div className="section-divider" />

      <div className="section-wrap" style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="label-tag">Interactive</span>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            A little{" "}
            <span style={{ color: "#c8ff00", fontStyle: "italic" }}>playground</span>
          </h2>
          <p style={{ fontSize: 15, color: "#8a8a80", maxWidth: 450, lineHeight: 1.7 }}>
            Move your cursor across the canvas. Every dot reacts to you.
          </p>
        </div>

        {/* Interactive Wave Canvas */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#050505",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: 320, cursor: "crosshair", display: "block" }}
          />
        </div>

        {/* FAQ Accordion */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <h3
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#8a8a80",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Frequently Asked
          </h3>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "24px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "none",
                    border: "none",
                    color: "#f5f5f0",
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      fontSize: 20,
                      color: "#c8ff00",
                      transition: "transform 0.3s ease",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: openFaq === i ? 200 : 0,
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: "#8a8a80",
                      lineHeight: 1.7,
                      paddingBottom: 24,
                      maxWidth: 600,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
