"use client";

import { useEffect, useState } from "react";

interface Video {
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  url: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function YouTube(): React.JSX.Element {
  const [videos, setVideos] = useState<Video[]>([]);
  const [subscriberCount, setSubscriberCount] = useState<string>("");
  const [channelViewCount, setChannelViewCount] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/youtube")
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos || []);
        if (data.subscriberCount) {
          setSubscriberCount(formatCount(parseInt(data.subscriberCount)));
        }
        if (data.channelViewCount) {
          setChannelViewCount(formatViews(parseInt(data.channelViewCount)));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="youtube" className="section-block">
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: 400, height: 350, background: "rgba(220,38,38,0.05)", filter: "blur(130px)", borderRadius: "50%" }}
      />

      <div className="container-fluid" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p
            className="uppercase tracking-widest"
            style={{ color: "#f87171", fontSize: 11, fontFamily: "Inter,sans-serif", letterSpacing: "0.12em", marginBottom: 14 }}
          >
            Life beyond the screen
          </p>
          <h2
            className="text-white"
            style={{ fontSize: "clamp(32px,5vw,40px)", fontWeight: 700, lineHeight: 1.1, fontFamily: "Syne,sans-serif" }}
          >
            Life on Camera
          </h2>
          <div className="mt-3 w-10 h-px" style={{ background: "linear-gradient(to right, #ef4444, transparent)" }} />
        </div>

        {/* Channel banner */}
        <div
          style={{
            marginBottom: 40,
            padding: "20px 24px",
            borderRadius: 16,
            background: "rgba(13,17,32,0.6)",
            border: "1px solid rgba(239,68,68,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {/* YouTube icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg style={{ width: 26, height: 26, fill: "white" }} viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          {/* Channel info */}
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Syne,sans-serif" }}>@MohitAgg07</p>
            <p style={{ color: "#9AA0A6", fontSize: 13, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
              AI · Dev Life · Building in Public
              {subscriberCount && (
                <span style={{ marginLeft: 10, color: "#f87171" }}>{subscriberCount} subscribers</span>
              )}
            </p>
          </div>

          {/* Live stats pills */}
          {(subscriberCount || channelViewCount) && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {subscriberCount && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(220,38,38,0.12)",
                    border: "1px solid rgba(220,38,38,0.2)",
                  }}
                >
                  {/* Person icon */}
                  <svg style={{ width: 13, height: 13, fill: "#f87171" }} viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                  <span style={{ color: "#f87171", fontSize: 12, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                    {subscriberCount}
                  </span>
                  <span style={{ color: "#9AA0A6", fontSize: 11, fontFamily: "Inter,sans-serif" }}>subs</span>
                </div>
              )}
              {channelViewCount && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(220,38,38,0.12)",
                    border: "1px solid rgba(220,38,38,0.2)",
                  }}
                >
                  {/* Eye icon */}
                  <svg style={{ width: 13, height: 13, fill: "none", stroke: "#f87171", strokeWidth: 2 }} viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span style={{ color: "#f87171", fontSize: 12, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                    {channelViewCount}
                  </span>
                  <span style={{ color: "#9AA0A6", fontSize: 11, fontFamily: "Inter,sans-serif" }}>total views</span>
                </div>
              )}
            </div>
          )}

          {/* Visit Channel button */}
          <a
            href="https://www.youtube.com/@MohitAgg07"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              background: "#dc2626",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Inter,sans-serif",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <svg style={{ width: 16, height: 16, fill: "white" }} viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Visit Channel
          </a>
        </div>

        {/* Videos grid — sorted by most views */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  borderRadius: 14,
                  background: "rgba(13,17,32,0.6)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16/9",
                    background: "rgba(255,255,255,0.04)",
                    animationName: "pulse",
                    animationDuration: "2s",
                    animationIterationCount: "infinite",
                  }}
                />
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.06)", marginBottom: 8 }} />
                  <div style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.04)", width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {videos.map((v) => (
              <a
                key={v.videoId}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderRadius: 14,
                  background: "rgba(13,17,32,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  display: "block",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(220,38,38,0.3)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", aspectRatio: "16/9", background: "#0d1120", overflow: "hidden" }}>
                  {v.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.thumbnail} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  {/* Play overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.25)",
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.opacity = "0";
                    }}
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

                  {/* View count badge on thumbnail */}
                  {v.viewCount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: "rgba(0,0,0,0.78)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {/* Eye icon */}
                      <svg
                        style={{ width: 11, height: 11, fill: "none", stroke: "rgba(255,255,255,0.7)", strokeWidth: 2 }}
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 10, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                        {formatViews(v.viewCount)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "12px 14px" }}>
                  <p
                    style={{
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1.4,
                      marginBottom: 6,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {v.title}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <p style={{ color: "#9AA0A6", fontSize: 11, fontFamily: "Inter,sans-serif" }}>{timeAgo(v.publishedAt)}</p>
                    {v.viewCount > 0 && (
                      <p style={{ color: "#9AA0A6", fontSize: 11, fontFamily: "Inter,sans-serif" }}>
                        · {formatViews(v.viewCount)} views
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Fallback when no YouTube API key */
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(13,17,32,0.4)",
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.25)",
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
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, fontFamily: "Syne,sans-serif", marginBottom: 10 }}>
              Watch My Latest Videos
            </h3>
            <p
              style={{
                color: "#9AA0A6",
                fontSize: 14,
                fontFamily: "Inter,sans-serif",
                marginBottom: 28,
                maxWidth: 400,
                margin: "0 auto 28px",
              }}
            >
              Real life, raw moments — travel, daily vlogs, and everything in between.
            </p>
            <a
              href="https://www.youtube.com/@MohitAgg07"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: 12,
                background: "#dc2626",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Inter,sans-serif",
                textDecoration: "none",
              }}
            >
              <svg style={{ width: 16, height: 16, fill: "white" }} viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Open YouTube Channel
            </a>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "Inter,sans-serif", marginTop: 16 }}>
              Add YOUTUBE_API_KEY to .env to auto-load top videos
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
