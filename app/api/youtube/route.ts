import { NextResponse } from "next/server";

export const revalidate = 3600;

const CHANNEL_ID = "UCbHQ7FadLvkMqHnvW_X-oLQ";
const CHANNEL = { name: "@MohitAgg07", url: "https://www.youtube.com/@MohitAgg07" };

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([\da-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(parseInt(decimal, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function readTag(entry: string, tag: string): string {
  const escapedTag = tag.replace(":", "\\:");
  const match = entry.match(new RegExp(`<${escapedTag}>([\\s\\S]*?)<\\/${escapedTag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

async function getRssVideos() {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
    { next: { revalidate: 3600 }, headers: { "user-agent": "Mozilla/5.0" } }
  );
  if (!response.ok) return [];

  const feed = await response.text();
  return [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => {
      const videoId = readTag(entry, "yt:videoId");
      if (!videoId) return null;
      return {
        title: readTag(entry, "title"),
        description: "",
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: readTag(entry, "published"),
        viewCount: 0,
        likeCount: 0,
      };
    })
    .filter((video): video is NonNullable<typeof video> => video !== null)
    .slice(0, 4);
}

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        videos: await getRssVideos(),
        channel: CHANNEL,
      });
    }

    // Step 1: Get channel info (uploads playlist + subscriber count)
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,statistics&id=${CHANNEL_ID}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    const subscriberCount = channelData?.items?.[0]?.statistics?.subscriberCount;
    const channelViewCount = channelData?.items?.[0]?.statistics?.viewCount;

    if (!uploadsPlaylistId) throw new Error("No playlist found");

    // Step 2: Get latest 15 videos from uploads playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const videosData = await videosRes.json();

    const items = videosData?.items || [];
    const videoIds = items
      .map(
        (item: { snippet: { resourceId: { videoId: string } } }) =>
          item.snippet.resourceId.videoId
      )
      .join(",");

    // Step 3: Fetch video statistics (views, likes) for all videos in one request
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const statsData = await statsRes.json();

    // Build a map: videoId -> stats
    const statsMap: Record<string, { viewCount: string; likeCount: string }> = {};
    for (const item of statsData?.items || []) {
      statsMap[item.id] = {
        viewCount: item.statistics?.viewCount || "0",
        likeCount: item.statistics?.likeCount || "0",
      };
    }

    // Step 4: Map playlist items, attach stats
    const videos = items
      .map(
        (item: {
          snippet: {
            title: string;
            description: string;
            thumbnails: { high?: { url: string }; medium?: { url: string } };
            resourceId: { videoId: string };
            publishedAt: string;
          };
        }) => {
          const videoId = item.snippet.resourceId.videoId;
          const stats = statsMap[videoId] || { viewCount: "0", likeCount: "0" };
          return {
            title: item.snippet.title,
            description: item.snippet.description?.slice(0, 120),
            thumbnail:
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url,
            videoId,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            publishedAt: item.snippet.publishedAt,
            viewCount: parseInt(stats.viewCount || "0", 10),
            likeCount: parseInt(stats.likeCount || "0", 10),
          };
        }
      )
      // Step 5: Sort by view count descending (most viewed first)
      .sort(
        (a: { viewCount: number }, b: { viewCount: number }) =>
          b.viewCount - a.viewCount
      )
      // Step 6: Take top 4 most viewed
      .slice(0, 4);

    return NextResponse.json({
      videos,
      subscriberCount,
      channelViewCount,
      channel: CHANNEL,
    });
  } catch (e) {
    const videos = await getRssVideos().catch(() => []);
    return NextResponse.json({
      videos,
      ...(videos.length === 0 ? { error: String(e) } : {}),
      channel: CHANNEL,
    });
  }
}
