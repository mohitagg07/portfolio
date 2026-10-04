"use client";

import { useEffect, useRef, useState } from "react";
import { Youtube as YoutubeIcon, ArrowUpRight, Play } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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
  const stageRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [subscribers, setSubscribers] = useState(0);
  const [sectionRef, hasBeenSeen] = useInView<HTMLElement>(0.05);
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress of the entire stage (same pattern as Story.tsx → Learning)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  // As the scroll stage exits (Videos scrolled past), fade to black
  // This is the "Work fades out as Videos comes in" complement —
  // here we fade in the reveal overlay from 0 → 0 so the section itself
  // stays bright; the darkening happens on the Work side via work-scroll-shadow
  const revealProgress = useTransform(scrollYProgress, [0, 0.38], [0, 1]);

  useEffect(() => {
    if (!hasBeenSeen) return;

    fetch("/api/youtube")
      .then((r) => r.json())
      .then((data) => {
        setVideos(data.videos || []);
        setSubscribers(parseInt(data.subscriberCount ?? "0", 10) || 0);
      })
      .catch(() => {});
  }, [hasBeenSeen]);

  const channelNote =
    subscribers >= SHOW_COUNTS_FROM
      ? `${formatCount(subscribers)} subscribers`
      : "Travel, tech and building in public";

  return (
    <div ref={stageRef} id="video" className="video-scroll-stage">
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
            <h2
              id="yt-heading"
              className={`section-heading section-title youtube-title ${hasBeenSeen ? "is-in" : ""}`}
            >
              Outside of work
            </h2>
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

          {videos.length > 0 ? (
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
        </ScrollReveal>

        {/* Bottom-edge gradient leading into Contact */}
        <motion.div
          className="video-bottom-fade"
          aria-hidden="true"
          style={{ opacity: prefersReducedMotion ? 0 : revealProgress }}
        />
      </section>
    </div>
  );
}
