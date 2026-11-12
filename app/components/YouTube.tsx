"use client";

import { useEffect, useState } from "react";
import { Youtube as YoutubeIcon, ArrowUpRight, Play } from "lucide-react";
import { useInView } from "./useInView";
import ScrollReveal from "./ScrollReveal";

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
  const [videoStatus, setVideoStatus] = useState<"idle" | "loading" | "ready" | "empty" | "error">("idle");
  const [sectionRef, hasBeenSeen] = useInView<HTMLElement>(0.05);

  useEffect(() => {
    if (!hasBeenSeen) return;

    let isCurrent = true;
    setVideoStatus("loading");

    fetch("/api/youtube")
      .then((response) => {
        if (!response.ok) throw new Error("Video feed unavailable");
        return response.json();
      })
      .then((data) => {
        if (!isCurrent) return;
        const nextVideos = Array.isArray(data.videos) ? data.videos : [];
        setVideos(nextVideos);
        setSubscribers(parseInt(data.subscriberCount ?? "0", 10) || 0);
        setVideoStatus(nextVideos.length > 0 ? "ready" : "empty");
      })
      .catch(() => {
        if (isCurrent) setVideoStatus("error");
      });

    return () => {
      isCurrent = false;
    };
  }, [hasBeenSeen]);

  const channelNote =
    subscribers >= SHOW_COUNTS_FROM
      ? `${formatCount(subscribers)} subscribers`
      : "Travel, tech and building in public";

  return (
    <div id="video" className="video-scroll-stage">
      <section
        ref={sectionRef}
        id="youtube"
        className={`video-scroll-sticky ${hasBeenSeen ? "is-active" : ""}`}
        aria-labelledby="yt-heading"
      >
        {/* Cinematic top-edge reveal bar */}
        <div className="video-scroll-sticky__edge" aria-hidden="true" />

        {/* Content */}
        <ScrollReveal className={`section-wrap youtube-content ${hasBeenSeen ? "is-in" : ""}`}>
          <div className="youtube-intro yt-intro">
            <p className="yt-eyebrow">
              <span>05</span>
              <span>Video notes</span>
            </p>
            <ScrollReveal variant="mask">
              <h2
                id="yt-heading"
                className={`section-heading section-title youtube-title ${hasBeenSeen ? "is-in" : ""}`}
              >
                A few things <em className="youtube-title-accent">I’ve shared.</em>
              </h2>
            </ScrollReveal>
            <p className="section-lede">
              Short videos, experiments and everyday moments from the things that catch my curiosity.
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

          {videoStatus === "loading" ? (
            <div className="yt-grid yt-grid--loading" aria-label="Loading recent videos">
              {[0, 1, 2, 3].map((item) => (
                <div className="yt-skeleton" key={item}>
                  <div className="yt-skeleton__thumb" />
                  <div className="yt-skeleton__line yt-skeleton__line--long" />
                  <div className="yt-skeleton__line" />
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
                    aria-label={`${v.title} — watch on YouTube`}
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
                        <img
                          src={v.thumbnail}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`;
                          }}
                        />
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
          ) : videoStatus === "empty" || videoStatus === "error" ? (
            <div className="yt-empty-state">
              <div className="yt-empty-state__mark" aria-hidden="true">
                <YoutubeIcon size={22} />
              </div>
              <div className="yt-empty-state__copy">
                <p className="yt-empty-state__eyebrow">The video shelf is taking a breather</p>
                <h3>There&apos;s more on the channel.</h3>
                <p>The latest uploads aren&apos;t available in this view right now. You can still browse the channel directly.</p>
              </div>
              <a className="yt-empty-state__link" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                Browse YouTube <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </ScrollReveal>
      </section>
    </div>
  );
}
