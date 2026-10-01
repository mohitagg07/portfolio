"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface Video {
  title: string;
  thumbnail: string;
  videoId: string;
  url: string;
  publishedAt: string;
  viewCount: number;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function YouTube() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [subscriberCount, setSubscriberCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [sectionRef, hasBeenSeen] = useInView<HTMLElement>(0.05);

  useEffect(() => {
    if (!hasBeenSeen) return;

    fetch("/api/youtube")
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos || []);
        if (data.subscriberCount) {
          const n = parseInt(data.subscriberCount);
          setSubscriberCount(formatViews(n));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [hasBeenSeen]);

  return (
    <section ref={sectionRef} id="youtube" className={`section-spacer ${hasBeenSeen ? "is-active" : ""}`} style={{ position: "relative" }}>
      <div className="section-divider" />

      <div className={`section-wrap youtube-content ${hasBeenSeen ? "is-in" : ""}`} style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>
        {/* Header */}
        <div
          className="youtube-intro"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 48,
          }}
        >
          
          <h2 className={`section-heading section-title youtube-title ${hasBeenSeen ? "is-in" : ""}`}>
            Beyond the{" "}
            <span style={{ color: "#f87171", fontStyle: "italic" }}>screen</span>
          </h2>
          <p className="section-lede">
            Real life, travel, tech vlogs, and creative storytelling on YouTube.
          </p>
        </div>

        {/* Channel Bar */}
        <div
          className="youtube-channel"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
            padding: "20px 28px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* YouTube icon circle */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg style={{ width: 22, height: 22, fill: "white" }} viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#f5f5f0", fontFamily: "var(--font-main)" }}>@MohitAgg07</p>
              <p style={{ fontSize: 12, color: "#a3adbd" }}>
                {subscriberCount ? `${subscriberCount} subscribers` : "AI · Dev Life · Building in Public"}
              </p>
            </div>
          </div>

          <a
            href="https://www.youtube.com/@MohitAgg07"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              borderRadius: 999,
              background: "#dc2626",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              transition: "transform 0.25s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Subscribe →
          </a>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "rgba(255,255,255,0.02)",
                  overflow: "hidden",
                }}
              >
                <div style={{ aspectRatio: "16/9", background: "rgba(255,255,255,0.03)" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.04)", marginBottom: 10 }} />
                  <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.03)", width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {videos.map((v, i) => (
              <a
                key={v.videoId}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-card"
                style={{
                  "--i": i,
                  "--enter-x": i % 2 === 0 ? "-26px" : "26px",
                  "--enter-x-mobile": i % 2 === 0 ? "-22px" : "22px",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  overflow: "hidden",
                  display: "block",
                  textDecoration: "none",
                } as React.CSSProperties}
              >
                {/* Thumbnail */}
                <div className="youtube-thumbnail" style={{ position: "relative", aspectRatio: "16/9", background: "#0a0a0a", overflow: "hidden" }}>
                  {v.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.thumbnail} alt={v.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  {/* Play button overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.3)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0"; }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "rgba(220,38,38,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg style={{ width: 18, height: 18, fill: "white", marginLeft: 2 }} viewBox="0 0 24 24">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>

                  {/* View count badge */}
                  {v.viewCount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(4px)",
                        fontSize: 10,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {formatViews(v.viewCount)} views
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "16px 18px" }}>
                  <p
                    style={{
                      color: "#f5f5f0",
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      marginBottom: 8,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {v.title}
                  </p>
                  <p style={{ color: "#a3adbd", fontSize: 12 }}>{timeAgo(v.publishedAt)}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Fallback */
          <div
            style={{
              padding: "60px 40px",
              textAlign: "center",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(220,38,38,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg style={{ width: 28, height: 28, fill: "#f87171" }} viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <h3 style={{ color: "#f5f5f0", fontWeight: 700, fontSize: 20, fontFamily: "var(--font-main)", marginBottom: 12 }}>
              Watch My Videos
            </h3>
            <p style={{ color: "#a3adbd", fontSize: 14, maxWidth: 380, margin: "0 auto 28px", lineHeight: 1.7 }}>
              Real life, travel vlogs, tech stories, and everything in between.
            </p>
            <a
              href="https://www.youtube.com/@MohitAgg07"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 999,
                background: "#dc2626",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Open YouTube Channel →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
