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
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
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
  const featuredVideo = videos.find((video) => video.videoId === selectedVideoId) ?? videos[0];
  const videoMeta = (video: Video) =>
    [timeAgo(video.publishedAt), video.viewCount >= SHOW_COUNTS_FROM ? `${formatCount(video.viewCount)} views` : null]
      .filter(Boolean)
      .join(" · ");

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
          ) : videos.length > 0 && featuredVideo ? (
            <div className="video-feature-layout">
              <article className="video-featured" aria-label="Featured video">
                <div className="video-featured__eyebrow">
                  <span>Featured / from the channel</span>
                  <span>@MohitAgg07</span>
                </div>
                {featuredVideo.thumbnail ? (
                  <a
                    className="video-featured__image"
                    href={featuredVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${featuredVideo.title} on YouTube`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredVideo.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = `https://i.ytimg.com/vi/${featuredVideo.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <span className="video-featured__play" aria-hidden="true">
                      <Play size={23} fill="currentColor" />
                    </span>
                  </a>
                ) : (
                  <a className="video-featured__empty" href={featuredVideo.url} target="_blank" rel="noopener noreferrer">
                    <Play size={26} aria-hidden="true" />
                    <p>Open this upload on the channel</p>
                  </a>
                )}
                <div className="video-featured__copy">
                  <h3 className="video-featured__title">{featuredVideo.title}</h3>
                  <p className="video-featured__meta">{videoMeta(featuredVideo)}</p>
                </div>
              </article>

              <aside className="video-queue" aria-label="Choose a video">
                <div className="video-queue__head">
                  <strong>More from the channel</strong>
                  <span>{String(videos.length).padStart(2, "0")} UPLOADS</span>
                </div>
                <div className="video-queue__list">
                  {videos.map((video, index) => {
                    const isSelected = video.videoId === featuredVideo.videoId;
                    return (
                      <button
                        key={video.videoId}
                        type="button"
                        className="video-queue__item"
                        aria-pressed={isSelected}
                        aria-label={`Feature video: ${video.title}`}
                        onClick={() => setSelectedVideoId(video.videoId)}
                      >
                        <span className="video-queue__thumb">
                          {video.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={video.thumbnail}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                e.currentTarget.src = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
                              }}
                            />
                          ) : null}
                        </span>
                        <span className="video-queue__item-copy">
                          <strong>{video.title}</strong>
                          <small>{isSelected ? "Now featured" : videoMeta(video)}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>
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
