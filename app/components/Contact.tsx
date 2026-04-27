"use client";

import { useState } from "react";

export default function Contact(): React.JSX.Element {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    // Try Formspree first, fall back to mailto — contact never breaks
    try {
      const res = await fetch("https://formspree.io/f/xjkvenqd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          _replyto: form.email,
          _subject: `Portfolio Contact from ${form.name}`,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
        return;
      }
    } catch {
      // Formspree unavailable — fall through to mailto
    }

    // Fallback: open pre-filled email in the user's mail client
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Mohit,\n\nName: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}\n\n${form.message}`
    );
    window.open(`mailto:mohitaggarwal2003@gmail.com?subject=${subject}&body=${body}`);
    setStatus("sent");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#6c63ff]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6c63ff]/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#a78bfa] text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-outfit)]">
            Get in touch
          </p>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 font-[family-name:var(--font-syne)]">
            Say Hello.
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-base font-[family-name:var(--font-outfit)]">
            Open to full-time roles, freelance projects, and collaborations. I reply to every message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Email",
                value: "mohitaggarwal2003@gmail.com",
                href: "mailto:mohitaggarwal2003@gmail.com",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: "Location",
                value: "Jammu, India",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/8"
                style={{ background: "rgba(13,17,32,0.6)", backdropFilter: "blur(16px)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/15 border border-[#6c63ff]/20 flex items-center justify-center text-[#a78bfa] flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider font-[family-name:var(--font-outfit)] mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/80 text-sm font-[family-name:var(--font-outfit)] hover:text-[#a78bfa] transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm font-[family-name:var(--font-outfit)]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Direct email nudge */}
            <div
              className="p-4 rounded-2xl border border-[#6c63ff]/15"
              style={{ background: "rgba(108,99,255,0.06)" }}
            >
              <p className="text-white/40 text-xs font-[family-name:var(--font-outfit)] leading-relaxed">
                Prefer email?{" "}
                <a
                  href="mailto:mohitaggarwal2003@gmail.com"
                  className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors underline underline-offset-2"
                >
                  mohitaggarwal2003@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-white/8"
            style={{ background: "rgba(13,17,32,0.6)", backdropFilter: "blur(20px)" }}
          >
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-syne)]">Message Sent!</h3>
                <p className="text-white/50 font-[family-name:var(--font-outfit)]">
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#6c63ff]/15 border border-[#6c63ff]/30 text-[#a78bfa] text-sm font-semibold hover:bg-[#6c63ff]/25 transition-all font-[family-name:var(--font-outfit)]"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider font-[family-name:var(--font-outfit)] mb-2">
                      Name *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/6 transition-all font-[family-name:var(--font-outfit)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wider font-[family-name:var(--font-outfit)] mb-2">
                      Email *
                    </label>
                    <input
                      suppressHydrationWarning
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/6 transition-all font-[family-name:var(--font-outfit)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider font-[family-name:var(--font-outfit)] mb-2">
                    Phone
                  </label>
                  <input
                      suppressHydrationWarning
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/6 transition-all font-[family-name:var(--font-outfit)]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wider font-[family-name:var(--font-outfit)] mb-2">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#6c63ff]/50 focus:bg-white/6 transition-all resize-none font-[family-name:var(--font-outfit)]"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name || !form.email || !form.message}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6c63ff] text-white font-semibold text-sm hover:bg-[#5a52e0] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-[#6c63ff]/25 font-[family-name:var(--font-outfit)]"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-white/25 text-center font-[family-name:var(--font-outfit)]">
                  Goes directly to mohitaggarwal2003@gmail.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
