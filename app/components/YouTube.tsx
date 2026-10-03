"use client";

import { useEffect, useState } from "react";
import { Youtube as YoutubeIcon, ArrowUpRight, Play } from "lucide-react";
import { useInView } from "./useInView";

interface Video {
  title: string;
  thumbnail: string;
  videoId: string;
  url: string;
  publishedAt: string;
  viewCount: number;
}

const CHANNEL_URL = "https://www.youtube.com/@MohitAgg07";

// Small numbers read as weak on a portfolio, so counts only show once they are meaningful.
const SHOW_COUNTS_FROM = 1000;

function formatCount(n: number): string {
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
  const [subscribers, setSubscribers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sectionRef, hasBeenSeen] = useInView<HTMLElement>(0.05);

  useEffect(() => {
    if (!hasBeenSeen) return;

    fetch("/api/youtube")
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos || []);
        setSubscribers(parseInt(data.subscriberCount ?? "0", 10) || 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [hasBeenSeen]);

  const channelNote =
    subscribers >= SHOW_COUNTS_FROM
      ? `${formatCount(subscribers)} subscribers`
      : "Travel, tech and building in public";

  return (
    <section ref={sectionRef} id="youtube" className={`section-spacer relative ${hasBeenSeen ? "is-active" : ""}`}>
      <div className="section-divider" />

      <div className={`section-wrap youtube-content ${hasBeenSeen ? "is-in" : ""}`} style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}>
        <div className="youtube-intro yt-intro">
          <h2 className={`section-heading section-title youtube-title ${hasBeenSeen ? "is-in" : ""}`}>Outside of work</h2>
          <p className="section-lede">
            I also make videos about travel, technology, and the process of building things.
          </p>
        </div>

        <div className="youtube-channel yt-channel">
          <div className="yt-channel__id">
            <span className="yt-channel__icon" aria-hidden="true">
              <YoutubeIcon size={20} />
            </span>
            <div>
              <p className="yt-channel__name">@MohitAgg07</p>
              <p className="yt-channel__note">{channelNote}</p>
            </div>
          </div>
          <a className="yt-link" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            Visit channel <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {loading ? (
          <div className="yt-grid" aria-hidden="true">
            {[1, 2, 3].map((i) => (
              <div key={i} className="yt-skeleton">
                <div className="yt-skeleton__thumb" />
                <div className="yt-skeleton__line" />
                <div className="yt-skeleton__line yt-skeleton__line--short" />
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="yt-grid">
            {videos.map((v, i) => {
              const meta = [timeAgo(v.publishedAt), v.viewCount >= SHOW_COUNTS_FROM ? `${formatCount(v.viewCount)} views` : null]
                .filter(Boolean)
                .join(" · ");
              return (
                <a
                  key={v.videoId}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-card yt-card"
                  style={{
                    "--i": i,
                    "--enter-x": i % 2 === 0 ? "-26px" : "26px",
                    "--enter-x-mobile": i % 2 === 0 ? "-34px" : "34px",
                  } as React.CSSProperties}
                >
                  <div className="youtube-thumbnail yt-card__thumb">
                    {v.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={v.thumbnail} alt="" loading="lazy" decoding="async" />
                    )}
                    <span className="yt-card__play" aria-hidden="true">
                      <Play size={16} fill="currentColor" />
                    </span>
                  </div>
                  <div className="yt-card__info">
                    <p className="yt-card__title">{v.title}</p>
                    <p className="yt-card__meta">{meta}</p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
