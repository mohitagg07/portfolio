"use client";

import { useState } from "react";

export default function Contact(): React.JSX.Element {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xjkvenqd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, message: form.message,
          _replyto: form.email, _subject: `Portfolio Contact from ${form.name}`,
        }),
      });
      if (res.ok) { setStatus("sent"); setForm({ name: "", email: "", phone: "", message: "" }); return; }
    } catch { /* fall through */ }

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Hi Mohit,\n\nName: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}\n\n${form.message}`);
    window.open(`mailto:mohitaggarwal2003@gmail.com?subject=${subject}&body=${body}`);
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#fff",
    fontSize: 14.5,
    fontFamily: "Outfit,sans-serif",
    transition: "border-color 0.2s, background 0.2s",
  };

  return (
    <section id="contact" className="section-block" style={{ background: "rgba(108,99,255,0.02)" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "rgba(108,99,255,0.04)", filter: "blur(160px)", borderRadius: "50%", pointerEvents: "none" }} />

      <div className="container-fluid" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-eyebrow">Get in touch</span>
          <h2 style={{ marginBottom: 16 }}>Say Hello.</h2>
          <p style={{ maxWidth: 420, margin: "0 auto", fontSize: 15, color: "rgba(255,255,255,0.45)", fontFamily: "Outfit,sans-serif" }}>
            Open to full-time roles, freelance projects, and collaborations. Part-time YouTuber — I reply to every message.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "start" }}>

          {/* ── Left: Contact info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Email card */}
            <a href="mailto:mohitaggarwal2003@gmail.com"
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRadius: 18, background: "rgba(11,14,28,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(108,99,255,0.3)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 5 }}>Email</p>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", fontFamily: "Outfit,sans-serif", wordBreak: "break-all" }}>mohitaggarwal2003@gmail.com</p>
              </div>
            </a>

            {/* Location card */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRadius: 18, background: "rgba(11,14,28,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 5 }}>Location</p>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", fontFamily: "Outfit,sans-serif" }}>Jammu, India</p>
              </div>
            </div>

            {/* YouTube card */}
            <a href="https://www.youtube.com/@MohitAgg07" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRadius: 18, background: "rgba(11,14,28,0.7)", border: "1px solid rgba(239,68,68,0.12)", backdropFilter: "blur(16px)", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(239,68,68,0.3)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(239,68,68,0.12)"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div>
                <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 5 }}>YouTube Creator</p>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", fontFamily: "Outfit,sans-serif" }}>@MohitAgg07</p>
                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.3)", fontFamily: "Outfit,sans-serif", marginTop: 2 }}>Lifestyle · Travel · Real moments</p>
              </div>
            </a>

            {/* Nudge */}
            <div style={{ padding: "14px 18px", borderRadius: 14, background: "rgba(108,99,255,0.06)", border: "1px solid rgba(108,99,255,0.12)" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "Outfit,sans-serif", lineHeight: 1.6 }}>
                Prefer email?{" "}
                <a href="mailto:mohitaggarwal2003@gmail.com" style={{ color: "#a78bfa", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  mohitaggarwal2003@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div style={{ padding: "clamp(24px,4vw,40px)", borderRadius: 22, background: "rgba(11,14,28,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
            {status === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 0", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 style={{ fontSize: 22, color: "#fff" }}>Message Sent!</h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Outfit,sans-serif", fontSize: 14 }}>I'll get back to you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} style={{ marginTop: 8, padding: "10px 22px", borderRadius: 12, background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)", color: "#a78bfa", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit,sans-serif", transition: "background 0.2s" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 8 }}>Name *</label>
                    <input suppressHydrationWarning type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={{ ...inputStyle }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 8 }}>Email *</label>
                    <input suppressHydrationWarning type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={{ ...inputStyle }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 8 }}>Phone</label>
                  <input suppressHydrationWarning type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" style={{ ...inputStyle }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Outfit,sans-serif", fontWeight: 700, marginBottom: 8 }}>Message *</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." rows={5} style={{ ...inputStyle, resize: "none" }} />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name || !form.email || !form.message}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", borderRadius: 14, background: status === "sending" || !form.name || !form.email || !form.message ? "rgba(108,99,255,0.4)" : "#6c63ff", color: "#fff", fontSize: 14.5, fontWeight: 700, fontFamily: "Outfit,sans-serif", cursor: status === "sending" || !form.name || !form.email || !form.message ? "not-allowed" : "pointer", border: "none", transition: "background 0.2s, transform 0.2s", boxShadow: "0 4px 20px rgba(108,99,255,0.3)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; if (!el.disabled) { el.style.background = "#5a52e0"; el.style.transform = "translateY(-1px)"; } }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; if (!el.disabled) { el.style.background = "#6c63ff"; el.style.transform = "translateY(0)"; } }}
                >
                  {status === "sending" ? (
                    <><svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ animation: "spin-slow 1s linear infinite" }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity={0.25} /><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity={0.75} /></svg>Sending...</>
                  ) : (
                    <><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>Send Message</>
                  )}
                </button>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", textAlign: "center", fontFamily: "Outfit,sans-serif" }}>Goes directly to mohitaggarwal2003@gmail.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
